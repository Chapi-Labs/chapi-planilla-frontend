import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import { Mutation, Query, ApolloConsumer } from 'react-apollo';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import gql from 'graphql-tag';
import Creatable from 'react-select/lib/Creatable';
import { adopt } from 'react-adopt';
import Error from './Error';
import Loading from './Loading';
import { COMPANY_MUTATION } from './CompanyForm';

const PAYROLL_MUTATION = gql`
  mutation PAYROLL_MUTATION(
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

const COMPANY_QUERY = gql`
  query COMPANY_QUERY {
    companies(where: { active: true }) {
      id
      value
      label
    }
  }
`



const Composed = adopt({
  f1: ({ render }) => (
    <Mutation mutation={PAYROLL_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  f3: ({ render }) => (
    <Mutation mutation={COMPANY_MUTATION}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  )
});


class PayrollForm extends Component {
  state = {
    name: "",
    company_id: "",
    employees: {
      function: undefined,
      loading: false,
      options: [],
      value: undefined
    },
    config_id: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (inputValue, actionMeta) => {
    const { mutate } = this.props
    this.setState(previousState => ({
      ...previousState,
      employees: {
         ...previousState.employees,
        value: inputValue
      }
    }));
    if (actionMeta.action === "create-option") {
      this.setState(previousState => ({
        ...previousState,
        employees: {
          ...previousState.employees,
          loading: true
        }
      }));
      // create new company
      const r = mutate({
        mutation: COMPANY_MUTATION,
        variables: { name: inputValue.value }
      });
      r.then((item) => {
        // add to state
        this.setState(previousState => ({
          ...previousState,
          employees: {
            ...previousState.employees,
            loading: false,
            options: [
              ...previousState.employees.options,
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


  async componentDidMount() {
    const { query } = this.props
    const { data } = await query({
      query: COMPANY_QUERY,
    });
    this.setState(previousState => ({ 
      ...previousState,
      employees: {
        ...previousState.employees,
        options: data.companies
      }
    }));
  }

  render() {
    const { employees } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Composed>
                {({ f1 }) => {
                  const { 
                    mutation: createPayroll,
                    result: resultPayroll
                  } = f1;
                  if (
                    resultPayroll.loading
                  ) {
                    return <Loading loading={true} />;
                  }
                  return (
                    <Fragment>
                      <Form
                        method="post"
                        onSubmit={async e => {
                          console.log("entra");
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
                            isDisabled={employees.loading}
                            isLoading={employees.loading}
                            onChange={this.handleChange}
                            options={employees.options}
                            value={employees.value}
                          />
                        </FormGroup>
                        <Button type="submit">Guardar</Button>
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
