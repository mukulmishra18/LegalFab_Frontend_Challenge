import React from 'react';
import RenderForm from './RenderForm.jsx';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.setEditingToFalse = this.setEditingToFalse.bind(this);
    this.renderNormal = this.renderNormal.bind(this);
    this.state = {
      editing: true
    };
  }

  setEditingToFalse() {
    this.setState({ editing: false });
  }

  edit() {
    this.setState({ editing: true });
  }

  remove() {
    this.props.removeProject(this.props.index);
  }

  renderNormal() {
    let i = this.props.index;
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">{this.props.projects[i].title}</h4>
          <p className="card-subtitle mb-2 text-muted">{this.props.projects[i].description}</p>
          <p className="card-text modified-date">{this.props.projects[i].lastModified}</p>
          <button className="card-link btn btn-primary" onClick={this.edit}>Edit</button>
          <button className="card-link btn btn-danger" onClick={this.remove}>Remove</button>
        </div>
      </div>
    );
  }

  render() {
    if(this.state.editing) {
      return <RenderForm index={this.props.index} projects={this.props.projects} updateProject={this.props.updateProject} setEditingToFalse={this.setEditingToFalse}></RenderForm>;
    }
    return this.renderNormal();
  }
}
