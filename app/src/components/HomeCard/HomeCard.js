import React, { Component } from 'react';
import {Label} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uniqueId from 'react-html-id';

import * as PersonaActions from '../../redux/actions/persona';

import './HomeCard.css';

class HomeCard extends Component{

    constructor ( props ){
        super( props );
        
        this.state = {
            list: []
        };
        
        uniqueId.enableUniqueIds(this);
        this.showDetails = this.showDetails.bind(this);
        // this.onLoad.bind(this);
        // this.parseData.bind(this);

    }

    componentDidMount() {
        if (this.props.persona.numberOfFields < 1) {
          this.props.getPersonaData(); 
        }
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
        this.setState ({
            list: this.parseData(data)
        });
    }

    parseData ( data ){
        return data.map ( (item, index) => {
            return {...item, details: false, id: this.nextUniqueId()};
        });
    }

    showDetails ( person ) {
        const updated = {...person, details: !person.details };
        const list = this.state.list.map(item => (item.id === person.id)? updated : item );
        this.setState({
            list: list 
        });
    }

    render() {
        return(
            <section>
            {
                this.state.list.map((person) => (

                    <div key={person.id} onClick={this.showDetails(person)} className={ 'card card-history'}>
        
                        <header className='card-header'>
                            <div className='box-info'>
                                <div >
                                    <h4 className='title' > { person.valor } </h4>
                                </div>
                            </div>
                        </header>
    
                        <section className={`row col-md-12 card-history-detail ${(person.details) ? 'show': 'hide'}`}>
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
