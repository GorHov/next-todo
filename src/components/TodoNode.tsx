import React, { useState, useEffect } from "react";
import { Input, Button, Popconfirm } from "antd";
import { NodeProps } from "reactflow";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "@/firebase/app";

type NodeData = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

function TodoNode({ data }: NodeProps<NodeData>) {
  const { id, title, description, isCompleted } = data;

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedIsCompleted, setUpdatedIsCompleted] = useState(isCompleted);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const titleChanged = title !== updatedTitle;
    const descriptionChanged = description !== updatedDescription;
    const isCompletedChanged = isCompleted !== updatedIsCompleted;

    setHasChanges(titleChanged || descriptionChanged || isCompletedChanged);
  }, [title, updatedTitle, description, updatedDescription, isCompleted, updatedIsCompleted]);

  const handleSaveClick = async () => {
    try {
      const todoRef = doc(firestore, "todos", id);

      await updateDoc(todoRef, {
        id,
        title: updatedTitle,
        description: updatedDescription,
        isCompleted: updatedIsCompleted,
      });

      setHasChanges(false);

      console.log("Todo updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const todoRef = doc(firestore, "todos", id);

      await deleteDoc(todoRef);

      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div style={{ padding: "8px", border: "1px solid #000", borderRadius: "4px" }}>
      <div>ID: {id}</div>
      {hasChanges && (
        <Button type="primary" size="small" onClick={handleSaveClick}>
          Save
        </Button>
      )}
      <Popconfirm
        title="Are you sure you want to delete this todo?"
        onConfirm={handleDeleteClick}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" danger size="small">
          Delete
        </Button>
      </Popconfirm>
      <Input
        placeholder="Enter title"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        style={{ marginBottom: "8px" }}
      />
      <Input
        placeholder="Enter description"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        style={{ marginBottom: "8px" }}
      />
      <div style={{ marginTop: "8px" }}>
        <Button
          type={updatedIsCompleted ? 'default' : 'primary' }
          size="small"
          onClick={() => setUpdatedIsCompleted(!updatedIsCompleted)}
        >
          {updatedIsCompleted ? "Mark as Todo" : "Mark as Completed"}
        </Button>
      </div>
    </div>
  );
}

export default TodoNode;
