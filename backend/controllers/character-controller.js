const express = require("express")
const router = express.Router()
const characterService = require('../services/character-service')

router.get('/getAll', async (req, res) => {
	let characters = await characterService.getCharacters()

	res.status(200)
	res.send(characters)
	res.end()
})

router.get('/:characterId', async (req, res) => {
	let character = await characterService.getCharacter(req.params.characterId)

	res.status(200)
	res.send(character)
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
  await characterService.addCharacterToList(req.body)
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

router.get('/shortRest/:characterId/:wellRested', async (req, res) => {
  let characterId = req.params.characterId
  let wellRested = req.params.wellRested

  await characterService.shortRest(characterId, wellRested)

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

router.get('/fix/updateBaseValues', async (req, res) => {
  await characterService.updateBaseValues()

  res.status(200)
  res.end()
})

router.get('/fix/addIdsToCharacter', async (req, res) => {
  await characterService.addIdsToCharacter()

  res.status(200)
  res.end()
})

module.exports = router