import React, { Component } from "react";
import Link from "next/link";
import { Mutation } from "react-apollo";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import gql from "graphql-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Error from "./Error";
import Loading from "./Loading";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <Form
            method="post"
            className="form-horizontal m-t-30"
            onSubmit={async e => {
              e.preventDefault();
              const c = await reset();
              console.log(c);
              this.setState({ email: "" });
            }}
          >
            <Loading loading={loading || this.state.loading} />
            <Error error={error} />
            {!error && !loading && called && (
              <p>Revisa tu correo para cambiar tu contraseña!</p>
            )}
            <FormGroup>
              <Label htmlFor="email">Email</Label>
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
            {!error && !loading && !called && (
                <FormGroup>
                <div className="col-sm-6 offset-sm-3">
                    <Button
                    className="btn btn-primary w-md waves-effect waves-light"
                    type="submit"
                    >
                    Recuperar Contraseña
                    </Button>
                </div>
                </FormGroup>
            )}
            <FormGroup>
              <div className="col-12 m-t-20">
                <Link href="/">
                  <a>
                    <FontAwesomeIcon icon="arrow-left" className="m-r-5" />
                    Regresar
                  </a>
                </Link>
              </div>
            </FormGroup>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
export { REQUEST_RESET_MUTATION };
