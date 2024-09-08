import React, { useState, useEffect } from 'react';
import '../pages/inquiries.css';

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUpdateFlag = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Re-fetch the inquiries to update the state
        fetchInquiries();
        alert('Inquiry marked as reviewed.');
      } else {
        throw new Error('Failed to update inquiry flag');
      }
    } catch (error) {
      console.error('Error updating inquiry flag:', error);
      alert('An error occurred while updating the inquiry flag.');
    }
  };
  
  // Refactor fetchInquiries into its own function
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      } else {
        throw new Error('Failed to fetch inquiries');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Call fetchInquiries when the component mounts
  useEffect(() => {
    fetchInquiries();
  }, []);
  

  if (loading) return <p>Loading inquiries...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='inquiries-container'>
      <h2>Inquiries</h2>
      <div className='inquiries-list'>
        {inquiries.map((inquiry) => (
          <div className='inquiry-card' key={inquiry._id}>
            <p><strong>Name:</strong> {inquiry.name}</p>
            <p><strong>Email:</strong> {inquiry.email}</p>
            <p><strong>Message:</strong> {inquiry.message}</p>
             {inquiry.readFlag ? <p><strong style={{
              color:'green'
             }}> REVIEWED</strong></p> : 
            <button onClick={() => handleUpdateFlag(inquiry._id)}>Mark as reviewed</button>}
          </div>
        ))}

      </div>
    </div>
  );
}





