import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const EnhancedJobCard = ({ job, onEdit, onDelete }) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/job/${job.id}`);
    };

    const handleDescriptionOpen = () => {
        setIsDescriptionOpen(true);
    };

    const handleDescriptionClose = () => {
        setIsDescriptionOpen(false);
    };

    return (
        <>
            <Card
                sx={{
                    maxWidth: { xs: '100%', sm: 345 },
                    margin: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    },
                    borderRadius: '15px',
                    height: { xs: 'auto', sm: '450px' },
                    overflow: 'hidden',
                    position: 'relative',
                    padding: { xs: '12px', sm: '16px' },
                }}
            >
                <CardContent
                    sx={{
                        flex: '1 1 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#333',
                    }}
                >
                    {/* Job Title */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1a73e8',
                            marginBottom: '8px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                        }}
                    >
                        {job.title}
                    </Typography>

                    {/* Brief Description */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            lineHeight: '1.6',
                            fontSize: { xs: '0.85rem', sm: '0.95rem' },
                            color: '#555',
                            marginBottom: '8px',
                        }}
                    >
                        <p style={{ color: "blue", fontSize: "12px" }}>Description:</p>
                        {job.description.slice(0, 70)}...
                        <span style={{ fontSize: "10px", color: "blue", cursor: 'pointer' }} onClick={handleDescriptionOpen}>
                            Read More
                        </span>
                    </Typography>

                    {/* Additional Info */}
                    <Box sx={{ display: 'flex-col', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ padding: '5px 0' }}>
                            Location: <strong>{job.location}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ padding: '5px 0' }}>
                            Type: <strong>{job.type}</strong>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex-col', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ padding: '5px 0' }}>
                            Remote: <strong>{job.isRemote ? "Yes" : "No"}</strong>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, fontWeight: 'bold', color: '#333', padding: '5px 0' }}
                        >
                            Candidates Applied: {job.candidates}
                        </Typography>
                    </Box>
                </CardContent>

                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: { xs: 'center', sm: 'space-between' },
                        flexDirection: { xs: 'row', sm: 'row' },
                        gap: { xs: 1, sm: 2 },
                        padding: { xs: '8px', sm: '16px' },
                        paddingTop: 0,
                    }}
                >
                    <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={onEdit}
                        sx={{
                            padding: { xs: '4px 8px', sm: '6px 16px' },  // Smaller padding on mobile
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }  // Smaller font size on mobile
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={onDelete}
                        sx={{
                            padding: { xs: '4px 8px', sm: '6px 16px' },  // Smaller padding on mobile
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }  // Smaller font size on mobile
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={handleViewDetails}
                        sx={{
                            padding: { xs: '4px 8px', sm: '6px 16px' },  // Smaller padding on mobile
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }  // Smaller font size on mobile
                        }}
                    >
                        View
                    </Button>
                </CardActions>


            </Card>

            {/* Dialog for Full Job Description */}
            <Dialog
                open={isDescriptionOpen}
                onClose={handleDescriptionClose}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    Job Description
                    <IconButton
                        aria-label="close"
                        onClick={handleDescriptionClose}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1" color="text.secondary">
                        {job.description}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EnhancedJobCard;
