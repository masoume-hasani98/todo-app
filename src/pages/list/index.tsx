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
} from "@mui/material";
import { TodoType } from "./type";
import { getTodos, setTodos } from "../../utils/storage";

export default function TodoList() {
  const [todos, setTodosState] = useState<TodoType[]>([]);
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
    <Container maxWidth="md" className="py-8">
      <Typography variant="h4" gutterBottom className="text-center font-bold mb-6">
        Todo List
      </Typography>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <FormControl fullWidth className="md:w-1/3">
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Filter">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="active">Active</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth className="md:w-1/3">
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

        <Button
          variant="outlined"
          color="secondary"
          onClick={clearCompleted}
          className="w-full md:w-1/3"
        >
          Clear Completed
        </Button>
      </div>

      <Button
        variant="contained"
        onClick={() => navigate("/create")}
        className="mb-4 w-full md:w-auto"
      >
        Add Todo
      </Button>

      <div className="overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
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
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/edit/${todo.id}`)}
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
