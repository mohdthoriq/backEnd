abstract class Shape {
    abstract calculateArea(): number;
    abstract calculatePerimeter(): number;

    deskripsi() {
        return `Luas: ${this.calculateArea()}, Keliling: ${this.calculatePerimeter()}`
    }
}

export class Persegi extends Shape {
    constructor(private sisi: number) {
        super();
    }
    calculateArea(): number {
        return this.sisi * this.sisi;
    }
    calculatePerimeter(): number {
        return this.sisi * 4;
    }
}

export class Lingkaran extends Shape {
    constructor(private radius: number) {
        super();
    }
    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

}

const persegi = new Persegi(5)
console.log(persegi.deskripsi());
console.log(persegi.calculateArea());
console.log(persegi.calculatePerimeter());

const lingkaran = new Lingkaran(5)
console.log(lingkaran.deskripsi());
console.log(lingkaran.calculateArea());
console.log(lingkaran.calculatePerimeter());