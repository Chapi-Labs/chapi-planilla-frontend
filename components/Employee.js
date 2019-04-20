import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Mutation } from 'react-apollo';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Nav from '../components/Nav';
import { CREATE_EMPLOYEE_MUTATION } from './graphql/mutations';
import Loading from './Loading';
import Error from './Error';

class EmployeeList extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    response: {
      type: '',
      message: ''
    }
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
                      mutation={CREATE_EMPLOYEE_MUTATION}
                      variables={this.state}
                    >
                      {(createEmployee, { error, loading }) => (
                        <Form
                          method="post"
                          onSubmit={async e => {
                            e.preventDefault();
                            const r = await createEmployee();
                            if (r.hasOwnProperty('data')) {
                              this.setState(previousState => ({
                                ...previousState,
                                response: {
                                  type: 'success',
                                  message: `Created ${this.state.first_name} ${this.state.last_name}`
                                }
                              }));
                              setTimeout(() => {
                                this.setState({
                                  first_name: '', 
                                  last_name: '',
                                  email: '',
                                  response: {
                                    message: '',
                                    type: ''
                                  }
                                });
                              }, 3000);
                              
                            }
                          }}
                        >
                          <Loading loading={loading} />
                          <Error error={error || this.state.response}/>
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
