import React from 'react';
import logo from './logo.svg';
import './App.css';



class InnerBorder extends React.Component {
  constructor(props) {
      super(props);
​
      this.ref = props.forwardedRef || React.createRef();
  }
​
  componentDidUpdate() {
      console.log(
          'InnerBorder',
          'componentDidUpdate',
          this.props.forwardedRef.current.getBoundingClientRect(),
      );
  }
​
  render() {
      const { forwardedRef, ...rest } = this.props;
​
      return <div ref={forwardedRef} {...rest} style={{ border: '1px solid red' }} />;
  }
}
​
const EnhancedInnerBorder = React.forwardRef((props, ref) => (
  <InnerBorder {...props} forwardedRef={ref} />
));
​
class Wrapper extends React.Component {
  render() {
      const { forwardedRef, ...rest } = this.props;
​
      return <EnhancedInnerBorder ref={forwardedRef} {...rest} />;
  }
}
​
const EnhancedWrapper = React.forwardRef((props, ref) => <Wrapper {...props} forwardedRef={ref} />);
​
class Home extends React.Component {
  constructor(props) {
      super(props);
​
      this.wrapperRef = React.createRef();
  }
​
  componentDidUpdate() {
      console.log('Home', 'componentDidUpdate', this.wrapperRef.current);
  }
​
  render() {
      return (
          <React.Fragment>
              <EnhancedWrapper ref={this.wrapperRef}>Bla</EnhancedWrapper>
          </React.Fragment>
      );
  }
}
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
