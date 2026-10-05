import { v4 as uuidv4 } from 'uuid';

const listState = {
  listArray: [
    {
      id: uuidv4(),
      title: 'Learn React',
      description: 'Learn React and Redux, learn hooks',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2026-10-15',
    },
    {
      id: uuidv4(),
      title: 'Learn Angular',
      description: 'Learn Angular using Youtube guide...',
      status: 'To Do',
      priority: 'Medium',
      dueDate: '',
    },
  ],
};

const ADD_TASK = 'ADD_TASK';
const EDIT_TASK = 'EDIT_TASK';
const DEL_DATA = 'DEL_DATA';

export const ListReducer = (state = listState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        listArray: [...state.listArray, action.payload],
      };

    case EDIT_TASK:
      return {
        ...state,
        listArray: state.listArray.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };

    case DEL_DATA:
      return {
        ...state,
        listArray: state.listArray.filter(el => el.id !== action.payload),
      };

    default:
      return state;
  }
};

export const addCustomData = (payload) => ({ type: 'ADD_TASK', payload });
export const editTask = (payload) => ({ type: 'EDIT_TASK', payload });
export const delCustomData = (payload) => ({ type: 'DEL_DATA', payload });