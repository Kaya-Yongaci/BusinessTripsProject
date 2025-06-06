
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLuggageCart } from '@fortawesome/free-solid-svg-icons';
import { getBusinessTrips } from "./tripsService.js";

// functional component ProductList, destructuring props! in the function line
// we pass the dispatch function from the App component to TripList
// toDo Exercices 2 - 3.3.1
function TripList({ dispatch }) {
    // State for storing trips
    const [trips, setTrips] = useState([]);

    // get business trips from the API when the component mounts
    useEffect(() => {
        // fetch products from api
        getBusinessTrips().then((response) => setTrips(response));
    }, []);

    // Map trips to Trip components
    // toDo Exercices 2 - 3.3.1
    const tripsMapped = trips.map((trip) => (
        <Trip dispatch={dispatch} trip={trip} key={trip.id} />
    ));

    // If no trips are available, show an empty message
    const empty = (
        <section>
            <p className="alert alert-info">Triplist is empty</p>
        </section>
    );

    return (
        <div className="container">
            <section className="mb-4"/>

            <heder className="card-header"><h2>Triplist</h2></heder>
            <section>
                <h4 className="h4">Business Trips - Planned 2025</h4>
                <div className="row">
                    {/* Render the mapped trips or the empty message */}
                    { tripsMapped.length > 0 ? tripsMapped : empty }
                </div>
            </section>
        </div>
    );
}
// destructuring ...props in the param line!
// toDo Exercices 2 - 3.3.2
function Trip({ dispatch, trip }) {
    // Props, deconstruct props trip
    // toDo Exercices 2 - 3.3.2
    let { id, title, description, startTrip, endTrip } = trip;

    return (
        <div className="col-sm-6 col-md-4 col-lg-3">

            <figure className="card card-product">
                {/* adapt the picture to the frame with boostrap */}
                <div >
                    <img className="img-fluid" src={"images/items/" + id + ".jpg"} alt="name " />
                </div>
                <figcaption className="info-wrap">
                    <a href="" className="title">
                        {title}
                    </a>
                    <div className="price-wrap">
                        <span className="price-new">{startTrip.toString()}</span>
                    </div>
                    <div className="price-wrap">
                        <span className="price-new">{endTrip.toString()}</span>
                    </div>
                    <p className="card-text">{description}</p>
                    <div className="info-wrap row">
                        <button
                            type="button"
                            className="btn btn-link btn-outline"
                            // calling dispatch the action to add the trip to the wishlist
                            onClick={() => dispatch({ type: "add", trip })}
                        >
                            <FontAwesomeIcon icon={faLuggageCart} /> Add to Triplist
                        </button>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
}

export default TripList;
