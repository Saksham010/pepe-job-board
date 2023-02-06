import React, { useState } from "react";
import "./form.css"


export default function Form() {
  const [email, setEmail] = useState('')

  function handle() {
    console.log("name value:" + email)
  }
  return (
    <>
      <form className="overlay" onsubmit={handle} >
        <div className="inside">
          <label className="colour">Title</label>
          <input className="form-title"
            type='text'
            placeholder="Enter Title" />
        </div>

        <div className="inside1">
          <label className="colour">position</label>
          <input className="position"
            type='text'
            placeholder="Enter your position" />
        </div>

        <div className="inside2">
          <label className="colour">Company</label>
          <input className="form-company"
            type='text'
            placeholder="Your company" />
        </div>



        <div className="inside8">
          <label className="colour">Email</label>
          <input className="email"
            type='text'
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your company" />
        </div>




        <div className="inside3">
          <label className="colour">Minimum Salarly</label>
          <input className="salarly"
            type='text'
            placeholder="Enter your expected salarly" />
        </div>



        <div className="inside3">
          <label className="colour">Maximum Salarly</label>
          <input className="salarly"
            type='text'
            placeholder="Enter your expected salarly" />
        </div>

        <div className="inside9">
          <label className="colour">Skills</label>
          <select className="skill">
            <option>select</option>
            <option>C</option>
            <option>C++</option>
            <option>SOlona</option>
            <option>Front End (javaScript)</option>
            <option>React</option>
            <option>C#/ .Net</option>
            <option>Java</option>
            <option>Php</option>
            <option>Python</option>
            <option>Node.js</option>
            <option>Ruby</option>
            <option>design</option>
            <option>Social media</option>
            <option>Anlyst</option>
            <option>project manager</option>
            <option>sevurity</option>
            <option>scala</option>
            <option>product manager</option>
            <option>product manager</option>
            <option>product manager</option>
            <option>product manager</option>
            <option>product manager</option>
            <option>product manager</option>
          </select>
        </div>


        <div className="inside9">
          <label className="colour">skills</label>
          <input className="skill"
            type='text'
            placeholder="other skills" />
        </div>


        <div className="inside4">
          <label className="colour">Location</label>
          <input className="form-location"
            type='text'
            placeholder="Your location" />
        </div>

        <div className="inside5">
          <label className="colour">Type</label>
          <select className="type">
            <option>select</option>
            <option>Jobs</option>
            <option>InternShip</option>
          </select>
        </div>

        <div className="inside6">
          <label className="colour">Decription</label>
          <textarea className="description"
            placeholder="About your Company"
            rows="6" />
          <button className="submit">Submit</button>
        </div>
      </form>

    </>
  )
}

