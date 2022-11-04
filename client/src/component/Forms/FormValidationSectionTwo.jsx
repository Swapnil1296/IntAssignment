import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { section_two_validation } from "../schema/yup_validation_section_one";
const initialValues = {
  sub_part_two: "",
  grades: "",
};
const options = [
  { value: "development_and_matuarity", label: "Devlopment and Maturity" },
  { value: "responsibility", label: "Responsibility" },
  { value: "sanskrit", label: "Sanskrit/Urdu" },
  { value: "self_confidence", label: "Self Confidence" },
  {
    value: "participation_in_group_work",
    label: "Participation In Group Work",
  },
  { value: "neatness", label: "Neatness" },
  { value: "music", label: "Music" },
  { value: "dicipline", label: "Dicipline" },
  { value: "hand_work", label: "Hand Work" },
  { value: "attitude_toward_work", label: "Attitude Towards Home Work" },
  { value: "craft", label: "Craft" },
  { value: "regularity_and_punctuality", label: "Regularity and Punctuality" },
];
const grades = [
  { value: "a", label: "A" },
  { value: "a+", label: "A+" },

  { value: "b", label: "B" },
  { value: "b+", label: "B+" },

  { value: "c", label: "C" },
  { value: "c+", label: "C+" },

  { value: "d", label: "D" },
  { value: "d+", label: "D+" },
];
const FormValidationSectionTwo = ({ edit, data, index }) => {
  const [show, setShow] = useState(false);
  // console.log("index:-", index, "data:-", data, "edit:-", edit);
  const dispatch = useDispatch();
  const [field, setField] = useState("");
  const { PartTwo } = useSelector((state) => state);
  const sortedValue = PartTwo.map((item) => item.sub_part_two.label);
  useEffect(() => {
    let data = options.filter((item) => !sortedValue.includes(item.label));
    // console.log("data in sortValue", data);
    setField(data);
  }, [PartTwo]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(data);
  const { errors, handleBlur, handleSubmit, values, setFieldValue, touched } =
    useFormik({
      initialValues: edit ? data : initialValues,
      validationSchema: section_two_validation,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log("values", values);
        edit
          ? dispatch({
              type: "UPDATETOSECTIONTWO",
              payload: {
                index: index,
                data: {
                  ...values,
                  id: uuidv4(),
                },
              },
            })
          : dispatch({
              type: "ADDTOSECTIONTWO",
              payload: {
                ...values,
                id: uuidv4(),
              },
            });
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
            Select sub_part_two and Fill the Grades
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <div className="drop-down">
                <Select
                  options={field}
                  onChange={(option) => setFieldValue("sub_part_two", option)}
                  name="sub_part_two"
                  value={values.sub_part_two}
                  onBlur={handleBlur}
                  isDisabled={edit}
                />
              </div>
              {touched.sub_part_two && errors.sub_part_two ? (
                <p className="form-error text-danger fw-bold">
                  {errors.sub_part_two}
                </p>
              ) : null}
            </div>
            <div className="form-group mb-3">
              <div className="drop-down">
                <Select
                  options={grades}
                  onChange={(option) => setFieldValue("grades", option)}
                  name="grades"
                  value={values.grades}
                  onBlur={handleBlur}
                  required
                />
              </div>
              {touched.grades && errors.grades ? (
                <p className="form-error text-danger fw-bold">
                  {errors.grades}
                </p>
              ) : null}
            </div>

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

export default FormValidationSectionTwo;
