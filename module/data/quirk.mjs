import RogueTraderItem from "./item.mjs";

export default class RogueTraderQuirk extends RogueTraderItem {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema(false,'vs');

    return schema;
  }
}