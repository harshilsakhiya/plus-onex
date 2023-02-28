import withAuth from "@/HOC/withAuth";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

 function CatagoryDetails() {
  const Router = useRouter();

  const id = Router.query.id;

  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://tznwvelv.directus.app/items/Products?filter[Category][id][_eq]=${id}`,
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
  }, [id]);

  return (
    <>
      <div className=" d-flex flex-wrap col-12">
        {product.map((item, i) => {
          return (
            <>
              <div
                className="col-4"
                key={i}
                onClick={()=> Router.push(`/productDetails/${item.id}`)}
              >
                <div className="d-flex justify-content-center ">
                  <img
                    className=""
                    src={`https://tznwvelv.directus.app/assets/${item?.Image}`}
                  />
                </div>
                <p className="text-center">{item?.Title}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default withAuth(CatagoryDetails)

