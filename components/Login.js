import React, { Component } from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { CURRENT_USER_QUERY } from './User';
import { SIGNIN_MUTATION } from './graphql/mutations';
import Loading from './Loading';
import Error from './Error';


class Login extends Component {
  state = {
    name: '',
    password: '',
    email: '',
    loading: false
  };
  constructor(props) {
    super(props);
    const { loading = false } = props;
    this.setState({ loading });
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="wrapper-page">
        <div className="card overflow-hidden account-card mx-3">
          <div className="bg-primary p-4 text-white text-center position-relative">
            <h4 className="font-20 m-b-5">Bienvenido</h4>
            <p className="text-white-50 mb-4">Chapi Planilla</p>
            <div className="logo logo-admin">
              <Link href="/">
                <img
                  src="../static/assets/images/logo-sm.png"
                  height="50"
                  alt="logo"
                />
              </Link>
            </div>
          </div>
          <div className="account-card-content">
            <Mutation
              mutation={SIGNIN_MUTATION}
              variables={this.state}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {(login, { error, loading }) => {
                if (loading || this.state.loading) return <Loading loading={loading}/>
                return (
                  <Form
                    method="post"
                    className="form-horizontal m-t-30"
                    onSubmit={async e => {
                      e.preventDefault();
                      await login();
                      this.setState({ name: '', email: '', password: '' });
                    }}
                  >
                    <Error error={error} />
                    <FormGroup>
                      <Label htmlFor="username">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Ingresar email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.saveToState}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="userpassword">Contraseña</Label>
                      <Input
                        type="password"
                        name="password"
                        className="form-control"
                        autoComplete="password"
                        placeholder="Ingresar contraseña"
                        value={this.state.password}
                        onChange={this.saveToState}
                      />
                    </FormGroup>

                    <FormGroup>
                      <div className="col-sm-3 offset-sm-4">
                        <Button
                          className="btn btn-primary w-md waves-effect waves-light"
                          type="submit"
                        >
                          Ingresar
                        </Button>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div className="col-12 m-t-20">
                        <Link href="/">
                          <a>
                            <FontAwesomeIcon icon="lock" className="m-r-5"/>Recuperar
                            contraseña
                          </a>
                        </Link>
                      </div>
                    </FormGroup>
                  </Form>
                )
              }}
            </Mutation>
        </div>
      </div>

      <div className="m-t-40 text-center">
        <p>© {new Date().getFullYear()} Chapi Labs </p>
      </div>
    </div>
    );
  }
}

export default Login;
