
import React, { useEffect, useState } from 'react';
import {MainForm} from '../components/Form';
import Typography from '@mui/material/Typography';


const Home = () => {
    return (
        <div>
        <Typography variant="h2">UMich Dining Facts Calculator</Typography>
        <MainForm /> {MainForm.value}
        </div>
    );
}

export default Home;