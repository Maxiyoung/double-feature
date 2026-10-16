export type CuratorialLens =
  | 'THEMATIC_MIRROR'
  | 'CROSS_ERA'
  | 'HIDDEN_CULT'
  | 'VISUAL_CONTRAST';

export interface LensOption {
  id: CuratorialLens;
  label: string;
  promptHint: string;
}

export const CURATORIAL_LENSES: LensOption[] = [
  {
    id: 'THEMATIC_MIRROR',
    label: 'Espejo Temático & Filosófico',
    promptHint:
      'Buscá una película que comparta el mismo dilema moral, existencial o psicológico profundo aunque transcurra en otro contexto.',
  },
  {
    id: 'CROSS_ERA',
    label: 'Diálogo entre Décadas / Países',
    promptHint:
      'Elegí obligatoriamente una película de otro país y de al menos 15 años de diferencia que converse con la primera.',
  },
  {
    id: 'HIDDEN_CULT',
    label: 'Joya Oculta de Filmoteca',
    promptHint:
      'Evitá títulos famosos del canon mainstream; elegí una joya de culto o cine de autor menos obvia que sorprenda a un cinéfilo.',
  },
  {
    id: 'VISUAL_CONTRAST',
    label: 'Fotografía & Puesta en Escena',
    promptHint:
      'Conectá ambas películas por su dirección de fotografía, uso de la luz, encuadres, ritmo de montaje o arquitectura espacial.',
  },
];

export interface FilmEntry {
  title: string;
  director: string;
  year: number;
  durationMin: number;
  country: string;
  format: string;
  tagline: string;
  posterUrl?: string;
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

export const CURATED_PROGRAMS: DoubleFeatureProgram[] = [
  {
    id: 'preset-sorpasso',
    cycleTitle: 'Euforia, Velocidad y el Vacío del Milagro Italiano',
    themeAxis: 'La máscara del vitalismo frente a la melancolía de una generación.',
    moodBadge: "Commedia all'italiana · 35mm",
    curatorNote:
      'Mientras Dino Risi filma en «Il Sorpasso» la huida hacia adelante a 140 km/h por la Vía Aurelia para no pensar en el vacío, Ettore Scola recoge en «C\'eravamo tanto amati» los pedazos de esa misma Italia años después, cuando la fiesta terminó y quedan los amigos frente a sus promesas rotas.',
    filmA: {
      title: 'Il Sorpasso',
      director: 'Dino Risi',
      year: 1962,
      durationMin: 105,
      country: 'Italia',
      format: '35mm B&N',
      tagline: 'Un Lancia Aurelia, un feriado de agosto en Roma y dos opuestos en la ruta.',
    },
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
  {
    id: 'preset-game',
    cycleTitle: 'Paranoia Arquitectónica y Pérdida del Control',
    themeAxis: 'Hombres poderosos atrapados en una puesta en escena diseñada para quebrarlos.',
    moodBadge: 'Neo-Noir & Suspenso Paranoico',
    curatorNote:
      'A quien disfruta «The Game» de Fincher no le alcanza otro thriller convencional: necesita «The Conversation» (1974) de Coppola. Ambas comparten esa atmósfera nocturna y claustrofóbica donde un hombre metódico descubre que cada detalle de su vida está siendo manipulado por una red invisible.',
    filmA: {
      title: 'The Game',
      director: 'David Fincher',
      year: 1997,
      durationMin: 129,
      country: 'EE.UU.',
      format: '35mm Anamórfico',
      tagline: '¿Qué le regalás al hombre que lo tiene todo? Una grieta en su realidad.',
    },
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
  {
    id: 'preset-barry',
    cycleTitle: 'El Hombre como Pintura ante la Indiferencia del Destino',
    themeAxis: 'El ascenso social, el azar implacable y la decadencia filmada como un óleo.',
    moodBadge: 'Drama Histórico · Puesta en Escena',
    curatorNote:
      'Después de la hipnosis visual de «Barry Lyndon», la pareja perfecta es «Il Gattopardo» de Luchino Visconti. Si Kubrick retrata al oportunista que intenta infiltrarse en la aristocracia a punta de duelos y azar, Visconti filma desde adentro el crepúsculo de esa misma nobleza.',
    filmA: {
      title: 'Barry Lyndon',
      director: 'Stanley Kubrick',
      year: 1975,
      durationMin: 185,
      country: 'Reino Unido',
      format: '35mm (1.66:1)',
      tagline: 'Buenos o malos, hermosos o feos, ricos o pobres, todos son iguales ahora.',
    },
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
  {
    id: 'preset-conformista',
    cycleTitle: 'Geometría del Poder y Traición Moral',
    themeAxis: 'La cobardía íntima disfrazada de orden bajo luces y sombras expresionistas.',
    moodBadge: 'Autoral Europeo · Fotografía',
    curatorNote:
      'La luz de Vittorio Storaro en «Il Conformista» encuentra su espejo ideal en «Mephisto» (1981) de István Szabó. Ambas diseccionan el alma de un hombre que pacta con el totalitarismo no por fanatismo, sino por el deseo patológico de encajar y ser aplaudido.',
    filmA: {
      title: 'Il Conformista',
      director: 'Bernardo Bertolucci',
      year: 1970,
      durationMin: 113,
      country: 'Italia / Francia',
      format: '35mm Technicolor',
      tagline: 'El deseo desesperado de ser normal en medio del derrumbe moral europeo.',
    },
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
];
