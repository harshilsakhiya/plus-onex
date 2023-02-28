import React, { useState } from "react";
import axios from "axios";
import withAuthtrue from "@/HOC/withAuthtrue";

function SignUp() {
  const [inputValue, setinputValue] = useState({});
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.username) {
      formIsValid = false;
      errors["username"] = "*Please enter username!";
    }

    if (inputValue && !inputValue.useremail) {
      formIsValid = false;
      errors["useremail"] = "*Please enter email!";
    } else if (
      inputValue.useremail &&
      !inputValue.useremail.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      formIsValid = false;
      errors["useremail"] = "*Please enter vaild email id!";
    }

    if (inputValue && !inputValue.password) {
      formIsValid = false;
      errors["password"] = "*Please enter password !";
    } else if (
      inputValue.password &&
      !inputValue.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)
    ) {
      formIsValid = false;
      errors["password"] = "*Please enter vaild password!";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setinputValue({ ...inputValue, [name]: value });
    if (e.target.name.trim()) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const formSignUp = () => {
    if (validateForm()) {
      axios
        .post("https://tznwvelv.directus.app/users", {
          inputValue,
        })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (validateForm()) {
        axios
          .post("https://tznwvelv.directus.app/users", {
            inputValue,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("res", res);
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    }
  };
  return (
    <div className="signup-container w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="col-5">
        <h3>Sign Up</h3>
        <div className="mb-3" onKeyDown={handleKeyDown}>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter User Name"
            onChange={(e) => handleOnChange(e)}
          />
          <span className="text-danger"> {errors["username"]}</span>
        </div>
        <div className="mb-3" onKeyDown={handleKeyDown}>
          <label>Email address</label>
          <input
            type="text"
            name="useremail"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => handleOnChange(e)}
          />
          <span className="text-danger"> {errors["useremail"]}</span>
        </div>

        <div className="mb-3" onKeyDown={handleKeyDown}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => handleOnChange(e)}
          />
          <span className="text-danger"> {errors["password"]}</span>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => formSignUp()}>
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/">sign in?</a>
        </p>
      </div>
    </div>
  );
}
export default withAuthtrue(SignUp);
