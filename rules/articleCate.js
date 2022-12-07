/*
 * @Author: XiaoJun
 * @Date: 2022-12-06 15:12:18
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-06 15:52:15
 * @Description: 组件功能
 * @FilePath: /xj-start-express/rules/articleCate.js
 */
const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const cateId = joi.number().integer().min(1).required()

module.exports = {
	// 添加数据种类
	add: {
		body: {
			name,
			alias
		}
	},
	delete: {
		body: {
			cateId
		}
	}
}
