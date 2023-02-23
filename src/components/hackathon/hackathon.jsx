import "./hackathon.css";


export default function Hackathon(){

    const hack = [
    {
        title:"Filecoin Space Warp",
        organizer:"EthGlobal",
        status:"Comming up",
        url:""
    },
    {
        title:"Filecoin Space Warp",
        organizer:"EthGlobal",
        status:"Comming up",
        url:""
    },
    {
        title:"Filecoin Space Warp",
        organizer:"EthGlobal",
        status:"Comming up",
        url:""
    },
    {
        title:"Filecoin Space Warp",
        organizer:"EthGlobal",
        status:"Comming up",
        url:""
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
                                <button>Apply</button>
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