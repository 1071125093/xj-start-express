/*
 * @Author: XiaoJun
 * @Date: 2022-12-07 13:15:37
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-07 19:40:43
 * @Description: 简易demo 不做service层
 *
 * https://juejin.cn/post/6844903641594216455
 *
 * @FilePath: /xj-start-express/api/fsExtra/index.js
 */
const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs-extra')
const { getMyDist } = require('../../config')

const SHARD_DIST = '/fsExtra'
/** 文件内容复制 */
router.post('/copy', async (req, res) => {
	let baseDist = getMyDist([SHARD_DIST, '/copy/source.txt'])
	let targetDist = getMyDist([SHARD_DIST, '/copy/target.txt'])
	const results = await fs.copy(baseDist, targetDist, {
		filter(sourceFile, targetFile) {}
	})
	res.send({
		code: 200,
		message: '文字复制成功'
	})
})
/** 文件夹清空 */
router.post('/emptyDir', async (req, res) => {
	let dir = getMyDist([SHARD_DIST, '/emptyDir'])
	// 可以实现多层级创建目录
	// let dir = getMyDist([SHARD_DIST, '/emptyDir/temp1/temp2'])
	const results = await fs.emptyDir(dir)
	res.send({
		code: 200,
		message: '目录清空成功'
	})
})

/** 确认是否存在该文件 */
router.post('/ensureFile', async (req, res) => {
	// 与清空类似 可以实现多层级创建目录
	// let dir = getMyDist([SHARD_DIST, '/emptyDir/temp1/temp2'])
	// 可以创建新文件-- 若已存在 则无事发生
	// let dir = getMyDist([SHARD_DIST, '/ensureFile/test.txt'])
	let dir = getMyDist([SHARD_DIST, '/ensureFile/test.txt'])
	const results = await fs.ensureFile(dir)
	res.send({
		code: 200,
		message: '目标文件确认成功'
	})
})

/** 确认是否存在目录 */
router.post('/ensureDir', async (req, res) => {
	let dir = getMyDist([SHARD_DIST, '/ensureDir'])
	// 无法创建文件
	// let dir = getMyDist([SHARD_DIST, '/ensureDir/test.txt'])
	const results = await fs.ensureDir(dir)
	res.send({
		code: 200,
		message: '确认目录成功'
	})
})

/**确认是否存在链接
 * 若不存在则创建链接
 * 源必传 目标没有则创建
 * 确认链接后 两个文件互为副本
 * 同理 ensureSymlink
 * @return {*}
 */
router.post('/ensureLink', async (req, res) => {
	let ensureLinkSource = getMyDist([SHARD_DIST, '/ensureLinkSource/index.txt'])
	// 可连带创建目录
	let ensureLinkTarget = getMyDist([SHARD_DIST, '/ensureLinkTarget/index.txt'])
	const results = await fs.ensureLink(ensureLinkSource, ensureLinkTarget)
	res.send({
		code: 200,
		message: '确认链接成功'
	})
})

/**
 * 文件换位 必须精确到文件名
 * @return {*}
 */
router.post('/move', async (req, res) => {
	let moveSource = getMyDist([SHARD_DIST, '/moveBaseOne/index.txt'])
	// 可连带创建目录
	let moveTarget = getMyDist([SHARD_DIST, '/moveBaseTwo/index.txt'])
	// const results = await fs.move(moveSource, moveTarget)
	// 可开启强制替换模式
	const results = await fs.move(moveSource, moveTarget, {
		overwrite: true
	})
	res.send({
		code: 200,
		message: '文件换位成功，还带改名效果'
	})
})

/** 删除文件
 */
router.post('/remove', async (req, res) => {
	let target = getMyDist([SHARD_DIST, '/ensureDir'])
	// let target = getMyDist([SHARD_DIST, '/ensureFile/test.txt'])
	// let target = getMyDist([SHARD_DIST, '/pathExists/test.txt'])
	const results = await fs.remove(target)
	res.send({
		code: 200,
		message: results
	})
})

/** 文件写入 仅支持字符串
 * 带创建目录和文件效果
 */
