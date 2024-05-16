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
    forNavbar: true,
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
    forNavbar: true,
  },
  {
    name: "Shop",
    path: "/products",
    element: <Products />,
    forNavbar: true,
  },
  {
    name: "Brands",
    path: "/brands",
    element: <Brands />,
    forNavbar: true,
  },
  {
    name: "Contact Us",
    path: "/contact-us",
    element: <Contact />,
    forNavbar: true,
  },
];

export default routes;
