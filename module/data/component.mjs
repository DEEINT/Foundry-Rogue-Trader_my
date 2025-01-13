import RogueTraderItem from "./item.mjs";
//import { ROGUE_TRADER } from '../helpers/config.mjs'
//DEF: The basic Voidship Component
//TODO: build out the rest of VS taxonomy and see what holes there are; I'm sure this schema is missing some stuff
export default class RogueTraderComponent extends RogueTraderItem {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema(true,'vs');

    schema.weapon = new fields.SchemaField({
      slot: new fields.StringField({ initial: "prow" }),
      diceNum: new fields.StringField({ initial: "1" }),      
      diceSize: new fields.StringField({ initial: "d10" }),
      diceBonus: new fields.StringField({ initial: "+0" }),
      range: new fields.SchemaField({
        min:       new fields.NumberField({integer: true, initial: 0, min: 0}),
        max:       new fields.NumberField({integer: true, initial: 0, min: 0}),
      }),
      crit: new fields.NumberField({integer: true, initial: 0, min: 0 }),
      strength: new fields.NumberField({integer: true, initial: 0, min: 0 }),
    });

    schema.weaponcapacity = new fields.SchemaField({
      prow:       new fields.NumberField({integer: true, min: 0, max: 5}),
      port:       new fields.NumberField({integer: true, min: 0, max: 5}),
      starboard:  new fields.NumberField({integer: true, min: 0, max: 5}),
      keel:       new fields.NumberField({integer: true, min: 0, max: 5}),
    });

    schema.formula = new fields.StringField({ blank: true });
    
    return schema;
  }

  prepareDerivedData() {
    // Build the formula dynamically using string interpolation
    /*if(this.type=='weapon'){
      const weapon = this.weapon;
      this.formula = `${weapon.diceNum}${weapon.diceSize}${weapon.diceBonus}`
    }
    if(CONFIG.ROGUE_TRADER["voidship_"+this.type+"_type"]){
      if(!CONFIG.ROGUE_TRADER["voidship_"+this.type+"_type"].hasOwnProperty(this.subtype))  this.subtype="N/A";
    }
    else console.log("invalid component type");*/
    
  }
}