import "./homepage.css";
import { useState } from "react";
import { Pagination } from '@mantine/core';
import 'winbox/dist/css/winbox.min.css'; // required
// import 'winbox/dist/css/themes/modern.min.css'; // optional
import WinBox from 'react-winbox';
export default function Homepage(){

    //Pagination
    const [activePage,setPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(5);

    const [jobs,setJobs] = useState([{
        title:"Blockchain intern",
        company:"Binance",
        imgPath:"./binance.png",
        location:"Remote"
    },{
        title:"Solidity intern",
        company:"Consensys",
        imgPath:"./binance.png",
        location:"Remote"
    },{
        title:"Solidity intern3",
        company:"Consensys",
        imgPath:"./binance.png",
        location:"Remote"
    },{
        title:"Solidity intern4",
        company:"Consensys",
        imgPath:"./binance.png",
        location:"Remote"
    },{
        title:"Solidity intern5",
        company:"Consensys",
        imgPath:"./binance.png",
        location:"Remote"
    },{
        title:"Solidity intern6",
        company:"Consensys",
        imgPath:"./binance.png",
        location:"Remote"
    },{
        title:"Solidity intern7",
        company:"Consensys",
        imgPath:"./binance.png",
        location:"Remote"
    },{
        title:"Solidity intern8",
        company:"Consensys",
        imgPath:"./binance.png",
        location:"Remote"
    },{
        title:"Solidity intern9",
        company:"Consensys",
        imgPath:"./binance.png",
        location:"Remote"
    },{
        title:"Solidity intern10",
        company:"Consensys",
        imgPath:"./binance.png",
        location:"Remote"
    }])

    const lastIndex = activePage * recordPerPage;
    const firstIndex = lastIndex - recordPerPage;
    const currentRecords = jobs.slice(firstIndex,lastIndex);

    //Get total number of jobs
    function getTotalJobs(){

        let count =0;
        jobs.map(obj=>{
            count++;
            
        })
        return count;
    }

    //State for winbox
    const[showBox,setShowBox] = useState([-1]);


    console.log("show box: ",showBox);

    //Handle close
    function handleClose(index){
        setShowBox(arr=>{
            return arr.filter(x => x != index);
        })
    }

    function showWinbox(data, index){
        
        return(
            <>
                {showBox.map(value=>{
                    console.log("value: ",value, "Index: ",index);
                    if(value == index){
                       return(

                        <WinBox
                            width={500}
                            height={300}
                            x="center"
                            y={30}
                            onClose={()=>{handleClose(index)}}
                            >
                            <div>
                                <h1>{data}</h1>
                            </div>
                        </WinBox>
                       )

                    }
                })}

            </>
        )
    }


    function element(title,company,imgPath,location,index){
        return(

            <>
            
                <div className="job-box" key={index} onClick={()=>{
                    //Toggle display of winbox
                    // toggleWinbox(index);
                    let isopen = false;
                    showBox.map(i =>{
                        console.log("i:Vale ",i, "index: ",index);
                        if(i == index){
                            isopen = true;
                        }
                    })
                    if(isopen == false){
                        setShowBox(prevarr =>{
                            return [...prevarr, index];
                        })
                    }
                    else{
                        console.log("already open")
                    }

                }}>
                    <div className="job-first">
                        <div className="job-logo">
                            <img src={imgPath} alt="logo"/>
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
                {showWinbox(title,index)};

            </>   

        );

    }


    const content = currentRecords.map((obj,i)=>{
        return (
            <>
                {element(obj.title,obj.company,obj.imgPath,obj.location,i)}
                <br/>
            </>
        )
    })
    console.log(activePage);

    //Close all opened box
    function closeBox(){
        setShowBox(prev=>{
            return [-1];
        })
    }

    return(
        <div className="homepage">
            <div className="job-container ">

                {content}

                <Pagination page={activePage} onChange={(pageNumber)=>{
                    setPage(pageNumber);
                    //Close opened box
                    closeBox();
                }} total={Math.ceil(getTotalJobs()/5)} color="teal" position="center"/>
            </div>


        </div>

    )
}