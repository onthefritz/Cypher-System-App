const fs = require('fs/promises')
const constants = require('../helpers/constants')
const { randomUUID } = require('crypto');

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

exports.updateStatsHistory = async function(id, statHistory) {
  let character = await this.getCharacter(id)
  let foundStatHistory = character.baseInfo.statHistory.find(x => x.tier === statHistory.tier)

  if (foundStatHistory) {
    if (statHistory.isPools) {
      foundStatHistory.pointsToMight = statHistory.might
      foundStatHistory.pointsToSpeed = statHistory.speed
      foundStatHistory.pointsToIntellect = statHistory.intellect
      foundStatHistory.pointsToCharm = statHistory.charm
    }
    else {
      foundStatHistory.pointsToMightEdge = statHistory.might
      foundStatHistory.pointsToSpeedEdge = statHistory.speed
      foundStatHistory.pointsToIntellectEdge = statHistory.intellect
      foundStatHistory.pointsToCharmEdge = statHistory.charm
    }
  }
  else {
    let newStats = {}
    if (statHistory.isPools) {
      newStats.tier = statHistory.tier
      newStats.pointsToMight = statHistory.might
      newStats.pointsToSpeed = statHistory.speed
      newStats.pointsToIntellect = statHistory.intellect
      newStats.pointsToCharm = statHistory.charm
      newStats.pointsToMightEdge = 0
      newStats.pointsToSpeedEdge = 0
      newStats.pointsToIntellectEdge = 0
      newStats.pointsToCharmEdge = 0
    }
    else {
      newStats.tier = statHistory.tier
      newStats.pointsToMight = 0
      newStats.pointsToSpeed = 0
      newStats.pointsToIntellect = 0
      newStats.pointsToCharm = 0
      newStats.pointsToMightEdge = statHistory.might
      newStats.pointsToSpeedEdge = statHistory.speed
      newStats.pointsToIntellectEdge = statHistory.intellect
      newStats.pointsToCharmEdge = statHistory.charm
    }
    character.baseInfo.statHistory.push(newStats)
  }

  character.baseInfo.stats.might = this.sumArrayField(character.baseInfo.statHistory, 'pointsToMight')
  character.baseInfo.stats.speed = this.sumArrayField(character.baseInfo.statHistory, 'pointsToSpeed')
  character.baseInfo.stats.intellect = this.sumArrayField(character.baseInfo.statHistory, 'pointsToIntellect')
  character.baseInfo.stats.charm = this.sumArrayField(character.baseInfo.statHistory, 'pointsToCharm')
  
  character.baseInfo.stats.mightEdge = this.sumArrayField(character.baseInfo.statHistory, 'pointsToMightEdge')
  character.baseInfo.stats.speedEdge = this.sumArrayField(character.baseInfo.statHistory, 'pointsToSpeedEdge')
  character.baseInfo.stats.intellectEdge = this.sumArrayField(character.baseInfo.statHistory, 'pointsToIntellectEdge')
  character.baseInfo.stats.charmEdge = this.sumArrayField(character.baseInfo.statHistory, 'pointsToCharmEdge')

  character.baseInfo.stats.hp = character.baseInfo.stats.might + character.baseInfo.stats.speed
  character.baseInfo.stats.ap = character.baseInfo.stats.intellect + character.baseInfo.stats.charm

  await fs.writeFile(`${constants.base_data_url}/${id}.json`, JSON.stringify(character))
}

