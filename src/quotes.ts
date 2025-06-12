export interface Quote {
    origin: string,
    text: string,
    url: string
}

export const QUOTES: Quote[] = [
    { origin: 'Luna say Maybe, Tsukimura Temari',
      text: `This is in fact, the real me! I'm ọkay,
       I'm not afraid anymore. I struggle from time to time,
       but I want to sẹe your smile from the best seating. This is my own privilege.`,
      url: 'https://www.youtube.com/watch?v=Sq5Dj0U06vQ' },
    { origin: 'Sing a Wing Song, Tanaka Kotoha', 
      text: `There are days when you can't do it perfectly (it's alright!)
       But there's nothing wrong with trying.`,
      url: 'https://www.youtube.com/watch?v=BdDOw5bJI6A' },
    { origin: 'S(mile)ing, Shimamura Uzuki',
      text: `Rise! I won't give up anymore.
       I promise myself of yesterday who
       was in bed down in the dumps.`,
      url: 'https://www.youtube.com/watch?v=aQr0szotP_Y' }
]