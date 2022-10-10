
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const nullOrUndefined = (x: any): boolean => (x === null || x === undefined);


export const capitalize = (s: string): string => {
    if (typeof s !== 'string') { s = '' + s; }
    return s.charAt(0).toUpperCase() + s.slice(1);
};
export const camelCaseToWords = (s: string): string => {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
};
