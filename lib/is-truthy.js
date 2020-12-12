import { isFalsy } from './is-falsy';

export function isTruthy(value) {
    return !isFalsy(value);
}
