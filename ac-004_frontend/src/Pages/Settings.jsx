import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css'

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

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4"> {/* Adjust column width as needed */}
                    <h2 className="text-center mb-4">Settings</h2>

                    {/* Name Field */}
                    <div className="d-flex mb-3">
                        <button
                            onClick={() => handleEdit('name')}
                            className="btn btn-outline-secondary me-2"
                        >
                            First Name
                        </button>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="form-control"
                        />
                    </div>

                    {/* Surname Field */}
                    <div className="d-flex mb-3">
                        <button
                            onClick={() => handleEdit('surname')}
                            className="btn btn-outline-secondary me-2"
                        >
                            Last  Name
                        </button>
                        <input
                            type="text"
                            value={formData.surname}
                            onChange={(e) => setFormData({...formData, surname: e.target.value})}
                            className="form-control"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="d-flex mb-4">
                        <button
                            onClick={() => handleEdit('email')}
                            className="btn btn-outline-secondary me-2"
                        >
                            Edit E-mail
                        </button>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="form-control"
                        />
                    </div>

                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-danger w-100"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;