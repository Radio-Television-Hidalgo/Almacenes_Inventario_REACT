import React, { useEffect, useState } from "react";

function ReceptionRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("/api/depertments/requests")
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  return (
    <div>
      <h1>Reception Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Status</th>
            <th>File</th>
            <th>Approving User ID</th>
            <th>Requesting User ID</th>
            <th>Item ID</th>
            <th>Inventory Number ID</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.description}</td>
              <td>{request.quantity}</td>
              <td>{request.type}</td>
              <td>{request.status}</td>
              <td>{request.file}</td>
              <td>{request.approving_user_id}</td>
              <td>{request.requesting_user_id}</td>
              <td>{request.item_id}</td>
              <td>{request.inventory_number_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReceptionRequests;
