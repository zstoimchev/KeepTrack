import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

function Settings() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: localStorage.getItem('name') || '',
        surname: localStorage.getItem('surname') || '',
        email: localStorage.getItem('email') || '',
    });
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

     const handleSaveAll = async () => {
        if (!formData.name.trim() || !formData.surname.trim() || !formData.email.includes('@')) {
            alert('Please provide valid Name, Surname, and Email.');
            return;
        }

        try {
            setLoading(true);
            const payload = { ...formData };
            console.log(payload);
            console.log(formData);
            if (password.trim()) payload.password = password;

            const response = await axios.put(
                `http://localhost:3000/users/${localStorage.getItem('id')}`,
                payload
            );
            console.log(response);

            if (response.data.success) {
                const updatedUser = response.data.user;
                Object.keys(updatedUser).forEach(key => localStorage.setItem(key, updatedUser[key]));
                alert('Profile updated successfully! You will be logged out.');
                localStorage.clear();
                navigate('/login');
            } else {
                alert(response.data.msg || 'Update failed. Try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <h2 className="text-center mb-4">Settings</h2>

                    {/* Name Field */}
                    <div className="d-flex mb-3">
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="form-control me-2"
                            placeholder="First Name"
                        />
                    </div>

                    {/* Surname Field */}
                    <div className="d-flex mb-3">
                        <input
                            type="text"
                            value={formData.surname}
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                            className="form-control me-2"
                            placeholder="Last Name"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="d-flex mb-3">
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="form-control me-2"
                            placeholder="Email"
                        />
                    </div>

                    {/* Password Fields */}
                     <div className="d-flex mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control me-2"
                            placeholder="New Password"
                        />
                    </div>

                    {/* Save Changes Button */}
                    <button
                        onClick={handleSaveAll}
                        className="buttona-123"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;