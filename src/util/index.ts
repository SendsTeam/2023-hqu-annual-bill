//判断是移动端还是手机端
export function IsPC() {
    const userAgentInfo = navigator.userAgent
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let flag = true
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
        }
    }
    return flag
}

//根据时间戳获取格式化时间
export function getFormattedTime(stamp: number): string {
    //这里因为是传unix时间戳,所以要先乘以1k
    const date = new Date(stamp * 1000)
    const year = date.getFullYear()
    //month索引要+1
    const month = date.getMonth() + 1
    //获取日期
    const day = date.getDate()
    //获取小时
    const hour = date.getHours()
    //获取分钟
    const minute = date.getMinutes()
    //获取秒
    const second = date.getSeconds()
    return `${year}年${month}月${day}日-${hour}:${minute}:${second}`
}

//微信重定向,重定向后可以在url中获取code
export function wxRedirect() {
    const targetUrl = `https://apps.hqu.edu.cn/wechat-hqu/wechatauth.html?proxyTo=authoauth&sendUrl=/connect/oauth2/authorize?appid=wxfe035b066fb1158b&redirect_uri=${encodeURIComponent(
        `${document.location.origin}`
    )}&encode_flag=Y&response_type=code&scope=snsapi_userinfo#wechat_redirect`
    //跳转到微信重定向页面,获取code
    window.location.href = targetUrl
}

//判断是否在微信中
export function isInWechat(): boolean {
    return window.navigator.userAgent.includes('MicroMessenger')
}

//获取通过url微信code
export function getCodeByURL(): string | null {
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('code')
}

//根据wx跳转拿到code
export function getCodeByRedirect(): string {
    //第一步先通过url获取一次Code
    //如果没有,那么重定向去拿
    const code = getCodeByURL()
    if (code) {
        return code
    } else {
        wxRedirect()
        return ''
    }
}
