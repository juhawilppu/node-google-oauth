import React from 'react';
import { Button } from '@material-ui/core';

const Landing  = () => (
    <div>
      <h2>Welcome to node-google-oauth</h2>
      <div>Test project using NodeJS, Google OAuth 2.0, MongoDB, React, Redux and SendGrid.</div>
      <div style={{marginTop: '50px'}}><Button href="/auth/google" variant="contained" color="primary">Login with Google</Button></div>
    </div>
)

export default Landing;