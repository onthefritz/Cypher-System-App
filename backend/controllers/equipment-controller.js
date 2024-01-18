const express = require("express")
const router = express.Router()
const equipmentService = require('../services/equipment-service')

router.get('/:characterId', async (req, res) => {
  let characterId = req.params.characterId

  let equipment = await equipmentService.getCharacterEquipment(characterId)

  res.status(200)
  res.send(equipment)
  res.end()
})

router.post('/cypherCount/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let request = req.body

  await equipmentService.updateCypherCount(characterId, request)
  
  res.status(201)
  res.end()
})

router.post('/item/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let item = req.body

  await equipmentService.upsertItem(characterId, item)
  
  res.status(201)
  res.end()
})

router.post('/item/:characterId/:itemId', async (req, res) => {
  let characterId = req.params.characterId
  let itemId = req.params.itemId
  let item = req.body

  await equipmentService.updateItemSort(characterId, itemId, item)
  
  res.status(201)
  res.end()
})

router.post('/weapon/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let weapon = req.body

  await equipmentService.upsertWeapon(characterId, weapon)
  
  res.status(201)
  res.end()
})

router.post('/weapon/:characterId/:weaponId', async (req, res) => {
  let characterId = req.params.characterId
  let weaponId = req.params.weaponId
  let weapon = req.body

  await equipmentService.updateWeaponSort(characterId, weaponId, weapon)
  
  res.status(201)
  res.end()
})

router.post('/oddity/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let oddity = req.body

  await equipmentService.upsertOddity(characterId, oddity)
  
  res.status(201)
  res.end()
})

router.post('/oddity/:characterId/:oddityId', async (req, res) => {
  let characterId = req.params.characterId
  let oddityId = req.params.oddityId
  let oddity = req.body

  await equipmentService.updateOdditySort(characterId, oddityId, oddity)
  
  res.status(201)
  res.end()
})

router.post('/cypher/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let cypher = req.body

  await equipmentService.upsertCypher(characterId, cypher)
  
  res.status(201)
  res.end()
})

router.post('/cypher/:characterId/:cypherId', async (req, res) => {
  let characterId = req.params.characterId
  let cypherId = req.params.cypherId
  let cypher = req.body

  await equipmentService.updateCypherSort(characterId, cypherId, cypher)
  
  res.status(201)
  res.end()
})

router.post('/money/:characterId', async (req, res) => {
  let characterId = req.params.characterId
  let money = req.body

  await equipmentService.upsertMoney(characterId, money)
  
  res.status(201)
  res.end()
})

router.delete('/item/:characterId/:itemName', async (req, res) => {
  let characterId = req.params.characterId
  let itemName = req.params.itemName

  await equipmentService.deleteItem(characterId, itemName)

  res.status(200)
  res.end()
})

router.delete('/weapon/:characterId/:weaponName', async (req, res) => {
  let characterId = req.params.characterId
  let weaponName = req.params.weaponName

  await equipmentService.deleteWeapon(characterId, weaponName)

  res.status(200)
  res.end()
})

router.delete('/oddity/:characterId/:oddityName', async (req, res) => {
  let characterId = req.params.characterId
  let oddityName = req.params.oddityName

  await equipmentService.deleteOddity(characterId, oddityName)

  res.status(200)
  res.end()
})

router.delete('/cypher/:characterId/:cypherName', async (req, res) => {
  let characterId = req.params.characterId
  let cypherName = req.params.cypherName

  await equipmentService.deleteCypher(characterId, cypherName)

  res.status(200)
  res.end()
})

router.delete('/money/:characterId/:moneyName', async (req, res) => {
  let characterId = req.params.characterId
  let moneyName = req.params.moneyName

  await equipmentService.deleteMoney(characterId, moneyName)

  res.status(200)
  res.end()
})

module.exports = router