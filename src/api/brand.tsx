import instance from './instance';

const getAllBrand = () => {
    return instance.get('/api/brands');
};
const getOneBrand = (id: string | number) => {
    return instance.get('/api/brands/' + id);
};

export { getAllBrand, getOneBrand };
