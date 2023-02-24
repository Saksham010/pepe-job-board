import "./homepage.css";
import { useState, useRef } from "react";
import { Pagination } from '@mantine/core';
import 'winbox/dist/css/winbox.min.css'; // required
// import 'winbox/dist/css/themes/modern.min.css'; // optional
import jobData from "../../jobdata/jobdata.js";
import WinBox from 'react-winbox';
import parse from "html-react-parser";
import {database} from "../../firebaseConfig";
import {collection,doc, getDoc, getDocs} from "firebase/firestore";
import { useEffect } from "react";
import { useLocation } from "react-router";
import Hackathon from "../hackathon/hackathon";
import { Link } from "react-router-dom";


export default function Homepage() {

    const ref = useRef();
    //Content wise path
    let location = useLocation();
    const [path,setPath] = useState("/");

    useEffect(()=>{
        // console.log("Updated path: ", location.pathname);
        setPath(location.pathname)
    },[location])

    //Pagination
    const [activePage, setPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(5);

    const [jobs, setJobs] = useState([]);

    const lastIndex = activePage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const currentRecords = jobs.slice(firstIndex, lastIndex);
    

    async function fetchJobData(){
        const collectionRef = collection(database,"Job");
        const snapshot = await getDocs(collectionRef);

        snapshot.docs.map((doc)=>{
            setJobs(prevarr=>{
                const fetchedDoc = doc.data();
                return [...prevarr, fetchedDoc]
            })
            console.log("Fetched data: ",doc.data());
        })
    }

    useEffect(()=>{
        console.log("Rrunning");
        fetchJobData();
    },[])

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

    function listParser(jobArr){
        let parsedList = jobArr.map((item)=>{
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
                                width={800}
                                height={750}
                                x={950}
                                y={140}
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

                                        {data.candidateTask[0] == "null"?<></>:
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
        if(position != ""){

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
        else{
            return(
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
        workOS: 'https://workos.com/?ref=ph_alternative&utm_campaign=ph2022&utm_medium=cpc&utm_source=producthunt',
        web3_Jobs: 'https://www.producthunt.com/products/web3-jobs',
        hustleverse: 'https://www.producthunt.com/products/hustleverse',
        Hunted: 'https://www.producthunt.com/products/hunted',
        job_hunt_stack: 'https://www.producthunt.com/products/job-hunt-stack',
        Web3_army: 'https://www.producthunt.com/products/web3-army',
        Crypto_jobs_list: 'https://www.producthunt.com/products/cryptojobslist',
        seaLaunch: 'https://www.producthunt.com/products/sealaunch',
        Aworker: 'https://www.producthunt.com/products/aworker',
        crypto_Jobs: 'https://www.producthunt.com/products/cryptojobs-2',
        New_grad: 'https://www.producthunt.com/products/new-grad',
        candena: 'https://www.producthunt.com/products/cadena',
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


             {path == '/internship'?
   
                <div className="Box">
                    <div className="jobb">
                        <div className="container_1">
                            {<h1 className="jobb_heading">Can't find the job you want ?</h1> }
                            <span className="jobb_span">
                                Check out these job portal.
                            </span>
                        </div>
                    </div>
                    <div className=" buttonn">

                        <div className="b1">
                            <button name="workOS" className="buttonn1" onClick={handleClick}>WorkOS</button>
                        </div>

                        <div className="b2">
                            <button name="web3_Jobs" className="buttonn2" onClick={handleClick}>web3_Jobs</button>
                            <button name="hustleverse" className="buttonn3" onClick={handleClick}>Hustleverse</button>
                            <button name="Hunted" className="buttonn4" onClick={handleClick}>Hunted</button>
                            <button name=" Web3_army" className="buttonn5" onClick={handleClick}> Web3_Army</button>
                            <button name="Aworker" className="buttonn6" onClick={handleClick}>Aworker</button>
                        </div>

                        <div className="b3">
                            <button name="seaLaunch" className="buttonn7" onClick={handleClick}>SeaLaunch</button>
                        </div>

                        <div className="b4">
                            <button name="candena" className="buttonn8" onClick={handleClick}>Candena</button>
                        </div>
                        
                        <div className="bb1">
                            <div className="b5">
                                <button name=" crypto_Jobs" className="buttonn9" onClick={handleClick}> Crypto_Jobs</button>
                            </div>

                            <div className="b6">
                                <button name="New_grad" className="buttonn10" onClick={handleClick}>New_Grad</button>
                            </div>
                        </div>

                        <div className="bb2">
                            <div className="b7">
                                <button name=" job_hunt_stack" className="buttonn11" onClick={handleClick}> Job_Hunt_Stack</button>
                            </div>

                            <div className="b8">
                                <button name="Crypto_jobs_list" className="buttonn12" onClick={handleClick}>Crypto_Jobs_List</button>
                            </div>
                        </div>

                    </div>

                </div> 

                : 
                <Hackathon/> 
                
                }

        </div>

    )
}