

export interface Task {
    id: string;
    content: string;
    priority: string;
    category: string;
}

export interface Category {
    id: string;
    name: string;
    tasks: Task[];
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}