import React, { useState, useEffect } from 'react';

const StartDay = () => {
    const [timeRemaining, setTimeRemaining] = useState({ hours: 2, minutes: 30 });
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev.minutes === 0 && prev.hours === 0) {
                        return { hours: 0, minutes: 0 };
                    }
                    if (prev.minutes === 0) {
                        return { hours: prev.hours - 1, minutes: 59 };
                    }
                    return { ...prev, minutes: prev.minutes - 1 };
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

    const styles = {
        container: {
            fontFamily: "'Arial', sans-serif",
            maxWidth: '500px',
            margin: '20px auto',
            padding: '25px',
            backgroundColor: '#f5f6fa',
            borderRadius: '12px',
            boxShadow: '0 3px 15px rgba(0,0,0,0.1)',
            minWidth: '280px',
            width: '90%'
        },
        taskSection: {
            backgroundColor: 'white',
            padding: '20px',
            marginBottom: '25px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        },
        heading: {
            color: '#2d3436',
            fontSize: '1.1rem',
            marginBottom: '15px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        },
        taskName: {
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#2c3e50'
        },
        durationText: {
            fontSize: '1rem',
            color: '#636e72',
            marginBottom: '15px',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap'
        },
        breaksControl: {
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            margin: '25px 0',
            fontSize: '0.9rem',
            color: '#34495e',
            textAlign: 'center'
        },
        startButton: {
            width: '100%',
            padding: '15px',
            backgroundColor: '#FF8C00',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'all 0.2s ease'
        },
        timeRemaining: {
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#2c3e50',
            textAlign: 'center',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginTop: '15px'
        },
        timeContainer: {
            display: 'flex',
            gap: '5px',
            justifyContent: 'center',
            alignItems: 'baseline'
        },
        numberBox: {
            padding: '5px 10px',
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            border: '1px solid #dfe6e9',
            minWidth: '50px',
            textAlign: 'center'
        }
    };

    return (
        <div style={styles.container}>
            {/* Current Task Section */}
            <div style={styles.taskSection}>
                <h2 style={styles.heading}>CURRENT TASK</h2>
                <div style={styles.taskName}>Study for exam</div>

                <div style={styles.durationText}>
                    <div style={styles.timeContainer}>
                        <span style={styles.numberBox}>2</span>
                        <span>Hours</span>
                    </div>
                    <div style={styles.timeContainer}>
                        <span style={styles.numberBox}>30</span>
                        <span>Minutes</span>
                    </div>
                </div>

                <div style={styles.breaksControl}>
                    NUMBER OF BREAKS (DEFAULT 2)
                </div>

                <button
                    style={styles.startButton}
                    onClick={() => setIsRunning(!isRunning)}
                    onMouseOver={e => e.target.style.backgroundColor = '#e67e22'}
                    onMouseOut={e => e.target.style.backgroundColor = '#FF8C00'}
                >
                    {isRunning ? 'PAUSE' : 'START'}
                </button>

                <div style={styles.timeRemaining}>
                    TIME TO FINISH TASK: {' '}
                    <span style={styles.numberBox}>
            {timeRemaining.hours.toString().padStart(2, '0')}:
                        {timeRemaining.minutes.toString().padStart(2, '0')}
          </span>
                </div>
            </div>

            {/* Next Task Section */}
            <div style={styles.taskSection}>
                <h2 style={styles.heading}>NEXT TASK</h2>
                <div style={styles.taskName}>Do Homework</div>

                <div style={styles.durationText}>
                    <div style={styles.timeContainer}>
                        <span style={styles.numberBox}>0</span>
                        <span>Hours</span>
                    </div>
                    <div style={styles.timeContainer}>
                        <span style={styles.numberBox}>15</span>
                        <span>Minutes</span>
                    </div>
                </div>

                <div style={{...styles.breaksControl, marginTop: '15px'}}>
                    INCOMING BREAK
                </div>
            </div>
        </div>
    );
};

export default StartDay;