import React, {useState, useEffect} from "react";
import "./Startday.css";

const StartDay = () => {
    const [timeRemaining, setTimeRemaining] = useState({hours: 2, minutes: 30});
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev.minutes === 0 && prev.hours === 0) {
                        return {hours: 0, minutes: 0};
                    }
                    if (prev.minutes === 0) {
                        return {hours: prev.hours - 1, minutes: 59};
                    }
                    return {...prev, minutes: prev.minutes - 1};
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (timeRemaining.hours === 0 && timeRemaining.minutes === 0) {
            setIsRunning(false);
        }
    }, [timeRemaining]);

    return (
        <div className="container">
            {/* Current Task Section */}
            <div className="taskSection">
                <h2 className="heading">CURRENT TASK</h2>
                <div className="taskName">Study for exam</div>

                <div className="durationText">
                    <div className="timeContainer">
                        <span className="numberBox">2</span>
                        <span>Hours</span>
                    </div>
                    <div className="timeContainer">
                        <span className="numberBox">30</span>
                        <span>Minutes</span>
                    </div>
                </div>

                <div className="breaksControl">NUMBER OF BREAKS (DEFAULT 2)</div>

                <button
                    className="startButton"
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? "PAUSE" : "START"}
                </button>

                <div className="timeRemaining">
                    TIME TO FINISH TASK:{" "}
                    <span className="numberBox">
                    {timeRemaining.hours.toString().padStart(2, "0")}:
                        {timeRemaining.minutes.toString().padStart(2, "0")}
                </span>
                </div>
            </div>

            {/* Next Task Section */}
            <div className="taskSection">
                <h2 className="heading">NEXT TASK</h2>
                <div className="taskName">Do Homework</div>

                <div className="durationText">
                    <div className="timeContainer">
                        <span className="numberBox">0</span>
                        <span>Hours</span>
                    </div>
                    <div className="timeContainer">
                        <span className="numberBox">15</span>
                        <span>Minutes</span>
                    </div>
                </div>

                <div className="breaksControl" style={{ marginTop: "15px" }}>
                    INCOMING BREAK
                </div>
            </div>
        </div>
    );

};

export default StartDay;
