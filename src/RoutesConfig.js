// src/RoutesConfig.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobDashboard from './pages/JobDashboard';
import JobDetailsPage from './pages/JobDetailsPage';
import CandidateDetails from './pages/CandidateDetails';
import AssessmentPage from './pages/AssessmentPage';
import ManageAssessment from './pages/ManageAssessment';

const RoutesConfig = () => (
    <Routes>
        <Route path="/" element={<JobDashboard />} />
        <Route path="/job/:jobId" element={<JobDetailsPage />} />
        <Route path="/job/:jobId/candidate/:candidateId" element={<CandidateDetails />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/manage-assessment/:jobId" element={<ManageAssessment />} />
    </Routes>
);

export default RoutesConfig;
