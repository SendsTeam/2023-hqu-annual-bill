import { onMounted, onUnmounted } from 'vue'

//绑定屏幕触摸事件:点击继续
export function useScreenTouchEventListener() {
    const next = () => {
        alert(1)
    }
    //这里保证了生命周期函数调用栈是同步的
    onMounted(() => {
        document.addEventListener('click', next)
    })
    onUnmounted(() => {
        document.removeEventListener('click', next)
    })

    return {}
}

//透明渐变
export function useGradationElement<T extends HTMLElement>(
    el: T, //目标元素
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
            const value = Number(el.style.opacity)
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
    //注意这里也要debounce,不然会出现调用栈不同步
    const closeGradation = debounce(() => {
        clearInterval(intervalId)
    })

    return {
        gradation,
        closeGradation
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
