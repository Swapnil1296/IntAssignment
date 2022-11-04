import React from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import FormValidationSectionTwo from "../Forms/FormValidationSectionTwo";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";

const SectionTwo = () => {
  const { PartTwo } = useSelector((state) => state);
  // console.log("sectionTwo", PartTwo);
  const dispatch = useDispatch();

  const handleDelete = (id,grades) => {
    // console.log("id is:", id);
    dispatch({
      type: "DELETEFROMSECTIONTWO",
      payload: id,
    });
    // console.log(grades)
   toast.success(`You have Deleted ${grades} Successfully`, {
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
      {PartTwo &&
        PartTwo.map((item, index) => (
          <Row key={index} lg={5} md={5} xl={5} xxl={5} xs={5} sm={5}>
            <Col
              className="fs-7 border border-1 border-dark border-bottom-0 border-start-0 border-end-1 border-top-1  fw-bold p-1"
              lg={7}
              md={7}
              xl={7}
              xxl={7}
              xs={7}
              sm={7}
            >
              <span className="p-0 m-0"> {item.sub_part_two.label}</span>
            </Col>
            <Col
              className="border border-dark border-1 border-bottom-0 border-start-0 border-end-0 border-top-1 text-center fw-bold"
              lg={5}
              md={5}
              xl={5}
              xxl={5}
              xs={5}
              sm={5}
            >
              <Row>
                <Col>
                  <span className="mx-2">
                    <FormValidationSectionTwo
                      edit={true}
                      data={item}
                      index={index}
                    />
                  </span>
                </Col>
                <Col>{item.grades.label}</Col>
                <Col>
                  <span
                    id="hashTag"
                    variant="danger"
                    onClick={() => handleDelete(item.id, item.subject.label)}
                    className=""
                  >
                    <AiFillDelete />
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      <ToastContainer
        position="top-center"
        autoClose={1000}
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

export default SectionTwo;
