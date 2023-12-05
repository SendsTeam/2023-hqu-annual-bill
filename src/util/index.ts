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

export function getLocation() {
    const options = {
        enableHighAccuracy: true, //true为高精度，但耗电量增加
        timeout: 5000, //超时时间必填，否则默认为无穷大
        maximumAge: 0 //位置的缓存时间，默认0即不缓存
    }

    //泉州厦门经度分界设置为118.5,大于是泉州,小于是厦门
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const crd = pos.coords

            console.log('Your current position is:')
            console.log('Latitude : ' + crd.latitude)
            console.log('Longitude: ' + crd.longitude)
            console.log('More or less ' + crd.accuracy + ' meters.')
            alert(crd.latitude)
        },
        (err) => {
            console.warn('ERROR(' + err.code + '): ' + err.message)
        },
        options
    )
}
