import React from "react";
import Container from "../components/Container";
import Dashboard from "../components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/assets/scss/style.scss";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Add all icons to the library so you can use it in your page
library.add(fas, far)

const Home = () => (
  <Container title="Dashboard" subtitle="Dashboard">
    <Dashboard />
  </Container>
);

export default Home;
