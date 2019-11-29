import React from "react";
import logo from "./logo.svg";
import "./App.css";

class InnerBorder extends React.Component {
  constructor(props) {
    super(props);

    this.ref = props.forwardedRef || React.createRef();
  }

  componentDidMount() {
    console.log(
      "InnerBorder",
      "componentDidUpdate",
      this.props.forwardedRef.current.getBoundingClientRect()
    );
  }

  render() {
    const { forwardedRef, ...rest } = this.props;

    return (
      <div
        ref={forwardedRef}
        {...rest}
        style={{ width: "80%", border: "1px solid red" }}
      />
    );
  }
}

const EnhancedInnerBorder = React.forwardRef((props, ref) => (
  <InnerBorder {...props} forwardedRef={ref} />
));

class Wrapper extends React.Component {
  render() {
    const { forwardedRef, ...rest } = this.props;

    return <EnhancedInnerBorder ref={forwardedRef} {...rest} />;
  }
}

const EnhancedWrapper = React.forwardRef((props, ref) => (
  <Wrapper {...props} forwardedRef={ref} />
));

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    console.log("Home", "componentDidMount", this.wrapperRef.current);
  }

  render() {
    return (
      <React.Fragment>
        <EnhancedWrapper ref={this.wrapperRef}>Bla</EnhancedWrapper>
      </React.Fragment>
    );
  }
}

const Group = ({ children }) => {
  return <div style={{ width: "100%" }}>{children}</div>;
};

const Label = ({ children }) => {
  return <label>{children}</label>;
};

const EnhancedGroup = React.forwardRef((props, ref) => (
  <Group {...props} forwardedRef={ref} />
));

const EnhancedLabel = React.forwardRef((props, ref) => (
  <Label {...props} forwardedRef={ref} />
));

class MyInput extends React.Component {
  componentDidMount() {
    ///   this.props.ref.current.style.cssText = "border: 1px solid red;";
    console.log(this.props);
  }

  render() {
    return this.props.type === "text" ? <input /> : <textarea />;
  }
}

class Form extends React.Component {
  componentDidMount() {
    ///   this.props.ref.current.style.cssText = "border: 1px solid red;";
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <EnhancedGroup>
          <EnhancedLabel>
            First name
            <MyInput type="text" />
          </EnhancedLabel>
        </EnhancedGroup>
        <EnhancedGroup>
          <EnhancedLabel>
            Last name
            <MyInput type="text" />
          </EnhancedLabel>
        </EnhancedGroup>
        <EnhancedGroup>
          <EnhancedLabel>
            Some words about yourself
            <MyInput type="textarea" />
          </EnhancedLabel>
        </EnhancedGroup>
      </div>
    );
  }
}

const EnhancedForm = React.forwardRef((props, ref) => (
  <Form forwardedRef={ref} {...props} />
));

function App() {
  const parent = React.createRef();
  return <EnhancedForm ref={parent} />;
}

export default App;
