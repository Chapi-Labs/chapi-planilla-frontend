import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import Error from './Error';
import Loading from './Loading';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { COMPANY_MUTATION } from './graphql/mutations';


class CompanyForm extends Component {
  state = {
    name: '',
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Mutation mutation={COMPANY_MUTATION} variables={this.state}>
                {(createCompany, { error, loading }) => (
                  <Fragment>
                    <Loading loading={loading}/>
                    <Error error={error}/>
                    <Form
                      method="post"
                      onSubmit={async e => {
                        e.preventDefault();
                        await createCompany();
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

export default CompanyForm;
export { COMPANY_MUTATION };