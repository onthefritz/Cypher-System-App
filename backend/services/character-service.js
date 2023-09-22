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
    await fs.readFile(`${constants.base_data_url}/${id}.json`, 'utf-8', (err, data) => {
        character = data
    })

    return character
}

exports.addCharacter = async function(characterData) {
    let foundData = []
    await fs.readFile(`${constants.base_data_url}/characters.json`, 'utf-8').then((data) => {
        foundData = JSON.parse(data)
    })

    foundData.push(characterData)

    await fs.writeFile(`${constants.base_data_url}/characters.json`, JSON.stringify(foundData))
}