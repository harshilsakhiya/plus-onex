

import withAuth from "@/HOC/withAuth";
import Link from "next/link";
import React from "react";

 function Success() {


  return (
    <div className="d-flex w-100 vh-100 d-flex justify-content-center align-items-center ">
      <div className=" border border-primary rounded col-4">
        <h1 className="text-center">success</h1>
        <div className="d-flex justify-content-center">
          <p className="text-center col-6">
            your order has been sucessfully paid . if can be tracked in the your
            order seaction
          </p>
        </div>
        <Link href="dashboard">
        <div className="d-flex justify-content-centers mr-5">
          <button className="btn btn-primary p-4  border border-primary rounded  col-6" >
            GO To Home
          </button>
          
        </div>
        </Link>
        
      </div>
    </div>
  );
}

export default withAuth(Success)
