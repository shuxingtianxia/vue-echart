const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            .set('_conf', resolve('config'))
            .set('_systemOrder', resolve('src/view/systemOrder'))
    },
    // 关闭eslint规范
    lintOnSave: false
}