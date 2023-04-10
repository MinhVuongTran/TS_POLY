import { Outlet } from 'react-router-dom';
import HeaderLayout from './HeaderLayout';
import { Layout, Space } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import FooterLayout from './FooterLayout';

const SiteLayout = () => {
    return (
        <Space direction='vertical' style={{ width: '100%' }} size={[0, 48]}>
            <Layout>
                <HeaderLayout />
                <Content className='max-w-7xl m-auto'>
                    <Outlet />
                </Content>
                <FooterLayout />
            </Layout>
        </Space>
    );
};

export default SiteLayout;
