import { CheckOutData } from "@/atom/checkOutData/CheckOutData";
import withAuth from "@/HOC/withAuth";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useEffect, useState } from "react";

 function AddToCart() {
  const [product, setProduct] = useState([]);
  const [quntityPrice, setQuntityPrice] = useAtom(CheckOutData);
  useEffect(() => {
    if (localStorage) {
      const localStorageData = localStorage.getItem('cartData');
      setProduct(JSON.parse(localStorageData));
    }
  }, []);

  const quntityChange = async (e, data) => {
    const newData = [...quntityPrice];
    const index = newData.findIndex((obj) => obj.Product_Id === data.id);
    if (index !== -1) {
      quntityPrice[index].Product_Price =
        e.target.value *data?.Price;
    } else {
      newData.push({
        Product_Id: data.id,
        Product_Price: e.target.value * data?.Price,
        Product_Name: data.Title,
      });
    }
 
    setQuntityPrice(newData);
  };
  const amaountArry = quntityPrice.map((item) =>
  parseFloat(item.Product_Price),
);

const sumWithInitial = amaountArry.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0,
);

const cartReomve = (data) => {
  const filterData = product.filter((item) => item.id !== data);
  const pricefilter = quntityPrice.filter((item) => item.id !== data);
  localStorage.setItem('cartData', JSON.stringify(filterData));
  setProduct(filterData);
  setQuntityPrice(pricefilter);
};


  return (
    <div>
      <h1>Your Cart</h1>
          <>
          <div className="d-flex">
           <div>
                {product && product.length > 0 ? (
                  product?.map((product,productIdx) => (
                    <li key={product.id} className="d-flex py-6  ">
                      <div className="col-5">
                        <img
                          src={`https://tznwvelv.directus.app/assets/${product?.Image}`}
                          className="col-8"
                        />
                      </div>

                      <div className="ml-4 d-flex justify-content-between">
                        <div className="">
                          <div className="col-4">
                            <div className="d-flex justify-content-between">
                              <h6 className="text-sm">
                               
                                  {product.Title}
                             
                              </h6>
                            </div>

                            <p className="mt-1 ">
                              {product.Price}{' '}
                              <span className="ml-1">
                              ₹
                              </span>
                            </p>
                          </div>

                          <div className="mt-4 ">
                            
                            <select
                              onChange={(e) => quntityChange(e, product)}
                              id={`quantity-${productIdx}`}
                              name={`quantity-${productIdx}`}
                              className="w-14 ">
                              <option value={0}>0</option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              <option value={10}>10</option>
                            </select>

                            <div className="">
                              <button
                                onClick={() => cartReomve(product.id)}
                                type="button"
                                className="m-2 btn btn-danger">
                                <span className="">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        
                      </div>
                    </li>
                  ))
                ) : (
                  <p>NO DATA FOUND</p>
                )}
                </div>
                </div>
             
         

      <div className=" border border-primary rounded col-4 p-3">
        <div className="d-flex">
           
       <h3>Price :-</h3>
       <h3>{sumWithInitial}₹
</h3>
        
        </div>
        {
          sumWithInitial != 0 && <button className="d-flex justify-content-centers mr-5 ">
         <Link href="/checkOut"> <h3>Check Out</h3></Link>
        </button>
        }
        
      </div>
   
          </>
    </div>
  
       
  );
}

export default withAuth(AddToCart)
