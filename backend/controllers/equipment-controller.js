const express = require("express")
const router = express.Router()
const equipmentService = require('../services/equipment-service')

router.post('/save/:characterId', async (req, res) => {
    let characterId = req.params.characterId
    let equipment = req.body
    await equipmentService.saveEquipment(characterId, equipment)

	res.status(201)
	res.end()
})

module.exports = router