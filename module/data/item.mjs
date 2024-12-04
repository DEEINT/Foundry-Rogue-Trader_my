import RogueTraderItemBase from "./item-base.mjs";
//import { ROGUE_TRADER } from './helpers/config.mjs';

//DEF: the real base item for the system's other items AND the template for a generic RT item
//TODO: look at setting up validators, clean up all the getter/setters, deal with the commented-out legacy code scraps
//Also figure out what to do with the messy type/subtype schemas
export default class RogueTraderItem extends RogueTraderItemBase {

  static defineSchema(phys=true,grouping) {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.origin       = new fields.StringField({blank: true});
    schema.availability = new fields.NumberField({ ...requiredInteger, initial: 0, min:0});
    schema.type         = new fields.StringField({required: true, initial: "" });
    schema.subtype      = new fields.StringField({required: true, initial: "" });

    if(phys){
      schema.craftsmanship = new fields.NumberField({ ...requiredInteger, initial: 0, min:0});
      schema.equipped = new fields.BooleanField({initial:true});
      schema.quantity = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
      schema.weight = new fields.NumberField({ required: true, nullable: false, initial: 0, min: 0 });
    }
    if(grouping=='vs'){
      schema.status =     new fields.NumberField({ ...requiredInteger, initial: 0, min:0, max:4}),
      schema.comp_attrs = new fields.SchemaField({
        space :            new fields.NumberField({ integer: true, initial: 0}),
        power :            new fields.NumberField({ integer: true, initial: 0}),
        ship_points :      new fields.NumberField({ integer: true, initial: 0}),
        speed :            new fields.NumberField({ integer: true, initial: 0, min: 0}),
        detection :        new fields.NumberField({ integer: true, initial: 0, min: -60, max: 60}),
        manoeuvrability :  new fields.NumberField({ integer: true, initial: 0, min: -60, max: 60}),
        integrity :        new fields.NumberField({ integer: true, initial: 0, min: 0}),
        morale :           new fields.NumberField({ integer: true, initial: 0, min: 0}),
        morale_loss :      new fields.SchemaField({ 
          value: new fields.NumberField({ integer: true, initial: 0}),
          floor: new fields.NumberField({ integer: true, initial: 0}),
        }),
        crew_population      :  new fields.NumberField({ integer: true, initial: 0, min:0}),
        crew_population_loss :  new fields.SchemaField({ 
          value: new fields.NumberField({ integer: true, initial: 0}),
          floor: new fields.NumberField({ integer: true, initial: 0}),
        }),
        crew_rating :       new fields.NumberField({ integer: true, initial: 0, min: 0, max: 100}),
        turret_rating :     new fields.NumberField({ integer: true, initial: 0, min: 0, max: 10}),
        armor :             new fields.NumberField({ integer: true, initial: 0, min: 0, max: 30})
      })
    }
    return schema;
  }

  /*get availableAlterations(){
    console.log("accessing CFG within a getter: ",CONFIG.ROGUE_TRADER);
    console.log("checking for available modifiers!",CONFIG.ROGUE_TRADER.voidship_stat);
    if (this.type == "weapon" || this.type == "weaponUpgrade" || this.type == "ammo")
        return CONFIG.ROGUE_TRADER.weaponTraits
    else if (this.type == "armour")
        return CONFIG.ROGUE_TRADER.armourTraits
    else if (this.type == "component" || this.type =="hull")
      return CONFIG.ROGUE_TRADER.voidship_stat
    return 0;
  }*/

  testFunc(){
    return "fuck yeah!";
  }
  //get modifiersAvailable() {
    //console.log("hey look, an Item Getter is working!");
    /*console.log("checking for available modifiers!",CONFIG.ROGUE_TRADER.voidship_stat);
    if (this.type == "weapon" || this.type == "weaponUpgrade" || this.type == "ammo")
        return CONFIG.ROGUE_TRADER.weaponTraits
    else if (this.type == "armour")
        return CONFIG.ROGUE_TRADER.armourTraits
    else if (this.type == "component" || this.type =="hull")
      return CONFIG.ROGUE_TRADER.voidship_stat*/
  //}

  /*get Modifiers() {
    return Object.values(this.modifierList).map(i => i.display)
  }

  get ModifiersAdd() {
      return Object.values(this.modifierList).filter(i => i.type == "add").map(i => i.display)
  }

  get ModifiersRemove() {
      return Object.values(this.modifierList).filter(i => i.type == "remove").map(i => i.display)
  }

  get modifierList() {
      let modifiers = {};
      this.schema.modifiers.forEach(i => {

          if (i.custom) 
          {
            modifiers[i.name] = duplicate(i);
          }
          else 
          {
            modifiers[i.name] = {
                  name: i.name,
                  display: this.modifiersAvailable[i.name],
                  type: i.type
              };
              if (game.wng.config.traitHasRating[i.name]) {
                  traits[i.name].rating = i.rating;
                  traits[i.name].display += ` (${i.rating})`;
              }
          }
      });
      return modifiers
  }*/

}