import { Fp12, Fp2, Fp6 } from ".";
import { FiniteField } from "./finite-field";

class EllipticCurve<F extends FiniteField> {
  x: F;
  y: F;

  constructor(x: F, y: F) {
    this.x = x;
    this.y = y;
  }

  add(b: EllipticCurve<F>) {
    let { x: xp, y: yp } = this;

    let { x: xq, y: yq } = b;

    // TODO zero case
    // TODO equal

    // https://en.wikipedia.org/wiki/Elliptic_curve_point_multiplication
    let m = yq.sub(yp).div(xq.sub(xp));
    let xr = m.square().sub(xp).sub(xq);
    let yr = m.mul(xp.sub(xr)).sub(yp);

    return new EllipticCurve(xr, yr);
  }
}

class G2 extends EllipticCurve<Fp2> {}
class G6 extends EllipticCurve<Fp6> {}
class G12 extends EllipticCurve<Fp12> {}
