import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
//import Button from "react-bootstrap/Button";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
  const getProducts = http();
  const [products, setProducts] = useState([]);
  const getServices = http();
  const [services, setServices] = useState([]);
  const getReviews = http();
  const [reviews, setReviews] = useState([]);
  const getDesktops = http();
  const [desktops, setDesktops] = useState([]);
  const getLaptops = http();
  const [laptops, setLaptops] = useState([]);
  const getNewArrivals = http();
  const [arrivals, setArrivals] = useState([]);

  useEffect(() => {
    getCarousel
      .get("/carousel")
      .then((res) => setCarousels(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getProducts
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getServices
      .get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getReviews
      .get("/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getDesktops
      .get("/desktops")
      .then((res) => setDesktops(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getLaptops
      .get("/laptops")
      .then((res) => setLaptops(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getNewArrivals
      .get("/newarrivals")
      .then((res) => setArrivals(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* Promo Carousel */}
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

      {/* Product slider */}
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

      {/* PC slider */}
      <div className="pc-container">
        <div className="desktop">
          <div className="desktop-title">
            <h3>DESKTOPS</h3>
            <h3>SEE MORE</h3>
          </div>
          <Carousel>
            {desktops.map((desktop, index) => {
              return (
                <Carousel.Item key={index}>
                  <div className=".desktop-card" />
                  <img
                    className="desktop-img"
                    src={`${address}${desktop.image}`}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>

        <div className="laptop">
          <div className="desktop-title">
            <h3>LAPTOPS</h3>
            <h3>SEE MORE</h3>
          </div>
          <Carousel>
            {laptops.map((laptop, index) => {
              return (
                <Carousel.Item key={index}>
                  <div className=".desktop-card" />
                  <img
                    className="desktop-img"
                    src={`${address}${laptop.image}`}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      </div>

      {/* New Arivals */}
      <div className="text-center mt-4">
        <h1>New Arrivals</h1>
      </div>
      <div className="slider">
        <Slider {...settings}>
          {arrivals.map((arrival, index) => {
            return (
              <div key={index} className="box">
                <img src={`${address}${arrival.image}`} />
                <h3>{arrival.name}</h3>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Services */}

      <Row className="services mt-3">
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
                      <Card.Text className="service-des">
                        {service.service_description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>

      {/* Customer Reviews */}
      <div className="review-title text-center mt-4 ">
        <div className="slider review-container mb-4">
          <h1>WHAT OUR CUSTOMERS SAY ABOUT US</h1>
          <Slider {...settings}>
            {reviews.map((review, index) => {
              return (
                <div key={index} className="review-box">
                  <h6 className="mt-3 mb-3">{review.customer_name}</h6>
                  <h5>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </h5>
                  <h6>{review.title}</h6>
                  <p>{review.comments}</p>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Home;
