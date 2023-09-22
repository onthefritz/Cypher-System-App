const express = require("express")
const router = express.Router()
const characterService = require('../services/character-service')

router.get('/getAll', async (req, res) => {
	let characters = await characterService.getCharacters()

	res.status(200)
	res.send(characters)
	res.end
})

router.get('/:characterId', async (req, res) => {
	let character = await characterService.getCharacter(req.params.characterId)

	res.status(200)
	res.send(character)
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

module.exports = router