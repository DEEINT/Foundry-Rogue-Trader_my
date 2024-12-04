import RogueTraderItem from "./item.mjs";
//DEF: Complications cover Machine Spirit Oddities, Histories, and Background Packages for voidships
//TODO: fill out
export default class RogueTraderComplication extends RogueTraderItem {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema(false,'vs');

    return schema;
  }
}