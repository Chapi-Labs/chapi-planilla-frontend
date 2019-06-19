import React, { Component } from "react";
import Link from "next/link";
import { Query, Mutation } from "react-apollo";
import { MDBDataTable } from "mdbreact";
import Editable from "react-x-editable";

import PayrollRow from "./PayrollRow";
import { UPDATE_EMPLOYEE_MUTATION } from "./graphql/mutations";
import { FIND_EMPLOYEES, LIST_FIELDS } from "./graphql/queries";

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
      type: "Employee",
      sort: "asc",
      width: 150,
      disabled: false
    },
    {
      label: "Tiempo Extra",
      field: "over_time",
      type: "OvertimeInput",
      sort: "asc",
      width: 150,
      disabled: false
    }
  ],
  rows: []
};
class PayrollFormTable extends Component {
  state = {
    employees: [],
    overtimeFields: []
  };

  handleInputChange = d => {
    console.log(d);
  };

  async componentWillReceiveProps(props) {
    const { query } = props;
    if (props.id != null) {
      const { data } = await query({
        query: FIND_EMPLOYEES,
        variables: {
          company_id: props.id
        }
      });
      this.setState({ employees: data.findEmployee });
      const { data: fields } = await query({
        query: LIST_FIELDS,
        variables: {
          category: "overtime"
        }
      });
      this.setState({ overtimeFields: fields.payrollTypes });
    }
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
          [column.field]: (
            <PayrollRow
              {...row}
              type={column.type}
              fields={this.state.overtimeFields}
              handleInputChange={this.handleInputChange}
            />
          )
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
              <MDBDataTable
                bordered
                hover
                data={this.transformData(employees)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PayrollFormTable;
