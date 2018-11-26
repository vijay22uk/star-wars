import React, { Component } from 'react';
import './login.css';
import { Redirect } from "react-router-dom";
import ApiCaller from '../../Utils/api.caller';
import { Loader} from '../Common/loader'
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birth_year: ''
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleClick = async (event) => {
        const { charactername, birth_year } = this.state;
        event.preventDefault();
        this.setState({
            callingApi: true
        });
        var response = await ApiCaller.apiRequest({
            url: `https://swapi.co/api/people/?search=${charactername}`,
            method: 'get'
        }).catch((error) => {
            console.error("Error caught in catch", error);
            this.setState({
                message: "Something is wrong here.",
                callingApi: false
            })
        });
        if (response.status == 200) {
            const characterData = await response.json();
            if (characterData && characterData.count == 1) {
                if (characterData.results && characterData.results.length && characterData.results[0].name.toLowerCase() === charactername.toLowerCase() && characterData.results[0].birth_year === birth_year) {
                    this.props.onLogin(characterData, () => {
                        this.setState({
                            redirectToReferrer: true
                        })
                    });
                } else {
                    this.setState({
                        message: 'Unable to Login. Hint: user name OR birth_year is invalid',
                        callingApi: false
                    })
                }
            } else {
                this.setState({
                    message: 'Unable to find this character, be specific',
                    callingApi: false
                })
            }
        } else {
            this.setState({
                message: "Something is wrong here.",
                callingApi: false
            })
        }
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer, message, callingApi, birth_year, charactername } = this.state;
        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div className="container container-fluid login-conatiner">
                <div>
                    <div className="login-form">
                        <form method="post">
                            <h2 className="text-center">Log in</h2>
                            <div className="form-group">
                                <input type="text" className="form-control" onChange={this.handleChange}
                                    id="charactername" name="charactername" placeholder="character name" required="required" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" value={birth_year} onChange={this.handleChange}
                                    id="birth_year" name="birth_year" placeholder="birth year" required="required" />
                            </div>
                            <div className="form-group">
                                <button disabled={!charactername || ! birth_year} type="submit" onClick={this.handleClick} className="btn btn-primary btn-block">Log in</button>
                            </div>
                            <div className="form-group">
                                <a href="https://swapi.co/api/people/" target="_blank">People List?</a>
                            </div>
                            <div className="clearfix">
                            </div>
                        </form>
                        {callingApi && <Loader/>}
                        {message && <p className="alert alert-danger fade in">{this.state.message}</p>}
                    </div>
                </div>
                
            </div>
        );
    }
}
