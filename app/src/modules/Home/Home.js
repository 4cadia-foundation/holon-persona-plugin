import React, { Component } from 'react';
import { Row, Glyphicon} from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import logo from '../../../images/icon-19.png';
import user from '../../../images/boy.png'
import Loader from '../../components/Loader/Loader';
import HamburguerMenu from '../../components/HamburguerMenu/HamburguerMenu';
import './Home.css';
import HomeCard from '../../components/HomeCard/HomeCard';

class Home extends Component {
  
  constructor(props, context) {
    super(props, context);      
    this.state = {
      persona: this.props.persona,
      isLoading: true,
      validationResults: [],
      msg: "Loading profile from Blockchain",
      open: false
    }
    this.getCampoValor = this.getCampoValor.bind(this); 
  }

  componentDidMount() {
    if (this.props.persona.numberOfFields < 1) {
      this.props.getPersonaData(); 
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.persona.error.length>2) {
        const msg = 'Erro: ' + nextProps.persona.error;
        console.error('Home/getDerivedStateFromProps: ', msg);
        alert(msg);
        return { isLoading: false };
    }
    if (nextProps.persona.readAllPersonaLogs) {
        return { isLoading : false, persona: nextProps.persona };
    }
    return null;
  }

  getCampoValor(campo) {
    const {persona} = this.state;
    if (persona.personalInfo.length < 1) {
      return '';
    }
    let filtro = persona.personalInfo.filter(item => {
      return item.field == campo;
    });
    if (!filtro[0]) {
      return '';
    }
    return filtro[0].valor;
  }

  render () {

    return (
      <div>
        <div className={this.props.location.pathname === '/home' ? 'fund-orange': ''}>   </div>
          <HamburguerMenu />
          <img className="logoHome" src={logo} alt="Logo" />
        <div>
          <div className="card-fund">
            <div className="card-text text-center">
              <img className="logoHome margin-bottom-10" src={user} alt="Logo" />
              <Row className="text-center">
                <p className="paragraph basicInfoHome">{ this.props.persona.address }</p>
              </Row>
              <Row className="text-center">
                <p className="paragraph basicInfoHome">{ this.getCampoValor('name') }</p>
              </Row>
              <Row className="text-center">
                <p className="paragraph basicInfoHome">{ this.getCampoValor('email') }</p>
              </Row>
          </div>
        </div>
      </div>
        <div className="validations-title">
          <p className="title">Information</p>
          <Glyphicon glyph="plus" />
        </div>
        <hr className="linha-home"></hr>
        <div>
          <HomeCard />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  persona: state.persona
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);