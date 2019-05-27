import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import Select from "react-select";
import CurrencyInput from "react-currency-input";

import Error from "./Error";
import Loading from "./Loading";
import { CREATE_PAYROLL_TYPE_MUTATION } from "./graphql/mutations";

const types = [
  {
    label: 'Aumento',
    value: 'increase',
  },
  {
    label: 'Descuento',
    value: 'decrease'
  }
];

const categories = [
  {
    label: 'Sobre Tiempo',
    value: 'overtime'
  },
  {
    label: 'Ausencias y Tardanzas',
    value: 'abscenses'
  }
];

const operators = [
  {
    label: 'Multiplicar',
    value: '*'
  },
  {
    label: 'Dividir',
    value: '/'
  },
  {
    label: 'Sumar',
    value: '+'
  },
  {
    label: 'Restar',
    value: '-'
  }
]

class PayrollTypeForm extends Component {
  state = {
    name: "",
    type: {
      loading: "",
      value: ""
    },
    operator: {
      loading: "",
      value: ""
    },
    category: {
      loading: "",
      value: ""
    },
    value: 0.0
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
                        <Col>
                          <FormGroup>
                            <Label>Categoría</Label>
                            <Select
                              isClearable
                              isSearchable
                              isDisabled={this.state.category.loading}
                              isLoading={this.state.category.loading}
                              onChange={this.handleChange("category")}
                              defaultValue={categories[0]}
                              options={categories}
                              value={this.state.category.value}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>Tipo</Label>
                            <Select
                              isClearable
                              isSearchable
                              isDisabled={this.state.type.loading}
                              isLoading={this.state.type.loading}
                              onChange={this.handleChange("type")}
                              defaultValue={types[0]}
                              options={types}
                              value={this.state.type.value}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Operador</Label>
                            <Select
                              isClearable
                              isSearchable
                              isDisabled={this.state.operator.loading}
                              isLoading={this.state.operator.loading}
                              onChange={this.handleChange("operator")}
                              defaultValue={operators[0]}
                              options={operators}
                              value={this.state.operator.value}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Valor</Label>
                            <CurrencyInput
                              prefix=""
                              name="value"
                              className="form-control"
                              placeholder="Valor"
                              value={this.state.value}
                              onChangeEvent={this.saveToState}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
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