exports.sumArrayField = function(array, field) {
  let total = 0
  array.forEach((element) => {
    total += element[field]
  })
  
  return total
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
        focus: characterData.baseInfo.focus,
        isUpdated: true,
        hasIds: true
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
  characterData.baseInfo.tier = 1
  characterData.baseInfo.stats.movement = 30
  characterData.baseInfo.stats.breathers = 2
  characterData.baseInfo.stats.effort = 1
  characterData.baseInfo.stats.effortCurrent = 1
  characterData.baseInfo.stats.might = 7
  characterData.baseInfo.stats.speed = 7
  characterData.baseInfo.stats.intellect = 7
  characterData.baseInfo.stats.charm = 7
  characterData.baseInfo.stats.mightCurrent = 7
  characterData.baseInfo.stats.speedCurrent = 7
  characterData.baseInfo.stats.intellectCurrent = 7
  characterData.baseInfo.stats.charmCurrent = 7
  
  characterData.baseInfo.stats.hp = characterData.baseInfo.stats.might + characterData.baseInfo.stats.speed
  characterData.baseInfo.stats.hpCurrent = characterData.baseInfo.stats.hp
  characterData.baseInfo.stats.ap = characterData.baseInfo.stats.intellect + characterData.baseInfo.stats.charm
  characterData.baseInfo.stats.apCurrent = characterData.baseInfo.stats.ap

  let startingStatHistory = {
    tier: -1,
    pointsToMight: 7,
    pointsToSpeed: 7,
    pointsToIntellect: 7,
    pointsToCharm: 7,
    pointsToMightEdge: 0,
    pointsToSpeedEdge: 0,
    pointsToIntellectEdge: 0,
    pointsToCharmEdge: 0
  }
  characterData.baseInfo.statHistory.push(startingStatHistory)

  let selectedStatHistory = {
    tier: 0,
    pointsToMight: 0,
    pointsToSpeed: 0,
    pointsToIntellect: 0,
    pointsToCharm: 0,
    pointsToMightEdge: 0,
    pointsToSpeedEdge: 0,
    pointsToIntellectEdge: 0,
    pointsToCharmEdge: 0
  }
  characterData.baseInfo.statHistory.push(selectedStatHistory)

  characterData.equipment.cypherCount = 2

  await fs.writeFile(`${constants.base_data_url}/${characterData.id}.json`, JSON.stringify(characterData))
}

