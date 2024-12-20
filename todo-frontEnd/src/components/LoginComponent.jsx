import React, { useState } from "react";
import {
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();

    await loginAPICall(username, password)
      .then((response) => {
        console.log(response.data);
        const token = "Basic " + window.btoa(username + ":" + password);
        storeToken(token);

        saveLoggedInUser(username);
        navigate("/todos");

        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className=" " style={{ backgroundColor: "#2D2D2D", height: "100vh" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">User Login Form</h2>
            </div>
            <div className="card-body">
              <form className="row mb-3">
                <label className="col-md-3 control-label"> Username</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <label className="col-md-3 control-label"> Password</label>
                <div className="col-md-9">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter passwod"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-gorup mb-c">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleLoginForm(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
