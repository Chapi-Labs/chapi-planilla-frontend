import React, { Component } from "react";
import Link from "next/link";
import { Query, Mutation } from "react-apollo";
import { MDBDataTable } from "mdbreact";
import gql from "graphql-tag";
import Editable from "react-x-editable";
import Nav from "../components/Nav";

const LIST_EMPLOYEE = gql`
  query LIST_EMPLOYEE {
    employees {
      id
      first_name
      last_name
      email
    }
  }
`;
const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UPDATE_EMPLOYEE_MUTATION(
    $id: ID!
    $first_name: String
    $last_name: String
    $email: String
  ) {
    updateEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
    ) {
      id
      first_name
      last_name
      email
    }
  }
`;
const data = {
  columns: [
    {
      label: "Nombres",
      field: "first_name",
      sort: "asc",
      width: 150
    },
    {
      label: "Apellidos",
      field: "last_name",
      sort: "asc",
      width: 270
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 200
    }
  ],
  rows: []
};
class EmployeeList extends Component {
  handleSubmit(target) {
    target.props.updateFunction({
      variables: {
        id: target.props.id,
        [target.props.column]: target.newValue
      }
    });
  }
  transformData = apiData => {
    const rows = [];
    for (const row of apiData.employees) {
      let newRow = {};
      for (const key in data.columns) {
        const column = data.columns[key];
        newRow = {
          ...newRow,
          [column.field]: (
            <Mutation
              mutation={UPDATE_EMPLOYEE_MUTATION}
              value={row[column.field]}
            >
              {(updateEmployee, { loading, error }) => (
                <Editable
                  dataType="text"
                  mode="inline"
                  value={row[column.field]}
                  id={row.id}
                  column={column.field}
                  updateFunction={updateEmployee}
                  handleSubmit={this.handleSubmit}
                />
              )}
            </Mutation>
          )
        };
      }
      rows.push(newRow);
    }

    return { ...data, rows };
  };

  render() {
    return (
      <div>
        <Nav />
        <div className="wrapper">
          <div className="container-fluid">
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h4 className="page-title">Crear Colaborador</h4>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">
                        <a>Inicio</a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Colaborador</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">
                      Listado de Colaboradores
                    </h4>
                    <Query query={LIST_EMPLOYEE}>
                      {({ error, loading, data }) => {
                        if (loading) return <p>Loading..</p>;
                        return (
                          <MDBDataTable
                            bordered
                            hover
                            data={this.transformData(data)}
                          />
                        );
                      }}
                    </Query>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeList;
