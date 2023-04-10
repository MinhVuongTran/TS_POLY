import instance from './instance';
interface IDevice {
    name: string;
    price: number;
    original_price: number;
    description: string;
    images: [
        {
            base_url: string;
            is_gallery: boolean;
            label: string;
            large_url: string;
            medium_url: string;
            position: string;
            small_url: string;
            thumbnail_url: string;
        },
    ];
    specifications: [
        {
            name: string;
            attributes: [
                {
                    code: string;
                    name: string;
                    value: string;
                },
            ];
        },
    ];
    brandId: string;
    categoryId: string;
}
const getAllDevice = () => {
    return instance.get('/api/devices');
};
const getOneDevice = (id: string | number) => {
    return instance.get('/api/devices/' + id);
};
const deleteDevice = (id: number | string) => {
    return instance.delete('/api/devices/' + id);
};
const addDevice = (device: IDevice) => {
    return instance.post('/api/devices', device, {
        headers: {},
    });
};
const updateDevice = (device: IDevice, id: string | number) => {
    return instance.patch('/api/devices/' + id, device);
};
export { getAllDevice, getOneDevice, deleteDevice, addDevice, updateDevice };
