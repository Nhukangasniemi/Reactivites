export interface ICar {
    color: string,
    model: string,
    topSpeed?: number,
}

const car1: ICar = {
    color: 'blue',
    model: 'BMW'
}

const car2: ICar = {
    color: 'red',
    model: 'BMW',
    topSpeed: 100
}

const multiply = (x: number, y: number) => {
    (x * y).toString();
}

export const cars = [car1, car2]