export { FiniteField };

abstract class FiniteField {
  abstract sub(b: FiniteField): FiniteField;
  abstract mul(b: FiniteField): FiniteField;
  abstract div(b: FiniteField): FiniteField;
  abstract square(): FiniteField;
}
