import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5', // Indigo - mer professionell än knallblå
      light: '#6366f1',
      dark: '#4338ca',
    },
    secondary: {
      main: '#6b7280', // Grå för sekundära element
    },
    success: {
      main: '#10b981', // Grön för uppgående
      light: '#34d399',
    },
    error: {
      main: '#ef4444', // Röd för nedgående
      light: '#f87171',
    },
    background: {
      default: '#f9fafb', // Mycket ljusgrå
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',  // Nästan svart
      secondary: '#6b7280', // Grå
    },
    grey: {
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: { fontWeight: 600, color: '#111827' },
    h6: { fontWeight: 500, color: '#374151' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 6,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
