import React, { Component } from "react";
import Link from "next/link";
import { Query, Mutation } from "react-apollo";
import { MDBDataTable } from "mdbreact";
import Editable from "react-x-editable";

import Nav from "../components/Nav";
import { UPDATE_EMPLOYEE_MUTATION } from './graphql/mutations'
import { LIST_EMPLOYEE } from './graphql/queries';

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
}
const data = {
  columns: [
    {
      label: "Nombres",
      field: "first_name",
      sort: "asc",
      width: 150,
      disabled: false
    },
    {
      label: "Apellidos",
      field: "last_name",
      sort: "asc",
      width: 270,
      disabled: false
    },
    {
      label: "Identificación",
      field: "legal_id",
      sort: "asc",
      width: 50,
      disabled: false
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 200,
      disabled: false
    },
    {
      label: "Salario Base",
      field: "base_salary",
      sort: "asc",
      width: 200,
      disabled: false
    },
    {
      label: "Empresa",
      field: "company.name",
      sort: "asc",
      width: 200,
      disabled: true
    }
  ],
  rows: []
};
class EmployeeList extends Component {
  handleSubmit(target) {
    target.props.updateFunction({
      variables: {
        id: target.props.id,
        [target.props.column.replace(".", "_")]: target.newValue
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
              value={getNestedObject(row, column.field.split("."))}
            >
              {(updateEmployee, { loading, error }) => (
                <Editable
                  dataType="text"
                  mode="inline"
                  value={getNestedObject(row, column.field.split("."))}
                  id={row.id}
                  column={column.field}
                  disabled={column.disabled}
                  updateFunction={updateEmployee}
                  bsBtnType="primary"
                  bsBtnClassNames="m-r-5"
                  emptyValueText={"N/A"}
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
