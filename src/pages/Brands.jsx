import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import http from "../http";
import React, { useEffect, useState } from "react";
import "./Brands.css";

function Brands() {
  const api = http();
  const address = import.meta.env.VITE_API;
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrands();
    return () => {};
  }, []);
  
  function getBrands() {
    api
      .get("/brands")
      .then((res) => setBrands(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Container>
        <Col className="mt-4">
          <Row>
            {brands.map((brand) => {
              return (
                <Col key={brand.id} sm="4" lg="3" className="mb-4">
                  <Card className="brand-card">
                    <Card.Img
                      className="img"
                      variant="top"
                      src={`${address}${brand.image}`}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default Brands;
