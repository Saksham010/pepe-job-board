import "./navbar.css";
import { Link } from "react-router-dom";
export default function Navbar(){
    return(
        <div className="navContainer">

            <div className="outerLogo">
                <div className="logoContainer">
                    <Link to='/'>            
                        <img src="pepe3.png"></img>
                    </Link>


                </div>
                <Link to='/'>            
                    <span>Pepe Job Board</span>
                </Link>
            </div>


            <div className="innerNav">
                <div className="nav-box">

                    <Link to="/"><span>Jobs</span></Link>
                </div>
                <div className="nav-box">
                    <Link to = '/internship'><span>Internship</span></Link>

                </div>

                <div className="nav-box">
                    <button>Post Job/Internship</button>

                </div>

            </div>


        </div>

    )

}