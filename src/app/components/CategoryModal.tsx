import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Category } from "@prisma/client";

interface CategoryModalProps {
  user: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryName: Category) => void;
}

const CategoryModal = ({ user, isOpen, onClose, onSave }: CategoryModalProps) => {
  const router = useRouter();

  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {

    if (!user) {
      router.push("/login");
      return;
    }

    if (!categoryName.trim()) return;


    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName,
        }),
      });

      const data = await res.json()

      if (data.id && data.name) {
        console.log("Category created:", data);
        onSave(data.name);
      }

      setCategoryName("");
      setError(null);
      onClose();
    } catch (error: any) {
      console.error("Error creating category:", error);
      setError(error.message || error.toString());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 z-50">
        <h2 className="text-xl font-bold mb-4">新しいカテゴリを追加</h2>

        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="カテゴリ名"
          className="border p-2 w-full rounded"
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            キャンセル
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            追加
          </button>
        </div>
      </div>
    </div>
  )
}



export default CategoryModal;