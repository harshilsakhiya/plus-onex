import withAuth from "@/HOC/withAuth";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductDetails() {
  const Router = useRouter();

  const [cartProduct, setCartProduct] = useState([]);
  useEffect(() => {
    if (localStorage) {
      const localStorageData = localStorage.getItem("cartData");
      setCartProduct(JSON.parse(localStorageData));
    }
  }, []);

  const id = Router.query.id;
  useEffect(() => {
    axios
      .get(`https://tznwvelv.directus.app/items/Products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data.data);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [id]);

  const [product, setProduct] = useState({});

  //   const [cartData, setCartData] = useState([]);

  const cartData = [];

  const cart = (data) => {
    if (cartProduct !== null) {
      const filterData = cartProduct.filter((item, i) => {
        if (item.id === data.id) {
          return data;
        }
      });

      if (filterData.length === 0) {
        cartData.push(...cartProduct, data);
        localStorage.setItem("cartData", JSON.stringify(cartData));
      }
    } else {
      cartData.push(data);
      localStorage.setItem("cartData", JSON.stringify(cartData));
    }
    Router.push("/addToCart");
  };

  return (
    <>
      <div className="d-flex justify-content-center ">
        <div
          className="col-9"

          // onClick={() => Router.push(`/catagoryDetails/${item.id}`)}
        >
          <div className="d-flex">
            <img
              className="d-flex justify-content-center"
              src={`https://tznwvelv.directus.app/assets/${product?.Image}`}
            />
            <div className="mt-4 mr-4">
              <p dangerouslySetInnerHTML={{ __html: product.Description }} />
              <p className=" fw-bold">{product?.Title}</p>
              <p className="">
                Price <span className="fw-bold">{product?.Price} ₹</span>
              </p>
              <button
                className="btn btn-primary px-5 py-2"
                onClick={() => cart(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withAuth(ProductDetails);
