import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, TextField, Checkbox, Button } from "@mui/material";
import { getTodos, setTodos } from "../../utils/storage";

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
    <Container maxWidth="sm" className="py-10">
      <Typography variant="h5" gutterBottom className="text-center font-bold mb-6">
        Edit Todo
      </Typography>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <Checkbox
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            color="primary"
          />
          <span className="text-gray-700">Completed</span>
        </label>

        <Button type="submit" variant="contained" className="w-full">
          Update
        </Button>
      </form>

      <Button
        variant="text"
        onClick={() => navigate("/")}
        className="mt-4 w-full text-blue-600"
      >
        Back to List
      </Button>
    </Container>
  );
}
