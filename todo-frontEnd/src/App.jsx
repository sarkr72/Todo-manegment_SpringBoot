import { useState } from "react";
import ListTodoComponent from "./components/ListTodoComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
// import "./App.css"
import FooterComponent from "./components/FooterComponent";
import TodoComponent from "./components/TodoComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn } from "./services/AuthService";
import SampleDataPage from "./components/SampleDataPage";

function App() {
  const AuthenticatedRoute = ({ children }) => {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    }
    return <Navigate to="/" />;
  };

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route
            path="/todos"
            element={
              <AuthenticatedRoute>
                <ListTodoComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/add-todo"
            element={
              <AuthenticatedRoute>
                <TodoComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route path="/edit-todo/:id" element={<TodoComponent />}></Route>
          <Route path="/register" element={<RegisterComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          {/* <Route path="/" element={<SampleDataPage />}></Route> */}
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
