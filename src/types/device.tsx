export interface IDevice {
    _id: string;
    name: string;
    price: number;
    description: number;
    original_price: number;
    images: images[];
    specifications: specification[];
}

interface images {
    base_url: string;
    is_gallery: boolean;
    label: string;
    large_url: string;
    medium_url: string;
    position: string;
    small_url: string;
    thumbnail_url: string;
}

interface specification {
    name: string;
    attributes: attributes[];
}

interface attributes {
    code: string;
    name: string;
    value: string;
}
