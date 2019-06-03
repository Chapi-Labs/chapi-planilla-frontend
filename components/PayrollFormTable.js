import React, { Component } from "react";
import Link from "next/link";
import { Query, Mutation } from "react-apollo";
import { MDBDataTable } from "mdbreact";
import Editable from "react-x-editable";

import PayrollCell from "./PayrollCell";
import { UPDATE_EMPLOYEE_MUTATION } from "./graphql/mutations";
import { LIST_EMPLOYEE } from "./graphql/queries";

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};
const data = {
  columns: [
    {
      label: "Colaborador",
      field: "employee",
      sort: "asc",
      width: 150,
      disabled: false
    },
    {
      label: "Colaborador",
      field: "employee2",
      sort: "asc",
      width: 150,
      disabled: false
    }
  ],
  rows: [
    {
      employee: <PayrollCell name="Pablo" salary="2" />,
      employe2: <PayrollCell name="Pablo" salary="2" />
    }
  ]
};
class PayrollFormTable extends Component {
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
              <h4 className="mt-0 header-title">Listado de Colaboradores</h4>
              <MDBDataTable bordered hover data={data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PayrollFormTable;
