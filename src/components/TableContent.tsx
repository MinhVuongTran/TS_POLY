import { EditFilled } from '@ant-design/icons';
import { Button, Space, Switch } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

const TableContent = (props) => {
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
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.description.startsWith(value),
            sorter: (a, b) => a.description.length - b.description.length,
            filterSearch: true,
            width: '40%',
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
                        <Button
                            type='primary'
                            onClick={() => removeProduct(record.key)}>
                            Remove
                        </Button>
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
};

export default TableContent;
