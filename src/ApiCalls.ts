import axios from 'axios';

interface Data {
  name: string;
  email: string;
  phone: number;
  password: string;
  cpassword: string;
}

interface ApiResponse {
  msg: string;
  data:any
}

export const registerUser = async (data: Data): Promise<ApiResponse> => {
  try {
    const res = await axios.post<ApiResponse>('http://localhost:5000/api/users/register', data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    } else {
      throw new Error('An error occurred during registration.');
    }
  }
};

export const loginUser = async (data: { email: string; password: string }): Promise<ApiResponse> => {
  try {
    const res = await axios.post<ApiResponse>('http://localhost:5000/api/users/login', data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg);
    } else {
      throw new Error('An error occurred during login.');
    }
  }
};

export interface ExpenseData {
  _id:string,
 email: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  description: string;
}



export const addExpense = async (expenseData: Partial<ExpenseData>) => {
  const response = await axios.post(`http://localhost:5000/api/exp/addExp`, expenseData);
  return response.data;
};
export const getExpense = async (email: string): Promise<ExpenseData[]> => {
  try {
    const res = await axios.get(`http://localhost:5000/api/exp/getExp/${email}`);
    return res.data;
  } catch (err) {
    throw new Error('An error occurred while fetching expenses.');
  }
};
export const deleteExpense = async (id: string) => {
  const response = await axios.delete(`http://localhost:5000/api/exp/deleteExp/${id}`);
  return response.data;
};
export const updateExpense = async (id: string, updatedData: Partial<ExpenseData>) => {
  const response = await axios.put<ExpenseData>(`http://localhost:5000/api/exp/updateExp/${id}`, updatedData);
  return response.data;
};