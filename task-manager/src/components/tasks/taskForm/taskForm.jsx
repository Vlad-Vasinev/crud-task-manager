import React, { useEffect } from 'react';
import { Form, Input, Select, Radio, DatePicker, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { addCustomData, editTask } from '../../../store/taskReducer';

import classes from './taskForm.module.css';
const { TextArea } = Input;

const TaskForm = ({ editingTask, onCancelEdit }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

   useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate ? dayjs(editingTask.dueDate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

   const onFinish = (values) => {
    const payload = {
      title: values.title,
      description: values.description || '',
      status: values.status,
      priority: values.priority,
      dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : '',
    };

    if (editingTask) {
      dispatch(editTask({ id: editingTask.id, ...payload }));
      onCancelEdit();
    } else {
      dispatch(addCustomData({ id: uuidv4(), ...payload }));
    }

    form.resetFields();
  };
  return (
    <Form
      className={classes.form}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ status: 'To Do', priority: 'Medium' }}
    >
      <Form.Item
        name="title"
        label="Title"
        className={classes.formLabel}
        rules={[{ required: true, message: 'Type the name of the task:' }]}
      >
        <Input placeholder="What do we need to do?" />
      </Form.Item>

      <Form.Item className={classes.formLabel} name="description" label="Description">
        <TextArea rows={3} placeholder="Description" />
      </Form.Item>

      <Form.Item className={classes.formLabel} name="status" label="Status">
        <Select
          options={[
            { value: 'To Do', label: 'To Do' },
            { value: 'In Progress', label: 'In Progress' },
            { value: 'Done', label: 'Done' },
          ]}
        />
      </Form.Item>

      <Form.Item className={classes.formLabel} name="priority" label="Priority">
        <Radio.Group>
          <Radio value="Low">Low</Radio>
          <Radio value="Medium">Medium</Radio>
          <Radio value="High">High</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item className={classes.formLabel} name="dueDate" label="Due date">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Add task
      </Button>
    </Form>
  );
};

export default TaskForm;