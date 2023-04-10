import instance from './instance';
interface IUser {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    role: number;
}
interface IUserLogin {
    email: string;
    password: string;
}
const addUser = (User: IUser) => {
    return instance.post('/auth/signup', User);
};
const getUserByForm = (User: IUserLogin) => {
    return instance.post('/auth/signin', User);
};
const checkAdmin = () => {
    return instance.get('/auth/isAdmin');
};
export { addUser, getUserByForm, checkAdmin };
