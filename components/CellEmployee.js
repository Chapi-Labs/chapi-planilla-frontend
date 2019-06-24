import { Label } from "reactstrap";

const CellEmployee = props => (
  <div>
    <Label>Nombre</Label>
    <div className="personal-data">
      <p>{props.name}</p>
      <span>{props.legal_id}</span>
    </div>
    <Label>Salario Base</Label>
    <div className="personal-data">
      <p>
        {props.salary} {props.frequency}
      </p>
      <span>{props.salary_rate} por hora</span>
    </div>
  </div>
);

export default CellEmployee;
