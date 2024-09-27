
export type RequiredRecursively<T> = Exclude<
    T extends string | number | boolean
    ? T
    : {
        [P in keyof T]-?: T[P] extends (infer U)[]
        ? RequiredRecursively<U>[]
        : T[P] extends Array<infer U>
        ? RequiredRecursively<U>[]
        : RequiredRecursively<T[P]>;
    },
    null | undefined
>;

export type AccessorFunction<T, R> = (object: RequiredRecursively<T>) => R;

export function get<T, R>(object: T, accessorFn: AccessorFunction<T, R>): R | undefined;
export function get<T, R>(object: T, accessorFn: AccessorFunction<T, R>, defaultValue: R, executeFn?: boolean): R;
export function get<T, R>(
    object: T,
    accessorFn: AccessorFunction<T, R>,
    defaultValue?: R,
    executeFn: boolean = true,
): R | undefined {
    try {
        const result = executeFn === true ? accessorFn((object as unknown) as RequiredRecursively<T>) : defaultValue;
        return result === undefined || result === null ? defaultValue : result;
    } catch (e) {
        return defaultValue;
    }
}

export default get;