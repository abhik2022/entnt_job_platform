import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const JobCard = ({ job, onEdit, onDelete }) => {
    const navigate = useNavigate();  // Initialize useNavigate

    // Navigate to the job details page when the job card is clicked
    const handleViewDetails = () => {
        navigate(`/job/${job.id}`);  // Redirect to the job details page with job ID
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{job.title}</Typography>
                <Typography variant="body2" color="textSecondary">{job.description}</Typography>
                <Typography variant="caption">Candidates Applied: {job.candidates}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={onEdit}>Edit</Button>
                <Button size="small" color="secondary" onClick={onDelete}>Delete</Button>
                <Button size="small" color="primary" onClick={handleViewDetails}>View Details</Button>
            </CardActions>
        </Card>
    );
};

export default JobCard;
