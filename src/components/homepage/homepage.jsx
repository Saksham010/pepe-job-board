import "./homepage.css";
import { useState, useRef } from "react";
import { Pagination } from '@mantine/core';
import 'winbox/dist/css/winbox.min.css'; // required
// import 'winbox/dist/css/themes/modern.min.css'; // optional
import jobData from "../../jobdata/jobdata.js";
import WinBox from 'react-winbox';
import parse from "html-react-parser";



export default function Homepage() {

    const ref = useRef();

    //Pagination
    const [activePage, setPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(5);

    const [jobs, setJobs] = useState(jobData);

    const lastIndex = activePage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const currentRecords = jobs.slice(firstIndex, lastIndex);

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
                                title={data.title}
                                onClose={(event) => {
                                    handleClose(index);
                                }}

                            >
                                <div className="winboxContent">


                                    <div className="job-upper">
                                        <h1>{data.company}</h1>
                                    </div>
                                    <div className="job-lower">

                                        <h5>{data.salaryMin} - {data.salaryMax}</h5>
                                    </div>
                                    <div className="job-lower job-location">

                                        <h5>{data.location}</h5>
                                    </div>

                                    <div className="jobdetail">
                                        <div className="detailbox">
                                            <h1>About US:</h1>
                                            <p>{data.companyDescription}</p>
                                        </div>

                                        <div className="detailbox">
                                            <h1>About the job:</h1>
                                            <p>{data.jobDescription}</p>
                                        </div>

                                        <div className="detailbox bullet">
                                            <h1>What you'll do: </h1>
                                            <p>{parse(data.jobResponsibilities)}</p>
                                        </div>

                                        <div className="detailbox bullet">
                                            <h1>Requirement: </h1>
                                            <p>{parse(data.jobRequirement)}</p>

                                        </div>

                                        <div className="detailbox bullet">
                                            <h1>Benefits: </h1>
                                            <p>{parse(data.jobBenefits)}</p>
                                        </div>

                                    </div>

                                    <div className="applybutton">
                                        <button>Apply</button>
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

        const { title, company, imgPath, location, companyDescription, jobDescription, jobResponsibilities, jobRequirement, jobBenefits, salaryMin, salaryMax } = currentData;

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
                            <img src={imgPath} alt="logo" />
                        </div>

                        <div className="job-info">
                            <div className="title">
                                <span>{title}</span>
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
                {showWinbox({ title, company, location, companyDescription, jobDescription, jobResponsibilities, jobRequirement, jobBenefits, salaryMin, salaryMax }, index)}


            </>
        );

    }


    const content = currentRecords.map((obj, i) => {

        return (
            <>
                {element(obj, i)}
                <br />
            </>
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

                {content}

                <Pagination page={activePage} onChange={(pageNumber) => {
                    setPage(pageNumber);
                    //Close opened box
                    closeBox();
                }} total={Math.ceil(getTotalJobs() / 5)}
                    color="dark"
                    position="center" />
            </div>
            <div className="jobb">
                <div className="container_1">
                    <h1 className="jobb_heading">Can't find the job you want ?</h1>
                    <span className="jobb_span">
                        Check out these job portal.
                    </span>
                </div>
            </div>
            <div className=" buttonn">
                <button name="workOS" className="buttonn1" onClick={handleClick}>workOS</button>
                <button name="web3_Jobs" className="buttonn1" onClick={handleClick}>web3_Jobs</button>
                <button name="hustleverse" className="buttonn1" onClick={handleClick}>Hustleverse</button>
                <button name="Hunted" className="buttonn1" onClick={handleClick}>Hunted</button>
                <button name=" job_hunt_stack" className="buttonn1" onClick={handleClick}> job_hunt_stack</button>
                <button name=" Web3_army" className="buttonn1" onClick={handleClick}> Web3_army</button>
                <button name="Crypto_jobs_list" className="buttonn1" onClick={handleClick}>Crypto_jobs_list</button>
                <button name="seaLaunch" className="buttonn1" onClick={handleClick}>seaLaunch</button>
                <button name="Aworker" className="buttonn1" onClick={handleClick}>Aworker</button>
                <button name=" crypto_Jobs" className="buttonn1" onClick={handleClick}> crypto_Jobs</button>
                <button name="New_grad" className="buttonn1" onClick={handleClick}>New_grad</button>
                <button name="candena" className="buttonn1" onClick={handleClick}>candena</button>
            </div>
        </div>

    )
}