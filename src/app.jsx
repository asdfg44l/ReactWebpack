import { Fragment } from 'react';
// import ReactDOM from 'react-dom';
import './assets/scss/all.scss';
import Hook from './hook.jsx';
import Async from './Async.jsx';
import store from '@/store/store.js';
import { Provider } from 'react-redux';
require('../public/index.html')

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: [],
      Name: ""
    };
    this.food = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleRefChange = this.handleRefChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value
    const name = e.target.name
    let updateValue = value;
    if(name === "fruits") {
      let set = new Set(this.state.fruits)
      set.has(value) ? set.delete(value) : set.add(value)
      updateValue = Array.from(set)
    }
    this.setState({ [name]: updateValue})
  }
  handleRefChange() {
    console.log(this.food)
  }
  render() {
    return (
      <div className="">
        <form>
          <label>
            Grape:
            <input type="checkbox" name="fruits" value="Grape" onChange={this.handleChange}/>
          </label>
          <label>
            Apple:
            <input type="checkbox" name="fruits" value="Apple" onChange={this.handleChange}/>
          </label>
          <label>
            Lime:
            <input type="checkbox" name="fruits" value="Lime" onChange={this.handleChange}/>
          </label>
          <label>
            Name:
            <input type="text" name="Name" value={this.state.Name} onChange={this.handleChange}/>
          </label>
          <label>
            Food:
            <input type="text" ref={this.food} onChange={this.handleRefChange}/>
          </label>
        </form>
        <p>{this.state.fruits}</p>
        <p>{this.state.Name}</p>
      </div>
    );
  }
}

// Slot
// Component
// parents
function Layout({topbar, content, footer}) {
  const Topbar = ({children}) => (
    <div className="bg-primary text-light p-3">
      {children}
    </div>
  )
  const Content = ({children, variable}) => (
    <div className={variable}>
      {children} 
    </div>
  )
  const Footer = ({children}) => (
    <div className="footer">
      {children}
    </div>
  )
  const Layout = ({children}) => (
    <div className="layout">
      {children}
    </div>
  )
  return (
    <Layout>
      <Topbar>
        {topbar ? topbar : ( <h3 className="text-center">This is Topbar</h3> )}
      </Topbar>
      <Content variable="alert-success text-dark p-2" >
        {content ? content : ( <p>Welcome to React</p> )}
      </Content>
      <Footer>
        {footer ? footer : ( <strong>footer</strong> )}
      </Footer>
    </Layout>
  )
}
function About({content}) {
  const Topbar = (
    <div className="text-center">This is about page</div>
  )
  const Content = content || ( <p>about content</p> )
  const Footer = (
    <div className="text-warning">Here is footer</div>
  )
  return (
    <Layout 
      topbar = {Topbar}
      content = {Content}
      footer = {Footer}
    />
  )
}

function Test(props) {
  var shortid = require("shortid")
  const list = [ 
    { id: shortid.generate(), value: 1 }, 
    { id: shortid.generate(), value: 2 }, 
    { id: shortid.generate(), value: 3 } 
  ];
  return (
    list.map( ({id, value}) => (<p key={id}>{value}</p>) )
  )
}
function Sentence(props) {
  var shortid = require("shortid")
  const strArray = props.sentence.split(" ");
  return (
    strArray.map( (str, index) => {
      let slot = props["num" + (index+1).toString()];
      return slot ? slot({str, id: shortid.generate()}) : (<p key={shortid.generate()}>{str}</p>);
    })
  )
}

// 溫度計
function BoilingVerdict(props) {
  if(props.celsius >= 100) {
    return ( 
      <MessageFormat message={"水滾囉!!"}/>
    )
  }
  return <MessageFormat message={"水沒滾欸"}/>
}
const scaleNames = {
  c: '攝氏',
  f: '華氏'
}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value)
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>輸入{scaleNames[scale]}溫度: </legend>
        <input type="text" value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}
function MessageFormat(props) {
  return (
    <Fragment>
      Message: 
      <span>---{props.message}---</span>
    </Fragment>
  )
}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: "", scale: 'c' }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.tryConvert = this.tryConvert.bind(this);
  }

  toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }

  toFahrenheit(Celsius) {
    return (Celsius * 9 / 5) + 32;
  }

  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if( Number.isNaN(input) ) {
      return ''
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

  handleCelsiusChange(value) {
    this.setState({ temperature: value, scale: 'c' });
  }

  handleFahrenheitChange(value) {
    this.setState({ temperature: value, scale: 'f' });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.state.scale;
    const celsius = scale === 'f' ? this.tryConvert(temperature, this.toCelsius) : temperature;
    const Fahrenheit = scale === 'c' ? this.tryConvert(temperature, this.toFahrenheit) : temperature;
    return (
      <div className="">
        <TemperatureInput 
          temperature= {celsius}
          onTemperatureChange= { this.handleCelsiusChange }
          scale="c" 
        />
        <TemperatureInput 
          temperature={Fahrenheit}
          onTemperatureChange= { this.handleFahrenheitChange }
          scale="f" 
        />
        <BoilingVerdict celsius={celsius}/>
      </div>
    )
  }
}

const Products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
class ProductWrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      isStocked: false
    }

    this.handleUserInputChange = this.handleUserInputChange.bind(this)
    this.handleisStockedChange = this.handleisStockedChange.bind(this)
  }

  handleUserInputChange(value) {
    this.setState({ userInput: value })
  }

  handleisStockedChange(value) {
    this.setState({ isStocked: value })
  }

  render() {
    const input = this.state.userInput;
    const isStocked = this.state.isStocked;
    return (
      <Fragment>
        <ProductInput 
          userInput={input} 
          isStocked={isStocked} 
          onUserInputChange={ this.handleUserInputChange } 
          onisStockedChange={ this.handleisStockedChange }
        />
        <ProductList userInput={input} isStocked={isStocked} />
      </Fragment>
    )
  }
}
function ProductInput(props) {
  function handleChange(e) {
    const target = e.target
    const value = target.name === "isStocked" ? target.checked : target.value;
    props[`on${target.name}Change`](value);
  }
  return (
    <Fragment>
      <input name="UserInput" type="text" value={props.userInput} onChange={handleChange} />
      <input name="isStocked" type="checkbox" checked={props.isStocked} onChange={handleChange} />
    </Fragment>
  )
}
class ProductList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let List = [];
    let category = '';
    const input = this.props.userInput;

    Products.forEach( (prod, index) => {
      if( category !== prod.category ) {
        List.push( (<tr key={index.toString() + "head"}><td colSpan="2"><strong>{prod.category}</strong></td></tr>) )
        category = prod.category;
      }
      if( prod.name.toUpperCase().indexOf(input.toUpperCase()) == -1) {
        return
      }
      if( this.props.isStocked && !prod.stocked ) {
        return
      }
      List.push(
        <tr key={index.toString()} className={ !prod.stocked ? "danger" : ''}>
          <td>{prod.name}</td>
          <td>{prod.price}</td>
        </tr>
      )
    })
    return (   
      <table>
        <tbody>{List}</tbody>
      </table>
    )
  }
}
// ========================================

ReactDOM.render(
  <Provider store={store}>
    <About 
      content={
        <Hook />
      }
    >
    </About>
  </Provider>,
  document.getElementById('root')
);