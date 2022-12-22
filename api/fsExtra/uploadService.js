/*
 * @Author: XiaoJun
 * @Date: 2022-12-21 17:19:30
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-21 18:29:31
 * @Description: 处理文件上传逻辑
 * @FilePath: /xj-start-express/api/fsExtra/uploadService.js
 */
const multer = require('multer')
const SHARD_DIST = '/fsExtra'
const { getMyDist } = require('../../config')
const { querySync } = require('../../db')
const fs = require('fs-extra')
const path = require('path')

const uploadConfig = multer({
	// 文件上传的位置
	// dest: path.join(__dirname, "../public/uploads"),
	fileFilter(req, file, callback) {
		// 解决中文名乱码的问题 latin1 是一种编码格式
		file.originalname = Buffer.from(file.originalname, 'latin1').toString(
			'utf8'
		)
		callback(null, true)
	},
	storage: multer.diskStorage({
		//上传文件的目录
		destination: getMyDist([SHARD_DIST, '/uploads']), //上传的相对路径
		//上传文件的名称
		filename: function (req, file, cb) {
			cb(null, decodeURI(file.originalname))
		}
	})
})
/** 处理文件上传逻辑 */
const handleUploadFile = async (req, res) => {
	let queryMaxSql = `select max(fileId) as maxNum from xj_uploads`
	let { results } = await querySync(queryMaxSql)
	req.file.fileId = Number(results[0]?.maxNum) + 1
	let sql = `insert into xj_uploads set ?`
	const {
		results: { affectedRows }
	} = await querySync(sql, req.file)
	if (!affectedRows) {
		throw new Error('文件上传失败')
	}
	res.send({
		code: 200,
		message: '文件上传成功',
		data: req.file
	})
}
const handleDownloadFile = (req, res) => {
	let dest =
		'F:\\fireProject\\xj-start-express\\src\\fsExtra\\uploads\\黄潇军文件上传测试.png'
	let fileName = path.basename(dest)
	res.download(dest, fileName)
	// 确保dest路径存在
	// let buffer = fs.readFileSync(dest)
	// let fileName = path.basename(dest)
	// res.set({
	// 	'Content-Type': 'application/octet-stream',
	// 	'Content-Disposition': `attachment;filename=${fileName}`,
	// 	'Content-Length': 123
	// })
	// res.send({
	// 	code: 200,
	// 	data: buffer
	// })
}
/** 异步下载文件 */
function downloadFileAsync(uri, dest) {}
module.exports = {
	uploadConfig,
	handleUploadFile,
	handleDownloadFile
}
