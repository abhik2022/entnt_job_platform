// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import JobDashboard from './pages/JobDashboard';
import JobDetailsPage from './pages/JobDetailsPage';
import CandidateDetails from './pages/CandidateDetails';
// Placeholder pages for other sections
// import Candidates from './pages/Candidates';
// import Assessments from './pages/Assessments';

const App = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Job Hiring Platform
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        Job Postings
                    </Button>
                    {/* <Button color="inherit" component={Link} to="/candidates">
                        Candidates
                    </Button> */}
                    {/* <Button color="inherit" component={Link} to="/assessments">
                        Assessments
                    </Button> */}
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '20px' }}>
                <Routes>
                    <Route path="/" element={<JobDashboard />} />
                    <Route path="/job/:jobId" element={<JobDetailsPage />} /> 
                    <Route path="/job/:jobId/candidate/:candidateId" element={<CandidateDetails />} />                    

                    {/* <Route path="/candidates" element={<Candidates />} /> */}
                    {/* <Route path="/assessments" element={<Assessments />} /> */}
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