router.post('/outputFile', async (req, res) => {
	// let targetFile = getMyDist([SHARD_DIST, '/outputFile/test1.txt'])
	// let targetFile = getMyDist([SHARD_DIST, '/outputFile/test1.xlsx'])
	// let targetFile = getMyDist([SHARD_DIST, '/outputFile/test1.docx'])
	const jsonObj = {
		list: [
			{
				name: '123',
				age: 33333
			}
		]
	}
	let targetFile = getMyDist([SHARD_DIST, '/outputFile/test1.json'])
	// fs.outputFile(targetFile, jsonObj)
	fs.outputFile(targetFile, '我看看我到底能写进去一点什么东西')
	res.send({
		code: 200,
		message: '文件写入成功'
	})
})

/** 文件写入 仅支持json
 * 带创建目录和文件效果
 * 类似api writeJson 如果没有 不会创建
 */
router.post('/outputJson', async (req, res) => {
	const jsonObj = {
		list: [
			{
				name: '123',
				age: 33333
			}
		]
	}
	let targetFile = getMyDist([SHARD_DIST, '/outputJson/test1.json'])
	fs.outputJson(targetFile, jsonObj, {
		replacer(a, value, c) {
			// 第一个参数没懂 下次一定
			a = '123213123'
			return value
		}
	})
	res.send({
		code: 200,
		message: '文件写入成功'
	})
})
/** 文件写入 仅支持json
 * 带创建目录和文件效果
 */
router.post('/readJson', async (req, res) => {
	let targetFile = getMyDist([SHARD_DIST, '/outputJson/test1.json'])
	const data = await fs.readJson(targetFile)
	res.send({
		code: 200,
		message: '文件读取成功',
		data
	})
})

/** 仅检查路径是否存在
 * 可检查文件夹&&文件
 */
router.post('/pathExists', async (req, res) => {
	let targetFile = getMyDist([SHARD_DIST, '/pathExists'])
	// let targetFile = getMyDist([SHARD_DIST, '/pathExists/test.txt'])
	const results = await fs.pathExists(targetFile)
	res.send({
		code: 200,
		message: results
	})
})

/** 仅检查路径是否存在
 * 可检查文件夹&&文件
 */
router.post('/rename', async (req, res) => {
	let sourceFile = getMyDist([SHARD_DIST, '/rename/新的文件名.txt'])
	let targetFile = getMyDist([SHARD_DIST, '/rename/更新的文件名.txt'])
	// let targetFile = getMyDist([SHARD_DIST, '/pathExists/test.txt'])
	const results = await fs.rename(sourceFile, targetFile)
	// const results = await fs.rename('新的文件名.txt', targetFile)
	res.send({
		code: 200,
		message: '文件改名成功'
	})
})

/** 读取文件
 */
router.post('/readFile', async (req, res) => {
	let targetFile = getMyDist([SHARD_DIST, '/readFile/test.txt'])
	const results = await fs.readFile(targetFile, 'utf-8')
	// const results = await fs.rename('新的文件名.txt', targetFile)
	res.send({
		code: 200,
		message: '读取文件成功',
		data: results
	})
})

/** 读取文件夹
 * 只读取文件名 ts类型为<filename>[]
 */
router.post('/readdir', async (req, res) => {
	let targetFile = getMyDist([SHARD_DIST, '/readdir'])
	const results = await fs.readdir(targetFile)
	res.send({
		code: 200,
		message: '读取文件成功',
		data: results
	})
})

/** 读取文件属性
/** 读取文件夹类型
 */
router.post('/stat', async (req, res) => {
	let targetFile = getMyDist([SHARD_DIST, '/readdir'])
	// let targetFile = getMyDist([SHARD_DIST, '/readdir/test1.txt'])
	const results = await fs.stat(targetFile)
	res.send({
		code: 200,
		message: '读取文件类型成功',
		data: results
	})
})

/** 打开文件
 */
router.post('/open', async (req, res) => {
	let targetFile = getMyDist([SHARD_DIST, '/open/test1.txt'])
	const results = await fs.open(targetFile)
  debugger
	res.send({
		code: 200,
		message: '文件打开成功',
		data: results
	})
})

// more 自己领悟

/** appendFile
 * 添加内容
 */
module.exports = router
