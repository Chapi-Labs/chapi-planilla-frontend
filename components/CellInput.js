
import Editable from "react-x-editable";
import { Component } from "react";
import { Label } from "reactstrap";

class CellInput extends Component {


  handleSubmit = (input) => {
    console.log(input);
  }

  buildInputField = (field) => {
    return (
      <div key={field.id}>
        <Label>{field.name}</Label>
        <Editable
          dataType="text"
          mode="inline"
          value={0.0}
          id={field.id}
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
    const { fields } = this.props;
    return <div>{fields.map(f => this.buildInputField(f))}</div>;
  }
}

export default CellInput;
