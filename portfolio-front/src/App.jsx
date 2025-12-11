import { useState } from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import './App.css'
import { LineChart, Area } from 'recharts'
import DashboardPage from './dashboard.jsx'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SidebarProvider>
          <UserButton />
          <DashboardPage />
        </SidebarProvider>
      </SignedIn>
    </header>
  )
}

export default App
