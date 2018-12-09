import React from 'react';
import '../App.css';

const Action = props => {
  return (
    <div className="posts" onSubmit={props.submitHandler}><div className="post-data">
      <h4><span className="high-lite3">Description: </span> <span className="high-lite">{props.description}</span></h4>
      <strong>Project Id: {props.project_id} </strong><br />
      <strong>Notes: <span className="high-lite">{props.notes}</span> </strong><br />
      <strong>Completed:<span className="high-lite"> {props.completed ? "true" : "false" }</span>  </strong><br />
      <strong>Id: {props.id} </strong>
      <p></p></div>
      <div className="post-controls">
        <div className="close-button" onClick={() => props.closeHandler(props.id)}>X</div>
        <button className="edit-button" onClick={() => props.editHandler(props.id)}>Edit</button>
        <div className="delete-button" onClick={() => props.deleteHandler(props.id)}>Delete</div>
      </div>

    </div>
  );
};



export default Action;