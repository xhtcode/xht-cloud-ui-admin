/**
 * @description除了分页列表之外，加载更多（或延迟加载）是加载数据的一种友好方式。
 * 特别是对于移动设备，几乎在移动设备上运行的应用程序都会在其 UI 中加载更多负载。
 * 为此，需要检测用户滚动到列表底部并触发该事件的回调。
 */
export const useScrollToBottom = (callback = () => {
}) => {
    const handleScrolling = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            callback();
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScrolling);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScrolling);
    });
}
