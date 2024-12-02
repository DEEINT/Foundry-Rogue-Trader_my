export const ROGUE_TRADER = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */


//TODO: Deprecate after character sheets are altered
ROGUE_TRADER.abilities = {
  str: 'ROGUE_TRADER.Ability.Str.long',
  dex: 'ROGUE_TRADER.Ability.Dex.long',
  con: 'ROGUE_TRADER.Ability.Con.long',
  int: 'ROGUE_TRADER.Ability.Int.long',
  wis: 'ROGUE_TRADER.Ability.Wis.long',
  cha: 'ROGUE_TRADER.Ability.Cha.long',
};

ROGUE_TRADER.ability_abbreviations = {
  str: 'ROGUE_TRADER.Ability.Str.abbr',
  dex: 'ROGUE_TRADER.Ability.Dex.abbr',
  con: 'ROGUE_TRADER.Ability.Con.abbr',
  int: 'ROGUE_TRADER.Ability.Int.abbr',
  wis: 'ROGUE_TRADER.Ability.Wis.abbr',
  cha: 'ROGUE_TRADER.Ability.Cha.abbr',
};
//END TD


//TODO: figure out if this is even useful. Supposed to validate which items can belong to which actors
ROGUE_TRADER.item_map = {
  voidship: {items: ['component','quirk','staff']},
  character: {items: []},
  vehicle: {items: []},
  organization: {items:[]},
  squadron: {items:[]},
  unit: {items:[]}
}
//TODO: maybe swap these into a full taxonomy tree thing?


ROGUE_TRADER.voidship_component_map = {
  hull:         'voidship_hull_type',
  essential:    'voidship_essential_type',
  supplemental: 'voidship_misc_type',
  weapon:       'voidship_weapon_type',
  upgrade:      'voidship_misc_type',
};
ROGUE_TRADER.voidship_map = {
  component: 'voidship_component_map',
  staff:    'voidship_staff_map',
  quirk:    'voidship_quirk_map'
};
ROGUE_TRADER.voidship_misc_type = {
  default: '--'
};


//ENUMERATED CATEGORIES
ROGUE_TRADER.craftsmanship_values = {
  poor:   0,
  common: 1,
  good:   2,
  best:   3,
};

ROGUE_TRADER.test_diff_values = {
  trivial     : 60,
  elementary  : 50,
  simple      : 40,
  easy        : 30,
  routine     : 20,
  ordinary    : 10,
  challenging : 0,
  difficult   : -10,
  hard        : -20,
  very_hard   : -30,
  arduous     : -40,
  punishing   : -50,
  hellish     : -60,
};

//TODO: finish this
ROGUE_TRADER.availability_values = {
  unique: -60
};

//LOCALIZATION OBJECTS
ROGUE_TRADER.characteristic = {
  ws: 'ROGUE_TRADER.characteristic.ws.long',
  bs: 'ROGUE_TRADER.characteristic.bs.long',
  s:  'ROGUE_TRADER.characteristic.s.long',
  t:  'ROGUE_TRADER.characteristic.t.long',
  a:  'ROGUE_TRADER.characteristic.a.long',
  i:  'ROGUE_TRADER.characteristic.i.long',
  p:  'ROGUE_TRADER.characteristic.p.long',
  wp: 'ROGUE_TRADER.characteristic.wp.long',
  f:  'ROGUE_TRADER.characteristic.f.long',
  in: 'ROGUE_TRADER.characteristic.in.long',
};

ROGUE_TRADER.characteristic_abbr = {
  ws: 'ROGUE_TRADER.characteristic.ws.abbr',
  bs: 'ROGUE_TRADER.characteristic.bs.abbr',
  s:  'ROGUE_TRADER.characteristic.s.abbr',
  t:  'ROGUE_TRADER.characteristic.t.abbr',
  a:  'ROGUE_TRADER.characteristic.a.abbr',
  i:  'ROGUE_TRADER.characteristic.i.abbr',
  p:  'ROGUE_TRADER.characteristic.p.abbr',
  wp: 'ROGUE_TRADER.characteristic.wp.abbr',
  f:  'ROGUE_TRADER.characteristic.f.abbr',
  in: 'ROGUE_TRADER.characteristic.in.abbr',
};

