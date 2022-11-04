import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { section_three_validation } from "../schema/yup_validation_section_one";
const initialValues = {
  sub_part_three: "",
  Working: "",
  present: "",
};
const options = [
  { value: "term-I", label: " TERM - I" },
  { value: "term-2", label: "TERM - II" },
];

const FormValidationSectionThree = ({ edit, data, index }) => {
  const [show, setShow] = useState(false);
  // console.log("index:-", index, "data:-", data, "edit:-", edit);
  const dispatch = useDispatch();
  const [field, setField] = useState("");
  const { PartThree } = useSelector((state) => state);
  const sortedValue = PartThree.map((item) => item.sub_part_three.label);
  //   console.log("sortedValue", sortedValue);
  useEffect(() => {
    let data = options.filter((item) => !sortedValue.includes(item.label));
    // console.log("data", data);
    setField(data);
  }, [PartThree]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(data);
  const {
    errors,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
    touched,
    handleChange,
  } = useFormik({
    initialValues: edit ? data : initialValues,
    validationSchema: section_three_validation,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      console.log("values in three:-", values);
      edit
        ? dispatch({
            type: "UPDATETOSECTIONTHREE",
            payload: {
              index: index,
              data: {
                ...values,
                id: uuidv4(),
              },
            },
          })
        : dispatch({
            type: "ADDTOSECTIONTHREE",
            payload: {
              ...values,
              id: uuidv4(),
            },
          });
      action.resetForm();
    },
  });
  //   console.log(errors);
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
          <Modal.Title className="fw-bold">Check Attendence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <div className="drop-down">
                <div>Select TERM</div>
                <Select
                  options={field}
                  onChange={(option) => setFieldValue("sub_part_three", option)}
                  name="sub_part_three"
                  value={values.sub_part_three}
                  onBlur={handleBlur}
                  isDisabled={edit}
                />
              </div>
              {touched.sub_part_three && errors.sub_part_three ? (
                <p className="form-error text-danger fw-bold">
                  {errors.sub_part_three}
                </p>
              ) : null}
            </div>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="first_anual_marks">
                Fill Number of Working Days
              </Form.Label>
              <Form.Control
                id="first_anual_marks"
                type="number"
                name="Working"
                value={values.Working}
                onChange={handleChange}
                placeholder=" Fill Number of Working Days"
                onBlur={handleBlur}
              />
              {touched.Working && errors.Working ? (
                <p className="form-error text-danger fw-bold">
                  {errors.Working}
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="first_anual_marks">
                Fill Number of Present Days
              </Form.Label>
              <Form.Control
                id="first_anual_marks"
                type="number"
                name="present"
                value={values.present}
                onChange={handleChange}
                placeholder=" Fill Number of Present Days"
                onBlur={handleBlur}
              />
              {touched.present && errors.present ? (
                <p className="form-error text-danger fw-bold">
                  {errors.present}
                </p>
              ) : null}
            </Form.Group>

            <Button type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormValidationSectionThree;
