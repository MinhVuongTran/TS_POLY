import { Badge, Card } from 'antd';
import { IDevice } from '../types/device';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';

type Props = {
    data: IDevice;
};

const Device = ({ data }: Props) => {
    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    const discount = Math.round(
        ((data.original_price - data.price) / data.original_price) * 100,
    );

    const ribbonStyle = {
        fontWeight: 'bold',
    };

    return (
        <Link to={'/detail/' + data._id}>
            <Badge.Ribbon
                text={-discount + '%'}
                style={ribbonStyle}
                color='#ee4d2d'>
                <Card
                    hoverable
                    cover={
                        <img
                            alt='thumbnail'
                            src={data.images[0].base_url}
                            className='h-80 object-cover'
                        />
                    }>
                    <div className='flex flex-col grow basis-0'>
                        <h5 className='text-lg font-semibold tracking-tight text-gray-900 line-clamp-1'>
                            {data.name}
                        </h5>
                        <div className='flex items-center justify-between'>
                            <span className='text-[18px] font-bold text-[#D70018] '>
                                {formatPrice(data.price)}
                            </span>
                            <span className='text-[14px] font-bold text-[#707070] '>
                                {formatPrice(data.original_price)}
                            </span>
                        </div>
                    </div>
                </Card>
            </Badge.Ribbon>
        </Link>
    );
};

export default Device;
