import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { EditRecord } from './EditRecord';
import { AddRecord } from './AddRecord';
import '../styles/dataTable.css';
import { DeleteConfirm } from './DeleteConfirm';
import { toast } from 'react-toastify';
import { DataItem } from '../types';
import Links from '../pages/Links';
import Loader from '../pages/Loader';

export const DataTable: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state: { token }, logout } = useAuth();
  const { state } = useAuth();
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/pryaniktask');
    }
  }, [state.isAuthenticated, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get', {
          headers: { 'x-auth': token },
        });
        setData(response.data.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (id: number) => {
    const tokenFromStorage = localStorage.getItem('token');
    if (!tokenFromStorage || state.isAuthenticated !== true) {
      setError('You are not authorized to create records.');
      toast.error('You are not authorized to create records.');
      logout();
      navigate('/pryaniktask');
      return;
    }

    try {
      await axios.post(`https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {}, {
        headers: { 'x-auth': token },
      });
      setData(data.filter(item => item.id !== id));
      setDeleteItemId(null);
      toast.success('Вы успешно удалили запись')
    } catch (err) {
      setError('Failed to delete record');
    }
  };

  const handleEdit = (item: DataItem) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleSaveEdit = (updatedItem: DataItem) => {
    setData(data.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItem(null);
  };

  const handleAddNew = () => {
    setAddingNew(true);
  };

  const handleCancelAdd = () => {
    setAddingNew(false);
  };

  const handleSaveNew = (newItem: DataItem) => {
    setData([...data, newItem]);
    setAddingNew(false);
  };

  const handleLogout = () => {
    logout(); 
    navigate('/pryaniktask');
  };

  return (
    <div className='table_component'>
      <div className="table-container">
        <h2>Data Table</h2>
      {addingNew ? (
        <AddRecord onSave={handleSaveNew} onCancel={handleCancelAdd} />
      ) : editingItem ? (
        <EditRecord item={editingItem} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : error ? (
            <p className="error">{error}</p>
          ) : data.length === 0 ? (
            <div>
              <p>Записей увы нет :(</p>
              <p>Но все можно исправить нажав чудесную кнопку</p>
              <button className='newRecord' onClick={handleAddNew}>чудо кнопка</button>
            </div>
          ) : (
            <>
              <button className='newRecord' onClick={handleAddNew}>Add New Record</button>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Company Signature Date</th>
                    <th>Company Signature Name</th>
                    <th>Document Name</th>
                    <th>Document Status</th>
                    <th>Document Type</th>
                    <th>Employee Number</th>
                    <th>Employee Signature Date</th>
                    <th>Employee Signature Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{new Date(item.companySigDate).toLocaleString()}</td>
                      <td>{item.companySignatureName}</td>
                      <td>{item.documentName}</td>
                      <td>{item.documentStatus}</td>
                      <td>{item.documentType}</td>
                      <td>{item.employeeNumber}</td>
                      <td>{new Date(item.employeeSigDate).toLocaleString()}</td>
                      <td>{item.employeeSignatureName}</td>
                      <td className='buttons'>
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => setDeleteItemId(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <button className='logout' onClick={handleLogout}>logout</button>
        </>
      )}
      {deleteItemId !== null && (
        <DeleteConfirm
          id={deleteItemId}
          onConfirm={() => handleDelete(deleteItemId)}
          onCancel={() => setDeleteItemId(null)}
        />
      )}
    </div>
      <Links />
    </div>
  );
};
