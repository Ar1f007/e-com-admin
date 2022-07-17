import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    if (!username || !password) return;

    login(dispatch, { username, password });
  };
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <input
        style={{
          padding: 10,
          borderRadius: 3,
          outline: 'none',
          border: '1px solid gray',
        }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{
          padding: 10,
          borderRadius: 3,
          outline: 'none',
          border: '1px solid gray',
        }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleClick} style={{ paddingInline: 10, width: '100px' }}>
        Login
      </button>
    </div>
  );
};
export default Login;
