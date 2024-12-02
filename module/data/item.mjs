import RogueTraderItemBase from "./item-base.mjs";
//import { ROGUE_TRADER } from './helpers/config.mjs';

export default class RogueTraderItem extends RogueTraderItemBase {

  //TODO: set up type/subtype to validate based on grouping passed
  //aka voidships can have certain types/subtypes, etc etc

  static defineSchema(phys=true,grouping) {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    
    //schema.grouping = new fields.StringField({initial: grouping});
    schema.origin       = new fields.StringField({blank: true});
    schema.availability = new fields.NumberField({ ...requiredInteger, initial: 0, min:0});
    schema.type         = new fields.StringField({required: true, initial: "" });
    schema.subtype      = new fields.StringField({required: true, initial: "" });
    
    //TODO NEXT: change modifiers to an EmbeddedDataField (aka a Class) that implements all the getters and setters modifiers need
    /*schema.modifiers    = new fields.ArrayField(new fields.ObjectField({
      name:  new fields.StringField({blank: true}),
      hasValu e: new fields.BooleanField({initial: true}),
      value: new fields.NumberField({ ...requiredInteger, initial:  0})
    }));*/

    /*schema.alterations = new fields.SchemaField({
      name: new StringField({blank: true}),
      rating: new NumberField({ ...requiredInteger}),
      minimum: new NumberField({ ...requiredInteger})
    })*/
   /*schema.alterations = new fields.ArrayField(
    new SchemaField({
      name: new StringField({blank: true}),
      rating: new NumberField({ ...requiredInteger}),
      floor: new NumberField({ ...requiredInteger})
    })
   );*/


    if(phys){
      schema.craftsmanship = new fields.NumberField({ ...requiredInteger, initial: 0, min:0});
      schema.equipped = new fields.BooleanField({initial:true});
      schema.quantity = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
      schema.weight = new fields.NumberField({ required: true, nullable: false, initial: 0, min: 0 });
    }
    if(grouping=='vs'){
      schema.status =     new fields.NumberField({ ...requiredInteger, initial: 0, min:0, max:4}),
      schema.comp_attrs = new fields.SchemaField({
        space :            new fields.NumberField({integer: true}),
        power :            new fields.NumberField({ integer: true}),
        ship_points :      new fields.NumberField({ integer: true}),
        speed :            new fields.NumberField({ integer: true, min: 0}),
        detection :        new fields.NumberField({ integer: true, min: -60, max: 60}),
        manoeuvrability :  new fields.NumberField({ integer: true, min: -60, max: 60}),
        integrity :        new fields.NumberField({ integer: true, min: 0}),
        morale :           new fields.NumberField({ integer: true, min: 0}),
        morale_loss :      new fields.SchemaField({ 
          value: new fields.NumberField({ integer: true, initial: 0}),
          floor: new fields.NumberField({ integer: true, initial: 0}),
        }),
        crew_population      :  new fields.NumberField({ integer: true, min:0}),
        crew_population_loss :  new fields.SchemaField({ 
          value: new fields.NumberField({ integer: true, initial: 0}),
          floor: new fields.NumberField({ integer: true, initial: 0}),
        }),
        crew_rating :       new fields.NumberField({ integer: true, min: 0}),
        turret_rating :     new fields.NumberField({ integer: true, min: 0}),
        armor :             new fields.NumberField({ integer: true, min: 0})
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