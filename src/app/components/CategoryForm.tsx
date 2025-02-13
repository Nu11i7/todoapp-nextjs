import FormField from './FormField';
import CategoryModal from "./CategoryModal"
import { useState } from 'react';
import { Category } from '@prisma/client';

interface CategoryFormProps {
    user: any | null;
    categories: Category[];
    category: string | null;
    changeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    SaveCategory: (categoryName: Category) => void;
}


const CategoryForm = ({ user, categories, category, changeCategory, SaveCategory }: CategoryFormProps) => {


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "new") {
            setIsModalOpen(true);
        } else {
            changeCategory(event);
        }
    };

    const handleSaveCategory = (newCategory: Category) => {
        SaveCategory(newCategory);
    }

    return (
        <>
            <FormField label="カテゴリ" id="category" value={category ?? ""} onChange={handleCategoryChange} options={categories.map(c => c.name)} />
            <CategoryModal
                user={user}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveCategory}
            />
        </>
    )
}

export default CategoryForm;
