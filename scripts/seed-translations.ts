/**
 * Traductions EN (anglais britannique) + PT (portugais européen) du contenu
 * éditorial de Précieuse, consommées par `scripts/seed-sanity.ts`.
 *
 * ⚠️ Première passe de traduction (machine, relue manuellement) — À FAIRE RELIRE
 * par un locuteur natif EN (orthographe britannique) et PT-PT avant mise en prod.
 * Glossaire appliqué : or 18 carats → 18-carat gold / ouro de 18 quilates ·
 * diamant → diamond / diamante · sertissage → stone-setting / cravação · fonte à
 * cire perdue → lost-wax casting / fundição por cera perdida · polissage →
 * polishing / polimento · joaillerie → jewellery / joalharia · sur-mesure →
 * bespoke / por medida · Sur devis → On quotation / Sob orçamento · traité de
 * Kimberley → Kimberley Process / Processo de Kimberley.
 *
 * Le FR reste la source dans `src/lib/content/*` ; ce fichier ne porte que EN/PT.
 * Chaque entrée renseigne TOUS les champs lus par le seed (il accède à
 * `tr?.champ.en` sans garder le champ interne) → pas d'entrée partielle.
 */

/** Paire de traduction : anglais britannique + portugais européen. */
type T = { en: string; pt: string }

// ---------------------------------------------------------------------------
// Pièces (collection) — clé : slug produit
// ---------------------------------------------------------------------------
export const PIECE_TRANSLATIONS: Record<
  string,
  {
    tagline: T
    priceLabel: T
    description: T
    materials: T
    story: T
    imageAlt: T
  }
