import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import Select from "react-select";
import { Section_One_Validation } from "../schema/yup_validation_section_one";
import axios from "axios";
import { useSelector } from "react-redux";


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
const EditSectionOne = ({
  resId,
  getSubject,
  getResultDetails,
  redId,
  handleClose,
}) => {
  const [updates, setUpdate] = useState("");
  const [changes, setChanges] = useState(false);
  console.log("getSubject", getSubject.subject);
  console.log("resId:-", resId);
  const token = useSelector((state) => state.Auth);
  // console.log("toekn in editsection:-",token)
  const initialValues = {
    subject: { vlaue: getSubject.subject, label: getSubject.subject },
    first_anual_marks: getSubject.FA,
    first_oral_marks: getSubject.OM1,
    second_anual_marks: getSubject.BA,
    second_oral_marks: getSubject.OM2,
  };
  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: Section_One_Validation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, action) => {
      // console.log(values.subject.label)
      values.subject = values.subject.label;
      console.log("values:-", values);
      setUpdate(values);
      const payload = {
        subject: values.subject,
        first_anual_marks: values.first_anual_marks,
        first_oral_marks: values.first_oral_marks,
        second_anual_marks: values.second_anual_marks,
        second_oral_marks: values.second_oral_marks,
      };
      handleSubmission(payload);
      action.resetForm();
    },
  });
  const handleSubmission = (payload) => {
    axios
      .put(
        `http://localhost:8000/api/student/update_details/${resId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        console.log("response data in editSection:-", response.data);
        setChanges(true);
      })
      .catch((error) => {
        console.log(error);
      });
    getResultDetails(redId);
    handleClose()
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="drop-down">
            <Select
              // placeholder={getSubject}
              options={options}
              onChange={(option) => setFieldValue("subject", option)}
              name="subject"
              onBlur={handleBlur}
              value={values.subject}
            />
          </div>
          {touched.subject && errors.subject ? (
            <p className="form-error text-danger fw-bold">{errors.subject}</p>
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
            onBlur={handleBlur}
            placeholder="First Anual Marks"
          />
          {touched.first_anual_marks && errors.first_anual_marks ? (
            <p className="form-error text-danger fw-bold">
              {errors.first_anual_marks}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="first_oral_marks">First Annual Marks</Form.Label>
          <Form.Control
            id="first_oral_marks"
            type="number"
            name="first_oral_marks"
            value={values.first_oral_marks}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="First Oral Marks"
          />
          {touched.first_oral_marks && errors.first_oral_marks ? (
            <p className="form-error text-danger fw-bold">
              {errors.first_oral_marks}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="second_anual_marks">
            First Annual Marks
          </Form.Label>
          <Form.Control
            id="second_anual_marks"
            type="number"
            name="second_anual_marks"
            value={values.second_anual_marks}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Second Anual Marks"
          />
          {touched.second_anual_marks && errors.second_anual_marks ? (
            <p className="form-error text-danger fw-bold">
              {errors.second_anual_marks}
            </p>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="second_oral_marks">
            First Annual Marks
          </Form.Label>
          <Form.Control
            id="second_oral_marks"
            type="number"
            name="second_oral_marks"
            value={values.second_oral_marks}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Second Oral Marks"
          />
          {touched.second_oral_marks && errors.second_oral_marks ? (
            <p className="form-error text-danger fw-bold">
              {errors.second_oral_marks}
            </p>
          ) : null}
        </Form.Group>

        <Button type="submit">Save Changes</Button>
      </Form>
    </>
  );
};

export default EditSectionOne;
