import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#1565c0',
                color: '#fff',
                padding: '20px',
                textAlign: 'center',
                marginTop: '40px',
                borderTop: '2px solid #fff',
                position: 'relative',
                bottom: 0,
                width: '100%',
            }}
        >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                &copy; 2024 Job Portal. All rights reserved.
            </Typography>
            <Typography variant="body2">
                Designed by <Link href="https://yourwebsite.com" color="inherit">Your Company</Link>
            </Typography>
        </Box>
    );
};

export default Footer;
