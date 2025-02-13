"use client"

import { Task } from '@/types'
import { Category } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react'

interface TodoProps {
    todo: Task;
    deleteTodo: (todo: any) => void;
    updateTodo: (todo: any) => void;
}

const Todo = ({ todo, deleteTodo, updateTodo }: TodoProps) => {
    const router = useRouter();

    const ref = useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskTitle, setEditedTaskTitle] = useState(todo.content);

    useEffect(() => {
        setEditedTaskTitle(todo.content);
    }, [todo.content]);

    useEffect(() => {
        if (isEditing) {
            ref.current?.focus();
        }
    }, [isEditing]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: editedTaskTitle,
                }),
            },
        )
        const newTodo = await res.json();
        updateTodo(newTodo);
        setIsEditing(false);
        router.refresh();
    };

    const handleDelete = async () => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
            {
                method: 'DELETE',
            },
        )
        const delTodo = await res.json();
        deleteTodo(delTodo);
        router.refresh();
    }

    return (
        <li key={todo.id}
            className='flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow'>
            <span>{todo.category}</span>
            <span>{todo.priority}</span>
            {isEditing ? (
                <input type='text'
                    ref={ref}
                    className='mr-2 py-1 px-2 rounded border-gray-400 border'
                    value={editedTaskTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskTitle(e.target.value)}
                />
            ) : (<span>{todo.content}</span>)}
            <div>
                {isEditing ? (
                    <button className='text-blue-500 mr-3' onClick={handleSave}>
                        save
                    </button>
                ) : (
                    <button className='text-green-500 mr-3' onClick={handleEdit}>
                        edit
                    </button>
                )}

                <button className='text-red-500' onClick={handleDelete}>Delete</button>
            </div>
        </li>
    );
};

export default Todo
