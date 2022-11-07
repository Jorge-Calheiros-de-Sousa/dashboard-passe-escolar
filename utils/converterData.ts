export function converterDataDefault(data: any) {
    const newDate = new Date(data);
    return `${addZero(newDate.getDate())}/${addZero(newDate.getMonth() + 1)}/${newDate.getFullYear()}`
}

function addZero(num: number) {
    if (num < 10) {
        return `0${num}`;
    }
    return `${num}`
}