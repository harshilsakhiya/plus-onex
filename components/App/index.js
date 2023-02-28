import Header from "@/common/Header";
import React from "react";

export default function index(props) {
  const { children } = props;

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
