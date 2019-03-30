import React, { Component } from 'react'
import Link from 'next/link'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Signout from './Signout';


class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Tab: '',
      SubTab: '',
      MoreTab: '',
      dropdownOpen: false,
      email_menu: false,
      ui_menu: false,
      form_menu: false,
      chart_menu: false,
      table_menu: false,
      icon_menu: false,
      map_menu: false,
      extra_menu: false,
      pages_menu: false,
      et_menu: false,
      dropdownOpen1: false,
      dropdownOpenprofile: false,
      dropdownOpenbadge: false
    };
  }

  toggle(dropdownOpen) {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <header id="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            <div className="logo">
              <Link href="/">
                <div className="logo">
                  <img
                    src="../static/assets/images/logo-sm.png"
                    alt=""
                    className="logo-small"
                  />
                  <img
                    src="../static/assets/images/logo-light.png"
                    alt=""
                    className="logo-large"
                  />
                </div>
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
                      <DropdownToggle className="dropdown-toggle testflag nav-link arrow-none waves-effect nav-user">
                        <img
                          src="../static/assets/images/users/user-4.jpg"
                          alt="user"
                          className="rounded-circle"
                        />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <i className="mdi mdi-account-circle m-r-5" />{' '}
                          Profile
                        </DropdownItem>
                        <DropdownItem>
                          <i className="mdi mdi-wallet m-r-5" /> My Wallet
                        </DropdownItem>
                        <DropdownItem>
                          <span className="badge badge-success float-right">
                            11
                          </span>
                          <i className="mdi mdi-settings m-r-5" /> Settings
                        </DropdownItem>
                        <DropdownItem>
                          <i className="mdi mdi-lock-open-outline m-r-5" />{' '}
                          Lock screen
                        </DropdownItem>
                        <DropdownItem>
                          <Signout/>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </li>

                <li className="menu-item list-inline-item">
                  <Link href="#">
                    <div id="ex" className="lines navbar-toggle nav-link">
                      <span />
                      <span />
                      <span />
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="clearfix" />
          </div>
        </div>
        <div className="navbar-custom">
          <div className="container-fluid">
            <div id="navigation">
              <ul className="navigation-menu">
                <li className="has-submenu">
                  <Link href="#">
                    <div id="ex">
                      <i className="ti-archive" />
                      Authentication
                    </div>
                  </Link>
                  <ul className="submenu megamenu">
                    <li>
                      <ul>
                        <li>
                          <Link href="pages-login">
                            <a>Login 1</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="pages-register">
                            <a>Register 1</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="pages-recoverpw">
                            <a>Recover Password 1</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="pages-lock-screen">
                            <a>Lock Screen 1</a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <Link href="pages-login-2">
                            <a>Login 2</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="pages-register-2">
                            <a>Register 2</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="pages-recoverpw-2">
                            <a>Recover Password 2</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="pages-lock-screen-2">
                            <a>Lock Screen 2</a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li
                  className={
                    this.state.Tab === 'extra'
                      ? 'has-submenu active'
                      : 'has-submenu'
                  }
                >
                  <Link href="#">
                    <a id="ex">Extra Pages</a>
                  </Link>
                  <ul className="submenu megamenu">
                    <li>
                      <ul>
                        <li
                          className={
                            this.state.SubTab === 'pricing' ? 'active' : ''
                          }
                        >
                          <Link href="pages-pricing">
                            <a>Pricing</a>
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

export default Nav
