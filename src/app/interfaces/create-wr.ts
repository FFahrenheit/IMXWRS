export interface WR{
    details ? : FirstStep,
}

export interface FirstStep{
    area : string,
    type : string,
    customer : string,
    externalAuthorization ? : ExternalAuth,
    typeNo : number,
    needManager : boolean,
    appliesTo : string,
    quantity ? : number,
    specification ? : string,
    startDate? : Date,
    endDate? : Date
}

export interface ExternalAuth{
    title : string,
    name : string,
    date : Date,
    comments ? : string
}