> = {
  josephine: {
    tagline: {
      en: 'The timeless halo ring',
      pt: 'O anel de halo intemporal',
    },
    priceLabel: { en: 'On quotation', pt: 'Sob orçamento' },
    description: {
      en: "It is handed down, admired since childhood on the hands of our grandmothers. Joséphine embodies the delicacy of a halo of pavé diamonds around a central stone. Every detail is worked to make it as comfortable as it is beautiful to the eye.",
      pt: 'Herda-se, admira-se desde a infância nas mãos das nossas avós. Joséphine encarna a delicadeza do halo de diamantes em pavé à volta de uma pedra central. Cada detalhe é trabalhado para a tornar tão confortável quanto bela ao olhar.',
    },
    materials: {
      en: '18-carat gold (yellow, white or rose) · GIA/HRD-certified pavé diamonds · Central stone of your choice',
      pt: 'Ouro de 18 quilates (amarelo, branco ou rosa) · Diamantes em pavé certificados GIA/HRD · Pedra central à escolha',
    },
    story: {
      en: 'Inspired by family heirloom rings, Joséphine embodies the bond between generations. Its pared-back yet generous design makes the quality of the savoir-faire felt: every pavé setting is positioned to maximise the light.',
      pt: 'Inspirada nos anéis de transmissão familiar, Joséphine encarna o elo entre gerações. O seu desenho depurado mas generoso em matéria faz sentir a qualidade do savoir-faire: cada pavé é posicionado para maximizar a luz.',
    },
    imageAlt: {
      en: 'Joséphine ring in 18-carat gold, central stone framed by a halo of diamonds — Précieuse atelier, Bordeaux',
      pt: 'Anel Joséphine em ouro de 18 quilates, pedra central rodeada por um halo de diamantes — atelier Précieuse, Bordeaux',
    },
  },
  aurore: {
    tagline: {
      en: 'The promise of a new day',
      pt: 'A promessa de um novo dia',
    },
    priceLabel: { en: 'On quotation', pt: 'Sob orçamento' },
    description: {
      en: 'Aurore evokes the dawning light: a delicate solitaire where the stone seems suspended, set on a band as fine as a line. Designed to be worn alone or stacked, it accompanies every gesture of the everyday.',
      pt: 'Aurore evoca a luz nascente: um solitário delicado onde a pedra parece suspensa, pousada sobre um aro fino como um traço. Pensado para se usar sozinho ou em sobreposição, acompanha todos os gestos do quotidiano.',
    },
    materials: {
      en: '18-carat gold · GIA/HRD-certified central diamond · 1.8 mm band',
      pt: 'Ouro de 18 quilates · Diamante central certificado GIA/HRD · Aro de 1,8 mm',
    },
    story: {
      en: 'The first design drawn after a sleepless night, thinking of all those who want a ring that is never forgotten, yet never draws attention.',
      pt: 'O primeiro modelo desenhado após uma noite em branco, a pensar em todas as que querem um anel que nunca se esquece, sem nunca se fazer notar.',
    },
    imageAlt: {
      en: 'Aurore ring in 18-carat gold, solitaire set on a stone — Précieuse atelier, Bordeaux',
      pt: 'Anel Aurore em ouro de 18 quilates, solitário pousado sobre pedra — atelier Précieuse, Bordeaux',
    },
  },
  eugenie: {
    tagline: { en: 'The poetic signature', pt: 'A assinatura poética' },
    priceLabel: { en: 'On quotation', pt: 'Sob orçamento' },
    description: {
      en: 'Eugénie is a trilogy: three stones for three times — yesterday, today, tomorrow. The setting is worked in fine claws to release the light, and the band flares gently towards the central stone.',
      pt: 'Eugénie é uma trilogia: três pedras para três tempos — ontem, hoje, amanhã. A cravação é trabalhada em garras finas para libertar a luz, e o aro alarga ligeiramente em direção à pedra central.',
    },
    materials: {
      en: '18-carat gold · Three graduated GIA/HRD-certified diamonds · Sapphire, ruby or emerald centre possible',
      pt: 'Ouro de 18 quilates · Três diamantes graduados certificados GIA/HRD · Possibilidade de safira, rubi ou esmeralda ao centro',
    },
    story: {
      en: 'Designed to celebrate a milestone: a birthday, a decade, a turning point. Each stone tells a moment, and together they tell a story.',
      pt: 'Pensada para celebrar uma etapa: um aniversário, uma década, um marco. Cada pedra conta um momento, e o conjunto faz história.',
    },
    imageAlt: {
      en: 'Eugénie ring in 18-carat gold set with diamonds — Précieuse atelier, Bordeaux',
      pt: 'Anel Eugénie em ouro de 18 quilates cravejado de diamantes — atelier Précieuse, Bordeaux',
    },
  },
  thelma: {
    tagline: { en: 'Quiet boldness', pt: 'A audácia tranquila' },
    priceLabel: { en: 'On quotation', pt: 'Sob orçamento' },
    description: {
      en: "Thelma plays with volumes: a generous stone, a sculptural setting, a balance held between strength and grace. It is the ring for those who do not ask permission.",
      pt: 'Thelma brinca com os volumes: uma pedra generosa, uma cravação escultural, um equilíbrio mantido entre força e graça. É o anel das que não pedem licença.',
    },
    materials: {
      en: '18-carat gold · Central stone 1 ct minimum (diamond or colour) · Optional pavé',
      pt: 'Ouro de 18 quilates · Pedra central de 1 ct mínimo (diamante ou cor) · Pavé opcional',
    },
    story: {
      en: 'Born from a commission for a woman who wanted "a ring you notice without it shouting". The result: an ample piece, yet worn day to day without snagging.',
      pt: 'Nascida de uma encomenda para uma mulher que queria «um anel que se nota sem que grite». O resultado: uma peça ampla, mas usada no dia a dia sem prender.',
    },
    imageAlt: {
      en: 'Thelma ring in 18-carat gold, generous central stone on a sculptural setting — Précieuse atelier, Bordeaux',
      pt: 'Anel Thelma em ouro de 18 quilates, pedra central generosa em cravação escultural — atelier Précieuse, Bordeaux',
    },
  },
  louise: {
    tagline: { en: 'The eternal wedding band', pt: 'A eterna aliança' },
    priceLabel: { en: 'On quotation', pt: 'Sob orçamento' },
    description: {
      en: 'Louise is a wedding band, but not just any: a half-eternity of pavé diamonds, a millimetre-perfect comfort, a hand finish that reads in the light. To be worn alone or paired with another piece from the collection.',
      pt: 'Louise é uma aliança, mas não uma qualquer: meia-volta de diamantes em pavé, um conforto milimétrico, um acabamento à mão que se lê na luz. Para usar sozinha ou a par com outra peça da coleção.',
    },
    materials: {
      en: '18-carat gold · Half-eternity pavé of GIA/HRD-certified diamonds · 2 or 3 mm width of your choice',
      pt: 'Ouro de 18 quilates · Pavé de meia-volta de diamantes certificados GIA/HRD · Largura de 2 ou 3 mm à escolha',
    },
    story: {
      en: 'The most discreet model in the collection, and yet the one that comes back most often in commissions: proof that the self-evident never goes out of fashion.',
      pt: 'O modelo mais discreto da coleção e, ainda assim, o que regressa mais vezes nas encomendas: a prova de que a evidência nunca sai de moda.',
    },
    imageAlt: {
      en: 'Louise ring in 18-carat gold, worn — Précieuse atelier, Bordeaux',
      pt: 'Anel Louise em ouro de 18 quilates, usado — atelier Précieuse, Bordeaux',
    },
  },
}

