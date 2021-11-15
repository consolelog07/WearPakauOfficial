import getCookie from "../../../components/getcooke";

export async function  add_to_cart (setState,id,QrJson,Quantity,size="",typef=false)
{
    if(typeof(QrJson) !== typeof ({}))
    {
        return false
    }

    console.log(typef,'dddddddddddddd')

    QrJson={...QrJson, width:157,height:165,margin:10}
    QrJson=JSON.stringify(QrJson)
    console.log(id,QrJson,Quantity)

    let req = new Request(`/Api/Cart/Cart/add_in/`, {
        mode: 'cors', //just a safe-guard indicating our intentions of what to allow
        credentials: 'include', //when will the cookies and authorization header be sent

        method: 'POST',
        // cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({id:id,QrJson:QrJson,Quantity:Quantity,size:size})
    });


    const response = await fetch(req).then(ev=> {
        return ev.json()
    })
    console.log(response)

    if (Reflect.has(response,"Success-Updated") || Reflect.has(response,"Success"))
    {

        typef ===false?setState({product_added_in_cart:true,cartAttempt:false}):setState({cartAttempt:false,created:false,datafetch:false,idFetch:false})
        if(typef === true)
        {
            window.location.reload()
        }
    }
    if (Reflect.has(response,"error"))
    {
        setState({err:true,err_msg:response['error'],cartAttempt:false})
    }

}