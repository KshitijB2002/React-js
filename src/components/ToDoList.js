import React, { Component } from 'react';
import * as actions  from '../actions/listAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DisplayList from '../components/DisplayList';
import AddItmeForm from './AddItemForm';
import { setInterval } from 'timers';

class ToDoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      addRow: false
    };
    this.addRow = this.addRow.bind(this);
    this.cancelAddition = this.cancelAddition.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
    this.saveEditedData = this.saveEditedData.bind(this);
  }
  componentWillReceiveProps(nextProps){
    let list = [...nextProps.toDoList];
    let oneMinut = 1000 * 60;
    let oneSecond = 1000;
    if(this.intervalId !== undefined)
      clearInterval(this.intervalId);
    this.intervalId = setInterval(()=>{
      list.map((item,index)=>{
        let timestamp = (new Date(item.reminder).getTime())/oneMinut;
        let currentTimestamp = Math.trunc((new Date().getTime())/oneMinut);
        if(timestamp === currentTimestamp && this[item.title] !== true){
          alert('Reminder for ' + item.title);
          this[item.title] = true;
        }
      });
    },oneSecond);
  }
  addRow(e){
    this.setState({addRow:true});
  }
  cancelAddition(e){
    this.setState({addRow:false});
  }
  saveEditedData(index,data){
    data.editing = false;
    this.props.actions.saveEditedAction(index,data);
  }
  saveRow(rowData){
    this.props.actions.addToToDoList(rowData);
    this.setState({
      addRow:false,
    });
  }
  enableEdit(index){
    this.props.actions.enableEditAction(index);
  }
  deleteItem(index){
    this.props.actions.deleteItemAction(index);
  }
  render(){
    let { addRow } = this.state;
    return(
      <div>
        <DisplayList data={this.props.toDoList} deleteItem={this.deleteItem} enableEdit={this.enableEdit} saveEditedData={this.saveEditedData}/>
        <div>
          {!addRow && <button type="button" onClick={this.addRow}>Add Item</button>}
        </div>
        {addRow && <div>
          <AddItmeForm saveRow={this.saveRow} />
        </div>}
      </div>
    );
  }
}

const mapStateTOProps = state => {
  return {toDoList: state.todos};
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const withConnect = connect(mapStateTOProps,mapDispatchToProps)(ToDoList);

export default withConnect;