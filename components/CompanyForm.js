import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import Error from './Error';
import Loading from './Loading';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CurrencyInput from "react-currency-input";

import { COMPANY_MUTATION } from './graphql/mutations';


class CompanyForm extends Component {
  state = {
    name: "",
    professional_risk: 0.0,
    response: {}
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
                    <Loading loading={loading} />
                    <Error error={error || this.state.response} />
                    <Form
                      method="post"
                      onSubmit={async e => {
                        e.preventDefault();
                        const r = await createCompany();
                        console.log(r);
                        if (r.hasOwnProperty("data")) {
                          this.setState({
                            response: {
                              type: "success",
                              message: "Creado exitosamente"
                            }
                          });
                           setTimeout(() => {
                             this.setState({
                               name: "",
                               professional_risk: "",
                               response: {
                                 message: "",
                                 type: ""
                               }
                             });
                           }, 2000);
                        }
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
                        <Label>Riesgo Profesional</Label>
                        <CurrencyInput
                          name="professional_risk"
                          className="form-control"
                          placeholder="Sueldo"
                          value={this.state.professional_risk}
                          onChangeEvent={this.saveToState}
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