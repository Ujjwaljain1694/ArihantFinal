import { useState } from "react";

const usePost = (apiFn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFn(...args);
      const result = res.data?.data ?? res.data;
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong.";
      const remainingSeconds = err.response?.data?.remainingSeconds || null;
      setError(message);
      return { success: false, error: message, remainingSeconds };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setData(null); setError(null); };
  return { post, data, loading, error, reset };
};

export default usePost;
