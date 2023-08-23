// TaskCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Draggable } from "react-beautiful-dnd";
const TaskCard = ({ task, index, handleCurrentTask ,showEdit,showDelete}) => {

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
     { (provided)=>(
      <Card className='task-card' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <Card.Body>
          <div className='d-flex justify-content-between'>
            <div>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
            </div>
            <div className=''>
            {!task.completed && <Button variant="primary" className='mr-2' onClick={()=>{handleCurrentTask(task);showEdit()}}><FontAwesomeIcon icon={faEdit} /></Button>}
              <Button variant="danger" onClick={()=>{handleCurrentTask(task);showDelete()}}><FontAwesomeIcon icon={faTrash} /></Button>
            </div>
          </div>
        </Card.Body>
      </Card>
     )} 
   
    </Draggable>
  );
};

export default TaskCard;
