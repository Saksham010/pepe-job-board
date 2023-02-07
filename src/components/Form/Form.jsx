import React, { useState } from "react";
import "./form.css"
import Multiselect from "multiselect-react-dropdown";


export default function Form() {

  const [userInput, setUserInput] = useState({
    position: "",
    company: "",
    email: "",
    minimumSalary: "",
    maximumSalary: "",
    skills: "",
    additionalSkills: "",
    location: "",
    type: "",
    description: ""
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


  const [options, setOptions]= useState([
    "C","C++","C#","Golang","Java",
    "NodeJS","Php","python","Ruby","Rust",
    "Flutter","React Native","Project Manager","Product Manager", "Social Media",
    "Marketng","Reciuiter","Solidity","Solona","javaScript",
])



  function handleChange(event) {
    // console.log(event.target.name)
    const type = event.target.name;
    const data = event.target.value;
    updateState(type, data);
  }

  function handle() {
    console.log("form submitted");
  }
  return (
    <>
      <form className="overlay" onsubmit={handle} >
        <div className="inside1">
          <label className="colour">Position</label>
          <input className="position" name="position" value={userInput.position}
            type='text'
            placeholder="Enter your position" onChange={handleChange} />
        </div>

        <div className="inside2">
          <label className="colour">Company</label>
          <input className="form-company" name="company" value={userInput.company}
            type='text'
            placeholder="Your company" onChange={handleChange} />
        </div>

        <div className="inside8">
          <label className="colour">Email</label>
          <input className="email" name="email" value={userInput.email}
            type='text'
            required
            placeholder="Your company" onChange={handleChange} />
        </div>

        <div className="inside3">
          <label className="colour">Minimum Salary</label>
          <input className="salarly" name="minimumSalary" value={userInput.minimumSalary}
            type='text'
            placeholder="Enter your expected salary" onChange={handleChange} />
        </div>

        <div className="inside3">
          <label className="colour">Maximum Salary</label>
          <input className="salarly" name="maximumSalary" value={userInput.maximumSalary}
            type='text'
            placeholder="Enter your expected salary" onChange={handleChange} />
        </div>

        <div className="inside9">
          <label className="colour" >Skills</label>
            <Multiselect className="optionssss"
            isObject={false}
            onRemove={(event)=>{console.log(event)}}
            onSelect={(event)=>{console.log(event)}}
            options= {options}
            showCheckbox={false}
            hidePlaceholder={false}
            keepSearchTerm={true}
              />
        </div>


        <div className="inside9">
          <label className="colour">Additional Skills</label>
          <input className="skill"
            type='text'
            placeholder="Other skills" />
        </div>


        <div className="inside4">
          <label className="colour">Location</label>
          <input className="form-location" name="location" value={userInput.location} onChange={handleChange}
            type='text'
            placeholder="Your location" />
        </div>

        <div className="inside5">
          <label className="colour">Type</label>
          <select className="type" onChange={handleChange} name="type">
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="inside6">
          <label className="colour">Description</label>
          <textarea className="description"
            placeholder="About your Company"
            rows="6" name="description" value={userInput.description} onChange={handleChange} />
          <button className="submit">Submit</button>
        </div>
      </form>

    </>
  )
}

