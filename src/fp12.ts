import { FiniteField } from "./finite-field";
import { Fp6 } from "./fp6";

export { Fp12 };

// (c0x^0 + c1x^1 ) + (c2x^2 + c3^x^3) + ... (c10x^10 + c11x^11)
class Fp12 extends FiniteField {
  c0: Fp6;
  c1: Fp6;

  constructor(c0: Fp6, c1: Fp6) {
    super();
    this.c0 = c0;
    this.c1 = c1;
  }
  static from(c0: Fp6, c1: Fp6): Fp12 {
    return new Fp12(c0, c1);
  }

  static zero() {
    return Fp12.from(Fp6.zero(), Fp6.zero());
  }

  static one() {
    return Fp12.from(Fp6.one(), Fp6.zero());
  }

  add(b: Fp12) {
    return Fp12.from(this.c0.add(b.c0), this.c1.add(b.c1));
  }

  sub(b: Fp12) {
    return Fp12.from(this.c0.sub(b.c0), this.c1.sub(b.c1));
  }

  mul(b: FiniteField): FiniteField {
    throw new Error("Method not implemented.");
  }
  div(b: FiniteField): FiniteField {
    throw new Error("Method not implemented.");
  }
  square(): FiniteField {
    throw new Error("Method not implemented.");
  }
}
