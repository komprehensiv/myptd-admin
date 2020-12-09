import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';

export function isFalsy(value) {
    if (
        isNil(value) ||
        (isPlainObject(value) && Object.keys(value).length === 0) ||
        (isArray(value) && value.length === 0) ||
        value === '' ||
        value === 0 ||
        value === false
    ) {
        return true;
    }

    return false;
}
