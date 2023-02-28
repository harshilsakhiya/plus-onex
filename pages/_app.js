import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "jotai";
import { useEffect } from "react";
export default function App({ Component, pageProps }) {

  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.clear()
    }, 900000);
    
  }, [])
  
  return (
    <>
      <Provider>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </>
  );
}
