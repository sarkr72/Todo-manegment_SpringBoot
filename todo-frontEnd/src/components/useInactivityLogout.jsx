import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const INACTIVITY_TIMEOUT = 3 * 60 * 1000;

const useInactivityLogout = () => {
  const navigate = useNavigate();
  let logoutTimer;

  const resetTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIMEOUT);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
    window.location.reload(false);
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );

    const events = ["mousemove", "click", "keypress"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(logoutTimer);
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return null;
};

export default useInactivityLogout;
