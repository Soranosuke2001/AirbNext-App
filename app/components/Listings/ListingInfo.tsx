"use client";

import useCountries from "@/app/Hooks/useCountries";
import { SafeUser } from "@/app/types";
import { FC } from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: FC<ListingInfoProps> = ({
  user,
  description,
  category,
  roomCount,
  bathroomCount,
  guestCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted By: {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral">
          <div>{guestCount} Guests</div>
          <div>{roomCount} Rooms</div>
          <div>{bathroomCount} Bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
