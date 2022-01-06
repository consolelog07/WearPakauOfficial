import React from "react";
import getCookie from "../../../components/getcooke";
import CustomizedSnackbars from "../alert";
// import "../../style/error_in_cart.css"
import invalidproduct from  "../../stylemodules/invalidproduct.module.css"
import alertlogo from "../../../images/external-warning-ui-dreamstale-lineal-dreamstale.png"



export default class ErrorWithOrders extends  React.Component{
    constructor(props) {
        super(props);
        this.state={
            order_fetch:false,
            attempted:true,
            err:false,
            fit:false,
            idFetch:false,
            err_msg:false,
            datafetch:false,
            order_result:[],
            order_fetch_done:false,
            result:{},
            products:[]
        }

        this.getOrder=this.getOrder.bind(this)
        this.getcartid=this.getcartid.bind(this)
        this.getCart=this.getCart.bind(this)
        this.remove=this.remove.bind(this)
    }
    async getOrder()
    {
        if (this.props.Gstate.login === false)
        {
            return setTimeout(ev=>{
                this.getOrder()
            },3000)
        }
        // console.log(this.props.Gstate.login)

        let req = new Request(`/Api/orders/Orders/check_if_error_with_any_product_view/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            // body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response)

        if (Reflect.has(response,"error"))
        {
            this.setState({order_fetch:true,order_fetch_done:true,err:true,fit:false,err_msg:"some internal error"})
        }

        if (Reflect.has(response,"error_in_product"))
        {
            this.setState({order_fetch:true,order_fetch_done:true,err:true,order_result:response["error_in_product"],fit:false,err_msg:"some Error in product in cart"})
        }


        if (Reflect.has(response,"Success"))
        {
            this.setState({order_fetch:true,order_fetch_done:true,fit:true,err:true,err_msg:"some internal error"})


        }

        // if(Object.entries(response).length> 1)
        // {
        //     this.setState({order_result:response,order_fetch:true})
        //     this.getAddress(response.address_id)
        //
        // }

    }
    async getcartid()
    {
        let req = new Request(`/Api/Cart/Cart/Return_cart_id_of_user/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            // body: JSON.stringify({token:token})
        });
        let ok=false
        const response = await fetch(req).then(ev=> {
            if (ev.ok)
            {
                ok=true
            }

            return ev.json()
        })

        console.log(response.results)
        if(ok)
        {

            if (Reflect.has(response,'iD') === true)
            {
                this.setState({id:response["iD"],idFetch:true})
                // console.log(response)
                await this.getCart()
            }

        }


    }
    async  getCart()
    {

        let req = new Request(`/Api/Cart/Cart/${this.state.id}/`, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },

            // body: JSON.stringify({token:token})
        });


        const response = await fetch(req).then(ev=> {
            return ev.json()
        })


        console.log(response)


        if (Reflect.has(response,'detail') === true)
        {
            this.setState({err:true,datafetch:true,created:false})
        }
        else
        {
            this.setState({err:false,datafetch:true,attempted:false,result:response,products:response.products})
        }

    }


    async  remove (setState,id,QrJson,size)
    {
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
            window.location.reload()
        }
        if (Reflect.has(response,"error"))
        {
            this.setState({err:true,err_msg:response['error']})
        }

    }

    render()
    {
        if(this.state.order_fetch === false)
        {
            this.setState({order_fetch:true,attempted:true,idFetch:false,fit:false,err:false,err_msg:""})
            this.getOrder()
            this.getcartid()
        }
        if(this.state.order_fetch_done === true)
        {
            this.state.products.forEach(ev=>{
                console.log(ev.id,this.state.order_result.find(ev2=>ev2 === ev.id)
                )
            })
        }
        else {
            return <>
                <div className="loadercontainer">
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>
        }




        return<>
            {this.state.attempted?<><>
                <div className="loadercontainer">
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </></>:<>
                {this.state.err &&
                <>
                    {<>
                        {console.log(setTimeout(ev => {
                            this.setState({
                                err: false
                            })
                        }, 3000))}
                    </>}
                    <CustomizedSnackbars message={this.state.err_msg} severity="error"/>
                </>
                }


                <div className={invalidproduct.cartpagecontainer}>
                    <div className={invalidproduct.productcontainer}>
                        <h2 className={invalidproduct.unavailablehead}>Product Unavailable</h2>
                        <div className={invalidproduct.warning}>
                            <div className={invalidproduct.warninghead}>
                                <img
                                    src={alertlogo}
                                /> <p>Important Message</p>
                            </div>
                            <p className={invalidproduct.warningtext}>
                                There was a problem with some of the items in your order.
                            </p>
                        </div>
                            <div className={invalidproduct.product}>
                            <div className={invalidproduct.productimgcontainer}>
                                <img src="https://consolelog07.github.io/wearpakau/styles/images/tshirtimage.jpg" alt=""/>
                            </div>
                            <div className={invalidproduct.productdetail}>
                                <h2 className={invalidproduct.productname}>Premium Cotton T-Shirt Vest</h2>
                                <p className={invalidproduct.productcategory}>Tshirt</p>
                                <p className={invalidproduct.price}>RS. 4999</p>
                                <span className={invalidproduct.quantityremovebox}>

              <button className={invalidproduct.removeproduct}>Remove</button>
            </span>
                                <div className={invalidproduct.qrbox}></div>
                            </div>
                        </div>
                        <div className={invalidproduct.continuebtn}>
                            <button>Continue</button>
                        </div>
                    </div>
                </div>



                {/*// "detail": "Cant view wrapper."*/}
                {/*// // console.log(ev.id,this.state.order_result.find(ev2=>ev2 === ev.id))*/}
                {/*// <h1>{ev.id},{this.state.order_result.find(ev2=>ev2 === ev.id)=== undefined?"nothing":"found"}</h1>*/}


            </>}

        </>
    }

}

