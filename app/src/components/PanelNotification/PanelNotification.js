import React, { Component } from 'react';
import { Row, Grid, Panel, Button, Modal } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as PersonaActions from "../../redux/actions/persona";

import './PanelNotification.css';

class PanelNotification extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.openModal = this.openModal.bind(this);
        this.state = {
            nameReceiver: this.props.nameReceiver,
            addressReceiver: this.props.addressReceiver,
            fieldName: this.props.fieldName,
            isRunning: true,
            sentToAction: false
        }
    }

    componentDidMount() {
        // if (this.props.persona.numberOfFields > 0){
        //     this.setState({
        //         isLoading:false
        //     })
        // } else {
        //     this.props.getPersonaData();
        // }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.persona.error.length > 2) {
            const msg = 'Erro: ' + nextProps.persona.error;
            console.error('PanelNotification/getDerivedStateFromProps: ', msg);
            alert(msg);
            return { balance: 0, address: null };
        }
        return { isRunning: nextProps.persona.isRunning };
    }

    openModal() {
        this.setState({
            // modal: true
        })
    }

    handleClick(event) {
        event.preventDefault();
        // this.openModal();
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Panel id="panel-notification">
                        <div className="box">
                            <div className="inner-content-text">
                                <Panel.Title className="paragraph p-consumername">{this.props.nameReceiver}</Panel.Title>
                                <Panel.Title className="paragraph p-consumername">{this.props.addressReceiver}</Panel.Title>
                                <Panel.Title className="paragraph p-panel">{this.props.fieldName}</Panel.Title>
                            </div>

                            <div className="inner-content-button">
                                <Button className="paragraph" bsStyle="warning" bsSize="small" onClick={this.handleClick}>Allow</Button>
                                <Button className="paragraph" bsStyle="warning" bsSize="small" onClick={this.handleClick}>Decline</Button>
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

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PanelNotification);