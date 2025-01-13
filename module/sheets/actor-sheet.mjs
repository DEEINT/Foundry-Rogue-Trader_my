import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class RogueTraderActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['rogue-trader', 'sheet', 'actor'],
      width: 600,
      height: 600,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'features',
        },
      ],
    });
  }

  /** @override */
  get template() {
    return `systems/rogue-trader/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = context.data;

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Prepare Voidship data and items.
    if (actorData.type == 'voidship') {
      this._prepareVoidshipItems(context);
    }

    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterData(context) {
    // Handle ability scores.
    // for (let [k, v] of Object.entries(context.system.abilities)) {
    //   v.label = game.i18n.localize(CONFIG.ROGUE_TRADER.abilities[k]) ?? k;
    // }
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const features = [];
    const spells = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i);
      }
      // Append to spells.
      else if (i.type === 'spell') {
        if (i.system.spellLevel != undefined) {
          spells[i.system.spellLevel].push(i);
        }
      }
    }
    // Assign and return
    context.gear = gear;
    context.features = features;
    context.spells = spells;
  }

  _prepareVoidshipItems(context) {
    //TODO: needs to handle the new hull-as-component and pull slot data from that
    //Also needs to be able to limit to just one hull and such
    console.log("voidship item update context: ", context);
    let net_attributes = {
      space: 0,
      ship_points: 0,
      power:0
    }

    function rankComps(comp){
      if(!comp.rank) comp.rank = 0;
      if(comp.system.type==='essential' && vs_rank.essential[comp.system.subtype]) comp.rank = comp.rank + vs_rank.essential[comp.system.subtype];
      else if (vs_rank[comp.system.type]) comp.rank = comp.rank + vs_rank[comp.system.type];
      else if (vs_rank[comp.type] && vs_rank[comp.type]=='hull') comp.rank = comp.rank + vs_rank[comp.system.type];
      else console.log("no rank found for: ",comp);
      //return comp;
    }
    
    const vs_config = {
      hull: 1,
      essential: {
        augur_array: 1,
        crew_quarters: 1,
        geller_field: 1,
        life_sustainer: 1,
        plasma_drive: 1,
        ship_bridge: 1,
        void_shield: 1,
        warp_engine: 1
      },
      slots: {
        prow: -1,
        port: -1,
        starboard: -1,
        keel: -1
      }
    };
    const vs_rank = {
      hull: 10,
      essential: {
        augur_array: 3,
        crew_quarters: 4,
        geller_field: -1,
        life_sustainer: 5,
        plasma_drive: 9,
        ship_bridge: 6,
        void_shield: 7,
        warp_engine: 8
      },
      slots: {
        prow: 2,
        port: 1,
        starboard: 0,
        keel: -1
      },
      supplemental: -2,
      upgrade: -3
    }
    let hull = null;
    const equipped = [];
    const components = [];

    hull = context.items.find((item) => item.type==="hull");
    //console.log("here's the hull:",hull);
    if(hull){
      vs_config.hull--;
      vs_config.slots=hull.system.weaponcapacity;
      rankComps(hull);
    }

    for (let i of context.items) {
      if (i.type === 'component'){
        for (let j of Object.keys(net_attributes)){
          if (i.system.comp_attrs[j]){
            net_attributes[j] += i.system.comp_attrs[j]
          }
        }
        rankComps(i);
        //TODO: check config capacity
        if (i.system.type==='essential' && vs_config.essential[i.system.subtype] && i.system.equipped){
          vs_config.essential[i.system.subtype]--;
          //console.log("got one equipped engine");
        }
        else if (i.system.type==='essential' && vs_config.essential[i.system.subtype]<=0){
          i.system.equipped=false;
          //console.log("already one engine here");
        }
        else if (i.system.type==='weapon' && vs_config.slots[i.system.weapon.slot] && i.system.equipped){
          vs_config.slots[i.system.weapon.slot]--;
          //console.log("equipped weapon found");
        }
        else if (i.system.type==='weapon' && vs_config.slots[i.system.weapon.slot] <1){
          i.system.equipped=false;
          //console.log("excess weapon found");
        }
        else { console.log("component isn't essential or a weapon?");}
        components.push(i);
        //console.log("the item: ",i);
      }
    }

    //validate final config, set values, and return
    //console.log("ending config: ",vs_config);
    context.hull = hull;
    context.components = components;
    for (let j of Object.keys(net_attributes)){
      //console.log("here's the j: ",j);
      //console.log("here's the actor: ",context.actor);
      if (context.data.system[j]){
        context.data.system[j].value = net_attributes[j];
        //console.log("net attributes of: ",net_attributes[j])
      }
    }
    //console.log("the final components: ",context.components);
    //console.log("the final hull:",context.hull)
    console.log("actorData? ", context.data);
    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".checkbox").click(this._onCheckboxClick.bind(this));

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '.item-delete', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  _onCheckboxClick(event) {
    console.log("triggered checkbox click handler");
    let target = $(event.currentTarget).attr("data-target");
    console.log("target is:",target);
    if (target == "item") {
        target = $(event.currentTarget).attr("data-item-target");
        console.log("target is:",target);
        let item = this.actor.items.get($(event.currentTarget).parents(".item").attr("data-item-id"));
        console.log("item retrieved:",item);
        console.log("property checked:",getProperty(item, target));
        return item.update({ [`${target}`]: !getProperty(item, target) })
    }
    if (target) return this.actor.update({ [`${target}`]: !getProperty(this.actor.data, target) });
  }
}