ROGUE_TRADER.voidship_stat = {
  integrity:            'ROGUE_TRADER.voidship_stat.integrity.long',
  maneuverability:      'ROGUE_TRADER.voidship_stat.maneuverability.long',
  speed:                'ROGUE_TRADER.voidship_stat.speed.long',
  detection:            'ROGUE_TRADER.voidship_stat.detection.long',
  armor:                'ROGUE_TRADER.voidship_stat.armor.long',
  shields:              'ROGUE_TRADER.voidship_stat.shields.long',
  turret_rating:        'ROGUE_TRADER.voidship_stat.turret_rating.long',
  morale:               'ROGUE_TRADER.voidship_stat.morale.long',
  morale_loss:          'ROGUE_TRADER.voidship_stat.morale_loss.long',
  crew_rating:          'ROGUE_TRADER.voidship_stat.crew_rating.long',
  crew_population:      'ROGUE_TRADER.voidship_stat.crew_population.long',
  crew_population_loss: 'ROGUE_TRADER.voidship_stat.crew_population_loss.long',
};

ROGUE_TRADER.voidship_stat_abbr = {
  integrity:            'ROGUE_TRADER.voidship_stat.integrity.abbr',
  maneuverability:      'ROGUE_TRADER.voidship_stat.maneuverability.abbr',
  speed:                'ROGUE_TRADER.voidship_stat.speed.abbr',
  detection:            'ROGUE_TRADER.voidship_stat.detection.abbr',
  armor:                'ROGUE_TRADER.voidship_stat.armor.abbr',
  shields:              'ROGUE_TRADER.voidship_stat.shields.abbr',
  turret_rating:        'ROGUE_TRADER.voidship_stat.turret_rating.abbr',
  morale:               'ROGUE_TRADER.voidship_stat.morale.abbr',
  morale_loss:          'ROGUE_TRADER.voidship_stat.morale_loss.abbr',
  crew_rating:          'ROGUE_TRADER.voidship_stat.crew_rating.abbr',
  crew_population:      'ROGUE_TRADER.voidship_stat.crew_population.abbr',
  crew_population_loss: 'ROGUE_TRADER.voidship_stat.crew_population_loss.abbr',
};

ROGUE_TRADER.voidship_stat_cpl = {
  space:{
    name: {
      long: 'ROGUE_TRADER.voidship_stat.space.long',
      abbr: 'ROGUE_TRADER.voidship_stat.space.abbr',
    },
    setRating: true,
    setFloor: false,
    bounds: [0,null]
  },
  power:{
    name: {
      long: 'ROGUE_TRADER.voidship_stat.power.long',
      abbr: 'ROGUE_TRADER.voidship_stat.power.abbr',
    },
    setRating: true,
    setFloor: false,
    bounds: [0,null]
  },
  ship_points:{
    name: {
      long: 'ROGUE_TRADER.voidship_stat.ship_points.long',
      abbr: 'ROGUE_TRADER.voidship_stat.ship_points.abbr',
    },
    setRating: true,
    setFloor: false,
    bounds: [null,null]
  },
  integrity:{
    name: {
      long: 'ROGUE_TRADER.voidship_stat.integrity.long',
      abbr: 'ROGUE_TRADER.voidship_stat.integrity.abbr',
    },
    setRating: true,
    setFloor: false,
    bounds: [0,null]
  },
  maneuverability:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.maneuverability.long',
      abbr: 'ROGUE_TRADER.voidship_stat.maneuverability.abbr'
    },
    setRating: true,
    setFloor: false,
    bounds: [null,null]
    },
  speed:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.speed.long',
      abbr: 'ROGUE_TRADER.voidship_stat.speed.abbr'
    },
    setRating: true,
    setFloor: false,
    bounds: [null,null]
  },
  detection:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.detection.long',
      abbr: 'ROGUE_TRADER.voidship_stat.detection.abbr'
    },
    setRating: true,
    setFloor: false,
    bounds: [null,null]
  },
  armour:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.armour.long',
      abbr: 'ROGUE_TRADER.voidship_stat.armour.abbr'
    },
    setRating: true,
    setFloor: false,
    bounds: [null,null]
  },
  shields:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.shields.long',
      abbr: 'ROGUE_TRADER.voidship_stat.shields.abbr'
    },
    setRating: true,
    setFloor: false,
    bounds: [0,null]
  },
  turret_rating:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.turret_rating.long',
      abbr: 'ROGUE_TRADER.voidship_stat.turret_rating.abbr'
    },
    setRating: true,
    setFloor: false,
    bounds: [0,null]
  },
  morale:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.morale.long',
      abbr: 'ROGUE_TRADER.voidship_stat.morale.abbr'
    },
    setRating: true,
    setFloor: false,
    bounds: [0,null]
  },
  morale_loss:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.morale_loss.long',
      abbr: 'ROGUE_TRADER.voidship_stat.morale_loss.abbr'
    },
    setRating: true,
    setFloor: true,
    bounds: [null,null]
  },
  crew_rating:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.crew_rating.long',
      abbr: 'ROGUE_TRADER.voidship_stat.crew_rating.abbr'
    },
    setRating: true,
    setFloor: false,
    bounds: [0,100]
  },
  crew_population:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.crew_population.long',
      abbr: 'ROGUE_TRADER.voidship_stat.crew_population.abbr'
    },
    setRating: true,
    setFloor: false,
    bounds: [0,null]
  },
  crew_population_loss:{
    name:{ 
      long: 'ROGUE_TRADER.voidship_stat.crew_population_loss.long',
      abbr: 'ROGUE_TRADER.voidship_stat.crew_population_loss.abbr'
    },
    setRating: true,
    setFloor: true,
    bounds: [null,null]
  },
};

