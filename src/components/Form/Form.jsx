import React from "react";
import "./form.css"

export default function Form() {
  return (
    <>
      <form className="overlay">
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


        <div className="inside3">
          <label className="colour">Salarly</label>
          <input className="salarly"
            type='text'
            placeholder="Enter your expected salarly" />
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
          rows="6"/>
        <button className="submit">Submit</button>
        </div>
      </form> 

    </>
  )
}

