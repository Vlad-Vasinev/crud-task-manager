import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag, Card, Empty, Space } from 'antd';
import { delCustomData } from '../../../store/taskReducer';
import TaskForm from '../taskForm/taskForm';

import classes from './task.module.css';

const statusColor = {
  'To Do': 'default',
  'In Progress': 'processing',
  'Done': 'success',
};

const priorityColor = {
  Low: 'green',
  Medium: 'orange',
  High: 'red',
};

const Tasks = () => {

  const [editingTask, setEditingTask] = useState(null);
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.list.listArray);

  const startEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => setEditingTask(null);

  return (
    <div style={{ margin: '0 auto', padding: 24 }}>
      
      <TaskForm editingTask={editingTask} onCancelEdit={cancelEdit}/>

      {tasks.length === 0 ? (
        <Empty description="Ups, it is empty!" />
      ) : (
        <div className={classes.taskGrid}>
          {tasks.map(task => (
            <Card
              key={task.id}
              title={task.title}
              extra={
                <div>
                  <Button onClick={() => startEdit(task)}>Edit</Button>
                  <Button danger onClick={() => {
                    if (window.confirm(`Remove task: "${task.title}"?`)) {
                      dispatch(delCustomData(task.id));
                    }
                  }}>
                    Delete
                  </Button>
                </div>
              }
            >
              {task.description && <p>{task.description}</p>}

              <Space wrap>
                <Tag color={statusColor[task.status]}>{task.status}</Tag>
                <Tag color={priorityColor[task.priority]}>{task.priority}</Tag>
                {task.dueDate && <div>{task.dueDate}</div>}
              </Space>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;