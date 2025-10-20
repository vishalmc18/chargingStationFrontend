import React, {useState} from 'react';


const StationCard = ({ station, navigateTo, onDelete }) => {
    const isOnline = station.status === 'Operational';
    const cardClass = isOnline ? 'card status-online' : 'card status-offline';
    const statusBadgeClass = isOnline ? 'card-status status-badge-online' : 'card-status status-badge-offline';


    

    const handleEditClick = () => {
        navigateTo('form', station.id);
    };
    function trimString(text) {
    const maxLength = 30; 
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + "...";
    }
    return text;
}


    return (
        <div style={{width:'400px'}} className={cardClass}>
            <div>
                <h3 className="card-title">{trimString(station.stationName)}</h3>
                <p className="card-subtitle">Address: {trimString(station.locationAddress)}</p>
                <p>PinCode: {station.pinCode}</p>
                <p>Connector Type: {station.connectorType}</p>
                <span className={statusBadgeClass}>
                    Status: {station.status}
                </span>
                <p>Image URL: {trimString(station.imageUrl)}</p>
                <p>Location Link: {trimString(station.locationLink)}</p>
            </div>
            <div className="card-actions">
               
                <button className="edit-button" onClick={handleEditClick}>
                    Edit
                </button>
            
            </div>
        </div>
    );
};

export default StationCard;