
import Editable from "react-x-editable";
import { Component } from "react";
import CellEmployee from './CellEmployee';
import CellInput from './CellInput';

function round(number) {
  return Math.round(number * 100) / 100;
}

class PayrollRow extends Component {

  render() {
    const { type } = this.props;
    let html = null;
    if (type === "Employee") {
      const name = `${this.props.first_name} ${this.props.last_name}`;
      const salary = this.props.base_salary;
      const frequency_name = this.props.payroll.name;
      const frequency = this.props.payroll.frequency;
      let salaryRate = salary;
      if (frequency === "MONTHLY") {
        salaryRate = (salary * 12) / 52 / 48;
      } else if (frequency === "WEEKLY") {
        salaryRate = (salary * 12 * 4) / 52 / 48;
      } else if (frequency === "BI_WEEKLY") {
        salaryRate = (salary * 12 * 2) / 52 / 48;
      }
      const legal_id = this.props.legal_id;
      html = 
      <CellEmployee
        name={name}
        legal_id={legal_id}
        salary={salary}
        salary_rate={round(salaryRate)}
        frequency={frequency_name}
      />;
    }
    if (type === "OvertimeInput") {
      html = (
        <CellInput
          fields={this.props.fields}
          handleInputChange={this.props.handleInputChange}
        />
      );
    }
    return html;
  }
}

export default PayrollRow;
