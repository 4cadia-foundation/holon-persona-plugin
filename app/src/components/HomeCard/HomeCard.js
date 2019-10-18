import React, { Component } from 'react';
import {Label} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import './HomeCard.css'
class HomeCard extends Component{

    constructor ( props ){
        super( props );

        this.state = {
            persona: this.props.persona,
            enableDetail: false
        };

        this.parseStatus.bind(this);
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

    showDetail () {
        const enableDetail = this.state.enableDetail;
        this.setState({
            enableDetail:  !enableDetail
        });
    }

    parseStatus ( status ) {
        let label = '';
        switch (status) {
            case 0:
                label = 'Validate';
            break;
            case 1:
                label = 'Not Validate';
            break;
            case 2:
                label = 'Can Not Validate';
            break;
        }
        return label;
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

    getValidationDescClass(statusValidation) {
        if (statusValidation == "0") {
          return "success"
        } else if (statusValidation == "4") {
          return "warning"
        } else {
          return "danger"
        }
    }

    render() {
        const {persona} = this.state;

        return(
            <div> 
                {persona.personalInfo.map((item, index) => {
                    let person = {...item, enable: false};
                return ( <section key={index} className={ 'card card-history'} >
            
                    <header className='card-header' onClick={ () => {
                        debugger; 
                        person.enable = !person.enable}  }>

                    <div className='box-info'>
                        <div >
                            <h4 className='title' > { person.valor } </h4>
                        </div>
                    </div>
                    </header>

                <section className={'row col-md-12 card-history-detail' + (person.enable) ? 'show' : 'hide'}>

                    <div className='row'>
                            <div >
                                <div className='col-md-4'>
                                <p> <span className="paragraph">Field: </span>{person.valor}</p>
                                </div>
                                <div className='col-md-4'>
                                    <p> <span className="paragraph">Status: </span> 
                                    <Label bsStyle={ this.getValidationDescClass(person.statusValidationCode) }>
                                    {person.statusValidationDescription}
                                    </Label></p>
                                </div>
                            </div>                        
                    </div>
                </section>
                </section>
                )})}
            </div>

        )
    }
}

const mapStateToProps = state => ({ 
    persona: state.persona
});
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
