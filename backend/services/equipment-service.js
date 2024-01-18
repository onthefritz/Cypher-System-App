const characterService = require('../services/character-service')

exports.getCharacterEquipment = async function (characterId) {
  let character = await characterService.getCharacter(characterId)

  return character.equipment
}

exports.updateCypherCount = async function(characterId, request) {
  let character = await characterService.getCharacter(characterId)

  character.equipment.cypherCount = request.cypherCount

  await characterService.updateCharacter(characterId, character)
}

exports.upsertItem = async function(characterId, newItem) {
  let character = await characterService.getCharacter(characterId)

  let foundItem = character.equipment.items.find((item) => item.id === newItem.id)

  if (foundItem) {
    foundItem.name = newItem.name
    foundItem.count = newItem.count
    foundItem.description = newItem.description
  }
  else {
    if (character.equipment.items.length > 0) {
      newItem.sortOrder = character.equipment.items.at(-1).sortOrder + 1
    }
    else {
      newItem.sortOrder = 0
    }
    character.equipment.items.push(newItem)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.updateItemSort = async function(characterId, itemId, sortInfo) {
  let character = await characterService.getCharacter(characterId)

  let foundItem = character.equipment.items.find((item) => item.id === itemId)
  let otherItem = character.equipment.items.find((item) => item.sortOrder === sortInfo.sortOrder)

  let currentSort = foundItem.sortOrder
  foundItem.sortOrder = otherItem.sortOrder
  otherItem.sortOrder = currentSort

  await characterService.updateCharacter(character.id, character)
}

exports.upsertWeapon = async function(characterId, newWeapon) {
  let character = await characterService.getCharacter(characterId)

  let foundWeapon = character.equipment.weapons.find((weapon) => weapon.id === newWeapon.id)

  if (foundWeapon) {
    foundWeapon.name = newWeapon.name
    foundWeapon.count = newWeapon.count
    foundWeapon.type = newWeapon.type
    foundWeapon.description = newWeapon.description
  }
  else {
    if (character.equipment.weapons.length > 0) {
      newWeapon.sortOrder = character.equipment.weapons.at(-1).sortOrder + 1
    }
    else {
      newWeapon.sortOrder = 0
    }
    character.equipment.weapons.push(newWeapon)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.updateWeaponSort = async function(characterId, weaponId, sortInfo) {
  let character = await characterService.getCharacter(characterId)

  let foundWeapon = character.equipment.weapons.find((weapon) => weapon.id === weaponId)
  let otherWeapon = character.equipment.weapons.find((weapon) => weapon.sortOrder === sortInfo.sortOrder)

  let currentSort = foundWeapon.sortOrder
  foundWeapon.sortOrder = otherWeapon.sortOrder
  otherWeapon.sortOrder = currentSort

  await characterService.updateCharacter(character.id, character)
}

exports.upsertOddity = async function(characterId, newOddity) {
  let character = await characterService.getCharacter(characterId)

  let foundOddity = character.equipment.oddities.find((oddity) => oddity.id === newOddity.id)

  if (foundOddity) {
    foundOddity.name = newOddity.name
    foundOddity.count = newOddity.count
    foundOddity.description = newOddity.description
  }
  else {
    if (character.equipment.oddities.length > 0) {
      newOddity.sortOrder = character.equipment.oddities.at(-1).sortOrder + 1
    }
    else {
      newOddity.sortOrder = 0
    }
    character.equipment.oddities.push(newOddity)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.updateOdditySort = async function(characterId, oddityId, sortInfo) {
  let character = await characterService.getCharacter(characterId)

  let foundOddity = character.equipment.oddities.find((oddity) => oddity.id === oddityId)
  let otherOddity = character.equipment.oddities.find((oddity) => oddity.sortOrder === sortInfo.sortOrder)

  let currentSort = foundOddity.sortOrder
  foundOddity.sortOrder = otherOddity.sortOrder
  otherOddity.sortOrder = currentSort

  await characterService.updateCharacter(character.id, character)
}

exports.upsertCypher = async function(characterId, newCypher) {
  let character = await characterService.getCharacter(characterId)

  let foundCypher = character.equipment.cyphers.find((cypher) => cypher.id === newCypher.id)

  if (foundCypher) {
    foundCypher.name = newCypher.name
    foundCypher.tier = newCypher.tier
    foundCypher.description = newCypher.description
  }
  else {
    if (character.equipment.cyphers.length > 0) {
      newCypher.sortOrder = character.equipment.cyphers.at(-1).sortOrder + 1
    }
    else {
      newCypher.sortOrder = 0
    }
    character.equipment.cyphers.push(newCypher)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.updateCypherSort = async function(characterId, cypherId, sortInfo) {
  let character = await characterService.getCharacter(characterId)

  let foundCypher = character.equipment.cyphers.find((cypher) => cypher.id === cypherId)
  let otherCypher = character.equipment.cyphers.find((cypher) => cypher.sortOrder === sortInfo.sortOrder)

  let currentSort = foundCypher.sortOrder
  foundCypher.sortOrder = otherCypher.sortOrder
  otherCypher.sortOrder = currentSort

  await characterService.updateCharacter(character.id, character)
}

exports.upsertMoney = async function(characterId, newMoney) {
  let character = await characterService.getCharacter(characterId)

  let foundMoney = character.equipment.money.find((money) => money.id === newMoney.id)

  if (foundMoney) {
    foundMoney.name = newMoney.name
    foundMoney.amount = newMoney.amount
  }
  else {
    character.equipment.money.push(newMoney)
  }

  await characterService.updateCharacter(characterId, character)
}

exports.deleteItem = async function(characterId, itemId) {
    let character = await characterService.getCharacter(characterId)

    let itemBeingDeletedSort = character.equipment.items.find((item) => item.id === itemId).sortOrder

    let itemsAboveDeletedItem = character.equipment.items.filter((item) => item.sortOrder > itemBeingDeletedSort)
    for (let i = 0; i < itemsAboveDeletedItem.length; i++) {
      let item = itemsAboveDeletedItem[i]
      item.sortOrder = item.sortOrder - 1
    }

    character.equipment.items = character.equipment.items.filter((item) => item.id !== itemId)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteWeapon = async function(characterId, weaponId) {
    let character = await characterService.getCharacter(characterId)

    let weaponBeingDeletedSort = character.equipment.weapons.find((weapon) => weapon.id === weaponId).sortOrder

    let weaponsAboveDeletedWeapon = character.equipment.weapons.filter((weapon) => weapon.sortOrder > weaponBeingDeletedSort)
    for (let i = 0; i < weaponsAboveDeletedWeapon.length; i++) {
      let weapon = weaponsAboveDeletedWeapon[i]
      weapon.sortOrder = weapon.sortOrder - 1
    }

    character.equipment.weapons = character.equipment.weapons.filter((weapon) => weapon.id !== weaponId)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteOddity = async function(characterId, oddityId) {
    let character = await characterService.getCharacter(characterId)

    let oddityBeingDeletedSort = character.equipment.oddities.find((oddity) => oddity.id === oddityId).sortOrder

    let odditiesAboveDeletedOddity = character.equipment.oddities.filter((oddity) => oddity.sortOrder > oddityBeingDeletedSort)
    for (let i = 0; i < odditiesAboveDeletedOddity.length; i++) {
      let oddity = odditiesAboveDeletedOddity[i]
      oddity.sortOrder = oddity.sortOrder - 1
    }

    character.equipment.oddities = character.equipment.oddities.filter((oddity) => oddity.id !== oddityId)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteCypher = async function(characterId, cypherId) {
    let character = await characterService.getCharacter(characterId)

    let cypherBeingDeletedSort = character.equipment.cyphers.find((cypher) => cypher.id === cypherId).sortOrder

    let cyphersAboveDeletedCypher = character.equipment.cyphers.filter((cypher) => cypher.sortOrder > cypherBeingDeletedSort)
    for (let i = 0; i < cyphersAboveDeletedCypher.length; i++) {
      let cypher = cyphersAboveDeletedCypher[i]
      cypher.sortOrder = cypher.sortOrder - 1
    }

    character.equipment.cyphers = character.equipment.cyphers.filter((cypher) => cypher.id !== cypherId)

    await characterService.updateCharacter(characterId, character)
}

exports.deleteMoney = async function(characterId, moneyId) {
    let character = await characterService.getCharacter(characterId)

    character.equipment.money = character.equipment.money.filter((money) => money.id !== moneyId)

    await characterService.updateCharacter(characterId, character)
}