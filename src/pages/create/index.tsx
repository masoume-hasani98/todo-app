import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button } from "@mui/material";

const getTodos = () => JSON.parse(localStorage.getItem("todos") || "[]");
const setTodos = (todos: any[]) => localStorage.setItem("todos", JSON.stringify(todos));

export default function CreateTodo() {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      description,
      completed: false,
    };
    const todos = getTodos();
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Create Todo
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </Container>
  );
}
