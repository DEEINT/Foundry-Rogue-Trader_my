// Import document classes.
import { RogueTraderActor } from './documents/actor.mjs';
import { RogueTraderItem } from './documents/item.mjs';
// Import sheet classes.
import { RogueTraderActorSheet } from './sheets/actor-sheet.mjs';
import { RogueTraderItemSheet } from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from './helpers/templates.mjs';
import { ROGUE_TRADER } from './helpers/config.mjs';
// Import DataModel classes
import * as models from './data/_module.mjs';

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.roguetrader = {
    RogueTraderActor,
    RogueTraderItem,
    rollItemMacro,
  };

  // Add custom constants for configuration.
  CONFIG.ROGUE_TRADER = ROGUE_TRADER;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20 + @abilities.dex.mod',
    decimals: 2,
  };

  // Define custom Document and DataModel classes
  CONFIG.Actor.documentClass = RogueTraderActor;

  // Note that you don't need to declare a DataModel
  // for the base actor/item classes - they are included
  // with the Character/NPC as part of super.defineSchema()
  CONFIG.Actor.dataModels = {
    character: models.RogueTraderCharacter,
    npc: models.RogueTraderNPC,
    voidship: models.RogueTraderVoidship
  }
  CONFIG.Item.documentClass = RogueTraderItem;
  CONFIG.Item.dataModels = {
    item: models.RogueTraderItem,
    feature: models.RogueTraderFeature,
    spell: models.RogueTraderSpell,
    component: models.RogueTraderComponent,
    hull: models.RogueTraderHull,
    //voidship_weapon: models.RogueTraderVoidshipWeapon,
    //voidship_essential: models.RogueTraderVoidshipEssential
  }

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('rogue-trader', RogueTraderActorSheet, {
    makeDefault: true,
    label: 'ROGUE_TRADER.SheetLabels.Actor',
  });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('rogue-trader', RogueTraderItemSheet, {
    makeDefault: true,
    label: 'ROGUE_TRADER.SheetLabels.Item',
  });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

//returns localized key:value object from CONFIG[key]
// get value from simple key-value pair config objects
Handlebars.registerHelper("locCfg", function (key, fallback="N/A") {
  if(CONFIG.ROGUE_TRADER[key]){
    let obj = {};
    for (let [subkey, abil] of Object.entries(CONFIG.ROGUE_TRADER[key])){
      obj[subkey] = game.i18n.localize(CONFIG.ROGUE_TRADER[key][subkey])
    }
    //console.log("returning configured and localized object:",obj);
    return obj;
  }
  else return fallback;
});

Handlebars.registerHelper("locVal", function (key, subkey, fallback="N/A") {
  //console.log("key: ",CONFIG.ROGUE_TRADER[key]);
  //console.log("subkey: ",CONFIG.ROGUE_TRADER[key][subkey]);
  //console.log("localized: ",game.i18n.localize(CONFIG.ROGUE_TRADER[key][subkey]));
  if(CONFIG.ROGUE_TRADER[key] && CONFIG.ROGUE_TRADER[key][subkey]) return game.i18n.localize(CONFIG.ROGUE_TRADER[key][subkey]);
    else return fallback;
});

//get selected attribute from more complex config objects
Handlebars.registerHelper("objLookup", function (obj, key, value, fallback="N/A") {
  if(CONFIG.ROGUE_TRADER[obj][key][value]) return CONFIG.ROGUE_TRADER[obj][key][value];
  else return fallback;
});

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

Handlebars.registerHelper('ifeq', function (a, b, options) {
  if (a == b) { return options.fn(this); }
  return options.inverse(this);
});

Handlebars.registerHelper('ifnoteq', function (a, b, options) {
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
});

//implements switch statements in handlebars
Handlebars.registerHelper('switch', function(value, options) {
  this.switch_value = value;
  return options.fn(this);
});
Handlebars.registerHelper('case', function(value, options) {
  if (value == this.switch_value) {
    return options.fn(this);
  }
});
Handlebars.registerHelper('default', function(value, options) {
  return true; ///We can add condition if needs
});
/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.roguetrader.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'rogue-trader.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}