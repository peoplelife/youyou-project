
import TopBar from "../components/header"
import Footer from "../components/footer"
import './index.css'
import { Link, Outlet } from "react-router-dom"
const YycxBox = () => {
    const backTop=()=>{
        let timer=setInterval(()=>{
            let osTop=document.documentElement.scrollTop || document.body.scrollTop
            window.scrollTo(0,osTop-osTop/5)
            if(osTop===0){
                clearInterval(timer)
            }
        },30)
    }
    return (
        <>
            <TopBar></TopBar>
            <Outlet/>
            <Footer></Footer>
            <div className="sidebar">
                <div className="item">
                    <Link>
                        <div className="icon damai"></div>
                        {/* <p>APP下载</p> */}
                    </Link>
                </div>
                <div className="item J_GoTop" onClick={backTop}>
                    <div className="icon gotop"></div>
                    <p>回到顶部</p>
                </div>
            </div>
        </>
    )
}
export default YycxBox