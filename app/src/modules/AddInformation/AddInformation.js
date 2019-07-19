import React, { Component } from 'react'
import logo from '../../../images/icon-38.png';
import { Button, Form, FormControl } from 'react-bootstrap';
import DataCategory from '../../components/DataCategory/DataCategory';
import styles from './AddInformation.css';
import DataSubCategory from '../../components/DataSubCategory/DataSubCategory';


class AddInformation extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.state = {
            category: "",
            subCategory: "",
            info: "",
            cost: ""
        };
    }

    handleClick() {
        console.log("Funcionou");
    }
    validateForm() {
        return this.state.info.length > 1;
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    setCategory(cat) {
        console.log("Recebi: " + cat);
        // this.setState({ category: cat });
    }
    setSubCategory(subCat) {
        this.setState({ subCategory: subCat });
    }
    render() {

        return (
            <div>
                <div>
                    <img className="logoHome" src={logo} alt="Logo" />
                </div>
                <hr />
                <Form>
                    <div>
                        <h2 align="center" >Add Information</h2>
                    </div>
                    <br />
                    <div>
                        <DataCategory emitCategory={this.setCategory} />
                    </div>
                    <br />
                    <div>
                        <DataSubCategory />
                    </div>
                    <br />
                    <label>Insert your info here</label>
                    <FormControl
                        id="info"
                        type="text"
                        value={this.state.info}
                        placeholder="Information"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label>How much do you want to get for this information?</label>
                    <FormControl
                        id="cost"
                        type="text"
                        value={this.state.cost}
                        placeholder="Value in wei"
                        onChange={this.handleChange}
                    />
                    <br />
                    <Button disabled={!this.validateForm()} className="btn btn-block btn-warning" type="submit" onClick={this.handleClick}>
                        Save
                </Button>

                </Form>

            </div>
        );
    }

}
export default AddInformation;

// export default connect(state => (
//     { 
//       activeDocument: state.validations.activeDocument, 
//       publicKey: state.validations.publicKey 
//     }
//   ))(Home);
