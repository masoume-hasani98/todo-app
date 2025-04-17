import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button } from "@mui/material";
import { getTodos, setTodos } from "../../utils/storage";

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
    <Container maxWidth="sm" className="py-10">
      <Typography variant="h5" gutterBottom className="text-center font-bold mb-6">
        Create Todo
      </Typography>

      <Button
        variant="text"
        onClick={() => navigate("/")}
        className="mb-6 w-full text-blue-600"
      >
        Back to List
      </Button>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button type="submit" variant="contained" className="w-full">
          Save
        </Button>
      </form>
    </Container>
  );
}
