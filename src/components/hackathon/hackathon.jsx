import "./hackathon.css";
import { Link } from "react-router-dom";

export default function Hackathon(){
    const hack = [
    {
        title:"Flow Hackathon",
        organizer:"Flow Network",
        status:"Ongoing",
        url:"https://flow-hackathon.devfolio.co/"
    },
    {
        title:"Solana Grizzlython",
        organizer:"Solana Foundation",
        status:"Ongoing",
        url:"https://solana.com/grizzlython"
    },
    {
        title:"Fantom Hackathon Q1",
        organizer:"Fantom Foundation",
        status:"Ongoing",
        url:"https://fantomq12023.devpost.com/?ref_feature=challenge&ref_medium=discover"
    },
    {
        title:"Filecoin Space Warp",
        organizer:"EthGlobal",
        status:"Comming up",
        url:"https://spacewarp.fvm.dev/"
    }]

    const hackathonElement = hack.map((obj,i)=>{
        return(
            <div className="hackContainer" key={i}>
                <div className="hack-inner">

                    <div className="hacks">
                        <div className="hack-float">
                            <div className="hackImg">

                                <img src="./binance.png" alt="logo"/>
                            </div>
                            <div className="hack-detail">
                                <span className="hack-title">{obj.title}</span>
                                <p>{obj.organizer}</p>

                            </div>
                            
                        </div>
                        <div className="statusContainer">
                            <button className="hack-status">{obj.status}</button>
                            <div className="hack-apply">
                                <Link to={{ pathname: obj.url }} target="_blank" >

                                    <button>Apply</button>

                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )

    })
    return (
        <div className="hackathonContainer">
            <div className="hackHeader">
                <h1>Hackathon</h1>
            </div>

            {hackathonElement}
        </div>
    )
}