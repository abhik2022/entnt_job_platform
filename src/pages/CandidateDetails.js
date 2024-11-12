
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { updateCandidateStatus } from '../store/store';
import CandidateCard from '../components/CandidateCard';

const CandidateDetails = () => {
  const { jobId, candidateId } = useParams();
  const dispatch = useDispatch();

  const job = useSelector(state => state.jobs.find(job => job.id === parseInt(jobId)));
  const candidate = job ? job.applicants.find(cand => cand.id === parseInt(candidateId)) : null;

  const [status, setStatus] = useState(candidate ? candidate.status : '');

  useEffect(() => {
    if (candidate) {
      setStatus(candidate.status);
    }
  }, [candidate]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    dispatch(updateCandidateStatus({ jobId: parseInt(jobId), candidateId: parseInt(candidateId), status: e.target.value }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {candidate ? (
        <>
          <Typography variant="h4" color="primary" gutterBottom>
            Candidate Details
          </Typography>
          <Box sx={{ mt: 3 }}>
            <CandidateCard 
              candidate={candidate} 
              status={status} 
              handleStatusChange={handleStatusChange} 
            />
          </Box>
        </>
      ) : (
        <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
          Candidate not found!
        </Typography>
      )}
    </Container>
  );
};

export default CandidateDetails;
