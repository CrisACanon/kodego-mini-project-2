import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import http from "../http";
import { useEffect, useState } from "react";
import "./Products.css";
import { Pagination } from "react-bootstrap";

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
  const [currentpage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(4);

  useEffect(() => {
    getCategory();
    getProductType();

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
    getProducts(0, 4, 0);
    return () => {};
  }, [prodtype]);

  function getCategory() {
    api
      .get("/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }

  function getProductType() {
    api
      .get("/product_type")
      .then((res) => setProductType(res.data))
      .catch((err) => console.log(err));
  }

  function getProducts(start, end, increase) {
    let config = {
      url: `/shops?_start=${start}&_end=${end}`,
      params: {},
    };
    if (category !== "0") config.params.category = category;
    if (prodtype !== "0") config.params.product_type = prodtype;
    api
      .request(config)
      .then((res) => {
        setProducts(res.data);
        setData(res.data);
        setCurrentPage(currentpage + increase);
      })
      .catch((err) => console.log(err));
  }

  const Filter = (event) => {
    setProducts(
      data.filter((f) => f.title.toLowerCase().includes(event.target.value))
    );
  };

  const handleReset = () => {
    getProducts();
  };

  const renderPagination = () => {
    if (currentpage === 0) {
      return (
        <Pagination>
          <Pagination.Item>1</Pagination.Item>
          <Pagination.Item>
            <Button variant="primary" onClick={() => getProducts(4, 8, 1)}>
              Next
            </Button>
          </Pagination.Item>
        </Pagination>
      );
    } else if (currentpage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <Pagination>
          <Button
            variant="primary"
            onClick={() =>
              getProducts((currentpage - 1) * 4, currentpage * 4, -1)
            }
          >
            Prev
          </Button>
          <Pagination.Item>{currentpage + 1}</Pagination.Item>
          <Pagination.Item>
            <Button
              variant="primary"
              onClick={() =>
                getProducts((currentpage + 1) * 4, (currentpage + 2) * 4, 1)
              }
            >
              Next
            </Button>
          </Pagination.Item>
        </Pagination>
      );
    } else {
      return (
        <Pagination>
          <Pagination.Item>
            <Button variant="primary" onClick={() => getProducts(4, 8, -1)}>
              Prev
            </Button>
          </Pagination.Item>
          <Pagination.Item>{currentpage + 1}</Pagination.Item>
        </Pagination>
      );
    }
  };

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col sm="12" md="3">
            <Form>
              <Form.Control
                defaultValue=""
                className="mb-2"
                placeholder="Search..."
                onChange={Filter}
              ></Form.Control>
              <Button
                type="submit"
                className="mb-4"
                variant="primary"
                onClick={handleReset}
              >
                Search
              </Button>

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
      <div>{renderPagination()}</div>
    </>
  );
}

export default Products;
