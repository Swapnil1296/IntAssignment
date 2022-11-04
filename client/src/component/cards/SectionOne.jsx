import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";

import FormValidation from "../Forms/FormValidation";

const SectionOne = () => {
  const { PartOne } = useSelector((state) => state);
  // console.log("data is in sectionOne:-", PartOne);
  const dispatch = useDispatch();

  const handleDelete = (id,subjects) => {
    dispatch({
      type: "DELETEFROMSECTIONONE",
      payload: id,
    });
     toast.success(`You have Deleted ${subjects} Subject's Marks Successfully`, {
       position: "top-center",
       autoClose: 1000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: false,
       draggable: true,
       progress: undefined,
     });
  };
  return (
    <>
      {PartOne &&
        PartOne.map((item, index) => (
          <Row key={index}>
            <Col
              className="adjustin_item border border-1 border-dark border-bottom-0 border-start-0 border-end-0 border-top-1 d-flex justify-content-center fw-bold "
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={1}
              sm={1}
            >
              <span>{index + 1 > 9 ? index + 1 : "0" + (index + 1)}</span>
            </Col>
            <Col
              className="adjustin_item border  border-1 border-dark border-bottom-0 border-start-1 border-end-0 border-top-1 fw-bold"
              lg={4}
              md={4}
              xl={4}
              xxl={4}
              xs={4}
              sm={4}
            >
              <span>{item.subject.label}</span>
            </Col>
            <Col>
              <Row>
                <Col
                  lg={2}
                  md={2}
                  xl={2}
                  xxl={2}
                  xs={2}
                  sm={2}
                  className="adjustin_item border border-1 border-dark border-bottom-0 border-start-1 border-end-0 border-top-1 text-center p-0 m-0 fw-bold"
                >
                  <span>{item.first_anual_marks}</span>
                </Col>
                <Col
                  className="adjustin_item border border-1 border-dark border-bottom-0 border-start-1 border-end-0 border-top-1 text-center p-0 m-0 fw-bold"
                  lg={2}
                  md={2}
                  xl={2}
                  xxl={2}
                  xs={3}
                  sm={3}
                >
                  <span>{item.first_oral_marks}</span>
                </Col>
                <Col
                  className="adjustin_item border border-1 border-dark border-bottom-0 border-start-1 border-end-0 border-top-1 text-center p-0 fw-bold"
                  lg={2}
                  md={2}
                  xl={2}
                  xxl={2}
                  xs={2}
                  sm={2}
                >
                  <p className="p-0 m-0  ">{item.second_anual_marks}</p>
                </Col>
                <Col
                  className="adjustin_item border border-1 border-dark border-bottom-0 border-start-1 border-end-0 border-top-1 text-center p-0 fw-bold"
                  lg={2}
                  md={2}
                  xl={2}
                  xxl={2}
                  xs={3}
                  sm={3}
                >
                  <p className="p-0 m-0 ">{item.second_oral_marks}</p>
                </Col>
                <Col
                  className="border border-1 border-dark border-bottom-0 border-start-1 border-end-0 border-top-1 text-center p-0 fw-bold"
                  lg={4}
                  md={4}
                  xl={4}
                  xxl={4}
                  xs={2}
                  sm={2}
                >
                  <Row>
                    <Col>
                      <span>
                        <FormValidation
                          edit={true}
                          data={item}
                          className="my-2"
                          index={index}
                        />
                      </span>
                    </Col>
                    <Col>
                      <span className="p-0  ">
                        {item.first_anual_marks +
                          item.first_oral_marks +
                          item.second_anual_marks +
                          item.second_oral_marks !==
                        0
                          ? item.first_anual_marks +
                            item.first_oral_marks +
                            item.second_anual_marks +
                            item.second_oral_marks
                          : "A"}
                      </span>
                    </Col>

                    <Col>
                      <span
                        id="hashTag"
                        variant="danger"
                        onClick={() =>
                          handleDelete(item.id, item.subject.label)
                        }
                      >
                        <AiFillDelete />
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default SectionOne;
