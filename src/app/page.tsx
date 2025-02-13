import TaskManager from "./components/TaskManager";
import { NextAuthProvider } from "./lib/next-auth/provider";

export default async function Home() {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700">タスク一覧</h1>
      <div className="w-full max-w-xl mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
          <NextAuthProvider>
            <TaskManager />
          </NextAuthProvider>
        </div>
      </div>
    </main>
  );
}
