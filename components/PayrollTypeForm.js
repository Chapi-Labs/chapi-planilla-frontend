import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

import Error from "./Error";
import Loading from "./Loading";
import { CREATE_PAYROLL_TYPE_MUTATION } from "./graphql/mutations";


class PayrollTypeForm extends Component {
  state = {
    name: "",
    type: "",
    type: "",
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = param => inputValue => {
    this.setState(previousState => ({
      ...previousState,
      [param]: {
        ...previousState.param,
        value: inputValue
      }
    }));
  };



  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Mutation
                mutation={CREATE_PAYROLL_TYPE_MUTATION}
                variables={this.state}
              >
                {(createPayrollType, { error, loading }) => (
                  <Fragment>
                    <Loading loading={loading} />
                    <Error error={error} />
                    <Form
                      method="post"
                      onSubmit={async e => {
                        e.preventDefault();
                        await createPayrollType();
                      }}
                    >
                      <FormGroup>
                        <Label>Nombre</Label>
                        <Input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Nombre"
                          value={this.state.name}
                          onChange={this.saveToState}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Tipo</Label>
                        <Input
                          type="text"
                          name="type"
                          className="form-control"
                          placeholder="Nombre"
                          value={this.state.type}
                          onChange={this.saveToState}
                        />
                      </FormGroup>
                      <Button type="submit">Guardar</Button>
                    </Form>
                  </Fragment>
                )}
              </Mutation>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PayrollTypeForm;
