import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag, Card, Typography, Empty, Space } from 'antd';
import { delCustomData } from '../../../store/taskReducer';
import TaskForm from '../taskForm/taskForm';

import classes from './task.module.css';
const { Title, Paragraph, Text } = Typography;

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
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.list.listArray);

  return (
    <div style={{ margin: '0 auto', padding: 24 }}>
      
      <TaskForm />

      {tasks.length === 0 ? (
        <Empty description="Ups, it is empty!" />
      ) : (
        <div className={classes.taskGrid}>
          {tasks.map(task => (
            <Card
              key={task.id}
              title={task.title}
              extra={
                <Button danger onClick={() => dispatch(delCustomData(task.id))}>
                  Delete
                </Button>
              }
            >
              {task.description && <Paragraph>{task.description}</Paragraph>}

              <Space wrap>
                <Tag color={statusColor[task.status]}>{task.status}</Tag>
                <Tag color={priorityColor[task.priority]}>{task.priority}</Tag>
                {task.dueDate && <Text type="secondary">Due: {task.dueDate}</Text>}
              </Space>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;