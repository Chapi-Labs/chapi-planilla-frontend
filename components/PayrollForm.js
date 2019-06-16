import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import Select from 'react-select';
import { adopt } from "react-adopt";
import Router from "next/router";
import { withRouter } from 'next/router'
import Error from "./Error";
import Loading from "./Loading";
import PayrollFormTable from "./PayrollFormTable";
import { CREATE_PAYROLL_MUTATION } from "./graphql/mutations";
import {
  SELECT_COMPANY_QUERY,
  SELECT_PAYROLL_CONFIG,
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
    frequency: {
      loading: false,
      options: [],
      value: ""
    },
    loading: false,
    date_start: new Date()
      .toISOString()
      .substring(0, new Date().toISOString().indexOf("T")),
    date_end: new Date()
      .toISOString()
      .substring(0, new Date().toISOString().indexOf("T")),
    page: 1
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  formatStringDate = date => {
    return date
      .toISOString()
      .substring(0, new Date().toISOString().indexOf("T"));
  };

  changeDates = type => {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    let firstDay;
    let lastDay;
    if (type === "MONTHLY" || type === "HOURLY") {
      firstDay = new Date(y, m, 1);
      lastDay = new Date(y, m + 1, 0);
      this.setState(previousState => ({
        ...previousState,
        date_start: this.formatStringDate(firstDay),
        date_end: this.formatStringDate(lastDay)
      }));
    }
    if (type === "BI_WEEKLY") {
      const day = date.getDay();
      if (day < 15) {
        firstDay = new Date(y, m, 1);
        lastDay = new Date(y, m, 15);
      } else {
        firstDay = new Date(y, m, 15);
        lastDay = new Date(y, m + 1, 0);
      }
      this.setState(previousState => ({
        ...previousState,
        date_start: this.formatStringDate(firstDay),
        date_end: this.formatStringDate(lastDay)
      }));
    }
  };

  handleChange = param => inputValue => {
    this.setState(previousState => ({
      ...previousState,
      [param]: {
        ...previousState[param],
        value: inputValue
      }
    }));
    if (param === "frequency") this.changeDates(inputValue.payroll_frequency);
  };

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
      frequency: {
        ...previousState.type,
        options: dataR2.payrollConfigSelect
      }
    }));
  }

  render() {
    const { companies, frequency, page } = this.state;
    const { router: { query }} = this.props;
    if (page == 2 || query.page == 2) return <PayrollFormTable id={query.id} {...this.props}/>;
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Composed>
                {({ f1 }) => {
                  const { mutation: createPayroll, result: resultPayroll } = f1;
                  if (resultPayroll.loading || this.state.loading) {
                    return <Loading loading={true} />;
                  }
                  return (
                    <Fragment>
                      <Form
                        method="post"
                        onSubmit={async e => {
                          e.preventDefault();
                          const {
                            companies,
                            frequency,
                            name,
                            date_start,
                            date_end
                          } = this.state;
                          this.setState({ loading: true });
                          const r = await createPayroll({
                            variables: {
                              name: name,
                              company: companies.value.id,
                              frequency: frequency.value.id,
                              date_start,
                              date_end
                            }
                          });
                          this.setState({
                            loading: false
                          });
                          if (r.hasOwnProperty("data")) {
                            Router.push({
                              pathname: "/payroll_new",
                              query: {
                                page: 2,
                                id: companies.value.id
                              }
                            });
                            this.setState({ page: 2 });
                          }
                        }}
                      >
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
                                isDisabled={frequency.loading}
                                isLoading={frequency.loading}
                                onChange={this.handleChange("frequency")}
                                options={frequency.options}
                                value={frequency.value}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
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
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <Label>Fecha de Inicio</Label>
                              <Input
                                type="date"
                                name="date_start"
                                className="form-control"
                                placeholder="Date"
                                value={this.state.date_start}
                                onChange={this.saveToState}
                              />
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                              <Label>Fecha de Cierre</Label>
                              <Input
                                type="date"
                                name="date_end"
                                className="form-control"
                                placeholder="Date"
                                value={this.state.date_end}
                                onChange={this.saveToState}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button className="waves-effect" type="submit">
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

export default withRouter(PayrollForm);
