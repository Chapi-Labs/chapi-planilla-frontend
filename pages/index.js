import React from 'react';
import Nav from '../components/Nav';
import Dashboard from '../components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../static/assets/css/icons.css';
import '../static/assets/css/typicons.css';
import '../static/assets/scss/style.scss';
import '../static/assets/css/style.css';



const Home = () => (
  <div>
      <Nav/>
      <Dashboard/>
  </div>
);

export default Home
