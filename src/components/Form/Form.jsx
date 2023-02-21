import React, { useState } from "react";
import "./form.css"
// import Multiselect from "multiselect-react-dropdown";
import { MultiSelect } from '@mantine/core';
import { FileInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import { useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";

//  const image_input = document.querySelector('#image_input');
//  var uploaded_image = '';
//  image_input.addEventListener('change', function () {
//    const reader = new FileReader();
//    reader.addEventListener('load', () => {
//      uploaded_image = reader.result;
//      document.querySelector('#display').style.backgroundImage = `url(${uploaded_image}) `
//    })
//    reader.readAsDataURL(this.files[0]);
//  })


export default function Form() {

  //  function click() {
  //    var uploaded_image = '';
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //      uploaded_image = reader.result;
  //     //  document.querySelector('#display').style.backgroundImage = `%PUBLIC_URL%/${uploaded_image}`
  //   })
  //    reader.readAsDataURL(this.files[0]);
  //  }




  const [userInput, setUserInput] = useState({
    position: "",
    company: "",
    email: "",
    minimumSalary: "",
    maximumSalary: "",
    skills: [],
    additionalSkills: [],
    location: "",
    type: "",
    background: "",
    jobDescription:"",
    candidateTask:"",
    jobRequirement:"",
    benefits:"",
    parsedCandidateTask:"",
    parsedJobRequirement:"",
    parsedBenefits:"",
    file:"File",
  })
  console.log(userInput);

  function updateState(key, value) {
    setUserInput(obj => {
      const retObj = {
        ...obj,
      }
      retObj[key] = value;
      return retObj;
    })
  }

    //Save data to the database
    function postData(){
      const dbRef = collection(database,"Job");
      addDoc(dbRef,userInput).then(alert("Data uploaded successfully")).catch(alert("Error uploading data to the databse"));
  
    }



  const options =  [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'rust', label: 'Rust' },
    { value: 'solidity', label: 'Solidity' },
    { value: 'js', label: 'Javascript' },
    { value: 'typescript', label: 'Typescript' },
    { value: 'nodejs', label: 'Node js' },
    { value: 'express', label: 'Express' },
    { value: 'hardhat', label: 'Hardhat' },    
    { value: 'Foundry', label: 'Foundry' },    
  ];

  const [additionalOptions,setadditional] = useState([
    {value:'', label:''}
  ])



  function handleChange(event) {
    // console.log(event.target.name)
    const type = event.target.name;
    const data = event.target.value;
    updateState(type, data);
  }

  function handleTextArea(event){
    const data = event.target.value;
    const type = event.target.name;
    const previousLength = userInput[type].length;
    const bullet = "\u2022";
    const newLength = event.target.value.length;
    const characterCode = event.target.value.substr(-1).charCodeAt(0);

    console.log("newlenght: ",newLength);
    console.log("prevlength: ", previousLength);
  
    if (newLength > previousLength) {
      if (characterCode === 10) {
        let modifieddata = `${data}${bullet} `
        updateState(type,modifieddata)
      } else if (newLength === 1) {
        let modifieddata = `${bullet} ${data}`;
        updateState(type,modifieddata);
      }else{
        updateState(type,data);
      }
    }
    else{
      if(newLength === 2){
        updateState(type,"");
      }
      else{
        updateState(type,data);

      }
    }
  }

  useEffect(()=>{
    parseToJSX();

  },[userInput.jobRequirement, userInput.candidateTask, userInput.benefits]);

  //Function to parsed int jsx
  function parseToJSX(event){
    const task = userInput.candidateTask;
    const benefit = userInput.benefits;
    const requirement = userInput.jobRequirement;

    //Parsing task
    let openedtask =  task.replaceAll("\u2022","<li>");
    let closedtask = openedtask.replaceAll("\n","</li>\n");

    //Parsing benefit
    let openedbenefit =  benefit.replaceAll("\u2022","<li>");
    let closedbenefit = openedbenefit.replaceAll("\n","</li>\n");

    //Parsing requirement
    let openedrequirement =  requirement.replaceAll("\u2022","<li>");
    let closedrequirement = openedrequirement.replaceAll("\n","</li>\n");

    //Updating state
    setUserInput(obj=>{
      return{
        ...obj,
        parsedJobRequirement:closedrequirement,
        parsedBenefits:closedbenefit,
        parsedCandidateTask:closedtask,
      }
    })
    
  }

  

  //Function to clean parsed jsx on submit
  function cleanParsedData(type){
    const data = userInput[type];

    // case I: if bullet is only left
    if(data.slice(-5) == "<li> " || data.slice(-5) == "<li>"){
      const trimmedString = data.slice(0,-5);
      //Update the parsed String
      setUserInput(obj=>{
        let testobj = {...obj,};
        testobj[type] = trimmedString;
        return testobj;
      })
    }
    else if(data.slice(-1) == "\n"){
      const trimmedString = data.slice(0,-1);
      //Update the parsed String
      setUserInput(obj=>{
        let testobj = {...obj,};
        testobj[type] = trimmedString;
        return testobj;
      })
    }
    else if(data.slice(-5) != "<li> " && data != ""){
      const finalString = data.concat("</li>");
      //Update the parsed String
      setUserInput(obj=>{
        let testobj = {...obj,};
        testobj[type] = finalString;
        return testobj;
      })
    }

  }


  function handleSumbit(event){
    //Prevent deafult
    event.preventDefault()

    //Clean parsing    
    cleanParsedData("parsedCandidateTask");
    cleanParsedData("parsedBenefits");
    cleanParsedData("parsedJobRequirement");

    let isEmpty = false;
    setTimeout(()=>{
      //Check if any data is empty
      let obKeys = Object.keys(userInput);
      obKeys.map((key)=>{

        if(userInput[key] == "" || userInput[key] == []){
          isEmpty = true;
        }
      });


      //If empty give alert
      if(isEmpty){
        alert("Completely fill all of the input box");
      }
      else{
        //Post data to database
        postData();
      }

    },1000 )

  }

  return (
    <>
      <form className="overlay"  >
        <div className="inside" >
          <label className="colour">Position</label>
          <input className="position" name="position" value={userInput.position}
            type='text'
            placeholder="Enter your position" onChange={handleChange} />
        </div>

        <div className="inside">
          <label className="colour">Company</label>
          <input className="form-company" name="company" value={userInput.company}
            type='text'
            placeholder="Your company" onChange={handleChange} />
        </div>

        <div className="inside">
          <label className="colour">Email</label>
          <input className="email" name="email" value={userInput.email}
            type='text'
            required
            placeholder="Your company" onChange={handleChange} />
        </div>

        <div className="inside">
          <label className="colour">Minimum Salary</label>
          <input className="salarly" name="minimumSalary" value={userInput.minimumSalary}
            type='text'
            placeholder="Enter your expected salary" onChange={handleChange} />
        </div>

        <div className="inside">
          <label className="colour">Maximum Salary</label>
          <input className="salarly" name="maximumSalary" value={userInput.maximumSalary}
            type='text'
            placeholder="Enter your expected salary" onChange={handleChange} />
        </div>

      
          <div className="inside" id="skillContainer">
            <label className="colour" >Skills</label>
            <MultiSelect
                  data={options}
                  placeholder="Skills"
                  searchable
                  nothingFound="Nothing found"
                  clearButtonLabel="Clear selection"
                  clearable
                  onChange={(selctedValueArray)=>{
                      //Updating  user Input
                      setUserInput(obj=>{
                        return{
                          ...obj,
                          skills: [...selctedValueArray]
                        }
                      });
                    }
                  }
            
                />
          </div>


          <div className="inside" id="additionalContainer">
            <label className="colour">Additional Skills</label>
            <MultiSelect
                  data={additionalOptions}
                  placeholder="Additional Skills"
                  clearButtonLabel="Clear selection"
                  clearable
                  searchable
                  creatable
                  getCreateLabel={(query) => `+ Create ${query}`}
                  onCreate={(query) => {
                    const item = { value: query, label: query };
                    setadditional((current) => [...current, item]);
                    return item;
                  }}
                  onChange={(selctedValueArray)=>{
                    //Updating  user Input
                    setUserInput(obj=>{
                      return{
                        ...obj,
                        additionalSkills: [...selctedValueArray]
                      }
                    });
                  }}  
                              
                />
          </div>


        <div className="inside">
          <label className="colour">Location</label>
          <input className="form-location" name="location" value={userInput.location} onChange={handleChange}
            type='text'
            placeholder="Your location" />
        </div>

        <div className="inside">
          <label className="colour">Type</label>
          <select className="type" onChange={handleChange} name="type">
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
          </select>
        </div>



        <div className="inside">
          {/* <input type="file" id="image_input" onClick={click}/> */}
          <FileInput
          label="Logo"
          placeholder="Choose a picture" 
          icon={<IconUpload size={14} />} 
          value={userInput.file}

          onChange={(selectedFile)=>{
            //Updating  user Input
            setUserInput(obj=>{
              return{
                ...obj,
                file: selectedFile
              }
            });
          }}      
          />
        </div>



        <div className="inside" id="jobinput">
          <label className="colour ">Background</label>
          <textarea className="description description-bullet"
            placeholder="About your company"
            rows="12" name="background" value={userInput.background} onChange={handleChange} />
          <label className="colour padrem">Job Description</label>
          <textarea className="description description-bullet"
            placeholder="About the Job"
            rows="12" name="jobDescription" value={userInput.jobDescription} onChange={handleChange} />

          <label className="colour padrem">Candidate's work</label>
          <textarea className="description description-bullet"
            placeholder="About what the candidate will do"
            rows="12" name="candidateTask" value={userInput.candidateTask} onChange={handleTextArea} />
          <label className="colour padrem">Requirement</label>
          <textarea className="description description-bullet"
            placeholder="About skill requirement"
            rows="12" name="jobRequirement" value={userInput.jobRequirement} onChange={handleTextArea} />
          <label className="colour padrem">Benefits</label>
          <textarea className="description description-bullet"
            placeholder="About job benefits"
            rows="12" name="benefits" value={userInput.benefits} onChange={handleTextArea} />
          <button className="submit" onClick={handleSumbit}>Submit</button>
        </div>
      </form>

    </>
  )
}

