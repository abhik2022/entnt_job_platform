import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AssessmentPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching jobs with a delay for better UX
    setTimeout(() => {
      const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
      setJobs(storedJobs);
      setLoading(false);
    }, 1000); // Simulate delay for fetching data
  }, []);

  // Handle job selection from dropdown
  const handleJobSelect = (event) => {
    const jobId = event.target.value;
    setSelectedJob(jobId);
    if (jobId) {
      navigate(`/manage-assessment/${jobId}`); // Navigate to the job assessment page
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 4,
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      justifyContent: 'center',
    }}>
      <Typography variant="h2" sx={{
        mb: 2, 
        color: 'primary.main', 
        fontWeight: 'bold',
        fontSize: '3.5rem',
        textAlign: 'center',
      }}>
        Assessment Management
      </Typography>

      <Typography variant="body1" sx={{
        mb: 4, 
        maxWidth: 600, 
        textAlign: 'center', 
        color: 'text.secondary',
        fontSize: '1.1rem',
      }}>
        Select a job from the dropdown below to manage its assessment questions. After selecting, you can add or modify the questions for the job.
      </Typography>
      
      {/* Dropdown for selecting a job */}
      <FormControl sx={{
        minWidth: 300, 
        marginBottom: 4, 
        backgroundColor: '#fff', 
        borderRadius: '8px', 
        boxShadow: 2
      }}>
        <InputLabel id="jobSelect-label">Select Job</InputLabel>
        <Select
          labelId="jobSelect-label"
          id="jobSelect"
          value={selectedJob}
          label="Select Job"
          onChange={handleJobSelect}
          displayEmpty
          sx={{
            borderRadius: '8px',
            '& .MuiSelect-icon': {
              color: 'primary.main',
            },
          }}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={24} sx={{ color: 'primary.main' }} />
            </MenuItem>
          ) : (
            jobs.map((job, index) => (
              <MenuItem key={index} value={job.id}>
                <Typography variant="body2" color="primary.main">
                  {job.title.length > 20 ? `${job.title.slice(0, 20)}...` : job.title}
                </Typography>
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {/* Display job details card if a job is selected */}
      {selectedJob && (
        <Card sx={{
          maxWidth: 400,
          marginTop: 3,
          boxShadow: 3,
          backgroundColor: '#fff',
          borderRadius: '8px',
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Job Selected:
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {jobs.find((job) => job.id === selectedJob)?.title || 'Loading...'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/manage-assessment/${selectedJob}`)}
              sx={{
                width: '100%',
                padding: '10px',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Manage Assessment
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Instruction or additional content */}
      <Typography variant="body2" sx={{
        marginTop: 4,
        maxWidth: 600,
        textAlign: 'center',
        color: 'text.secondary',
        fontSize: '1rem',
        fontStyle: 'italic',
      }}>
        Once a job is selected, you'll be redirected to a page where you can manage its assessments, including adding or editing questions for the applicants.
      </Typography>
    </Box>
  );
};

export default AssessmentPage;
