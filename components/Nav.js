import React, { Component } from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
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

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      toggleMenu: true,
      subMenuToggled: false
    };
  }
  componentDidMount() {
    if (window.innerWidth <= 960) {
      this.setState(prevState => ({
        toggleMenu: false
      }));
    }
  }

  toggle(dropdownOpen) {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleMenu = e => {
    this.setState(prevState => ({
      toggleMenu: !prevState.toggleMenu
    }));
    if (this.state.toggleMenu === false) {
      this.state.subMenuToggled = true;
    }

  };

  toggleSubMenu = e => {
    if (this.state.subMenuToggled === true) {
      this.myInput.className = 'submenu megamenu open';
    } else {
      this.myInput.className = 'submenu megamenu';
    }
    this.setState(prevState => ({
      subMenuToggled: !prevState.subMenuToggled
    }));
  };

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
                      toggle={() => this.toggle(this.state.dropdownOpen)}
                    >
                      <DropdownToggle
                        color=""
                        className="dropdown-toggle testflag nav-link arrow-none waves-effect nav-user"
                      >
                        <FontAwesomeIcon icon="user" size="2x" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <i className="mdi mdi-account-circle m-r-5" />{" "}
                          Profile
                        </DropdownItem>
                        <DropdownItem>
                          <i className="mdi mdi-wallet m-r-5" /> My Wallet
                        </DropdownItem>
                        <DropdownItem>
                          <Link href="/employee">
                            <a>
                              <span className="badge badge-success float-right">
                                11
                              </span>
                              <i className="mdi mdi-settings m-r-5" />{" "}
                              Settings
                            </a>
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link href="/register">
                            <a>
                              <i className="mdi mdi-lock-open-outline m-r-5" />{" "}
                              Lock screen
                            </a>
                          </Link>
                        </DropdownItem>
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
                  >
                    <div id="ex" className="lines">
                      <span />
                      <span />
                      <span />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        <div className="navbar-custom">
          <div className="container-fluid">
            <div
              id="navigation"
              style={{ display: this.state.toggleMenu ? "block" : "none" }}
            >
              <ul className="navigation-menu">
                <li className="has-submenu" onClick={this.toggleSubMenu}>
                  <Link href="#">
                    <a id="ex">
                      <i className="ti-archive" /> Trabajadores
                    </a>
                  </Link>
                  <ul
                    className="submenu megamenu"
                    ref={input => {
                      this.myInput = input;
                    }}
                  >
                    <li>
                      <ul>
                        <li>
                          <Link href="/employee">
                            <a>Crear Nuevo</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/employee_list" as="/employee/list">
                            <a>Listar</a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="has-submenu" onClick={this.toggleSubMenu}>
                  <Link href="#">
                    <a id="ex">
                      <i className="ti-archive" /> Empresas
                    </a>
                  </Link>
                  <ul
                    className="submenu megamenu"
                    ref={input => {
                      this.myInput = input;
                    }}
                  >
                    <li>
                      <ul>
                        <li>
                          <Link href="/new_company">
                            <a>Crear Nuevo</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/company_list" as="/company/list">
                            <a>Listar</a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li
                  className={
                    this.state.Tab === "extra"
                      ? "has-submenu active"
                      : "has-submenu"
                  }
                >
                  <Link href="#">
                    <a id="ex">Nómina</a>
                  </Link>
                  <ul className="submenu megamenu">
                    <li>
                      <ul>
                        <li
                          className={
                            this.state.SubTab === "pricing" ? "active" : ""
                          }
                        >
                          <Link href="/new_payroll" as="/new/payroll">
                            <a>Crear Nueva Nómina</a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Nav;
