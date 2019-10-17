import React, { Component } from 'react';
import {Label} from 'react-bootstrap';
import { FaRegListAlt } from "react-icons/fa";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PersonaActions from '../../redux/actions/persona';

import PropTypes from 'prop-types';
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
        //console.log('getValidationDescClass', statusValidation)
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
        const enableDetail = this.state.enableDetail;
        const { status, field } = this.props.personData;
        const { toggle, emitClick } = this.props;

        return(
        <section className={ `card card-history col-sm-12 `}   onClick={ toggle? this.showDetail.bind( this ) : emitClick.bind( this ) }>

            <header className='card-header'>

                <FaRegListAlt className={'margin-left-10 hidden-xs'} size={32} />

                <div className='box-info'>
                {persona.personalInfo.map((item, index) => 
                    <div key={index}>
                        <h4 className='title' >{ item.valor }</h4>
                    </div>
                    )
                }
                </div>
            </header>

            <section className={`row col-md-12 card-history-detail ${ enableDetail ? 'show' : 'hide'}`}>

             <div className='row'>
                  {persona.personalInfo.map((item, index) => 
                    <div key={index}>
                        <div className='col-md-4'>
                          <p> <span>Field: </span>{item.valor}</p>
                        </div>
                        <div className='col-md-4'>
                            <p> <span>Status: </span> 
                            <Label bsStyle={ this.getValidationDescClass(item.statusValidationCode) }>
                              {item.statusValidationDescription}
                            </Label></p>
                        </div>
                    </div>                
                    )
                }          
            </div>
            </section>
        </section>
        )
    }
}

HomeCard.defaultProps = {
    toggle: true,
    personData: {
        status: 'Not defined',
        field: 'Not defined',
    }
};

HomeCard.propTypes = {
    toggle: PropTypes.bool,
    personData: PropTypes.shape({
            status: PropTypes.string,
            field: PropTypes.string,
        }),
    emitClick: PropTypes.func
};

const mapStateToProps = state => ({ 
    persona: state.persona
});
  
const mapDispatchToProps = dispatch => bindActionCreators(PersonaActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeCard);
