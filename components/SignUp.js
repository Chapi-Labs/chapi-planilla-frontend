import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Router from 'next/router';

import { CURRENT_USER_QUERY } from './User';
import Error from './Error';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <div>
            <div className="wrapper-page">
              <div className="card overflow-hidden account-card mx-3">
                <div className="bg-primary p-4 text-white text-center position-relative">
                  <h4 className="font-20 m-b-5">Crear Usuario</h4>
                  <p className="text-white-50 mb-4">Chapi Planilla</p>
                  <Link href="/">
                    <div className="logo logo-admin">
                      <img
                        src="../static/assets/images/logo-sm.png"
                        className=""
                        height="50"
                        alt="logo"
                      />
                    </div>
                  </Link>
                </div>
                <div className="account-card-content">
                  <Form
                    method="post"
                    className="form-horizontal m-t-30"
                    onSubmit={async e => {
                      e.preventDefault();
                      await signup();
                      this.setState({ name: "", email: "", password: "" });
                      Router.push({
                        pathname: "/"
                      });
                    }}
                  >
                    <Error error={error} />
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Ingresar email"
                        value={this.state.email}
                        onChange={this.saveToState}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Nombre</Label>
                      <Input
                        type="text"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.saveToState}
                        placeholder="Ingresar nombre"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Password</Label>
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
                          Register
                        </Button>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div className="col-12 m-t-20">
                        <p className="mb-0">
                          By registering you agree to the{" "}
                          <Link href="#">
                            <a className="text-primary">Terms of Use</a>
                          </Link>
                        </p>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
              </div>

              <div className="m-t-40 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link href="/login">
                    <a className="font-500 text-primary"> Login </a>
                  </Link>{" "}
                </p>
                <div className="m-t-40 text-center">
                  <p>© {new Date().getFullYear()} Chapi Labs </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };