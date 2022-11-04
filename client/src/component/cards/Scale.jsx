import React from 'react';
import {Col, Row} from 'react-bootstrap'
import data from '../data/data.json';

const Scale = () => {
  const showData= data["part-3"]
// 
  return (
    <>
      <Row>
        <Col className="text-center fw-bold ">
          <span className="fw-bold fs-4">G</span>RADING{" "}
          <span className="fw-bold fs-4">S</span>CALE
        </Col>
      </Row>

      <Row className="mt-3">
        <Col></Col>
        <Col lg={6} md={6} sm={8} xs={12}>
          <Row className="border border-1 border-bottom-0 border-dark fw-bold ">
            <Col lg={4} md={4} sm={4} xs={4} className="text-center">
              <span className="fonts"> MARKS RANGE</span>
            </Col>
            <Col
              lg={4}
              md={4}
              sm={4}
              xs={4}
              className="border-start border-1 border-end border-dark text-center"
            >
              <span>GRADES</span>
            </Col>
            <Col lg={4} md={4} sm={4} xs={4} className="text-center">
              <span> REMARKS</span>
            </Col>
          </Row>

          {showData &&
            showData.map((el, i) => (
              <Row
                className="border border-1 border-bottom-0 border-dark text-center fw-bold"
                key={i}
              >
                <Col
                  lg={4}
                  md={4}
                  sm={4}
                  xs={4}
                  className="border-bottom-0 border-dark  border-1"
                >
                  <span className="fonts"> {el.rank}</span>
                </Col>
                <Col
                  lg={4}
                  md={4}
                  sm={4}
                  xs={4}
                  className="border-start border-1 border-end border-bottom-0 border-dark text-center"
                >
                  <span className="fonts">{el.grades}</span>
                </Col>
                <Col
                  lg={4}
                  md={4}
                  sm={4}
                  xs={4}
                  className="border-bottom-0 border-dark border-1"
                >
                  <span className="fonts">{el.remark}</span>
                </Col>
              </Row>
            ))}
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col className="text-center  fst-italic border border-dark border-top-1 border-1 border-bottom-0 border-start-0 border-end-0">
          <span> Our Parents are seen God one the Earth</span>
        </Col>
      </Row>
    </>
  );
};

export default Scale;
