import React, { useState } from "react";
import "../src/assets/css/style.css";
import IncidentsList from "./components/IncidentsList";
import Map from "./components/Map";
function App() {
  const [incidentCart, setIncidentsCart] = useState([]);
  const [alert, setAlert] = useState("");
  const handleClick = item => {
    let addIncident = true;
    for (let i = 0; i < incidentCart.length; i++) {
      if (incidentCart[i].id === item.id) {
        addIncident = false;
      }
    }
    if (addIncident) {
      setIncidentsCart([...incidentCart, item]);
    } else {
      setAlert("Already in your list");
    }

    console.log(incidentCart);
  };
  return (
    <div className='App'>
      <IncidentsList incidentCart={incidentCart} />
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ minHeight: `100vh` }} />}
        containerElement={<div style={{ minHeight: `100vh` }} />}
        mapElement={<div style={{ minHeight: `100vh` }} />}
        handleClick={handleClick}
      />
    </div>
  );
}

export default App;
