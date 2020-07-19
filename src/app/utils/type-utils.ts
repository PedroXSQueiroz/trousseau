export default class TypeUtils<T>
{

    private _customSettingMethods: Map<string, (propValue:any) => any >
    private _propertiesRemap:Map<string, string>;
    
    constructor(private type: { new(... args: any[]) : T; } )
    {
        this._customSettingMethods  = new Map();
        this._propertiesRemap       = new Map();
    }

    registerCustomSettingField(name:string, settingMethod : (propValue:any) => any)
    {
        this._customSettingMethods.set(name, settingMethod);
    }

    remapProperty(original, newDestiny)
    {
        this._propertiesRemap.set(original, newDestiny);
    }

    fromAny(src:any):T
    {
        let newObject:T = new this.type();

        this.insertFromAny(newObject, src);

        return newObject;
    }
    
    insertFromAny(object:T, src:any):void
    {
        for(let prop in src)
        {
            let value =this.getValueFromSrc(prop, src);
            
            if(this._propertiesRemap.has(prop))
            {
                object[this._propertiesRemap.get(prop)] = value;
            }
            else
            {
                object[prop] = value;
            }
        }
    }


    private getValueFromSrc(prop: string, src: any) {
        
        if (this._customSettingMethods.has(prop)) 
        {
            return this._customSettingMethods.get(prop)(src[prop]);
        }
        else {
            return src[prop];
        }
    }
}