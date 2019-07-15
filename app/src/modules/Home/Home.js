import React, { Component } from 'react'
import { Grid, Row, Label, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import logo from '../../../images/logo.png';


import './Home.css';

 class Home extends Component {

  render () {

    return (
      <Grid id="gridHome">
        <section id="sectionBasicInfo">
          <hr className="horizontalLine"></hr>
          <Row className="text-center">
            <img className="logoHome" src={logo} alt="Logo" />
          </Row>
          <Row className="text-center">
            <p className="basicInfoHome">0x1d40DA744b7C14C24C97838B0Ed19CE383a784b9</p>
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

export default Home;