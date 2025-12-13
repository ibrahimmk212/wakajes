// src/components/EditorialMemberCard.tsx
import React from "react";
import { Mail, Briefcase, MapPin } from "lucide-react";
// import Image from "next/image";

interface MemberProps {
  name: string;
  affiliation: string;
  country: string;
}

const EditorialMemberCard: React.FC<MemberProps> = ({
  name,
  affiliation,
  country,
}: MemberProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-md p-3 flex flex-col hover:shadow-xl transition-shadow duration-300">
      <h3 className="font-bold text-gray-700">{name}</h3>

      {/* Details */}
      <div className="text-sm text-gray-600 w-full mt-2">
        <div className="flex space-x-2">
          <Briefcase size={16} className="text-gray-500" />
          <span className="truncate">{affiliation}</span>
        </div>

        <div className="flex  space-x-2">
          <MapPin size={16} className="text-gray-500" />
          <span>{country}</span>
        </div>
      </div>
    </div>
  );
};

export default EditorialMemberCard;
