import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);

    window.addEventListener("offline", () => setOnline(false));
    window.addEventListener("online", () => setOnline(true));
  }, []);

  if (!online) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-500 text-2xl">
        Internet Connection Required
      </div>
    );
  }

  if (loading) return <LoadingScreen />;

  return <Dashboard />;
}

export default App;