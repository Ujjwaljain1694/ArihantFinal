import React from "react";
import "./PayoutRequest.css";
import { Link } from 'react-router-dom';

export default function PayoutRequest() {
  return (
    <div className="dashboard-wrapper">
      <div className="main-container">
        {/* Tabs */}
      <div className="tabs">
        <Link to="/payout">Payout</Link>
        <Link to="/payout-request" className="active">Payout Request</Link>
        <Link to="/cancel-request">Cancel Request</Link>
        <Link to="/bulk-payout">Bulk Payout</Link>
      </div>

      {/* Search Section */}
      <div className="search-container">
        <p className="search-text">Search results(0)</p>
        <button className="btn clear-btn">CLEAR</button>
        <button className="btn search-btn">SEARCH</button>
      </div>

      {/* Summary Cards */}
        <div className="summary-row">
          <div className="summary-card">
            <p>Total Request</p>
            <h2>0</h2>
          </div>

          <div className="summary-card">
            <p>Total Process</p>
            <h2>0</h2>
          </div>

          <div className="summary-card">
            <p>Total Cancel</p>
            <h2>0</h2>
          </div>
        </div>

      {/* Table */}
      <div className="table-wrapper">

        <div className="table-head">
          <div>Date</div>
          <div>Client Code</div>
          <div>Client Name</div>
          <div>BankAccount</div>
          <div>Request Amount</div>
          <div>Status</div>
        </div>

        <div className="table-body">
          <p>No data to display</p>
        </div>

        <div className="table-footer">0 total</div>

      </div>
      </div>
    </div>
  );
}