import React, { createContext, useContext, useState, useEffect } from 'react';

// Define la forma del contexto de usuario
interface UserContextType {
    userId: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

// Crea el contexto con valores predeterminados
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: React.ReactNode; // Este es el tipo correcto para las props del componente
}

// Proveedor del contexto
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Recuperar el userId desde localStorage si existe
        const savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
            setUserId(savedUserId); // Establecer el userId en el estado
        }
    }, []);

    const login = (email: string, password: string) => {
        const mockUser = {
            email: 'user@example.com',
            password: 'password123',
            userId: '123',
        };

        if (email === mockUser.email && password === mockUser.password) {
            setUserId(mockUser.userId); // Actualizamos el estado del contexto
        } else {
            alert('Credenciales incorrectas');
        }
    };

    const logout = () => {
        setUserId(null); // Limpiamos el ID del usuario en el estado
        localStorage.removeItem('userId'); // Limpiamos el userId en localStorage
    };

    return (
        <UserContext.Provider value={{ userId, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto de usuario
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser debe ser usado dentro de un UserProvider');
    }
    return context;
};
