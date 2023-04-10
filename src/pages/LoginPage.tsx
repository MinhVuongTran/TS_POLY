import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Link, useNavigate } from 'react-router-dom';
import { getOneUser, getUserByForm } from '../api/user';
import { useLocalStorage } from '../hooks/useLocalStorage';
import HeaderLayout from '../components/layouts/HeaderLayout';

const layout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
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
            offset: 4,
        },
    },
};

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

interface FormLogin {
    email: string;
    password: string;
    remember: boolean;
}

const LoginPage: React.FC = () => {
    const [user, setUser] = useLocalStorage('user', null);
    const [password, setPassword] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);

    const navigate = useNavigate();
    if (localStorage.getItem('user')) {
        navigate('/');
    }

    const onFinish = async (values: FormLogin) => {
        try {
            const { email, password } = values;
            const data = { email, password };
            const {
                data: {
                    data: { accessToken, user },
                },
            } = await getUserByForm(data);
            setUser({ accessToken, ...user });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handlePasswordInput = (e) => {
        const value = e.target.value.replace(/\s+/g, '');
        setPassword(value);
    };

    const onForgotPasswordClick = () => {
        setForgotPassword(true);
    };

    return (
        <>
            <HeaderLayout />
            <Content>
                <Form
                    {...layout}
                    name='normal_login'
                    className='login-form max-w-2xl mx-auto h-screen flex justify-center flex-col'
                    initialValues={{ remember: true }}
                    validateMessages={validateMessages}
                    onFinish={onFinish}>
                    {forgotPassword ? (
                        <>
                            <Form.Item
                                name='email'
                                rules={[{ required: true, type: 'email' }]}
                                label='Email'>
                                <Input />
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='login-form-button mr-4 min-w-[120px]'>
                                    Reset Password
                                </Button>
                                <Space>
                                    <Button
                                        type='link'
                                        onClick={() =>
                                            setForgotPassword(false)
                                        }>
                                        Login now!
                                    </Button>
                                    <Link to='/register'>Register now!</Link>
                                </Space>
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item
                                name='email'
                                rules={[{ required: true, type: 'email' }]}
                                label='Email'>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                    {
                                        min: 6,
                                        message:
                                            'Password must be at least 6 characters!',
                                    },
                                    { whitespace: true, message: 'Not space' },
                                ]}
                                label='Password'>
                                <Input.Password
                                    placeholder='Password'
                                    visibilityToggle={true}
                                />
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Space>
                                    <Form.Item
                                        name='remember'
                                        valuePropName='checked'
                                        noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>

                                    <Button
                                        type='link'
                                        onClick={onForgotPasswordClick}>
                                        Forgot password
                                    </Button>
                                </Space>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='login-form-button mr-4 min-w-[120px]'>
                                    Log in
                                </Button>
                                Or <Link to='/register'>register now!</Link>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Content>
        </>
    );
};

export default LoginPage;

// #components-form-demo-normal-login .login-form {
//     max-width: 300px;
//   }
//   #components-form-demo-normal-login .login-form-forgot {
//     float: right;
//   }
//   #components-form-demo-normal-login .ant-col-rtl .login-form-forgot {
//     float: left;
//   }
//   #components-form-demo-normal-login .login-form-button {
//     width: 100%;
//   }
