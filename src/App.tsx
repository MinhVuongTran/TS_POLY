import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getAllBrand } from './api/brand';
import { getAllCategory } from './api/category';
import {
    addDevice,
    deleteDevice,
    getAllDevice,
    updateDevice,
} from './api/device';
import AdminLayout from './components/layouts/AdminLayout';
import SiteLayout from './components/layouts/SiteLayout';
import HomePage from './pages/HomePage';
import AdminDeviceAddPage from './pages/admin/AdminDeviceAddPage';
import AdminDeviceUpdatePage from './pages/admin/AdminDeviceUpdatePage';
import { IBrand } from './types/brand';
import { ICategory } from './types/category';
import { IDevice } from './types/device';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { message } from 'antd';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';

// import './App.css';

function App() {
    const [devices, setDevices] = useState<IDevice[]>([]);
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllDevice().then(({ data }) => setDevices(data.data));
        getAllBrand().then(({ data }) => setBrands(data.data));
        getAllCategory().then(({ data }) => setCategories(data.data));
    }, []);

    const handlerRemove = (id: number | string) => {
        deleteDevice(id)
            .then(() => {
                setDevices(devices.filter((item) => item._id !== id));
            })
            .catch((err) => console.log(err));
    };

    const handlerAddDevices = (values: any) => {
        addDevice(values)
            .then(() =>
                getAllDevice().then(({ data }) => setDevices(data.data)),
            )
            .catch((err) => console.log(err));
        navigate('/admin');
    };

    const handlerUpdateDevices = (device: any, id: string) => {
        updateDevice(device, id)
            .then(() => {
                setDevices(
                    devices.map((item) => (item._id === id ? device : item)),
                );
            })
            .catch((err) => {
                console.log(err);
            });
        navigate('/admin');
    };

    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<SiteLayout />}>
                    <Route index element={<HomePage devices={devices} />} />
                    <Route path='detail/:id'>
                        <Route index element={<DetailPage />} />
                    </Route>
                </Route>
                <Route
                    path='/admin'
                    element={
                        <AdminLayout
                            devices={devices}
                            brands={brands}
                            onRemove={handlerRemove}
                        />
                    }
                />
                <Route
                    path='/admin/add'
                    element={
                        <AdminDeviceAddPage
                            brands={brands}
                            categories={categories}
                            onAdd={handlerAddDevices}
                        />
                    }
                />
                <Route path='/admin/edit'>
                    <Route
                        path=':id'
                        element={
                            <AdminDeviceUpdatePage
                                onUpdate={handlerUpdateDevices}
                                brands={brands}
                                categories={categories}
                            />
                        }
                    />
                </Route>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/cart' element={<CartPage devices={devices} />} />

                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