// ---------------------------------------------------------------------------
// Matières — clé : slug matière
// ---------------------------------------------------------------------------
export const MATIERE_TRANSLATIONS: Record<
  string,
  {
    sousTitre: T
    description: T
    imageAlt: T
    annotationCaveat: T
  }
> = {
  'or-18kt': {
    sousTitre: { en: 'sourced and traced', pt: 'de origem rastreada' },
    description: {
      en: '18-carat gold — yellow, white or rose — shaped by hand in my Bordeaux atelier. I select a traced gold, from demanding partners and favouring recycled metal wherever possible. Every creation meets a strict quality charter, for a piece as responsible as it is durable.',
      pt: 'Ouro de 18 quilates amarelo, branco ou rosa, moldado à mão no meu atelier em Bordéus. Seleciono um ouro rastreado, proveniente de parceiros exigentes e privilegiando a reciclagem sempre que possível. Cada criação respeita uma carta de qualidade rigorosa, para oferecer uma joia tão responsável quanto duradoura.',
    },
    imageAlt: {
      en: 'Ring in polished 18-carat gold set with a stone — savoir-faire of the Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates polido cravejado com uma pedra — savoir-faire do atelier Précieuse, Bordeaux',
    },
    annotationCaveat: {
      en: 'sourced and traced',
      pt: 'de origem rastreada',
    },
  },
  diamants: {
    sousTitre: { en: 'GIA/HRD-certified', pt: 'certificados GIA/HRD' },
    description: {
      en: 'Diamonds carefully selected in every shape, to suit your wishes. GIA- or HRD-certified, each diamond is rigorously sourced and traced in accordance with the Kimberley Process, guaranteeing a responsible and transparent provenance.',
      pt: 'Diamantes cuidadosamente selecionados em todas as formas, consoante os seus desejos. Certificados GIA ou HRD, cada diamante é rigorosamente rastreado, em conformidade com o Processo de Kimberley, garantindo uma proveniência responsável e transparente.',
    },
    imageAlt: {
      en: 'Ring in 18-carat gold set with GIA/HRD-certified diamonds — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates cravejado de diamantes certificados GIA/HRD — atelier Précieuse, Bordeaux',
    },
    annotationCaveat: {
      en: 'GIA/HRD-certified · Kimberley Process',
      pt: 'certificados GIA/HRD · Processo de Kimberley',
    },
  },
  tanzanites: {
    sousTitre: { en: 'A rare beauty from Africa', pt: 'Beleza rara de África' },
    description: {
      en: 'A rare gem born at the foot of Kilimanjaro, tanzanite is mined from one single mine in the world, in Tanzania. Its fascinating shades of blue and violet, together with its exceptional rarity, make it a gemstone of incomparable elegance.',
      pt: 'Gema rara nascida ao pé do Kilimanjaro, a tanzanite é extraída de uma única mina no mundo, na Tanzânia. Os seus fascinantes tons de azul e violeta, aliados à sua excecional raridade, fazem dela uma pedra preciosa de elegância incomparável.',
    },
    imageAlt: {
      en: 'Pear-cut tanzanite of an intense blue-violet presented on a plinth — Précieuse atelier, Bordeaux',
      pt: 'Tanzanite de talhe pera de um azul-violeta intenso apresentada sobre um pedestal — atelier Précieuse, Bordeaux',
    },
    annotationCaveat: { en: 'Available made to order', pt: 'Disponível por encomenda' },
  },
  tourmalines: {
    sousTitre: {
      en: 'The candy stone, endlessly colourful',
      pt: 'A pedra rebuçado, colorida à vontade',
    },
    description: {
      en: 'Tourmaline captivates with its incredible palette of colours, from pink to green by way of blue. The rarest of them, the Paraíba tourmaline discovered in Brazil, is famed for its intense turquoise blue and ranks among the most precious gems in the world.',
      pt: 'A turmalina seduz pela sua incrível palete de cores, do rosa ao verde, passando pelo azul. A mais rara, a turmalina Paraíba, descoberta no Brasil, é célebre pelo seu azul-turquesa intenso e faz parte das gemas mais preciosas do mundo.',
    },
    imageAlt: {
      en: 'Bicolour pink-and-green emerald-cut tourmaline presented on a plinth — Précieuse atelier, Bordeaux',
      pt: 'Turmalina bicolor rosa e verde, talhe esmeralda, apresentada sobre um pedestal — atelier Précieuse, Bordeaux',
    },
    annotationCaveat: { en: 'Available made to order', pt: 'Disponível por encomenda' },
  },
  opales: {
    sousTitre: { en: 'The stone of a thousand fires', pt: 'A pedra dos mil fogos' },
    description: {
      en: 'The opal is a fascinating gem, famed for its unique play of light revealing an infinity of colours. Ethiopian opals, particularly sought after, captivate with their blazing flashes, from yellow to red by way of orange and green.',
      pt: 'A opala é uma gema fascinante, célebre pelos seus jogos de luz únicos que revelam uma infinidade de cores. As opalas da Etiópia, particularmente procuradas, seduzem pelos seus brilhos flamejantes, do amarelo ao vermelho, passando pelo laranja e pelo verde.',
    },
    imageAlt: {
      en: 'Oval cabochon opal with orange and green fires presented on a plinth — Précieuse atelier, Bordeaux',
      pt: 'Opala cabochão oval com fogos alaranjados e verdes apresentada sobre um pedestal — atelier Précieuse, Bordeaux',
    },
    annotationCaveat: { en: 'Available made to order', pt: 'Disponível por encomenda' },
  },
}

