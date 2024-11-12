// src/components/JobDashboard/JobList.js
import React from 'react';
import { Grid, Typography } from '@mui/material';
import JobCard from '../JobCard';

const JobList = ({ jobs, onEdit, onDelete }) => (
    <div style={{ marginTop: '10px' }}>
        {jobs && jobs.length > 0 ? (
            <Grid container sx={{ paddingX: '10px' }} >
                {jobs.map((job) => (
                    <Grid item xs={12} sm={6} md={4} key={job.id} sx={{display:"flex", justifyContent:"center"}}>
                        <JobCard
                            job={job}
                            onEdit={() => onEdit(job)}
                            onDelete={() => onDelete(job.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        ) : (
            <Typography variant="h6" color="text.secondary" sx={{ margin: '20px auto' }}>
                No job postings available
            </Typography>
        )}
    </div>
);

export default JobList;
