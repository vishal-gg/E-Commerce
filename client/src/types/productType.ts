export interface data {
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    brand: string;
    model: string;
    color?: string;
    discount?: number;
    onSale?: boolean;
    popular?: boolean;
    _id: string
}

export interface stateType {
    loading: boolean;
    products: data[] | null;
    error: string;
}