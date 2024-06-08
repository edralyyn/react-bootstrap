// src/components/Cell3.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Cell3 = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Selected date:", date);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="form-control"
                inline
            />
        </div>
    );
};

export default Cell3;
