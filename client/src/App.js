import React, { Component } from 'react';
import logo from './logo.svg';
import Action from "./components/action";
import Project from "./components/project";
import axios from "axios"
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      actions: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5050/api/projects')
      .then(response => {
        console.log("response:", response)
        this.setState(() => ({ projects: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });

    axios
      .get('http://localhost:5050/api/actions')
      .then(response => {
        this.setState(() => ({ actions: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });





  }

  closeHandler = (id) => {
    alert("CLOSE function is disabled in LITE version, :) Please purchase the full version to enable this feature.")

  }

  closeProjectHandler = (id) => {
    alert("function is unavailable at this time...")

  }

  editHandler = id => {
    alert("Function EDIT is disabled in LITE version, :) Please purchase the FULL version to enable this feature.")

  }

  editUserHandler = id => {
    alert("Function EDIT is disabled in LITE version, :) Please purchase the FULL version to enable this feature.")

  }

  getProjectActions = id => {
    axios
      .get(`http://localhost:5050/api/projects/actions/${id}`)
      .then(response => {
        this.setState(() => ({ actions: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });


  }

  deleteHandler = (id) => {
    axios
      .delete(`http://localhost:5050/api/actions/${id}`)
      .then(response => {
        this.getHandler();
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  deleteProjectHandler = (id) => {
    axios
      .delete(`http://localhost:5050/api/projects/${id}`)
      .then(response => {
        this.getProjectHandler(); 
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  getHandler = (e) => {
    axios
      .get('http://localhost:5050/api/actions')
      .then(response => {
        this.setState(() => ({ actions: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  getProjectHandler = e => {
    axios
      .get('http://localhost:5050/api/projects')
      .then(response => {
        this.setState(() => ({ projects: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  genericMessage = e => {
    alert("Function not available at this time...");
  }

  render() {

    return (
      <div className="container">
        <div className="header-container">
          <div className="create-button">
            <button className="create" onClick={this.genericMessage}>New Project</button>
          </div>
          <h2>Sprint Challenge: Node Express</h2>
          <div className="create-button">
            <button className="create" onClick={this.genericMessage}>New Action</button>
          </div>
        </div>
        <div className="container-lower">
          <div className="container-left"><h3>Projects</h3><ul>{this.state.projects.map(project => {
            return (
              <Project
                name={project.name}
                id={project.id}
                description={project.description}
                completed={project.completed}
                key={project.id}
                getProjectActions={this.getProjectActions}
                editProjectHandler={this.editProjectHandler}
                deleteProjectHandler={this.deleteProjectHandler}
                closeProjectHandler={this.closeProjectHandler}
              />);
          })}
          </ul></div>
          <div className="container-middle"><h3>Actions</h3>
            <ul>{this.state.actions.map(action => {
              return (
                <Action
                  description={action.description}
                  project_id={action.project_id}
                  notes={action.notes}
                  completed={action.completed}
                  key={action.id}
                  id={action.id}
                  editHandler={this.editHandler}
                  deleteHandler={this.deleteHandler}
                  closeHandler={this.closeHandler}
                />);
            })}
            </ul>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
