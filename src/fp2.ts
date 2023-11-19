import { Field } from "./bls12-381-field";

export { Fp2 };

// c0x^0 + c1x^1
class Fp2 {
  c0: Field;
  c1: Field;

  constructor(c0: Field, c1: Field) {
    this.c0 = c0;
    this.c1 = c1;
  }
  static from(x: bigint, y: bigint): Fp2 {
    return new Fp2(new Field(x), new Field(y));
  }

  static zero() {
    return new Fp2(new Field(0n), new Field(0n));
  }

  static one() {
    return new Fp2(new Field(1n), new Field(1n));
  }

  square() {
    let a = this.c0.add(this.c1);
    let b = this.c0.sub(this.c1);
    let c = this.c0.add(this.c0);

    return new Fp2(a.mul(b), c.mul(this.c1));
  }

  mul(b: Fp2) {
    // a * b = (a_0 b_0 + a_1 b_1 β) + (a_0 b_1 + a_1 b_0)i
    // β in BLS12-381 F_{p^2} is -1
    // c_0 = a_0 b_0 - a_1 b_1
    // c_1 = a_0 b_1 + a_1 b_0
    let c0 = this.c0.mul(b.c0).sub(this.c1.mul(b.c1));
    let c1 = this.c0.mul(b.c1).add(this.c1.mul(b.c0));
    return new Fp2(c0, c1);
  }

  add(b: Fp2) {
    return new Fp2(this.c0.add(b.c0), this.c1.add(b.c1));
  }

  sub(b: Fp2) {
    return new Fp2(this.c0.sub(b.c0), this.c1.sub(b.c1));
  }
}
