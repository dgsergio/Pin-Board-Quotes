import { useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const transformData = (data) => {
    let transformedData = [];
    for (const key in data) {
      transformedData.push({ id: key, ...data[key] });
    }
    return transformedData;
  };

  const sendReq = async (req) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(req.url, {
        method: req.method || 'GET',
        body: req.body ? JSON.stringify(req.body) : null,
        headers: req.headers || {},
      });
      if (!response.ok) throw new Error('Could not fetch');
      const data = await response.json();
      return transformData(data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  return { sendReq, loading, error };
};

export default useFetch;


// El metodo POST de firebase pasado a json devuelve un objeto, con la propiedad name?