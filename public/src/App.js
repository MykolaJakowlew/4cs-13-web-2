import { useEffect } from 'react';
import './style.css';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    axios.get('/tables')
      .then((response) => {
        const { data } = response;
        console.log(data``);
      });
  }, []);
  return (
    <div></div>
  );
};

export default App;
