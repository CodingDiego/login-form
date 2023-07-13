import React from 'react';
import { Paper, Avatar, TextField, Button, Typography, Link, Grid, FormControlLabel, Checkbox } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginDto {
  email: string;
  password: string;
}

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const history = useNavigate();

  const [loginData, setLoginData] = React.useState<LoginDto>({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5005/auth/login', loginData);
      const { token, user } = response.data;

      // Almacenar las credenciales en el almacenamiento local (localStorage)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Actualizar el token en el componente padre
      setToken(token);

      // Redireccionar a la página de inicio
      history('/home');
    } catch (error) {
      // Manejar los errores de la solicitud aquí
      console.error('Login failed:', error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
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
          <Grid item sx={{ width: '80%', maxWidth: '400px' }}>
            <TextField
              label="Email"
              placeholder="Enter email"
              fullWidth
              required
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </Grid>
          <Grid item sx={{ width: '80%', maxWidth: '400px' }}>
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
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

const paperStyle = {
  padding: '15px 15px',
  height: '83vh',
  width: '100%',
  maxWidth: '400px',
  margin: '15px auto',
  justifyContent: 'center',
  borderRadius: '10px',
  '@media (min-width: 600px)': {
    height: '100vh',
    maxWidth: '500px',
  },
  '@media (max-width: 480px)': {
    height: '100vh',
    width: '100%',
    maxWidth: '500px',
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

export default Login;
