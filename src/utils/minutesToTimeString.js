export default function minutesToTimeString(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = (minutes % 60) / 60;
    return `${(hours + remainingMinutes).toFixed(1)} hours`;
}