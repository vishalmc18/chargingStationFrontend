import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'https://localhost:7057/api/chargingstations';

export const useStationApi = () => {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all stations
    const fetchStations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setStations(data);
        } catch (err) {
            console.error("Error fetching stations:", err);
            setError("Failed to fetch data. Ensure the ASP.NET Core API is running on " + BASE_URL);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStations();
    }, [fetchStations]);



    const createStation = async (station) => {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(station),
            });
            if (!response.ok) {
                throw new Error('Failed to create station.');
            }
            await fetchStations();
        } catch (err) {
            console.error("Error creating station:", err);
            setError("Failed to create station.");
            throw err;
        }
    };

    const updateStation = async (stationId, station) => {
        try {
            const response = await fetch(`${BASE_URL}/${stationId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(station),
            });
            if (!response.ok) {
                throw new Error('Failed to update station.');
            }
            await fetchStations();
        } catch (err) {
            console.error("Error updating station:", err);
            setError("Failed to update station.");
            throw err; 
        }
    };

    const deleteStation = async (stationId) => {
        try {
            const response = await fetch(`${BASE_URL}/${stationId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete station.');
            }
            await fetchStations();
        } catch (err) {
            console.error("Error deleting station:", err);
            setError("Failed to delete station.");
        }
    };

    const getStationById = (id) => {
        const stationId = parseInt(id, 10);
        return stations.find(s => s.id === stationId);
    };

    return {
        stations,
        loading,
        error,
        createStation,
        updateStation,
        deleteStation,
        getStationById,
        fetchStations,
    };
};