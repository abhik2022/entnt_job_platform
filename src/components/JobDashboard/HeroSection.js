
// src/components/JobDashboard/HeroSection.js
import React from 'react';
import { Box, Button, Stack, Typography , Grid} from '@mui/material';
import { motion } from 'framer-motion';
import hero from "../../assets/hero.png";

const HeroSection = ({ onAddJob }) => (
    <Stack direction="row" spacing={4} sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '50px', padding:'25px' }}>
       <Grid
            container
            spacing={2}
            sx={{
                padding: '0px',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Welcome Text Section */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    paddingRight: { md: '40px' },
                    textAlign: { xs: 'center', md: 'left' },
                }}
            >
                <Typography
                    variant="h2"
                    color="#1565c0"
                    sx={{
                        fontWeight: 'bold',
                        marginTop: '45px',
                        marginBottom: '20px',
                    }}
                >
                    Welcome to Your Job Portal!
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        lineHeight: 1.6,
                        marginBottom: '35px',
                    }}
                >
                    "Discover opportunities that align with your career aspirations and take the next step in achieving your goals."
                </Typography>
                <Button
                    variant="contained"
                    onClick={onAddJob}
                    sx={{
                        padding: '12px 25px',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        borderRadius: '10px',
                        marginTop: '20px',
                        backgroundColor: '#1976d2',
                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                        '&:hover': { backgroundColor: '#4d90fe' },
                    }}
                >
                    Add New Job
                </Button>
            </Grid>

            {/* Image Section */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: { xs: '20px', md: '0' },
                }}
            >
                <motion.img
                    src={hero}
                    alt="Job portal illustration"
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '20px',
                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                    }}
                    whileHover={{
                        scale: 1.05,
                        y: -10,
                        transition: { duration: 0.6, repeat: Infinity, repeatType: 'reverse' },
                    }}
                />
            </Grid>
        </Grid>
    </Stack>
);

export default HeroSection;
