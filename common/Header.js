import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (localStorage) {
      const localStorageData = localStorage.getItem('cartData');
      setProduct(JSON.parse(localStorageData));
    }
  }, []);

  return (
    <>
      <div>
        <nav className="bg-light">
          <div className=" d-flex justify-content-between">
            <Link href="/dashboard">
              <h3 className="m-3">home</h3>
            </Link>
            <Link href="/catagory">
              <p className="m-3">catagory</p>
            </Link>
            <div className=" m-3 ">
              <Link href="/addToCart">
              <button className="btn btn-primary p-2">
                Add To Cart ({product?.length}){" "}
              </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
