const express = require("express")
const router = express.Router()
const settingsService = require('../services/settings-service')

router.post('/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let settings = req.body

  await settingsService.updateSettings(characterId, settings)

  res.status(201)
  res.end()
})

module.exports = router