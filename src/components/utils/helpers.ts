import axios from 'axios';

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export async function fetchUsers(token: string): Promise<User[]> {
  try {
    const response = await axios.get('http://localhost:5005/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function deleteUser(id: string, token: string): Promise<void> {
  try {
    await axios.delete(`http://localhost:5005/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

 export interface LoginDto {
    email: string;
    password: string;
  }
  
 export interface ICredentials {
    token: string;
    user: User;
  }
  
 export interface CreateUserDto {
    fullName: string;
    email: string;
    password: string;
  }
  
 export interface UpdateUserDto {
    id: string;
    fullName?: string;
    email?: string;
  }
  
