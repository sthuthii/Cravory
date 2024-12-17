import "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SignUpPage from "./pages/SignUpPage";
import OrderPage from "./pages/OrderPage";
import Footer from "./pages/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/order">Order Cart</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
        <DndProvider backend={HTML5Backend}>
  <OrderPage />
</DndProvider>
      </div>
    </Router>
  );
}

export default App;















