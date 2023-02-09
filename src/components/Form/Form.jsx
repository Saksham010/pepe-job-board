import React, { useState } from "react";
import "./form.css"
// import Multiselect from "multiselect-react-dropdown";
import { MultiSelect } from '@mantine/core';
import { FileInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons';

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
    description: "",
    file:File,
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

  function handle() {
    console.log("form submitted");
  }
  return (
    <>
      <form className="overlay" onsubmit={handle} >
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



        <div className="inside">
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

