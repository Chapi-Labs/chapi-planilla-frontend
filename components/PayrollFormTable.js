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
      label: "Tiempo Extra (horas)",
      field: "over_time",
      type: "OvertimeInput",
      sort: "asc",
      width: 150,
      disabled: false
    },
    {
      label: "Tiempo Extra ($)",
      field: "over_time_calculated",
      type: "OverTimeCalculated",
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
    overtimeFields: [],
  };

  handleInputChange = ({ value, id, employee}) => {
    const newFields = this.state.overtimeFields.map((user) => {
      let fields = user.fields;
      if (user.user_id === employee.id) {
        fields = fields.map(f => {
          if (f.id === id) {
            f.value = parseFloat(value);
          }
          return f;
        });
      }
      user.fields = fields;
      return user;
    });
    this.setState(previousState => ({
      ...previousState,
      overtimeFields: newFields,
    }));

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
      const overtimeFields = data.findEmployee.map((e) => {
        return { user_id: e.id, fields: [...fields.payrollTypes] }
      });
    
      this.setState({
        overtimeFields: overtimeFields,
      });
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
    const { overtimeFields } = this.state;
    for (const row of employees) {
      let newRow = {};
      for (const key in data.columns) {
        const column = data.columns[key];
        console.log(row, column);
        const overtimeUserFields = overtimeFields.find(e => e.user_id === row.id);
        if (overtimeUserFields != null) {
          newRow = {
            ...newRow,
            [column.field]: (
              <PayrollRow
                employee={row}
                type={column.type}
                fields={overtimeUserFields.fields}
                handleInputChange={this.handleInputChange}
              />
            )
          };
        }
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
