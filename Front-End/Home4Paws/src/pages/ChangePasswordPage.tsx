import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Key, AlertCircle, ArrowLeft } from "lucide-react";
import { FormInput } from "../components/Account/FormInput";

const ChangePasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("Les contrasenyes no coincideixen.");
      return;
    }

    setPasswordError("");
    setIsLoading(true);

    try {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        throw new Error("No s'ha trobat l'ID d'usuari.");
      }

      const response = await fetch(
        `http://localhost:8080/home4paws/users/${storedUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en canviar la contrasenya.");
      }

      navigate("/account");
    } catch (error) {
      setPasswordError("Hi ha hagut un error en canviar la contrasenya.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4 md:p-8 mt-16">
      <Card className="max-w-md mx-auto border-2 border-orange-200">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center">
            <Key className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Canviar Contrasenya
          </h1>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-6">
            <FormInput
              label="Nova Contrasenya"
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Introdueix la nova contrasenya"
            />

            <FormInput
              label="Confirmar Contrasenya"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirma la nova contrasenya"
            />

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
                {isLoading ? "Guardant..." : "Guardar Canvis"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;