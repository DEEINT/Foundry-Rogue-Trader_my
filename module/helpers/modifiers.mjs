/**
 * Extends the basic Form to handle attaching modifiers to items
 * @extends {FormApplication}
 */
export class ItemModifiers extends FormApplication 
{
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "item-modifiers",
            template : "systems/rogue-trader/templates/popups/item-modifiers.hbs",
            height : "auto",
            width : "auto",
            title : "Item Modifiers",
            resizable : true
            
        })
    }
    
    getData(){
        let data = super.getData();
        let object = this.object;
        try {
            console.log("item object: ",object);
            if(object.type=='component'){
                let attr_obj = this.object.system.comp_attrs;
                let array = Object.keys(attr_obj)
                .map(key => this.convertElement(key,attr_obj[key]));
                if(this.object.system.type=='hull'){
                    let slt_obj = this.object.system.weaponcapacity;
                    let slt_ar = Object.keys(slt_obj).map(key => this.convertElement(key,slt_obj[key]));
                    array = array.concat(slt_ar);
                }
                if(this.object.system.type=='weapon'){
                    let wpn_obj = this.object.system.weapon;
                    let wpn_ar = Object.keys(wpn_obj).map(key => this.convertElement(key,wpn_obj[key]));
                    array = array.concat(wpn_ar);
                }
                console.log("converted array: ",array);
                data.modifiers = array;
                //10.20.24 TODO: map schemas into value field and value+floor fields 
            }else{
                console.log("TBD TODO: do true attributes from cfg");
            }
        }
        catch(e)
        {
            data.modifiers = [];
            console.error("Something went wrong when trying to open the modifiers menu: " + e);
        }
        return data;
    }
    _updateObject(event, formData)
    {
        let newmodifiers = {};
        //console.log("formData from Update: ",formData);
        for (let key in formData)
        {
            //1.13.2025 TODO: figure out how to parse the weapon and weapon capacity stuff back into this updater
            //probably need some new handlebars templates to parse these in the sheet and append new suffixes which this section can then sort by
            //also TODO: need to build the display string of all nonzero values and show that?
            if (formData[key] && key.includes("-base"))
            {
                let newkey = key.replace("-base",""); 
                newmodifiers[newkey] = formData[key];
            }
            else if(formData[key] && key.includes("-value")){
                let newkey = key.replace("-value","");
                if(!newmodifiers[newkey]) newmodifiers[newkey] = {value: formData[key]};
                else newmodifiers[newkey].value = formData[key];
            }
            else if (formData[key] && key.includes("-floor")){
                let newkey = key.replace("-floor","");
                if(!newmodifiers[newkey]) newmodifiers[newkey] = {floor: formData[key]};
                else newmodifiers[newkey].floor = formData[key];
            }
            console.log("new modifiers: ",newmodifiers);
        }
        console.log("new modifiers being pushed: ", newmodifiers);
        this.object.update({"system.comp_attrs" : newmodifiers});
        console.log("system relevant attributes: ",this.object.system.comp_attrs);
    }
    convertElement(key,val){
        if (typeof val === 'object' && !Array.isArray(val) && val !== null)
            return {name:key, value: val.value, floor: val.floor, hasMin:true}
        else return {name:key, value: val, hasMin:false}
    }

    /*getData() {
        let data = super.getData(); 
        data.custom = this.constructCustomString(this.object.modifiers);
        try {
            data.modifiers = Object.keys(this.object.modifiersAvailable).map(i => {
                let existing = this.object._source.system.modifiers.find(t => t.name == i);
                if (this.object.type == "weaponUpgrade" || this.object.type == "ammo")
                existing = this.object.modifiers.find(t => t.name == i && t.type == this.options.type); // Don't include modifiers from the other type for existing
                return  {
                    display : this.object.modifiersAvailable[i],
                    key : i,
                    existingmodifier : existing,
                    hasRating : game.wng.config.modifierHasRating[i],
                }
            });
        }
        catch (e)
        {
            data.modifiers = [];
            console.error("Something went wrong when trying to open the modifiers menu: " + e);
        }
        return data;
    }*/
    /*
    _updateObject(event, formData)
    {
        let newmodifiers = [];
        if (this.object.type == "weaponUpgrade" || this.object.type == "ammo")
        {
            newmodifiers = this.object.modifiers.filter(i => i.type != this.options.type); // Retain modifiers from the other type
        }
        for (let key in formData)
        {
            if (key == "custom-modifiers")
                newmodifiers = newmodifiers.concat(this.parseCustommodifiers(formData[key]));

            else if (formData[key] && !key.includes("rating"))
            {
                let modifierObj = { name : key};
                let rating = formData[`${key}-rating`];
                if (rating)
                    modifierObj.rating = Number.isNumeric(rating) ? parseInt(rating) : rating;

                if (this.options.type)
                    modifierObj.type = this.options.type;
                newmodifiers.push(modifierObj);
            }
        }
        this.object.update({"data.modifiers" : newmodifiers});
    }

    parseCustommodifiers(string)
    {
        let regex = /(.+?):(.+?)(\||$)/gm;

        let matches = string.matchAll(regex);
        let modifiers = [];

        for (let match of matches)
        {
            modifiers.push({
                name : match[1].trim().slugify(),
                custom : true,
                display : match[1].trim(),
                description : match[2].trim(),
                type : this.options.type
            });
        }

        return modifiers
    }

    constructCustomString(modifiers)
    {
        let customString = ``;
        let custommodifiers = modifiers.filter(i => i.custom);

        custommodifiers.forEach(t => {
            customString += `${t.display} : ${t.description} |`;
        });
        return customString
        
    }*/
}