
import { Label } from "reactstrap";
import { Component } from "react";
import CellEmployee from './CellEmployee';
import CellInput from './CellInput';

function round(number) {
  return Math.round(number * 100) / 100;
}

class PayrollRow extends Component {

  simpleField = (label, value) => (
    <div>
      <Label>{label}</Label>
      <div className="personal-data">
        <p>{value}</p>
      </div>
    </div>
  );

  render() {
    const { type } = this.props;
    let html = null;
    if (type === "Employee") {
      const { employee } = this.props;
      if (employee != null) {
        const name = `${employee.first_name} ${employee.last_name}`;
        const salary = employee.base_salary;
        const frequency_name = employee.payroll.name;
        const frequency = employee.payroll.frequency;
        const id = employee.id;
        console.log(employee)
        const salaryRate = employee.payroll.hourly_rate;
        const legal_id = employee.legal_id;
        html = 
        <CellEmployee
          id={id}
          name={name}
          legal_id={legal_id}
          salary={salary}
          salary_rate={round(salaryRate)}
          frequency={frequency_name}
        />;
      }
    }
    if (type === "OvertimeInput") {
      html = (
        <CellInput
          calculated={false}
          employee={this.props.employee}
          fields={this.props.fields}
          handleInputChange={this.props.handleInputChange}
        />
      );
    }
    if (type === "OverTimeCalculated") {
      html = (
        <CellInput
          calculated={true}
          employee={this.props.employee}
          fields={this.props.fields}
        />
      );
    }
    if (type === "TotalOverTime") {
      html = this.simpleField("Sobre Tiempo", this.props.total_overtime);
    }
    if (type === "TotalLateTime") {
      html = this.simpleField("Ausencias y Tardanzas", this.props.absences);
    }
     if (type === "TotalSalary") {
      html = this.simpleField("Total", this.props.total_salary);
    }
     if (type === "NetSalary") {
      html = this.simpleField("Neto", this.props.net_salary);
    }
    return html;
  }
}

export default PayrollRow;
