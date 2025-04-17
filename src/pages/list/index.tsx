import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const getTodos = () => JSON.parse(localStorage.getItem("todos") || "[]");
const setTodos = (todos: any[]) => localStorage.setItem("todos", JSON.stringify(todos));

export default function TodoList() {
  const [todos, setTodosState] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("date");

  const navigate = useNavigate();

  useEffect(() => {
    setTodosState(getTodos());
  }, []);

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setTodosState(newTodos);
  };

  const toggleComplete = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    setTodosState(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    setTodosState(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOption === "alpha") return a.description.localeCompare(b.description);
    return b.id - a.id;
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <Button variant="contained" onClick={() => navigate("/create")} sx={{ mb: 2 }}>
        Add Todo
      </Button>

      <Box display="flex" gap={2} mb={2}>
        <FormControl>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="active">Active</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Sort"
          >
            <MenuItem value="date">By Date</MenuItem>
            <MenuItem value="alpha">Alphabetically</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" color="secondary" onClick={clearCompleted}>
          Clear Completed
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTodos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.description}</TableCell>
              <TableCell>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  color="primary"
                />
                {todo.completed ? "Completed" : "Active"}
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/edit/${todo.id}`)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
