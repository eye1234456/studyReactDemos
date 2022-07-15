import React, { useEffect, useState } from "react";
import client from "../../api/client";
import './More.css';
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export default function More() {

    // more模块分为上3列，中2列 下1列banner
    const [more, setMore] = useState([]);

    useEffect(() => {
        client.get('/api/more').then(data => {
            setMore(data.data)
        });
    }, []);

    return (
        <div id="more">
            <div className="more_top">
                {more.slice(0, 3).map((item, index) => {
                    return (
                        <div
                            key={`more_top${index}`}
                            className="more_link"
                        >
                            <a href={item.url}>
                                <img src={item.icon} alt="" />
                            </a>
                        </div>
                    );
                })}
            </div>
            <div className="more_middle">
                {more.slice(3, 5).map((item, index) => {
                    return (
                        <div
                            key={`more_middle${index}`}
                            className="more_style"
                        >
                            <a href={item.url}>
                                <img src={item.icon} alt="" />
                            </a>
                        </div>
                    );
                })}
            </div>
            <div className="more_bottom">
                <Swiper
                    // className="swiper-container"
                    modules={[Autoplay]}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
                >
                    {more.slice(5, 7).map((item, index) => {
                        return (
                            <SwiperSlide
                                key={`more_bottom${index}`}
                            // className="swiper-slide"
                            >
                                <img
                                    // className="img"
                                    src={item.icon}
                                    alt="" />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}