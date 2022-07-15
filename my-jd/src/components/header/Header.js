import React, { useEffect, useState } from "react";
import './Header.css';
import client from "../../api/client";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export default function Header() {

    const [imgUrls, setImgUrls] = useState([]);

    useEffect(() => {
        client.get('/api/swiper').then(data => {
            if (data.data[0].icon) {
                setImgUrls(data.data.map(item => item.icon));
            } else {
                setImgUrls(data.data);
            }

        });
    }, []);

    return (
        <div className="header">
            <Swiper
                // className="swiper-container"
                modules={[Autoplay]}
            // spaceBetween={50}
            // slidesPerView={3}
            // navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            >
                {imgUrls.map(imgUrl => {
                    return (
                        <SwiperSlide
                            key={imgUrl}
                        // className="swiper-slide"
                        // style={{ 'background-color': 'green', }}
                        >
                            <img
                                // className="img"
                                src={imgUrl}
                                style={{ height: '100%' }}
                                alt="" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}