import React, { useState } from 'react';

function App() {
  const [inputs, setInputs] = useState({
    acceleration: '',
    top_speed: '',
    range_km: '',
    fast_charge_speed: '',
    segment: '',
  });

  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputs }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  return (
    <div>
      <h1>EV Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        {/* Include your form inputs here */}
        <button type="submit">Predict!</button>
      </form>
      <h2>Prediction: {prediction}</h2>
    </div>
  );
}

export default App;

