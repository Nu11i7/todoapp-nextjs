import { Todo } from "@prisma/client"
import prisma from "@/app/lib/next-auth/prisma"
import { NextResponse } from "next/server"
import { useId } from "react";


export async function GET(request: Request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if(!useId|| typeof userId !== 'string') {
        return NextResponse.json({ error: "userId is required and must be a string" }, { status: 400 });
    }

    try {
        const todos: Todo[] = await prisma.todo.findMany({
            where: {
                userId: userId
            }
        });
        return NextResponse.json(todos);
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function POST(request: Request) {
    const body = await request.json()

    try {
        const todo: Todo = await prisma.todo.create({
            data: {
                userId: body.userId,
                content: body.content,
                priority: body.priority,
                categoryId: body.categoryId,
            },
        })
        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json(error)
    }
}