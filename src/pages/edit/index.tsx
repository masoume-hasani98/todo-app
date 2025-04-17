import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, TextField, Checkbox, Button } from "@mui/material";

const getTodos = () => JSON.parse(localStorage.getItem("todos") || "[]");
const setTodos = (todos: any[]) => localStorage.setItem("todos", JSON.stringify(todos));

export default function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const todos = getTodos();
    const todo = todos.find((t: any) => t.id === Number(id));
    if (todo) {
      setDescription(todo.description);
      setCompleted(todo.completed);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todos = getTodos().map((todo: any) =>
      todo.id === Number(id) ? { ...todo, description, completed } : todo
    );
    setTodos(todos);
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Edit Todo</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <div>
          <Checkbox
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            color="primary"
          />
          <span>Completed</span>
        </div>
        <Button type="submit" variant="contained">Update</Button>
      </form>
    </Container>
  );
}
