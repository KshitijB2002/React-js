import React, { Component } from 'react';

class DisplayList extends Component{
  constructor(props){
    super(props);
    this.state = {
      editableItemsData:[]
    };
    this.enableEdit = this.enableEdit.bind(this);
    this.submitEditedItem = this.submitEditedItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    let arr =[];
    nextProps.data.map((item,index)=>{
      if(item.editing === true){
        if(this.state.editableItemsData[index] !== undefined){
          arr[index] = this.state.editableItemsData[index];
        } else {
          arr[index] = item;
        }
      }
    });
    this.setState({editableItemsData: arr});
  }
  enableEdit(e,index){
    this.props.enableEdit(index);
    let editableList = [...this.state.editableItemsData];
    editableList[index] = this.props.data[index];
    this.setState({editableItemsData: editableList});
  }
  submitEditedItem(index){
    this.props.saveEditedData(index,this.state.editableItemsData[index]);
  }
  handleChange(e,field,index){
    let data = Object.assign({},this.state.editableItemsData[index]);
    data[field] = e.target.value;
    let list = [...this.state.editableItemsData];
    list[index] = data;
    this.setState({editableItemsData: list});
  }
  render(){
    let itemList = this.props.data;
    let { editableItemsData } = this.state;
    return (
      <div>
        {itemList.length > 0 && <table>
          <tr>
            <th>Title</th>
            <th>Desciption</th>
            <th>Reminder</th>
            <th>Action</th>
          </tr>
          { itemList.map((item,index)=>{
              if(item.editing === false){
                let {reminder} = item;
                reminder = reminder.split('T');
                return (<tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{reminder[0] + ' ' + reminder[1]}</td>
                  <td>
                    <button type="button" onClick={(e)=>this.enableEdit(e,index)}>Edit</button>
                    <button type="button" onClick={(e)=>this.props.deleteItem(index)}>Delete</button>
                  </td>
                </tr>);
              } else {
              return (
                <tr key={index}>
                  <td>
                    <form id={"form"+index} onSubmit={(e)=>{e.preventDefault();this.submitEditedItem(index);}}>
                      <input type="text" placeholder="Title" value={editableItemsData[index].title} required onChange={(e)=>this.handleChange(e,'title',index)}/>
                    </form>
                  </td>
                  <td><input form={"form"+index} type="text" placeholder="Description" value={editableItemsData[index].description} required onChange={(e)=>this.handleChange(e,'description',index)}/></td>
                  <td>
                    <input 
                      form={"form"+index}
                      type="datetime-local" 
                      placeholder="Reminder" 
                      value={editableItemsData[index].reminder}
                      required
                      onChange={(e)=>this.handleChange(e,'reminder',index)}
                    />
                  </td>
                  <td>
                    <input form={"form"+index} type="submit" value="Submit"/>
                  </td>
                </tr>
              );
            }
          })}
        </table>}
      </div>
    );
  }
}

export default DisplayList;