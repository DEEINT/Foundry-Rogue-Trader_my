import RogueTraderItem from "./item.mjs";

export default class RogueTraderStaff extends RogueTraderItem {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema(true,'vs');

    return schema;
  }

}