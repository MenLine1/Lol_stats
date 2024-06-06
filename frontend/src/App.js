import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChampionTable from './components/ChampionTable';
import ChampionCharts from './components/ChampionCharts';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { UserProvider, useUser } from './UserContext';

const ProtectedRoute = ({ element: Component }) => {
    const { user } = useUser();
    return user ? Component : <Navigate to="/login" />;
};

const App = () => {
    return (
        <UserProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="*" element={<Navbar />} />
                    </Routes>
                    <main className="flex-grow mt-16 p-4">
                        <Routes>
                            <Route path="/" element={<ProtectedRoute element={<ChampionTable />} />} />
                            <Route path="/charts" element={<ProtectedRoute element={<ChampionCharts />} />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </UserProvider>
    );
};

export default App;