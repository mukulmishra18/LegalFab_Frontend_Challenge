import React from 'react';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.renderNormal = this.renderNormal.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.state = {
      editing: true
    };
  }

  save() {
    console.log(this.refs);
    let lastModified = `${(new Date()).toDateString()} ${(new Date()).toLocaleTimeString()}`;
    let newValues = {
      ipType: this.refs.ipType.value,
      refNumber: this.refs.refNumber.value,
      owner: this.refs.owner.value,
      inventor: this.refs.inventor.value,
      title: this.refs.title ? this.refs.title.value : this.props.projects[this.props.index].title,
      description: this.refs.description.value,
      lastModified: lastModified
    };

    this.props.updateProject(newValues, this.props.index);
    this.setState({ editing: false });
  }

  edit() {
    this.setState({ editing: true });
  }

  remove() {
    this.props.removeProject(this.props.index);
  }

  renderNormal() {
    console.log(this.props.projects, this.props.index);
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

  renderForm() {
    let i = this.props.index;
    return (
      <div className="form-horizontal form-container">
        <div className="form-group">
          <label className="control-label col-sm-2 form-label">Select IP Type*</label>
          <div className="col-md-6">
              <select className="form-control" ref="ipType">
                <option selected={this.props.projects[i].ipType == 'Patent' ? "selected" : ""}>Patent</option>
                <option selected={this.props.projects[i].ipType == 'Trademark' ? "selected" : ""}>Trademark</option>
                <option selected={this.props.projects[i].ipType == 'Copyright' ? "selected" : ""}>Copyright</option>
                <option selected={this.props.projects[i].ipType == 'Others' ? "selected" : ""}>Others</option>
              </select>
            </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2 form-label">IP Reference Number</label>
          <div className="col-md-6">
            <input className="form-control" placeholder="Enter Reference Number" ref="refNumber" defaultValue={this.props.projects[i].refNumber} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2 form-label">Owner</label>
          <div className="col-md-6">          
            <input className="form-control" placeholder="Enter owner" ref="owner" defaultValue={this.props.projects[i].owner}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2 form-label">Name Of Inventor</label>
          <div className="col-md-6">          
            <input className="form-control" placeholder="Enter inventor" ref="inventor" defaultValue={this.props.projects[i].inventor} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2 form-label">Project Title*</label>
          <div className="col-md-6">
            {(() => {
              let i = this.props.index;
              if(this.props.projects[i].title) {
                return(<p>{this.props.projects[i].title}</p>)
              }
              return(<input className="form-control" placeholder="Enter title" ref="title"/>)
            })()}
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2 form-label">Summary*</label>
          <div className="col-md-6">          
            <textarea className="form-control" placeholder="Enter description" ref="description" defaultValue={this.props.projects[i].description}/>
          </div>
        </div>
        <div className="form-group">        
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-success submit" onClick={this.save}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if(this.state.editing) {
      return this.renderForm();
    }
    return this.renderNormal();
  }
}
