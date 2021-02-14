import User from './user';

export default class Log
{
    private _user:User;

    get user():User
    {
        return this._user;
    }

    set user(user:User)
    {
        this._user = user;
    }

    private _registerDate:Date;

    get registerDate():Date
    {
        return this._registerDate;
    }

    set registerDate(date: Date)
    {
        this._registerDate = date;
    }
}