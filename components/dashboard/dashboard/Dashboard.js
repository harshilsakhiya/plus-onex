import withAuth from "@/HOC/withAuth";
import React from "react";
import Catagory from "../catagory/Catagory";
import Product from "../product/Product";

function Dashboard() {
  return (
    <div>
      <Catagory />
      <Product />
    </div>
  );
}

export default withAuth(Dashboard);
