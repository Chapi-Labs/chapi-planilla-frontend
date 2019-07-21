import React, { Component } from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Signout from './Signout';
import '../static/assets/css/nprogress.css';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }

  toggle = (key) => {
    this.setState({
      [key]: !this.state[key]
    });
  }


  render() {
    return (
      <header id="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            <div className="logo">
              <Link href="/">
                <h3 className="waves-effect">Chapi Planilla</h3>
              </Link>
            </div>
            <div className="menu-extras topbar-custom">
              <ul className="navbar-right d-flex list-inline float-right mb-0">
                <li className="dropdown notification-list d-none d-sm-block">
                  <form role="search" className="app-search">
                    <div className="form-group mb-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search.."
                      />
                      <button type="submit">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </form>
                </li>

                <li className="dropdown notification-list">
                  <div className="dropdown notification-list">
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={() => this.toggle("dropdownOpen")}
                    >
                      <DropdownToggle
                        color=""
                        className="dropdown-toggle testflag nav-link arrow-none waves-effect nav-user"
                      >
                        <FontAwesomeIcon icon="user" size="2x" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <Signout />
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </li>

                <li className="menu-item list-inline-item">
                  <a
                    className={
                      this.state.toggleMenu
                        ? "navbar-toggle nav-link open"
                        : "navbar-toggle nav-link"
                    }
                    onClick={this.toggleMenu}
                  />
                </li>
              </ul>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        <div className="navbar-custom">
          <div className="container-fluid">
            <Navbar color="" light expand="md">
              <NavbarToggler onClick={() => this.toggle("isOpen")} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="" navbar>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Trabajadores
                    </DropdownToggle>
                    <DropdownMenu right>
                      <Link href="/employee">
                        <DropdownItem>
                          <a>Crear Nuevo</a>
                        </DropdownItem>
                      </Link>
                      <Link href="/employee_list" as="/employee/list">
                        <DropdownItem>
                          <a>Listar</a>
                        </DropdownItem>
                      </Link>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Empresas
                    </DropdownToggle>
                    <DropdownMenu right>
                      <Link href="/new_company">
                        <DropdownItem>
                          <a>Crear Nuevo</a>
                        </DropdownItem>
                      </Link>
                      <Link href="/company_list" as="/company/list">
                        <DropdownItem>
                          <a>Listar</a>
                        </DropdownItem>
                      </Link>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Nómina
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <Link href="/payroll_new" as="/payroll/new">
                          <a>Crear Nueva Nómina</a>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/payroll_list" as="/payroll/list">
                          <a>Listar Nóminas</a>
                        </Link>
                      </DropdownItem>
                      <Link href="/payroll_type" as="/payroll/type">
                        <DropdownItem>
                          <a>Configuraciones</a>
                        </DropdownItem>
                      </Link>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </div>
      </header>
    );
  }
}

export default Navigation;
