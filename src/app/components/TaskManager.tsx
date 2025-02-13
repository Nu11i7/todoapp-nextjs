"use client"
import AddTask from "./AddTask";
import ToDoList from "./TodoList";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { Task } from '@/types'
import { Category } from "@prisma/client";

const TaskManager = () => {
    const priorities = ["low", "medium", "high"];

    const [todos, setTodos] = useState<Task[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const { data: session } = useSession();
    const user = session?.user;

    useEffect(() => {
        const getTodo = async () => {
            if (!user) return;
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo?userId=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const todos = await res.json();
            setTodos(Array.isArray(todos) ? todos : []);


            res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const categories = await res.json();
            setCategories(Array.isArray(categories) ? categories : []);
        }
        getTodo();
    }, [user?.id]);

    const addTodo = (newTodo: Task) => {
        setTodos((prev) => [...prev, newTodo]);
    }

    const deleteTodo = (delTodo: Task) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== delTodo.id));
    }

    const updateTodo = (newTodo: Task) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === newTodo.id ? { ...todo, content: newTodo.content } : todo
            )
        );
    };

    const addCategory = (newCategory: Category) => {
        setCategories((prev) => [...prev, newCategory]);
    };

    return (
        <>
            <AddTask user={user} addTodo={addTodo} priorities={priorities} categories={categories} addCategory={addCategory}/>
            <ToDoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        </>
    )
}

export default TaskManager;