import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import http from "../http";
import { useEffect, useState } from "react";
import "./Products.css";

function Products() {
  const api = http();
  const address = import.meta.env.VITE_API;
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("0");
  const [producttype, setProductType] = useState([]);
  const [prodtype, setProdType] = useState("0");
  const [filteredproducttype, setFilteredProductType] = useState([]);

  useEffect(() => {
    getCategory();
    geProductType();
    return () => {};
  }, []);

  useEffect(() => {
    const newProducttype = producttype.filter((prodtype) => {
      return prodtype.category === category;
    });

    setFilteredProductType(newProducttype);
    return () => {};
  }, [category]);

  useEffect(() => {
    getProducts();
    return () => {};
  }, [prodtype]);

  function getCategory() {
    api
      .get("/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }

  function geProductType() {
    api
      .get("/product_type")
      .then((res) => setProductType(res.data))
      .catch((err) => console.log(err));
  }

  function getProducts() {
    let config = {
      url: "/shops",
      params: {},
    };
    if (category !== "0") config.params.category = category;
    if (prodtype !== "0") config.params.product_type = prodtype;
    api
      .request(config)
      .then((res) => {
        setProducts(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }

  const Filter = (event) => {
    setProducts(
      data.filter((f) => f.title.toLowerCase().includes(event.target.value))
    );
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col sm="12" md="3">
          <Form>
            <Form.Control
              defaultValue=""
              className="mb-4"
              placeholder="Search"
              onChange={Filter}
            ></Form.Control>

            <Form.Select
              defaultValue=""
              className="mb-4"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="0" disabled>
                Select Category
              </option>
              {categories.map((cat, index) => {
                return (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Select
              defaultValue="0"
              className="mb-4"
              disabled={category === "0"}
              onChange={(e) => setProdType(e.target.value)}
            >
              <option value="0" disabled>
                Select Product Type
              </option>
              {filteredproducttype.map((prodtype, index) => {
                return (
                  <option key={index} value={prodtype.product_type}>
                    {prodtype.product_type}
                  </option>
                );
              })}
            </Form.Select>
          </Form>
        </Col>
        <Col sm="12" md="9">
          <Row>
            {products.map((product, index) => {
              return (
                <Col key={index} sm="6" lg="4" className="mb-4">
                  <Card className="p-card">
                    <Card.Img
                      className="img"
                      variant="top"
                      src={`${address}${product.image}`}
                    />
                    <Card.Body className="prod-cardbody">
                      <Card.Text>{product.brand}</Card.Text>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>Category: {product.category}</Card.Text>
                      <Card.Text>
                        Product Type: {product.product_type}
                      </Card.Text>
                      <Card.Text>Price: Php {product.price}</Card.Text>

                      <Button variant="primary">Add to Cart</Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
