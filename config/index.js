/*
 * @Author: XiaoJun
 * @Date: 2022-12-02 14:04:47
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-07 14:36:26
 * @Description: 组件功能
 * @FilePath: /xj-start-express/config/index.js
 */

const path = require('path')
module.exports = {
	apiRootPath: '/xjStart',
	diskRoot: '/src',
	jwtSecretKey: 'xjJwtSecret', //jwt密钥
	getMyDist(filePath) {
		filePath = [[filePath]].flat(Infinity).filter(item => item)
		let reg = /(.*)\\config$/
		let myDirname = __dirname.match(reg)[1]
		return path.join(myDirname, _this.diskRoot, ...filePath)
	}
}
let _this = module.exports
