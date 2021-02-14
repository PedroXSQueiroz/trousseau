import User from "src/app/models/user";
import TrousseauLog from "../../models/trousseau-log";
import TypeUtils from "../../utils/type-utils";
import TypeUtilsFactory from "../type-utils-factory";

export default class TrousseauLogUtilsFactory implements TypeUtilsFactory<TrousseauLog>  
{
    
    build(): TypeUtils<TrousseauLog> {
        
        let tuLogs:TypeUtils<TrousseauLog> = new TypeUtils<TrousseauLog>(TrousseauLog);
        let tuUSer:TypeUtils<User> = new TypeUtils<User>(User); 

        tuLogs.remapProperty('registerDate', '_registerDate');

        tuLogs.registerCustomSettingField('registerDate', (propValue) => {
            
            return new Date(propValue);
        
        });

        tuLogs.remapProperty('user', '_user' );

        tuLogs.registerCustomSettingField('user', (propValue) => {

            return tuUSer.fromAny(propValue);

        });
        
        return tuLogs;
    }

}