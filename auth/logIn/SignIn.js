import withAuthtrue from "@/HOC/withAuthtrue";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

function SignIn() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    if (e.target.name.trim()) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.email) {
      formIsValid = false;
      errors["email"] = "*Please enter email!";
    } else if (
      inputValue.email &&
      !inputValue.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      formIsValid = false;
      errors["email"] = "*Please enter vaild email id!";
    }

    if (inputValue && !inputValue.password) {
      formIsValid = false;
      errors["password"] = "*Please enter password !";
    }

    setErrors(errors);
    return formIsValid;
  };

  const formSignin = () => {
    if (validateForm()) {
      setLoading(true);
      axios
        .post("https://tznwvelv.directus.app/auth/login", {
          email: inputValue.email,
          password: inputValue.password,
        })
        .then((res) => {
          if (res.sucess === 200) router.push("/dashboard");
          setLoading(false);
          localStorage.setItem("token", res?.data?.data?.access_token);
          toast.success("login sucessfully !");
        })
        .catch((err) => {
          setLoading(false);

          toast.error(err.message);
        });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (validateForm()) {
        setLoading(true);
        axios
          .post("https://tznwvelv.directus.app/auth/login", {
            email: inputValue.email,
            password: inputValue.password,
          })
          .then((res) => {
            if (res.sucess === 200) 
            setLoading(false);
            localStorage.setItem("token", res?.data?.data?.access_token);
            toast.success("login sucessfully !");
            router.push("/dashboard");
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.message);
          });
      }
    }
  };
  return (
    <div>
      <div className="signin-container w-100 vh-100 d-flex justify-content-center align-items-center ">
        <div className="col-5">
          <h3>Sign In</h3>
          <div className="mb-3" onKeyDown={handleKeyDown}>
            <label>Email address</label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => handleOnChange(e)}
            />
            <span className="text-danger"> {errors["email"]}</span>
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
            <button
              disabled={loading}
              className="btn btn-primary text-center"
              onClick={() => formSignin()}
            >
              {!loading ? "Sign In" : "loading..."}
            </button>
          </div>
          <p className="forgot-password text-right">
            Create Account <a href="/sign-up">sign up?</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default withAuthtrue(SignIn);
