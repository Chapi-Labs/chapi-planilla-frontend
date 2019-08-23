import { Label } from "reactstrap";
import { Component } from "react";
import CellEmployee from "./CellEmployee";
import CellInput from "./CellInput";
import CellAbsence from "./CellAbsence";
import CellInsurance from "./CellInsurance";
import CellTax from "./CellTax";

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
        const id = employee.id;
        const salaryRate = employee.payroll.hourly_rate;
        const legal_id = employee.legal_id;
        const effective_hours = employee.effective_hours;
        html = (
          <CellEmployee
            id={id}
            name={name}
            legal_id={legal_id}
            salary={salary}
            salary_rate={salaryRate}
            frequency={frequency_name}
            effective_hours={effective_hours}
            handleInputChange={this.props.handleEffectiveHoursChange}
          />
        );
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
      html = this.simpleField("Sobre Tiempo", `$ ${this.props.total_overtime}`);
    }
    if (type === "TotalLateTime") {
      const field = {
        name: "Ausencias y Tardanzas",
        value: this.props.absences
      };
      html = (
        <CellAbsence
          field={field}
          employee={this.props.employee}
          handleInputChange={this.props.handleAbsencesChange}
        />
      );
    }
    if (type === "TotalSalary") {
      html = this.simpleField("Total", `$ ${this.props.total_salary}`);
    }
    if (type === "Insurances") {
      html = (
        <CellInsurance
          educative_insurance={(this.props.total_salary * 1.25) / 100}
          social_insurance={(this.props.total_salary * 9.75) / 100}
        />
      );
    }
    if (type === "ISRTax") {
      const { employee } = this.props;
      html = (
        <CellTax
          base_salary={
            employee.effective_hours *
            employee.payroll.hourly_rate*10
          }
        />
      );
    }
    if (type === "NetSalary") {
      html = this.simpleField("Neto", `$ ${this.props.net_salary}`);
    }
    return html;
  }
}

export default PayrollRow;
