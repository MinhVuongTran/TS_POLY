import type { CascaderProps } from 'antd';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { addUser } from '../api/user';
import { Link, useNavigate } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import HeaderLayout from '../components/layouts/HeaderLayout';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

interface registerForm {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirm: string;
    agreement: boolean;
}

const RegisterPage: React.FC = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    if (localStorage.getItem('user')) {
        navigate('/');
    }
    const onFinish = async (values: registerForm) => {
        try {
            const { agreement, confirm, ...dataForm } = values;

            const response = await addUser(dataForm);
            navigate('/login');
        } catch (error) {
            const {
                response: {
                    data: {
                        message: { keyValue },
                    },
                },
            } = error;
            const existFieldData = Object.keys(keyValue)[0];
            console.log(existFieldData);
        }
    };

    return (
        <>
            <HeaderLayout />
            <Content>
                <Form
                    {...formItemLayout}
                    form={form}
                    name='register'
                    className='max-w-2xl mx-auto h-screen flex justify-center flex-col'
                    onFinish={onFinish}
                    scrollToFirstError>
                    <Form.Item
                        name='firstName'
                        label='First name'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                                whitespace: true,
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='lastName'
                        label='Last name'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                                whitespace: true,
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='username'
                        label='Username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                                whitespace: true,
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='email'
                        label='E-mail'
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        label='Password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message:
                                    'Password must be at least 6 characters!',
                            },
                            { whitespace: true, message: 'Not space' },
                        ]}
                        hasFeedback>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name='confirm'
                        label='Confirm Password'
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The two passwords that you entered do not match!',
                                        ),
                                    );
                                },
                            }),
                        ]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name='agreement'
                        valuePropName='checked'
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  'Should accept agreement',
                                              ),
                                          ),
                            },
                        ]}
                        {...tailFormItemLayout}>
                        <Checkbox>
                            I have read the <a href='#'>agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='mr-4 min-w-[120px]'>
                            Register
                        </Button>
                        Or <Link to='/login'>Login now!</Link>
                    </Form.Item>
                </Form>
            </Content>
        </>
    );
};

export default RegisterPage;
