#!/bin/bash

# Démarrer le backend en arrière-plan
echo "🚀 Démarrage du backend..."
cd backend && npm start &
BACKEND_PID=$!

# Attendre que le backend soit prêt
sleep 3

# Démarrer le frontend
echo "🌟 Démarrage du frontend..."
cd .. && npm run dev

# Nettoyer à la sortie
trap "kill $BACKEND_PID" EXIT
