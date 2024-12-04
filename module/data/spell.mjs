import RogueTraderItemBase from "./item-base.mjs";
//DEF: spell boilerplate from D&D
//TODO: alter to psychic power

export default class RogueTraderSpell extends RogueTraderItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.spellLevel = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 9 });

    return schema;
  }
}