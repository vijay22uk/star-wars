import React, { Component } from 'react';
import { Planet } from '../index';
import ApiCaller from '../../Utils/api.caller';
import { Loader } from '../Common/loader';
export class PlanetDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planetDetails: null
        }
    }
    componentDidMount() {
        this.fetchPlanetdetails(this.props.match.params.id);
    }
    fetchPlanetdetails = async(id)=> {
        var response = await ApiCaller.apiRequest({
            url: `https://swapi.co/api/planets/${id}`,
            method: 'get'
        }).catch((error) => {
            console.error("Error caught in catch", error);
            this.setState({
                message: "Something is wrong here."
            })
        });
        if (response.status == 200) {
            const planetData = await response.json();
            if (planetData) {
                this.setState({
                    planetDetails: planetData
                })
            } else {
                this.setState({
                    message: 'Unable to find planets'
                })
            }
        } else {
            this.setState({
                message: "Something is wrong here."
            })
        }
    }

    render() {
        const { planetDetails, message } = this.state;
        let planetRenderData = <Loader/>;
        if (planetDetails) {
            planetRenderData = (<div>
                <Planet {...planetDetails} noExtra={true} />
            </div>)
        }
        return (
            <div className='container-fuild'>
                {planetRenderData}
                {message}
            </div>
        )
    }
}