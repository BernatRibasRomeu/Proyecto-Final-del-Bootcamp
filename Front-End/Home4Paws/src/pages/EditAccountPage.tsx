import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../utils/StorageUtils";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { UserRoundCogIcon, AlertCircle, ArrowLeft } from "lucide-react";
import { FormInput } from "../components/Account/FormInput";

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

const EditAccountPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [passwordError, setPasswordError] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserId = getUserId();
      if (storedUserId) {
        try {
          const response = await fetch(
            `http://localhost:8080/home4paws/users/${storedUserId}`,
            { method: "POST" }
          );
          if (!response.ok) {
            throw new Error("Error al obtenir les dades de l'usuari.");
          }
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (enteredPassword !== user?.password) {
      setPasswordError("La contrasenya no coincideix.");
      setIsLoading(false);
      return;
    }

    try {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        throw new Error("No es va trobar la ID de l'usuari.");
      }

      const response = await fetch(
        `http://localhost:8080/home4paws/users/${storedUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error en actualitzar el perfil.");
      }

      navigate("/account");
    } catch (error) {
      setPasswordError("Error en actualitzar el perfil. Intenta-ho de nou.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md border-2 border-orange-200">
          <CardContent className="p-8">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
            </div>
            <p className="text-center mt-4 text-gray-600">Carregant...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4 md:p-8 mt-16">
      <Card className="max-w-2xl mx-auto border-2 border-orange-200">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center">
            <UserRoundCogIcon className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Editar Perfil</h1>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormInput
                label="Nom"
                value={formData?.name || ""}
                onChange={(value) => setFormData({ ...formData!, name: value })}
              />

              <FormInput
                label="Cognoms"
                value={formData?.surname || ""}
                onChange={(value) => setFormData({ ...formData!, surname: value })}
              />

              <FormInput
                label="Correu electrònic"
                type="email"
                value={formData?.email || ""}
                onChange={(value) => setFormData({ ...formData!, email: value })}
              />

              <FormInput
                label="Telèfon"
                value={formData?.telephone || ""}
                onChange={(value) => {
                  if (/^\d*$/.test(value)) {
                    setFormData({ ...formData!, telephone: value });
                  }
                }}
                pattern="^\d*$"
              />

              <FormInput
                label="Residència"
                value={formData?.place || ""}
                onChange={(value) => setFormData({ ...formData!, place: value })}
              />

              <FormInput
                label="Contrasenya actual"
                type="password"
                value={enteredPassword}
                onChange={setEnteredPassword}
                error={passwordError}
              />
            </div>

            {passwordError && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{passwordError}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/account")}
                className="border-2 border-orange-200 hover:bg-orange-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Tornar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                {isLoading ? "Guardant..." : "Desar Canvis"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAccountPage;