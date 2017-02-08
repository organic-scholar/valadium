
export function isBlank(val){
    return val === '' || val === null || val === undefined;
}

export function getIn(obj, path){
    for (let i=0, p = path.split('.'), len=path.length; i<len; i++){
        obj = obj[p[i]];
    }
    return obj;
}

export function setIn(obj, path, value) {
    let current = obj;
    let stack = path.split('.');

    while ( stack.length > 1 ) {
        let i = stack.shift();
        if(current[i] == undefined){
            current[i] = {};
        }
        current = current[i];
    }
    current[stack.shift()] = value;

    return obj;
}

export function place(str, o) {
    return str.replace(
        /{([^{}]*)}/g, 
        function (a, b) {
            let r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
}


