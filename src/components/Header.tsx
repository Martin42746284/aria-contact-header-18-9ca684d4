import { Home, User, Settings, Briefcase, MessageCircle } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            {/* Logo Image */}
            <img
              src="src/assets/aria-logo.png" 
              alt="Logo ARIAA"
              className="h-24 w-24 object-contain"
            />
            {/* Texte ARIAA */}
            <div className="flex items-center">
              <span className="text-red-500 text-2xl font-bold">A</span>
              <span className="text-gray-800 text-2xl font-bold mx-1">RIA</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <a
              href="#accueil"
              className="flex items-center space-x-3 px-4 py-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Accueil</span>
            </a>
            <a
              href="#apropos"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <User className="h-5 w-5" />
              <span className="font-medium">À propos</span>
            </a>
            <a
              href="#realisations"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <Settings className="h-5 w-5" />
              <span className="font-medium"> Nos Réalisations</span>
             
            </a>
            <a
              href=" #services"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <Briefcase className="h-5 w-5" />
              <span className="font-medium">Services</span>
             
            </a>
            <a
              href="#contact"
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Contact</span>
            </a>
          </div>
        </nav>

        {/* Footer info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-xs text-gray-500 text-center">
            127.0.0.1:5500/index.html#
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Le contenu sera injecté ici */}
      </div>
    </div>
  );
};

export default Header;
