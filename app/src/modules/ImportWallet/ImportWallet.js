import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PersonaActions from '../../redux/actions/persona';
import './ImportWallet.css';


class ImportWallet extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        // debugger;
        console.log('handleClick');
        this.props.getPersonaData();  
    }

    render() {
        console.log('render ', this.props.persona.personalInfo);
        return (
            <div>
                <h1 className="title">Element</h1>
                {
                    this.props.persona.personalInfo.map((item, index) => (
                        <h2 key={index}>{item.data}</h2>
                    ))
                }
                <Button bsStyle="warning" onClick={this.handleClick}></Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    persona: state.persona
});
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(ImportWallet);