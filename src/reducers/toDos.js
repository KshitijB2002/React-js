import {ADD_TODO,DELETE_TODO,ENABLE_EDIT, SAVE_EDITED_DATA} from '../constants';

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:{
      return [
        ...state,
        action.payload
      ];
    }
    case DELETE_TODO:{
      let list = [...state];
      list.splice(action.payload, 1);
      return [...list];
    }
    case ENABLE_EDIT:{
      let list = [...state];
      list[action.payload].editing = true;
      return [...list];
    }
    case SAVE_EDITED_DATA:{
      let list = [...state];
      list[action.payload.index] = action.payload.data
      return [...list];
    }
    default:
      return state;
  };
};

export default todos;