// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import waves from './waves.json';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [model, setModel] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleNavigate = async (event) => {
    event.preventDefault();
    try {
      if (showLogin) {
        // Login logic
      } else {
        // Signup logic
      }
      // Navigate to '/home'
      navigate('/home');
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (showLogin) {
        // Login
        const response = await axios.post('http://localhost:3000/login', { username, password });
        console.log(response.data);
      } else {
        // Signup
        const response = await axios.post('http://localhost:3000/user', { name: name, phone_number: phone , email: email, ev_model: model });
        console.log(response.data);
      }
      // Reset form fields
      setEmail('');
      setPhone('');
      setModel('');
      setName('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: waves,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="flex flex-col md:flex-row w-3/5 bg-white rounded-lg" style={{ "height": "420px" }}>
        <div className="md:w-3/5 relative bg-lavendar rounded-lg">
          <Lottie
            options={defaultOptions}
            height={400}
            width={546}
            style={{ position: 'absolute', bottom: 0, left: 0 }}
          />
          <div className="absolute bottom-0 mb-4 ml-4" style={{ color: 'white', fontSize: '48px' }}>
            <Typewriter
              options={{
                strings: ['Grow.', 'Invest.', 'Thrive...'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="md:w-2/5 flex flex-col justify-center items-center p-4 h-full">
          <div className="flex flex-row w-full mx-auto mb-4">
            <button className={`w-1/2 py-2 rounded-tl-3xl rounded-bl-3xl ${showLogin ? 'bg-black text-white' : 'bg-gray-200 text-black'}`} onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button className={`w-1/2 py-2 rounded-tr-3xl rounded-br-3xl ${showLogin ? 'bg-gray-200 text-black' : 'bg-black text-white'}`} onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </div>
          <form onSubmit={handleSubmit} className="w-full mx-auto">
            {showLogin ? (
              <>
                <div className="mb-2">
                  <label htmlFor="username" className="block text-black">Username:</label>
                  <input
                    type="username"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="p-2 w-full rounded-lg border border-black focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="block text-black">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="p-2 w-full rounded-lg border border-black focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-2">
                  <label htmlFor="name" className="block text-black">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    className="p-2 w-full rounded-lg border border-black focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="block text-black">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="p-2 w-full rounded-lg border border-black focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="phone" className="block text-black">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="p-2 w-full rounded-lg border border-black focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="model" className="block text-black">Model:</label>
                  <input
                    type="text"
                    id="model"
                    value={model}
                    onChange={handleModelChange}
                    className="p-2 w-full rounded-lg border border-black focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </>
            )}
            <div className="text-center">
              <button type="submit" onClick={handleNavigate} className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                {showLogin ? 'Login' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
