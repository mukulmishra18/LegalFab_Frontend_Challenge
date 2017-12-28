import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Project from './Project.jsx';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
    this.eachProject = this.eachProject.bind(this);
    this.add = this.add.bind(this);
    this.removeProject = this.removeProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
  }

  add() {
    let arr = this.state.projects;
    arr.push({
      ipType: undefined,
      refNumber: undefined,
      owner: undefined,
      inventor: undefined,
      title: undefined,
      description: undefined,
      lastModified: undefined
    });
    this.setState({ projects: arr });
  }

  removeProject(i) {
    let arr = this.state.projects;
    arr.splice(i, 1);
    this.setState({ projects: arr });
  }

  updateProject(newValues, i) {
    let arr = this.state.projects;
    arr[i].title = newValues.title;
    arr[i].ipType = newValues.ipType;
    arr[i].refNumber = newValues.refNumber;
    arr[i].owner = newValues.owner;
    arr[i].inventor = newValues.inventor;
    arr[i].description = newValues.description;
    arr[i].lastModified = newValues.lastModified;
    this.setState({ projects: arr });
  }

  eachProject(project, i) {
    return (
      <Project key={i} index={i} projects={this.state.projects} updateProject={this.updateProject} removeProject={this.removeProject} />
    );
  }

  render() {
    return (
      <div className="container">
        <div className="top-header">
          <h1 className="col-md-6">Projects</h1>
          <button type="button" onClick={this.add} className="col-sm-6 btn btn-primary create-button">+ Create New</button>
        </div>
        <div className="well">
          {this.state.projects.map(this.eachProject)}
        </div>
      </div>
    );
  }
}
