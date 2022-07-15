import React, { useEffect, useState } from "react";
import './Search.css';

export default function Search() {
    const [bg, setBg] = useState('transparent');

    useEffect(() => {
        window.onscroll = (event) => {
            let realHeight = document.documentElement.scrollTop || document.body.scrollTop;
            let optatic = 0.8 * (realHeight / 142);
            optatic = Math.min(0.8, optatic);
            if (optatic <= 0.8) {
                setBg(`rgba(234, 44, 44, ${optatic})`);
            }
        }
    }, []);

    return (
        <div
            id="search"
            className="pf"
            style={{ background: bg }}
        >
            <div className="search pr">
                {/* 左侧logo */}
                <div className="sl pa">
                    <i />
                </div>
                {/* 搜索框 */}
                <div className="frc pr">
                    <span className="searchicon pa" />
                    <form>
                        <input
                            placeholder="全场畅饮，部分低至99减50"
                            type="text"
                        />
                    </form>
                </div>
                {/* 右侧登录 */}
                <div className="sub pa">
                    <span>登录</span>
                </div>
            </div>
        </div>
    );
}