export class character {
    public id: string = '00000000-0000-0000-0000-000000000000'
    public baseInfo: baseInfo = new baseInfo
    public attacks: attack[] = []
    public abilities: ability[] = []
    public equipment: equipment = new equipment
    public skills: skill[] = []
}

class baseInfo {
    public name: string = ''
    public descriptor: string = ''
    public focus: string = ''
    public tier: number = 0
    public xp: number = 0
    public stats: stats = new stats
    public statHistory: statHistory[] = []
    public tierAdvancement: tierAdvancement = new tierAdvancement
    public tierAdvancementHistory: tierAdvancement[] = []
}

class stats {
    public might: number = 0
    public mightEdge: number = 0

    public speed: number = 0
    public speedEdge: number = 0

    public intellect: number = 0
    public intellectEdge: number = 0

    public charm: number = 0
    public charmEdge: number = 0

    public effort: number = 0
    public movement: number = 0
    public exhaustion: number = 0
    public damageTrack: damageTrack = new damageTrack
    public breathers: number = 0
    public shortRestsSinceLongRest: number = 0
}

class statHistory {
    public tier: number = 0

    public pointsToMight: number = 0
    public pointsToMightEdge: number = 0

    public pointsToSpeed: number = 0
    public pointsToSpeedEdge: number = 0

    public pointsToIntellect: number = 0
    public pointsToIntellectEdge: number = 0

    public pointsToCharm: number = 0
    public pointsToCharmEdge: number = 0

    public pointToEffort: number = 0

    public pointToAbilityPoints: number = 0
}

class tierAdvancement {
    public pointsToStatPools: boolean = false
    public pointToEdge: boolean = false
    public pointToEffort: boolean = false
    public pointToAbilityPoint: boolean = false
    public trainSkill: boolean = false
    public other: boolean = false
}

class damageTrack {
    public impaired: boolean = false
    public debilitated: boolean = false
    public unconscious: boolean = false
    public dead: boolean = false
}

class attack {
    public name: string = ''
    public modifier: number = 0
    public damage: number = 0
    public range: number = 0
}

class ability {
    public name: string = ''
    public cost: number = 0
    public costType: string = ''
    public description: string = ''
}

class equipment {
    public cypherCount: number = 0
    public cyphers: cypher[] = []
    public items: item[] = []
    public oddities: item[] = []
    public weapons: weapon[] = []
    public money: money[] = []
}

class cypher {
    public name: string = ''
    public tier: number = 0
    public description: string = ''
}

class item {
    public name: string = ''
    public count: number = 0
    public description: string = ''
}

class weapon {
    public name: string = ''
    public count: number = 0
    public type: string = ''
    public description: string = ''
}

class money {
    public name: string = ''
    public amount: number = 0
}

class skill {
    public name: string = ''
    public inability: boolean = false
    public trained: boolean = false
    public specialized: boolean = false
}