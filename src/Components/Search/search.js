import React, { Component } from 'react';
import './search.css';
import { Timer, Planet, Loader } from '../index';
import _ from 'lodash';
import ApiCaller from '../../Utils/api.caller';
import Store from '../../Store';

var temp = { "count": 40, "next": "https://swapi.co/api/planets/?search=a&page=2", "previous": null, "results": [{ "name": "Alderaan", "rotation_period": "24", "orbital_period": "364", "diameter": "12500", "climate": "temperate", "gravity": "1 standard", "terrain": "grasslands, mountains", "surface_water": "40", "population": "2000000000", "residents": ["https://swapi.co/api/people/5/", "https://swapi.co/api/people/68/", "https://swapi.co/api/people/81/"], "films": ["https://swapi.co/api/films/6/", "https://swapi.co/api/films/1/"], "created": "2014-12-10T11:35:48.479000Z", "edited": "2014-12-20T20:58:18.420000Z", "url": "https://swapi.co/api/planets/2/" }, { "name": "Yavin IV", "rotation_period": "24", "orbital_period": "4818", "diameter": "10200", "climate": "temperate, tropical", "gravity": "1 standard", "terrain": "jungle, rainforests", "surface_water": "8", "population": "1000", "residents": [], "films": ["https://swapi.co/api/films/1/"], "created": "2014-12-10T11:37:19.144000Z", "edited": "2014-12-20T20:58:18.421000Z", "url": "https://swapi.co/api/planets/3/" }, { "name": "Dagobah", "rotation_period": "23", "orbital_period": "341", "diameter": "8900", "climate": "murky", "gravity": "N/A", "terrain": "swamp, jungles", "surface_water": "8", "population": "unknown", "residents": [], "films": ["https://swapi.co/api/films/2/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/"], "created": "2014-12-10T11:42:22.590000Z", "edited": "2014-12-20T20:58:18.425000Z", "url": "https://swapi.co/api/planets/5/" }, { "name": "Naboo", "rotation_period": "26", "orbital_period": "312", "diameter": "12120", "climate": "temperate", "gravity": "1 standard", "terrain": "grassy hills, swamps, forests, mountains", "surface_water": "12", "population": "4500000000", "residents": ["https://swapi.co/api/people/3/", "https://swapi.co/api/people/21/", "https://swapi.co/api/people/36/", "https://swapi.co/api/people/37/", "https://swapi.co/api/people/38/", "https://swapi.co/api/people/39/", "https://swapi.co/api/people/42/", "https://swapi.co/api/people/60/", "https://swapi.co/api/people/61/", "https://swapi.co/api/people/66/", "https://swapi.co/api/people/35/"], "films": ["https://swapi.co/api/films/5/", "https://swapi.co/api/films/4/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/"], "created": "2014-12-10T11:52:31.066000Z", "edited": "2014-12-20T20:58:18.430000Z", "url": "https://swapi.co/api/planets/8/" }, { "name": "Coruscant", "rotation_period": "24", "orbital_period": "368", "diameter": "12240", "climate": "temperate", "gravity": "1 standard", "terrain": "cityscape, mountains", "surface_water": "unknown", "population": "1000000000000", "residents": ["https://swapi.co/api/people/34/", "https://swapi.co/api/people/55/", "https://swapi.co/api/people/74/"], "films": ["https://swapi.co/api/films/5/", "https://swapi.co/api/films/4/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/"], "created": "2014-12-10T11:54:13.921000Z", "edited": "2014-12-20T20:58:18.432000Z", "url": "https://swapi.co/api/planets/9/" }, { "name": "Kamino", "rotation_period": "27", "orbital_period": "463", "diameter": "19720", "climate": "temperate", "gravity": "1 standard", "terrain": "ocean", "surface_water": "100", "population": "1000000000", "residents": ["https://swapi.co/api/people/22/", "https://swapi.co/api/people/72/", "https://swapi.co/api/people/73/"], "films": ["https://swapi.co/api/films/5/"], "created": "2014-12-10T12:45:06.577000Z", "edited": "2014-12-20T20:58:18.434000Z", "url": "https://swapi.co/api/planets/10/" }, { "name": "Utapau", "rotation_period": "27", "orbital_period": "351", "diameter": "12900", "climate": "temperate, arid, windy", "gravity": "1 standard", "terrain": "scrublands, savanna, canyons, sinkholes", "surface_water": "0.9", "population": "95000000", "residents": ["https://swapi.co/api/people/83/"], "films": ["https://swapi.co/api/films/6/"], "created": "2014-12-10T12:49:01.491000Z", "edited": "2014-12-20T20:58:18.439000Z", "url": "https://swapi.co/api/planets/12/" }, { "name": "Mustafar", "rotation_period": "36", "orbital_period": "412", "diameter": "4200", "climate": "hot", "gravity": "1 standard", "terrain": "volcanoes, lava rivers, mountains, caves", "surface_water": "0", "population": "20000", "residents": [], "films": ["https://swapi.co/api/films/6/"], "created": "2014-12-10T12:50:16.526000Z", "edited": "2014-12-20T20:58:18.440000Z", "url": "https://swapi.co/api/planets/13/" }, { "name": "Kashyyyk", "rotation_period": "26", "orbital_period": "381", "diameter": "12765", "climate": "tropical", "gravity": "1 standard", "terrain": "jungle, forests, lakes, rivers", "surface_water": "60", "population": "45000000", "residents": ["https://swapi.co/api/people/13/", "https://swapi.co/api/people/80/"], "films": ["https://swapi.co/api/films/6/"], "created": "2014-12-10T13:32:00.124000Z", "edited": "2014-12-20T20:58:18.442000Z", "url": "https://swapi.co/api/planets/14/" }, { "name": "Polis Massa", "rotation_period": "24", "orbital_period": "590", "diameter": "0", "climate": "artificial temperate ", "gravity": "0.56 standard", "terrain": "airless asteroid", "surface_water": "0", "population": "1000000", "residents": [], "films": ["https://swapi.co/api/films/6/"], "created": "2014-12-10T13:33:46.405000Z", "edited": "2014-12-20T20:58:18.444000Z", "url": "https://swapi.co/api/planets/15/" }] };
export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planetName: '',
            planetList: [],
            apiCalled: false,
            SearchRemaining: Store.getSearchRemaining()
        };
        this.SearchApi = _.debounce(this.SearchApi, 1000);
    }
    handleChange = (event) => {
        let { SearchRemaining } = this.state;
        const { hasUnlimitedAccess } = this.props;
        if (SearchRemaining < 0 && !hasUnlimitedAccess) {
            this.setState({ planetName: event.target.value, SearchRemaining: 0 });
            Store.setSearchRemaining(0);
        } else {
            this.setState({ planetName: event.target.value, SearchRemaining: --SearchRemaining });
            Store.setSearchRemaining(SearchRemaining);
            this.SearchApi();
            // this.handlePlanets(temp);
        }

    }
    SearchApi = async () => {
        this.setState({
            callingApi: true,
            planetList: [],
            message: null

        });
        var response = await ApiCaller.apiRequest({
            url: `https://swapi.co/api/planets/?search=${this.state.planetName}`,
            method: 'get'
        }).catch((error) => {
            console.error("Error caught in catch", error);
            this.setState({
                message: "Something is wrong here.",
                callingApi: false
            })
        });
        if (response.status == 200) {
            const planetData = await response.json();
            if (planetData && planetData.count >= 1) {
                this.handlePlanets(planetData);
            } else {
                this.setState({
                    message: 'Unable to find planets',
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
    waitOver = () => {
        Store.setSearchRemaining(15);
        this.setState({ SearchRemaining: 15 });
    }
    handlePlanets(planetData) {
        this.setState({
            message: null,
            planetList: planetData.results,
            callingApi: false
        });
    }

    render() {
        const { hasUnlimitedAccess } = this.props;
        const { message, callingApi, SearchRemaining, planetList } = this.state;
        return (
            <div className="col-md-8">
                {!hasUnlimitedAccess && <div>
                    <span> Search remaining: {SearchRemaining}</span>
                    <Timer maxCount={60} waitOver={this.waitOver} />
                </div>}
                <div>
                    <div>
                        <input type="text"
                            className="form-control"
                            placeholder="Search for a planet"
                            onChange={this.handleChange}
                            disabled={SearchRemaining === 0} />
                    </div>
                    <div className="row planetlist">
                        {callingApi && <Loader />}
                        {planetList.map((planet, index) => <Planet key={index}
                            name={planet.name}
                            population={planet.population}
                            url={planet.url} />)}
                    </div>
                    {message}
                </div>
            </div>
        );
    }
}
