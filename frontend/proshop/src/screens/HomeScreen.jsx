// import { useEffect, useState } from "react";
// import axios from "axios";
import Loader from "../components/Loader";
import { Row, Col } from "react-bootstrap";
// import products from "../products";
import Product from "../components/Product";
import Message from "../components/Message";
import { useGetProductsQuery } from "../store/slices/productsApiSlice";

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);

  /*
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/v1/products");

      setProducts(data.products);
    };
    fetchProducts();
  }, []);
  */

  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log(products);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
                {/* <p>{product.description}</p> */}
                {/* <p>${product.price.toFixed(2)}</p> */}
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
