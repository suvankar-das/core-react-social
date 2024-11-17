export interface IDuck {
    name: string;
    numLegs: number;
    makeSound: (sound: string) => string;
}


const Duck1: IDuck = {
    name: "Gui",
    numLegs: 2,
    makeSound: (sound: string): string => {
        return `${name} makes ${sound}`;
    }
}



const Duck2: IDuck = {
    name: "Stui",
    numLegs: 2,
    makeSound: (sound: string): string => {
        return `${name} makes ${sound}`;
    }
}


export const ducks = [Duck1, Duck2];
