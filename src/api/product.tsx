import instance from './instance';
interface IProduct {
    _id: number | number;
    name: string;
    price: number;
}
const getAllProduct = () => {
    return instance.get('/api/products');
};
const getOneProduct = (id: string | number) => {
    return instance.get('/api/products/' + id);
};
const deleteProduct = (id: number | string) => {
    return instance.delete('/api/products/' + id);
};
const addProduct = (product: IProduct) => {
    return instance.post('/api/products', product);
};
const updateProduct = (product: IProduct, id: string | number) => {
    return instance.put('/api/products/' + id, product);
};
export {
    getAllProduct,
    getOneProduct,
    deleteProduct,
    addProduct,
    updateProduct,
};
