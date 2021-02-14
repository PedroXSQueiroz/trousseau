import TypeUtils from 'src/app/utils/type-utils';
import TypeUtilsFactory from '../type-utils-factory';
import Trousseau from 'src/app/models/trousseau';
import Item from 'src/app/models/item';
import Flat from 'src/app/models/flat';
import TrousseauLogUtilsFactory from './trousseau-log-utils-factory';
import TrousseauLog from 'src/app/models/trousseau-log';

export default class TrousseauTypeUtilsFactory implements TypeUtilsFactory<Trousseau>
{
    build(): TypeUtils<Trousseau> {
        
        const tuItem:TypeUtils<Item> = new TypeUtils<Item>(Item);
        const tuFlat:TypeUtils<Flat> = new TypeUtils<Flat>(Flat);
        const tuTrousseau:TypeUtils<Trousseau> = new TypeUtils<Trousseau>(Trousseau);
        const tuLog:TypeUtils<TrousseauLog> = new TrousseauLogUtilsFactory().build();

        const buildItensList: (propValue: any) => any = (propValue) => {
            
            if(!propValue)
            {
                return [];
            }
            
            let itens: {
                ['item']: Item;
                ['quantity']: number;
            }[] = [];
            
            for (let currentItemToQuantity of propValue) 
            {
                let currentItem = tuItem.fromAny(currentItemToQuantity.item);
                itens.push({
                    item: currentItem,
                    quantity: currentItemToQuantity.quantity
                });
            }
            
            return itens;
        };


        
        tuTrousseau.remapProperty('diff', '_diff');

        tuTrousseau.registerCustomSettingField('diff', buildItensList);

        tuTrousseau.remapProperty('itens', '_itens');

        tuTrousseau.registerCustomSettingField('itens', buildItensList);

        tuTrousseau.registerCustomSettingField('flat', (propValue) => {

            return tuFlat.fromAny(propValue);

        })

        tuTrousseau.registerCustomSettingField('logs', (propValue) => {

            const logs = propValue.map(currentPropValue => tuLog.fromAny(currentPropValue));
            return logs ;

        });

        

        return tuTrousseau;
    }

}