import { Category } from '@prisma/client';
import { ChangeEvent } from 'react'

const FormField = ({
    label,
    id,
    value,
    onChange,
    options,
}: {
    label: string;
    id: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}) => (
    <div className="w-full">
        <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            {label}
        </label>
        <select
            id={id}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2"
            value={value}
            onChange={onChange}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
            {label === "カテゴリ" && (
             <option value="new">＋ 新しい{label}を追加</option>
            )}
        </select>
    </div>
);

export default FormField
