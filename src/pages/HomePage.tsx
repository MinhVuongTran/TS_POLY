import { useState } from 'react';
import { IDevice } from '../types/device';
import Device from '../components/Device';
import SliderLayout from '../components/layouts/SliderLayout';
import { Col, Pagination, Row } from 'antd';

const HomePage = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedData = props.devices.slice(startIndex, endIndex);

    const handlePaginationChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <>
            <SliderLayout />
            <h1 className='pb-5 text-[#444444] text-[22px]'>
                ĐIỆN THOẠI NỔI BẬT NHẤT
            </h1>
            {/* <div className='grid grid-cols-4 gap-4'> */}
            <Row gutter={[16, 16]}>
                {displayedData.map((device: IDevice, index: number) => (
                    <Col span={6} key={index}>
                        <Device data={device} />
                    </Col>
                ))}
            </Row>
            <Pagination
                defaultCurrent={1}
                total={props.devices.length}
                className='text-center my-4'
                pageSize={pageSize}
                onChange={handlePaginationChange}
            />
        </>
    );
};

export default HomePage;
