import mapValues = require('lodash/mapValues');
import get = require('lodash/get');


import {
    Entity,
    IsError,
    Validator,
    Target,
    Group,
    FieldErrorMessage,
    ErrorMessage, GroupErrorMessage,
} from '../types/validator';

export function bindIsError(isError: IsError) {
    return function bindErrorMessage(error: string): Validator {
        return function validate(target?: Target, entity?: Entity): FieldErrorMessage {
            return (isError(target, entity) ? error : null);
        };
    };
}

export const b = bindIsError;

export function any(validators: Validator[]): Validator {
    return (target?: Target, entity?: Entity): ErrorMessage => {
        for (const validate of validators) {
            const error = validate(target, entity);
            if (error === null) {
                continue;
            }
            return error;
        }
        return null;
    };
}

export const a = any;

export function group(validators: Group<Validator>): Validator {
    return (target?: Target): GroupErrorMessage => {
        return mapValues(validators, (validate: Validator, field) => {
            return validate(get(target, field), target);
        });
    };
}

const createValidator = group;

export default createValidator;
