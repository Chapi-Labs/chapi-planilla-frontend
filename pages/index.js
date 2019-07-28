import React from "react";
import Nav from "../components/Nav";
import Dashboard from "../components/Dashboard";
import SignIn from "../components/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/assets/scss/style.scss";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Add all icons to the library so you can use it in your page
library.add(fas, far)

const Home = () => (
  <div>
    <SignIn>
      <Nav />
      <Dashboard />
    </SignIn>
  </div>
);

export default Home;
