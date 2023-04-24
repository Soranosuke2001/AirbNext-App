import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getListing from "@/app/actions/getListing";
import EmptyState from "@/app/components/EmptyState";
import { FC } from "react";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListing(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient listing={listing} currentUser={currentUser} />
  );
};

export default ListingPage;
