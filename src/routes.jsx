import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Brands from "./pages/Brands";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
    forNavbar: "True",
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
    forNavbar: "True",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
    element: <Contact />,
    forNavbar: "True",
  },
  {
    name: "Products",
    path: "/products",
    element: <Products />,
    forNavbar: "True",
  },
  {
    name: "Brands",
    path: "/brands",
    element: <Brands />,
    forNavbar: "True",
  },
];

export default routes;
