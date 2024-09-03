import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../styles/addrecord.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AddRecordProps, DataItem } from '../types';

export const AddRecord: React.FC<AddRecordProps> = ({ onSave, onCancel }) => {
  const { logout } = useAuth();
  const { state } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DataItem>({
    id: 0, // предполагаю что id дается сервером
    companySigDate: new Date().toISOString(),
    companySignatureName: 'test',
    documentName: 'test',
    documentStatus: 'test',
    documentType: 'test',
    employeeNumber: 'test',
    employeeSigDate: new Date().toISOString(),
    employeeSignatureName: 'test',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const tokenFromStorage = localStorage.getItem('token');
    if (!tokenFromStorage || state.isAuthenticated !== true) {
      setError('You are not authorized to create records.');
      toast.error('You are not authorized to create records.');
      logout();
      navigate('/');
      return;
    }

    try {
      const response = await axios.post('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create', formData, {
        headers: { 'x-auth': tokenFromStorage },
      });

      if (response.status === 200) {
        onSave(response.data.data);
        toast.success('Успешно создали запись');
      } else {
        setError('Failed to create record');
      }
    } catch (err) {
      setError('An error occurred while creating the record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-record-container">
      <h2>Add New Record</h2>
      <form onSubmit={handleSubmit}>
        <section>
            <h4>companySigDate</h4>
            <input
                type="datetime-local"
                name="companySigDate"
                placeholder="Company Signature Date"
                value={new Date(formData.companySigDate).toISOString().slice(0, 16)}
                onChange={handleChange}
                required
            />
        </section>

        <section>
            <h4>companySignatureName</h4>
            <input
                type="text"
                name="companySignatureName"
                placeholder="Company Signature Name"
                value={formData.companySignatureName}
                onChange={handleChange}
                required
            />
        </section>

        <section>
            <h4>documentName</h4>
            <input
                type="text"
                name="documentName"
                placeholder="Document Name"
                value={formData.documentName}
                onChange={handleChange}
                required
            />
        </section>

        <section>
            <h4>documentStatus</h4>
            <input
                type="text"
                name="documentStatus"
                placeholder="Document Status"
                value={formData.documentStatus}
                onChange={handleChange}
                required
            />
        </section>

        <section>
            <h4>documentType</h4>
            <input
                type="text"
                name="documentType"
                placeholder="Document Type"
                value={formData.documentType}
                onChange={handleChange}
                required
            />
        </section>

        <section>
            <h4>employeeNumber</h4>
            <input
                type="text"
                name="employeeNumber"
                placeholder="Employee Number"
                value={formData.employeeNumber}
                onChange={handleChange}
                required
            />
        </section>

        <section>
            <h4>employeeSigDate</h4>
            <input
                type="datetime-local"
                name="employeeSigDate"
                placeholder="Employee Signature Date"
                value={new Date(formData.employeeSigDate).toISOString().slice(0, 16)}
                onChange={handleChange}
                required
            />
        </section>

        <section>
            <h4>employeeSignatureName</h4>
            <input
                type="text"
                name="employeeSignatureName"
                placeholder="Employee Signature Name"
                value={formData.employeeSignatureName}
                onChange={handleChange}
                required
            />
        </section>
        {error && <p className="error">{error}</p>}

        <div className='buttons_section'>
        <button type="submit" disabled={loading} className='savebut'>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} className='cancelbut'>
          Cancel
        </button>
        </div>

      </form>
    </div>
  );
};
