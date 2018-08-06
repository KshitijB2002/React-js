import React, { Component } from 'react';

class AddItemForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      rowFields: {
        title: '',
        description: '',
        reminder: '',
        editing: false
      }
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOnChange(e,field){
    let rowField = Object.assign({}, this.state.rowFields);
    rowField[field] = e.target.value;
    this.setState({rowFields:rowField});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.saveRow(this.state.rowFields);
    let rowFields= {
      title: '',
      description: '',
      reminder: '',
      editing: false
    };
    this.setState({rowFields});
  }
  render(){
    let { rowFields } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Title" value={rowFields.title} required onChange={(e)=>this.handleOnChange(e,'title')}/>
        <input type="text" placeholder="Description" value={rowFields.description} required onChange={(e)=>this.handleOnChange(e,'description')}/>
        <input 
          type="datetime-local" 
          placeholder="Reminder" 
          value={rowFields.reminder}
          required
          onChange={(e)=>this.handleOnChange(e,'reminder')}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={this.cancelAddition}>Cancel</button>
      </form>
    );
  }
}

export default AddItemForm;