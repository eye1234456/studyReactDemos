import React, { useEffect, useState } from "react";
import client from "../../api/client";
import './Like.css';

export default function Like() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        client.get('/api/like').then(data => {
            setStores(data.data);
        });
    }, []);

    return (
        <div id="like">
            <p>猜你喜欢</p>
            {stores.map(store => {
                return (
                    <div
                        key={`like${store.icon}`}
                        className="like_content"
                    >
                        <div className="like_link">
                            <a href={store.url}>
                                <img src={store.icon} alt="" />
                            </a>
                        </div>
                        <div className="like_desc">
                            <span>{store.desc}</span>
                        </div>
                        <div className="like_price">
                            <span>￥{store.price}</span>
                            <div>
                                <a href={store.more}>
                                    看相似
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}