#!/bin/bash

# Start Backend
echo "Starting Backend Server..."
cd server
npm start &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting Frontend..."
npm run dev &
FRONTEND_PID=$!

# Handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

wait