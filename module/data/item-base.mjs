export default class RogueTraderItemBase extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.description = new fields.StringField({ required: true, blank: true });
    schema.notes = new fields.StringField({required: true, blank: true });

    schema.src = new fields.StringField({required: true, blank: true });
    schema.pg = new fields.NumberField({integer:true});

    return schema;
  }
}

/*DEF: Item taxonomy diagram

[item-base]
  |
  ▼
  [item((phys,vs))] --> {vehicle group, personal group, starsys group, XP group}
    |
    {voidship group}
    |
    ▼
    [hull(phys,vs)] -- [component(phys,vs)] -- [complications(vs)]

    ...
    |
    {personal}
    |
    ▼
    TBD
*/