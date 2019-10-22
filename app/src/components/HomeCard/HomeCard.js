import React, { Component } from 'react';
import {Label} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import './HomeCard.css';

class HomeCard extends Component{

    constructor ( props ){
        super( props );

        this.state = {
            list: []
        };
    }

    componentDidMount() {
        if (this.props.persona.numberOfFields < 1) {
          this.props.getPersonaData(); 
        }
        debugger;
        this.onLoad(this.props.persona.personalInfo);
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

    onLoad ( data ) {
        debugger;
        this.setState ({
            list: this.parseData(data)
        });
    }

    parseData ( data ) {
        debugger;
        return data.map ( (item, index) => {
            debugger;
            return {...item, details: false };
        });
    }

    render() {
        const { list } = this.state;
        debugger;
        return(
            <section>
            {
                list.map((person, index) => (

                    <div key={index} className={ 'card card-history'}>
        
                        <header className='card-header'>
                            <div className='box-info'>
                                <div >
                                    <h4 className='title' > { person.valor } </h4>
                                </div>
                            </div>
                        </header>
    
                        <section className={'row col-md-12 card-history-detail'}>
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
                    </div>
                ))
            }
            </section>
        )
    }
}

const mapStateToProps = state => ({ 
    persona: state.persona
});
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
