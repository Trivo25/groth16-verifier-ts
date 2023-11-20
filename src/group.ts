import { FiniteField } from "./finite-field";

import { Fp2 } from "./fp2";
import { Fp6 } from "./fp6";
import { Fp12 } from "./fp12";

export { G2, G6, G12 };

class Group<F extends FiniteField> {
  x: F;
  y: F;

  constructor(x: F, y: F) {
    this.x = x;
    this.y = y;
  }

  add(b: Group<F>) {
    let { x: xp, y: yp } = this;

    let { x: xq, y: yq } = b;

    // TODO zero case
    // TODO equal

    // https://en.wikipedia.org/wiki/Elliptic_curve_point_multiplication
    let m = yq.sub(yp).div(xq.sub(xp));
    let xr = m.square().sub(xp).sub(xq);
    let yr = m.mul(xp.sub(xr)).sub(yp);

    return new Group(xr, yr);
  }
}

class G2 extends Group<Fp2> {}
class G6 extends Group<Fp6> {}
class G12 extends Group<Fp12> {}