// ---------------------------------------------------------------------------
// Témoignages (vrais avis, retour Emeline du 27/07) — clé : index du tableau
// ---------------------------------------------------------------------------
export const TEMOIGNAGE_TRANSLATIONS: Record<
  number,
  {
    citation: T
    piece: T
  }
> = {
  0: {
    citation: {
      en: 'Thank you for the originality of your jewellery, but above all for your kindness, your patience and your understanding! A true professional! I highly recommend…',
      pt: 'Obrigada pela originalidade das suas joias, mas sobretudo pela sua simpatia, pela sua paciência e pela sua compreensão! Uma verdadeira profissional! Recomendo vivamente…',
    },
    piece: { en: 'Bespoke creation', pt: 'Criação por medida' },
  },
  1: {
    citation: {
      en: 'Emeline is quite simply an artist! The jewels she created for me turned out to be magnificent, the result is beyond what I had imagined… I am moved and thrilled! In a word: sublime! Thank you from the bottom of my heart.',
      pt: 'A Emeline é, simplesmente, uma artista! As joias que criou para mim revelaram-se magníficas, o resultado está para além do que eu tinha imaginado… Estou comovida e entusiasmada! Numa palavra: sublime! Obrigada de todo o coração.',
    },
    piece: { en: 'Bespoke creation', pt: 'Criação por medida' },
  },
  2: {
    citation: {
      en: 'Always available, good advice, and fair prices. Thank you very much, you are a true professional.',
      pt: 'Sempre disponível, bons conselhos e preços justos. Muito obrigada, é uma verdadeira profissional.',
    },
    piece: { en: 'Bespoke creation', pt: 'Criação por medida' },
  },
}

