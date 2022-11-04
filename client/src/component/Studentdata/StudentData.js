import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Nav, Row } from "react-bootstrap";
import { useFormik } from "formik";
import Select from "react-select";
import { StudentData_Validation } from "../schema/yup_validation_section_one";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
const initialValues = {
  student_name: "",
  student_section: "",
  student_class: "",
  student_rollno: "",
};
const options = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
  { value: "c", label: "C" },
];
const StudentData = () => {
  const [field, setField] = useState("");

  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: StudentData_Validation,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: (values, action) => {
      // console.log("stundent values:-", values);
      setField(values);
    },
  });

  const [show, setShow] = useState(false);

  const Navigate = useNavigate();
  const LoggedData = useSelector((state) => state.isLoggedIng);
  const handledLogOut = () => {
    // window.localStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
    console.log("logOut in student data");
    Navigate("/")
  };



  const handleRedirect = () => {
    handleClose();
    Navigate("/card", {
      state: {
        student_name: field.student_name,
        student_class: field.student_class,
        student_section: field.student_section.label,
        student_rollno: field.student_rollno,
      },
    });
  };

  return (
    <>
      <Row
        className="d-flex justify-content-center align-content-between border border-1 border-dark bg-black justify-content-evenly "
        style={{ height: "60px" }}
      >
        <Col>
          <Button
            className="btn btn-danger m-3"
            onClick={ handledLogOut}
          >
            LogOut
          </Button>
        </Col>

        <Col>
          <span className="btn btn-primary m-3" onClick={handleShow}>
            Add Student
          </span>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Student Name"
                name="student_name"
                value={values.student_name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
            </Form.Group>
            {touched.student_name && errors.student_name ? (
              <p className="form-error text-danger ">{errors.student_name}</p>
            ) : null}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Student Class</Form.Label>
              <Form.Control
                type="number"
                max={12}
                min={1}
                placeholder="Enter Student Class"
                name="student_class"
                value={values.student_class}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
            </Form.Group>
            {touched.student_class && errors.student_class ? (
              <p className="form-error text-danger ">{errors.student_class}</p>
            ) : null}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Choose student_section</Form.Label>
              <Select
                options={options}
                name="student_section"
                value={values.student_section}
                onChange={(option) => setFieldValue("student_section", option)}
              />
            </Form.Group>
            {touched.student_section && errors.student_section ? (
              <p className="form-error text-danger ">
                {errors.student_section}
              </p>
            ) : null}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Roll Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Student Roll Number"
                name="student_rollno"
                max={100}
                min={1}
                value={values.student_rollno}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
            </Form.Group>
            {touched.student_rollno && errors.student_rollno ? (
              <p className="form-error text-danger ">{errors.student_rollno}</p>
            ) : null}
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRedirect}>
            Move To Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentData;
