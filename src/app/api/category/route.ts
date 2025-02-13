import { Category } from "@prisma/client"
import prisma from "@/app/lib/next-auth/prisma"
import { NextResponse } from "next/server"


export async function GET(request: Request) {

    try {
        const categories: Category[] = await prisma.category.findMany();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(error);
    }
}


export async function POST(request: Request) {
    try {

        const body = await request.json()

        if (!body.categoryName || typeof body.categoryName !== "string") {
            return NextResponse.json(
                { error: "Invalid category name" },
                { status: 400 }
            );
        }

        const category: Category = await prisma.category.create({
            data: {
                name: body.categoryName,
            },
        });

        return NextResponse.json(category, { status: 201 });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
