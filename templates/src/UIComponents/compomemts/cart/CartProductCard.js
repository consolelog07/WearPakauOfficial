import React, {useState} from "react";
// import "../../style/productlist.css"
import mcart from "../../stylemodules/cart.module.css"
import getCookie from "../../../components/getcooke";
import QRCustom from "../../QRCustom";
export default function CartProductCard(props)
{

    Number.prototype.round = function(places) {
        return +(Math.round(this + "e+" + places)  + "e-" + places);
    }

    const [created,setCreated]=useState(false)

    const [quantity,setQuantity]=useState(props.wrapper.Quantity)
    const [QrJson,setQrJson]=useState(JSON.parse(props.wrapper.QrJson))
    if(created === false)
    {
        setCreated(true)
        setQrJson({...QrJson,width:100,height:100,margin:0})
    }


    async function  remove (setState,id,QrJson,size)
    {
        // if(typeof(QrJson) !== typeof ({}))
        // {
        //     return false
        // }
        //
        //
        // QrJson={...QrJson, width:157,height:165,margin:10}
        // QrJson=JSON.stringify(QrJson)
        console.log(QrJson,props.wrapper.QrJson,QrJson===props.wrapper.QrJson)
        alert(QrJson===props.wrapper.QrJson)
        let req = new Request(`/Api/Cart/Cart/remove/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            body: JSON.stringify({id:id,QrJson:QrJson,size:size})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })
        console.log(response)

        if (Reflect.has(response,"Success-Updated") || Reflect.has(response,"Success"))
        {

            setState({cartAttempt:false,created:false,datafetch:false,idFetch:false})
            window.location.reload()

        }
        if (Reflect.has(response,"error"))
        {
            setState({err:true,err_msg:response['error'],cartAttempt:false})
        }

    }

    // console.log(props)

    return <>
        <div className={mcart.product} style={{height:"fit-content"}}>
            <div className={mcart.productimgcontainer} onClick={ev2=>{window.location.href=`/product/${props.wrapper.Product.id}/`}} >
                <img src={props.wrapper.Product.default.image} alt=""/>
            </div>
            <div className={mcart.productdetail} style={{height:"fit-content"}}>
                <h2 className={mcart.productname} onClick={ev2=>{window.location.href=`/product/${props.wrapper.Product.id}/`}}>{props.wrapper.Product.name}</h2>
                <p className={mcart.productcategory}>{props.wrapper.Product.category}</p>

                {props.wrapper.Product
                    .discount_display
                    ?<p className={mcart.price}>RS.{props.wrapper.Product.discounted_price}</p>:
                    <p className={mcart.price}>RS.{props.wrapper.Product.price}</p>
                    }
                {props.wrapper.size !== "" &&
                <p className={mcart.productcategory} style={{color:"black"}} >Size: {props.wrapper.size}</p>
                }

                <span className={mcart.quantityremovebox}>
              <div className={mcart.quantityselector}>
                <span>Quantity  </span>
                <select value={quantity}
                onChange={ev=>{
                    props.setStateQr({err:false,err_msg:"",cartAttempt:true})
                    props.add_to_cart(props.setStateQr,props.wrapper.Product.id,QrJson,ev.target.value,props.wrapper.size,true)
                }
                }>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>

                </select>
              </div>
              <button className={mcart.removeproduct}
                      onClick={ev=>{
                          props.setStateQr({err:false,err_msg:"",cartAttempt:true})
                          remove(props.setStateQr,props.wrapper.Product.id,props.wrapper.QrJson,props.wrapper.size)
                      }}
              >Remove</button>
            </span>
                <div className={mcart.qrbox} style={{marginRight:"50px",width:"fit-content",height:"fit-content"}}>
                    <QRCustom qroptions={QrJson} />
                </div>
            </div>

        </div>

    </>
}