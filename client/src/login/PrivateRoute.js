
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";


const PrivateRoute = () => {
  
  const LoggedData = useSelector((state) => state.isLoggedIng);
  
  const Navigate = useNavigate()
  
 
  return (
    <>
     { LoggedData ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default PrivateRoute;
