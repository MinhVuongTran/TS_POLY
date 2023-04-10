import React from 'react';
import { Layout, Row, Col, List, Card, Typography } from 'antd';

const { Footer } = Layout;

const data = [
    [
        'Tìm cửa hàng gần nhất',
        'Mua hàng từ xa',
        'Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện)',
    ],
    [
        'Gọi mua hàng: 1800.2044 (8h00 - 22h00)',
        'Gọi khiếu nại: 1800.2063 (8h00 - 21h30)',
        'Gọi bảo hành: 1800.2064 (8h00 - 21h00)',
    ],
    [
        'Mua hàng và thanh toán Online',
        'Mua hàng và trả góp Online',
        'Tra thông tin đơn hàng',
        'Tra điểm Smember',
        'Tra cứu thông tin VAT điện tử',
        'Trung tâm bảo hành chính hãng',
        'Quy định về việc sao lưu dữ liệu',
        'Dịch vụ bảo hành điện thoại',
    ],
    [
        'Quy chế hoạt động',
        'Chính sách bảo hành',
        'Liên hệ hợp tác kinh doanh',
        'Khách hàng doanh nghiệp (B2B)',
        'Ưu đãi thanh toán',
        'Tuyển dụng',
    ],
];
const FooterLayout = () => {
    return (
        <Footer className=' bg-white my-10'>
            <List
                className='max-w-7xl m-auto'
                size='small'
                grid={{
                    gutter: 32,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 4,
                }}
                dataSource={data}
                renderItem={(item) =>
                    item.map((subItem, i) => (
                        <List.Item key={i}>
                            <Typography.Text>{subItem}</Typography.Text>
                        </List.Item>
                    ))
                }
            />
        </Footer>
    );
};

export default FooterLayout;
