import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Layout,
    Select,
    Space,
    Upload,
    theme,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const AdminDeviceAddPage = (props: any) => {
    const [imageUrl, setImageUrl] = useState('');
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onFinish = (values: any) => {
        values.specifications = [
            {
                name: 'Content',
                attributes: values.content,
            },
        ];
        values.images = [
            {
                base_url: imageUrl,
                is_gallery: true,
                large_url: imageUrl,
                medium_url: imageUrl,
                small_url: imageUrl,
                thumbnail_url: imageUrl,
            },
        ];
        delete values.content;
        props.onAdd(values);
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
                        <Form
                            {...layout}
                            name='nest-messages'
                            onFinish={onFinish}
                            style={{ maxWidth: 600 }}
                            validateMessages={validateMessages}>
                            <Form.Item
                                name={'name'}
                                label='Name'
                                rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={'brandId'}
                                label='Brand'
                                rules={[{ required: true }]}>
                                <Select>
                                    {props.brands.map((brand: any) => (
                                        <Select.Option
                                            key={brand._id}
                                            value={brand._id}>
                                            {brand.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={'categoryId'}
                                label='Category'
                                rules={[{ required: true }]}>
                                <Select>
                                    {props.categories.map((category: any) => (
                                        <Select.Option
                                            key={category._id}
                                            value={category._id}>
                                            {category.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={'price'}
                                label='Price'
                                rules={[
                                    { required: true, type: 'number', min: 0 },
                                ]}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                name={'original_price'}
                                label='Original price'
                                rules={[
                                    { required: true, type: 'number', min: 0 },
                                ]}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name={'description'} label='Description'>
                                <Input.TextArea rows={8} minLength={100} />
                            </Form.Item>
                            <Form.Item label='Image' valuePropName='fileList'>
                                <Upload
                                    action={
                                        'http://localhost:8080/upload/image'
                                    }
                                    listType='picture-card'
                                    name='image'
                                    onChange={({ fileList }) => {
                                        if (fileList[0].status === 'done') {
                                            setImageUrl(
                                                `http://localhost:8080/${fileList[0].response}`,
                                            );
                                        }
                                    }}>
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>
                                            Upload
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Form.Item label='Specifications'>
                                <Form.List name={'content'}>
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(
                                                ({
                                                    key,
                                                    name,
                                                    ...restField
                                                }) => (
                                                    <Space
                                                        key={key}
                                                        style={{
                                                            display: 'flex',
                                                            marginBottom: 8,
                                                        }}
                                                        align='baseline'>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[
                                                                name,
                                                                'code',
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    message:
                                                                        'Missing code',
                                                                },
                                                            ]}>
                                                            <Input placeholder='Code' />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[
                                                                name,
                                                                'name',
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    message:
                                                                        'Missing property',
                                                                },
                                                            ]}>
                                                            <Input placeholder='Property' />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[
                                                                name,
                                                                'value',
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    message:
                                                                        'Missing value',
                                                                },
                                                            ]}>
                                                            <Input placeholder='Value' />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                            onClick={() =>
                                                                remove(name)
                                                            }
                                                        />
                                                    </Space>
                                                ),
                                            )}
                                            <Form.Item>
                                                <Button
                                                    type='dashed'
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined />}>
                                                    Add field
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                            ;
                            <Form.Item
                                wrapperCol={{
                                    ...layout.wrapperCol,
                                    offset: 8,
                                }}>
                                <Button type='primary' htmlType='submit'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminDeviceAddPage;
