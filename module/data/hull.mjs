import RogueTraderItemBase from "./item-base.mjs";

//TODO: Deprecate and eliminate this!
export default class RogueTraderHull extends RogueTraderItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema(true,'vs');

    schema.weaponcapacity = new fields.SchemaField({
      prow:       new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 5}),
      port:       new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 5}),
      starboard:  new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 5}),
      keel:       new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 5}),
    });

    return schema;
  }
}