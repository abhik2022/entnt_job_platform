import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Card, CardContent, Stack, Link } from '@mui/material';

const JobDetailsPage = () => {
    const { jobId } = useParams(); // Get jobId from the URL
    const jobs = useSelector(state => state.jobs);
    const job = jobs.find(job => job.id === parseInt(jobId)); // Find job by ID
    const navigate = useNavigate();

    useEffect(() => {
        if (!job) {
            navigate('/dashboard'); // Redirect to dashboard if job not found
        }
    }, [job, navigate]);

    // Function to handle candidate name click
    const handleCandidateClick = (candidateId) => {
        navigate(`/job/${jobId}/candidate/${candidateId}`); // Navigate to the candidate details page
    };

    return (
        <Container>
            {job ? (
                <div>
                    <Typography variant="h4" gutterBottom>
                        {job.title} - Candidates
                    </Typography>
                    <Stack spacing={2}>
                        {job.applicants.map((candidate) => (
                            <Card key={candidate.id} variant="outlined">
                                <CardContent>
                                    <Typography 
                                        variant="h6" 
                                        component="span" 
                                        color="primary" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleCandidateClick(candidate.id)} // Make candidate name clickable
                                    >
                                        {candidate.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Application Date: {candidate.applicationDate}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Status: {candidate.status}
                                    </Typography>
                                    <Link href={candidate.resume} target="_blank" rel="noopener" color="primary">
                                        View Resume
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                    <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>
            ) : (
                <Typography variant="h6" color="error">
                    Job not found!
                </Typography>
            )}
        </Container>
    );
};

export default JobDetailsPage;
