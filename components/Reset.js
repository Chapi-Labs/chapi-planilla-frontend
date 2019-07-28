import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Router from "next/router";

import Error from './Error';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };
  state = {
    password: '',
    confirmPassword: '',
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await reset();
              setTimeout(() => {
                Router.push("/");
              }, 1500);
              this.setState({ password: "", confirmPassword: "" });
            }}
          >
            {!error && !loading && called && <Error error={{
                type: 'success',
                message: 'Contraseña cambiada exitosamente!'
            }} />}
            <fieldset disabled={loading} aria-busy={loading}>
              <Error error={error} />
              <FormGroup>
                <Label htmlFor="password">Contraseña</Label>
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
                <Label htmlFor="confirmPassword">
                  Confirmar Contraseña
                </Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  autoComplete="password"
                  placeholder="Confirmar Contraseña"
                  value={this.state.confirmPassword}
                  onChange={this.saveToState}
                />
              </FormGroup>

              <Button
                className="btn btn-primary w-md waves-effect waves-light"
                type="submit"
              >
                Cambiar Contraseña!
              </Button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Reset;