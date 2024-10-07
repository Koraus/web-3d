// modified 2024-09-15

export const _throw = (m: string | unknown, ctor = Error): never => { throw (("string" === typeof m) ? new ctor(m) : m); };
export const _never = (m?: string) => _throw(m ?? "Unreachable code was reached");
export const _todo = (m?: string) => _throw("TODO: " + (m ?? "Not implemented"));

export function assert(value: unknown, message?: string): asserts value { if (!value) { throw new Error(message ?? "assertion failed"); } }

/** @deprecated seems doing the same intellisense-wise as assert(guard(value)), needs check */
export function assertType<T0, T extends T0>(guard: (x: T0) => x is T, value: T0, message?: string): asserts value is T { assert(guard(value), message ?? `type assertion failed for value ${value}`); }

/** @deprecated needs check if really needs both at the same time and why */
export const isDefined = <T>(value: T): value is NonNullable<T> => value !== null && value !== undefined;

export function assertDefined<T>(value: T, message?: string): asserts value is NonNullable<T> { assertType(isDefined, value, message ?? "assertion for defined value failed"); };

export const validateType = <T0, T extends T0>(guard: (x: T0) => x is T, value: T0, message?: string): T => {
    assertType(guard, value, message);
    return value;
};

export const validateDefined = <T>(value: T, message?: string) => validateType(isDefined, value, message);