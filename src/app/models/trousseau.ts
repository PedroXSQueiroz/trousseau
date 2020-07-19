import Item from './item';
import { TrousseauStatus } from '../contants/trousseau-status';
import Flat from './flat';
import DtoParseable from './dto-parseable';

export default class Trousseau implements DtoParseable
{
    public static itensArrayToMap(itens:{ ['item']:Item , ['quantity']:number } [] ):Map<Item, number>
    {
        if(!itens)
        {
            return new Map();
        }
        
        let map = new Map<Item, number>();
        
        for(let pairItemQuant of itens)
        {
            map.set(pairItemQuant.item, pairItemQuant.quantity);
        }
        
        return map;
    }

    public static mapToItensArray(map:Map<Item, number>):{ ['item']:Item , ['quantity']:number } []
    {
        if(!map)
        {
            return [];
        }
        
        let itensArray: { ['item']:Item , ['quantity']:number } [] = [];

        map.forEach( (quant, item) => {
            itensArray.push({
                item: item,
                quantity: quant
            })
        });

        return itensArray;
    }
    
    private _date:Date;
    
    constructor(
        private _flat: Flat,
        private _itens: { ['item']:Item , ['quantity']:number } [] = [],
        private _diff: { ['item']:Item , ['quantity']:number } [] = [],
        private _status:TrousseauStatus = null,
        private _id:string = null)
    {

    }
    
    get flat():Flat
    {
        return this._flat;
    }

    set flat(flat:Flat)
    {
        this._flat = flat;
    }

    get itens():Map<Item, number>
    {
       return Trousseau.itensArrayToMap(this._itens);
    }

    public addItem(item:Item)
    {
        let itemIndex = this._itens.findIndex( currentItem => currentItem.item.id == item.id );
    
        if(itemIndex == -1)
        {
            this._itens.push({
                item: item,
                quantity: 1
            })
        }else
        {
            this._itens[itemIndex].quantity ++;
        }
    
    }

    public removeItem(item:Item)
    {
        let itemIndex = this._itens.findIndex( currentItem => currentItem.item.id == item.id );

        if(itemIndex != -1)
        {
            let quantity = this._itens[itemIndex].quantity
        
            if(quantity > 1)
            {
                this._itens[itemIndex].quantity --;
            }
            else
            {
                this._itens.splice(itemIndex, 1);
            }
        
        }
    }

    get diff():Map<Item, number>
    {
        return Trousseau.itensArrayToMap(this._diff);
    }

    set diff(diff:Map<Item, number> )
    {
        this._diff = Trousseau.mapToItensArray(diff);
    }

    addItemDiff(item:Item)
    {
        let itemIndex = this._diff.findIndex( currentItem => currentItem.item.id == item.id );
    
        if(itemIndex == -1)
        {
            this._diff.push({
                item: item,
                quantity: 1
            })
        }else
        {
            this._diff[itemIndex].quantity ++;
        }
    }

    removeItemDiff(item:Item)
    {
        let itemIndex = this._diff.findIndex( currentItem => currentItem.item.id == item.id );

        if(itemIndex != -1)
        {
            let quantity = this._diff[itemIndex].quantity
        
            if(quantity > 1)
            {
                this._diff[itemIndex].quantity --;
            }
            else
            {
                this._diff.splice(itemIndex, 1);
            }
        
        }
    }

    get total():number
    {

        let total = 0;

        for( let itemToQuantity of this._itens )
        {
            total+= itemToQuantity.item.value * itemToQuantity.quantity;
        }
        
        return total;
    }

    get diffTotal():number
    {
        let total = 0;
        
        for( let itemToQuantity of this._diff )
        {
            total+= itemToQuantity.item.value * itemToQuantity.quantity;
        }

        return total;
    }

    get liquidTotal():number
    {
        if(this._diff.length == 0)
        {
            throw 'Trousseau should already been evaluated, having status OK or NOT_OK';
        }
        
        return this.total - this.diffTotal;
    }

    get status():TrousseauStatus
    {
        return this._status;
    }

    set status(status:TrousseauStatus)
    {
        this._status = status;
    }

    get date():Date
    {
        return this._date;
    }

    set date(date:Date)
    {
        this._date = date;
    }

    get id():string
    {
        return this._id;
    }

    set id(id:string)
    {
        this._id = id;
    }

    toDto() 
    {
        return {
            id:     this._id,
            itens:  this._itens,
            diff:   this._diff,
            date:   this._date,
            status: this._status
        }
    }

}