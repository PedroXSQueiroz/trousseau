export default class Item
{
    constructor(
            public name:string = null, 
            public value:number = null,
            public id:number = null)
    {

    }

    compare(other:Item):boolean
    {

        if(!other)
        {
            return false;
        }

        return this.id === other.id;

    }

}