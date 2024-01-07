const express = require("express")
const router = express.Router()
const appSettingsService = require('../services/app-settings')

router.get('/get', async (req, res) => {
	let settings = await appSettingsService.getSettings()

	res.status(200)
	res.send(settings)
	res.end()
})

router.post('/theme', async (req, res) => {
  let newTheme = req.body
	await appSettingsService.updateTheme(newTheme)

	res.status(201)
	res.end()
})

module.exports = router