// src/components/Cell3.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInCalendarDays } from 'date-fns';

const Cell3 = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [daysDifference, setDaysDifference] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const today = new Date();
        const difference = differenceInCalendarDays(date, today);
        setDaysDifference(difference);
        console.log("Selected date:", date);
        console.log("Days difference:", difference);

        // Send the days difference to the Flask backend
        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ daysDifference: difference })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <div>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className="form-control"
                    inline
                />
                {daysDifference !== null && (
                    <div style={{ marginTop: '10px'}}>There will be {daysDifference} days starting from today.</div>
                )}
            </div>
        </div>
    );
};

export default Cell3;



