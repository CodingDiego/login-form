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
  const paperStyle = {
    padding: '24px 15px',
    height: '84vh',
    width: '400px',
    margin: '15px auto',
    justifyContent: 'center',
    '@media (min-width: 600px)': {
      height: '100vh',
    },
    '@media (max-width: 480px)': {
      height: '100vh',
      width: '100%',
      maxWidth: '300px',
      maxHeight: 'calc(100vh - 115px)',
      overflow: 'hidden',
    },
  };

  const avatarStyle = {
    backgroundColor: '#1bbd7e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const btnStyle = { margin: '8px 0' };

  const handleLogin = () => {
    const dto = {
      username: 'user@mail.com',
      password: 'test1234',
    };

    //La login mutation
    console.log('Perform login with:', dto);
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2.3}>
          <Grid item>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography component="h2" variant="h5" align="center">
              Sign In
            </Typography>
          </Grid>
          <Grid item>
            <TextField label="Username" placeholder="Enter username" fullWidth required sx={{width: '110%'}} />
          </Grid>
          <Grid item>
            <TextField label="Password" placeholder="Enter password" type="password" fullWidth required sx={{width: '110%'}} />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: '0.9rem' }}>
              <Link href="#">Forgot password?</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: '0.9rem' }}>
              Do you have an account? <Link href="#">Sign Up</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
