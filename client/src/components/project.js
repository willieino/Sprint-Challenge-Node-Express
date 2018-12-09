import React from 'react';
import '../App.css';

const Project = props => {
    
  return (
    <div className="users" onSubmit={props.submitHandler} onClick={() => props.getProjectActions(props.id)}><div className="user-data">
      <h4><span className="high-lite3">Name: </span><span className="high-lite">{props.name}</span></h4>
      <strong>Id: {props.id} </strong><br />
      <strong>Description: <span className="high-lite2">{props.description}</span> </strong><br />
      <strong>Completed: <span className="high-lite2">{props.completed ? "true" : "false" }</span> </strong><br />
      <strong> <span className="high-lite4">Click to view Actions</span></strong>
     
      <p></p></div>
      <div className="user-controls">
        <div className="close-button" onClick={() => props.closeProjectHandler(props.id)}>X</div>
        <button className="edit-button" onClick={() => props.closeProjectHandler(props.id)}>Edit</button>
        <div className="delete-button" onClick={() => props.deleteProjectHandler(props.id)}>Delete</div>
      </div>

    </div>
  );
};



export default Project;