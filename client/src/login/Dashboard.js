import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const data = useSelector((state) => state.Auth);
  // console.log("Auth is :-", data);
  const Navigate = useNavigate();
  const LoggedData = useSelector((state) => state.isLoggedIng);
  const dispatch=useDispatch()
  const handledLogOut = () => {
    window.localStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    let login = LoggedData;
    if (login === false) {
      Navigate("/");
    }
  }, [LoggedData]);


  return (
    <>
      <Row
        className="d-flex justify-content-center align-content-between border border-1 border-dark bg-black justify-content-evenly "
        style={{ height: "60px" }}
      >
        <Col>
          <Button
            className="btn btn-danger m-3"
            onClick={() => handledLogOut()}
          >
            LogOut
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
