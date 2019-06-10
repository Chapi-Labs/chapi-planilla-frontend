import React, { Component } from "react";
import Link from "next/link";
import { Query, Mutation } from "react-apollo";
import { MDBDataTable } from "mdbreact";
import Editable from "react-x-editable";

import PayrollCell from "./PayrollCell";
import { UPDATE_EMPLOYEE_MUTATION } from "./graphql/mutations";
import { FIND_EMPLOYEES } from "./graphql/queries";

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
      field: "employees",
      sort: "asc",
      width: 150,
      disabled: false
    }
  ],
  rows: [
  ]
};
class PayrollFormTable extends Component {
  state = {
    employees: []
  }

  async componentDidMount() {
    const { query } = this.props;
    const { data } = await query({
      query: FIND_EMPLOYEES,
      variables: {
        company_id: this.props.id
      }
    });
    console.log(data);
    this.setState({ employees: data.findEmployee });
    
    // find employees from company.
  }

  handleSubmit(target) {
    target.props.updateFunction({
      variables: {
        id: target.props.id,
        [target.props.column.replace(".", "_")]: target.newValue
      }
    });
  }
  transformData = employees => {
    const rows = [];
    for (const row of employees) {
      let newRow = {};
      for (const key in data.columns) {
        const column = data.columns[key];
        console.log(row, column);
        newRow = {
          ...newRow,
          [column.field]: <PayrollCell {...row} type="Employee"/>
        };
      }
      rows.push(newRow);
    }

    return { ...data, rows };
  };

  render() {
    const { employees } = this.state;
    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="mt-0 header-title">Listado de Colaboradores</h4>
              <MDBDataTable bordered hover data={this.transformData(employees)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PayrollFormTable;
