import Item from './item';
import FlatItem from '../dtos/flat-item';

export default class Flat
{
    constructor(private _floor:number = null, private _unity:number = null, private _itens:FlatItem[] = null)
    {

    }

    get floor():number
    {
        return this._floor;
    }

    set floor(floor:number)
    {
        this._floor = floor;
    }

    get unity():number
    {
        return this._unity;
    }

    set unity(unity:number)
    {
        this._unity = unity;
    }
    
    get code():string
    {
        return `${this._floor}${(this._unity).toString().padStart(2, '0')}`
    }

    get itens():FlatItem[]
    {
        return this._itens;
    }

    set itens(itens:FlatItem[])
    {
        this._itens = itens;
    }

    
}