import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: localStorage.getItem('name') || '',
        surname: localStorage.getItem('surname') || '',
        email: localStorage.getItem('email') || ''
    });

    const handleEdit = async (field) => {
        try {
            await axios.put(`http://localhost:3000/users/${localStorage.getItem('id')}`, {
                [field]: formData[field]
            });
            localStorage.setItem(field, formData[field]);
            alert(`${field} updated successfully!`);
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
            alert(`Failed to update ${field}`);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (<div>
        <h2 style={{marginBottom: '30px'}}>Settings</h2>

        {/* Name Field */}
        <div style={{
            display: 'flex', width: '100%', marginBottom: '15px', alignItems: 'center'
        }}>
            <button
                onClick={() => handleEdit('name')}
                style={{
                    marginRight: '10px',
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    cursor: 'pointer'
                }}
            >
                Edit
            </button>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{
                    flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '3px'
                }}
            />
        </div>

        {/* Surname Field */}
        <div style={{
            display: 'flex', width: '100%', marginBottom: '15px', alignItems: 'center'
        }}>
            <button
                onClick={() => handleEdit('surname')}
                style={{
                    marginRight: '10px',
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    cursor: 'pointer'
                }}
            >
                Edit
            </button>
            <input
                type="text"
                value={formData.surname}
                onChange={(e) => setFormData({...formData, surname: e.target.value})}
                style={{
                    flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '3px'
                }}
            />
        </div>

        {/* Email Field */}
        <div style={{
            display: 'flex', width: '100%', marginBottom: '30px', alignItems: 'center'
        }}>
            <button
                onClick={() => handleEdit('email')}
                style={{
                    marginRight: '10px',
                    padding: '5px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '3px',
                    cursor: 'pointer'
                }}
            >
                Edit
            </button>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{
                    flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '3px'
                }}
            />
        </div>

        <button
            onClick={handleLogout}
            style={{
                padding: '8px 15px', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer', width: '100%'
            }}
        >
            Log Out
        </button>
    </div>);
}

export default Settings;