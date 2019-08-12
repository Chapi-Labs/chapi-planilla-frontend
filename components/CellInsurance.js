import Editable from "react-x-editable";
import { Component, Fragment } from "react";
import { Label } from "reactstrap";
import { round } from "../lib/withData";

class CellInsurance extends Component {
  render() {
    const { social_insurance, educative_insurance } = this.props;
    return (
      <Fragment>
        <div className="personal-data">
          <Label>Seguro Social</Label>
          <p>$ {round(social_insurance)}</p>
        </div>
        <div className="personal-data">
          <Label>Seguro Educativo</Label>
          <p>$ {round(educative_insurance)}</p>
        </div>
      </Fragment>
    );
  }
}

export default CellInsurance;
