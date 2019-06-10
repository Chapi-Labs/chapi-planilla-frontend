import { FormGroup, Label, Input, Row, Col } from "reactstrap";
import Editable from "react-x-editable";
import { Component } from "react";

class PayrollCell extends Component {
  buildEmployee = (name, salary, frequency) => (
    <div>
      <Label>Nombre</Label>
      <p>{name}</p>
      <Label>Salario Base</Label>
      <p>{salary}</p>
      <Label>Frecuencia</Label>
      <p>{frequency}</p>
    </div>
  );

  render() {
    const { type } = this.props;
    let html = null;
    if (type === "Employee") {
      const name = `${this.props.first_name} ${this.props.last_name}`;
      const salary = this.props.base_salary;
      const frequency = this.props.payroll_frequency.name;
      html = this.buildEmployee(name, salary, frequency);
    }
    return html;
  }
}

export default PayrollCell;
