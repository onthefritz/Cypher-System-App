export class character {
    public id: string = '00000000-0000-0000-0000-000000000000'
    public baseInfo: baseInfo = new baseInfo
    public attacks: attack[] = []
    public abilities: ability[] = []
    public equipment: equipment = new equipment
    public skills: skill[] = []
    public settings: settings = new settings
}

export class baseInfo {
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

export class stats {
    public might: number = 0
    public mightCurrent: number = 0
    public mightEdge: number = 0
    public mightEdgeCurrent: number = 0

    public speed: number = 0
    public speedCurrent: number = 0
    public speedEdge: number = 0
    public speedEdgeCurrent: number = 0

    public intellect: number = 0
    public intellectCurrent: number = 0
    public intellectEdge: number = 0
    public intellectEdgeCurrent: number = 0

    public charm: number = 0
    public charmCurrent: number = 0
    public charmEdge: number = 0
    public charmEdgeCurrent: number = 0

    public effort: number = 0
    public effortCurrent: number = 0
    
    public movement: number = 0
    public exhaustion: number = 0
    public damageTrack: damageTrack = new damageTrack
    public breathers: number = 0
    public shortRestsSinceLongRest: number = 0
}

export class statHistory {
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

export class tierAdvancement {
    public pointsToStatPools: boolean = false
    public pointToEdge: boolean = false
    public pointToEffort: boolean = false
    public pointToAbilityPoint: boolean = false
    public trainSkill: boolean = false
    public other: boolean = false
}

export class damageTrack {
    public impaired: boolean = false
    public debilitated: boolean = false
    public unconscious: boolean = false
    public dead: boolean = false
}

export class attack {
    public name: string = ''
    public modifier: number = 0
    public damage: number = 0
    public range: number = 0
}

export class ability {
    public name: string = ''
    public cost: number = 0
    public costType: string = ''
    public description: string = ''
}

export class equipment {
    public cypherCount: number = 0
    public cyphers: cypher[] = []
    public items: item[] = []
    public oddities: item[] = []
    public weapons: weapon[] = []
    public money: money[] = []
}

export class cypher {
    public name: string = ''
    public tier: number = 0
    public description: string = ''
}

export class item {
    public name: string = ''
    public count: number = 0
    public description: string = ''
}

export class weapon {
    public name: string = ''
    public count: number = 0
    public type: string = ''
    public description: string = ''
}

export class money {
    public name: string = ''
    public amount: number = 0
}

export class skill {
    public name: string = ''
    public inability: boolean = false
    public trained: boolean = false
    public specialized: boolean = false
}

export class settings {
    public altSheet: boolean = false
    public ac: boolean = false
    public damageDice: boolean = false
}