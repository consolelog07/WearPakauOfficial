export default function nexttransport(to="")
{
    if  (window.location.search.search("next")  !== -1)
    {
        let next=window.location.search.substring(window.location.search.indexOf('=')+1,window.location.search.length)
        setTimeout(ev=>{
            window.location.href = next
        },10)
    }
    else
    {
        setTimeout(ev=>{
            window.location.href = to
        },1300)
    }
}