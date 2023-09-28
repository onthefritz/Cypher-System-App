const fs = require('fs/promises')
const constants = require('../helpers/constants')

exports.getCharacters = async function() {
    let characters = []
    await fs.readFile(`${constants.base_data_url}/characters.json`, 'utf-8').then((data) => {
        characters = data
    })

    return characters
}

exports.getCharacter = async function(id) {
    let character = {}
    await fs.readFile(`${constants.base_data_url}/${id}.json`, 'utf-8').then((data) => {
        character = JSON.parse(data)
    })

    return character
}

exports.addCharacterToList = async function(characterData) {
    let foundData = []
    await fs.readFile(`${constants.base_data_url}/characters.json`, 'utf-8').then((data) => {
        foundData = JSON.parse(data)
    })
    
    let characterListData = {
        id: characterData.id,
        name: characterData.baseInfo.name,
        descriptor: characterData.baseInfo.descriptor,
        focus: characterData.baseInfo.focus
    }
    foundData.push(characterListData)

    await fs.writeFile(`${constants.base_data_url}/characters.json`, JSON.stringify(foundData))
}

exports.editCharacterList = async function(id, name, descriptor, focus) {
    let foundData = []
    await fs.readFile(`${constants.base_data_url}/characters.json`, 'utf-8').then((data) => {
        foundData = JSON.parse(data)
    })

    let characterListData = foundData.find(x => x.id === id)
    characterListData.name = name
    characterListData.descriptor = descriptor
    characterListData.focus = focus

    await fs.writeFile(`${constants.base_data_url}/characters.json`, JSON.stringify(foundData))
}

exports.addCharacter = async function(characterData) {
    await fs.writeFile(`${constants.base_data_url}/${characterData.id}.json`, JSON.stringify(characterData))
}

exports.deleteCharacter = async function(characterId) {
    let foundData = []
    await fs.readFile(`${constants.base_data_url}/characters.json`, 'utf-8').then((data) => {
        foundData = JSON.parse(data)

        foundData = foundData.filter(x => x.id !== characterId)
    })

    await fs.writeFile(`${constants.base_data_url}/characters.json`, JSON.stringify(foundData))

    await fs.unlink(`${constants.base_data_url}/${characterId}.json`)
}