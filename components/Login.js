import React, { Component } from 'react';
import Link from 'next/link';

class Login extends Component {
  render() {
    return (
      <div>
        <div className="wrapper-page">
          <div className="card overflow-hidden account-card mx-3">
            <div className="bg-primary p-4 text-white text-center position-relative">
              <h4 className="font-20 m-b-5">Bienvenido</h4>
              <p className="text-white-50 mb-4">Chapi Planilla</p>
              <div className="logo logo-admin">
                <Link href="/">
                  <img
                    src="../static/assets/images/logo-sm.png"
                    height="24"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
            <div className="account-card-content">
              <form className="form-horizontal m-t-30" action="/">
                <div className="form-group">
                  <label htmlFor="username">Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Ingresar usuario"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userpassword">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="userpassword"
                    placeholder="Ingresar contraseña"
                  />
                </div>

                <div className="form-group row m-t-20">
                  <div className="col-sm-3 offset-sm-4">
                    <button
                      className="btn btn-primary w-md waves-effect waves-light"
                      type="submit"
                    >
                      Ingresar
                    </button>
                  </div>
                </div>

                <div className="form-group m-t-10 mb-0 row">
                  <div className="col-12 m-t-20">
                    <Link href="pages-recoverpw">
                      <div>
                        <i className="mdi mdi-lock" /> Recuperar contraseña
                      </div>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="m-t-40 text-center">
            <p>© {new Date().getFullYear()} Chapi Labs </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
