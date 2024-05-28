const express = require("express")
const router = express.Router()
const abilityService = require('../services/ability-service')

router.post('/skill/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let skill = req.body

  await abilityService.updateSkill(characterId, skill)
  
  res.status(201)
  res.end()
})

router.post('/skill/:characterId/:skillId', async (req, res) => {
  let characterId = req.params.characterId
  let skillId = req.params.skillId
  let skill = req.body

  await abilityService.updateSkillSort(characterId, skillId, skill)
  
  res.status(201)
  res.end()
})

router.post('/attack/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let attack = req.body

  await abilityService.updateAttack(characterId, attack)
  
  res.status(201)
  res.end()
})

router.post('/attack/:characterId/:attackId', async (req, res) => {
  let characterId = req.params.characterId
  let attackId = req.params.attackId
  let attack = req.body

  await abilityService.updateAttackSort(characterId, attackId, attack)
  
  res.status(201)
  res.end()
})

router.post('/special/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let special = req.body

  await abilityService.updateSpecial(characterId, special)
  
  res.status(201)
  res.end()
})

router.post('/special/:characterId/:specialId', async (req, res) => {
  let characterId = req.params.characterId
  let specialId = req.params.specialId
  let special = req.body

  await abilityService.updateSpecialSort(characterId, specialId, special)
  
  res.status(201)
  res.end()
})

router.delete('/skill/:characterId/:skillName', async (req, res) => {
  let characterId = req.params.characterId
  let skillName = req.params.skillName

  await abilityService.deleteSkill(characterId, skillName)

  res.status(200)
  res.end()
})

router.delete('/attack/:characterId/:attackName', async (req, res) => {
  let characterId = req.params.characterId
  let attackName = req.params.attackName

  await abilityService.deleteAttack(characterId, attackName)

  res.status(200)
  res.end()
})

router.delete('/special/:characterId/:specialName', async (req, res) => {
  let characterId = req.params.characterId
  let specialName = req.params.specialName

  await abilityService.deleteSpecial(characterId, specialName)

  res.status(200)
  res.end()
})

router.get('/abilities', async (req, res) => {
	let abilities = await abilityService.getAllAbilities()

	res.status(200)
	res.send(abilities)
	res.end()
})

module.exports = router