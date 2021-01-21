export enum TrousseauFail
{

    MISPLACED                   = 'MISPLACED',
    INVALIDATED_BY_USER         = 'INVALIDATED_BY_USER',
    INVALIDATED_BY_AUTOCHECK    = 'INVALIDATED_BY_AUTOCHECK'
}

export namespace TrousseauFail
{
    export function getLabel(fail:TrousseauFail): string
    {

        switch(fail)
        {
            case TrousseauFail.MISPLACED:
                return 'Extraviíado';
            
            case TrousseauFail.INVALIDATED_BY_USER:
                return 'Invalidado pelo verificador';
            
            case TrousseauFail.INVALIDATED_BY_AUTOCHECK:
                return 'Número de itens incorretos';
            
            default:
                return '';
        }

    }
}