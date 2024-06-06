import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { parse } from 'js2xmlparser';

const ChampionTable = () => {
    const [champions, setChampions] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [roleFilter, setRoleFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/champions')
            .then(response => setChampions(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const sortedChampions = [...champions].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filteredChampions = sortedChampions
        .filter(champion => roleFilter ? champion.Role === roleFilter : true)
        .filter(champion => champion.Name.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleDownloadXML = () => {
        const data = filteredChampions.map(champion => ({
            name: champion.Name,
            role: champion.Role,
            tier: champion.Tier,
            winRate: champion['Win %'],
            pickRate: champion['Pick %'],
            banRate: champion['Ban %'],
            kda: champion.KDA
        }));

        const xmlData = parse("Champions", { Champion: data });
        const blob = new Blob([xmlData], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'champions.xml';
        link.click();
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4 text-white">League of Legends Champion Stats</h1>
            <div className="mb-4 flex justify-between items-center">
                <div>
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
                <div>
                    <input
                        type="text"
                        placeholder="Search Champion"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="px-2 py-1 rounded"
                    />
                </div>
            </div>
            <div className="mb-4">
                <button
                    onClick={handleDownloadXML}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Download XML
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-blue-900 text-white rounded-lg">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Name')}>
                            Champion
                            {sortConfig.key === 'Name' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp/> : <FaSortDown/>
                            )}
                        </th>
                        <th className="py-2 px-4">
                            Role
                        </th>
                        <th className="py-2 px-4">
                            Tier
                        </th>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Win %')}>
                            Win Rate
                            {sortConfig.key === 'Win %' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp/> : <FaSortDown/>
                            )}
                        </th>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Pick %')}>
                            Pick Rate
                            {sortConfig.key === 'Pick %' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp/> : <FaSortDown/>
                            )}
                        </th>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('Ban %')}>
                            Ban Rate
                            {sortConfig.key === 'Ban %' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp/> : <FaSortDown/>
                            )}
                        </th>
                        <th className="py-2 px-4 cursor-pointer" onClick={() => handleSort('KDA')}>
                            KDA
                            {sortConfig.key === 'KDA' && (
                                sortConfig.direction === 'ascending' ? <FaSortUp/> : <FaSortDown/>
                            )}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredChampions.map(champion => (
                        <tr key={champion._id} className="hover:bg-blue-800">
                            <td className="py-2 px-4">{champion.Name}</td>
                            <td className="py-2 px-4">{champion.Role}</td>
                            <td className="py-2 px-4">{champion.Tier}</td>
                            <td className={`py-2 px-4 ${parseFloat(champion["Win %"]) < 47 ? 'text-red-500' : parseFloat(champion["Win %"]) >= 53 ? 'text-yellow-500' : 'text-blue-500'}`}>{champion["Win %"]}</td>
                            <td className="py-2 px-4">{champion["Pick %"]}</td>
                            <td className="py-2 px-4">{champion["Ban %"]}</td>
                            <td className="py-2 px-4">{champion.KDA}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChampionTable;