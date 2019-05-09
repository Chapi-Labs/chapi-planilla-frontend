import React, { Component } from "react";
import Link from "next/link";
import { Query, Mutation } from "react-apollo";
import { MDBDataTable } from "mdbreact";
import Editable from "react-x-editable";

import Nav from "../components/Nav";
import { UPDATE_COMPANY_MUTATION } from './graphql/mutations'
import { LIST_COMPANIES } from "./graphql/queries";

const isDate = date => { return new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) };

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => {
       if ( obj && obj[key] !== "undefined") {
            return isDate(obj[key])
              ? new Date(obj[key]).toLocaleString()
              : obj[key];
       }
       return undefined;
    },
    nestedObj
  );
}
const data = {
  columns: [
    {
      label: "Nombre",
      field: "name",
      sort: "asc",
      width: 150,
      disabled: false
    },
    {
      label: "Fecha Creación",
      field: "createdAt",
      sort: "asc",
      width: 150,
      disabled: true
    }
  ],
  rows: []
};
class CompanyList extends Component {
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
    for (const row of apiData.companiesList) {
      let newRow = {};
      for (const key in data.columns) {
        const column = data.columns[key];
        newRow = {
          ...newRow,
          [column.field]: (
            <Mutation
              mutation={UPDATE_COMPANY_MUTATION}
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
                  <h4 className="page-title">Ver Empresas</h4>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">
                        <a>Inicio</a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active">Empresa</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">
                      Listado de Empresas
                    </h4>
                    <Query query={LIST_COMPANIES}>
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

export default CompanyList;
