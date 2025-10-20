import React from 'react';
import { useStationApi } from '../services/stationApi.js'; // Note the .js extension
import StationCard from '../components/StationCard.jsx'; // Note the .jsx extension

const Dashboard = ({ navigateTo }) => {
    const { stations, loading, error, deleteStation, fetchStations } = useStationApi();

    const handleNewStation = () => {
        navigateTo('form', null);
    };

    const handleDelete = async (stationId) => {
        await deleteStation(stationId);
    };


    if (loading) {
        return <div className="status-message">Loading charging stations...</div>;
    }

    if (error) {
        return <div className="status-message" style={{ color: '#dc3545' }}>Error: {error}</div>;
    }

    return (
        <>
            <div className="header">
                <h1 className="header-title">Charging Station Dashboard</h1>
                <button className="add-button" onClick={handleNewStation}>
                    + Add New Station
                </button>
            </div>

            {stations.length === 0 ? (
                <div className="status-message">
                    No charging stations found. Click "Add New Station" to get started.
                </div>
            ) : (
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}} className="station-grid">
                    {stations.map(station => (
                        <StationCard
                            key={station.id}
                            station={station}
                            navigateTo={navigateTo}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default Dashboard;