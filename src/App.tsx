import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTodo from "./pages/edit";
import TodoList from "./pages/list";
import CreateTodo from "./pages/create";
import Layout from "./components/Layout";


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/create" element={<CreateTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </Layout>
    </Router>
  );
}