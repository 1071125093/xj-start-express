/*
 * @Author: XiaoJun
 * @Date: 2022-12-02 13:56:09
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-02 17:04:15
 * @Description: 组件功能
 * @FilePath: /xj-start-express/api/user/index.js
 */
const express = require('express')
const router = express.Router()
const db = require('../../db/index')

// #region ********** 注册相关模块 start **************/
router.post('/regist', (req, res) => {
  const userinfo = req.body
  let sql = `select * from xj_join_classes where username=?`
  // userinfo.username
  db.query(sql,(err,result)=>{
  })
	res.send({
		message: '注册成功'
	})
})
// #endregion ******* 注册相关模块 ~end~ **************/

// #region ********** 登录相关模块 start **************/
router.post('/login', (req, res) => {
	res.send({
		message: '登录成功'
	})
})
// #endregion ******* 登录相关模块 ~end~ **************/

module.exports = router
