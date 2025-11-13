
function isAlphaNum(ch) {
    const code = ch.charCodeAt(0);
    return (code >= 48 && code <= 57)  || // 0-9
           (code >= 65 && code <= 90)  || // A-Z
           (code >= 97 && code <= 122);   // a-z
}

function isDigit(ch) {
    const c = ch.charCodeAt(0);
    return c >= 48 && c <= 57; // '0'..'9'
}
export  function isValidEmailControl(email) {
    if (typeof email !== 'string') return false;
    if (email.length === 0) return false;

    let atCount = 0;
    let atIndex = -1;
    for (let i = 0; i < email.length; i++) {
        if (email[i] === '@') { atCount++; atIndex = i; }
    }
    if (atCount !== 1) return false;

    const local = email.slice(0, atIndex);
    const domain = email.slice(atIndex + 1);
    if (local.length === 0 || domain.length === 0) return false;

    if (domain[0] === '.' || domain[domain.length - 1] === '.') return false;
    let dotFound = false;
    for (let i = 0; i < domain.length; i++) {
        const ch = domain[i];
        if (ch === '.') dotFound = true;
        if (ch === '.' || ch === '-') continue;
        if (!isAlphaNum(ch)) return false;
    }
    if (!dotFound) return false;
    const allowedLocalChars = {'!':1, '#':1, '$':1, '%':1, '&':1, "'":1, '*':1,
                            '+':1, '-':1, '/':1, '=':1, '?':1, '^':1,
                            '_':1, '`':1, '{':1, '|':1, '}':1, '~':1, '.':1};
    if (local[0] === '.' || local[local.length - 1] === '.') return false; 
    for (let i = 0; i < local.length; i++) {
        const ch = local[i];
        if (isAlphaNum(ch)) continue;
        if (allowedLocalChars[ch]) {
        if (ch === '.' && i > 0 && local[i-1] === '.') return false;
        continue;
    }
    return false;
    }
return true;
}

export function isNumeric(str)
{
    if(typeof str !== 'string')
        return false;
    if(str.length === 0)
        return false;

    for( let i = 0; i < str.length; i++){
        const c = str[i];
        if(!isDigit(c))
            return true;
    }
    return false;
}
export  function isValidSouthAfricaNumber(str) {
        if (typeof str !== 'string')
            return false;
        if (str.length === 0) 
            return false;

    let digits = '';
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (isDigit(ch)) {
            digits += ch;
            continue;
        }

        if (ch === '+' && i === 0) 
            continue;
        if (ch === ' ' || ch === '-' || ch === '(' || ch === ')') 
            continue;
        return false;
        
    }

        
    if (digits.length === 10 && digits[0] === '0') 
        return true;
    if (digits.length === 11 && digits[0] === '2' && digits[1] === '7') 
        return true;
    return false;
}


export function isAlphaOnly(str) {
    if (typeof str !== 'string') 
        return false;
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (code >= 65 && code <= 90) 
            continue;
        if (code >= 97 && code <= 122)
            continue;
        return false;
    }
    return true;
}
