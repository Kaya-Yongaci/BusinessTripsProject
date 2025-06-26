import React, { useReducer} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Wishlist from "./components/Wishlist";
import TripList from "./components/TripList";
import tripsReducer from "./components/tripsReducer.js";

// the initial state of the wishlist
// toDo Exercices 2 - 3.2
let initialWishlist = [
    // Initial state of the wishlist empty
];

export default function App() {
    // useReducer is used to manage the state of the wishlist here
    // pass two parameters to useReducer: the reducer function and the initial state
    // toDo Exercices 2 - 3.2 -declare the useReducer hook
    const [wishlist, dispatch] = useReducer(tripsReducer, initialWishlist);
    return (
        <div className="container">
            <header className="container h3">
                <img src="/images/items/logo.png" height={60} alt="logo" />
                <h2>Business Trips Planer</h2>

            </header>
            {/*pass the initialWishlist and dispatch to the Wishlist component
           // toDo Exercices 2 - 3.2
            */}
            <Wishlist wishlist={wishlist} dispatch={dispatch}/>
            {/* pass the dispatch function to the TripList component // toDo Exercices 2 - 3.2  */}
            <TripList dispatch={dispatch}/>

            <footer>@BBW 2025</footer>
        </div>
    );
}

function WishlistTest() {
    return (
        <div className="container">
            <header className="container h3">Wishlist-Test</header>
            <ul />
        </div>
    );
}
