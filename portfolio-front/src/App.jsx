import { useState } from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import './App.css'
import { LineChart, Area } from 'recharts'
import DashboardPage from './dashboard.jsx'

function App() {
  return (
    <>
      <SidebarProvider>
        <DashboardPage />
      </SidebarProvider>
    </>
  )
}

export default App
