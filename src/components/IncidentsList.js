import React from "react";

export default function IncidentsList({ incidentCart, ...props }) {
  let content;
  {
    if (incidentCart && incidentCart.length > 0) {
      content = incidentCart.map(i => {
        return (
          <div key={i.id} className='card'>
            <h3>{i.incident_type}</h3>
            <p> {i.title}</p>
          </div>
        );
      });
    } else {
      return (content = "No Data In The List");
    }

    return <div>{content}</div>;
  }
}
