import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await req.json();
    const {
        title,
        description,
        price,
        category,
        imageSrc,
        roomCount,
        guestCount,
        bathroomCount,
        location
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            return NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            price: parseInt(price, 10),
            category,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue: location.value,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}
