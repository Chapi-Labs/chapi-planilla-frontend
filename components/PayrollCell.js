import { FormGroup, Label, Input, Row, Col } from "reactstrap";
import Editable from "react-x-editable";

const EmployeeInfo = props => (
  <div>
    <FormGroup>
      <Label>Nombre</Label>
      <Editable
        dataType="text"
        mode="inline"
        value={props.name}
        bsBtnType="primary"
        bsBtnClassNames="m-r-5"
        emptyValueText={"N/A"}
      />
    </FormGroup>
    <FormGroup>
      <Label>Salario Base</Label>
      <Editable
        dataType="text"
        mode="inline"
        value={props.salary}
        bsBtnType="primary"
        bsBtnClassNames="m-r-5"
        emptyValueText={"N/A"}
      />
    </FormGroup>
  </div>
);

export default EmployeeInfo;
