import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CategoryFrom from "./CategoryForm";
import { Category } from '@prisma/client';
import FormField from './FormField';

type AddTaskProps = {
    user: any | null;
    addTodo: (todo: any) => void;
    priorities: string[];
    categories: Category[];
    addCategory: (category: any) => void;
};

const AddTask = ({ user, addTodo, priorities, categories, addCategory }: AddTaskProps) => {
    const router = useRouter();

    const [priority, setPriority] = useState(priorities[0]);

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories.length > 0 ? categories[0] : null);

    const [taskTitle, setTaskTitle] = useState("");



    const saveCategory = (newCategory: Category) => {
        addCategory(newCategory);
        setSelectedCategory(newCategory);
    }

    const changeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = categories.find(c => c.id === event.target.value);
        setSelectedCategory(selected || null);
    }


    useEffect(() => {
        if(categories.length > 0) {
            setSelectedCategory(categories[0]);
        }
    }, [categories]);



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!user) {
            router.push("/login");
        } else {
            if (!taskTitle.trim()) return

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    content: taskTitle,
                    priority: priority,
                    categoryId: selectedCategory?.id,
                }),
            })
            const newTodo = await res.json()
            addTodo(newTodo);
            setTaskTitle("");
            router.refresh();
        }
    }

    return (
        <form className='mb-4 space-y-3' onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="優先度" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} options={priorities} />
                <CategoryFrom user={user} categories={categories} category={selectedCategory?.name ?? ""} changeCategory={changeCategory} SaveCategory={saveCategory} />
            </div>
            <div>
                <label htmlFor="taskTitle" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    タスク
                </label>
                <input
                    id="taskTitle"
                    type="text"
                    className="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2"
                    placeholder="タスクを入力..."
                    value={taskTitle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
                />
            </div>
            <button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200"
            >
                タスク追加
            </button>
        </form>
    );
};

export default AddTask