ROGUE_TRADER.voidship_slot = {
  prow:       'ROGUE_TRADER.voidship_slot.prow.long',
  port:       'ROGUE_TRADER.voidship_slot.port.long',
  starboard:  'ROGUE_TRADER.voidship_slot.starboard.long',
  keel:       'ROGUE_TRADER.voidship_slot.keel.long',
  misc:       'ROGUE_TRADER.voidship_slot.misc.long',
};

ROGUE_TRADER.voidship_slot_abbr = {
  prow:       'ROGUE_TRADER.voidship_slot.prow.abbr',
  port:       'ROGUE_TRADER.voidship_slot.port.abbr',
  starboard:  'ROGUE_TRADER.voidship_slot.starboard.abbr',
  keel:       'ROGUE_TRADER.voidship_slot.keel.abbr',
  misc:       'ROGUE_TRADER.voidship_slot.misc.abbr',
};

ROGUE_TRADER.voidship_component_type = {
  hull:         'ROGUE_TRADER.voidship_component_type.hull.long',
  essential:    'ROGUE_TRADER.voidship_component_type.essential.long',
  supplemental: 'ROGUE_TRADER.voidship_component_type.supplemental.long',
  weapon:       'ROGUE_TRADER.voidship_component_type.weapon.long',
  upgrade:      'ROGUE_TRADER.voidship_component_type.upgrade.long',
};

ROGUE_TRADER.voidship_component_type_abbr = {
  hull:         'ROGUE_TRADER.voidship_component_type.hull.abbr',
  essential:    'ROGUE_TRADER.voidship_component_type.essential.abbr',
  weapon:       'ROGUE_TRADER.voidship_component_type.weapon.abbr',
  supplemental: 'ROGUE_TRADER.voidship_component_type.supplemental.abbr',
  upgrade:      'ROGUE_TRADER.voidship_component_type.upgrade.abbr',
};

ROGUE_TRADER.voidship_essential_type = {
  augur_array:    'ROGUE_TRADER.voidship_essential_type.augur_array.long',
  crew_quarters:  'ROGUE_TRADER.voidship_essential_type.crew_quarters.long',
  geller_field:   'ROGUE_TRADER.voidship_essential_type.gellar_field.long',
  life_sustainer: 'ROGUE_TRADER.voidship_essential_type.life_sustainer.long',
  plasma_drive:   'ROGUE_TRADER.voidship_essential_type.plasma_drive.long',
  ships_bridge:   'ROGUE_TRADER.voidship_essential_type.ships_bridge.long',
  void_shield:   'ROGUE_TRADER.voidship_essential_type.void_shields.long',
  warp_engine:    'ROGUE_TRADER.voidship_essential_type.warp_engine.long',
};

ROGUE_TRADER.voidship_weapon_type = {
  macrocannon:            'ROGUE_TRADER.voidship_weapon_type.macrocannon.long',
  macrocannon_broadside:  'ROGUE_TRADER.voidship_weapon_type.macrocannon_broadside.long',
  lance:                  'ROGUE_TRADER.voidship_weapon_type.lance.long',
  torpedo:                'ROGUE_TRADER.voidship_weapon_type.torpedo.long',
  nova:                   'ROGUE_TRADER.voidship_weapon_type.nova.long',
  small_craft:            'ROGUE_TRADER.voidship_weapon_type.small_craft.long',
};

ROGUE_TRADER.voidship_hull_type = {
  raider:         'ROGUE_TRADER.voidship_hull_type.raider.long',
  frigate:        'ROGUE_TRADER.voidship_hull_type.frigate.long',
  light_cruiser:  'ROGUE_TRADER.voidship_hull_type.light_cruiser.long',
  cruiser:        'ROGUE_TRADER.voidship_hull_type.cruiser.long',
  battlecruiser:  'ROGUE_TRADER.voidship_hull_type.battlecruiser.long',
  grand_cruiser:  'ROGUE_TRADER.voidship_hull_type.grand_cruiser.long',
};

