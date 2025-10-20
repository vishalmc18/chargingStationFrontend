import React, { useState, useEffect } from 'react';
import { useStationApi } from '../services/stationApi.js'; // Note the .js extension

const StationFormPage = ({ navigateTo, stationId }) => {
    const isEdit = !!stationId;
    const { createStation, updateStation, getStationById } = useStationApi();
    const existingStation = isEdit ? getStationById(stationId) : null;

    const [formData, setFormData] = useState({
        id:0,
        pinCode: '',
        connectorType: '',
        imageUrl: '',
        locationLink: '',
        stationName: '',
        locationAddress: '',
        status: 'Operational',
    });
    const [formError, setFormError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEdit && existingStation) {
            setFormData(existingStation);
        } else if (!isEdit) {
             setFormData({
                stationName: '',
                locationAddress: '',
                status: 'Operational',
            });
        }
    }, [isEdit, existingStation]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setIsSubmitting(true);

        formData.pinCode = String(formData.pinCode);
        console.log(formData);
        if (!formData.stationName || !formData.connectorType || !formData.status) {
            setFormError('Please fill out all required fields and ensure capacity is positive.');
            setIsSubmitting(false);
            return;
        }

        try {
            if (isEdit) {
                await updateStation(stationId, formData);
            } else {
                await createStation(formData);
            }
            navigateTo('dashboard');
        } catch (error) {
            setFormError(`Failed to ${isEdit ? 'update' : 'create'} station. Check console for details.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const pageTitle = isEdit ? 'Edit Charging Station' : 'Add New Charging Station';
    const submitText = isEdit ? 'Save Changes' : 'Create Station';

    if (isEdit && !existingStation) {
        return <div className="status-message">Loading station details...</div>;
    }

    return (
        <div className="form-container">
            <h2 className="form-title">{pageTitle}</h2>

            {formError && (
                <div style={{ color: '#dc3545', padding: '10px', border: '1px solid #dc3545', borderRadius: '5px', marginBottom: '15px' }}>
                    {formError}
                </div>
            )}
            <div onClick={()=>{navigateTo('dashboard')}}> 
                <button className="back-button" disabled={isSubmitting}> &larr; Back to Dashboard </button>
                 </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="stationName">Station Name</label>
                    <input
                        id="stationName"
                        type="text"
                        name="stationName"
                        value={formData.stationName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="locationAddress">Location Address</label>
                    <input
                        id="locationAddress"
                        type="text"
                        name="locationAddress"
                        value={formData.locationAddress}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="pinCode">PinCode</label>
                    <input
                        id="pinCode"
                        type="number"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        min="1"
                        step="0.1"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="connectorType">Connector Type</label>
                    <input
                        id="connectorType"
                        type="text"
                        name="connectorType"
                        value={formData.connectorType}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Operational">Operational</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image Url</label>
                    <input
                        id="imageUrl"
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        step="any"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="locationLink">Location Link</label>
                    <input
                        id="locationLink"
                        type="text"
                        name="locationLink"
                        value={formData.locationLink}
                        onChange={handleChange}
                        step="any"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigateTo('dashboard')}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Processing...' : submitText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StationFormPage;