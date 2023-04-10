import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const SliderLayout: React.FC = () => (
    <Carousel autoplay>
        <div>
            <h3 style={contentStyle}>
                <img
                    src='/slider1.png'
                    alt=''
                    className='w-full object-cover'
                />
            </h3>
        </div>
        <div>
            <h3 style={contentStyle}>
                <img
                    src='/slider2.png'
                    alt=''
                    className='w-full object-cover'
                />
            </h3>
        </div>
    </Carousel>
);

export default SliderLayout;
