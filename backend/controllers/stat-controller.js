const express = require("express")
const router = express.Router()
const statService = require('../services/stat-service')

router.post('/setStats/:characterId', async (req, res) => {
  let id = req.params.characterId
  let baseInfo = req.body

	await statService.setPoolStats(id, baseInfo)

	res.status(201)
	res.end()
})

module.exports = router