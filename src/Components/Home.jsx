import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';

import Navb from './Nav';

const Home = () => {
  const theme = useTheme(); 

  return (
    <div>
      <Navb/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', 
          marginTop:"-80px",
          textAlign: 'center',
          backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, #ffffff)`, 
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bolder', fontFamily: 'sans-serif' }}>
          Sell More. Pay Less. <br /> Grow Fast 🚀
        </Typography>
        <Typography variant="h5" gutterBottom style={{ padding: '0 10%' }}>
          Erino CRM: Sales, service, and journey building tools to 2X your growth.
          <br />
           Start in less than 5 minutes and see instant results.
        </Typography>
        <Button
          variant="h6"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: "ActiveBorder", 
            borderRadius: '10px',
            padding: '15px',
            fontSize: [theme.typography.fontSize.h6, theme.typography.fontSize.h4], 
            
          }}
          href="https://erino.io/contact/"
        >
          Try Erino for Free {'>'}
        </Button>
      </Box>
    </div>
  );
};

export default Home;
