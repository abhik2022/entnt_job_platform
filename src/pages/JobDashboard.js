// src/pages/JobDashboard.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Stack } from '@mui/material';  // Import Stack from MUI
import { addJob, editJob, deleteJob } from '../store';
import JobCard from '../components/JobCard';
import JobFormModal from '../components/JobFormModal';

const JobDashboard = () => {
    // Fetching jobs from the Redux store
    const jobs = useSelector(state => state.jobs); // Make sure this is pulling from the correct slice of state
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);

    console.log("Jobs from Redux:", jobs);

    // Function to update the localStorage
    const updateLocalStorage = (updatedJobs) => {
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    };

    const handleAddJob = () => {
        setEditingJob(null);  // Reset editing state to null for a new job
        setModalOpen(true);
    };

    const handleSaveJob = (job) => {
        if (editingJob) {
            // If we are editing an existing job, we pass the updated job object.
            dispatch(editJob({ ...editingJob, ...job }));
        } else {
            // If there is no editingJob, it's a new job, so we add a new one.
            dispatch(addJob({ ...job, id: Date.now() }));
        }
        
        // Update localStorage after the job is saved/added
        updateLocalStorage(jobs);

        setModalOpen(false);  // Close the modal after saving
    };

    const handleEditJob = (job) => {
        setEditingJob(job);  // Set the job that is being edited
        setModalOpen(true);   // Open the modal for editing
    };

    const handleDeleteJob = (id) => {
        dispatch(deleteJob(id));  // Dispatch the delete action for the job
        
        // After deletion, update localStorage
        updateLocalStorage(jobs);
    };

    return (
        <Container>
            <Button variant="contained" color="primary" onClick={handleAddJob}>Add Job</Button>
            <Stack 
                direction="row" 
                spacing={2} 
                flexWrap="wrap" 
                sx={{ marginTop: '20px' }}  // Stack properties
            >
                {jobs && jobs.length > 0 ? (
                    jobs.map(job => (
                        <JobCard
                            job={job}
                            onEdit={() => handleEditJob(job)}  // Pass the job to edit
                            onDelete={() => handleDeleteJob(job.id)}  // Pass the job ID to delete
                            key={job.id}
                        />
                    ))
                ) : (
                    <p>No job postings available</p>
                )}
            </Stack>
            <JobFormModal 
                open={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                onSave={handleSaveJob} 
                job={editingJob}  // Pass the job details being edited or null for a new job
            />
        </Container>
    );
};

export default JobDashboard;
