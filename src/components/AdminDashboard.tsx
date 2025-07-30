import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord Administrateur</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
          <p>Visiteurs aujourd'hui: 42</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2">
            Gérer utilisateurs
          </button>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default AdminDashboard;