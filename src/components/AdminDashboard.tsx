import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Array<{
    id: number;
    title: string;
    content: string;
    image: File | null;
    imagePreview: string | null;
    date: string;
  }>>([]);
  
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

  const handleEdit = (post: typeof posts[0]) => {
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
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-fadeInDown">
          <h1 className="text-3xl font-bold text-gray-800 transform transition duration-500 hover:scale-105">
            Tableau de bord Administrateur
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-red-500/50"
          >
            Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl animate-fadeInLeft">
              <h2 className="text-xl font-semibold mb-4 text-gray-700 transform transition duration-500 hover:translate-x-2">
                {editingPostId !== null ? "Modifier la publication" : "Nouvelle publication"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="title">
                    Titre
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="content">
                    Contenu
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="image">
                
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full opacity-0 absolute h-0"
                    multiple
                    max={3}
                  />
                  <label
                    htmlFor="image"
                    className="block w-full px-4 py-2 border-2 border-dashed border-gray-400 rounded-md cursor-pointer bg-white hover:bg-gray-50 transition duration-300 transform hover:scale-[1.01] shadow-sm text-black"
                  >
                    Choisir une image
                  </label>
                  {newPost.imagePreview && (
                    <div className="mt-2 animate-fadeIn grid grid-cols-2 gap-2">
                      {Array.isArray(newPost.imagePreview) ? (
                        newPost.imagePreview.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="h-32 w-full object-cover rounded border-2 border-gray-200 transition duration-300 hover:scale-[1.02]"
                            />
                          </div>
                        ))
                      ) : (
                        <img
                          src={newPost.imagePreview}
                          alt="Preview"
                          className="h-32 w-full object-cover rounded border-2 border-gray-200 transition duration-300 hover:scale-[1.02]"
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  {editingPostId !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewPost({ title: "", content: "", image: null, imagePreview: null });
                        setEditingPostId(null);
                      }}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300 transform hover:-translate-y-1"
                    >
                      Annuler
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/50"
                  >
                    {editingPostId !== null ? "Modifier" : "Publier"}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6 transition-all duration-500 hover:shadow-lg animate-fadeInUp">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Statistiques
              </h2>
              <div className="space-y-2">
                <p className="transition duration-300 hover:text-blue-600">Publications: {posts.length}</p>
                <p className="transition duration-300 hover:text-green-600">Visiteurs aujourd'hui: 42</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md animate-fadeInRight">
              <h2 className="text-xl font-semibold mb-4 text-gray-700 transform transition duration-500 hover:translate-x-1">
                Publications
              </h2>
              {posts.length === 0 ? (
                <p className="text-gray-500 animate-pulse">Aucune publication pour le moment</p>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div
                      id={`post-${post.id}`}
                      key={post.id}
                      className="border-b border-gray-200 pb-4 last:border-0 transition-all duration-300 hover:bg-gray-50 rounded-lg p-3 animate-fadeIn"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-800 transition duration-300 hover:text-blue-600">
                          {post.title}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="text-yellow-600 hover:text-yellow-800 transition duration-300 transform hover:scale-110"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="text-red-600 hover:text-red-800 transition duration-300 transform hover:scale-110"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        Publié le {post.date}
                      </p>
                      <p className="text-gray-700 mb-3 transition duration-300 hover:text-gray-900">
                        {post.content}
                      </p>
                      {post.imagePreview && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {Array.isArray(post.imagePreview) ? (
                            post.imagePreview.map((preview, index) => (
                              <img
                                key={index}
                                src={preview}
                                alt={`Publication ${index + 1}`}
                                className="h-32 w-full object-cover rounded border-2 border-gray-200 transition duration-300 hover:scale-[1.01] shadow-sm"
                              />
                            ))
                          ) : (
                            <img
                              src={post.imagePreview}
                              alt="Publication"
                              className="h-48 w-full object-cover rounded border-2 border-gray-200 transition duration-300 hover:scale-[1.01] shadow-sm"
                            />
                          )}
                        </div>
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
      `}</style>
    </div>
  );
};

export default AdminDashboard;