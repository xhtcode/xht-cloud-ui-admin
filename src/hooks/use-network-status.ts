type callbackType = (status: NETWORK_STATUS) => void;
export const useNetworkStatus = (callback: callbackType) => {
    const updateOnlineStatus = () => {
        const status: NETWORK_STATUS = navigator.onLine ? 'online' : 'offline';
        callback(status);
    }

    onMounted(() => {
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
    });

    onUnmounted(() => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
    })
}
