import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchUsers, deleteUser } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  id: string;
  fullName: string;
  email: string;
}

interface HomeProps {
  token: string;
}

const Home: React.FC<HomeProps> = ({ token }) => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers(token);
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id, token);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = () => {
    navigate('/CreateUser');
  };

  const handleEditUser = (user: UserProps) => {
    navigate('/EditUser', { state: { user } });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h4" align="center" mb={3}>
            User List
          </Typography>
          {users.map(user => (
            <Accordion key={user.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{user.fullName}</Typography>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditUser(user)}
                  sx={{ marginLeft: 'auto' }}
                >
                  <EditIcon />
                </IconButton>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Email: {user.email}</Typography>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteUser(user.id)}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button variant="contained" color="primary" onClick={handleAddUser} sx={{ mt: 2, ml: 4 }}>
            Add User
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;
