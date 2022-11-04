import { useEffect, useRef, useState } from "react";
import "../App.css";
import UserView from "./cards/UserView";
import { useReactToPrint } from "react-to-print";

import html2pdf from "html2pdf.js";
import { Button, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Dashboard from "../login/Dashboard";

function Combine() {
  const state = useLocation();
  // console.log("state in combine:-",state.state)
  const Navigate = useNavigate();
  const [activateBtn, setactivateBtn] = useState(true);

  const componentRef = useRef();
  const { PartOne } = useSelector((state) => state);

  const { PartTwo } = useSelector((state) => state);
  // console.log("PartOne:-", PartOne.length);
  // console.log("PartTwo:-", PartTwo);
  const { PartThree } = useSelector((state) => state);
  // const { Auth } = useSelector((state) => state);
  // console.log("Auth is:-", Auth);
  //  console.log("PartThree:-", PartThree);
  //   console.log("studentData:-", state.state);
  useEffect(() => {
    if (PartOne.length > 2) {
      setactivateBtn(false);
    } else {
      setactivateBtn(true);
    }
  }, [PartOne.length]);

  const saveChanges = () => {
    const container = {};
    for (let i = 0; i < PartOne.length; i++) {
      //  console.log("PartOne[i]", PartOne[i].subject.label);
      PartOne[i].subject = PartOne[i].subject.label;
    }
    for (let i = 0; i < PartTwo.length; i++) {
      //  console.log("PartOne[i]", PartOne[i].subject.label);
      PartTwo[i].grades = PartTwo[i].grades.label;
      PartTwo[i].sub_part_two = PartTwo[i].sub_part_two.label;
      // PartTwo[i].catagory = PartTwo[i].subject;
     

      // console.log("PartTwo:-", PartTwo[i]);
    }
    for (let i = 0; i < PartThree.length; i++) {
      //  console.log("PartThree[i]", PartThree[i].subject.label);
      PartThree[i].sub_part_three = PartThree[i].sub_part_three.label;
    }
    container["Stu_Info"] = state.state;
    container["PartOne"] = PartOne;
    container["PartTwo"] = PartTwo;
    container["PartThree"] = PartThree;

   
    // console.log("PartThree:-", PartThree);
    // console.log("PartTwo:-", PartTwo);
    // console.log("PartOne:-", PartOne);
    handleSubmission(container);
     Navigate("/home");
    console.log("container:-", container);
  };

  const token = useSelector((state) => state.Auth);
  // console.log("token:-",token);
  const handleSubmission = (payload) => {
    axios
      .post(`http://localhost:8000/api/student/details`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log("response data in formOne:-", response.data);
        // setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const generatePDF = () => {
    const source = document.getElementById("mainContainer");
    const fileName = "Swapnil.pdf";
    var opt = {
      margin: 0.2,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 8 },
      jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(source).save();
  };
  return (
    <div className="App">
      <Dashboard/>
      <div
        className="border border-dark w-75 align-content-center my-5"
        style={{ margin: "auto" }}
      >
        <Table striped="columns">
          <thead>
            <tr>
              <th>No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td
                style={{
                  textTransform: "uppercase ",
                  fontWeight: "bold",
                  color: "blueviolet",
                }}
              >
                {state.state.student_name}
              </td>
              <td
                style={{
                  fontWeight: "bold",
                  color: "blueviolet",
                }}
              >
                {state.state.student_class}
              </td>
              <td
                style={{
                  fontWeight: "bold",
                  color: "blueviolet",
                }}
              >
                {state.state.student_section}
              </td>
              <td
                style={{
                  fontWeight: "bold",
                  color: "burlywood",
                }}
              >
                {state.state.student_rollno}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <UserView ref={componentRef} />
      <div className="d-flex justify-content-center m-3">
        <div className="d-flex justify-content-center m-1">
          <Button onClick={generatePDF}>Download</Button>
        </div>
        <div className="d-flex justify-content-center m-1">
          <Button onClick={handlePrint}>Print</Button>
        </div>
        <div className="d-flex justify-content-center m-1">
          <Button onClick={saveChanges} disabled={activateBtn}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Combine;
