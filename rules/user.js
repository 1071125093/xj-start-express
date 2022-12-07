/*
 * @Author: XiaoJun
 * @Date: 2022-12-05 15:23:20
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-06 09:50:32
 * @Description: 通用型规则--建议通用
 * @FilePath: /xj-start-express/rules/user.js
 */
// #region ********** rules相关 start **************/
const joi = require('joi')
/** 用户名 */
const username = joi
	.string()
	.alphanum()
	.min(3)
	.max(10)
	.required()
	.error(err => {
		// 此处可自定义错误提示
		// 可通过error.code判断错误类型
		throw new Error(err)
	})
/** 密码 */
const password = joi
	.string()
	.pattern(/^[\S]{6,12}$/)
	.required()

/** hobby爱好 */
const hobby = joi.required()
module.exports = {
	/** 登录验证 */
	registValidate: {
		body: {
			username,
			password
		}
	},
	/** 更新验证 */
	updateValidate: {
		body: {
			username,
			hobby
		}
	},
	resetPasswordValidate: {
		body: {
			username,
			oldPassword: password,
			newPassword: joi.not(joi.ref('oldPassword')).concat(password)
		}
	}
}
// #endregion ******* rules相关 ~end~ **************/
