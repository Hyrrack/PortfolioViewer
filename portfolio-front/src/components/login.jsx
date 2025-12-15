// components/LoginCentered.jsx
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { SignInButton, SignedOut, SignedIn, UserButton } from '@clerk/clerk-react';

export const Login = () => {
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            p: 3
        }}>
            <Container maxWidth="sm">
                <Paper sx={{
                    p: { xs: 3, md: 5 },
                    textAlign: 'center',
                    borderRadius: 2,
                    boxShadow: 3
                }}>
                    {/* Logo/Title */}
                    <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                        📈 Stockfolio
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        Your Personal Stock Portfolio
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Track, analyze, and manage your stock investments in one place
                    </Typography>

                    {/* Auth buttons - centered */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        <SignedOut>
                            <SignInButton mode="modal" redirectUrl="/dashboard">
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        minWidth: 200,
                                        py: 1.5,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Get Started
                                </Button>
                            </SignInButton>

                            <Typography variant="body2" color="text.secondary">
                                Sign in to access your portfolio
                            </Typography>
                        </SignedOut>

                        <SignedIn>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 3
                            }}>
                                <Typography variant="h6" color="primary">
                                    Welcome back! 👋
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    bgcolor: 'action.hover',
                                    borderRadius: 2
                                }}>
                                    <UserButton />
                                    <Typography>
                                        You are already signed in
                                    </Typography>
                                </Box>

                                <Button
                                    variant="outlined"
                                    onClick={() => window.location.href = '/dashboard'}
                                >
                                    Go to Dashboard
                                </Button>
                            </Box>
                        </SignedIn>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;