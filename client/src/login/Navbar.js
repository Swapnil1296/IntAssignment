import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

import StudentData from "../component/Studentdata/StudentData";
import ResultTable from "../component/Studentdata/ResultTable";
const NavbarforHeader = () => {
  const [data, setData] = useState("");
  const [redId,setResId]=useState("");
  const [show, setShow] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [rollNO, setRollNO] = useState("");
  const [dataById, setdataById] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id, student_name, student_rollno) => {
    getResultDetails(id);

    setShow(true);
    setStudentName(student_name);
    setRollNO(student_rollno);
  };

  const token = useSelector((state) => state.Auth);

  const getStudentDetails = () => {
    axios
      .get(`http://localhost:8000/api/student/stu_details`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        //  console.log("response data in formOne:-", response.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getStudentDetails();
  }, []);

  const handleDelete = (stu_id) => {
    console.log(stu_id, "in Delete");
    axios
      .delete(
        `http://localhost:8000/api/student/delete_student/${stu_id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        //  console.log("response data in editSection:-", response.data);
        // setData(response.data.data);
        getStudentDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getResultDetails = (id) => {
    axios
      .get(`http://localhost:8000/api/student/stu_res/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log("response data in for id:-", response.data.data);
        setdataById(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
      setResId(id)
  };
  return (
    <>
      {/* <h1>this is navbar</h1> */}
      <StudentData />
      {/* <Button className="btn btn-secondary my-5" onClick={getSutDeatails}>
        See Student INFO
      </Button> */}
      <div style={{ width: "800px", margin: "auto" }}>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Student Class</th>
              <th>Student Section</th>
              <th>Student RollNo</th>
              <th>See Results</th>
              <th>Delete</th>
            </tr>
          </thead>

          {data &&
            data.map((items, i) => (
              <tbody key={i} onClick={() => getResultDetails(items.stu_id)}>
                <tr>
                  <td>{i + 1}</td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "teal",
                      textTransform: "capitalize",
                    }}
                  >
                    {items.student_name}
                  </td>

                  <td style={{ fontWeight: "bold", color: "red" }}>
                    {items.student_class}&nbsp;th
                  </td>
                  <td style={{ fontWeight: "bold", color: "blue" }}>
                    {items.student_section}
                  </td>
                  <td style={{ fontWeight: "bold", color: "cadetblue" }}>
                    {items.student_rollno}
                  </td>
                  <td>
                    {" "}
                    <span>
                      <GrView
                        className="mx-5 "
                        onClick={() =>
                          handleShow(
                            items.stu_id,
                            items.student_name,
                            items.student_rollno
                          )
                        }
                      />
                    </span>
                  </td>
                  <td>
                    <MdDeleteForever
                      onClick={() => handleDelete(items.stu_id)}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
      {/* modals for marks render */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Result List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResultTable
            studentName={studentName}
            rollNO={rollNO}
            dataById={dataById}
            getResultDetails={getResultDetails}
            redId={redId}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavbarforHeader;
