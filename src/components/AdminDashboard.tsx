import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CustomerMessage {
  id: number;
  subject: string;
  from: string;
  email: string;
  company: string;
  content: string;
  date: string;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: File | null;
  imagePreview: string | null;
  date: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<CustomerMessage[]>([
    {
      id: 1,
      subject: "Demande de partenariat",
      from: "Jean Dupont",
      email: "jean.dupont@example.com",
      company: "ABC Corp",
      content: "Bonjour, je souhaiterais discuter d'un possible partenariat avec votre entreprise.",
      date: "30/07/2025",
    },
    {
      id: 2,
      subject: "Question sur vos services",
      from: "Marie Martin",
      email: "marie.martin@example.com",
      company: "XYZ Ltd",
      content: "Pourriez-vous me donner plus d'informations sur vos services premium?",
      date: "30/07/2025",
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: null as File | null,
    imagePreview: null as string | null,
  });

  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({
          ...newPost,
          image: file,
          imagePreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPostId !== null) {
      setPosts(
        posts.map((post) =>
          post.id === editingPostId
            ? {
                ...post,
                title: newPost.title,
                content: newPost.content,
                image: newPost.image,
                imagePreview: newPost.imagePreview,
              }
            : post
        )
      );
      setEditingPostId(null);
    } else {
      setPosts([
        ...posts,
        {
          id: Date.now(),
          title: newPost.title,
          content: newPost.content,
          image: newPost.image,
          imagePreview: newPost.imagePreview,
          date: new Date().toLocaleDateString(),
        },
      ]);
    }
    setNewPost({ title: "", content: "", image: null, imagePreview: null });
  };

  const handleEdit = (post: BlogPost) => {
    setNewPost({
      title: post.title,
      content: post.content,
      image: post.image,
      imagePreview: post.imagePreview,
    });
    setEditingPostId(post.id);
  };

  const handleDelete = (postId: number) => {
    const postElement = document.getElementById(`post-${postId}`);
    if (postElement) {
      postElement.classList.add("opacity-0", "scale-95", "transition-all", "duration-300");
      setTimeout(() => {
        setPosts(posts.filter((post) => post.id !== postId));
      }, 300);
    } else {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className="p-6 min-h-screen bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fadeInDown">
          <h1 className="text-4xl font-bold text-white transform transition duration-500 hover:scale-105">
            <span className="text-orange-400">Dashboard</span> <span className="text-white">Admin</span>
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-orange-500 to-orange-400 text-black font-semibold py-3 px-6 rounded-lg hover:from-orange-400 hover:to-orange-300 transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-orange-500/50 border border-orange-400"
          >
            Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            {/* New Post Form */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-orange-500/20 animate-fadeInLeft border border-gray-800">
              <h2 className="text-2xl font-semibold mb-6 text-orange-400 transform transition duration-500 hover:translate-x-2">
                {editingPostId !== null ? "Modifier la publication" : "Nouvelle publication"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-orange-300 mb-2 font-medium" htmlFor="title">
                    Titre
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 focus:border-orange-500 hover:border-gray-600"
                    required
                    placeholder="Entrez le titre..."
                  />
                </div>
                <div>
                  <label className="block text-orange-300 mb-2 font-medium" htmlFor="content">
                    Contenu
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 focus:border-orange-500 hover:border-gray-600 resize-none"
                    required
                    placeholder="Écrivez votre contenu..."
                  />
                </div>
                <div>
                  <label className="block text-orange-300 mb-2 font-medium" htmlFor="image">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="block w-full px-4 py-3 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition duration-300 transform hover:scale-[1.01] shadow-sm text-orange-300 text-center font-medium hover:border-orange-500"
                  >
                     Choisir une image
                  </label>
                  {newPost.imagePreview && (
                    <div className="mt-4 animate-fadeIn">
                      <img
                        src={newPost.imagePreview}
                        alt="Preview"
                        className="h-40 w-full object-cover rounded-lg border-2 border-orange-500 transition duration-300 hover:scale-[1.02] shadow-lg"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  {editingPostId !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewPost({ title: "", content: "", image: null, imagePreview: null });
                        setEditingPostId(null);
                      }}
                      className="bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300 transform hover:-translate-y-1 font-medium"
                    >
                      Annuler
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 text-black font-semibold py-3 px-6 rounded-lg hover:from-orange-400 hover:to-orange-300 transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-orange-500/50"
                  >
                    {editingPostId !== null ? "Modifier" : "Publier"}
                  </button>
                </div>
              </form>
            </div>

            {/* Statistics */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl mt-8 transition-all duration-500 hover:shadow-orange-500/20 animate-fadeInUp border border-gray-800">
              <h2 className="text-2xl font-semibold mb-6 text-orange-400">
                 Statistiques
              </h2>
              <div className="space-y-4">
                <div className="bg-black p-4 rounded-lg border border-gray-800 transition duration-300 hover:border-orange-500">
                  <p className="text-orange-300 font-medium">Publications</p>
                  <p className="text-2xl font-bold text-white">{posts.length}</p>
                </div>
                <div className="bg-black p-4 rounded-lg border border-gray-800 transition duration-300 hover:border-orange-500">
                  <p className="text-orange-300 font-medium">Visiteurs aujourd'hui</p>
                  <p className="text-2xl font-bold text-white">42</p>
                </div>
                <div className="bg-black p-4 rounded-lg border border-gray-800 transition duration-300 hover:border-orange-500">
                  <p className="text-orange-300 font-medium">Messages clients</p>
                  <p className="text-2xl font-bold text-white">{messages.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            {/* Customer Messages */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl mb-8 animate-fadeInRight border border-gray-800">
              <h2 className="text-2xl font-semibold mb-6 text-orange-400 transform transition duration-500 hover:translate-x-1">
                 Messages des clients
              </h2>
              {messages.length === 0 ? (
                <p className="text-gray-400 animate-pulse text-center py-8">Aucun message pour le moment</p>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="bg-black border border-gray-800 rounded-lg p-6 transition-all duration-300 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 animate-fadeIn"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-orange-400">
                          {message.subject}
                        </h3>
                        <span className="text-gray-400 text-sm bg-gray-800 px-3 py-1 rounded-full">
                          {message.date}
                        </span>
                      </div>
                      <div className="mb-3">
                        <p className="text-gray-300">
                          <span className="text-orange-300 font-medium">De:</span> {message.from}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-orange-300 font-medium">Entreprise:</span> {message.company}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-orange-300 font-medium">Email:</span> {message.email}
                        </p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-orange-500">
                        <p className="text-white leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Blog Posts */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl animate-fadeInRight border border-gray-800">
              <h2 className="text-2xl font-semibold mb-6 text-orange-400 transform transition duration-500 hover:translate-x-1">
                 Publications
              </h2>
              {posts.length === 0 ? (
                <p className="text-gray-400 animate-pulse text-center py-8">Aucune publication pour le moment</p>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div
                      id={`post-${post.id}`}
                      key={post.id}
                      className="bg-black border border-gray-800 rounded-lg p-6 transition-all duration-300 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 animate-fadeIn"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-orange-400 transition duration-300 hover:text-orange-300">
                          {post.title}
                        </h3>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEdit(post)}
                            className="text-orange-400 hover:text-orange-300 transition duration-300 transform hover:scale-110 font-medium px-3 py-1 rounded border border-orange-500 hover:bg-orange-500 hover:text-black"
                          >
                            ✏️ Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-400 hover:text-red-300 transition duration-300 transform hover:scale-110 font-medium px-3 py-1 rounded border border-red-500 hover:bg-red-500 hover:text-black"
                          >
                             Supprimer
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 bg-gray-800 px-3 py-1 rounded-full inline-block">
                         Publié le {post.date}
                      </p>
                      <p className="text-gray-300 mb-4 leading-relaxed transition duration-300 hover:text-white">
                        {post.content}
                      </p>
                      {post.imagePreview && (
                        <img
                          src={post.imagePreview}
                          alt="Publication"
                          className="h-64 w-full object-cover rounded-lg border-2 border-orange-500 transition duration-300 hover:scale-[1.01] shadow-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.5s ease-out forwards;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.5s ease-out forwards;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.5s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        ::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;