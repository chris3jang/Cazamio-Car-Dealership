import React, { Component } from 'react';
import './App.css';
import RotateIcon from './images/Icons/rotate.svg';

const images = require.context('./images', true);

const imageAngles = [
  'frontview.jpg',
  'angularfront.jpg',
  'sideview.jpg',
  'angularrear.jpg',
  'rearview.jpg',
]

const resolveIndex = (req, appState) => {
  const { make, model, year, angle } = appState;
  return req('./' + make + '/' + model + '/' + year + '/' + imageAngles[angle]);
}

const initialMake = "Toyota";
const initialModelOptions = {
  "Toyota": ["Camry", "2019"],
  "Honda": ["Accord", "2019"],
  "Ford": ["F150", "2019"],
  "Chevrolet": ["Silverado 1500", "2019"],
  "Mercedes-Benz": ["C-Class", "2018"],
};
const initialYearOptions = {
  "Camry": "2019",
  "Prius": "2018",
  "Accord": "2019",
  "Civic": "2019",
  "CRV": "2019",
  "Odyssey": "2019",
  "F150": "2019",
  "Escape": "2019",
  "Mustang": "2017",
  "Silverado 1500": "2019",
  "Camaro": "2019",
  "C-Class": "2018",
  "GLC-Class": "2018",
}

class App extends Component {

  state = {
    make: initialMake,
    model: initialModelOptions[initialMake][0],
    year: initialModelOptions[initialMake][1],
    angle: 1
  }

  getImgSrc(data) {
    return resolveIndex(images, this.state);
  }


  handleRotateClick(e) {
    if(e.target.id === 'counter' && this.state.angle > 0) {
      this.setState({angle: this.state.angle - 1})
    }
    if(e.target.id === 'clockwise' && this.state.angle < 4) {
      this.setState({angle: this.state.angle + 1})
    }
  }

  handleMenuClick(e) {
    switch(e.target.parentElement.parentElement.id) {
      case "make":
        this.setState({
          make: e.target.innerText,
          model: initialModelOptions[e.target.innerText][0],
          year: initialModelOptions[e.target.innerText][1],
        });
        break;
      case "model":
        this.setState({
          model: e.target.innerText,
          year: initialYearOptions[e.target.innerText]
        });
        break;
      case "year":
        this.setState({year: e.target.innerText});
        break;
      default:
    }
  }

  render() {

    const queries = {
      "makes": ["Toyota", "Honda", "Ford", "Chevrolet", "Mercedes-Benz"],
      "Toyota": ["Camry", "Prius"],
      "Honda": ["Accord", "Civic", "CRV", "Odyssey"],
      "Ford": ["F150", "Escape", "Mustang"],
      "Chevrolet": ["Silverado 1500", "Camaro"],
      "Mercedes-Benz": ["C-Class", "GLC-Class"],
      "Camry": ["2019", "2017", "2014"],
      "Prius": ["2018", "2015", "2011"],
      "Accord": ["2019", "2017", "2016"],
      "Civic": ["2019", "2017", "2016", "2015"],
      "CRV": ["2019", "2016", "2014"],
      "Odyssey": ["2019", "2017", "2014", "2013"],
      "F150": ["2019", "2017", "2016"],
      "Escape": ["2019", "2016", "2012"],
      "Mustang": ["2017", "2014", "2010"],
      "Silverado 1500": ["2019", "2018", "2017"],
      "Camaro": ["2019", "2018"],
      "C-Class": ["2018", "2017", "2015"],
      "GLC-Class": ["2018", "2017", "2015"],
    }

    const prices = {
      "ToyotaCamry2019": "$29,473",
      "ToyotaCamry2017": "$18,808",
      "ToyotaCamry2014": "$14,631",
      "ToyotaPrius2018": "$27,020",
      "ToyotaPrius2015": "$15,622",
      "ToyotaPrius2011": "$9,012",
      "HondaCRV2019": "$29,250",
      "HondaCRV2016": "$21,668",
      "HondaCRV2014": "$15,912",
      "HondaOdyssey2019": "$77,260",
      "HondaOdyssey2017": "$28,130",
      "HondaOdyssey2014": "$19,638",
      "HondaOdyssey2013": "$17,001",
      "HondaAccord2019": "$29,835",
      "HondaAccord2017": "$21,501",
      "HondaAccord2016": "$19,879",
      "HondaCivic2019": "$27,575",
      "HondaCivic2017": "$19,853",
      "HondaCivic2016": "17,337",
      "HondaCivic2015": "$15,417",
      "FordF1502019": "$49,358",
      "FordF1502017": "$42,088",
      "FordF1502016": "$35,813",
      "FordEscape2019": "$29,113",
      "FordEscape2016": "$17,049",
      "FordEscape2012": "$8,894",
      "FordMustang2017": "$34,255",
      "FordMustang2014": "$27,857",
      "FordMustang2010": "$9,252",
      "ChevroletSilverado 15002019": "$44,400",
      "ChevroletSilverado 15002018": "$41,950",
      "ChevroletSilverado 15002017": "$32,155",
      "ChevroletCamaro2019": "$46,702",
      "ChevroletCamaro2018": "46,500",
      "Mercedes-BenzGLC-Class2018": "$60,400",
      "Mercedes-BenzGLC-Class2017": "$39,583",
      "Mercedes-BenzGLC-Class2015": "$25,449",
      "Mercedes-BenzC-Class2019": "$62,600",
      "Mercedes-BenzC-Class2018": "$60,875",
      "Mercedes-BenzC-Class2017": "$48,326",
      "Mercedes-BenzC-Class2015": "$32,878",
    }
    
    const renderListItems = (key, type) => {
      const items = [], isSelected = this.state[type];
      for(let i = 0; i < queries[key].length; i++) {
        items.push(<li className={isSelected === queries[key][i] ? "selectedItem" : ""}>
          <a onClick={this.handleMenuClick.bind(this)}>{queries[key][i]}</a>
        </li>)
      }
      return items;
    }

    return (
      <div id="App" className="App">
        <div className="header">
          <nav>
            <ul>
              <li className="menu-parent" tab-index="0">
                <a onClick={this.handleMenuClick.bind(this)}>Make</a>
                <ul id="make" className="menu">
                  {renderListItems("makes", "make")}
                </ul>
              </li>
              <li className="menu-parent" tab-index="0">
                <a onClick={this.handleMenuClick.bind(this)}>Model</a>
                <ul id="model" className="menu">
                  {renderListItems(this.state.make, "model")}
                 </ul>
              </li>
              <li className="menu-parent" tab-index="0">
                <a onClick={this.handleMenuClick.bind(this)}>Year</a>
                <ul id="year" className="menu">
                  {renderListItems(this.state.model, "year")}
                </ul></li>
            </ul>
          </nav>
        </div>
        <div className="body">
          <div className="body-side">
            <input id="counter" className="rotate-left"type="image" src={RotateIcon} onClick={this.handleRotateClick.bind(this)}></input>
          </div>
          <img className="displayed" src={this.getImgSrc()} alt=""/>
          <div className="body-side">
            <input id="clockwise" className="rotate-right"type="image" src={RotateIcon} onClick={this.handleRotateClick.bind(this)} alt=""></input>
          </div>
        </div>
        <div className="bottom">
          <h2>{this.state.year + ' ' + this.state.make + ' ' + this.state.model}</h2>
          <h2>{prices[this.state.make + this.state.model + this.state.year]}</h2>
        </div>
      </div>
    );
  }
}

export default App;