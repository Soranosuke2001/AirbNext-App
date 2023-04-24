import EmptyState from "../components/EmptyState";
import getFavorites from "../actions/getFavorites";
import { getCurrentUser } from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const favListings = await getFavorites();
  const currentUser = await getCurrentUser();

  if (favListings.length === 0) {
    return (
      <EmptyState
        title="No Favorites Found"
        subtitle="Try Searching for a Listing to Favorite"
      />
    );
  }

  return <FavoritesClient listings={favListings} currentUser={currentUser} />;
};

export default ListingPage;
