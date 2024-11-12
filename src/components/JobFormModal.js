

import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, FormHelperText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { addJob, editJob } from '../store/store';

const JobFormModal = ({ open, onClose, job }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [candidates, setCandidates] = useState(0);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs);

    useEffect(() => {
        if (job) {
            setTitle(job.title);
            setDescription(job.description);
            setCandidates(job.candidates);
        } else {
            resetFormFields();  // Reset fields for a new job
        }
    }, [job]);

    const resetFormFields = () => {
        setTitle('');
        setDescription('');
        setCandidates(0);
        setErrors({});
    };

    const handleSubmit = () => {
        const newErrors = {};
        if (!title) newErrors.title = 'Job Title is required';
        if (!description) newErrors.description = 'Description is required';
        if (candidates <= 0) newErrors.candidates = 'At least 1 candidate is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const isJobExists = jobs.some(existingJob => existingJob.title.toLowerCase() === title.toLowerCase() && existingJob.id !== job?.id);
        if (isJobExists) {
            alert('Job with this title already exists. Please choose a different title.');
            return;
        }

        const dummyApplicants = Array.from({ length: candidates }, (_, index) => ({
            id: index + 1,
            name: `Candidate ${index + 1}`,
            email: `candidate${index + 1}@example.com`,
            contact: `+100000000${index + 1}`,
            skills: ['Skill 1', 'Skill 2'],
            experience: '1 year',
            resume: 'link_to_resume.pdf',
            applicationDate: new Date().toISOString().split('T')[0],
            status: 'Under Review',
        }));

        if (job) {
            dispatch(editJob({ id: job.id, title, description, candidates, applicants: dummyApplicants }));
        } else {
            dispatch(addJob({ id: Date.now(), title, description, candidates, applicants: dummyApplicants }));
        }

        resetFormFields();  // Clear fields after saving
        onClose();  // Close the modal
    };

    return (
        <Modal open={open} onClose={() => { onClose(); resetFormFields(); }}>
            <Box
                sx={{
                    position: 'relative',
                    padding: 3,
                    backgroundColor: 'white',
                    margin: '50px auto',
                    maxWidth: 400,
                    borderRadius: 2,
                }}
            >
                <IconButton
                    onClick={() => { onClose(); resetFormFields(); }}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'grey.500',
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <TextField
                    label="Job Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    required
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    label="Candidates Applied"
                    type="number"
                    value={candidates}
                    onChange={(e) => setCandidates(Number(e.target.value))}
                    fullWidth
                    margin="normal"
                    required
                    error={!!errors.candidates}
                    helperText={errors.candidates}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2, width: '100%' }}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default JobFormModal;
