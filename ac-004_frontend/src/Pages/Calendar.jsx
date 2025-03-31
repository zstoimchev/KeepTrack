import React, { useState } from "react";
import "./Calendar.css"; // Import the CSS file

function Calendar({ onDateSelect }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getMonthName = (date) => {
        return date.toLocaleString("default", { month: "long" });
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    const calendarDays = Array(firstDayOfMonth)
        .fill(null)
        .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    // const handleClick = (day) => {
    //     if (day) {
    //         console.log(`Clicked on ${day} ${getMonthName(currentDate)} ${currentDate.getFullYear()}`);
    //     }
    // };

    const handleClick = (day) => {
        if (day) {
            const month = getMonthName(currentDate);
            const year = currentDate.getFullYear();
            onDateSelect(day, month, year);
        }
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>&lt;</button>
                <h2>
                    {getMonthName(currentDate)} {currentDate.getFullYear()}
                </h2>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="calendar-grid">
                {daysOfWeek.map((day) => (
                    <div key={day} className="day-header">
                        {day}
                    </div>
                ))}
                {calendarDays.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(day)}
                        disabled={!day}
                    >
                        {day || ""}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Calendar;