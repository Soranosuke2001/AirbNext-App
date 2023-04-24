"use client";

import { FC, useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface errorProps {
  error: Error;
}

const error: FC<errorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <EmptyState
      title="Something Went Wrong"
      subtitle="There was an error loading this page. Please try again later."
    />
  );
};

export default error;
