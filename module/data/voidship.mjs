import RogueTraderActorBase from "./actor-base.mjs";

export default class RogueTraderVoidship extends RogueTraderActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.affiliation      = new fields.StringField({blank: true });
    schema.captain          = new fields.StringField({blank: true });

    schema.space = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 0}),
      max:    new fields.NumberField({ ...requiredInteger, initial:  35, min: 1})
    });
    schema.power = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 0}),
      max:    new fields.NumberField({ ...requiredInteger, initial:  35, min: 1})
    });
    schema.ship_points = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 0}),
      max:    new fields.NumberField({ ...requiredInteger, initial:  35, min: 1})
    });
    schema.speed = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      max:    new fields.NumberField({ ...requiredInteger, initial:  0, min: 0})
    });
    schema.detection = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 0, min: -60, max: 60}),
      base:   new fields.NumberField({ ...requiredInteger, initial:  0, min: -60, max: 60}),
      max:    new fields.NumberField({ ...requiredInteger, initial:  0, min: -60, max: 60})
    });
    schema.manoeuvrability = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 0, min: -60, max: 60}),
      base:   new fields.NumberField({ ...requiredInteger, initial:  0, min: -60, max: 60}),
      max:    new fields.NumberField({ ...requiredInteger, initial:  0, min: -60, max: 60})
    });
    schema.integrity = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 35, min: -1 }),
      max:    new fields.NumberField({ ...requiredInteger, initial: 35 , min: 1})
    });
    schema.morale = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 0}),
      rate:   new fields.NumberField({ ...requiredInteger, initial: 0}),
      max:    new fields.NumberField({ ...requiredInteger, initial:  100, min: 1})
    });
    schema.crew_population = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 0}),
      rate:   new fields.NumberField({ ...requiredInteger, initial: 0}),
      max:    new fields.NumberField({ ...requiredInteger, initial: 100, min: 1})
    });
    schema.turretrating = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      max:    new fields.NumberField({ ...requiredInteger, initial: 0, min: 0})
    });
    schema.armor = new fields.SchemaField({
      value:  new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      max:    new fields.NumberField({ ...requiredInteger, initial: 0, min: 0})
    });
    return schema;
  }
}