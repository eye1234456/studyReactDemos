import React, { useEffect, useRef, useState } from "react";
import client from "../../api/client";
import { countDown } from "../../util/DateUtil";
import './Spike.css';

export default function Spike() {

    const [seconds, setSeconds] = useState(0);
    const [goods, setGoods] = useState(null);

    const timer = useRef();

    const timerCount = () => {
        if (seconds < 0) {
            stopTimer();
        }
        setSeconds(preSeconds => (preSeconds - 1));
    }
    const stopTimer = () => {
        clearInterval(timer.current);
    }
    useEffect(() => {
        client.get('/api/spike').then(data => {
            setGoods({ stores: data.data, more: data.more, times: data.times });
            setSeconds(data.times);
            stopTimer();
            timer.current = setInterval(timerCount, 1000);
        });
        return stopTimer;
    }, []);

    return (
        <div id="spike">
            <div className="spike_header">
                <i />
                <span className="spike_title">掌上时间</span>
                <div className="spike_time">
                    <div>
                        <span>{countDown(seconds, 'h')}</span>
                        :<span>{countDown(seconds, 'm')}</span>
                        :<span>{countDown(seconds, 's')}</span>
                    </div>
                </div>
                <div className="spike_more fr">
                    <i className="fr" />
                    <a href={goods?.more}>
                        <span>更多秒杀</span>
                    </a>
                </div>
                <div style={{ clear: "both" }} />
            </div>
            <ul className="spike_content">
                {goods?.stores?.map(store => {
                    return (
                        <li key={store.icon}>
                            <a href={store.url}>
                                <div>
                                    <img src={store.icon} alt="" />
                                </div>
                                <p>¥{store.sprice}</p>
                                <p className="real-price">¥{store.price}</p>
                            </a>

                        </li>
                    );
                })}
            </ul>
        </div>
    );
}