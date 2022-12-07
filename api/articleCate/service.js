const { querySync } = require('../../db')

/*
 * @Author: XiaoJun
 * @Date: 2022-12-06 15:06:58
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-06 15:49:42
 * @Description: 组件功能
 * @FilePath: /xj-start-express/api/articleCate/service.js
 */
module.exports = {
	// #region ********** 公共模块 start **************/
	/** 指定name或者别名的语句 */
	async queryArticleCate(name, alias) {
		let sql = `select * from express_article_cate where name = ? or alias = ?`
		const { results } = await querySync(sql, [name, alias])
		return results
	},
	// #endregion ******* 公共模块 ~end~ **************/

	/** 添加书籍类型 */
	async doAdd(req, res) {
		const { body } = req
		const { name, alias } = body
		// 判断唯一性
		const results = await this.queryArticleCate(name, alias)
		if (results?.length) {
			throw new Error('该文章类型已存在')
		}
		// 执行添加操作
		let sql = `insert into express_article_cate set ?`
		const {
			results: { affectedRows }
		} = await querySync(sql, body)
		if (!affectedRows) {
			throw new Error('添加文章类型失败')
		}
		res.send({
			code: 200,
			message: '添加文章类型成功'
		})
	},
	/** 全量查询书籍类型 */
	async allList(req, res) {
		let sql = `select * from express_article_cate where is_deleted != 1`
		const { results } = await querySync(sql)
		res.send({
			code: 200,
			data: results,
			message: '获取书籍类型成功'
		})
	},
	/** 删除书籍类型 */
	async delete(req, res) {
		const { body } = req
		const { cateId } = body
		let sql = `update express_article_cate set is_deleted = 1 where cateId = ?`
		const {
			results: { affectedRows }
		} = await querySync(sql, cateId)
		if (!affectedRows) {
			throw new Error('删除书籍类型失败')
		}
		res.send({
			code: 200,
			message: '书籍类型删除成功'
		})
	}
}
