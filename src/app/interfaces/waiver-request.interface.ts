export interface WaiverBody{
    waiverRequest: WaiverRequest,
    parts? : WPart[],
    actions? : WAction[],
    deviations? :  Waiver[],
    externalAuth? : WExternalAuth,
    expiration?: Expiration,
    managers?: Manager[]
}

export interface Manager{
    manager: string,
    position: string,
}

export interface WaiverRequest{
        number : string,
        type : string,
        typeNumber : number,
        customer : string,
        requiredCorrectiveAction : string,
        riskAnalysis : string , 
        rpnBefore : number,
        rpnAfter : number,
        originalRisk : string,
        currentRisk : string,
        riskWithActions : string,
        requiresManager : boolean
        status : string,
        area : string,
        originator : string,
}

export interface WPart{
    customerPN : string,
    interplexPN: string
}

export interface Waiver{
    currentSpecification : string,
    requiredSpecification : string,
    reason : string
}

export interface WAction{
    description: string,
    date: Date,
    responsable: string,
}

export interface WExternalAuth{
    title : string,
    name : string,
    dateSigned : Date,
    comment ? : string
}

export interface Expiration{
    quantity?: number,
    specification?: string,
    startDate?: Date,
    endDate?: Date,
}