// ---------------------------------------------------------------------------
// Articles (Carnet) — clé : slug article
// ---------------------------------------------------------------------------
export const ARTICLE_TRANSLATIONS: Record<
  string,
  {
    title: T
    excerpt: T
    imageAlt: T
  }
> = {
  'chemin-dune-bague': {
    title: {
      en: "A ring's journey: from sketch to jewel box",
      pt: 'O caminho de um anel: do esboço ao escrínio',
    },
    excerpt: {
      en: 'Four weeks, a single jewel. A look back in pictures at the full making of a Joséphine, from the first sketch to the final polishing.',
      pt: 'Quatro semanas, uma só joia. Retrospetiva em imagens do fabrico completo de uma Joséphine, do primeiro esboço ao polimento final.',
    },
    imageAlt: {
      en: 'Joséphine ring in 18-carat gold worn on the hand — Précieuse atelier, Bordeaux',
      pt: 'Anel Joséphine em ouro de 18 quilates usado na mão — atelier Précieuse, Bordeaux',
    },
  },
  'or-18kt-source-trace': {
    title: {
      en: '18-carat gold, sourced and traced',
      pt: 'O ouro de 18 quilates, de origem rastreada',
    },
    excerpt: {
      en: 'Three quarters pure gold, one quarter alloy, and a question that matters as much as purity: where does this metal come from? Fineness, colours and traceability, without the jargon.',
      pt: 'Três quartos de ouro puro, um quarto de liga, e uma questão que conta tanto como a pureza: de onde vem este metal? Toque, cores e rastreabilidade, sem jargão.',
    },
    imageAlt: {
      en: 'Ring in polished 18-carat gold set with a stone — savoir-faire of the Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates polido cravejado com uma pedra — savoir-faire do atelier Précieuse, Bordeaux',
    },
  },
  'journal-fonte-matinee-atelier': {
    title: {
      en: 'Casting journal: a morning at the atelier',
      pt: 'Diário de fundição: uma manhã no atelier',
    },
    excerpt: {
      en: '1,064 °C, a single chance. The story of a lost-wax casting, between tension and wonder.',
      pt: '1064 °C, uma só oportunidade. Relato de uma fundição por cera perdida, entre a tensão e o deslumbramento.',
    },
    imageAlt: {
      en: 'Two hands presenting a ring in 18-carat gold — gesture of the Précieuse atelier, Bordeaux',
      pt: 'Duas mãos apresentando um anel em ouro de 18 quilates — gesto do atelier Précieuse, Bordeaux',
    },
  },
  'choisir-pierre-precieuse': {
    title: {
      en: 'How to choose your precious stone',
      pt: 'Como escolher a sua pedra preciosa',
    },
    excerpt: {
      en: 'Colour, clarity, cut, origin: the four criteria that truly matter, explained without jargon.',
      pt: 'Cor, pureza, talhe, origem: os quatro critérios que realmente contam, explicados sem jargão.',
    },
    imageAlt: {
      en: 'Ring in 18-carat gold set with GIA/HRD-certified diamonds — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates cravejado de diamantes certificados GIA/HRD — atelier Précieuse, Bordeaux',
    },
  },
  'rhodolite-pierre-oubliee': {
    title: {
      en: 'Rhodolite, the forgotten stone',
      pt: 'A rodolite, pedra esquecida',
    },
    excerpt: {
      en: 'Raspberry pink, affordable, hard-wearing. A portrait of a discreet gem that deserves your attention.',
      pt: 'Rosa framboesa, acessível, resistente. Retrato de uma gema discreta que merece a sua atenção.',
    },
    imageAlt: {
      en: 'Ring in 18-carat gold set with coloured stones, worn on the hand — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates cravejado com pedras de cor, usado na mão — atelier Précieuse, Bordeaux',
    },
  },
  'bague-portee-au-quotidien': {
    title: {
      en: 'Worn every day: the gestures that matter',
      pt: 'Usado no quotidiano: os gestos que contam',
    },
    excerpt: {
      en: 'Care, storage, habits. Everything you need to know to keep your ring intact for years.',
      pt: 'Manutenção, arrumação, hábitos. Tudo o que é preciso saber para manter o seu anel intacto durante anos.',
    },
    imageAlt: {
      en: 'Ring in 18-carat gold worn on the hand — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates usado na mão — atelier Précieuse, Bordeaux',
    },
  },
}

