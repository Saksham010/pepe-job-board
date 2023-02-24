import "./hackathon.css";
import { Link } from "react-router-dom";
import { Pagination } from '@mantine/core';
import { useState } from "react";



export default function Hackathon(){
    const [activePage, setPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(4);

    const hack = [
    {
        title:"Flow Hackathon",
        organizer:"Flow Network",
        status:"Ongoing",
        url:"https://flow-hackathon.devfolio.co/",
        imgPath:"https://firebasestorage.googleapis.com/v0/b/remotepepejobs.appspot.com/o/files%2FflowHack.png?alt=media&token=6bd43eab-4918-457d-bbeb-04ff972400b7",
    },
    {
        title:"Solana Grizzlython",
        organizer:"Solana Foundation",
        status:"Ongoing",
        url:"https://solana.com/grizzlython",
        imgPath:"https://firebasestorage.googleapis.com/v0/b/remotepepejobs.appspot.com/o/files%2FsolanaHack.jpg?alt=media&token=fb529a93-155b-4ace-8221-b694ffb9b22d"
    },
    {
        title:"Fantom Hackathon Q1",
        organizer:"Fantom Foundation",
        status:"Ongoing",
        url:"https://fantomq12023.devpost.com/?ref_feature=challenge&ref_medium=discover",
        imgPath:"https://firebasestorage.googleapis.com/v0/b/remotepepejobs.appspot.com/o/files%2FfantomHack.png?alt=media&token=c950d702-4115-4afa-a937-7337d176948f"

    },
    {
        title:"Filecoin Space Warp",
        organizer:"EthGlobal",
        status:"Comming up",
        url:"https://spacewarp.fvm.dev/",
        imgPath:"https://firebasestorage.googleapis.com/v0/b/remotepepejobs.appspot.com/o/files%2FfilecoinHack.png?alt=media&token=30908bd2-001d-413d-89fa-446b93099fa9"
    }]

    const lastIndex = activePage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const currentRecords = hack.slice(firstIndex, lastIndex);

    const hackathonElement = currentRecords.map((obj,i)=>{
        return(
            <div className="hackContainer" key={i}>
                <div className="hack-inner">

                    <div className="hacks">
                        <div className="hack-float">
                            <div className="hackImg">

                                <img src={obj.imgPath} alt="logo"/>
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
    //Get total number of hackathons
    function getTotalHackathons() {

        let count = 0;
        hack.map(obj => {
            count++;

        })
        return count;
    }
    return (
        <div className="hackathonContainer">
            <div className="hackathoninner">

                <div className="hackHeader">
                    <h1>Hackathon</h1>
                </div>

                {hackathonElement}
                <div className="paginationContainer" >

                    <Pagination page={activePage} onChange={(pageNumber) => {
                            setPage(pageNumber);
                        }} total={Math.ceil(getTotalHackathons() / 5)}
                            color="dark"
                            position="center" />
                </div>
            </div>
        </div>
    )
}