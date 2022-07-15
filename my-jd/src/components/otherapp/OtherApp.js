import React, { useEffect, useState } from "react";
import client from "../../api/client";
import './OtherApp.css';

export default function OtherApp() {

    const [apps, setApps] = useState([]);

    useEffect(() => {
        client.get('/api/otherapp').then(data => {
            setApps(data.data);
        });
    }, []);

    return (
        <div className="oapp">
            <ul>
                {apps.map(app => {
                    return (
                        <li key={app.icon}>
                            <div className="app_icon">
                                <img src={app.icon} alt="" />
                            </div>
                            <span>{app.title}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}