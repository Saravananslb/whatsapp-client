export const formatDate = (dateString) => {
    const dateTime = new Date(dateString);
    const hrs = dateTime.getHours();
    const mints = dateTime.getMinutes();
    const suffix = (hrs < 12) ? 'AM' : 'PM';
    return `${hrs}:${mints} ${suffix}`;
}