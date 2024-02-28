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
      const response = await fetch('http://127.0.0.1:5005/predict', {
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
    const { acceleration, top_speed, range_km, fast_charge_speed, segment } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [acceleration]: value, [top_speed]: value, [range_km]: value, [fast_charge_speed]: value, [segment]: value}));
  };

  return (
    <div>
      <h1>EV Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <form action="/predict" method="post">
          <label for="acceleration" onChange={handleChange}>Enter Acceleration in seconds: </label>
          <input type="text" name="acceleration" required="required" id="acceleration" />
          <label for="top_speed" onChange={handleChange}>Enter Top Speed in km/h: </label>
          <input type="text" name="top_speed" required="required" id="top_speed" />
          <label for="range_km" onChange={handleChange}>Enter Range in km: </label>
          <input type="text" name="range_km" required="required" id="range_km" />
          <label for="fast_charge_speed" onChange={handleChange}>Enter Fast Charge Speed in km/h:</label>
          <input type="text" name="fast_charge_speed" required="required" id="fast_charge_speed" />
          <label for="segment" onChange={handleChange}>Enter Segment:</label>
          <input type="text" name="segment" required="required" id="segment" />
          <button type="submit">Predict!</button>
        </form>
        <h2>Prediction: {prediction}</h2>
      </form>
    </div>
  );
}

export default App;

