const BASE_USR = "http://localhost:8080/api/todos"

export interface SearchRequest {
    title?: string;
    body?: string;
    status?: string;
    dueFrom?: Date;
    dueTo?: Date;
    completed?: string;
}

export interface SearchResponse {
    id: string;
    userId: string;
    title: string;
    body?: string;
    status: "not_started" | "in_progress" | "completed";
    dueDate?: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export const search = async (params: SearchRequest): Promise<SearchResponse[]> => {
    const query = new URLSearchParams();

    if (params.title) query.append("title", params.title);
    if (params.body) query.append("body", params.body);
    if (params.status) query.append("status", params.status);
    if (params.dueFrom) query.append("due_from", params.dueFrom.toISOString());
    if (params.dueTo) query.append("due_to", params.dueTo.toISOString());
    if (params.completed) query.append("completed", params.completed);

    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_USR}/?${query.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "search failed");
    }

    return await res.json();
}