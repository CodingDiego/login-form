import React from 'react';
import { Paper, Avatar, TextField, Button, Typography, Link, Grid, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useMutation } from 'react-query';

interface LoginDto {
  username: string;
  password: string;
}

const loginMutation = async (credentials: LoginDto) => {
  // Your login mutation code here
};

const Login = () => {
  const desktopStyle = {
    padding: '30px 20px',
    height: '60vh',
    width: '400px',
    margin: '10px auto',
    '@media (min-width: 960px)': {
      maxWidth: '600px',
      maxHeight: '600px',
    },
  };

  const mobileStyle = {
    padding: '30px 20px',
    height: '100vh',
    width: '100%',
    maxWidth: '300px',
    maxHeight: 'calc(100vh - 120px)',
    margin: '10px auto',
    overflow: 'hidden',
  };

  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };

  const mutation = useMutation(loginMutation, {
    mutationKey: 'login',
  });

  const handleLogin = () => {
    const dto: LoginDto = {
      username: 'user@mail.com',
      password: 'test1234',
    };

    mutation.mutate(dto);
  };

  const isMobileView = window.innerWidth <= 480;

  return (
    <Grid container justifyContent="center">
      <Paper elevation={10} style={isMobileView ? mobileStyle : desktopStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5" align="center">
            Sign In
          </Typography>
        </Grid>
        <TextField label="Username" placeholder="Enter username" fullWidth required />
        <TextField label="Password" placeholder="Enter password" type="password" fullWidth required />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnStyle}
          fullWidth
          onClick={handleLogin}
        >
          Sign in
        </Button>
        <Typography sx={{ fontSize: '0.9rem' }}>
          <Link href="#">Forgot password?</Link>
        </Typography>
        <Typography sx={{ fontSize: '0.9rem' }}>
          Do you have an account? <Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
      </Paper>
    </Grid>
  );
};

export default Login;
