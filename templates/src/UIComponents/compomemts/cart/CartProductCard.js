import React, {useState} from "react";
import "../../style/productlist.css"
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
        if(typeof(QrJson) !== typeof ({}))
        {
            return false
        }


        QrJson={...QrJson, width:157,height:165,margin:10}
        QrJson=JSON.stringify(QrJson)
        let req = new Request(`/Api/Cart/Cart/remove/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'POST',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
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
        <div className="product">
            <div className="productimgcontainer">
                <img src={props.wrapper.Product.default.image} alt=""/>
            </div>
            <div className="productdetail">
                <h2 className="productname">{props.wrapper.Product.name}</h2>
                <p className="productcategory">{props.wrapper.Product.category}</p>

                {props.wrapper.Product
                    .discount_display
                    ?<p className="price">RS.{props.wrapper.Product.discounted_price}</p>:
                    <p className="price">RS.{props.wrapper.Product.price}</p>
                    }
                {props.wrapper.size !== "" &&
                <p className="productcategory" style={{color:"black"}} >Size: {props.wrapper.size}</p>
                }

                <span className="quantityremovebox">
              <div className="quantityselector">
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
              <button className="removeproduct"
                      onClick={ev=>{
                          props.setStateQr({err:false,err_msg:"",cartAttempt:true})
                          remove(props.setStateQr,props.wrapper.Product.id,QrJson,props.wrapper.size)
                      }}
              >Remove</button>
            </span>
                <div className="qrbox">
                    <QRCustom qroptions={QrJson} />
                </div>
            </div>
        </div>

    </>
}