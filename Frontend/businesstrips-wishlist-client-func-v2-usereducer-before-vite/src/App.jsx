import React, { useReducer} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Wishlist from "./components/Wishlist";
import TripList from "./components/TripList";
import tripsReducer from "./components/tripsReducer.js";
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import BudgetPage from './components/BudgetPage';
import NeueReisePage from './components/NeueReisePage';
import MeineReisenPage from './components/MeineReisenPage';
import StatisticsPage from './components/StatisticsPage';
import SettingsPage from './components/SettingsPage';
import CalendarView from './components/CalendarView';
import Sidebar from './components/Sidebar';
import NotificationSystem from './components/NotificationSystem';

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
        <Router>
        <div className="App">
            <header className="container h3">
                <img src="/images/items/logo.png" height={60} alt="logo" />
                <h2>Business Trips - Wishlist functional with JAVA & REACT</h2>
                <h4>
                    Version-2 (using useReducer with pure functions before (8))
                </h4>
            </header>
            {/*pass the initialWishlist and dispatch to the Wishlist component
           // toDo Exercices 2 - 3.2
            */}
            <Wishlist wishlist={wishlist} dispatch={dispatch}/>
            {/* pass the dispatch function to the TripList component // toDo Exercices 2 - 3.2  */}
            <TripList dispatch={dispatch}/>

            <footer>@BBW 2025</footer>
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/budget" element={<MainLayout><BudgetPage /></MainLayout>} />
          <Route path="/neue-reise" element={<MainLayout><NeueReisePage /></MainLayout>} />
          <Route path="/meine-reisen" element={<MainLayout><MeineReisenPage /></MainLayout>} />
          <Route path="/statistiken" element={<MainLayout><StatisticsPage /></MainLayout>} />
          <Route path="/einstellungen" element={<MainLayout><SettingsPage /></MainLayout>} />
          <Route path="/kalender" element={<MainLayout><CalendarView /></MainLayout>} />
        </Routes>
        <NotificationSystem />
        </Router>
    );
}

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        {children}
      </div>
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