ROGUE_TRADER.voidship_hull_type_abbreviation = {
  raider:         'ROGUE_TRADER.voidship_hull_type.raider.abbr',
  frigate:        'ROGUE_TRADER.voidship_hull_type.frigate.abbr',
  light_cruiser:  'ROGUE_TRADER.voidship_hull_type.light_cruiser.abbr',
  cruiser:        'ROGUE_TRADER.voidship_hull_type.cruiser.abbr',
  battlecruiser:  'ROGUE_TRADER.voidship_hull_type.battlecruiser.abbr',
  grand_cruiser:  'ROGUE_TRADER.voidship_hull_type.grand_cruiser.abbr',
};

////Non-VS

ROGUE_TRADER.craftsmanship = {
  poor:   'ROGUE_TRADER.craftsmanship.poor.long',
  common: 'ROGUE_TRADER.craftsmanship.common.long',
  good:   'ROGUE_TRADER.craftsmanship.good.long',
  best:   'ROGUE_TRADER.craftsmanship.best.long',
};

ROGUE_TRADER.craftsmanship_abbr = {
  poor:   'ROGUE_TRADER.craftsmanship.poor.abbr',
  common: 'ROGUE_TRADER.craftsmanship.common.abbr',
  good:   'ROGUE_TRADER.craftsmanship.good.abbr',
  best:   'ROGUE_TRADER.craftsmanship.best.abbr',
};



//different format?



//TODO: Reformulate using the above style (and add localization)
/*
ROGUE_TRADER.skills = {
  "acrobatics"          :  {name: "Acrobatics",         attribute: "agility"},
  "athletics"           :  {name: "Athletics",          attribute: "strength"},
  "awareness"           :  {name: "Awareness",          attribute: "perception"},
  "charm"               :  {name: "Charm",              attribute: "fellowship"},
  "command"             :  {name: "Command",            attribute: "fellowship"},
  "commerce"            :  {name: "Commerce",           attribute: "fellowship"},
  "deceive"             :  {name: "Deceive",            attribute: "fellowship"},
  "dodge"               :  {name: "Dodge",              attribute: "agility"},
  "inquiry"             :  {name: "Inquiry",            attribute: "fellowship"},
  "interrogation"       :  {name: "Interrogation",      attribute: "willpower"},
  "intimidate"          :  {name: "Intimidate",         attribute: "strength"},
  "logic"               :  {name: "Logic",              attribute: "intelligence"},
  "medicae"             :  {name: "Medicae",            attribute: "intelligence"},
  "navigatesurface"     :  {name: "Navigate(surface)",  attribute: "intelligence"},
  "navigatestellar"     :  {name: "Navigate(stellar)",  attribute: "intelligence"},
  "navigatewarp"        :  {name: "Navigate(warp)",     attribute: "intelligence"},
  "operateaeronautica"  :  {name: "Operate(aero)",      attribute: "agility"},
  "operatesurface"      :  {name: "Operate(surface)",   attribute: "agility"},
  "operatevoidship"     :  {name: "Operate(voidship)",  attribute: "agility"},
  "parry"               :  {name: "Parry",              attribute: "weaponskill"},
  "psyniscience"        :  {name: "Psyniscience",       attribute: "willpower"},
  "scrutiny"            :  {name: "Scrutiny",           attribute: "perception"},
  "security"            :  {name: "Security",           attribute: "intelligence"},
  "sleightofhand"       :  {name: "Sleight of hand",    attribute: "agility"},
  "stealth"             :  {name: "Stealth",            attribute: "agility"},
  "survival"            :  {name: "Survival",           attribute: "perception"},
  "techuse"             :  {name: "Tech-use",           attribute: "intelligence"},
  "trade"               :  {name: "Trade",              attribute: "intelligence"},
};

ROGUE_TRADER.rank_values = {
  0: -20,
  1: 10,
  2: 20,
  3: 30,
  4: 40
};

ROGUE_TRADER.aptitudes = {
  "custom"          : "CUSTOM",
  "general"         : "General",
  "willpower"       : "Willpower",
  "defense"         : "Defense",
  "weaponskill"     : "Weapon Skill",
  "ballisticskill"  : "Ballistic Skill",
  "intelligence"    : "Intelligence",
  "tech"            : "Tech",
  "fieldcraft"      : "Fieldcraft",
  "psyker"          : "Psyker",
  "strength"        : "Strength",
  "finesse"         : "Finesse",
  "offense"         : "Offense",
};

*/