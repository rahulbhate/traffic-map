import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import * as incidentsData from "../data/incidents.json";
function Map({ ...props }) {
  const [selectedIncident, SetSelectedIncident] = useState(null);
  const [show, setShow] = useState(false);

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
            props.handleClick(incident);
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
                <span
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Close
                </span>
              </>
            ) : (
              <span
                onClick={() => {
                  setShow(true);
                }}
              >
                Read More
              </span>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
  return <>{googleMap}</>;
}
export default withScriptjs(withGoogleMap(Map));
