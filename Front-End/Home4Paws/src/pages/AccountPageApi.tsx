import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/StorageUtils";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/separator";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Key,
  Trash2,
  AlertCircle,
  Heart,
} from "lucide-react";
import { UserAvatar } from "../components/Account/UserAvatar";
import { UserInfoItem } from "../components/Account/UserInfoItem";
import { DeleteAccountDialog } from "../components/Account/DeleteAccountDialog";

interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    telephone: string;
    place: string;
    bio: string;
    password: string;
  }
  
  const AccountPageApi: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<User | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<string>("");
  
    useEffect(() => {
      const fetchUserData = async () => {
        const storedUserId = getUserId();
        if (storedUserId) {
          try {
            const response = await fetch(
              `http://localhost:8080/home4paws/users/${storedUserId}`,
              { method: "POST" }
            );
            if (!response.ok) throw new Error("Error al obtenir les dades de l'usuari.");
            const userData: User = await response.json();
            setUser(userData);
            setFormData(userData);
          } catch (error) {
            console.error("Error al carregar les dades de l'usuari:", error);
          }
        }
      };
      fetchUserData();
    }, []);
  
    const handleDeleteProfile = async (password: string) => {
      if (password === user?.password) {
        try {
          const response = await fetch(
            `http://localhost:8080/home4paws/users/${user.id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) throw new Error("Error en eliminar el perfil.");
          localStorage.removeItem("userId");
          navigate("/");
          setUser(null);
          setShowDeleteConfirmation(false);
        } catch (error) {
          setDeleteError("Hi ha hagut un error en eliminar el perfil. Intenta-ho de nou.");
        }
      } else {
        setDeleteError("La contrasenya no coincideix. Intenta-ho de nou.");
      }
    };
  
    if (!user) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4 mt-10">
          <Card className="w-full max-w-md border-2 border-orange-200">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-orange-400" />
              </div>
              <h1 className="text-2xl font-bold text-center text-gray-800">
                Perfil no disponible
              </h1>
            </CardHeader>
            <CardContent>
              <Alert className="bg-orange-50 border-orange-200 text-orange-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Inicia sessió o registra una compte per veure el teu perfil.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4 md:p-8 mt-16">
        <Card className="max-w-3xl mx-auto border-2 border-orange-200">
          <CardHeader className="text-center space-y-4">
            <UserAvatar name={user.name} surname={user.surname} />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text">
              Perfil de l'usuari
            </h1>
          </CardHeader>
  
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <UserInfoItem
                  icon={User}
                  label="Nom complet"
                  value={`${user.name} ${user.surname}`}
                />
                <UserInfoItem
                  icon={Mail}
                  label="Correu electrònic"
                  value={user.email}
                />
                <UserInfoItem
                  icon={Phone}
                  label="Telèfon"
                  value={user.telephone}
                />
                <UserInfoItem
                  icon={MapPin}
                  label="Lloc de residència"
                  value={user.place}
                />
              </div>
  
              <Separator className="bg-orange-200" />
  
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/account/edit")}
                  className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white space-x-2"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Editar Perfil</span>
                </Button>
                <Button
                  onClick={() => navigate("/account/change-password")}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white space-x-2"
                >
                  <Key className="h-4 w-4" />
                  <span>Canviar Contrasenya</span>
                </Button>
                <Button
                  onClick={() => setShowDeleteConfirmation(true)}
                  variant="destructive"
                  className="space-x-2 bg-red-500 hover:bg-red-600 text-white"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Eliminar Perfil</span>
                </Button>
              </div>
            </div>
  
            <DeleteAccountDialog
              open={showDeleteConfirmation}
              onOpenChange={setShowDeleteConfirmation}
              onConfirmDelete={handleDeleteProfile}
              error={deleteError}
            />
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default AccountPageApi;