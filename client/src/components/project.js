import React from 'react';
import '../App.css';

const Project = props => {
    const completed = props.completed
    if (completed) {
        const complete = 'true'

    } else {
        const complete = 'false'
    }
    
    console.log("completed:", completed)
  return (
    <div className="users" onSubmit={props.submitHandler} onClick={() => props.getProjectActions(props.id)}><div className="user-data">
      <h4>Name: {props.name}</h4>
      <strong>Id: {props.id} </strong><br />
      <strong>Description: {props.description} </strong><br />
      <strong>Completed: {props.completed ? "true" : "false" } </strong><br />
      <strong>Click to view Actions</strong>
     
      <p></p></div>
      <div className="user-controls">
        <div className="close-button" onClick={() => props.closeProjectHandler(props.id)}>X</div>
        <button className="edit-button" onClick={() => props.editProjectHandler(props.id)}>Edit</button>
        <div className="delete-button" onClick={() => props.deleteProjectHandler(props.id)}>Delete</div>
      </div>

    </div>
  );
};



export default Project;