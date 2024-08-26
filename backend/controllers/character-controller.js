const express = require("express")
const router = express.Router()
const characterService = require('../services/character-service')

router.get('/getAll', async (req, res) => {
	let characters = await characterService.getCharactersForList()

	res.status(200)
	res.send(characters)
	res.end()
})

router.post('/updateSortOrder/:characterId', async (req, res) => {
  await characterService.updateSortOrder(req.params.characterId, req.body)

  res.status(201)
  res.end()
})

router.get('/:characterId', async (req, res) => {
	let character = await characterService.getCharacter(req.params.characterId)

	res.status(200)
	res.send(character)
	res.end()
})

router.get('/baseInfo/:characterId', async (req, res) => {
  let baseInfo = await characterService.getCharacterBaseInfo(req.params.characterId)

  res.status(200)
  res.send(baseInfo)
  res.end()
})

router.get('/settings/:characterId', async (req, res) => {
  let settings = await characterService.getCharacterSettings(req.params.characterId)

  res.status(200)
  res.send(settings)
  res.end()
})

router.get('/trackers/:characterId', async (req, res) => {
  let trackers = await characterService.getCharacterTrackers(req.params.characterId)

  res.status(200)
  res.send(trackers)
  res.end()
})

router.put('/tracker/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let trackerData = req.body
  await characterService.createCharacterTracker(characterId, trackerData)

  res.status(201)
  res.end()
})

router.delete('/tracker/:characterId/:trackerId', async (req, res) => {
  let characterId = req.params.characterId
  let trackerId = req.params.trackerId
  await characterService.deleteCharacterTracker(characterId, trackerId)

  res.status(202)
  res.end()
})

router.post('/tracker/:characterId/:trackerId', async (req, res) => {
  let characterId = req.params.characterId
  let trackerId = req.params.trackerId
  let data = req.body
  await characterService.updateCharacterTracker(characterId, trackerId, data)

  res.status(201)
  res.end()
})

router.post('/saveHistoryStats/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let statHistory = req.body

  await characterService.updateStatsHistory(characterId, statHistory)

  res.status(201)
  res.end()
})

router.post('/add', async (req, res) => {
	await characterService.addCharacter(req.body)

  res.status(201)
  res.end()
})

router.delete('/delete/:characterId', async (req, res) => {
	await characterService.deleteCharacter(req.params.characterId)

	res.status(202)
	res.end()
})

router.delete('/removeStats/:characterId/:tier', async (req, res) => {
  let characterId = req.params.characterId
  let tier = req.params.tier

  await characterService.deleteStats(characterId, tier)

  res.status(202)
  res.end()
})

router.get('/shortRest/:characterId', async (req, res) => {
  let characterId = req.params.characterId

  await characterService.shortRest(characterId)

  res.status(200)
  res.end()
})

router.get('/longRest/:characterId', async (req, res) => {
  let characterId = req.params.characterId

  await characterService.longRest(characterId)

  res.status(200)
  res.end()
})

router.get('/refreshEdgeAndEffort/:characterId', async (req, res) => {
  let characterId = req.params.characterId

  await characterService.refreshEdgeAndEffort(characterId)

  res.status(200)
  res.end()
})

router.post('/setAdvancements/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let data = req.body

  await characterService.setAdvancements(characterId, data)

  res.status(201)
  res.end()
})

router.post('/importCharacter', async (req, res) => {
  let data = req.body

  await characterService.importCharacter(data)

  res.status(201)
  res.end()
})

router.get('/levelUp/:characterId', async (req, res) => {
  let characterId = req.params.characterId

  await characterService.levelUp(characterId)

  res.status(200)
  res.end()
})

router.delete('/removeTier/:characterId/:tier', async (req, res) => {
  let characterId = req.params.characterId
  let tier = req.params.tier

  await characterService.deleteTier(characterId, tier)

  res.status(202)
  res.end()
})

module.exports = router
