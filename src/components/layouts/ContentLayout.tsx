import { EditFilled, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Switch, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

const ContentLayout = (props: any) => {
    const removeProduct = (id: number | string) => {
        props.onRemove(id);
    };

    const switchButton = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };
    const data = props.devices.map((product: any, index: number) => {
        return {
            key: product._id,
            index: index + 1,
            name: product.name,
            brand: product.brandId.slug,
            category: product.categoryId.name,
            price: product.price,
            description: product.description,
        };
    });

    interface DataType {
        key: string;
        name: string;
        price: number;
        description: string;
        brand: string;
        category: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'index',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            filters: props.brands.map((brand: any, index: number) => {
                return {
                    text: brand.name,
                    value: brand.slug,
                };
            }),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.brand === value,
            width: '40%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a, b) => a.description.length - b.description.length,
            filterSearch: true,
            // width: '10%',
            className: 'short-description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                return (
                    <Space size='middle'>
                        <Switch
                            checkedChildren='Show'
                            unCheckedChildren='Hide'
                            defaultChecked
                            onChange={switchButton}
                        />
                        <Link to={'/admin/edit/' + record.key}>
                            <EditFilled />
                        </Link>

                        <Popconfirm
                            title='Xóa sản phẩm'
                            description='Bạn có chắc là xóa sản phẩm này?'
                            onConfirm={() => removeProduct(record.key)}
                            okText='Có'
                            cancelText='Không'>
                            <Button type='primary'>Delete</Button>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    const onChange = (
        pagination: any,
        filters: any,
        sorter: any,
        extra: any,
    ) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <Link
                to={'/admin/add'}
                className='flex justify-end m-4 text-[40px]'>
                <PlusSquareOutlined />
            </Link>
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
    );
};

export default ContentLayout;
