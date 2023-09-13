import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Connection,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import TodoNode from "./TodoNode";
import { app, firestore } from "@/firebase/app";
import { DocumentData, collection, getDocs , addDoc } from "firebase/firestore";
import { Button } from "antd";

const initBgColor = "#1A192B";
const connectionLineStyle = { stroke: "#fff" };


const nodeTypes = {
  custom: TodoNode,
};

const Todo = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [todos, setTodos] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosRef = collection(firestore, "todos");
        const querySnapshot = await getDocs(todosRef);
        const todosData = querySnapshot.docs.map((doc) => doc.data());
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos from Firestore:", error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const todoNodes = todos.map((todo, index) => {
      return {
        id: `${todo.id}`,
        type: "custom",
        data: {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          isCompleted: todo.isCompleted,
        },
        position: { x: 100 + index * 500, y: 100},
      };
    });

    setNodes((prevNodes) => [...prevNodes, ...todoNodes]);
  }, [todos]);

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ),
    []
  );

  const handleAddNewTodo = async () => {
    try {
      const newTodoItem = {
        id: '',
        title: "",
        description: "",
        isCompleted: false,
      };
  
      const docRef = await addDoc(collection(firestore, "todos"), newTodoItem);
      const newTodoId = docRef.id;
      
      newTodoItem.id = newTodoId;
  
      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
    } catch (error) {
      console.error("Error adding new todo to Firestore:", error);
    }
  };
  

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: initBgColor }}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      attributionPosition="bottom-left"
    >
      <Button style={{ zIndex: 4 }} onClick={handleAddNewTodo}>
        Add New
      </Button>
      <Controls />
    </ReactFlow>
  );
};

export default Todo;
