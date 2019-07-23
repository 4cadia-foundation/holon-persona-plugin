import React, { Component } from 'react';
import { Grid, Row, Col, Form, Button } from 'react-bootstrap';


import '../../styles/_utils.css';
import styles from './ValidateInformation.css'
import logo from '../../../images/icon-38.png';
import SelectInfoToValidate from '../../components/SelectInfoToValidate/SelectInfoToValidate';
import SelectValidador from '../../components/SelectValidador/SelectValidador';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

class ValidateInformation extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Grid>
                <div>
                 <img className="logoHome" src={logo} alt="Logo" />
                </div>

                <hr className="line"/>

                <Row>
                  <Col xs={12} md={12}>
                      <div className="text-center">
                          <h3>Validation</h3>
                      </div>
                  </Col>
                </Row>

                <Form className="margin-top-50">
                    <div className="space-between">
                        <div>
                            <SelectInfoToValidate personalInfo={this.props.persona.personalInfo} />
                        </div>
                        <div>
                            <SelectValidador />
                        </div>
                    </div>
                </Form>

                <Button className="margin-top-50" bsSize="large" block bsStyle="warning">Save</Button>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({ 
    persona: state.persona
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(ValidateInformation);