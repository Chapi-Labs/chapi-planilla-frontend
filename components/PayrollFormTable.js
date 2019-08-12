import React, { Component } from "react";
import Link from "next/link";
import { Query, Mutation } from "react-apollo";
import { MDBDataTable } from "mdbreact";
import Editable from "react-x-editable";
import { Button } from "reactstrap";

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
      width: 50,
      disabled: false
    },
    {
      label: "Tiempo Extra (horas)",
      field: "over_time",
      type: "OvertimeInput",
      sort: "asc",
      width: 50,
      disabled: false
    },
    {
      label: "Tiempo Extra ($)",
      field: "over_time_calculated",
      type: "OverTimeCalculated",
      sort: "asc",
      width: 50,
      disabled: false
    },
    {
      label: "Total Tiempo Extra",
      field: "total_over_time",
      type: "TotalOverTime",
      sort: "asc",
      width: 50,
      disabled: false
    },
    {
      label: "Ausencias y Tardanzas",
      field: "late_time",
      type: "TotalLateTime",
      sort: "asc",
      width: 20,
      disabled: false
    },
    {
      label: "Total Salario",
      field: "total_salary",
      type: "TotalSalary",
      sort: "asc",
      width: 50,
      disabled: false
    },
    {
      label: "Seguros",
      field: "insurances",
      type: "Insurances",
      sort: "asc",
      width: 50,
      disabled: false
    },
    {
      label: "ISR",
      field: "isr_tax",
      type: "ISRTax",
      sort: "asc",
      width: 50,
      disabled: false
    },
    {
      label: "Salario Neto",
      field: "net_salary",
      type: "NetSalary",
      sort: "asc",
      width: 50,
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

  handleEffectiveHoursChange = ({ value, id}) => {
    const employees = this.state.employees.map(e => {
      if (e.id == id) {
        e.effective_hours = value;
      }
      return e;
    });
    this.setState({ employees });
  }

  handleAbsencesChange = ({ value, id }) => {
    console.log(value, id);
    const overtimeFields = this.state.overtimeFields.map(user => {
      console.log(user);
      if (user.user_id == id) {
        user.absences = parseFloat(value);
        user.total_salary = user.total_salary - user.absences;
      }
      return user;
    });
    this.setState({ overtimeFields });
  }

  handleExtraTimeInputChange = ({ value, id, employee }) => {
    const newFields = this.state.overtimeFields.map(user => {
      let fields = user.fields;
      if (user.user_id === employee.id) {
        let total = 0;
        fields = fields.map(f => {
          if (f.id === id) {
            f.value = parseFloat(value);
          }
          const calculated_value =
            f.value * f.operational_value * employee.hourly_rate;
          total += calculated_value;
          return f;
        });
        user.total_overtime = Math.round(total * 100) / 100;
        user.total_salary = employee.base_salary + user.total_overtime;
      }
      user.fields = fields;
      return user;
    });
    this.setState({ overtimeFields: newFields });
  };

  async componentWillReceiveProps(props) {
    const { query } = props;
    if (props.id != null && this.state.employees.length === 0) {
      const { data } = await query({
        query: FIND_EMPLOYEES,
        variables: {
          company_id: props.id
        }
      });
      const employees = data.findEmployee.map(e => ({
        ...e,
        effective_hours: 173.333
      }));
      this.setState({ employees });
      const { data: fields } = await query({
        query: LIST_FIELDS,
        variables: {
          category: "overtime"
        }
      });
      const overtimeFields = data.findEmployee.map(e => {
        return {
          user_id: e.id,
          fields: [...fields.payrollTypes],
          total_overtime: 0.0,
          total_salary: e.base_salary,
          net_salary: 0.0,
          absences: 0.0
        };
      });

      this.setState({
        overtimeFields: overtimeFields
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
        const overtimeUserFields = overtimeFields.find(
          e => e.user_id === row.id
        );
        console.log(row, column, overtimeFields);
        if (overtimeUserFields != null) {
          newRow = {
            ...newRow,
            [column.field]: (
              <PayrollRow
                employee={row}
                value={`${row.first_name} ${row.last_name}`}
                type={column.type}
                fields={overtimeUserFields.fields}
                absences={overtimeUserFields.absences}
                total_overtime={overtimeUserFields.total_overtime}
                total_salary={overtimeUserFields.total_salary}
                net_salary={overtimeUserFields.net_salary}
                handleInputChange={this.handleExtraTimeInputChange}
                handleEffectiveHoursChange={this.handleEffectiveHoursChange}
                handleAbsencesChange={this.handleAbsencesChange}
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
            <div class="col-sm-6 offset-md-6">
              <div class="float-right d-none d-md-block">
                <Button className="btn btn-primary waves-effect m-t-10">Guardar Cambios</Button>
              </div>
            </div>
            <div className="card-body">
              <h4 className="mt-0 header-title">
                Listado de Colaboradores
              </h4>
              <MDBDataTable
                responsive
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
