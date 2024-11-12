
// src/pages/JobDashboard.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { addJob, editJob, deleteJob } from '../store/store';
import HeroSection from '../components/JobDashboard/HeroSection';
import JobList from '../components/JobDashboard/JobList';
import JobFormModal from '../components/JobFormModal';
import Footer from '../components/JobDashboard/Footer'

const JobDashboard = () => {
    const jobs = useSelector(state => state.jobs);
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);

    useEffect(() => {
        localStorage.setItem('jobs', JSON.stringify(jobs));
    }, [jobs]);

    const handleAddJob = () => {
        setEditingJob(null);
        setModalOpen(true);
    };

    const handleSaveJob = (job) => {
        if (editingJob) {
            dispatch(editJob({ ...editingJob, ...job }));
        } else {
            dispatch(addJob({ ...job, id: Date.now() }));
        }
        setModalOpen(false);
    };

    const handleEditJob = (job) => {
        setEditingJob(job);
        setModalOpen(true);
    };

    const handleDeleteJob = (id) => {
        dispatch(deleteJob(id));
    };

    return (
        <Box sx={{ padding: '0px', backgroundColor: '#f1f0f3' }}>
            <HeroSection onAddJob={handleAddJob} />

            <hr />

            <Typography variant="h2" color="#1565c0" sx={{textAlign:'center', fontWeight: 'bold', marginBottom: '25px' ,  marginTop:'100px'}}>
                Available Jobs!
            </Typography>

            <JobList jobs={jobs} onEdit={handleEditJob} onDelete={handleDeleteJob} />

            <JobFormModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveJob}
                job={editingJob}
            />
            <Footer />
        </Box>
    );
};

export default JobDashboard;


// dark - text - #1565c0