exports.updateCharacter = async function(characterId, character) {
  await fs.writeFile(`${constants.base_data_url}/${characterId}.json`, JSON.stringify(character))
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

exports.deleteStats = async function(characterId, tier) {
  let character = await this.getCharacter(characterId)

  let newStatsHistory = character.baseInfo.statHistory.filter(x => x.tier !== parseInt(tier))

  character.baseInfo.statHistory = newStatsHistory

  character.baseInfo.stats.might = this.sumArrayField(character.baseInfo.statHistory, 'pointsToMight')
  character.baseInfo.stats.speed = this.sumArrayField(character.baseInfo.statHistory, 'pointsToSpeed')
  character.baseInfo.stats.intellect = this.sumArrayField(character.baseInfo.statHistory, 'pointsToIntellect')
  character.baseInfo.stats.charm = this.sumArrayField(character.baseInfo.statHistory, 'pointsToCharm')

  character.baseInfo.stats.hp = character.baseInfo.stats.might + character.baseInfo.stats.speed
  character.baseInfo.stats.ap = character.baseInfo.stats.intellect + character.baseInfo.stats.charm
  
  character.baseInfo.stats.mightEdge = this.sumArrayField(character.baseInfo.statHistory, 'pointsToMightEdge')
  character.baseInfo.stats.speedEdge = this.sumArrayField(character.baseInfo.statHistory, 'pointsToSpeedEdge')
  character.baseInfo.stats.intellectEdge = this.sumArrayField(character.baseInfo.statHistory, 'pointsToIntellectEdge')
  character.baseInfo.stats.charmEdge = this.sumArrayField(character.baseInfo.statHistory, 'pointsToCharmEdge')

  await fs.writeFile(`${constants.base_data_url}/${characterId}.json`, JSON.stringify(character))
}

exports.shortRest = async function(characterId, wellRested) {
  let character = await this.getCharacter(characterId)

  let stats = character.baseInfo.stats

  if (wellRested.toLowerCase() === 'false') {
    stats.hpCurrent = this.isLessThanHalf(stats.hpCurrent, stats.hp) ? Math.floor(stats.hp / 2) : stats.hpCurrent
    stats.apCurrent = this.isLessThanHalf(stats.apCurrent, stats.ap) ? Math.floor(stats.ap / 2) : stats.apCurrent
    stats.mightCurrent = this.isLessThanHalf(stats.mightCurrent, stats.might) ? Math.floor(stats.might / 2) : stats.mightCurrent
    stats.speedCurrent = this.isLessThanHalf(stats.speedCurrent, stats.speed) ? Math.floor(stats.speed / 2) : stats.speedCurrent
    stats.intellectCurrent = this.isLessThanHalf(stats.intellectCurrent, stats.intellect) ? Math.floor(stats.intellect / 2) : stats.intellectCurrent
    stats.charmCurrent = this.isLessThanHalf(stats.charmCurrent, stats.charm) ? Math.floor(stats.charm / 2) : stats.charmCurrent
  }
  else {
    stats.hpCurrent = stats.hp
    stats.apCurrent = stats.ap
    stats.mightCurrent = stats.might
    stats.speedCurrent = stats.speed
    stats.intellectCurrent = stats.intellect
    stats.charmCurrent = stats.charm
  }

  stats.mightEdgeCurrent = stats.mightEdge
  stats.speedEdgeCurrent = stats.speedEdge
  stats.intellectEdgeCurrent = stats.intellectEdge
  stats.charmEdgeCurrent = stats.charmEdge
  stats.effortCurrent = stats.effort

  stats.shortRestsSinceLongRest += 1
  decimalBreathersToRegain = (character.baseInfo.tier * 2) / (2 * stats.shortRestsSinceLongRest)
  breathersToRegain = decimalBreathersToRegain < 1 ? 0 : Math.ceil(decimalBreathersToRegain)
  stats.breathers += breathersToRegain
  if (stats.breathers > character.baseInfo.tier * 2) {
    stats.breathers = character.baseInfo.tier * 2
  }

  character.baseInfo.stats = stats

  await fs.writeFile(`${constants.base_data_url}/${characterId}.json`, JSON.stringify(character))
}

exports.isLessThanHalf = function(current, total) {
  if (current < Math.floor(total / 2)) {
    return true
  }

  return false
}

exports.longRest = async function(characterId) {
  let character = await this.getCharacter(characterId)

  character.baseInfo.stats.hpCurrent = character.baseInfo.stats.hp
  character.baseInfo.stats.apCurrent = character.baseInfo.stats.ap

  character.baseInfo.stats.mightCurrent = character.baseInfo.stats.might
  character.baseInfo.stats.speedCurrent = character.baseInfo.stats.speed
  character.baseInfo.stats.intellectCurrent = character.baseInfo.stats.intellect
  character.baseInfo.stats.charmCurrent = character.baseInfo.stats.charm

  character.baseInfo.stats.mightEdgeCurrent = character.baseInfo.stats.mightEdge
  character.baseInfo.stats.speedEdgeCurrent = character.baseInfo.stats.speedEdge
  character.baseInfo.stats.intellectEdgeCurrent = character.baseInfo.stats.intellectEdge
  character.baseInfo.stats.charmEdgeCurrent = character.baseInfo.stats.charmEdge

  character.baseInfo.stats.effortCurrent = character.baseInfo.stats.effort
  
  character.baseInfo.stats.exhaustion = character.baseInfo.stats.exhaustion - 2 < 0 
    ? 0 
    : character.baseInfo.stats.exhaustion - 2
  character.baseInfo.stats.breathers = character.baseInfo.tier * 2
  character.baseInfo.stats.shortRestsSinceLongRest = 0

  await fs.writeFile(`${constants.base_data_url}/${characterId}.json`, JSON.stringify(character))
}

exports.refreshEdgeAndEffort = async function(characterId) {
  let character = await this.getCharacter(characterId)

  character.baseInfo.stats.mightEdgeCurrent = character.baseInfo.stats.mightEdge
  character.baseInfo.stats.speedEdgeCurrent = character.baseInfo.stats.speedEdge
  character.baseInfo.stats.intellectEdgeCurrent = character.baseInfo.stats.intellectEdge
  character.baseInfo.stats.charmEdgeCurrent = character.baseInfo.stats.charmEdge

  character.baseInfo.stats.effortCurrent = character.baseInfo.stats.effort

  await fs.writeFile(`${constants.base_data_url}/${characterId}.json`, JSON.stringify(character))
}

exports.setAdvancements = async function (characterId, data) {
  let character = await this.getCharacter(characterId)

  character.baseInfo.tierAdvancement = data

  await fs.writeFile(`${constants.base_data_url}/${characterId}.json`, JSON.stringify(character))
}

exports.levelUp = async function(characterId) {
  let character = await this.getCharacter(characterId)

  let tierHistory = {
    tier: character.baseInfo.tier,
    advancements: character.baseInfo.tierAdvancement
  }

  character.baseInfo.tierAdvancementHistory.push(tierHistory)
  character.baseInfo.tier += 1

  await fs.writeFile(`${constants.base_data_url}/${characterId}.json`, JSON.stringify(character))

  let resetCharacter = await this.getCharacter(characterId)

  resetCharacter.baseInfo.tierAdvancement.pointsToStatPools = false
  resetCharacter.baseInfo.tierAdvancement.pointToEdge = false
  resetCharacter.baseInfo.tierAdvancement.pointToEffort = false
  resetCharacter.baseInfo.tierAdvancement.trainSkill = false
  resetCharacter.baseInfo.tierAdvancement.other = false
  
  await fs.writeFile(`${constants.base_data_url}/${characterId}.json`, JSON.stringify(resetCharacter))
}

exports.deleteTier = async function(characterId, tier) {
  let character = await this.getCharacter(characterId)

  let newTierHistory = character.baseInfo.tierAdvancementHistory.filter(x => x.tier !== parseInt(tier))
  character.baseInfo.tierAdvancementHistory = newTierHistory
  character.baseInfo.tier -= 1

  await fs.writeFile(`${constants.base_data_url}/${characterId}.json`, JSON.stringify(character))
}

exports.updateBaseValues = async function() {
  let charactersJson = await this.getCharacters()
  let characters = JSON.parse(charactersJson)
  
  let updatedCharacters = []
  for (let i = 0; i < characters.length; i++) {
    let character = characters[i]
    let charDeets = await this.getCharacter(character.id)
    
    charDeets.baseInfo.statHistory[0].pointsToMight = 7
    charDeets.baseInfo.statHistory[0].pointsToSpeed = 7
    charDeets.baseInfo.statHistory[0].pointsToIntellect = 7
    charDeets.baseInfo.statHistory[0].pointsToCharm = 7
    
    charDeets.baseInfo.stats.might = this.sumArrayField(charDeets.baseInfo.statHistory, 'pointsToMight')
    charDeets.baseInfo.stats.speed = this.sumArrayField(charDeets.baseInfo.statHistory, 'pointsToSpeed')
    charDeets.baseInfo.stats.intellect = this.sumArrayField(charDeets.baseInfo.statHistory, 'pointsToIntellect')
    charDeets.baseInfo.stats.charm = this.sumArrayField(charDeets.baseInfo.statHistory, 'pointsToCharm')

    charDeets.baseInfo.stats.hp = charDeets.baseInfo.stats.might + charDeets.baseInfo.stats.speed
    charDeets.baseInfo.stats.ap = charDeets.baseInfo.stats.intellect + charDeets.baseInfo.stats.charm
  
    await this.updateCharacter(character.id, charDeets)
    character.isUpdated = true
    updatedCharacters.push(character)
  }

  await fs.writeFile(`${constants.base_data_url}/characters.json`, JSON.stringify(updatedCharacters))
}

exports.addIdsToCharacter = async function() {
  let charactersJson = await this.getCharacters()
  let characters = JSON.parse(charactersJson)

  let updatedCharacters = []
  for (let i = 0; i < characters.length; i++) {
    let character = characters[i]
    let charDeets = await this.getCharacter(character.id)
    
    charDeets.attacks.forEach((attack) => {
      let randomId = randomUUID()

      while (charDeets.attacks.some(x => x.id === randomId)) {
        randomId = randomUUID()
      }

      attack.id = randomId
    })
    charDeets.abilities.forEach((ability) => {
      let randomId = randomUUID()

      while (charDeets.abilities.some(x => x.id === randomId)) {
        randomId = randomUUID()
      }

      ability.id = randomId
    })
    charDeets.skills.forEach((skill) => {
      let randomId = randomUUID()

      while (charDeets.skills.some(x => x.id === randomId)) {
        randomId = randomUUID()
      }

      skill.id = randomId
    })

    charDeets.equipment.cyphers.forEach((cypher) => {
      let randomId = randomUUID()

      while (charDeets.equipment.cyphers.some(x => x.id === randomId)) {
        randomId = randomUUID()
      }

      cypher.id = randomId
    })
    charDeets.equipment.items.forEach((item) => {
      let randomId = randomUUID()

      while (charDeets.equipment.items.some(x => x.id === randomId)) {
        randomId = randomUUID()
      }

      item.id = randomId
    })
    charDeets.equipment.oddities.forEach((oddity) => {
      let randomId = randomUUID()

      while (charDeets.equipment.oddities.some(x => x.id === randomId)) {
        randomId = randomUUID()
      }

      oddity.id = randomId
    })
    charDeets.equipment.weapons.forEach((weapon) => {
      let randomId = randomUUID()

      while (charDeets.equipment.weapons.some(x => x.id === randomId)) {
        randomId = randomUUID()
      }

      weapon.id = randomId
    })
    charDeets.equipment.money.forEach((money) => {
      let randomId = randomUUID()

      while (charDeets.equipment.money.some(x => x.id === randomId)) {
        randomId = randomUUID()
      }

      money.id = randomId
    })
  
    await this.updateCharacter(character.id, charDeets)
    character.hasIds = true
    updatedCharacters.push(character)
  }

  await fs.writeFile(`${constants.base_data_url}/characters.json`, JSON.stringify(updatedCharacters))
}