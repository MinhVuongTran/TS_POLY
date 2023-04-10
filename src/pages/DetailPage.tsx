import { ShoppingCartOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Descriptions,
    Image,
    Input,
    InputNumber,
    Layout,
    Rate,
    Row,
    Space,
    Spin,
    Tooltip,
    Typography,
    message,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneDevice } from '../api/device';
import { IDevice } from '../types/device';
import { useLocalStorage } from '../hooks/useLocalStorage';

const { Content } = Layout;
const { Title, Text } = Typography;

const DetailPage = () => {
    const [device, setDevice] = useState<IDevice>();
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();
    const [cart, setCart] = useLocalStorage('cart', null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getOneDevice(id)
            .then(({ data }) => setDevice(data.data))
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartItems);
    }, []);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    const handleChangeQuantity = (value: number) => {
        setQuantity(value);
    };

    const addToCart = (deviceId: string, quantity: number) => {
        if (!localStorage.getItem('user')) {
            navigate('/login');
        }
        messageApi.open({
            type: 'success',
            content: 'Thêm vào giỏ hàng thành công!',
        });
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        const userIndex = cart.findIndex((item: any) => item.userId === userId);
        if (userIndex === -1) {
            // Chưa có thông tin về userId và deviceId trong giỏ hàng
            const newCart = [
                ...cart,
                { userId, items: [{ deviceId, quantity }] },
            ];
            setCart(newCart);
        } else {
            // Đã có thông tin về userId trong giỏ hàng
            const newUserItems = [...cart[userIndex].items];
            const itemIndex = newUserItems.findIndex(
                (item) => item.deviceId === deviceId,
            );
            if (itemIndex === -1) {
                // Chưa có thông tin về deviceId trong giỏ hàng của userId
                newUserItems.push({ deviceId, quantity });
            } else {
                // Đã có thông tin về deviceId trong giỏ hàng của userId
                newUserItems[itemIndex].quantity += quantity;
            }
            const newCart = [...cart];
            newCart[userIndex].items = newUserItems;
            setCart(newCart);
        }
    };

    return (
        <Layout>
            <Content style={{ margin: '20px 0' }}>
                {loading ? (
                    <div className='loading'>
                        <Spin size='large' />
                    </div>
                ) : (
                    <div>
                        <Row gutter={[48, 48]}>
                            <Col span={10}>
                                <Image
                                    src={device?.images[0].base_url}
                                    height={'100%'}
                                    className='object-cover'
                                />
                            </Col>
                            <Col span={14}>
                                <Title className='line-clamp-2' level={2}>
                                    {device.name}
                                </Title>

                                <Rate allowHalf />

                                <div className='flex items-center my-4'>
                                    <span className='text-base line-through font-bold text-[#707070] mx-5'>
                                        {formatPrice(device.original_price)}
                                    </span>
                                    <span className='text-3xl font-bold text-[#D70018] '>
                                        {formatPrice(device.price)}
                                    </span>
                                </div>
                                <Descriptions
                                    bordered
                                    column={1}
                                    className='my-4'>
                                    <Descriptions.Item
                                        label={'Combo khuyến mãi'}>
                                        Mua 3 & giảm 3.000đ
                                    </Descriptions.Item>
                                    <Descriptions.Item label={'Vận chuyển'}>
                                        <div className='flex items-center mb-4'>
                                            <img
                                                src='/car1.png'
                                                alt=''
                                                className='h-7 mr-4'
                                            />
                                            <span>Miễn phí vận chuyển</span>
                                        </div>
                                        <div className='flex items-center'>
                                            <img
                                                src='/car1.png'
                                                alt=''
                                                className='h-7 mr-4'
                                            />
                                            <span>Vận chuyển đến</span>
                                        </div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={'Số lượng'}>
                                        <InputNumber
                                            min={1}
                                            defaultValue={1}
                                            max={10}
                                            value={quantity}
                                            onChange={handleChangeQuantity}
                                        />
                                    </Descriptions.Item>
                                </Descriptions>
                                <Space className='mt-10'>
                                    <Button
                                        type='primary'
                                        danger
                                        className='min-w-[250px] h-14 text-lg'>
                                        Mua Ngay
                                    </Button>
                                    {contextHolder}
                                    <Tooltip title='Thêm vào giỏ hàng'>
                                        <Button
                                            danger
                                            className='h-14 min-w-[56px] bg-transparent ml-6 text-3xl'
                                            onClick={() =>
                                                addToCart(device._id, quantity)
                                            }
                                            icon={
                                                <ShoppingCartOutlined />
                                            }></Button>
                                    </Tooltip>
                                </Space>
                            </Col>
                        </Row>
                        <Descriptions
                            className='my-10'
                            title='Đặc điểm sản phẩm'
                            layout='vertical'
                            bordered
                            column={5}>
                            {device?.specifications[0].attributes.map(
                                (item, i) => (
                                    <Descriptions.Item
                                        label={item.name}
                                        key={i}>
                                        {item.value}
                                    </Descriptions.Item>
                                ),
                            )}
                        </Descriptions>
                        <div
                            className='text-base my-14'
                            dangerouslySetInnerHTML={{
                                __html: device.description,
                            }}
                        />
                    </div>
                )}
            </Content>
        </Layout>
    );
};

export default DetailPage;
