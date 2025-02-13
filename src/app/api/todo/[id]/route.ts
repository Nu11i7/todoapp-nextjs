import prisma from "@/app/lib/next-auth/prisma";
import { Task } from "@/types";
import { NextResponse } from "next/server"

export async function DELETE(
    request: Request, 
    { params }: { params: { id: string }}
){
    const { id } =  await params;
    if(!id|| typeof id !== 'string') {
        return NextResponse.json({ error: "id is required and must be a string" }, { status: 400 });
    }
    try {
        const todo = await prisma.todo.delete({
            where: {
                id: id,
            },
        })
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(error);
    }
}


export async function PATCH(
    request:Request,
    { params }: { params: { id: string }},
) {
   
    const body = await request.json()
    const { id } =  await params;
    if(!id|| typeof id !== 'string') {
        return NextResponse.json({ error: "id is required and must be a string" }, { status: 400 });
    }
    try {
        const todo = await prisma.todo.update({
            where: {
                id: id,
            },
            data: {
                content: body.content,
            },
        })
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(error);
    }
}