import { useFormik } from "formik";

import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LoginSchema } from "./Validation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const initialValues = {
  name: "",
  password: "",
};
function Login() {
  const dispatch = useDispatch();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,

      onSubmit: (values, actions) => {
        console.log("values:-", values);

        const payload = { username: values.name, password: values.password };
        const handleLogin = () => {
          axios
            .post("http://localhost:8000/api/auth/login", payload)
            .then((res) => {
              // console.log("Login Result:", res.data.token);
              dispatch({ type: "LOGIN", payload: res.data.token });
            })
            .catch((errors) => {
              console.log(errors);
              actions.setErrors(errors.response.data.errors);
            });
        };
        handleLogin();
      },
    });

  const Navigate = useNavigate();
  const LoggedData = useSelector((state) => state.isLoggedIng);
  // console.log("LoggedData in Logine:", LoggedData);

  useEffect(() => {
    if (!LoggedData) {
      Navigate("/");
    } else {
      Navigate("/home");
    }
  }, [LoggedData]);

  return (
    <Container
      style={{ width: "400px" }}
      className="border border-1 border-dark p-2 align-content-center mt-5"
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <span className="text-secondary fw-bold fs-5">
              Inter your Login details
            </span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter UserName"
            name="name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {errors.name && touched.name ? (
          <p style={{ color: "red" }}>{errors.name}</p>
        ) : null}
        <Form.Group className="mb-3">
          <Form.Label>
            {" "}
            <span className="text-secondary fw-bold fs-5">Password</span>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            autoComplete="off"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {errors.password && touched.password ? (
          <p style={{ color: "red" }}>{errors.password}</p>
        ) : null}
        <Button type="submit">Log In</Button>
      </Form>
    </Container>
  );
}

export default Login;
