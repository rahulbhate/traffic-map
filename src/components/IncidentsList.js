import React from "react";

export default function IncidentsList({ incidentCart, ...props }) {
  let content;
  let totalCount;
  {
    if (incidentCart && incidentCart.length > 0) {
      totalCount = `List (${incidentCart.length}) `;
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

    return (
      <div
        style={{
          maxHeight: "100vh" /* Fix a max-height here */,
          overflow: "auto"
        }}
      >
        {totalCount}
        {content}
      </div>
    );
  }
}
