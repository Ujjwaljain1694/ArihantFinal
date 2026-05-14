import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './DateForm.css';

const DateForm = () => {
  return (
    <div className="date-form-container">
      <h2>Date Selection Form</h2>
      
      <div className="date-inputs">
        {/* From Date Input */}
        <div className="input-group">
          <label htmlFor="fromDate">From Date</label>
          <div className="input-icon-group">
            
            <input 
              type="text" 
              id="fromDate"
              placeholder="DD/MM/YYYY" 
              className="date-input"
            />
            <i className="fa fa-calendar calendar-icon"></i>
          </div>
        </div>

        {/* To Date Input */}
        <div className="input-group">
          <label htmlFor="toDate">To Date</label>
          <div className="input-icon-group">
            <input 
              type="text" 
              id="toDate"
              placeholder="DD/MM/YYYY" 
              className="date-input"
            />
            <i className="fa fa-calendar calendar-icon"></i>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default DateForm;
