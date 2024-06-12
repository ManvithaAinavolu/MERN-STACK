import React, { useState } from 'react';
import './View.css';
import { getExpense, ExpenseData, deleteExpense, updateExpense } from '../../ApiCalls';
import { Link } from 'react-router-dom';

function View() {
    const [email, setEmail] = useState<string>('');
    const [expenses, setExpenses] = useState<ExpenseData[]>([]);
    const [msg,setMsg]=useState('');
    const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(null);
    const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState<boolean>(false);
    const [updatedExpenseFields, setUpdatedExpenseFields] = useState<Partial<ExpenseData>>({});

    const getData = async () => {
        try {
            const result = await getExpense(email);
            const res=result.length
            console.log("res",res)
        
            if(res===0)
                {
                    setMsg("NO EXPENSES FOUND WITH THIS EMAIL ID>> PLAESE ADD AN EXPENSE!")
                }
                else if(email==' '){
                    setMsg('PLEASE ENTER YOUR EMAIL ID TO VIEW YOUR EXPENSES!')
                }
                console.log(result)
            setExpenses(result);
        } catch (err) {
            console.error('Error fetching expenses:', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteExpense(id);
            setExpenses(expenses.filter(expense => expense._id !== id));
            console.log('Expense deleted successfully');
        } catch (err) {
            console.error('Error deleting expense:', err);
        }
    };

    const handleUpdatePopupOpen = (expense: ExpenseData) => {
        setSelectedExpense(expense);
        setIsUpdatePopupOpen(true);
        setUpdatedExpenseFields({});
    };

    const handleUpdatePopupClose = () => {
        setIsUpdatePopupOpen(false);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedExpense) {
            try {
                const updatedExpense = await updateExpense(selectedExpense._id, updatedExpenseFields);
                setExpenses(expenses.map(exp => exp._id === selectedExpense._id ? updatedExpense : exp));
                setIsUpdatePopupOpen(false);
                console.log('Expense updated successfully');
            } catch (err) {
                console.error('Error updating expense:', err);
            }
        }
    };

    return (
        <div className='container4'>
            <label>Email id</label>
            <input
                className='input-container1'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Id"
            />
            
            {msg && <p className='msg'>{msg}<Link to='/'>CLICK HERE</Link></p>}
            <button className='get' onClick={getData}>Get Expense Data</button>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses && expenses.map((expense: ExpenseData, index: number) => (
                            <tr key={expense._id}>
                                <td>{expense.title}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.date ? new Date(expense.date).toLocaleDateString() : 'N/A'}</td>
                                <td>{expense.description}</td>
                                <td><button onClick={() => handleUpdatePopupOpen(expense)}>Update</button></td>
                                <td><button onClick={() => handleDelete(expense._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isUpdatePopupOpen && selectedExpense && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleUpdatePopupClose}>&times;</span>
                        <h2>Update Expense</h2>
                        <form onSubmit={handleUpdate}>
                            <label>Title</label>
                            <input
                                type="text"
                                value={updatedExpenseFields.title || selectedExpense.title}
                                onChange={(e) => setUpdatedExpenseFields({ ...updatedExpenseFields, title: e.target.value })}
                            />
                            <label>Amount</label>
                            <input
                                type="number"
                                value={updatedExpenseFields.amount || selectedExpense.amount}
                                onChange={(e) => setUpdatedExpenseFields({ ...updatedExpenseFields, amount: parseFloat(e.target.value) })}
                            />
                            <label>Category</label>
                            <input
                                type="text"
                                value={updatedExpenseFields.category || selectedExpense.category}
                                onChange={(e) => setUpdatedExpenseFields({ ...updatedExpenseFields, category: e.target.value })}
                            />
                            <label>Date</label>
                            <input
                                type="date"
                                value={updatedExpenseFields.date ? new Date(updatedExpenseFields.date).toISOString().split('T')[0] : new Date(selectedExpense.date).toISOString().split('T')[0]}
                                onChange={(e) => setUpdatedExpenseFields({ ...updatedExpenseFields, date: new Date(e.target.value) })}
                            />
                            <label>Description</label>
                            <input
                                type="text"
                                value={updatedExpenseFields.description || selectedExpense.description}
                                onChange={(e) => setUpdatedExpenseFields({ ...updatedExpenseFields, description: e.target.value })}
                            />
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default View;
