/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/rogue-trader/templates/actor/parts/actor-features.hbs',
    'systems/rogue-trader/templates/actor/parts/actor-items.hbs',
    'systems/rogue-trader/templates/actor/parts/actor-spells.hbs',
    'systems/rogue-trader/templates/actor/parts/actor-effects.hbs',
    'systems/rogue-trader/templates/actor/parts/voidship-build.hbs',
    'systems/rogue-trader/templates/actor/parts/voidship-features.hbs',
    'systems/rogue-trader/templates/actor/parts/voidship-description.hbs',
    // Item partials
    'systems/rogue-trader/templates/item/parts/item-effects.hbs',
    //Popups
    'systems/rogue-trader/templates/item/popups/item-modifiers.hbs',
  ]);
};
