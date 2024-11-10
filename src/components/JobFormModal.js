import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';  // Import useDispatch
import { addJob } from '../store';  // Import the addJob action

const JobFormModal = ({ open, onClose, job }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [candidates, setCandidates] = useState(0);
    const dispatch = useDispatch();  // Initialize dispatch function

    useEffect(() => {
        if (job) {
            setTitle(job.title);
            setDescription(job.description);
            setCandidates(job.candidates);
        } else {
            setTitle('');
            setDescription('');
            setCandidates(0);
        }
    }, [job]);

    const handleSubmit = () => {
        // Generate dummy applicants based on number of candidates entered
        const dummyApplicants = Array.from({ length: candidates }, (_, index) => ({
            id: index + 1,
            name: `Candidate ${index + 1}`,
            email: `candidate${index + 1}@example.com`,
            contact: `+100000000${index + 1}`,
            skills: ['Skill 1', 'Skill 2'],
            experience: '1 year',
            resume: 'link_to_resume.pdf',
            applicationDate: new Date().toISOString().split('T')[0], // Current date
            status: 'Under Review',
        }));

        // Dispatch the action to add the job with the dummy applicants
        dispatch(addJob({
            id: job ? job.id : Date.now(),
            title,
            description,
            candidates,
            applicants: dummyApplicants,  // Add the generated candidates
        }));

        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box style={{ padding: '20px', backgroundColor: 'white', margin: '50px auto', maxWidth: 400 }}>
                <TextField
                    label="Job Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />
                <TextField
                    label="Candidates Applied"
                    type="number"
                    value={candidates}
                    onChange={(e) => setCandidates(Number(e.target.value))}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    style={{ marginTop: '10px' }}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default JobFormModal;
