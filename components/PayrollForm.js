import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import Creatable from "react-select/lib/Creatable";
import { adopt } from "react-adopt";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Employee from "./Employee";

import Error from "./Error";
import Loading from "./Loading";
import { COMPANY_MUTATION, CREATE_PAYROLL_MUTATION } from "./graphql/mutations";
import { SELECT_COMPANY_QUERY, SELECT_EMPLOYEE_LIST } from "./graphql/queries";

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
    config_id: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (inputValue) => {
    this.setState(previousState => ({
      ...previousState,
      companies: {
        ...previousState.companies,
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
      employees: {
        ...previousState.employees,
        options: dataR2.employeesSelect
      }
    }));
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };


  render() {
    const { companies } = this.state;
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

export default PayrollForm;
