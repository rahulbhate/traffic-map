import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import * as incidentsData from "../data/incidents.json";
import IncidentsList from "./IncidentsList";
function Map(props) {
  const [selectedIncident, SetSelectedIncident] = useState(null);
  const [incidentCart, setIncidentsCart] = useState([]);
  const [alert, setAlert] = useState("");
  const [show, setShow] = useState(false);
  const handleIncidentsList = item => {
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
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        SetSelectedIncident(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  });

  const googleMap = (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -37.813629, lng: 144.963058 }}
    >
      {incidentsData.incidents.map(incident => (
        <Marker
          key={incident.id}
          position={{
            lat: parseFloat(incident.lat),
            lng: parseFloat(incident.long)
          }}
          onClick={() => {
            SetSelectedIncident(incident);
            handleIncidentsList(incident);
          }}
        />
      ))}
      {selectedIncident && (
        <InfoWindow
          position={{
            lat: parseFloat(selectedIncident.lat),
            lng: parseFloat(selectedIncident.long)
          }}
          onCloseClick={() => {
            SetSelectedIncident(null);
          }}
        >
          <div style={{ width: "150px" }}>
            <h3>{selectedIncident.incident_type}</h3>
            <h4>{selectedIncident.title}</h4>
            {show ? (
              <>
                <p>{selectedIncident.description}</p>
                <a
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Close
                </a>
              </>
            ) : (
              <a
                onClick={() => {
                  setShow(true);
                }}
              >
                Read More
              </a>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
  return (
    <>
      {googleMap}
      <IncidentsList incidentCart={incidentCart} />
    </>
  );
}
export default withScriptjs(withGoogleMap(Map));
