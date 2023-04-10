import instance from './instance';
const getAllCategory = () => {
    return instance.get('/api/categories');
};
const getOneCategory = (id: string | number) => {
    return instance.get('/api/categories/' + id);
};

export { getAllCategory, getOneCategory };
