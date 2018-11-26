import React from 'react';
import {
    Link
} from "react-router-dom";

export function Planet(props) {
    const { name, population, minPopulation, url } = props;
    const planetId = parsePlanetIdfromUrl(url);
    return (
        <div className="col-md-3 planet-card">
            <p>
                <Link to={`/planet/${planetId}`} >
                    {name}
                </Link>
            </p>
            <p>
                Population
                <br />
                {population}
            </p>
            <div>
                <div>
                    {getPills(population, minPopulation)}
                </div>
            </div>
        </div>
    )

    function parsePlanetIdfromUrl(url) {
        const allData = url.split("/");
        return allData[allData.length - 2];
    }

    function getPills(population) {
        if (isNaN(population)) {
            return (<div className='unknow-pills col-md-12'></div>)
        }
        let allPill = []
        while (population > 0) {
            allPill.push(<div key={population} className='pills col-md-2'></div>);
            population -= 10000000;
            if (allPill.length > 15) {
                break;
            }
        }
        return allPill;
    }
}