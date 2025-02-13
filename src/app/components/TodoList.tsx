import { Task } from '@/types'
import React from 'react'
import Todo from './Todo';
import { Category } from '@prisma/client';

interface TodoListProps {
    todos: Task[];
    deleteTodo: (todo: any) => void;
    updateTodo: (todo: any) => void;
};

export default function ToDoList({ todos, deleteTodo, updateTodo }: TodoListProps) {
    return (
        <ul className='space-y-3'>
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
            ))}
        </ul>
    );
};

