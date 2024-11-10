import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Container, MenuItem, FormControl, Select, InputLabel, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { updateCandidateStatus } from '../store';

const CandidateDetails = () => {
  const { jobId, candidateId } = useParams();
  const dispatch = useDispatch();

  // Find the job from Redux store using jobId
  const job = useSelector(state => state.jobs.find(job => job.id === parseInt(jobId)));
  
  // Find the candidate from the job's applicants using candidateId
  const candidate = job ? job.applicants.find(cand => cand.id === parseInt(candidateId)) : null;

  const [status, setStatus] = useState(candidate ? candidate.status : '');

  useEffect(() => {
    if (candidate) {
      setStatus(candidate.status); // Set initial status if candidate exists
    }
  }, [candidate]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    dispatch(updateCandidateStatus({ jobId: parseInt(jobId), candidateId: parseInt(candidateId), status: e.target.value }));
  };

  return (
    <Container>
      {candidate ? (
        <>
          <Card>
            <CardContent>
              <Typography variant="h4">{candidate.name}</Typography>
              <Typography variant="h6" color="textSecondary">{candidate.email}</Typography>
              <Typography variant="body1">Contact: {candidate.contact}</Typography>
              <Typography variant="body1">Skills: {candidate.skills}</Typography>
              <Typography variant="body1">Experience: {candidate.experience}</Typography>

              {/* Resume Link */}
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                <a href={candidate.resume} target="_blank" rel="noopener noreferrer">
                  <Button variant="contained" color="primary">Download Resume</Button>
                </a>
              </Typography>

              {/* Status Dropdown */}
              <FormControl fullWidth style={{ marginTop: '20px' }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="Under Review">Under Review</MenuItem>
                  <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
                  <MenuItem value="Hired">Hired</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </>
      ) : (
        <Typography variant="h6">Candidate not found!</Typography>
      )}
    </Container>
  );
};

export default CandidateDetails;
