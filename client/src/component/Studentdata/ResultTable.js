import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import EditSectionOne from "../modals/EditSectionOne";
const ResultTable = ({
  studentName,
  rollNO,
  dataById,
  getResultDetails,
  redId,
}) => {
  console.log("dataById:-", dataById);
  const [show, setShow] = useState(false);
  const [resId, setResId] = useState("");
  const [getSubject, setSubject] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateStudentDetails = (res_id, subject) => {
    console.log("res_id:-", res_id);
    setResId(res_id);
    setSubject(subject);
    handleShow();
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h5>Name:-&nbsp;</h5>
        <h5 style={{ color: "cadetblue", textTransform: "capitalize" }}>
          {studentName}
        </h5>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            {/* <th>RollNO:</th>
            <th>First Name</th> */}
            <th>Subject</th>
            <th>FA</th>
            <th>SA</th>
            <th>FO</th>
            <th>SO</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {dataById &&
            dataById.map((dataById, i) => (
              <tr key={i}>
                {/* <td>{rollNO}</td>
            <td>{studentName}</td> */}
                <td>{dataById.subject}</td>
                <td>{dataById.first_anual_marks}</td>
                <td>{dataById.second_anual_marks}</td>
                <td>{dataById.first_oral_marks}</td>
                <td>{dataById.second_oral_marks}</td>
                <td>
                  <FaUserEdit
                    onClick={() =>
                      updateStudentDetails(dataById.res_id, dataById.subject)
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Result Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditSectionOne
            resId={resId}
            getSubject={getSubject}
            getResultDetails={getResultDetails}
            redId={redId}
            handleClose={handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResultTable;
