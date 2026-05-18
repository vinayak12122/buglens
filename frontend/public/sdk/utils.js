export const generateUUID = ()=>{
    return crypto.randomUUID();
};

export const safeStringify = (obj) =>{
    try{
        return JSON.parse(JSON.stringify(obj));
    }catch{
        return {};
    }
};

export const getBrowserInfo = () =>{
    return navigator.userAgent;
}

export const nowISO = () =>{
    return new Date().toISOString();
}