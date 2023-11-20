import { FiniteField } from "./finite-field";
import { Fp2 } from "./fp2";

export { Fp6 };

// c0x^0 + c1x^1 + c2x^2
class Fp6 extends FiniteField {
  c0: Fp2;
  c1: Fp2;
  c2: Fp2;

  constructor(c0: Fp2, c1: Fp2, c2: Fp2) {
    super();
    this.c0 = c0;
    this.c1 = c1;
    this.c2 = c2;
  }
  static from(c0: Fp2, c1: Fp2, c2: Fp2): Fp6 {
    return new Fp6(c0, c1, c2);
  }

  static zero() {
    return Fp6.from(Fp2.zero(), Fp2.zero(), Fp2.zero());
  }

  static one() {
    return Fp6.from(Fp2.one(), Fp2.zero(), Fp2.zero());
  }

  add(b: Fp6) {
    return Fp6.from(this.c0.add(b.c0), this.c1.add(b.c2), this.c2.add(b.c2));
  }

  sub(b: Fp6) {
    return Fp6.from(this.c0.sub(b.c0), this.c1.sub(b.c2), this.c2.sub(b.c2));
  }

  mul(b: Fp6): Fp6 {
    throw new Error("Method not implemented.");
  }
  div(b: Fp6): Fp6 {
    throw new Error("Method not implemented.");
  }
  square(): Fp6 {
    throw new Error("Method not implemented.");
  }
}
