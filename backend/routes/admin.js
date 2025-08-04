import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting pour les tentatives de connexion
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: { error: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.' }
});

// Validation schemas
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Middleware d'authentification
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token d\'accès requis' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// Utilisateur admin par défaut (en production, utiliser une base de données)
const getAdminUser = () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aria-creative.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  return {
    email: adminEmail,
    password: bcrypt.hashSync(adminPassword, 10),
    role: 'admin',
    name: 'Administrateur'
  };
};

// POST /api/admin/login - Connexion admin
router.post('/login', loginLimiter, async (req, res) => {
  try {
    // Validation des données
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Données invalides',
        details: error.details[0].message
      });
    }

    const { email, password } = value;
    const adminUser = getAdminUser();

    // Vérification de l'email
    if (email !== adminUser.email) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Création du JWT
    const token = jwt.sign(
      { 
        email: adminUser.email, 
        role: adminUser.role,
        name: adminUser.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Log de connexion
    console.log(`🔐 Admin login successful: ${email} at ${new Date().toISOString()}`);

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: {
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion' });
  }
});

// POST /api/admin/verify - Vérification du token
router.post('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
    message: 'Token valide'
  });
});

// POST /api/admin/refresh - Renouvellement du token
router.post('/refresh', authenticateToken, (req, res) => {
  try {
    const newToken = jwt.sign(
      { 
        email: req.user.email, 
        role: req.user.role,
        name: req.user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token: newToken,
      message: 'Token renouvelé'
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: 'Erreur lors du renouvellement du token' });
  }
});

// POST /api/admin/logout - Déconnexion (côté client principalement)
router.post('/logout', authenticateToken, (req, res) => {
  // Log de déconnexion
  console.log(`🔓 Admin logout: ${req.user.email} at ${new Date().toISOString()}`);
  
  res.json({
    success: true,
    message: 'Déconnexion réussie'
  });
});

// GET /api/admin/profile - Profil admin
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: {
      email: req.user.email,
      name: req.user.name,
      role: req.user.role
    }
  });
});

export default router;
