import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTodo from "./pages/edit/EditTodo";
import TodoList from "./pages/list";
import CreateTodo from "./pages/create";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/edit/:id" element={<EditTodo />} />
      </Routes>
    </Router>
  );
}