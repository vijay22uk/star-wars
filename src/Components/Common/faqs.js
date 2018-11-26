import React from 'react';
export function Faqs() {
    return (<div className="col-md-4">
        <div class="list-group">
            <a href="#" className="list-group-item ">Luke Skywalker has unlimited access.</a>
            <a href="#" className="list-group-item ">Others will get 15 seacrch in 60 seconds.</a>
            <a href="#" className="list-group-item ">Timer and search count will persist in-memory storage(no redux as of now).</a>
            <a href="#" className="list-group-item ">Storage is maintained by store hance will work even we visit a planet details and come back.</a>
        </div>
    </div>);
}