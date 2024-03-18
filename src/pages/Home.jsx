import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import http from "../http";
import React, { useEffect, useState } from "react";

import "./Home.css";

function Home() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const address = import.meta.env.VITE_API;
  const getCarousel = http();
  const [carousels, setCarousels] = useState([]);
  useEffect(() => {
    getCarousel
      .get("/carousel")
      .then((res) => setCarousels(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getProducts = http();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getServices = http();
  const [services, setServices] = useState([]);
  useEffect(() => {
    getServices
      .get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Carousel>
        {carousels.map((carousel, index) => {
          return (
            <Carousel.Item key={index}>
              <div className="overlay" />
              <img
                className="carousel-img"
                src={`${address}${carousel.carousel_image}`}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>

      <div className="text-center mt-4">
        <h1>Products</h1>
      </div>
      <div className="slider">
        <Slider {...settings}>
          {products.map((product, index) => {
            return (
              <div key={index} className="box">
                <img src={`${address}${product.prod_image}`} />
                <h3>{product.name}</h3>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className="process">
        <div className="details">
          <div className="text-center mb-5">
            <p className="title">THE PROCESS...</p>
            <h6>
              Here at Canon I.T. Solution we go through a vigorous process to
              ensure that every custom pc is built to the highest quality. As
              soon you've placed your order, your PC goes through multiple
              stages to ensure that we're building the best quality possible.
            </h6>
          </div>
        </div>
      </div>

      <Container>
        <Row className="mt-3">
          <Col sm="12" md="12">
            <h1 className="text-center">Services</h1>
            <Row>
              {services.map((service, index) => {
                return (
                  <Col key={index} sm="6" lg="4" className="mb-4">
                    <Card className="service-card">
                      <Card.Img
                        className="img"
                        variant="top"
                        src={`${address}${service.service_image}`}
                      />
                      <Card.Body className="service-cardbody">
                        <Card.Title>{service.service_title}</Card.Title>
                        <Card.Text>{service.service_description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
