import React, {useState} from "react";
import "../../style/productlist.css"
import mlist from "../../stylemodules/productlist.module.css"
import getCookie from "../../../components/getcooke";
import mmsr from "../../stylemodules/emptycart.module.css"
import emptysearch from "../../../images/emptysearch.svg"

export default function Productlist(props)
{

    Number.prototype.round = function(places) {
        return +(Math.round(this + "e+" + places)  + "e-" + places);
    }

    // console.log(props)
    const [created,setCreated]=useState(false)
    const [attemted,setAttemted]=useState(false)
    const [error,setError]=useState(false)
    const [search,setSearched]=useState(false)
    const [result,setResult]=useState([])
    const [filter,setFilter]=useState(false)
    const [dynamicRender,setDynamicRender]=useState({
        currentPage:1,
        nextPossible:false,
        fast_track:false,
        to:0
    })

    // console.log(dynamicRender,result)
    if( (window.location.search === "" || window.location.search === "?search=") && error === false)
    {
        setError(true)
    }
    else{
        if(search === false && error === false)
        {
            setSearched(true)
            ServerSearch()
        }
    }

    function render_next()
    {
        if(dynamicRender.nextPossible )
        {
            // setDynamicRender({...dynamicRender,currentPage:dynamicRender.currentPage+1})
            ServerSearch()
        }
    }


    async function ServerSearch()
    {
        setAttemted(true)
        setCreated(false)
        setError(false)
        var tt=`/Api/Products/Products/${window.location.search}&${filter?"ordering=-price":"ordering=price"}&page=${dynamicRender.currentPage}`
        // console.log(tt)
        let req = new Request(tt, {
            mode: 'cors', //just a safe-guard indicating our intentions of what to allow
            credentials: 'include', //when will the cookies and authorization header be sent

            method: 'GET',
            // cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            referrerPolicy: 'no-referrer',
            // body: JSON.stringify({phone_number:phone_number})
        });

        let ok=false
        const response = await fetch(req).then(ev=> {
            if (ev.ok)
            {
                ok=true
            }

            return ev.json()
        })

        // console.log(response.results)
        if(ok)
        {

            if(response.count === 0)
            {
                setError(true)
            }
            else
            {
                setCreated(true)
                var previous=result
                // console.log(".d",response.results)
                previous.push(...response.results)


                if(response.next !== null)
                {
                    var current=dynamicRender.currentPage+1
                    // console.log('nulllllllllllllllllllccccccccccccccc')
                    setDynamicRender({...dynamicRender,nextPossible:true,currentPage:current})

                }
            else
                {
                    // console.log('nulllllllllllllllllll')
                    setDynamicRender({...dynamicRender,nextPossible:false,})
                }


                setResult(previous)
            }

        }
        else
        {
            setError(true)
        }

        setAttemted(false)

    }


    return <>

        <div className={mlist.productlistoutercontainer}>
            <div className={mlist.productlistfilter}>
                <div className={mlist.listfilter}>
                    <span>Sort by price: </span>
                    <select onChange={ev=>{
                        // console.log(ev.target.value)
                        ev.target.value === "true"?setFilter(true):setFilter(false)
                        setResult([])
                        setDynamicRender({...dynamicRender,currentPage:1})
                        setSearched(false)
                    }}>
                        <option value="false">High to Low</option>
                        <option value="true">Low to High</option>
                    </select>
                </div>
            </div>
            {attemted?  <>
                <div className="loadercontainer" >
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>

                </div>
            </>:<>

            {created?<>

                {result.map(ev=> {
                        // console.log(ev)
                    return<>
                    <div className={mlist.listcontainer} id={ev.id} onClick={ev2=>{window.location.href=`/product/${ev.id}/`}}>
                            <div className={mlist.innercontainer}>
                                <div className={mlist.imgcontainer}>
                                    <img src={ev.default.image} alt=""/>
                                </div>
                                <div className={mlist.detailcontainer}>
                                    <h2 className={mlist.productname}>
                                        <a className={mlist.productname} href={`/product/${ev.id}/`}>{ev.name}</a>
                                    </h2>
                                    <p className={mlist.productcategory}>{ev.category}</p>
                                    <div className={mlist.pricing}>
                                        {/*<span className="price">RS. 4900</span>*/}
                                        {/*<span className="og-price">RS. 10000</span>*/}
                                        {/*<span className="discount">Save (50%)</span>*/}
                                    {ev.discount_display ?
                                        <>
                                            <span className={mlist.price}>RS. {ev.discounted_price}</span>
                                            <span className={mlist.ogPrice} style={{"text-decoration": "line-through"}}>RS. {ev.price}</span>
                                            { ev.price !== 0 ? <span className={mlist.discount}>
                                            ({((1-(ev.discounted_price/ev.price))*100).round(2)} % OFF)</span>
                                                :<span className={mlist.discount}>(0 % OFF)</span>}

                                        </>
                                        :<>
                                            <span className={mlist.price}>RS.  {ev.price}</span>
                                        </>}
                                    </div>


                                        <ul className={mlist.extrainfo}>
                                            {
                                                ev.productDescription.split(";").map(ev=>{
                                                    if (ev !== "")
                                                    {
                                                        return <li>{ev}</li>
                                                    }

                                                })
                                            }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr className="listhr"/>
                    </>
                    }
                )}






            </>:
                <>
                {error &&


                <div className={mmsr.container}>
                    <div className={mmsr.imgcontainer}>
                        <img src={emptysearch} alt="" />
                    </div>e
                    <h2 className="cartheading">Nothing's here</h2>

                </div>

                }
                </>}


            </>}
            {dynamicRender.nextPossible &&
            <button onClick={render_next}>next</button> }

        </div>


    </>
}