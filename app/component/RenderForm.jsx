import React from 'react';

export default class RenderForm extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save() {
    if (this.refs.title && this.refs.title.value != '') {
      $('#title-text').css("border-color", "#ccc");
      $('#title').html('');
    }
    if (this.refs.description.value != '') {
      $('#desc-text').css("border-color", "#ccc")
      $('#description').html('');
    }
    if (this.refs.title && this.refs.title.value == '') {
      if (this.refs.description.value == '') {
        $('#description').html('<small class="invalid-feedback">This field is requied</small>');
        $("#desc-text").css("border-color", "red");
      }
      $('#title').html('<small class="invalid-feedback">This field is requied</small>');
      $("#title-text").css("border-color", "red");
      return;
    }
    if (this.refs.description.value == '') {
      $('#description').html('<small class="form-text text-muted">This field is requied</small>');
      $("#desc-text").css("border-color", "red");
      return;  
    }

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
    this.props.setEditingToFalse();
  }

  render() {
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
              return(<input id="title-text" className="form-control" placeholder="Enter title" ref="title"/>)
            })()}
            <div id="title"></div>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2 form-label">Summary*</label>
          <div className="col-md-6">          
            <textarea id="desc-text" className="form-control" placeholder="Enter description" ref="description" defaultValue={this.props.projects[i].description}/>
            <div id="description"></div>
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
}