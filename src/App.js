// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import RoutesConfig from './RoutesConfig';

const App = () => (
    <Router>
        <Header />
        <Box>
            <RoutesConfig />
        </Box>
    </Router>
);

export default App;
