
import React, { useState } from 'react';
import { Button, Typography, Card, CardContent, FormControl, Select, MenuItem, InputLabel, Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { FileDownload, Visibility } from '@mui/icons-material';

const CandidateCard = ({ candidate, status, handleStatusChange }) => {
  const [openPreview, setOpenPreview] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);

  // Demo Google Drive link for the resume
  const demoResumeLink = "https://drive.google.com/file/d/1vTw59hpxYZ5c8vlhL0_EgNTkrErLWBf7/view?usp=sharing";

  // Handle Resume Preview
  const handlePreviewOpen = () => setOpenPreview(true);
  const handlePreviewClose = () => setOpenPreview(false);

  // Handle Status Change with Confirmation
  const handleStatusChangeWithConfirmation = (event) => {
    setSelectedStatus(event.target.value);
    setOpenStatusDialog(true);
  };

  const confirmStatusChange = () => {
    handleStatusChange(selectedStatus);
    setOpenStatusDialog(false);
  };

  const cancelStatusChange = () => setOpenStatusDialog(false);

  return (
    <Card sx={{ p: 3, borderRadius: 2, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
          {candidate.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          {candidate.email}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          Contact: <span style={{ fontWeight: 500 }}>{candidate.contact}</span>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          Skills: <span style={{ fontWeight: 500 }}>{candidate.skills}</span>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          Experience: <span style={{ fontWeight: 500 }}>{candidate.experience}</span>
        </Typography>

        {/* Resume Preview and Download */}
        <Box sx={{ mt: 2 }}>
          <IconButton onClick={handlePreviewOpen} color="primary" sx={{ width: '100%' }}>
            <Visibility sx={{ mr: 1 }} />
            Preview Resume
          </IconButton>
          <a href={demoResumeLink} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              <FileDownload sx={{ mr: 1 }} />
              Download Resume
            </Button>
          </a>
        </Box>

        {/* Status Dropdown with Confirmation */}
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={handleStatusChangeWithConfirmation}
            variant="outlined"
          >
            <MenuItem value="Under Review">Under Review</MenuItem>
            <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
            <MenuItem value="Hired">Hired</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </CardContent>

      {/* Resume Preview Dialog */}
      <Dialog open={openPreview} onClose={handlePreviewClose} maxWidth="md" fullWidth>
        <DialogTitle>Resume Preview</DialogTitle>
        <DialogContent>
          <iframe
            src={`https://drive.google.com/file/d/1vTw59hpxYZ5c8vlhL0_EgNTkrErLWBf7/preview`} 
            width="100%"
            height="500px"
            title="Resume Preview"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePreviewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Change Confirmation Dialog */}
      <Dialog open={openStatusDialog} onClose={cancelStatusChange}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to change the candidate status to <strong>{selectedStatus}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelStatusChange} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmStatusChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CandidateCard;
