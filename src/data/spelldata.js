const defaultSpellList = [
  {
    spellID: "A001",
    spellName: "Acid Splash",
    spellLevel: 0,
    spellSchool: "Conjuration",
    spellAction: "Action",
    spellDamage: "1d6",
    spellDamageType: "Acid",
    savingThrow: "Dexterity",
    spellHigherLevel:
      "Damage increases to 2d6 at level 5, and 3d6 at level 10.",
    spellRange: 60, // in feet
    spellRadius: 7, // in feet
    spellDuration: null,
    spellInfo: "Throw a bubble of acid that damages each creature it hits.",
  },
  {
    spellID: "B001",
    spellName: "Blade Ward",
    spellLevel: 0,
    spellSchool: "Abjuration",
    spellAction: "Action",
    spellDamage: null,
    spellDamageType: null,
    savingThrow: null,
    spellHigherLevel: null,
    spellRange: 0,
    spellRadius: null,
    spellDuration: "2 Turns",
    spellInfo:
      "Has Resistance against bludgeoning, piercing, and slashing damage.",
  },
  {
    spellID: "B002",
    spellName: "Bone Chill",
    spellLevel: 0,
    spellSchool: "Necromancy",
    spellAction: "Action",
    spellDamage: "1d8",
    spellDamageType: "Necrotic",
    savingThrow: null,
    spellHigherLevel:
      "Damage increases to 2d8 at level 5, and 3d8 at level 10.",
    spellRange: 60,
    spellRadius: null,
    spellDuration: null,
    spellInfo:
      "Deals necrotic damage and prevent the target from healing until your next turn. An undead target receives disadvantage on attack rolls.",
  },
];

export default defaultSpellList;
