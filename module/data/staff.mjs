import RogueTraderItem from "./item.mjs";
//DEF: experimental schema for groups of npcs
//TODO: figure out what to do with this I guess

export default class RogueTraderStaff extends RogueTraderItem {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema(true,'vs');

    return schema;
  }

}