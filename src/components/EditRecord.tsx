import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DataItem, EditRecordProps } from '../types';
import Loader from '../pages/Loader';

export const EditRecord: React.FC<EditRecordProps> = ({ item, onCancel, onSave }) => {
  const { state: { token }, logout } = useAuth();
  const [formData, setFormData] = useState<DataItem>(item);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();
  const navigate = useNavigate();

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
      navigate('/pryaniktask');
      return;
    }

    try {
      const response = await axios.post(`https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/set/${item.id}`, formData, {
        headers: { 'x-auth': token },
      });

      if (response.data.error_code === 0) {
        onSave(response.data.data);
        toast.success('Запись успешно обновлена');
      } else {
        setError('Failed to update record');
      }
    } catch (err) {
      setError('An error occurred while updating the record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-record-container">
      <h2>Edit Record</h2>
      <form onSubmit={handleSubmit}>
        <section>
          <h4>Company Signature Date</h4>
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
          <h4>Company Signature Name</h4>
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
          <h4>Document Name</h4>
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
          <h4>Document Status</h4>
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
          <h4>Document Type</h4>
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
          <h4>Employee Number</h4>
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
          <h4>Employee Signature Date</h4>
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
          <h4>Employee Signature Name</h4>
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

        <div className="buttons_section">
        <button type="submit" disabled={loading} className='savebut'>
          {loading ? <Loader /> : 'Save'}
        </button>

        <button type="button" onClick={onCancel} className='cancelbut'>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
};
