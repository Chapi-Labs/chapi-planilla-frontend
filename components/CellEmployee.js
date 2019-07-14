import { Label } from "reactstrap";
import Editable from "react-x-editable";
import { Component } from "react";

import { round } from "../lib/withData";
class CellEmployee extends Component {
  handleSubmit = input => {
    if (input.hasOwnProperty("props")) {
      input.props.updateFunction({
        value: input.newValue,
        id: input.props.id,
        employee: input.props.employee
      });
    }
  };
  render() {
    const { id, name, legal_id, salary, frequency, salary_rate, effective_hours = 173.333 } = this.props;
    return (
      <div>
        <Label>Nombre</Label>
        <div className="personal-data">
          <p>{name}</p>
          <span>{legal_id}</span>
        </div>
        <Label>Salario Base</Label>
        <div className="personal-data">
          <p>
            {salary} {frequency}
          </p>
          <span>{round(salary_rate)} por hora</span>
        </div>
        <Label>Salario Efectivo</Label>
        <div className="personal-data">
          <Editable
            dataType="text"
            mode="inline"
            value={effective_hours}
            id={id}
            handleSubmit={this.handleSubmit}
            updateFunction={this.props.handleInputChange}
            placeholder="Ingresar Horas Trabajadas"
            bsBtnType="primary"
            bsBtnClassNames="m-r-5"
            emptyValueText={0.0}
          />
          <span>Horas Efectivas</span>
          <p>
            {round(effective_hours * salary_rate)} {frequency}
          </p>
          <span>{round(salary_rate)} por hora</span>
        </div>
      </div>
    );
  }
};

export default CellEmployee;
