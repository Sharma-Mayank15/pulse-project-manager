import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

export const KanbanItem = ({
  itemObject,
  index,
  handleEditTask,
  handleDeleteTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(itemObject.title);
  const [editedDescription, setEditedDescription] = useState(
    itemObject.description,
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditedDescription(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedItemObject = {
      ...itemObject,
      title: editedTitle,
      description: editedDescription,
    };
    handleEditTask(updatedItemObject);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    handleDeleteTask(itemObject);
  };

  if (itemObject.id) {
    return (
      <Draggable
        draggableId={itemObject.id}
        key={`${itemObject.id}` + index}
        index={index}
      >
        {(provided) => (
          <div
            className="item"
            key={itemObject.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {isEditing ? (
              <>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editedTitle}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={editedDescription}
                    onChange={handleDescriptionChange}
                  />
                </div>

                <button className="add-button" onClick={handleSaveClick}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h4>{itemObject.title}</h4>
                <p>{itemObject.description}</p>
                <div className="icon-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={handleEditClick}
                  >
                    <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={handleDeleteClick}
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </div>
              </>
            )}
          </div>
        )}
      </Draggable>
    );
  }
};
