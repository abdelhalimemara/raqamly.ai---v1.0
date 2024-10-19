import React, { useState } from 'react';
import { signup, login, AuthResponse } from '../utils/auth';

interface AuthFormsProps {
  onAuthSuccess: (user: AuthResponse['user']) => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response: AuthResponse;

      if (isLogin) {
        response = await login(email, password);
      } else {
        response = await signup(email, password, name, businessName);
      }

      if (response.success && response.user) {
        onAuthSuccess(response.user);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.code === 'email_address_not_authorized') {
        setError('This email address is not authorized. Please contact support or try a different email.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button 
          type="submit" 
          className="w-full bg-highlight text-black font-semibold py-2 px-4 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-highlight font-semibold">
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthForms;