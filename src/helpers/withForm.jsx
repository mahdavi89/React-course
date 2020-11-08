import React from "react";

export default function withForm(validate) {
  return function (Component) {
    return class extends React.Component {
      state = {};

      constructor(props) {
        super();
        const { initials = {} } = props;

        const fields = Object.keys(initials).reduce((res, name) => {
          return {
            ...res,
            [name]: {
              name,
              value: initials[name],
              error: validate(name, initials[name], this.state),
              onChange: this.handleChange
            }
          };
        }, {});

        this.setState({ ...fields });
      }

      handleChange = e => {
        const { name, value, checked, type = "text", files = [] } = e.target;
        const val =
          type === "checkbox" ? checked : type === "file" ? files : value;

        const error = validate(name, val, this.state);
        this.setState(state => ({
          ...state,
          [name]: {
            ...state[name],
            value: val,
            error
          }
        }));
      };

      hasError = () => Object.keys(this.state).some(f => this.state[f].error);

      handleSubmit = e => {
        e.preventDefault();
        const data = Object.keys(this.props.initials).reduce((res, prop) => {
          return {
            ...res,
            [prop]: this.state[prop].value
          };
        }, {});

        this.props.onSubmit(data);
      };

      render() {
        return (
          <Component
            {...this.props}
            fields={this.state}
            hasError={this.hasError}
            onSubmit={this.handleSubmit}
          />
        );
      }

      displayName = `withForm(${
        Component.displayName || Component.name || "Component"
      })`;
    };
  };
}
