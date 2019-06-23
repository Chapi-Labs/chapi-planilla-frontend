
import Editable from "react-x-editable";
import { Component } from "react";
import { Label } from "reactstrap";

class CellInput extends Component {


  handleSubmit = (input) => {
    if (input.hasOwnProperty("props")) {
      input.props.updateFunction({
        value: input.newValue,
        id: input.props.id,
        employee: input.props.employee
      });
    }
  }

  buildInputField = (field, employee, calculated) => {
    let current_value = field.value;
    if (calculated) {
      if (field.operator === "*") {
        current_value = field.value * field.operational_value * employee.hourly_rate;
        current_value = Math.round(current_value * 100) / 100;
      }
      
    }
    return (
      <div key={field.id}>
        <Label>{field.name}</Label>
        <Editable
          dataType="text"
          mode="inline"
          value={current_value}
          id={field.id}
          employee={employee}
          column={field.category}
          handleSubmit={this.handleSubmit}
          updateFunction={this.props.handleInputChange}
          placeholder="Ingresar Valor"
          bsBtnType="primary"
          bsBtnClassNames="m-r-5"
          emptyValueText={0.0}
        />
      </div>
    );
  };

  render() {
    const { fields, employee, calculated } = this.props;
    return (
      <div>
        {fields.map(f => this.buildInputField(f, employee, calculated))}
      </div>
    );
  }
}

export default CellInput;
