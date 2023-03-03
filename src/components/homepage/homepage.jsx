import "./homepage.css";
import { useState, useRef } from "react";
import { Pagination } from '@mantine/core';
import 'winbox/dist/css/winbox.min.css'; // required
// import 'winbox/dist/css/themes/modern.min.css'; // optional
import jobData from "../../jobdata/jobdata.js";
import WinBox from 'react-winbox';
import parse from "html-react-parser";
import { database } from "../../firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useLocation } from "react-router";
import Hackathon from "../hackathon/hackathon";
import { Link } from "react-router-dom";


export default function Homepage() {
        //Window size
    const windowSize = useRef([window.innerWidth,window.innerHeight]);

    console.log("Window width: ", windowSize.current[0]," Window height: ",windowSize.current[1]);

    const ref = useRef();
    //Content wise path
    let location = useLocation();
    const [path, setPath] = useState("/");

    useEffect(() => {
        // console.log("Updated path: ", location.pathname);
        setPath(location.pathname)
    }, [location])

    //Pagination
    const [activePage, setPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(5);

    const [jobs, setJobs] = useState([]);

    const lastIndex = activePage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const currentRecords = jobs.slice(firstIndex, lastIndex);


    async function fetchJobData() {
        const collectionRef = collection(database, "Job");
        const snapshot = await getDocs(collectionRef);

        snapshot.docs.map((doc) => {
            setJobs(prevarr => {
                const fetchedDoc = doc.data();
                return [...prevarr, fetchedDoc]
            })
            console.log("Fetched data: ", doc.data());
        })
    }

    useEffect(() => {
        console.log("Rrunning");
        fetchJobData();
    }, [])

    //Get total number of jobs
    function getTotalJobs() {

        let count = 0;
        jobs.map(obj => {
            count++;

        })
        return count;
    }

    //State for winbox
    const [showBox, setShowBox] = useState([-1]);

    console.log("show box: ", showBox);

    //Trigger

    //Handle close
    function handleClose(index) {

        setShowBox(arr => {
            const returnedArr = arr.filter(x => x != index);
            console.log("returend arr: ", returnedArr);
            return returnedArr;
        })

    }

    function listParser(jobArr) {
        let parsedList = jobArr.map((item) => {
            let bulletItem = '<li>' + item + '</li>';
            return parse(bulletItem)
        })
        return parsedList;
    }


    //Winbox
    function showWinbox(data, index) {

        return (
            <>
                {showBox.map(value => {
                    if (value == index) {
                        console.log("value: ", value, "Index: ", index);

                        return (
                            <WinBox
                                width={(44/100) * windowSize.current[0]}
                                height={(80/100) * windowSize.current[1]}
                                x={(50/100)*windowSize.current[0]}
                                y={(20/100) * windowSize.current[1]}
                                title={data.position}
                                onClose={(event) => {
                                    handleClose(index);
                                }}

                            >
                                <div className="winboxContent">


                                    <div className="job-upper">
                                        <h1>{data.company}</h1>
                                    </div>
                                    <div className="job-lower">

                                        <h5>{data.minimumSalary} - {data.maximumSalary}</h5>
                                    </div>
                                    <div className="job-lower job-location">

                                        <h5>{data.location}</h5>
                                    </div>

                                    <div className="jobdetail">
                                        <div className="detailbox">
                                            <h1>About US:</h1>
                                            <p>{data.background}</p>
                                        </div>

                                        <div className="detailbox">
                                            <h1>About the job:</h1>
                                            <p>{data.jobDescription}</p>
                                        </div>

                                        {data.candidateTask[0] == "null" ? <></> :
                                            <div className="detailbox bullet">

                                                <h1>What you'll do: </h1>
                                                <p><ul>{listParser(data.candidateTask)}</ul></p>
                                            </div>
                                        }
                                        <div className="detailbox bullet">
                                            <h1>Requirement: </h1>
                                            <p><ul>{listParser(data.jobRequirement)}</ul></p>

                                        </div>

                                        <div className="detailbox bullet">
                                            <h1>Benefits: </h1>
                                            <p><ul>{listParser(data.benefits)}</ul></p>
                                        </div>

                                    </div>

                                    <div className="applybutton">
                                        <Link to={{ pathname: data.applyUrl }} target="_blank" >
                                            <button>Apply</button>
                                        </Link>
                                    </div>
                                    <br />
                                </div>

                            </WinBox>
                        )

                    }
                })}

            </>
        )
    }


    function element(currentData, index) {

        const { position, company, fileUrl, location, background, jobDescription, candidateTask, jobRequirement, benefits, minimumSalary, maximumSalary, applyUrl } = currentData;
        if (position != "") {

            return (
                <>

                    <div className="job-box" key={index} onClick={() => {
                        //Toggle display of winbox
                        // toggleWinbox(index);
                        let isopen = false;
                        showBox.map(i => {
                            console.log("i:Vale ", i, "index: ", index);
                            if (i == index) {
                                isopen = true;
                            }
                        })
                        if (isopen == false) {
                            setShowBox(prevarr => {
                                return [...prevarr, index];
                            })
                        }
                        else {
                            console.log("already open")
                        }

                    }}>
                        <div className="job-first">
                            <div className="job-logo">
                                <img src={fileUrl} alt="logo" />
                            </div>

                            <div className="job-info">
                                <div className="title">
                                    <span>{position}</span>
                                </div>
                                <div className="company">
                                    <span>{company}</span>
                                </div>
                            </div>
                        </div>

                        <div className="location">
                            <h5>{location}</h5>
                        </div>
                    </div>
                    {showWinbox({ position, company, location, background, jobDescription, candidateTask, jobRequirement, benefits, minimumSalary, maximumSalary, applyUrl }, index)}
                </>

            );
        }
        else {
            return (
                <></>
            )
        }

    }


    const content = currentRecords.map((obj, i) => {

        return (
            <div className="job-each">
                {element(obj, i)}
                {/* <br /> */}
            </div>
        )
    })
    console.log(activePage);

    //Close all opened box
    function closeBox() {
        setShowBox(prev => {
            return [-1];
        })
    }


    const obj = {
        remote3: 'https://remote3.co/',
        web3_career: ' https://web3.career/',
        web3_internship: 'https://www.web3internships.com/',
        Crypto_jobs_list: 'https://cryptojobslist.com/',
        useweb3: ' https://www.useweb3.xyz/jobs',
        cryptoJobs: 'https://www.cryptojobs.com/',
        CRCjobs: 'https://cryptocurrencyjobs.com/',
        froog: 'https://froog.co/',
        productHouse: 'https://www.theproduct.house/earn/web3-jobs',
        Gaby_job_board: 'https://web-3.pallet.com/jobs',
        angelLiSt: 'https://angel.co/jobs',
        jobster: 'https://cryptojobster.com/',
    }


    function handleClick(event) {
        const type = event.target.name
        let link = (obj[type])
        window.open(link)
    }

    return (
        <div className="homepage">

            <div className="job-container ">
                <div className="job-main">

                    {content}

                    <Pagination page={activePage} onChange={(pageNumber) => {
                        setPage(pageNumber);
                        //Close opened box
                        closeBox();
                    }} total={Math.ceil(getTotalJobs() / 5)}
                        color="dark"
                        position="center" />
                </div>

            </div>


            {path == '/internship' ?

                <div className="Box">
                    <div className="jobb">
                        <div className="container_1">
                            <h1 className="jobb_heading">Check out other job portals</h1>
                        </div>
                    </div>


                    <div className=" buttonn">
                        <button name="remote3" className="b1" onClick={handleClick}><p>Remote3</p></button>
                        <button name="web3_career" className="b1" onClick={handleClick}>Web3 Career</button>
                        <button name="web3_internship" className="b1" onClick={handleClick}>Web3 Internship</button>
                        <button name="Crypto_jobs_list" className="b1" onClick={handleClick}>Crypto Jobs List</button>
                        <button name="useweb3" className="b1" onClick={handleClick}> Use Web3</button>
                        <button name="cryptoJobs" className="b1" onClick={handleClick}>crypto Jobs</button>
                        <button name="CRCjobs" className="b1" onClick={handleClick}>CRC Jobs</button>
                        <button name="froog" className="b1" onClick={handleClick}>Froog</button>
                        <button name="productHouse" className="b1" onClick={handleClick}> Product House </button>
                        <button name="Gaby_job_board" className="b1" onClick={handleClick}>Gaby's Job Board</button>
                        <button name="angelLiSt" className="b1" onClick={handleClick}>Angel List</button>
                        <button name="jobster" className="b1" onClick={handleClick}>JObster</button>
                    </div>
                </div>
                :
                <Hackathon />

            }
        </div >
    )
}
