import React, { Component } from 'react';
import {Button, Glyphicon} from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from "../../redux/actions/persona";

import './SaveBlockchain.css'


export class SaveBlockchain extends Component {
    
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            name: "",
            email: "",
        };
    }

    handleClick(event) {
        event.preventDefault();
        this.props.addPersona(this.state.name, this.state.email);
        this.setState({
            isLoading: true
        });
    }
    
    render() {

        return(

            <section className="container-contents" >
                <h3 className="paragraph text-center">Save in Blockchain</h3>
                <p className="paragraph text-center margin-top-20">Do you want save data in blockchain?</p>
                <div className="content-one">
                    <div className="content-in">
                        <p className="paragraph text-center">Yes, I want save in Blockchain</p>
                        <Button className="paragraph" bsStyle="warning"  onClick={ this.handleClick }>Save in Blockchain</Button>
                    </div>
                </div>

                <div className="content-one">
                    <div className="content-in">
                        <p className="paragraph text-center">No, I want save local</p>
                        <Button className="paragraph" bsStyle="warning">Save in browser</Button>
                    </div>
                </div>
                <Glyphicon glyph="chevron-left" className="margin-top-20" onClick={() => this.props.history.push('/menu')}/>
            </section>

        )
    }
}

const mapStateToProps = state => ({
    name: state.name,
    email: state.email,
    persona: state.persona,
});

const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SaveBlockchain);