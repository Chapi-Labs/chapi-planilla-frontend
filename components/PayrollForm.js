import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import Nav from '../components/Nav';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import gql from 'graphql-tag';

const EMPLOYEE_MUTATION = gql`
  mutation EMPLOYEE_MUTATION(
    $first_name: String!
    $last_name: String!
    $email: String!
  ) {
    createEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
    ) {
      id
      email
    }
  }
`;
class EmployeeList extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <Nav />
        <div className="wrapper">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h4 className="page-title">Crear Colaborador</h4>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">
                        <a>Inicio</a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Colaborador</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Mutation
                      mutation={EMPLOYEE_MUTATION}
                      variables={this.state}
                    >
                      {(createEmployee, { error, loading }) => (
                        <Form
                          method="post"
                          onSubmit={async e => {
                            e.preventDefault();
                            await createEmployee();
                            Router.push({
                              pathname: '/'
                            });
                          }}
                        >
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
                          <Button type="submit">Guardar</Button>
                        </Form>
                      )}
                    </Mutation>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeList;
