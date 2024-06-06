import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const ChampionCharts = () => {
    const [champions, setChampions] = useState([]);
    const [roleFilter, setRoleFilter] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/champions')
            .then(response => setChampions(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredChampions = roleFilter
        ? champions.filter(champion => champion.Role === roleFilter)
        : champions;

    const winRateData = filteredChampions.map(champion => ({
        name: champion.Name,
        winRate: parseFloat(champion['Win %'])
    }));

    const pickRateData = filteredChampions.map(champion => ({
        name: champion.Name,
        pickRate: parseFloat(champion['Pick %'])
    }));

    const banRateData = filteredChampions.map(champion => ({
        name: champion.Name,
        banRate: parseFloat(champion['Ban %'])
    }));

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4 text-white">Champion Charts</h1>
            <div className="mb-4">
                <label htmlFor="role" className="mr-2 text-white">Filter by Role:</label>
                <select
                    id="role"
                    value={roleFilter}
                    onChange={e => setRoleFilter(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All</option>
                    <option value="TOP">TOP</option>
                    <option value="JUNGLE">JUNGLE</option>
                    <option value="MID">MID</option>
                    <option value="ADC">ADC</option>
                    <option value="SUPPORT">SUPPORT</option>
                </select>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Win Rate</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={winRateData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[40, 60]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="winRate" fill="#4caf50" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Pick Rate</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={pickRateData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pickRate" fill="#ffeb3b" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Ban Rate</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={banRateData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="banRate" fill="#f44336" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChampionCharts;