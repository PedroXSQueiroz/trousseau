import Item from '../models/item';

export default class FlatItem
{
    constructor()
    {
        this.item = new Item();
    }
    
    public item: Item;

    public quantity:number;
}