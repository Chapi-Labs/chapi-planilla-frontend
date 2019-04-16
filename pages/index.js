import React from "react";
import Nav from "../components/Nav";
import Dashboard from "../components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/assets/scss/style.scss";

const Home = () => (
  <div>
    <Nav />
    <Dashboard />
  </div>
);

export default Home;
