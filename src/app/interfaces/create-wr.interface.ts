export interface WR{
    details?   : FirstStep,
    pieces?    : Piece[],
    risk?      : SecondStep,
    deviations?: Deviation[],
    actions?   : Action[],
    origin?    : Origin,
    managers?  : Authorization[],
    number?    : string
}

export interface Authorization{
    name: string,
    position: string,
    username: string
}

export interface FirstStep{
    area : string,
    type : string,
    customer : string,
    externalAuthorization ? : ExternalAuth,
    typeNo : number,
    needsManager : boolean,
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
    comment ? : string
}

export interface Piece{
    customer : string, 
    internal : string
}

export interface SecondStep{
    riskAnalysis : string,
    rpnBefore : number,
    rpnAfter: number,
    requiredAction : string,
    originalRisk : string,
    currentRisk : string,
    riskWithActions : string
}

export interface Deviation{
    current : string,
    required : string,
    reason : string
}

export interface Action{
    responsable : string,
    username: string,
    action : string,
    date : Date
}

export interface Origin{
    number : string,
    originator : string,
    date : Date
}