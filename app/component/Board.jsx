import React from 'react';
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
    console.log(arr);
    arr[i].title = newValues.title;
    arr[i].ipType = newValues.ipType;
    arr[i].refNumber = newValues.refNumber;
    arr[i].owner = newValues.owner;
    arr[i].inventor = newValues.inventor;
    arr[i].description = newValues.description;
    arr[i].lastModified = newValues.lastModified;
    console.log(arr);
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
        <div className="text-center top-header">
          <h1>Projects</h1>
        </div>
        {this.state.projects.map(this.eachProject)}
        <button type="button" onClick={this.add} className="btn btn-primary create-button">+ Create New</button>
      </div>
    );
  }
}
