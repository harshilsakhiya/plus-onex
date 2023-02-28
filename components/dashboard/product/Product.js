import withAuth from "@/HOC/withAuth";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Product() {
  const Router = useRouter();
  useEffect(() => {
    axios
      .get(
        "https://tznwvelv.directus.app/items/Products?fields[]=*&fields[]=Category.*",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data.data);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const [product, setProduct] = useState([]);

  const getRandomProducts = () => {
    const randomProducts = [];

    for (let i = 0; i < 5; i++) {
      const random = Math.floor(Math.random() * product.length);
      if (randomProducts.length > 0) {
        const find = randomProducts.some(
          (product) => product?.id !== product?.[random]?.id
        );
        if (find) {
          randomProducts.push(product[random]);
        }
      } else {
        randomProducts.push(product[random]);
      }
    }
    return randomProducts;
  };

  return (
    <>
      <div className="row-12">
        <h3>poplupar product</h3>
        <div className="d-flex overflow-auto ">
          {product?.map((item, i) => {
            return (
              <div
                className="col-2 h-100"
                key={i}
                onClick={() => Router.push(`/productDetails/${item.id}`)}
              >
                <img
                  className="col-6 h-75"
                  src={`https://tznwvelv.directus.app/assets/${item?.Image}`}
                />
                <p className="">{item?.Title}</p>
                <p className="">{item?.Price}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="row-12">
        <h3>suggest product</h3>
        <div className="d-flex overflow-auto row-5">
          {getRandomProducts()?.map((item, i) => {
            return (
              <div
                className="col-2"
                key={i}
                onClick={() => Router.push(`/productDetails/${item.id}`)}
              >
                <img
                  className="col-6"
                  src={`https://tznwvelv.directus.app/assets/${item?.Image}`}
                />
                <p className="">{item?.Title}</p>
                <p className="">{item?.Price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default withAuth(Product);
