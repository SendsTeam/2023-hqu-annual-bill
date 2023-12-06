//透明渐变:支持三种模式:逐渐显现,逐渐消失,来回消失显现
export function useGradation<T extends HTMLElement>(
    el: T, //目标元素
    mode: 'double' | 'single-up' | 'single-down' = 'double', //三种渐变模式
    interval: number = 10, //间隔时间
    delta: number = 0.01 //每次间隔的变化量
) {
    let intervalId: number
    //进行防抖化的透明度渐变
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

    return {
        gradation,
        singleUpGradation,
        singleDownGradation,
        stopGradation
    }
}

//旋转
export function useRotation<T extends HTMLElement>(
    el: T,
    interval: number = 10,
    delta: number = 1,
    { start = 0, end = 360 } = {}
) {
    let deg = start
    let intervalId: number

    //顺时针旋转
    const rotate = debounce(() => {
        clearInterval(intervalId)
        intervalId = setInterval(() => {
            el.style.rotate = `${deg}deg`
            deg += delta
            if (deg >= end) {
                deg = start
            }
        }, interval)
    })

    //逆时针旋转
    const rotateReverse = debounce(() => {
        clearInterval(intervalId)
        intervalId = setInterval(() => {
            el.style.rotate = `${deg}deg`
            deg -= delta
            if (deg >= start) {
                deg = end
            }
        }, interval)
    })

    //停止
    const stopRotate = debounce(() => {
        clearInterval(intervalId)
    })

    return {
        rotate,
        rotateReverse,
        stopRotate
    }
}

//音频
export function useAudio(name: string = 'bgm1.mp3', src: string = '/src/assets/audio/') {
    //使用纯js生成
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
        if (audio.paused) {
            play()
        } else {
            pause()
        }
    }

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
