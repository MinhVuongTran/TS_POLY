import { useEffect, useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getOneDevice } from '../../api/device';
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
const AdminDeviceUpdatePage = (props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [specification, setSpecification] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'content',
    });

    useEffect(() => {
        getOneDevice(id).then(({ data }) => reset(data.data));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getOneDevice(id);
            const specifications =
                response.data.data.specifications[0].attributes;
            setValue('content', specifications);
            setSpecification(specifications);
        };
        fetchData();
    }, []);

    const { id } = useParams();

    const onSubmit = (values: any) => {
        const { _id, ...data } = values;
        data.specifications = [
            {
                name: 'Content',
                attributes: data.content,
            },
        ];
        data.images = [
            {
                base_url: imageUrl,
                is_gallery: true,
                large_url: imageUrl,
                medium_url: imageUrl,
                small_url: imageUrl,
                thumbnail_url: imageUrl,
            },
        ];
        delete data.content;
        props.onUpdate(data, _id);
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
                            onFinish={handleSubmit(onSubmit)}
                            style={{ maxWidth: 600 }}
                            validateMessages={validateMessages}>
                            <Form.Item
                                label='Name'
                                rules={[{ required: true }]}>
                                <Controller
                                    name='name'
                                    control={control}
                                    render={({ field }) => <Input {...field} />}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Brand'
                                rules={[{ required: true }]}>
                                <Controller
                                    name='brandId'
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field}>
                                            {props.brands.map((brand: any) => (
                                                <Select.Option
                                                    key={brand._id}
                                                    value={brand._id}>
                                                    {brand.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Category'
                                rules={[{ required: true }]}>
                                <Controller
                                    name='categoryId'
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field}>
                                            {props.categories.map(
                                                (category: any) => (
                                                    <Select.Option
                                                        key={category._id}
                                                        value={category._id}>
                                                        {category.name}
                                                    </Select.Option>
                                                ),
                                            )}
                                        </Select>
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Price'
                                rules={[
                                    { required: true, type: 'number', min: 0 },
                                ]}>
                                <Controller
                                    name='price'
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber {...field} />
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Original price'
                                rules={[
                                    { required: true, type: 'number', min: 0 },
                                ]}>
                                <Controller
                                    name='original_price'
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber {...field} />
                                    )}
                                />
                            </Form.Item>
                            <Form.Item name={'description'} label='Description'>
                                <Controller
                                    name='description'
                                    control={control}
                                    render={({ field }) => (
                                        <Input.TextArea
                                            rows={8}
                                            minLength={100}
                                            {...field}
                                        />
                                    )}
                                />
                            </Form.Item>
                            <Form.Item label='Image' valuePropName='fileList'>
                                {/* <Controller
                    control={control}
                    name='images'
                    render={({ field }) => ( */}
                                <Upload
                                    action={
                                        'http://localhost:8080/upload/image'
                                    }
                                    name='image'
                                    listType='picture-card'
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
                                <Form.List name='content'>
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(
                                                (
                                                    { key, name, ...restField },
                                                    index,
                                                ) => (
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
                                                            ]}>
                                                            <Controller
                                                                name={`content[${index}].code`}
                                                                control={
                                                                    control
                                                                }
                                                                defaultValue={
                                                                    fields[
                                                                        index
                                                                    ]?.code
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <Input
                                                                        placeholder='Code'
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[
                                                                name,
                                                                'name',
                                                            ]}>
                                                            <Controller
                                                                name={`content.${index}.name`}
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <Input
                                                                        placeholder='name'
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[
                                                                name,
                                                                'value',
                                                            ]}>
                                                            <Controller
                                                                name={`content.${index}.value`}
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <Input
                                                                        placeholder='value'
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
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

export default AdminDeviceUpdatePage;
