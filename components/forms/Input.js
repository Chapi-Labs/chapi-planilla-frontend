import { PureComponent, Fragment } from "react";
import { Input as BSInput } from "reactstrap";
import Validate from "react-validate-form";

class Input extends PureComponent {
  // function to call both params
  handleChange = (param) => (e) => {
    const { OnSave } = this.props;
    OnSave(e);
    param(e);
  }
  render() {
    const localProps = {...this.props};
    delete localProps.OnSave;
    return (
      <Validate>
        {({ validate, errorMessages }) => (
          <Fragment>
            <BSInput
              onChange={this.handleChange(validate)}
              {...localProps}
            />
            <p>
              {errorMessages[this.props.name] === undefined
                ? ""
                : errorMessages[this.props.name][0]}
            </p>
          </Fragment>
        )}
      </Validate>
    );
  }
}

export default Input;
