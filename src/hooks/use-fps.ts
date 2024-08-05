export interface UseFpsOptions {
    every?: number
}

/**
 * @description 计算网页的帧数
 */
export const useFps = (options?: UseFpsOptions) => {
    const fps = ref<number>(0)
    const every: number = options?.every ?? 100
    //用来记录起始时间
    let last: number = performance.now()
    let ticks: number = 0
    const update = () => {
        ticks += 1
        //间隔到了在重新计算
        if (ticks >= every) {
            const now: number = performance.now()
            //计算出这一帧用了多久
            const diff: number = now - last
            // 用1000ms 去除以 每一帧用的平均ms 可以得出帧数
            fps.value = Math.round(1000 / (diff / ticks))
            last = now
            ticks = 0
        }
        requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
    return fps
}
