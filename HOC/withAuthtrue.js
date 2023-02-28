import { useRouter } from "next/router";
const withAuthtrue = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        Router.replace("/dashboard");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;    
  };
};

export default withAuthtrue;