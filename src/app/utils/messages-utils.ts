import { FormGroup } from '@angular/forms';

export class MessagesUtils
{
    
    public static getMessageErrorForm(
        errorMessageDict: { ['type'] : string, ['message'] : string }[], 
        form:FormGroup, 
        fieldName:string,
        onlyTouched:boolean = false): string[]
    {
        const formField = form.get(fieldName);
        const formErrrors = formField.errors;

        if(!formErrrors)
        {
            return [];
        }

        if(onlyTouched && !formField.touched)
        {
            return [];
        }

        const errors = Object.keys( formErrrors );
        return errorMessageDict.filter(entry => errors.includes(entry.type) ).map( entry => entry.message );
    }
}