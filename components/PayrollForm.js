import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import Select from 'react-select';
import { adopt } from "react-adopt";

import Error from "./Error";
import Loading from "./Loading";
import { CREATE_PAYROLL_MUTATION } from "./graphql/mutations";
import {
  SELECT_COMPANY_QUERY,
  SELECT_EMPLOYEE_LIST,
  SELECT_PAYROLL_CONFIG
} from "./graphql/queries";

const Composed = adopt({
  f1: ({ render }) => (
    <Mutation mutation={CREATE_PAYROLL_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  )
});

class PayrollForm extends Component {
  state = {
    name: "",
    company_id: "",
    companies: {
      function: undefined,
      loading: false,
      options: [],
      value: undefined
    },
    popoverOpen: false,
    config_id: "",
    config: {
      loading: false,
      options: [],
      value: ""
    },
    date: new Date()
      .toISOString()
      .substring(0, new Date().toISOString().indexOf("T")),
    page: 1
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

  async componentDidMount() {
    const { query } = this.props;
    const query1 = query({
      query: SELECT_COMPANY_QUERY
    });
    const query2 = query({
      query: SELECT_EMPLOYEE_LIST
    });
    const query3 = query({
      query: SELECT_PAYROLL_CONFIG
    });
    const [
      { data: dataR1 },
      { data: dataR2 },
      { data: dataR3 }
    ] = await Promise.all([query1, query2, query3]);
    this.setState(previousState => ({
      ...previousState,
      companies: {
        ...previousState.companies,
        options: dataR1.companies
      },
      employees: {
        ...previousState.employees,
        options: dataR2.employeesSelect
      },
      config: {
        ...previousState.config,
        options: dataR3.payrollConfigSelect
      }
    }));
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  render() {
    const { companies, config } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Composed>
                {({ f1 }) => {
                  const { mutation: createPayroll, result: resultPayroll } = f1;
                  if (resultPayroll.loading) {
                    return <Loading loading={true} />;
                  }
                  return (
                    <Fragment>
                      <Form
                        method="post"
                        onSubmit={async e => {
                          e.preventDefault();
                          await createPayroll();
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
                        <Row>
                          <Col>
                            <FormGroup>
                              <Label>Empresa</Label>
                              <Select
                                instanceId="select2"
                                isDisabled={companies.loading}
                                isLoading={companies.loading}
                                onChange={this.handleChange("companies")}
                                options={companies.options}
                                value={companies.value}
                              />
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                              <Label>Tipo Sueldo</Label>
                              <Select
                                instanceId="select2"
                                isDisabled={config.loading}
                                isLoading={config.loading}
                                onChange={this.handleChange("config")}
                                options={config.options}
                                value={config.value}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <FormGroup>
                          <Label>Fecha de Cierre</Label>
                          <Input
                            type="date"
                            name="date"
                            className="form-control"
                            placeholder="Date"
                            value={this.state.date}
                            onChange={this.saveToState}
                          />
                        </FormGroup>
                        <Button
                          className="waves-effect"
                          type="submit"
                        >
                          Guardar
                        </Button>
                      </Form>
                    </Fragment>
                  );
                }}
              </Composed>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PayrollForm;
