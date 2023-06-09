"use client";

import { FC, Suspense } from "react";
import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/app/libs/categoryList";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = ({}) => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <Suspense fallback={<>placeholder</>}>
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={item.label === category}
            />
          </Suspense>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
