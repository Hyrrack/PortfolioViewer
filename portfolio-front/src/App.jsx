import { useState } from 'react'
import './App.css'
import { LineChart, Area } from 'recharts'
import DashboardPage from './dashboard.jsx'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useAuth } from "@clerk/clerk-react";
import UserSync from './components/user';
import Login from './components/login';

function App() {
  return (
    <header>
      <SignedOut>
        <Login />
      </SignedOut>
      <SignedIn>
        <UserSync />
      </SignedIn>
    </header>
  )
}

export default App
