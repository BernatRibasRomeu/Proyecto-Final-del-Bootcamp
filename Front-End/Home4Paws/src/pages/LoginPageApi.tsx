import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const LoginPageApi: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/home4paws/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Credencials incorrectes.');
            }

            const data = await response.json();

            // Suponiendo que el API devuelve un objeto { userId: long }
            localStorage.setItem('userId', data.userId.toString()); // Guardamos el long como string
            console.log('User ID stored in localStorage:', localStorage.getItem('userId'));
            navigate('/'); // Redirigir a la página principal después del login
            window.location.reload();
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                Iniciar sessió
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contrasenya"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Iniciar sessió
                    </Button>
                    <Typography variant="body2" align="center">
                        <Link to="/forgot-password">He oblidat la contrasenya?</Link>
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                        <Link to="/register">No tens un compte?</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPageApi;