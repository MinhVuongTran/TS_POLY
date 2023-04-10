import { Button, Card, Col, Empty, Image, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Typography } from 'antd';
import FooterLayout from '../components/layouts/FooterLayout';
import HeaderLayout from '../components/layouts/HeaderLayout';
import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const columns = [
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
    },
    {
        title: 'Giá',
        dataIndex: 'price',
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
    },
];

type CartItem = {
    deviceId: string;
    quantity: number;
};

function CartPage(props) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        const cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            const data = cart.find((item) => item.userId === userId);
            if (data) {
                const { items } = data;
                const temp = [];
                props.devices.map((device) => {
                    items.map((item: CartItem) => {
                        if (device._id === item.deviceId) {
                            const { quantity } = item;
                            const newDevice = { ...device, quantity };

                            temp.push(newDevice);
                        }
                    });
                });
                setCartItems(temp);
            }
        }
    }, []);
    console.log(cartItems);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    return (
        <>
            <HeaderLayout />
            <Layout>
                <Content className='max-w-lg mx-auto my-10'>
                    <Row gutter={[32, 32]}>
                        {cartItems.length === 0 ? (
                            <Empty description={'Giỏ hàng trống'} />
                        ) : (
                            cartItems.map((item, index) => (
                                <Row className='w-full bg-white' key={index}>
                                    <Col span={10}>
                                        <Image
                                            src={item.images[0].base_url}
                                            height={'180px'}
                                            className='object-cover'
                                        />
                                    </Col>
                                    <Col span={14} className='pl-4'>
                                        <Title level={4}>{item.name}</Title>

                                        <div className='flex items-center mt-4'>
                                            <span className='text-base line-through font-bold text-[#707070] mr-5'>
                                                {formatPrice(
                                                    item.original_price,
                                                )}
                                            </span>
                                            <span className='text-xl font-bold text-[#D70018] '>
                                                {formatPrice(item.price)}
                                            </span>
                                        </div>
                                        <Title level={5} className='mt-1'>
                                            Số lượng: {item.quantity}
                                        </Title>
                                        <Button
                                            icon={<CloseOutlined />}
                                            className='absolute top-0 right-0 border-0 m-1'></Button>
                                    </Col>
                                </Row>
                            ))
                        )}
                    </Row>
                </Content>
            </Layout>
            <FooterLayout />
        </>
    );
}

export default CartPage;