// ---------------------------------------------------------------------------
// Étapes de l'établi — clé : step.index (1..4)
// ---------------------------------------------------------------------------
export const ETABLI_TRANSLATIONS: Record<
  number,
  {
    title: T
    annotation: T
    detail: T
    imageAlt: T
  }
> = {
  1: {
    title: { en: 'The Sketch', pt: 'O Esboço' },
    annotation: {
      en: 'always in B pencil, never with an eraser. The mistakes remain',
      pt: 'sempre a lápis B, nunca a borracha. Os erros ficam',
    },
    detail: {
      en: 'The first stroke decides everything. On vellum paper, the pencil leaves a memory that the finished piece will carry.',
      pt: 'O primeiro traço decide tudo. Sobre papel vélino, o lápis deixa uma memória que a peça acabada irá carregar.',
    },
    imageAlt: {
      en: 'Two hands presenting a ring in 18-carat gold — gesture of the Précieuse atelier, Bordeaux',
      pt: 'Duas mãos apresentando um anel em ouro de 18 quilates — gesto do atelier Précieuse, Bordeaux',
    },
  },
  2: {
    title: { en: 'The Wax', pt: 'A Cera' },
    annotation: {
      en: 'critical temperature at 68 °C, one second too long and it all starts again',
      pt: 'temperatura crítica a 68 °C, um segundo a mais e recomeça tudo',
    },
    detail: {
      en: 'Hand-modelling the exact volume. Wax forgives less than paper: it is the final draft.',
      pt: 'Modelagem à mão do volume exato. A cera perdoa menos do que o papel: é o último rascunho.',
    },
    imageAlt: {
      en: 'Ring in 18-carat gold presented in the hand — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates apresentado na mão — atelier Précieuse, Bordeaux',
    },
  },
  3: {
    title: { en: 'The Casting', pt: 'A Fundição' },
    annotation: {
      en: 'the gold goes in at 1,064 °C, it comes out a unique piece. There is no other way',
      pt: 'o ouro entra a 1064 °C, sai peça única. Não há outra forma',
    },
    detail: {
      en: 'The wax vanishes, the gold takes its place. A single piece will come out of the mould. There will be no second chance.',
      pt: 'A cera desaparece, o ouro toma o seu lugar. Uma só peça sairá do molde. Não haverá segunda oportunidade.',
    },
    imageAlt: {
      en: 'Thelma ring in 18-carat gold presented in the hand — Précieuse atelier, Bordeaux',
      pt: 'Anel Thelma em ouro de 18 quilates apresentado na mão — atelier Précieuse, Bordeaux',
    },
  },
  4: {
    title: { en: 'The Polishing', pt: 'O Polimento' },
    annotation: {
      en: 'two hours minimum, by hand, under a loupe. That is where the light is born',
      pt: 'duas horas no mínimo, à mão, à lupa. É aí que nasce a luz',
    },
    detail: {
      en: 'Every grain is chased down, every edge softened. The light is not given by the metal: it is wrested from it by hand.',
      pt: 'Cada grão é perseguido, cada aresta suavizada. A luz não é dada pelo metal: é arrancada à mão.',
    },
    imageAlt: {
      en: 'Ring in 18-carat gold and diamonds worn on the hand — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates e diamantes usado na mão — atelier Précieuse, Bordeaux',
    },
  },
}

