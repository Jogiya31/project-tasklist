import React, { useEffect, useMemo, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from './taskSlice';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import TaskCard from '../../components/TaskCard';
import CustomModal from '../../components/customModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import ExportToExcel from '../../components/ExportToExcel';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string(),
});

const Tasks = () => {
  const initialValues = {
    title: '',
    description: '',
  };
  const dispatch = useDispatch();
  const [completeTasks, setCompleteTasks] = useState([])
  const [inCompleteTasks, setInCompleteTasks] = useState([])
  const [showTask, setShowTask] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [currentData, setCurrentData] = useState(null)
  const [excelData, setExcelData] = useState([])
  
  // get data from redux store
  const tasksList = useSelector((state) => state.tasks.data);

  // enable add new task modal
  const handleShowTask = () =>setShowTask(true);
  const handleCloseTask = () =>{
    setCurrentData(null)
    setShowTask(false)
  }

  // enable delete task modal
  const handleShowDelete = () =>setShowDelete(true);
  const handleCloseDelete = () =>setShowDelete(false);

  useEffect(() => {
      dispatch(taskActions.getTasks());
  }, [])

  useEffect(() => {
    if(tasksList.length>0){
      handleExport()
      setCompleteTasks(tasksList.filter(item=>item.completed))
      setInCompleteTasks(tasksList.filter(item=>!item.completed))
    }
  }, [tasksList])

  // add new task in list
  const handleSubmit = (values) => {
    if(currentData !== null){
      const payload = {...currentData, title: values.title, description:values.description}
      dispatch(taskActions.updateTask(payload))
    }
    else
    {
      const payload = {...values,completed:false}
      dispatch(taskActions.addTask(payload));
    }
    setCurrentData(null);
    handleCloseTask();
    setTimeout(()=>{
      dispatch(taskActions.getTasks());
    },500)
  };

  // delete task from list
  const handleDelete=()=>{
    dispatch(taskActions.deleteTask(currentData.id));
    setCurrentData(null);
    handleCloseDelete();
    setTimeout(()=>{
      dispatch(taskActions.getTasks());
    },500)
  }

  // create export xlsx file with custom header
  const handleExport =()=>{
    const customHeadings = tasksList.map(task=>({
      "Sno": task.id,
      "Title": task.title,
      "Description": task.description,
      "Status":task.completed ? "Completed":"Not Completed"
    }))
    setExcelData(customHeadings)
  }

 const onDragEnd = (result)=>{
  const { destination, source, draggableId } = result;
  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  if (destination.droppableId === "complete") {
    tasksList.map(task=>{
      if(task.id === Number(draggableId)){
        const payload = {...task, completed:true}
        dispatch(taskActions.updateTask(payload))
        setTimeout(()=>{
          dispatch(taskActions.getTasks());
        },100)
      }
    })
  }else if(destination.droppableId === "taskslist") {
    tasksList.map(task=>{
      if(task.id === Number(draggableId)){
        const payload = {...task, completed:false}
        dispatch(taskActions.updateTask(payload))
        setTimeout(()=>{
          dispatch(taskActions.getTasks());
        },100)
      }
    })
  }
 }

  return (
    <DragDropContext onDragEnd={onDragEnd} >
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col>
          <div className='d-flex justify-content-center head'>
            <h2>Task management</h2>
          </div >
          <div className='d-flex justify-content-end mt-3'>
          <Button className='mr-2' onClick={()=>handleShowTask()}>Add Task</Button>
          <ExportToExcel apiData={excelData} fileName="Task list"  />
          </div>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col className='task-container'>
          <Droppable droppableId="taskslist">
            {(provided) => (
              <Card
                className="tasks" ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <CardHeader className="header">InComplete Task</CardHeader>
                {inCompleteTasks.map((task,idx) => (
                  <TaskCard task={task} key={idx} index={idx} showDelete={handleShowDelete} showEdit={handleShowTask}   handleCurrentTask={setCurrentData} />
                ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
          
          <Droppable droppableId="complete">
            {(provided) => (
              <Card
                className="tasks" ref={provided.innerRef} {...provided.droppableProps}
              >
                <CardHeader className="header">Complete Task</CardHeader>
                <div className='task-list'>
                  {completeTasks.map((task,idx) => (
                    <TaskCard task={task} key={idx}  index={idx} showDelete={handleShowDelete} showEdit={handleShowTask}   handleCurrentTask={setCurrentData} />
                  ))}
                  {provided.placeholder}
                </div>
              </Card>
            )}
          </Droppable>
        </Col>
      </Row>

      <CustomModal modalTitle={currentData !== null ? "Edit task ":"Add new task"} closeTitle="Close" submitTitle={currentData !== null ? "Update":"Create"} openModal={showTask} closeModal={handleCloseTask}>
        <Formik
          initialValues={currentData !==null ? currentData : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className={`form-control ${
                    errors.title && touched.title ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                  placeholder="Enter discription"
                />
              </div>
              <div className='d-flex justify-content-end'>
              <Button variant='secondary' className='mr-2' onClick={handleCloseTask} >Close</Button>
              <Button type="submit" variant='primary'>{currentData !==null? "Submit":"Add"}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </CustomModal>

      <CustomModal modalTitle="Alert" closeTitle="Close" submitTitle="Delete" openModal={showDelete} closeModal={handleCloseDelete} handleSubmit={handleDelete} showFooter>
          <div><FontAwesomeIcon icon={faWarning} /> Do you want to delete this task ! </div>
      </CustomModal>
    </Container>
    </DragDropContext>
  );
};

export default Tasks;
