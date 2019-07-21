import React, { Component } from "react";
import { Query } from "react-apollo";
import { MDBDataTable } from "mdbreact";

import { LIST_PAYROLLS } from "./graphql/queries";

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};
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
      label: "Fecha Inicio",
      field: "date_start",
      sort: "asc",
      width: 270,
      disabled: false
    },
    {
      label: "Fecha Fin",
      field: "date_end",
      sort: "asc",
      width: 50,
      disabled: false
    },
    {
      label: "Empresa",
      field: "company.name",
      sort: "asc",
      width: 50,
      disabled: false
    }
  ],
  rows: []
};
class PayrollList extends Component {
  transformData = apiData => {
    const rows = [];
    console.log(apiData);
    for (const row of apiData.findPayrollRegistry) {
      let newRow = {};
      for (const key in data.columns) {
        const column = data.columns[key];
        newRow = {
          ...newRow,
          [column.field]: (
            <p>{getNestedObject(row, column.field.split("."))}</p>
          )
        };
      }
      rows.push(newRow);
    }

    return { ...data, rows };
  };

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="mt-0 header-title">Listado de Nóminas</h4>
              <Query query={LIST_PAYROLLS}>
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
    );
  }
}

export default PayrollList;
