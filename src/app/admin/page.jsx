'use client'
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </>
  );
};

export default ProtectedRoute(Dashboard);