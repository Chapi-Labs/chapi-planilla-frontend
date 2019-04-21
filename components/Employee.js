import React, { Component, Fragment } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Mutation } from "react-apollo";
import { CREATE_EMPLOYEE_MUTATION } from "./graphql/mutations";
import Loading from "./Loading";
import Error from "./Error";

class EmployeeList extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    response: {
      type: "",
      message: ""
    },
    error: {},
    loading: false
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    const { mutate, addEmployee } = this.props;
    e.preventDefault();
    this.setState({ loading: true});
    const r = await mutate({
      mutation: CREATE_EMPLOYEE_MUTATION,
      variables: this.state
    });
    this.setState({ loading: false });
    if (r.hasOwnProperty("data")) {
      this.setState(previousState => ({
        ...previousState,
        response: {
          type: "success",
          message: `Created ${this.state.first_name} ${this.state.last_name}`
        }
      }));
      if (addEmployee !== undefined) {
        addEmployee({
          id: r.data.createEmployee.id,
          first_name: this.state.first_name,
          last_name: this.state.last_name
        })
      }
      setTimeout(() => {
        this.setState({
          first_name: "",
          last_name: "",
          email: "",
          response: {
            message: "",
            type: ""
          }
        });
      }, 2000);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Form method="post" onSubmit={this.handleSubmit}>
                <Loading loading={this.state.loading} />
                <Error error={this.state.error || this.state.response} />
                <FormGroup>
                  <Label>Nombres</Label>
                  <Input
                    type="text"
                    name="first_name"
                    className="form-control"
                    placeholder="Nombres"
                    value={this.state.first_name}
                    onChange={this.saveToState}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Apellidos</Label>
                  <Input
                    type="text"
                    name="last_name"
                    placeholder="Apellidos"
                    value={this.state.last_name}
                    onChange={this.saveToState}
                  />
                </FormGroup>
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
                <Button
                  type={
                    this.props.addEmployee === undefined ? "submit" : "button"
                  }
                  onClick={this.handleSubmit}
                >
                  Guardar
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeList;
