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
    key: 'increase',
    value: 'increase',
  },
  {
    label: 'Descuento',
    key: 'decrease',
    value: 'decrease'
  }
];

const categories = [
  {
    label: 'Sobre Tiempo',
    key: 'overtime',
    value: 'overtime'
  },
  {
    label: 'Ausencias y Tardanzas',
    key: 'abscenses',
    value: 'abscenses'
  }
];

const operators = [
  {
    label: 'Multiplicar',
    key: '*',
    value: '*'
  },
  {
    label: 'Dividir',
    key: '/',
    value: '/'
  },
  {
    label: 'Sumar',
    key: '+',
    value: '+'
  },
  {
    label: 'Restar',
    key: '-',
    value: '-'
  }
]

class PayrollTypeForm extends Component {
  state = {
    loading: false,
    name: "",
    type: "",
    operator: "",
    category: "",
    order: 0.0,
    value: 0.0
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = param => inputValue => {
    this.setState(previousState => ({
      ...previousState,
      [param]: inputValue
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
                variables={{
                  name: this.state.name,
                  category: this.state.category.value,
                  operator: this.state.operator.value,
                  order: this.state.order,
                  type: this.state.type.value,
                  value: this.state.value,
                }}
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
                              isDisabled={this.state.loading}
                              isLoading={this.state.loading}
                              onChange={this.handleChange("category")}
                              defaultValue={categories[0]}
                              options={categories}
                              value={this.state.category}
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
                              isDisabled={this.state.loading}
                              isLoading={this.state.loading}
                              onChange={this.handleChange("type")}
                              defaultValue={types[0]}
                              options={types}
                              value={this.state.type}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Operador</Label>
                            <Select
                              isClearable
                              isSearchable
                              isDisabled={this.state.loading}
                              isLoading={this.state.loading}
                              onChange={this.handleChange("operator")}
                              defaultValue={operators[0]}
                              options={operators}
                              value={this.state.operator}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Orden</Label>
                            <CurrencyInput
                              prefix=""
                              name="order"
                              className="form-control"
                              placeholder="Orden"
                              value={this.state.order}
                              onChangeEvent={this.saveToState}
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
