export type Entity = object;

export type Target = object;

export type FieldErrorMessage = string | null;

export type GroupErrorMessage = object | null;

export type ErrorMessage = FieldErrorMessage | GroupErrorMessage;

export interface IsError {
    (target?: Target, entity?: Entity): boolean;
}

export interface Validator {
    (target?: Target, entity?: Entity): object | string | null;
}

export type Group<T> = {
    [key: string]: Validator;
};
