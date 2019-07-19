import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Label, Table } from 'react-bootstrap';
import * as PersonaActions from '../../redux/actions/persona';
import logo from '../../../images/logo.png';
import HamburguerMenu from '../../components/HamburguerMenu/HamburguerMenu';

import './Home.css';

class Home extends Component {

  
  constructor(props) {
    super(props);      
    this.state = {
      persona: this.props.persona
    }
    this.props.getPersonaData();   
    this.getCampoValor = this.getCampoValor.bind(this); 
    this.getAddress = this.getAddress.bind(this);
    this.fnAbrirMenu = this.fnAbrirMenu.bind(this);
  }

  componentWillReceiveProps(propsOld) {
    if (this.state.persona.address != propsOld.persona.address) {
      this.setState({
        persona: propsOld.persona
      })
    }
  }

  getCampoValor(campo) {
    const {persona} = this.state;
    if (persona.personalInfo.length < 1) {
      return '';
    }
    let filtro = persona.personalInfo.filter(item => {
      return item.field == campo;
    });
    if (filtro.length < 1 ) {
      return '';
    }
    return filtro[0].valor;
  }

  getAddress() {
    const {persona} = this.state;
    return persona.address;
  }

  fnAbrirMenu() {
    this.props.history.push('/menu');
  }

  render () {
    const {persona} = this.state;

    return (
      <Grid id="gridHome">
        <HamburguerMenu fnAbrirMenu={this.fnAbrirMenu} />
        <section id="sectionBasicInfo">
          <hr className="horizontalLine"></hr>
          <Row className="text-center">
            <img className="logoHome" src={logo} alt="Logo" />
          </Row>
          <Row className="text-center">
            <p className="basicInfoHome">{ this.getAddress() }</p>
          </Row>
          <Row className="text-center">
            <p className="basicInfoHome">{ this.getCampoValor('name') }</p>
          </Row>
          <Row className="text-center">
            <p className="basicInfoHome">{ this.getCampoValor('email') }</p>
          </Row>
        </section>

        <section id="sectionValidation">
          <Row>
              <h5 id="titleValidation">Validations</h5>
              <hr className="horizontalLine"></hr>
            </Row>
          <Table striped id='tableValidation'>
            <tbody>
              {persona.personalInfo.map((item, index) =>                 
                    <tr key={index}>
                      <td className="text-center">{item.field}</td>
                      <td className="text-center">{item.valor}</td>
                      <td className="text-center">
                        <Label bsStyle={ item.statusValidationCode == "0" ? 'success' : 'danger'}>
                          {item.statusValidationDescription}
                        </Label>
                      </td>
                    </tr>
                )
              }          
            </tbody>
          </Table>
        </section>
      </Grid>
    );
  }

}

const mapStateToProps = state => ({ 
  persona: state.persona
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
