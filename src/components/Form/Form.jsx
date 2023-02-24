import React, { useState } from "react";
import "./form.css"
import { MultiSelect } from '@mantine/core';
import { FileInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import { useEffect } from "react";
import {  collection, addDoc } from "firebase/firestore";
import { database,storage } from "../../firebaseConfig";
import {MuiBulletedTextArea} from "react-bulleted-textarea";
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"

export default function Form() {

  const[percent,setPercent] = useState(0);
  console.log("Upload progress: ",percent);

  const [file,setFile] = useState(null);

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
    candidateTask:[""],
    jobRequirement:[""],
    benefits:[""],
    fileUrl:"File",
    applyUrl:""
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
    function postData(url){
      const data = userInput;
      //Updating file url if not updated
      data["fileUrl"] = url;
      const dbRef = collection(database,"Job");

      try{
        addDoc(dbRef,data).then(()=>{
          alert("Data uploaded successfully");
        })

      }catch(err){
        console.log("Error uploading data to database: ",err);
      }  
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


  function handleSumbit(event){
    //Prevent deafult
    event.preventDefault()

    let isEmpty = false;
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
      const storageRef = ref(storage,`/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on("state_changed",(snapshot) => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          //Update progress
          setPercent(percent);
        },(err) => console.log(err),() => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {

            //Updating state
            setUserInput(obj=>{
              return{
                ...obj,
                fileUrl: url
              }
            });
            //Post data to database
            postData(url)
            });
          }
      ); 

    }
  }

  console.log("User input: ",userInput);

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
          <label className="colour">Application Url</label>
          <input className="form-location" name="applyUrl" value={userInput.applyUrl} onChange={handleChange}
            type='text'
            placeholder="Your link" />
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
          value={file}

          onChange={(selectedFile)=>{
            //Updating  user Input
            setFile(selectedFile)
            // setUserInput(obj=>{
            //   return{
            //     ...obj,
            //     file: selectedFile
            //   }
            // });
          }}      
          />
        </div>



        <div className="inside" id="jobinput">
          <label className="colour ">Background</label>
          <textarea className="description description-bullet"
            placeholder="About your company"
            rows="12" name="background" value={userInput.background} onChange={handleChange} />
          <label className="colour padrem" id="jobD">Job Description</label>
          <textarea className="description description-bullet"
            placeholder="About the Job"
            rows="12" name="jobDescription" value={userInput.jobDescription} onChange={handleChange} />

          <label className="colour padrem">Candidate's work</label>
          <div className="bullet">
            <MuiBulletedTextArea placeholder="About what candidate will do" values={userInput.candidateTask} onChange={(list)=>{
              setUserInput(obj=>{
                return {
                  ...obj,
                  candidateTask:list
                }
              })
            }} bulletChar="•" />
          </div>
          <label className="colour padrem">Requirement</label>
          <div className="bullet">
            <MuiBulletedTextArea placeholder="Add skill requirement" name="jobRequirement" values={userInput.jobRequirement} onChange={(list)=>{
              setUserInput(obj=>{
                return {
                  ...obj,
                  jobRequirement:list
                }
              })
            }} bulletChar="•" />
          </div>
          <label className="colour padrem">Benefits</label>
          <div className="bullet">
            <MuiBulletedTextArea placeholder="About job benefits" name="benefits" values={userInput.benefits} onChange={(list)=>{
              setUserInput(obj=>{
                return {
                  ...obj,
                  benefits:list
                }
              })
            }} bulletChar="•" />
          </div>

          <button className="submit" onClick={handleSumbit}>Submit</button>

        </div>

      </form>

    </>
  )
}

