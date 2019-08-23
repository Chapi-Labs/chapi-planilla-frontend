import CurrencyInput from "react-currency-input";
import { Component, Fragment } from "react";
import { Label } from "reactstrap";
import { round } from "../lib/withData";

class CellTax extends Component {
  calculateMonthlyTax(base_salary) {
    const base = base_salary * 13;
    if (base < 11000) return 0.0;
    if (base >= 11000 && base < 50000) {
      const impositive = (base - 11000) * 0.15;
      return impositive/13;
    }
    if (base >= 50000) {
      const impositive = ((base - 50000) * 0.25 ) + 5850;
      return impositive/13;
    }
  }

  render() {
    const { base_salary } = this.props;
    return (
      <Fragment>
        <div className="personal-data">
          <Label>ISR</Label>
          <p style={{display: 'inline-block'}}>$ {round(this.calculateMonthlyTax(base_salary))}</p>
          
        </div>
      </Fragment>
    );
  }
}

export default CellTax;
