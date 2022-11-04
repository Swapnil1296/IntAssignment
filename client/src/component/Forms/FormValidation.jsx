import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { Section_One_Validation } from "../schema/yup_validation_section_one";
const initialValues = {
  subject: "",
  first_anual_marks: "",
  first_oral_marks: "",
  second_anual_marks: "",
  second_oral_marks: "",
};
const options = [
  { value: "english", label: "English" },
  { value: "math", label: "Math" },
  { value: "sanskrit", label: "Sanskrit/Urdu" },
  { value: "maithili", label: "Maithili" },
  { value: "evs", label: "EVS" },
  { value: "social_study", label: "Social Study" },
  { value: "computer", label: "Computer" },
  { value: "moral", label: "Moral" },
  { value: "gk", label: "GK" },
  { value: "conversation", label: "Conversation" },
  { value: "drawings", label: "Drawings" },
];
const FormValidation = ({ edit, data, index }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
const [field, setField] = useState("");
const { PartOne } = useSelector((state) => state);
const sortedValue = PartOne.map((item) => item.subject.label);
useEffect(() => {
  let data = options.filter((item) => !sortedValue.includes(item.label));
  // console.log("data", data);
  setField(data);
}, [PartOne]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log("data is:-", data);

  const handleUpdate=(index,values)=>{
dispatch({
            type: "UPDATETOSECTIONONE",
            payload: {
              index: index,
              data: {
                ...values,
                id: uuidv4(),
              },
            },
          })
          toast.success(`You have Updated ${values.subject.label} Successfully`, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
  }
  const handleAdd=(index,values)=>{
dispatch({
  type: "ADDTOSECTIONONE",
  payload: {
    ...values,
    id: uuidv4(),
  }
  })
    toast.success(`You have Added ${values.subject.label} Successfully`, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });

  }
  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues: edit ? data : initialValues,
    validationSchema: Section_One_Validation,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      // console.log(values.subject.label)
      // console.log("values",values);
      edit
        ? handleUpdate(index, values)
        : handleAdd(index,values)
      action.resetForm();
    },
  });
  // console.log(errors);
  return (
    <>
      {edit ? (
        <span onClick={handleShow} id="hashTag">
          <FiEdit2 />
        </span>
      ) : (
        <button
          variant="outline-danger"
          onClick={handleShow}
          className="formbtn"
          id="hashTag"
        >
          ADD
        </button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            Select Subject and Fill the Marks
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="drop-down">
                <Select
                  options={field}
                  onChange={(option) => setFieldValue("subject", option)}
                  name="subject"
                  value={values.subject}
                  isDisabled={edit}
                />
              </div>
              {touched.subject && errors.subject ? (
                <p className="form-error text-danger fw-bold">
                  {errors.subject}
                </p>
              ) : null}
            </div>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="first_anual_marks">
                First Annual Marks
              </Form.Label>
              <Form.Control
                id="first_anual_marks"
                type="number"
                name="first_anual_marks"
                value={values.first_anual_marks}
                onChange={handleChange}
                placeholder="First Anual Marks"
                onBlur={handleBlur}
              />
              {touched.first_anual_marks && errors.first_anual_marks ? (
                <p className="form-error text-danger fw-bold">
                  {errors.first_anual_marks}
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="first_oral_marks">
                First Annual Oral Marks
              </Form.Label>
              <Form.Control
                id="first_oral_marks"
                type="number"
                name="first_oral_marks"
                value={values.first_oral_marks}
                onChange={handleChange}
                placeholder="First Oral Marks"
                onBlur={handleBlur}
              />
              {touched.first_oral_marks && errors.first_oral_marks ? (
                <p className="form-error text-danger fw-bold">
                  {errors.first_oral_marks}
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="second_anual_marks">
                Second Annual Marks
              </Form.Label>
              <Form.Control
                id="second_anual_marks"
                type="number"
                name="second_anual_marks"
                value={values.second_anual_marks}
                onChange={handleChange}
                placeholder="Second Anual Marks"
                onBlur={handleBlur}
              />
              {touched.second_anual_marks && errors.second_anual_marks ? (
                <p className="form-error text-danger fw-bold">
                  {errors.second_anual_marks}
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="second_oral_marks">
                Second Anual Oral Marks
              </Form.Label>
              <Form.Control
                id="second_oral_marks"
                type="number"
                name="second_oral_marks"
                value={values.second_oral_marks}
                onChange={handleChange}
                placeholder="Second Oral Marks"
                onBlur={handleBlur}
              />
              {touched.second_oral_marks && errors.second_oral_marks ? (
                <p className="form-error text-danger fw-bold">
                  {errors.second_oral_marks}
                </p>
              ) : null}
            </Form.Group>

            <Button type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
      {/* <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      /> */}
    </>
  );
};

export default FormValidation;
