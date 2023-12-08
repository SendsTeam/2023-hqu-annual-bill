import { onUnmounted } from 'vue'

//透明渐变:支持三种模式:逐渐显现,逐渐消失,来回消失显现
export function useGradation<T extends HTMLElement>(
    el: T, //目标元素
    interval: number = 1000, //间隔时间
    delta: number = 1 //每次间隔的变化量
) {
    //使用css3过渡属性,优化性能
    el.style.transition = `all ${interval / 1000}s linear`

    let intervalId: number
    //双向渐变
    const gradation = debounce(() => {
        //增长方向标识量
        let direction: 'up' | 'down'
        //关闭已有的定时器
        clearInterval(intervalId)
        intervalId = setInterval(() => {
            const value = parseFloat(el.style.opacity)
            //根据当前的值决定方向
            if (value <= 0) {
                direction = 'up'
            } else if (value >= 1) {
                direction = 'down'
            }
            //根据方向决定值的变化:增长还是减小
            switch (direction) {
                case 'up':
                    el.style.opacity = `${value + delta}`
                    break
                case 'down':
                    el.style.opacity = `${value - delta}`
                    break
            }
        }, interval)
    })

    //逐渐显现
    const singleUpGradation = debounce(() => {
        el.style.opacity = '0'
        clearInterval(intervalId)
        intervalId = setInterval(() => {
            const value = parseFloat(el.style.opacity)
            el.style.opacity = `${value + delta}`
            if (parseFloat(el.style.opacity) >= 1) {
                //结束循环
                clearInterval(intervalId)
            }
        }, interval)
    })

    //逐渐消失
    const singleDownGradation = debounce(() => {
        el.style.opacity = '1'
        clearInterval(intervalId)
        intervalId = setInterval(() => {
            const value = parseFloat(el.style.opacity)
            el.style.opacity = `${value - delta}`
            if (parseFloat(el.style.opacity) <= 0) {
                //结束循环
                clearInterval(intervalId)
            }
        }, interval)
    })

    //停止渐变
    const stopGradation = debounce(() => {
        clearInterval(intervalId)
    })

    //自动停止计时
    onUnmounted(() => {
        clearInterval(intervalId)
    })

    return {
        //这三种同时只能调用一种,会有覆盖
        gradation,
        singleUpGradation,
        singleDownGradation,
        stopGradation
    }
}

//旋转
export function useRotation<T extends HTMLElement>(
    el: T,
    options: {
        interval?: number //旋转间隔
        delta?: number //旋转变化量
        start?: number //旋转起点角度值
        end?: number //旋转终点角度值
        overflow?: boolean //是否做溢出处理
        immediately?: boolean //是否立刻触发旋转
        transition?: string //过渡属性值
    } = {}
) {
    //双重默认值
    const {
        start = 0,
        end = 360,
        interval = 2000,
        delta = 360,
        overflow = false,
        immediately = true,
        transition = `all ${(interval / 1000) * 2}s linear` //过渡秒数最好是interval的两倍
    } = options

    //初始角
    let deg = start
    let intervalId: number

    //使用css3过渡属性,优化性能
    el.style.transition = transition

    //顺时针旋转
    //#region
    //实现方法
    const _rotate = () => {
        el.style.rotate = `${(deg += delta)}deg`
        //溢出
        if (deg > end && overflow) {
            deg = start
        }
    }
    //对外方法
    let hasRotated = false
    const rotate = debounce(() => {
        //开启过渡
        el.style.transition = transition
        //重置上一次的旋转状态
        clearInterval(intervalId)
        if (immediately && !hasRotated) {
            _rotate()
            hasRotated = true
        }
        intervalId = setInterval(() => {
            _rotate()
        }, interval)
    })
    //#endregion

    //逆时针旋转
    //#region
    //实现方法
    const _rotateReverse = () => {
        el.style.rotate = `${(deg -= delta)}deg`
        if (deg < start && overflow) {
            deg = end
        }
    }
    //对外方法
    let hasRotatedReverse = false
    const rotateReverse = debounce(() => {
        //开启过渡
        el.style.transition = transition
        //重置上一次的旋转状态
        clearInterval(intervalId)
        if (immediately && !hasRotatedReverse) {
            _rotateReverse()
            hasRotatedReverse = true
        }
        intervalId = setInterval(() => {
            _rotateReverse()
        }, interval)
    })
    //#endregion

    //重置状态
    const _resetStatus = () => {
        //TODO:这里怎么实现平滑暂停
        setTimeout(() => {
            el.style.transition = ''
        }, 100)

        //重置标记,方便下次恢复调用时立刻旋转
        hasRotated = false
        hasRotatedReverse = false
    }

    //停止
    const stopRotate = debounce(() => {
        _resetStatus()
        clearInterval(intervalId)
    })

    //自动停止计时
    onUnmounted(() => {
        clearInterval(intervalId)
    })

    return {
        rotate,
        rotateReverse,
        stopRotate
    }
}

//音频
export function useAudio(
    options: {
        name?: string
        src?: string
        toggleHook?: () => void //切换音频状态触发的hook
    } = {}
) {
    const { name = 'bgm1.mp3', src = '/src/assets/audio/', toggleHook } = options

    //使用js控制音频
    const audio = new Audio(src + name)
    //播放音频
    //!注意这里处理Promise,且要和其他事件(如click)绑定播放,不能自动播放,会受协议限制
    const play = async () => {
        try {
            await audio.play()
        } catch (error) {
            console.log(error)
        }
    }
    //暂停
    const pause = () => {
        audio.pause()
    }
    //是否正在播放
    const isPlaying = () => {
        return !audio.paused
    }
    //切换
    const toggle = () => {
        //记得要先执行hook
        toggleHook && toggleHook()

        if (audio.paused) {
            play()
        } else {
            pause()
        }
    }

    //自动关闭音乐
    onUnmounted(() => {
        audio.pause()
    })

    return {
        play,
        pause,
        toggle,
        isPlaying
    }
}

//防抖化
function debounce<T extends (...args: any[]) => any>(func: T, waitFor: number = 0) {
    let timeout: number
    return (...args: Parameters<T>): ReturnType<T> => {
        let result: ReturnType<T> = undefined as ReturnType<T>
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            result = func(...args)
        }, waitFor)

        return result
    }
}
