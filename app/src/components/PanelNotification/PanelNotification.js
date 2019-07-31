import React, { Component } from 'react';
import { Row, Grid, Panel, Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";

import './PanelNotification.css';

class PanelNotification extends Component {
    render() {

        return(
            <Grid>
                <Row>
                    <Panel id="panel-notification">
                        <div className="box">
                            <div className="inner-content-text">
                                <Panel.Title className="paragraph p-consumername">Atlas Quantum</Panel.Title>
                                <Panel.Title className="paragraph">Email</Panel.Title>
                                <Panel.Title className="paragraph">RG</Panel.Title>
                            </div>
                                    
                            <div className="inner-content-button">
                                <Button className="paragraph" bsStyle="warning" bsSize="small">Allow</Button>
                                <Button className="paragraph" bsStyle="warning" bsSize="small">Decline</Button>
                            </div>
                        </div>                             
                    </Panel>
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = reduxState => ({
    persona: reduxState.persona
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions,dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(PanelNotification);