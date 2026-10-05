import React from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from './task.module.css';
import { v4 as uuidv4 } from 'uuid';

import { addCustomUser } from "../../store/taskReducer";
import { delCustomData } from "../../store/taskReducer";

import { Button } from 'antd';
import { editName } from "../../store/taskReducer";

const Tasks = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.list.listArray);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "top", justifyContent: "center", paddingTop: "40px", paddingBottom: "40px" }}>
        <div className={classes.listWrapper}>
          {users.length ? users.map(el =>
            <div
              className={classes.item}
              key={uuidv4()} >
              <p style={{ backgroundColor: "#DD9E00"}}>Task's name: <span>{el.name}</span> </p>
              <br></br>
              <Button
                style={{ backgroundColor: "#00EAF2" }}
                type="primary"
                onClick={() => dispatch(editName({ name: prompt(), idOf: el.id }))} >
                  Edit this task :D
                </Button>
              <Button
                onClick={() => dispatch(delCustomData(el.id))}
                style={{ marginLeft: "20px", backgroundColor: "#EA4A00" }}
                type="primary"> Delete this task :D
              </Button>
            </div>
          )
            : <div style={{ color: 'blue', textTransform: 'uppercase' }}> Ups, it is empty </div>
          }
          <Button style={{ marginTop: "40px" }} onClick={() => dispatch(addCustomUser(prompt()))} type="primary">Add new task :D</Button>
        </div>
      </div>
    </div>
  )
}

export default Tasks;

