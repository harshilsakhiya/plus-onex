import { CheckOutData } from "@/atom/checkOutData/CheckOutData";
import withAuth from "@/HOC/withAuth";
import axios from "axios";
import { useAtom } from "jotai";
import moment from "moment/moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

function CheckOut() {
  const Router = useRouter();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    if (e.target.name.trim()) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const [inputValue, setInputValue] = useState();
  const [quntityPrice, setQuntityPrice] = useAtom(CheckOutData);
  const [errors, setErrors] = useState("");

  console.log("errors", errors);

  const amaountArry = quntityPrice.map((item) =>
    parseFloat(item.Product_Price)
  );

  const sumWithInitial = amaountArry.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (!inputValue && !inputValue?.name) {
      formIsValid = false;
      errors["name"] = "*Please enter name!";
    }
    if (!inputValue && !inputValue?.Address) {
      formIsValid = false;
      errors["address"] = "*Please enter address !";
    }

    setErrors(errors);
    return formIsValid;
  };

  const placeOrder = () => {
    if (validateForm()) {
      axios
        .post(
          "https://tznwvelv.directus.app/items/Orders",
          {
            Name: inputValue?.name,
            Address: inputValue?.Address,
            Order_Details: quntityPrice,
            Order_Total: sumWithInitial,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            setQuntityPrice([]);
            localStorage.removeItem("cartData");
            Router.push("/success");
            toast.success("order successfully");
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };

  return (
    <div className="mt-5">
      <div className="w-50 m-auto border border-primary p-4 ">
        <div>
          <h1>CheckOut</h1>
        </div>
        <div className="col-8 m-auto">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              className="form-control"
              placeholder="Enter name"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <span className="text-danger"> {errors["name"]}</span>

          <div>
            <label>Address</label>
            <textarea
              type="text"
              name="Address"
              autoComplete="off"
              className="form-control"
              placeholder="Enter address"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <span className="text-danger"> {errors["address"]}</span>
        </div>
        <div className="d-flex">
          <p>Order Date :- </p>
          <p>{moment(new Date()).format("MMM Do YYYY")}</p>
        </div>
        <div className="d-flex">
          <p>Delivery Date :- </p>
          <p>
            {moment(new Date().setDate(new Date().getDate() + 2)).format(
              "MMM Do YYYY"
            )}
          </p>
        </div>
        <div className="d-flex">
          <p>Total :- </p>
          <p>{sumWithInitial}₹</p>
        </div>
        <div>
          <button className="btn btn-success" onClick={() => placeOrder()}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CheckOut);
