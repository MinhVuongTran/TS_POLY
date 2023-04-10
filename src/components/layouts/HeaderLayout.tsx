import React from 'react';
import { AudioOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {
    Avatar,
    Badge,
    Button,
    Input,
    List,
    Popover,
    Space,
    Typography,
} from 'antd';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const { Search } = Input;
const onSearch = (value: string) => console.log(value);

const SearchEle = () => (
    <Space direction='vertical'>
        <Search
            placeholder='Search...'
            allowClear
            enterButton='Search'
            size='middle'
            onSearch={onSearch}
            style={{
                width: 600,
                marginLeft: 20,
            }}
        />
    </Space>
);

const HeaderLayout = () => {
    const navigate = useNavigate();
    const data = [
        { id: 1, title: 'Giỏ hàng', path: '/cart' },
        { id: 2, title: 'Đăng xuất', path: '/logout' },
    ];
    const handleLogOut = () => {
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
        }
    };
    const content = (
        <List
            header={
                JSON.parse(localStorage.getItem('user'))?.role === 1 ? (
                    <Link to='/admin'>Trang quản trị</Link>
                ) : null
            }
            dataSource={data}
            renderItem={(item) => {
                if (item.path === '/logout') {
                    return (
                        <List.Item>
                            <Link to='/login' onClick={handleLogOut}>
                                {item.title}
                            </Link>
                        </List.Item>
                    );
                } else {
                    return (
                        <List.Item>
                            <Link to={item.path}>{item.title}</Link>
                        </List.Item>
                    );
                }
            }}
        />
    );
    return (
        <header className='bg-red-500'>
            <div className='container mx-auto flex gap-4 justify-center items-center py-1'>
                <Space>
                    <Link to={'/'}>
                        <Avatar shape='square' size={48} src='/logo.png' />
                    </Link>
                    <SearchEle />
                </Space>
                {localStorage.getItem('user') ? (
                    <Space>
                        <Popover content={content} placement='bottomLeft'>
                            <Avatar size={36} src='/logo.png' />
                        </Popover>
                    </Space>
                ) : (
                    <Link to='/login'>
                        <Button type='primary'>Đăng nhập</Button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default HeaderLayout;
