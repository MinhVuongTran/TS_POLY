import { Layout, Menu, notification, theme } from 'antd';
import { BsHeadphones, BsLaptop, BsPhone, BsTablet } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import ContentLayout from './ContentLayout';
import { IDevice } from '../../types/device';
import { Link, useNavigate } from 'react-router-dom';
import { checkAdmin } from '../../api/user';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        const check = async () => {
            try {
                const check = await checkAdmin();
                console.log(check);
            } catch ({
                response: {
                    data: { message },
                },
            }) {
                navigate('/');
            }
        };
        check();
    }, []);

    const [selectedMenu, setSelectedMenu] = useState('1');

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleMenuChange = (e) => {
        setSelectedMenu(e.key);
    };

    const getContent = () => {
        let data: IDevice[] = [];
        switch (selectedMenu) {
            case '1':
                data = props.devices.filter(
                    (device) => device.categoryId.name === 'Điện thoại',
                );
                return (
                    <ContentLayout
                        devices={data}
                        brands={props.brands}
                        onRemove={props.onRemove}
                    />
                );
            case '2':
                data = props.devices.filter(
                    (device) => device.categoryId.name === 'Laptop',
                );
                return (
                    <ContentLayout
                        devices={data}
                        brands={props.brands}
                        onRemove={props.onRemove}
                    />
                );
            case '3':
                data = props.devices.filter(
                    (device) => device.categoryId.name === 'Máy tính bảng',
                );
                return (
                    <ContentLayout
                        devices={data}
                        brands={props.brands}
                        onRemove={props.onRemove}
                    />
                );
            case '4':
                data = props.devices.filter(
                    (device) => device.categoryId.name === 'Âm thanh',
                );
                return (
                    <ContentLayout
                        devices={data}
                        brands={props.brands}
                        onRemove={props.onRemove}
                    />
                );
            default:
                break;
        }
    };

    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                breakpoint='lg'
                collapsedWidth='0'
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}>
                <div className='logo' />
                <div
                    style={{
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}>
                    <Link to={'/admin'}>
                        <img
                            style={{
                                width: '100%',
                            }}
                            src='/logo.png'
                            alt=''
                        />
                    </Link>
                </div>
                <Menu
                    onClick={handleMenuChange}
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: (
                                <BsPhone
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            ),
                            label: 'Điện thoại',
                        },
                        {
                            key: '2',
                            icon: (
                                <BsLaptop
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            ),
                            label: 'Laptop',
                        },
                        {
                            key: '3',
                            icon: (
                                <BsTablet
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            ),
                            label: 'Máy tính bảng',
                        },
                        {
                            key: '4',
                            icon: (
                                <BsHeadphones
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                            ),
                            label: 'Âm thanh',
                        },
                    ]}
                />
            </Sider>
            <Layout className='site-layout' style={{ marginLeft: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div
                        style={{
                            padding: 24,
                            height: '100%',
                            background: colorBgContainer,
                        }}>
                        {getContent()}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
