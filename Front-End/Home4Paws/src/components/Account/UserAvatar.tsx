import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PawPrint } from "lucide-react";

interface UserAvatarProps {
  name: string;
  surname: string;
  imageUrl?: string;
}

export function UserAvatar({ name, surname, imageUrl }: UserAvatarProps) {
  return (
    <div className="relative">
      <Avatar className="h-24 w-24 mx-auto border-4 border-orange-300">
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt={`${name} ${surname}`} />
        ) : (
          <AvatarFallback className="text-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-white">
            {name[0]}
            {surname[0]}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="absolute -bottom-2 -right-2 bg-orange-400 rounded-full p-2">
        <PawPrint className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}