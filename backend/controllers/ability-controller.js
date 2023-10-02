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

router.post('/attack/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let attack = req.body

  await abilityService.updateAttack(characterId, attack)
  
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

module.exports = router