import AddToCart from "@/components/dashboard/addToCart/AddToCart";
import React from "react";
import App from "@/components/App/index";

export default function index() {
  return (
    <div>
      <App>
        <AddToCart />
      </App>
    </div>
  );
}
