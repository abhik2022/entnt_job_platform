import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md')); // Detect mobile screen sizes
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    // 
    return (
        <AppBar position="static" sx={{ backgroundColor: '#0d47a1',padding: { xs: '10px 15px', sm: '10px 30px' } }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <motion.img
                        src={logo}
                        alt="Logo"
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.1 }}
                    />
                    <Typography
                        variant="h6"
                        component={motion.div}
                        sx={{ fontWeight: 'bold', color: 'white', fontSize: { xs: '1.5rem', sm: '1.8rem' } }}
                        whileHover={{ color: '#b3e5fc', scale: 1.05 }}
                    >
                        Job Portal
                    </Typography>
                </Box>

                {isMobile ? (
                    // Mobile Menu Icon
                    <Box>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            sx={{ '& .MuiPaper-root': { backgroundColor: '#0d47a1', color: 'white' } }}
                        >
                            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                                Job Postings
                            </MenuItem>
                            <MenuItem component={Link} to="/assessment" onClick={handleMenuClose}>
                                Assessments
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    // Desktop Buttons
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Button
                            component={Link}
                            to="/"
                            sx={{
                                color: 'white',
                                fontWeight: 'medium',
                                fontSize: '1.1rem',
                                '&:hover': { color: '#b3e5fc', textDecoration: 'underline' },
                            }}
                        >
                            Job Postings
                        </Button>
                        <Button
                            component={Link}
                            to="/assessment"
                            sx={{
                                color: 'white',
                                fontWeight: 'medium',
                                fontSize: '1.1rem',
                                '&:hover': { color: '#b3e5fc', textDecoration: 'underline' },
                            }}
                        >
                            Assessments
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
