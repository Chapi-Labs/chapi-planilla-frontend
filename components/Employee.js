import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Row, Col, Input } from "reactstrap";
import Creatable from "react-select/lib/Creatable";
import CurrencyInput from 'react-currency-input';
import SimpleReactValidator from "simple-react-validator";

import {
  CREATE_EMPLOYEE_MUTATION,
  COMPANY_MUTATION
} from "./graphql/mutations";
import { SELECT_COMPANY_QUERY, SELECT_PAYROLL_CONFIG } from "./graphql/queries";
import Loading from "./Loading";
import Error from "./Error";

class EmployeeList extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    hire_date: new Date().toISOString().substring(0, new Date().toISOString().indexOf("T")),
    legal_id: "",
    title: "",
    base_salary: 0.0,
    response: {
      type: "",
      message: ""
    },
    companies: {
      loading: false,
      options: [],
      value: ""
    },
    config: {
      loading: false,
      options: [],
      value: ""
    },
    error: {},
    loading: false,
  };

  constructor(props) {
    super(props)
    this.validator = new SimpleReactValidator({
      messages: {
        email: 'Este valor no es un correo',
        required: 'Este valor es obligatorio',
        // OR
        default: 'El valor no es válido'  // will override all messages
      }
    });
  }

  async componentDidMount() {
    const { query } = this.props;
    const query1 = query({
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

  saveToState = (e, maskedvalue, floatvalue) => {
    this.setState({
      [e.target.name]:
        floatvalue == null ? e.target.value : floatvalue
    });
  };

  handleChangeSalary = (inputValue, actionMeta) => {
    const { mutate } = this.props;
    this.setState(previousState => ({
      ...previousState,
      config: {
        ...previousState.config,
        value: inputValue
      }
    }));
  }

  handleChangeCompany = (inputValue, actionMeta) => {
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
    const { mutate } = this.props;
    e.preventDefault();
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
      return;
    }
    this.setState({ loading: true });
    
    try {
      const r = await mutate({
        mutation: CREATE_EMPLOYEE_MUTATION,
        variables: {
          ...this.state,
          company_id: this.state.companies.value.id,
          frequency: this.state.config.value.id
        }
      });
      this.setState({ loading: false });
      if (r.hasOwnProperty("data")) {
        this.setState(previousState => ({
          ...previousState,
          response: {
            type: "success",
            message: `Creado ${this.state.first_name} ${this.state.last_name}`
          }
        }));
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
    } catch (e) {
      console.log(e);
      const errors = e.graphQLErrors.map(error => error.message);
      this.setState({
        loading: false,
        error: {
          message: errors[0]
        }
      });
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
                        onChange={this.saveToState}
                      />
                      {this.validator.message(
                        "first_name_validation",
                        this.state.first_name,
                        "required"
                      )}
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
                        onChange={this.saveToState}
                      />
                      {this.validator.message(
                        "last_name_validation",
                        this.state.last_name,
                        "required"
                      )}
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
                        onChange={this.saveToState}
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
                        onChange={this.saveToState}
                      />
                      {this.validator.message(
                        "date_validation",
                        this.state.hire_date,
                        [
                          "required",
                          {
                            regex: /^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/
                          }
                        ]
                      )}
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
                    onChange={this.saveToState}
                  />
                  {this.validator.message(
                    "email_validation",
                    this.state.email,
                    "required|email"
                  )}
                </FormGroup>
                <hr />
                <h4>Información Laboral</h4>
                <FormGroup>
                  <Label>Empresa</Label>
                  <Creatable
                    instanceId="select2"
                    isDisabled={companies.loading}
                    isLoading={companies.loading}
                    onChange={this.handleChangeCompany}
                    options={companies.options}
                    value={companies.value}
                  />
                  {this.validator.message(
                    "company_validation",
                    companies.value,
                    "required"
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Tipo Sueldo</Label>
                  <Creatable
                    instanceId="select2"
                    isDisabled={config.loading}
                    isLoading={config.loading}
                    onChange={this.handleChangeSalary}
                    options={config.options}
                    value={config.value}
                  />
                  {this.validator.message(
                    "salary_validation",
                    config.value,
                    "required"
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Sueldo</Label>
                  <CurrencyInput
                    prefix="$"
                    name="base_salary"
                    className="form-control"
                    placeholder="Sueldo"
                    value={this.state.base_salary}
                    onChangeEvent={this.saveToState}
                  />
                </FormGroup>
                {!this.state.loading && (
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
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeList;
