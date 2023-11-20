import { randomBytes } from "crypto";

export { Fp };

function mod(a: bigint, p: bigint) {
  let x = a % p;
  if (x < 0) return a + p;
  return x;
}

function div(a: bigint, b: bigint, p: bigint) {
  let ainv = inverse(a, p);
  if (ainv === undefined) return; // we assume p is prime, therefor every element should be invertible gcd(a, p) = 1
  return mod(b * ainv, p);
}

function add(a: bigint, b: bigint, p: bigint) {
  return mod(a + b, p);
}

function sub(a: bigint, b: bigint, p: bigint) {
  return mod(a - b, p);
}

function mul(a: bigint, b: bigint, p: bigint) {
  return mod(a * b, p);
}

// a^n mod p
function pow(a: bigint, n: bigint, p: bigint) {
  a = mod(a, p);
  let x = 1n;
  for (; n > 0n; n >>= 1n) {
    if (n & 1n) x = mod(x * a, p);
    a = mod(a * a, p);
  }
  return x;
}

// inv(a) in Fp with EGCD
function inverse(a: bigint, p: bigint) {
  a = mod(a, p);
  if (a === 0n) return undefined;
  let b = p;
  let x = 0n;
  let y = 1n;
  let u = 1n;
  let v = 0n;
  while (a !== 0n) {
    let q = b / a;
    let r = mod(b, a);
    let m = x - u * q;
    let n = y - v * q;
    b = a;
    a = r;
    x = u;
    y = v;
    u = m;
    v = n;
  }
  if (b !== 1n) return undefined;
  return mod(x, p);
}

function random(p: bigint) {
  let size = Math.floor(p.toString(2).length / 8);
  while (true) {
    let x = BigInt("0x" + randomBytes(size).toString("hex"));
    if (x < p) return x;
  }
}

function isSquare(x: bigint, p: bigint) {
  if (x === 0n) return true;
  return pow(x, (p - 1n) / 2n, p) === 1n;
}

/*
Tonelli-Shanks algorithm.
Input: 
  p, a prime 
  n, the n in r^2 = n
Output:
  r, the r in r^2 = n
*/
function sqrt(n: bigint, p: bigint) {}

class Fp {
  value: bigint;

  static p: bigint =
    0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn;

  constructor(x: bigint | Fp) {
    this.value = mod(Fp.isFp(x) ? x.value : x, Fp.p);
  }

  static get modulus() {
    return this.p;
  }

  toBigint() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }

  static zero() {
    return new Fp(0n);
  }

  static one() {
    return new Fp(1n);
  }

  static random() {
    return new Fp(random(Fp.p));
  }

  add(x: Fp | bigint): Fp {
    return new Fp(add(this.value, Fp.isFp(x) ? x.value : x, Fp.p));
  }

  sub(x: Fp | bigint): Fp {
    return new Fp(sub(this.value, Fp.isFp(x) ? x.value : x, Fp.p));
  }

  mul(x: Fp | bigint): Fp {
    return new Fp(mul(this.value, Fp.isFp(x) ? x.value : x, Fp.p));
  }

  square(): Fp {
    return new Fp(pow(this.value, 2n, Fp.p));
  }

  pow(x: Fp | bigint): Fp {
    return new Fp(pow(this.value, Fp.isFp(x) ? x.value : x, Fp.p));
  }

  div(x: Fp | bigint) {
    return this.mul(Fp.from(x).inverse());
  }

  inverse() {
    let x = inverse(this.value, Fp.p)!;
    if (x === undefined) throw Error("Inverse does not exist");
    return new Fp(x);
  }

  equals(a: Fp | bigint) {
    return Fp.isFp(a) ? a.value === this.value : a === this.value;
  }

  lessThan(a: Fp | bigint) {
    return Fp.isFp(a) ? a.value > this.value : a > this.value;
  }

  lessThanOrEqual(a: Fp | bigint) {
    return Fp.isFp(a) ? a.value >= this.value : a >= this.value;
  }

  greaterThan(a: Fp | bigint) {
    return !this.lessThan(a);
  }

  greaterThanOrEqual(a: Fp | bigint) {
    return !this.lessThanOrEqual(a);
  }

  inRange() {
    return this.value <= Fp.p;
  }

  static from(x: bigint | Fp) {
    return new Fp(x);
  }

  static isFp(x: Fp | bigint): x is Fp {
    return typeof x !== "bigint";
  }
}
