import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: (password: string) => void;
  error?: string;
}

export function DeleteAccountDialog({
  open,
  onOpenChange,
  onConfirmDelete,
  error,
}: DeleteAccountDialogProps) {
  const [password, setPassword] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600">
            Estàs segur?
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            S'eliminarà permanentment el teu compte i totes les teves dades.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Contrasenya
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Introdueix la teva contrasenya"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 focus:border-red-400"
            />
          </div>
          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-300 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-2"
            >
              Cancel·lar
            </Button>
            <Button
              variant="destructive"
              onClick={() => onConfirmDelete(password)}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}