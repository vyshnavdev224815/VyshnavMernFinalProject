// Types for Book data
export interface VyshnavBook {
    _id?: string;
    title: string;
    author: string;
    genre: string;
    price: number;
    stock: number;
    publishedYear?: number;
    createdAt?: Date;
}

// Types for API responses
export interface VyshnavApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface VyshnavBooksResponse extends VyshnavApiResponse<{
    books: VyshnavBook[];
    stats: {
        total: number;
        outOfStock: number;
    };
}> {}