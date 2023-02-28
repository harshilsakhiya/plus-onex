import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { CatagoryData } from "@/atom/catagoryData/catagoryData";
import { useRouter } from "next/router";
import withAuth from "@/HOC/withAuth";

 function Catagory() {
  const Router = useRouter();

  const [catagoryData, setCatagoryData] = useAtom(CatagoryData);
  useEffect(() => {
    axios
      .get("https://tznwvelv.directus.app/items/Category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCatagoryData(res.data.data);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <div>
      <div className="d-flex mt-3 ">
        {catagoryData?.map((item, i) => {
          return (
            <div className="" key={i} onClick={()=>Router.push(`/catagoryDetails/${item.id}`) }>
              <div className="d-flex justify-content-center ">
                <img
                  className="rounded-circle col-5"
                  src={`https://tznwvelv.directus.app/assets/${item?.Category_Image}`}
                />
              </div>
              <p className="text-center">{item?.Title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default withAuth(Catagory)
