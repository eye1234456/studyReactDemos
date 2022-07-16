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
        <div id="header">
            <Swiper
                loop={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[Autoplay, Pagination]}

            >
                {imgUrls.map(imgUrl => {
                    return (
                        <SwiperSlide
                            key={imgUrl}
                        >
                            <img
                                src={imgUrl}
                                alt="" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}