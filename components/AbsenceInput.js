
import Editable from "react-x-editable";
import { Component } from "react";
import { Label } from "reactstrap";

class AbsenceInput extends Component {


  handleSubmit = (input) => {
    if (input.hasOwnProperty("props")) {
      input.props.updateFunction({
        value: input.newValue,
        id: input.props.id,
      });
    }
  }


  render() {
    const { field, employee } = this.props;
    return (
      <div>
          <Label>{field.name}</Label>
          <Editable
            dataType="text"
            mode="inline"
            id={employee.id}
            value={field.value}
            handleSubmit={this.handleSubmit}
            updateFunction={this.props.handleInputChange}
            placeholder="Ingresar Valor"
            bsBtnType="primary"
            bsBtnClassNames="m-r-5"
            emptyValueText={0.0}
          />
      </div>
    );
  }
}

export default AbsenceInput;
