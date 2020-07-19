import TypeUtils from '../utils/type-utils';

export default interface  TypeUtilsFactory<T>
{

    build():TypeUtils<T>

}