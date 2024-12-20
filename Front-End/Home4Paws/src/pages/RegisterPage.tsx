import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        telephone: '',
        place: '',
    });

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        // Si el campo es 'telephone', solo permitimos números
        if (name === 'telephone') {
            const numericValue = value.replace(/[^0-9]/g, ''); // Elimina cualquier carácter que no sea un número
            setFormData((prev) => ({
                ...prev,
                [name]: numericValue,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validació de contrasenyes
        if (formData.password !== formData.confirmPassword) {
            setError('Les contrasenyes no coincideixen');
            return;
        }
    
        try {
            // Registre de l'usuari
            const response = await fetch('http://localhost:8080/home4paws/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    surname: formData.surname,
                    email: formData.email,
                    password: formData.password,
                    telephone: formData.telephone,
                    place: formData.place,
                }),
            });
    
            if (response.ok) {
                // Després d'un registre exitós, iniciar sessió automàticament
                const loginResponse = await fetch('http://localhost:8080/home4paws/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });
    
                if (!loginResponse.ok) {
                    const loginError = await loginResponse.json();
                    throw new Error(loginError.message || 'Error al iniciar sesión después del registro.');
                }
    
                const loginData = await loginResponse.json();
    
                // Suponiendo que el API devuelve un objeto { userId: long }
                localStorage.setItem('userId', loginData.userId.toString()); // Guardamos el long como string
    
                // Redirigir a la página principal después del login
                navigate('/');
                window.location.reload(); // Recargar la pàgina després de login
            } else {
                // Capturar mensaje de error del servidor
                const errorData = await response.json();
                setError(errorData.message || 'Error en registrar l\'usuari');
            }
        } catch (err) {
            // Manejar errores no controlados o problemas de conexión
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Error desconegut al connectar-se amb l'Api");
            }
        }
    };
    

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, marginTop:10 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Registre
            </Typography>
            {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nom"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Cognoms"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Correu electrònic"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type="email"
                />
                <TextField
                    label="Contrasenya"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    type="password"
                />
                <TextField
                    label="Confirmar Contrasenya"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    type="password"
                />
                <TextField
                    label="Telèfon"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Adreça"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Registrar-se
                </Button>
            </form>
        </Box>
    );
};

export default RegisterPage;
