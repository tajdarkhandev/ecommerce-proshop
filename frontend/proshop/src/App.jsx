import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />;
      <main className="py-3">
        <Container>
          {/* <h1>Welcome to ProShop</h1> */}
          <Outlet />
        </Container>
      </main>
      <Footer />;
      <ToastContainer />
    </>
  );
};

export default App;
