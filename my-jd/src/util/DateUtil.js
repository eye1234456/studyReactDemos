/**
 * 倒计时剩余时间
 * @param {*} seconds 
 * @param {*} type 
 * @returns 
 */
export function countDown(seconds, type) {
    let count = 0;
    if (type === 'h') {
        count = Math.floor(seconds / (60 * 60));
    } else if (type === 'm') {
        let minites = seconds % (60 * 60);
        count = Math.floor(minites / 60);
    } else if (type === 's') {
        count = Math.floor(seconds % 60);
    }
    return Number(count).toString().padStart(2, '0');
}