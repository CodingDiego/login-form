import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

interface EditUserProps {
  token: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface UpdateUserDto {
  id: string;
  fullName: string;
  email: string;
}

const EditUser: React.FC<EditUserProps> = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const { user } = location.state || {};
    if (user) {
      setUser(user);
      setFullName(user.fullName);
      setEmail(user.email);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateUserDto: UpdateUserDto = {
      id: user!.id,
      fullName,
      email,
    };

    try {
      await axios.put('http://localhost:5005', updateUserDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/home'); // Redirect to the home page
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle the error accordingly, such as displaying an error message.
    }
  };

  if (!user) {
    return (
      <Grid container justifyContent="center">
        <Typography variant="h6">Loading...</Typography>
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Edit User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Update User
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditUser;
