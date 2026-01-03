type Dictionary<TKey extends string | number | symbol, TValue> = {
    [key in TKey]: TValue;
}

export interface User {
    id: number;
    name: string;
    age:  number;
    values: Dictionary<string, string>;
    imageUrl: string;
}