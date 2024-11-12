import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Card, CardContent, Stack, Link, Box } from '@mui/material';

const JobDetailsPage = () => {
    const { jobId } = useParams();
    const jobs = useSelector(state => state.jobs);
    const job = jobs.find(job => job.id === parseInt(jobId));
    const navigate = useNavigate();

    useEffect(() => {
        if (!job) {
            navigate('/dashboard');
        }
    }, [job, navigate]);

    const handleCandidateClick = (candidateId) => {
        navigate(`/job/${jobId}/candidate/${candidateId}`);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            {job ? (
                <Box>
                    <Typography variant="h3" color="primary" sx={{marginTop:'30px', marginBottom:'30px' }} gutterBottom>
                        {job.title} - Candidates
                    </Typography>
                    <Stack spacing={3} sx={{ mt: 2, mb: 4 }}>
                        {job.applicants.map((candidate) => (
                            <Card
                                key={candidate.id}
                                variant="outlined"
                                sx={{
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)', // Slight upward lift on hover
                                        boxShadow: 4, // Increase shadow on hover
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        color="primary"
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': { textDecoration: 'underline' },
                                            fontWeight: 500,
                                        }}
                                        onClick={() => handleCandidateClick(candidate.id)}
                                    >
                                        {candidate.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        Application Date: {candidate.applicationDate}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Status: <span style={{ fontWeight: 500 }}>{candidate.status}</span>
                                    </Typography>
                                    {/* <Link
                                        href={candidate.resume}
                                        target="_blank"
                                        rel="noopener"
                                        sx={{ mt: 1, display: 'inline-block', color: 'primary.main', fontWeight: 500 }}
                                    >
                                        View Resume
                                    </Link> */}
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/')}
                        sx={{
                            width: '100%',
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 500,
                            mt: 2,
                            borderRadius: 2,
                        }}
                    >
                        Back to Dashboard
                    </Button>
                </Box>
            ) : (
                <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
                    Job not found!
                </Typography>
            )}
        </Container>
    );
};

export default JobDetailsPage;
