export interface FilmEntry {
  title: string;
  director: string;
  year: number;
  durationMin: number;
  country: string;
  format: string;
  tagline: string;
  posterUrl?: string;
  genres?: string[];
}

export interface DoubleFeatureProgram {
  id: string;
  cycleTitle: string;
  themeAxis: string;
  curatorNote: string;
  moodBadge: string;
  filmA: FilmEntry;
  filmB: FilmEntry;
}

export interface TicketTheme {
  id: string;
  name: string;
  paperBg: string;
  inkPrimary: string;
  inkAccent: string;
  borderInk: string;
}

export const TICKET_THEMES: TicketTheme[] = [
  {
    id: 'ivory-crimson',
    name: 'Marfil & Carmesí (Cineteca Bologna)',
    paperBg: '#F6F1E3',
    inkPrimary: '#1C1917',
    inkAccent: '#991B1B',
    borderInk: '#44403C',
  },
  {
    id: 'rose-noir',
    name: 'Rosa Papel & Tinta Negra (París 68)',
    paperBg: '#F5E1DA',
    inkPrimary: '#18181B',
    inkAccent: '#831843',
    borderInk: '#3F3F46',
  },
  {
    id: 'amber-vintage',
    name: 'Ámbar Teatro & Azul Prusia',
    paperBg: '#F3E5AB',
    inkPrimary: '#0F172A',
    inkAccent: '#1E3A8A',
    borderInk: '#334155',
  },
  {
    id: 'midnight-gold',
    name: 'Gala Nocturna (Negro & Oro)',
    paperBg: '#18181B',
    inkPrimary: '#F4F4F5',
    inkAccent: '#F59E0B',
    borderInk: '#52525B',
  },
];

// Base curada de respuestas profundas e instantáneas para clásicos y géneros
export const CURATED_PAIRINGS: Record<string, Omit<DoubleFeatureProgram, 'id' | 'filmA'>> = {
  'il sorpasso': {
    cycleTitle: 'Euforia, Velocidad y el Vacío del Milagro Italiano',
    themeAxis: 'La máscara del vitalismo frente a la melancolía de una generación.',
    moodBadge: 'Commedia all\'italiana · Contrapunto',
    curatorNote:
      'Si te fascinó «Il Sorpasso», tu segunda función obligatoria es «La dolce vita» o «C\'eravamo tanto amati». Mientras Dino Risi filma la huida hacia adelante a 140 km/h por la Vía Aurelia para no pensar en el vacío, Ettore Scola recoge los pedazos de esa misma Italia años después, cuando la fiesta terminó y quedan los amigos frente a sus promesas rotas.',
    filmB: {
      title: "C'eravamo tanto amati",
      director: 'Ettore Scola',
      year: 1974,
      durationMin: 124,
      country: 'Italia',
      format: '35mm B&N / Color',
      tagline: 'Creíamos que íbamos a cambiar el mundo, pero el mundo nos cambió a nosotros.',
    },
  },
  'the game': {
    cycleTitle: 'Paranoia Arquitectónica y Pérdida del Control',
    themeAxis: 'Hombres poderosos atrapados en una puesta en escena diseñada para quebrarlos.',
    moodBadge: 'Neo-Noir & Suspenso Paranoico',
    curatorNote:
      'A quien disfruta «The Game» de Fincher no le alcanza otro thriller convencional: necesita «Seconds» (1966) de John Frankenheimer o «The Conversation» (1974) de Coppola. Ambas comparten esa atmósfera nocturna, paranoica y claustrofóbica donde un hombre metódico descubre que cada detalle de su vida cotidiana está siendo manipulado por una organización invisible.',
    filmB: {
      title: 'The Conversation',
      director: 'Francis Ford Coppola',
      year: 1974,
      durationMin: 113,
      country: 'EE.UU.',
      format: '35mm Technicolor',
      tagline: 'El mejor especialista en vigilancia de San Francisco descubre que él es el vigilado.',
    },
  },
  'barry lyndon': {
    cycleTitle: 'El Hombre como Pintura ante la Indiferencia del Destino',
    themeAxis: 'El ascenso social, el azar implacable y la decadencia filmada como un cuadro.',
    moodBadge: 'Drama Histórico · Puesta en Escena',
    curatorNote:
      'Después de la hipnosis visual de «Barry Lyndon», la pareja perfecta es «Il Gattopardo» (El Gatopardo) de Luchino Visconti. Si Kubrick retrata al oportunista que intenta infiltrarse en la aristocracia a punta de duelos y azar, Visconti filma desde adentro el crepúsculo de esa misma nobleza con una solemnidad visual irrepetible.',
    filmB: {
      title: 'Il Gattopardo',
      director: 'Luchino Visconti',
      year: 1963,
      durationMin: 186,
      country: 'Italia',
      format: '35mm Technirama',
      tagline: 'Para que todo siga igual, es necesario que todo cambie.',
    },
  },
  'el conformista': {
    cycleTitle: 'Geometría del Poder y Traición Moral',
    themeAxis: 'La cobardía íntima disfrazada de orden bajo luces y sombras expresionistas.',
    moodBadge: 'Autoral Europeo · Fotografía',
    curatorNote:
      'La luz de Vittorio Storaro y la estructura fragmentada de «Il Conformista» encuentran su espejo ideal en «Mephisto» (1981) de István Szabó. Ambas diseccionan el alma de un intelectual que pacta con el totalitarismo no por fanatismo ideológico, sino por el deseo patológico de encajar, ser aplaudido y pertenecer.',
    filmB: {
      title: 'Mephisto',
      director: 'István Szabó',
      year: 1981,
      durationMin: 144,
      country: 'Hungría / Alemania',
      format: '35mm',
      tagline: '¿Qué precio tiene el alma cuando el escenario exige aplaudir al poder?',
    },
  },
};