// ---------------------------------------------------------------------------
// Métamorphose (page Sur-Mesure) — clé : index du tableau (0..n)
// ---------------------------------------------------------------------------
export const METAMORPHOSE_TRANSLATIONS: Record<
  number,
  {
    title: T
    annotation: T
    detail: T
    imageAlt: T
  }
> = {
  0: {
    title: { en: 'The Sketch', pt: 'O Esboço' },
    annotation: {
      en: 'always in B pencil, on vellum paper',
      pt: 'sempre a lápis B, sobre papel vélino',
    },
    detail: {
      en: 'It all begins with a conversation. You tell me about yourself, the occasion, the gesture you have in mind. I translate your words into lines: two or three sketches, as many possible directions. Nothing is fixed, everything is built together.',
      pt: 'Tudo começa com uma conversa. Fala-me de si, da ocasião, do gesto que imagina. Traduzo as suas palavras em linhas: dois ou três esboços, outras tantas direções possíveis. Nada está fixado, tudo se constrói em conjunto.',
    },
    imageAlt: {
      en: 'Two hands presenting a ring in 18-carat gold — gesture of the Précieuse atelier, Bordeaux',
      pt: 'Duas mãos apresentando um anel em ouro de 18 quilates — gesto do atelier Précieuse, Bordeaux',
    },
  },
  1: {
    title: { en: 'The Casting', pt: 'A Fundição' },
    annotation: {
      en: 'the gold goes in at 1,064 °C, it comes out a unique piece',
      pt: 'o ouro entra a 1064 °C, sai peça única',
    },
    detail: {
      en: 'The approved sketch becomes volume. Wax modelling, then lost-wax casting in 18-carat gold in my atelier in Bordeaux. Each piece is cast individually. There will be no second chance, and that is what makes every jewel irreplaceable.',
      pt: 'O esboço validado torna-se volume. Modelagem em cera, depois fundição por cera perdida em ouro de 18 quilates no meu atelier em Bordeaux. Cada peça é fundida individualmente. Não haverá segunda oportunidade, e é isso que torna cada joia insubstituível.',
    },
    imageAlt: {
      en: 'Thelma ring in 18-carat gold presented in the hand — Précieuse atelier, Bordeaux',
      pt: 'Anel Thelma em ouro de 18 quilates apresentado na mão — atelier Précieuse, Bordeaux',
    },
  },
  2: {
    title: { en: 'The Jewel Box', pt: 'O Escrínio' },
    annotation: {
      en: 'polished, set, signed. Your jewel is born',
      pt: 'polida, cravada, assinada. A sua joia nasceu',
    },
    detail: {
      en: 'Polishing by hand, stone-setting one stone at a time under a loupe. Every grain is chased down, every edge softened. The jewel receives its certificate of authenticity, then joins its box for the journey to you. Secure, insured, tracked delivery.',
      pt: 'Polimento à mão, cravação pedra a pedra à lupa. Cada grão é perseguido, cada aresta suavizada. A joia recebe o seu certificado de autenticidade e segue depois no seu escrínio para a viagem até si. Entrega segura, com seguro e seguimento.',
    },
    imageAlt: {
      en: 'Joséphine ring in 18-carat gold worn on the hand — Précieuse atelier, Bordeaux',
      pt: 'Anel Joséphine em ouro de 18 quilates usado na mão — atelier Précieuse, Bordeaux',
    },
  },
}

