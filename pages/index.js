import React from 'react';
import Head from '../components/head';
import SignIn from '../components/SignIn';
import Nav from '../components/Nav';
import Dashboard from '../components/Dashboard';
import '../static/assets/css/bootstrap.min.css';
import '../static/assets/css/icons.css';
import '../static/assets/css/typicons.css';
import '../static/assets/scss/style.scss';
import '../static/assets/css/style.css';



const Home = () => (
  <div>
    <Head title="Home" />
    <SignIn>
      <Nav/>
      <Dashboard/>
    </SignIn>
  </div>
);

export default Home
