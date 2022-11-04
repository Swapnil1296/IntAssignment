import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { percentage, sum } from '../summation/AddSummation';

const GrandTotal = () => {
  const { PartOne } = useSelector((state) => state);
  // console.log(PartOne)
  return (
    <>
      <Row className="">
        <Col
          lg={2}
          md={2}
          xl={2}
          xxl={2}
          xs={1}
          sm={1}
          className="border border-1 border-dark border-bottom-0 border-top-1 border-start-0 border-end-0"
        >
          {/* <p className="p-0 m-0">w</p> */}
        </Col>
        <Col
          className="adjust_font fw-bold  border-1 border border-dark border-bottom-0 border-top-1 border-start-0 border-end-0 p-1 d-flex justify-content-start align-items-center"
          lg={4}
          md={4}
          xl={4}
          xxl={4}
          xs={4}
          sm={4}
        >
          <span>GRAND TOTAL</span>
        </Col>
        <Col>
          <Row>
            <Col
              className="border border-1 border-dark border-bottom-0 border-top-1 border-start-1 border-end-0 p-1"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={2}
              sm={2}
            ></Col>
            <Col
              className="border border-1 border-dark border-bottom-0 border-top-1 border-start-0 border-end-0 p-1"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={3}
              sm={3}
            ></Col>
            <Col
              className="border border-1 border-dark border-bottom-0 border-top-1 border-start-0 border-end-0 p-1"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={2}
              sm={2}
            ></Col>
            <Col
              className="border border-1 border-dark border-bottom-0 border-top-1 border-start-0 border-end-0 p-1"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={3}
              sm={3}
            ></Col>
            <Col
              className="adjust_font border border-1 border-dark border-bottom-0 border-top-1 border-start-0 border-end-0 fw-bold text-center  p-1"
              lg={4}
              md={4}
              xl={4}
              xxl={4}
              xs={2}
              sm={2}
            >
              {sum(PartOne) || 0}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col
          lg={2}
          md={2}
          xl={2}
          xxl={2}
          xs={1}
          sm={1}
          className="border border-1 border-dark border-bottom-0 border-top-1 border-start-0 border-end-0 p-1"
        >
          {/* <p className="p-0 m-0">w</p> */}
        </Col>
        <Col
          className="adjust_font fw-bold  border border-1  border-dark border-bottom-0 border-top-1 border-start-0 border-end-0 p-1 d-flex justify-content-start align-items-center "
          lg={4}
          md={4}
          xl={4}
          xxl={4}
          xs={4}
          sm={4}
        >
          <span> PERCENTAGE</span>
        </Col>
        <Col>
          <Row>
            <Col
              className="border border-dark border-1 border-bottom-0 border-top-1 border-start-1 border-end-0 "
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={2}
              sm={2}
            ></Col>
            <Col
              className="border border-dark border-1 border-bottom-0 border-top-1 border-start-0 border-end-0"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={3}
              sm={3}
            ></Col>
            <Col
              className="border border-dark border-1 border-bottom-0 border-top-1 border-start-0 border-end-0"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={2}
              sm={2}
            ></Col>
            <Col
              className="border border-dark border-1 border-bottom-0 border-top-1 border-start-0 border-end-0"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={3}
              sm={3}
            ></Col>
            <Col
              className=" adjust_font border border-dark border-1 border-bottom-0 border-top-1 border-start-0 border-end-0 fw-bold text-center  p-1 "
              lg={4}
              md={4}
              xl={4}
              xxl={4}
              xs={2}
              sm={2}
            >
              {percentage(PartOne) || 0}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col
          lg={2}
          md={2}
          xl={2}
          xxl={2}
          xs={1}
          sm={1}
          className="border border-dark border-1 border-bottom-0 border-top-1 border-start-0 border-end-0"
        >
          {/* <p className="p-0 m-0">w</p> */}
        </Col>
        <Col
          className=" adjust_font fw-bold  border  border-dark border-1 border-bottom-0 border-top-1 border-start-0 border-end-0 p-1 d-flex justify-content-start align-items-center"
          lg={4}
          md={4}
          xl={4}
          xxl={4}
          xs={4}
          sm={4}
        >
          <span> RANK</span>
        </Col>
        <Col>
          <Row>
            <Col
              className="border border-dark border-1 border-bottom-0 border-top-1 border-start-1 border-end-0"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={2}
              sm={2}
            ></Col>
            <Col
              className="border border-dark border-1 border-bottom-0 border-top-1 border-start-0 border-end-0"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={3}
              sm={3}
            ></Col>
            <Col
              className="border border-dark border-1 border-bottom-0 border-top-1 border-start-0 border-end-0"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={2}
              sm={2}
            ></Col>
            <Col
              className="border border-dark border-1 border-bottom-0 border-top-1 border-start-0 border-end-0"
              lg={2}
              md={2}
              xl={2}
              xxl={2}
              xs={3}
              sm={3}
            ></Col>
            <Col
              className=" adjust_font border border-dark border-1 border-bottom-0 border-top-1 border-start-0 border-end-0 fw-bold text-center  p-1 pe-0"
              lg={4}
              md={4}
              xl={4}
              xxl={4}
              xs={2}
              sm={2}
            >
              <span>V</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default GrandTotal
