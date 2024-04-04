export type Brand<
  Base,
  Branding,
  ReservedName extends string = "__type__",
> = Base & { [K in ReservedName]: Branding } & { __witness__: Base };
export type AnyBrand = Brand<unknown, any>;
export type BaseOf<B extends AnyBrand> = B["__witness__"];
export type Brander<B extends AnyBrand> = (underlying: BaseOf<B>) => B;
export const identity = <B extends AnyBrand>(underlying: BaseOf<B>): B =>
  underlying as B;
export type AssertionFunction<Input, Output extends Input> = (
  value: Input,
) => asserts value is Output;
export const make = <B extends AnyBrand>(
  validator?: AssertionFunction<BaseOf<B>, B>,
): Brander<B> => {
  if (!validator) {
    return identity;
  }

  return (underlying: BaseOf<B>): B => {
    (validator as Brander<B>)(underlying);
    return underlying as B;
  };
};
