// pages/LoginPage.jsx
import { Container, Box, Typography, Button } from '@mui/material';
import { SignInButton, SignedOut } from '@clerk/clerk-react';

export default function LoginPage() {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper'
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Stock Portfolio
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Sign in to track your stocks and view performance
                </Typography>

                <SignedOut>
                    <SignInButton >
                        <Button variant="contained" size="large">
                            Sign In
                        </Button>
                    </SignInButton>
                </SignedOut>
            </Box>
        </Container>
    );
}