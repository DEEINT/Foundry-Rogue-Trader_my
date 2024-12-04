import RogueTraderActorBase from "./actor-base.mjs";
//DEF: NPC character baseline
//TODO: build out a possible taxonomy for npcs ranging from skeletal mook to GMPC equivalent 
//(probably just two levels of npc)

export default class RogueTraderNPC extends RogueTraderActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.cr = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });
    schema.xp = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    
    return schema
  }

  prepareDerivedData() {
    this.xp = this.cr * this.cr * 100;
  }
}