// ---------------------------------------------------------------------------
// Promesses (page Sur-Mesure) — clé : index du tableau (0..n)
// ---------------------------------------------------------------------------
export const PROMESSE_TRANSLATIONS: Record<
  number,
  {
    titre: T
    detail: T
    imageAlt: T
  }
> = {
  0: {
    titre: { en: '18-carat gold', pt: 'Ouro de 18 quilates' },
    detail: {
      en: 'Sourced and traced, favouring recycled metal wherever possible',
      pt: 'De origem rastreada, privilegiando a reciclagem sempre que possível',
    },
    imageAlt: {
      en: 'Ring in polished 18-carat gold set with a stone — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates polido cravejado com uma pedra — atelier Précieuse, Bordeaux',
    },
  },
  1: {
    titre: { en: 'Certified stones', pt: 'Pedras certificadas' },
    detail: {
      en: 'GIA/HRD-certified diamonds and stones, chosen one by one',
      pt: 'Diamantes e pedras certificados GIA/HRD, escolhidos um a um',
    },
    imageAlt: {
      en: 'Ring in 18-carat gold set with GIA/HRD-certified diamonds — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates cravejado de diamantes certificados GIA/HRD — atelier Précieuse, Bordeaux',
    },
  },
  2: {
    titre: { en: 'Handmade', pt: 'Feito à mão' },
    detail: {
      en: 'Lost-wax casting, stone-setting under a loupe',
      pt: 'Fundição por cera perdida, cravação à lupa',
    },
    imageAlt: {
      en: 'Ring in 18-carat gold set with a coloured stone — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates cravejado com uma pedra de cor — atelier Précieuse, Bordeaux',
    },
  },
  3: {
    titre: { en: '4 to 8 weeks', pt: '4 a 8 semanas' },
    detail: {
      en: 'Just the right time for work without compromise',
      pt: 'O tempo justo para um trabalho sem compromissos',
    },
    imageAlt: {
      en: 'Ring in 18-carat gold, coloured stone framed by diamonds — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates, pedra de cor rodeada de diamantes — atelier Précieuse, Bordeaux',
    },
  },
  4: {
    titre: { en: 'Secure delivery', pt: 'Entrega segura' },
    detail: {
      en: 'Express, insured, certificate included',
      pt: 'Expresso, com seguro, certificado incluído',
    },
    imageAlt: {
      en: 'Ring in 18-carat gold set with a ruby — Précieuse atelier, Bordeaux',
      pt: 'Anel em ouro de 18 quilates cravejado com um rubi — atelier Précieuse, Bordeaux',
    },
  },
}

// ---------------------------------------------------------------------------
// Libellés du pied de page (nav + légal) — clé : href
// ---------------------------------------------------------------------------
export const FOOTER_LABEL_TRANSLATIONS: Record<string, T> = {
  // nav
  '/collection': { en: 'The Collection', pt: 'A Coleção' },
  '/carnet': { en: 'The Journal', pt: 'O Caderno' },
  '/creatrice': { en: 'The Atelier', pt: 'O Atelier' },
  '/sur-mesure': { en: 'Bespoke', pt: 'Por Medida' },
  '/contact': { en: 'Contact', pt: 'Contacto' },
  // legal
  '/mentions-legales': { en: 'Legal notice', pt: 'Menções legais' },
  '/confidentialite': { en: 'Privacy', pt: 'Privacidade' },
  '/cgv': { en: 'Terms of sale', pt: 'Condições de venda' },
}
