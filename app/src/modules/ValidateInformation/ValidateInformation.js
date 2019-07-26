import React, { Component } from 'react';
import { Button, Col, Form, Grid, Row } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import CloseIconPage from '../../components/CloseIconPage/CloseIconPage';
import SelectPersonaInfoFields from '../../components/SelectPersonaInfoFields/SelectPersonaInfoFields';
import SelectValidador from '../../components/SelectValidador/SelectValidador';
import '../../styles/_utils.css';
import './ValidateInformation.css'

class ValidateInformation extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Grid>
                <div className="btn-validate-close">
                 <CloseIconPage destination="/menu"/>    
                </div>
                <Row>
                  <Col xs={12} md={12}>
                      <div className="margin-top-50 text-center">
                          <h3 className="title">Validation</h3>
                      </div>
                  </Col>
                </Row>
                <Form className="margin-top-50">
                    <div className="space-between">
                        <div>
                            <SelectPersonaInfoFields personalInfo={this.props.persona.personalInfo} />
                        </div>
                        <div>
                            <SelectValidador />
                        </div>
                    </div>
                </Form>

                <Button id="btn-validate-save" className="paragraph" bsSize="large" block bsStyle="warning">Save</Button>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({ 
    persona: state.persona
});
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(ValidateInformation);