import { LucideIcon } from "lucide-react";

interface UserInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function UserInfoItem({ icon: Icon, label, value }: UserInfoItemProps) {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
      <div className="bg-orange-200 p-2 rounded-full">
        <Icon className="h-5 w-5 text-orange-700" />
      </div>
      <div>
        <p className="text-sm text-orange-700">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}