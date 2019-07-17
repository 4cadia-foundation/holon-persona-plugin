import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Label, Table } from 'react-bootstrap';
import * as PersonaActions from '../../redux/actions/persona';
import logo from '../../../images/logo.png';
import Menu from '../../components/Menu/Menu';

import './Home.css';

class Home extends Component {

  
  constructor(props) {
    super(props);      
    this.state = {
      persona: this.props.persona
    }
    this.props.getPersonaAddress();    
  }

  componentWillReceiveProps(propsOld) {
    console.log('propsOld', propsOld);
  
    if (this.state.persona.address != propsOld.persona.address) {
      this.setState({
        persona: propsOld.persona
      })
    }
  }

  render () {

    const {persona} = this.state;

    return (
      <Grid id="gridHome">
        <Menu/>
        <section id="sectionBasicInfo">
          <hr className="horizontalLine"></hr>
          <Row className="text-center">
            <img className="logoHome" src={logo} alt="Logo" />
          </Row>
          <Row className="text-center">
            <p className="basicInfoHome">{persona.address}</p>
          </Row>
          <Row className="text-center">
            <p className="basicInfoHome">Victória de Oliveira Durães</p>
          </Row>
          <Row className="text-center">
            <p className="basicInfoHome">victoria@janusproj.com</p>
          </Row>
        </section>

        <section id="sectionValidation">
          <Row>
              <h5 id="titleValidation">Validations</h5>
              <hr className="horizontalLine"></hr>
            </Row>
          <Table striped id='tableValidation'>
            <tbody>
              <tr>
                <td className="text-center">Name</td>
                <td className="text-center"><Label bsStyle="success">Approved</Label></td>
              </tr>
              <tr>
                <td className="text-center">CPF</td>
                <td className="text-center"><Label bsStyle="warning">Pending</Label></td>
              </tr>
              <tr>
                <td className="text-center">Phone</td>
                <td className="text-center"><Label bsStyle="danger">Disapproved</Label></td>
              </tr>
              <tr>
                <td className="text-center">Email</td>
                <td className="text-center"><Label bsStyle="default">Not validated</Label></td>
              </tr>
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
