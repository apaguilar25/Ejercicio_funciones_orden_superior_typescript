// resolvemos la comparación de países con un ENUM, lo abrimos como objeto con {} sin ()
enum Country {
    ITALY,
    GERMANY,
    SPAIN,
    ENGLAND    
}

class Team {
    name: string;
    country: Country; //tipado
    ucl: number;
    cryLevel: number;
    lastTitle: number;

    constructor(name: string, country: Country, ucl: number, cryLevel: number, lastTitle: number) {
        this.name = name;
        this.country = country;
        this.ucl = ucl;
        this.cryLevel = cryLevel;
        this.lastTitle = lastTitle
    }
}

const teams : Team[] = [
    {
        name: "Real Madrid",
        country: Country.SPAIN,
        ucl: 15,
        cryLevel: 6,
        lastTitle: 2024
    },
    {
        name: "FC Barcelona",
        country: Country.SPAIN,
        ucl: 5,
        cryLevel: 9999,
        lastTitle: 2015
    },
    {
        name: "Atletico de Madrid",
        country: Country.SPAIN,
        ucl: 0,
        cryLevel: 999999,
        lastTitle: 0
    },
    {
        name: "Bayern Munich",
        country: Country.GERMANY,
        ucl: 6,
        cryLevel: 3,
        lastTitle: 2020
    },
    {
        name: "Borussia Dortmund",
        country: Country.GERMANY, //los scripts son poco confiables y mas inefectivos
        ucl: 1,
        cryLevel: 0,
        lastTitle: 1997
    },
    {
        name: "Liverpool",
        country: Country.ENGLAND,
        ucl: 6,
        cryLevel: 7,
        lastTitle: 2019
    },
    {
        name: "Inter Milan",
        country: Country.ITALY,
        ucl: 3,
        cryLevel: 3,
        lastTitle: 2010
    },
    {
        name: "AC Milan",
        country: Country.ITALY,
        ucl: 7,
        cryLevel: 2,
        lastTitle: 2007
    },
];

                      // variable: tipo
const result = teams
    .filter((team:Team) => team.country === Country.ENGLAND)
    .map((team: Team) => {
        return {
            ... team,
            country: Country[team.country] //me va a dar el string, qué hay en ese índice del ENUM
        }
    });

console.log(result);

async function test(): Promise<number> { //la promesa va a funcionar independientemente de el dato que diga, porque es un tipo abstracto, va a hacer lo que tenga que hacer y luego devolver el valor que se le colocó
    return 0;
}

test()