import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Row, Col } from "reactstrap";
import Creatable from "react-select/lib/Creatable";

import {
  CREATE_EMPLOYEE_MUTATION,
  COMPANY_MUTATION
} from "./graphql/mutations";
import { SELECT_COMPANY_QUERY, SELECT_PAYROLL_CONFIG } from "./graphql/queries";
import Input from "./forms/Input";
import Loading from "./Loading";
import Error from "./Error";

class EmployeeList extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    hire_date: "",
    legal_id: "",
    title: "",
    base_salary: 0.0,
    company_id: "",
    response: {
      type: "",
      message: ""
    },
    companies: {
      loading: false,
      options: [],
      value: undefined
    },
    config: {
      loading: false,
      options: [],
      value: undefined
    },
    error: {},
    loading: false
  };

  async componentDidMount() {
    const { query } = this.props;
    const query1 =  query({
      query: SELECT_COMPANY_QUERY
    });
     const query2 = query({
       query: SELECT_PAYROLL_CONFIG
     });
      const [{ data: dataR1 }, { data: dataR2 }] = await Promise.all([
        query1,
        query2
      ]);
    this.setState(previousState => ({
      ...previousState,
      companies: {
        ...previousState.companies,
        options: dataR1.companies
      },
      config: {
        ...previousState.config,
        options: dataR2.payrollConfigSelect
      }
    }));
  }

  saveToState = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChange = (inputValue, actionMeta) => {
    const { mutate } = this.props;
    this.setState(previousState => ({
      ...previousState,
      companies: {
        ...previousState.companies,
        value: inputValue
      }
    }));
    if (actionMeta.action === "create-option") {
      this.setState(previousState => ({
        ...previousState,
        companies: {
          ...previousState.companies,
          loading: true
        }
      }));
      // create new company
      const r = mutate({
        mutation: COMPANY_MUTATION,
        variables: { name: inputValue.value }
      });
      r.then(item => {
        // add to state
        this.setState(previousState => ({
          ...previousState,
          companies: {
            ...previousState.companies,
            loading: false,
            options: [
              ...previousState.companies.options,
              {
                id: item.data.createCompany.id,
                value: item.data.createCompany.id,
                label: item.data.createCompany.name
              }
            ]
          }
        }));
      });
    }
  };
  handleSubmit = async e => {
    const { mutate, addEmployee } = this.props;
    e.preventDefault();
    this.setState({ loading: true });
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
        });
      } else {
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
    }
  };

  render() {
    const { companies, config } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Form method="post" onSubmit={this.handleSubmit}>
                <Loading loading={this.state.loading} />
                <Error error={this.state.error || this.state.response} />
                <h4>Información Personal</h4>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label>Nombres</Label>
                      <Input
                        type="text"
                        name="first_name"
                        className="form-control"
                        placeholder="Nombres"
                        value={this.state.first_name}
                        OnSave={this.saveToState}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label>Apellidos</Label>
                      <Input
                        type="text"
                        name="last_name"
                        placeholder="Apellidos"
                        value={this.state.last_name}
                        OnSave={this.saveToState}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label>Documento Identificación</Label>
                      <Input
                        type="text"
                        name="legal_id"
                        className="form-control"
                        placeholder="Ingresar documento"
                        value={this.state.legal_id}
                        OnSave={this.saveToState}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label>Fecha de Ingreso</Label>
                      <Input
                        type="date"
                        name="hire_date"
                        className="form-control"
                        placeholder="Date"
                        value={this.state.hire_date}
                        OnSave={this.saveToState}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Ingresar email"
                    value={this.state.email}
                    OnSave={this.saveToState}
                  />
                </FormGroup>
                <hr />
                <h4>Información Laboral</h4>
                <FormGroup>
                  <Label>Empresa</Label>
                  <Creatable
                    instanceId="select2"
                    isDisabled={companies.loading}
                    isLoading={companies.loading}
                    onChange={this.handleChange}
                    options={companies.options}
                    value={companies.value}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Tipo Sueldo</Label>
                  <Creatable
                    instanceId="select2"
                    isDisabled={config.loading}
                    isLoading={config.loading}
                    onChange={this.handleChange}
                    options={config.options}
                    value={config.value}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Sueldo</Label>
                  <Input
                    type="number"
                    name="base_salary"
                    className="form-control"
                    placeholder="Sueldo"
                    value={this.state.base_salary}
                    OnSave={this.saveToState}
                  />
                </FormGroup>
                <Button
                  className="waves-effect"
                  type={
                    this.props.addEmployee === undefined
                      ? "submit"
                      : "button"
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
