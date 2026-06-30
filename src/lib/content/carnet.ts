/** Bloc de contenu d'un article (corps de texte). Modèle simple, mappable
 *  plus tard sur le portable text de Sanity. */
export type ArticleBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'quote'; text: string; cite?: string }
  | { kind: 'list'; items: string[] }

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  imageAlt: string
  /** Point focal CSS (object-position), piloté par le hotspot Sanity (défaut centre). */
  imagePosition?: string
  featured?: boolean
  /** Chapô (intro mise en avant) affiché en tête de l'article. */
  lede?: string
  /** Corps de l'article. Vide = page « en cours de rédaction ». */
  body?: ArticleBlock[]
  /** Citation de clôture (signature d'Emeline) affichée en fin d'article.
   *  Éditable dans Sanity (champ `closingQuote`) ; ce contenu statique sert de repli. */
  closingQuote?: { text: string; cite?: string }
}

export const ARTICLES: Article[] = [
  {
    slug: 'chemin-dune-bague',
    // Le saut de ligne (\n) décide où le titre se coupe à l'affichage (rendu via
    // whitespace-pre-line). Ailleurs (listes, SEO) il se réduit à une espace.
    title: "Le chemin d'une bague :\nde l'esquisse à l'écrin",
    excerpt:
      "Quatre semaines séparent un croquis d'une bague qu'on glisse enfin au doigt. Geste après geste, le récit complet d'une fabrication à l'atelier de Bordeaux.",
    category: 'Atelier',
    date: '12 mai 2026',
    readTime: '6 min',
    image: '/images/real/bague-main-josephine.webp',
    imageAlt:
      'Bague Joséphine en or 18 carats portée à la main, atelier Précieuse, Bordeaux',
    featured: true,
    lede: "Entre un croquis au crayon et une bague qu'on glisse enfin au doigt, il s'écoule environ quatre semaines. Voici ce qui se passe à l'atelier, à Bordeaux, dans cet intervalle, geste après geste.",
    body: [
      { kind: 'h2', text: 'Tout commence par un trait' },
      {
        kind: 'p',
        text: "Avant l'or, avant les pierres, il y a une feuille et un crayon. J'écoute d'abord : une histoire, une date, une silhouette de main, parfois une pierre qui appartient déjà à la famille et qu'on souhaite faire revivre. De cette conversation naît un dessin. Pour une bague entourage, celle que nous appelons Joséphine, le principe tient en une image simple : une pierre centrale, posée en son cœur, et tout autour une couronne de petits diamants qui l'enlacent. Cet entourage n'est pas qu'un ornement. Il fait circuler davantage de lumière autour de la pierre du centre et lui donne, à l'œil, un peu plus d'ampleur et de présence.",
      },
      {
        kind: 'p',
        text: "Je dessine les proportions à l'échelle réelle : la hauteur de la pierre, la largeur de l'anneau, l'écart entre chaque diamant de la couronne. Rien n'est encore figé. C'est le moment des questions, des repentirs, des « et si ». Un bijou qui se portera toute une vie mérite qu'on prenne le temps de le regarder venir.",
      },
      { kind: 'h2', text: 'Donner du volume au dessin' },
      {
        kind: 'p',
        text: "Un dessin reste plat. Pour qu'une bague existe vraiment, il faut la faire passer en trois dimensions. À l'atelier, deux chemins mènent à cette étape, et le choix dépend de la pièce.",
      },
      {
        kind: 'p',
        text: "Le premier est le plus ancien : la cire sculptée. Je pars d'un bloc de cire brute et je l'évide, je la lime, je la creuse avec de petits outils, l'échoppe, la lime, parfois même un instrument de dentiste pour les détails les plus fins. La matière s'enlève peu à peu, jusqu'à ce que la forme apparaisse. Un outil gradué, le triboulet, me donne la taille exacte du doigt.",
      },
      {
        kind: 'p',
        text: "Le second chemin emprunte l'ordinateur : la conception assistée par ordinateur, ou CAO. Je modélise la bague sur un logiciel, je la fais tourner sous tous les angles, j'ajuste un dixième de millimètre ici, un diamètre de pierre là. Ce fichier est ensuite imprimé en trois dimensions, couche après couche, dans une résine ou une cire spéciale. Dans les deux cas, on obtient une maquette qu'on peut tenir entre ses doigts, essayer, corriger, bien avant qu'un seul gramme d'or n'entre en jeu. Cette maquette n'est encore qu'une promesse de bague. Mais elle se touche, et c'est souvent là qu'un projet devient réel.",
      },
      { kind: 'h2', text: 'Le moment où la cire devient or' },
      {
        kind: 'p',
        text: "Vient alors le cœur de la fabrication, une technique que l'on pratique depuis des millénaires : la fonte à la cire perdue.",
      },
      {
        kind: 'p',
        text: "La maquette en cire est reliée à une petite tige, elle aussi en cire, qui formera le canal par où l'or s'écoulera. On l'enrobe d'un plâtre dit réfractaire, capable de résister à de très hautes températures. Une fois ce plâtre durci, le moule est placé dans un four et porté à plusieurs centaines de degrés. La cire fond et s'évacue entièrement, ne laissant derrière elle qu'une empreinte creuse, parfaitement nette. La cire est « perdue », d'où le nom du procédé.",
      },
      {
        kind: 'p',
        text: "Dans ce vide, on coule l'or en fusion. Notre or est un or 18 carats, ce qu'on note aussi 750 millièmes : sur mille parts de métal, sept cent cinquante sont de l'or pur. Le reste, cuivre, argent, parfois un peu de palladium, n'est pas un défaut, c'est ce qui donne au bijou sa solidité. L'or pur, à 24 carats, serait bien trop tendre pour une bague portée chaque jour. Quand le métal a refroidi, on brise le plâtre, et la bague apparaît enfin : brute, mate, encore reliée à sa tige. Il faut la détacher, la limer, l'adoucir. Toute la pièce a été coulée d'un seul tenant, sans aucune soudure, c'est la beauté de cette méthode.",
      },
      { kind: 'h2', text: 'Loger chaque pierre, réveiller la lumière' },
      {
        kind: 'p',
        text: "La bague existe, mais elle est encore endormie. C'est le sertissage qui va l'éveiller, l'art de fixer les pierres dans le métal, sans une goutte de colle, par le seul travail de la matière. C'est un métier en soi, qui se fait à la loupe, le souffle court.",
      },
      {
        kind: 'p',
        text: "La pierre centrale est tenue par des griffes : de fines tiges de métal, quatre ou six selon le dessin, qu'on rabat délicatement sur le feuilletis de la pierre, cette arête qui la ceinture à son plus large. Les griffes retiennent la pierre tout en la laissant respirer, pour que la lumière passe au travers et la fasse briller au maximum.",
      },
      {
        kind: 'p',
        text: "Les petits diamants de l'entourage, eux, sont posés au grain. Là, le sertisseur ne rapporte pas de métal : il en soulève. Avec un outil tranchant, il fait naître de minuscules perles à même la surface, les grains, et les rabat sur chaque pierre pour la bloquer. Quand les diamants se touchent presque et couvrent toute la surface, on parle d'un pavé : un tapis continu d'éclats. Chaque diamant a été choisi et certifié par un laboratoire indépendant, GIA ou HRD ; l'or, lui, est d'une traçabilité garantie, de la matière première jusqu'à l'établi.",
      },
      {
        kind: 'p',
        text: "Vient enfin le polissage. Sur un touret qui tourne, le métal passe lentement du mat au miroir. C'est l'instant où tout s'allume : la lumière, qui jusque-là butait sur une surface terne, se met à circuler d'une pierre à l'autre.",
      },
      { kind: 'h2', text: 'Les derniers gestes' },
      {
        kind: 'p',
        text: "Avant qu'une bague quitte l'atelier, je la regarde une dernière fois, longuement, sous la loupe. Chaque griffe, chaque grain, la tenue de chaque pierre, la régularité du poli. Rien ne part qui ne soit irréprochable.",
      },
      {
        kind: 'p',
        text: "Reste l'intérieur de l'anneau, ce côté que personne ne voit. On y frappe d'abord les poinçons obligatoires : le poinçon de maître, sorte de signature de l'atelier, et la tête d'aigle, qui garantit l'or à 750 millièmes, une obligation française, contrôlée par un bureau de garantie. Et puis, tout contre, vient la gravure intime : une date, deux initiales, parfois un mot. Le secret du bijou, lisible par la seule personne qui le porte.",
      },
      {
        kind: 'p',
        text: "La bague rejoint alors son écrin. Mais le voyage, lui, ne se termine pas sur un colis. Il se termine par une rencontre : une main qu'on ouvre, un regard. C'est tout le sens de ce que nous faisons ici, non pas vendre un objet, mais confier une histoire qui se portera longtemps.",
      },
    ],
    closingQuote: {
      text: "Une bague juste, ce n'est pas la plus chargée. C'est celle qui se fait oublier au doigt, et qu'on regarde encore, des années plus tard, comme au premier jour.",
      cite: 'Emeline Le Ray, atelier Précieuse',
    },
  },
  {
    slug: 'or-18kt-source-trace',
    title: "L'or 18 carats, sourcé et tracé",
    excerpt:
      "Trois quarts d'or pur, un quart d'alliage, et une question qui compte autant que la pureté : d'où vient ce métal ? Titrage, couleurs et traçabilité, sans jargon.",
    category: 'Matières',
    date: '28 avril 2026',
    readTime: '4 min',
    image: '/images/real/bague-pierre-josephine.webp',
    imageAlt:
      "Bague en or 18 carats poli sertie d'une pierre, savoir-faire de l'atelier Précieuse, Bordeaux",
    lede: "Un or 18 carats, c'est trois quarts d'or pur et un quart d'autre chose. Derrière ce simple chiffre se jouent la solidité d'une bague, sa couleur, et une question qui me tient à cœur : d'où vient ce métal ?",
    body: [
      { kind: 'h2', text: "18 carats, qu'est-ce que ça veut dire ?" },
      {
        kind: 'p',
        text: "Le carat, ici, n'a rien à voir avec le poids d'un diamant. C'est une mesure de pureté, sur une échelle de 24. Un or 18 carats contient donc 18 parts d'or pur sur 24, soit 75 %. On l'écrit aussi 750 millièmes : sur mille grammes de métal, sept cent cinquante sont de l'or fin. Le quart restant, ce sont d'autres métaux, mêlés à l'or pour une bonne raison.",
      },
      {
        kind: 'p',
        text: "Car l'or pur, à 24 carats, est un métal magnifique mais bien trop tendre. Il se raye d'un coup d'ongle, se déforme dans la main, et ne tiendrait jamais un sertissage fin. En lui ajoutant un peu de cuivre, d'argent ou de palladium, on lui donne la dureté qu'il faut pour être porté chaque jour, toute une vie. C'est tout le sens du 18 carats : assez d'or pour la noblesse, assez d'alliage pour la solidité. En France, ce titre est garanti par un poinçon officiel, la tête d'aigle, frappé à l'intérieur du bijou.",
      },
      { kind: 'h2', text: "Jaune, blanc, rose : une affaire d'alliage" },
      {
        kind: 'p',
        text: "Voici une idée reçue à défaire : l'or n'est pas toujours jaune. Sa couleur, dans un bijou en or massif, vient entièrement de ce fameux quart d'alliage, et non d'un placage de surface.",
      },
      {
        kind: 'p',
        text: "L'or jaune est le plus proche de l'or naturel : on associe l'or pur à parts égales d'argent et de cuivre, et l'on obtient cette teinte chaude, solaire, qui ne se démode pas. L'or rose, lui, contient davantage de cuivre, c'est le cuivre qui apporte ce rosé tendre, et plus on en met, plus la nuance tire vers le cuivré. Quant à l'or blanc, on l'allie surtout au palladium (autrefois au nickel, aujourd'hui écarté pour éviter les allergies). On le plonge souvent, en finition, dans un bain de rhodium, un métal blanc et brillant, qui accentue sa blancheur ; ce rhodiage se renouvelle au fil des années.",
      },
      {
        kind: 'p',
        text: "Ce qu'il faut retenir : ces trois ors ont exactement le même titre, 750 millièmes. Choisir une couleur, ce n'est jamais choisir plus ou moins d'or. C'est seulement une question de caractère.",
      },
      { kind: 'h2', text: "D'où vient l'or ? La vraie question" },
      {
        kind: 'p',
        text: "On parle beaucoup de la pureté de l'or. On parle trop peu de son origine. Et c'est pourtant là, pour moi, que tout se joue.",
      },
      {
        kind: 'p',
        text: "L'or a une particularité : il se fond, se raffine et se mélange à l'infini sans rien perdre de sa valeur. Une fois fondu, un gramme d'or ressemble à n'importe quel autre. C'est ce qui rend sa traçabilité si délicate, et si précieuse lorsqu'elle existe. Garantir un or responsable, ce n'est donc pas un geste qu'on ajoute à la fin : c'est une chaîne qu'on documente depuis le tout début. Trois voies principales le permettent aujourd'hui.",
      },
      {
        kind: 'p',
        text: "La première est l'or recyclé : on refond de l'or qui existe déjà, anciens bijoux, chutes d'atelier, stocks. On évite ainsi d'extraire du métal neuf, ce qui réduit fortement l'empreinte de la fabrication. Une nuance honnête, tout de même : « recyclé » dit que l'or n'a pas été fraîchement extrait, mais ne dit rien de la mine d'où il provenait, autrefois. Son histoire, en quelque sorte, ne commence qu'au moment de la refonte.",
      },
      {
        kind: 'p',
        text: "La deuxième passe par des labels comme Fairmined ou Fairtrade Gold. Ils certifient un or issu de petites mines artisanales, tracé depuis la mine, extrait dans des conditions de travail et d'environnement contrôlées et vérifiées chaque année par des audits indépendants. Mieux : une prime est reversée directement aux communautés minières, pour financer des écoles, des soins ou des équipements plus sûrs. Ici, on n'efface pas l'extraction : on la rend visible, et on l'encadre.",
      },
      {
        kind: 'p',
        text: "La troisième est le Responsible Jewellery Council, ou RJC, l'organisme de référence du secteur. Sa certification « Chain of Custody », la chaîne de traçabilité, suit le parcours du métal maillon par maillon, de la mine à l'atelier, chaque étape étant auditée et documentée. L'or qui en ressort est tracé et issu d'un approvisionnement responsable.",
      },
      { kind: 'h2', text: 'Une idée reçue à corriger, pour finir' },
      {
        kind: 'p',
        text: "On me parle parfois du « processus de Kimberley » à propos de l'or. C'est une confusion fréquente, et je préfère la lever en douceur : le processus de Kimberley encadre les diamants bruts, pour empêcher les « diamants de la guerre » de financer des conflits armés. Il ne dit rien de l'or. Pour le métal, ce sont les dispositifs évoqués plus haut, or recyclé, Fairmined, Fairtrade, RJC, qui font foi.",
      },
      {
        kind: 'p',
        text: "À l'atelier, à Bordeaux, je ne vois pas la traçabilité comme une étiquette qu'on colle à la dernière minute. Une traçabilité garantie, c'est un choix fait à la source, pour pouvoir vous regarder dans les yeux et vous dire d'où vient votre or. Un bijou qui se transmet mérite, je crois, une histoire propre d'un bout à l'autre. C'est une conversation que j'ai toujours plaisir à avoir : venez, on en parle.",
      },
    ],
    closingQuote: {
      text: "Un bijou qu'on transmet mérite une histoire propre d'un bout à l'autre, y compris celle de son or.",
      cite: 'Emeline Le Ray, atelier Précieuse',
    },
  },
  {
    slug: 'journal-fonte-matinee-atelier',
    title: "Journal de fonte : une matinée à l'atelier",
    excerpt:
      "Quelques secondes, une seule chance, aucun rattrapage. Récit d'une fonte à la cire perdue, un matin à l'atelier de Bordeaux.",
    category: 'Atelier',
    date: '15 avril 2026',
    readTime: '5 min',
    image: '/images/real/deux-mains.webp',
    imageAlt:
      "Deux mains présentant une bague en or 18 carats, geste de l'atelier Précieuse, Bordeaux",
    lede: "Il y a un instant, chaque matin de fonte, où tout se joue en quelques secondes. L'or coule, et il n'y aura pas de seconde tentative. Récit d'une fonte à la cire perdue, à l'atelier, à Bordeaux.",
    body: [
      { kind: 'h2', text: 'Avant le feu' },
      {
        kind: 'p',
        text: "Il est tôt. La lumière entre à peine, et l'atelier sent encore le plâtre et la cire tiède. Sur l'établi, un petit cylindre de métal m'attend, on l'appelle un moule, mais à l'intérieur, il n'y a pour l'instant que du vide. Un vide qui a exactement la forme d'une bague.",
      },
      {
        kind: 'p',
        text: "Quelques jours plus tôt, j'ai sculpté cette bague en cire, puis je l'ai reliée à une petite tige, elle aussi en cire, par où l'or s'écoulera tout à l'heure. J'ai enfermé le tout dans ce cylindre et je l'ai noyé sous un plâtre particulier, capable de résister au feu : un plâtre réfractaire. Cette nuit, le cylindre a passé des heures dans un four, chauffé selon un cycle précis jusqu'à plusieurs centaines de degrés. Sous l'effet de la chaleur, la cire a fondu et s'est entièrement écoulée, ne laissant derrière elle qu'une empreinte creuse, nette comme un négatif.",
      },
      {
        kind: 'p',
        text: "C'est tout le principe de la fonte à la cire perdue, vieux de plusieurs millénaires : la cire est « perdue », évacuée pour de bon, et le vide qu'elle laisse deviendra le bijou. Mais il faut comprendre une chose. Ce moule ne sert qu'une seule fois. Pour récupérer la bague, je devrai le briser. Et la cire d'origine, elle, n'existe plus. Si la coulée rate, il n'y a rien à rattraper : tout est à recommencer, depuis une nouvelle cire.",
      },
      { kind: 'h2', text: "L'or devient liquide" },
      {
        kind: 'p',
        text: "Je sors le creuset, ce petit récipient qui supportera la chaleur, et j'y dépose mon or, avec une pincée de borax, une poudre qui garde le métal propre en fondant. C'est un or 18 carats : trois quarts d'or pur, un quart d'alliage qui lui donne sa solidité et sa couleur.",
      },
      {
        kind: 'p',
        text: "On entend souvent que l'or fond à 1 064 degrés. C'est vrai, mais seulement pour l'or pur, à 24 carats. Le mien n'est pas pur : c'est un mélange, et un mélange se comporte autrement. Mon or 18 carats devient liquide plus bas, autour de 900 à 950 degrés, et il ne bascule pas d'un coup, il s'amollit d'abord, puis se rassemble en une petite bille brillante qui frémit. La flamme ronfle, soufflante, et l'odeur du métal chaud monte. La couleur vire au rouge sombre, puis à l'orange, et enfin à ce jaune presque blanc, aveuglant, qui me dit que le moment approche. Je ne quitte pas la bille des yeux.",
      },
      {
        kind: 'p',
        text: "À côté, le cylindre est sorti du four, encore brûlant. Ce n'est pas un hasard : si je coulais l'or dans un moule froid, il se figerait avant d'avoir rempli les détails les plus fins. La chaleur appelle la chaleur.",
      },
      { kind: 'h2', text: 'Une seule chance' },
      {
        kind: 'p',
        text: "Voici l'instant. Celui où la main doit être sûre et le geste, juste.",
      },
      {
        kind: 'p',
        text: "L'or est liquide, vif, prêt à se dérober. Je le verse, ou plutôt je le fais aspirer dans le moule, car à l'atelier une machine crée un vide qui attire le métal jusque dans les moindres recoins de l'empreinte. Tout se passe en une poignée de secondes. Le métal trouve son chemin, épouse la forme de la cire disparue, remplit la tige, les contours, les plus petites griffes.",
      },
      {
        kind: 'p',
        text: "Pendant ces quelques secondes, je retiens mon souffle. Il y a là quelque chose qui ne dépend plus tout à fait de moi : la température, la fluidité, la vitesse à laquelle l'or se précipite puis refroidit. J'ai tout préparé pour que cela se passe bien, mais l'or, lui, fait le reste. Et il ne le fait qu'une fois.",
      },
      { kind: 'h2', text: "L'eau, et ce qui apparaît" },
      {
        kind: 'p',
        text: "Puis vient l'attente, la plus longue de la matinée, alors qu'elle ne dure que quelques minutes. Le métal doit refroidir, se solidifier, prendre.",
      },
      {
        kind: 'p',
        text: "Quand le moment est venu, je saisis le cylindre encore chaud et je le plonge dans l'eau froide. Un sifflement, un nuage de vapeur, et le plâtre, sous le choc thermique, se délite, se désagrège, libère ce qu'il enfermait. Je dégage les derniers résidus, et la bague apparaît enfin. Brute, mate, un peu grise, encore reliée à sa tige par le canal qu'a emprunté l'or. Elle ne ressemble pas encore au bijou qu'elle deviendra : il faudra la détacher, la limer, la polir longuement, sertir ses pierres. Mais elle est là. D'un seul tenant, sans aucune soudure, née d'une cire qui n'existe plus.",
      },
      {
        kind: 'p',
        text: "Je la tiens au creux de la main. Elle est tiède, et il y a, dans ce simple objet encore informe, tout le sel de ce métier : la patience de plusieurs jours, et puis ces quelques secondes où l'on n'a, vraiment, qu'une seule chance.",
      },
    ],
    closingQuote: {
      text: "On prépare une fonte pendant des jours pour quelques secondes décisives. C'est dans ce court instant que tout le métier se tient.",
      cite: 'Emeline Le Ray, atelier Précieuse',
    },
  },
  {
    slug: 'choisir-pierre-precieuse',
    title: 'Comment choisir sa pierre précieuse',
    excerpt:
      "Couleur, pureté, taille, origine : les quatre critères qui comptent vraiment, expliqués sans jargon.",
    category: 'Guides',
    date: '2 avril 2026',
    readTime: '7 min',
    image: '/images/real/bague-diamant.webp',
    imageAlt:
      'Bague en or 18 carats sertie de diamants certifiés GIA/HRD, atelier Précieuse, Bordeaux',
    lede: "Choisir une pierre, ce n'est pas réciter un vocabulaire d'expert. C'est comprendre quatre ou cinq idées simples, puis se laisser guider par ce qui vous touche. Voici de quoi y voir clair, sans jargon.",
    body: [
      { kind: 'h2', text: 'Les 4 C : la grammaire du diamant' },
      {
        kind: 'p',
        text: "Dans les années 1950, un laboratoire américain, le GIA, a posé quatre critères pour décrire n'importe quel diamant blanc. On les appelle les « 4 C », d'après leurs noms anglais : Carat (le poids), Cut (la taille), Color (la couleur) et Clarity (la pureté). Aucun de ces quatre éléments ne compte seul : c'est leur équilibre qui fait la beauté d'une pierre.",
      },
      {
        kind: 'p',
        text: "Avant d'entrer dans le détail, un piège de vocabulaire qu'il faut désamorcer. En français, deux mots prêtent à confusion. Le carat ne dit rien de la « taille » au sens de la grosseur : c'est une mesure de poids. Et « la taille » d'un diamant, justement, ne désigne pas sa dimension mais le travail du tailleur, la façon dont la pierre a été facettée. Gardez ces deux idées séparées, et tout devient limpide.",
      },
      { kind: 'h2', text: 'Le poids et la taille : ne pas les confondre' },
      {
        kind: 'p',
        text: "Le carat, donc, mesure le poids. Un carat vaut exactement 0,20 gramme, le poids d'un petit trombone. C'est le critère le plus facile à comprendre, et souvent celui auquel on pense en premier. Mais attention : un gros diamant n'est pas forcément un beau diamant.",
      },
      {
        kind: 'p',
        text: "Car tout dépend de la taille, le seul des quatre critères qui ne doive rien à la nature et tout à la main de l'homme. Tailler un diamant, c'est lui donner ses facettes et ses proportions pour que la lumière entre, rebondisse d'une face à l'autre, puis ressorte en éclats. Un diamant rond « brillant », par exemple, compte cinquante-sept facettes minutieusement disposées. Quand ces proportions sont justes, la pierre s'allume ; quand elles sont ratées, elle reste éteinte, même grosse. Le GIA note cette qualité de taille sur une échelle qui va d'« Excellent » à « Poor » (médiocre). Retenez ceci : un diamant plus petit, mais parfaitement taillé, brillera souvent plus qu'une pierre plus lourde et mal taillée. Et comme tailler une pierre, c'est forcément lui retirer de la matière, la taille et le poids se disputent toujours un peu.",
      },
      { kind: 'h2', text: 'La couleur et la pureté' },
      {
        kind: 'p',
        text: "Troisième critère : la couleur. Contrairement à ce qu'on imagine, la plupart des diamants ne sont pas parfaitement incolores, ils tirent légèrement vers le jaune. Le GIA classe cette teinte sur une échelle qui part de la lettre D (totalement incolore, le plus rare) et descend jusqu'à Z (jaune pâle visible). Plus un diamant blanc est dépourvu de couleur, plus il est recherché. À noter : les diamants franchement colorés, jaunes vifs, bleus, roses, dits « fancy », sortent de cette échelle et obéissent à d'autres règles.",
      },
      {
        kind: 'p',
        text: "Quatrième critère : la pureté. En se formant dans les profondeurs de la Terre, presque tous les diamants ont emprisonné de minuscules marques, on les appelle des inclusions. La pureté mesure leur présence, observée à la loupe qui grossit dix fois. L'échelle va de FL (aucune inclusion, extrêmement rare) jusqu'à I (inclusions visibles), en passant par toute une série d'intermédiaires aux sigles un peu obscurs (VVS, VS, SI…). Bonne nouvelle : la plupart des pierres situées au milieu de l'échelle sont « pures à l'œil », c'est-à-dire que leurs inclusions ne se voient pas sans loupe. Inutile, donc, de chercher la perfection au microscope : ce qui compte, c'est ce que verra l'œil.",
      },
      { kind: 'h2', text: "L'origine et le certificat : la carte d'identité de la pierre" },
      {
        kind: 'p',
        text: "Au-delà des 4 C, deux questions me semblent essentielles : d'où vient la pierre, et qui le garantit.",
      },
      {
        kind: 'p',
        text: "Pour les diamants, l'origine responsable repose sur une chaîne documentée, c'est tout l'esprit de la traçabilité que nous défendons à l'atelier. Mais la garantie de la qualité, elle, passe par un document précis : le certificat, établi par un laboratoire de gemmologie indépendant. C'est, en quelque sorte, la carte d'identité de la pierre.",
      },
      {
        kind: 'p',
        text: "Deux laboratoires font référence. Le GIA, le Gemological Institute of America, fondé aux États-Unis en 1931 : c'est lui qui a inventé les 4 C, et son sérieux fait autorité dans le monde entier. Et le HRD, Hoge Raad voor Diamant, le « Conseil supérieur du diamant », fondé en 1973 à Anvers, capitale historique du diamant, qui fait référence en Europe. Tous deux sont totalement indépendants du commerce : ils analysent la pierre et la décrivent sans rien y vendre.",
      },
      {
        kind: 'p',
        text: "Que contient un tel rapport ? Les fameux 4 C, les mesures exactes de la pierre, un schéma situant ses inclusions, et, c'est capital, la mention de sa nature : naturelle, traitée, ou créée en laboratoire. Souvent, le numéro du certificat est même gravé au laser sur le rondiste (la tranche de la pierre), invisible à l'œil nu, pour l'identifier à coup sûr. Un détail pratique : en dessous d'un certain poids, souvent autour de 0,30 carat, les petits diamants ne sont pas certifiés un par un, mais l'atelier qui les emploie se porte garant de leur qualité.",
      },
      { kind: 'h2', text: "Les pierres de couleur : la couleur d'abord" },
      {
        kind: 'p',
        text: "Tout ce qui précède vaut pour le diamant blanc. Pour un rubis, un saphir ou une émeraude, les trois grandes pierres précieuses de couleur, les règles changent d'ordre.",
      },
      {
        kind: 'p',
        text: "Ici, c'est la couleur qui prime, avant tout le reste. On la juge à trois choses : sa teinte (le rouge, le bleu…), son intensité, et son homogénéité. Une couleur vive, profonde et régulière compte bien davantage qu'une teinte pâle ou inégale. Et le poids passe au second plan : un petit rubis d'une couleur exceptionnelle l'emporte sur un gros rubis terne.",
      },
      {
        kind: 'p',
        text: "La pureté, elle aussi, se juge autrement. Dans une pierre de couleur, les inclusions sont normales, attendues même : on dit joliment qu'une émeraude possède un « jardin ». Une émeraude parfaitement pure serait d'ailleurs suspecte, souvent le signe d'une pierre de synthèse. Ce qui compte, là encore, c'est le charme de l'ensemble.",
      },
      {
        kind: 'p',
        text: "Un point mérite toute votre attention : les traitements. La très grande majorité des saphirs et des rubis sont chauffés, portés à très haute température pour aviver leur couleur et estomper leurs inclusions. La plupart des émeraudes, elles, sont huilées pour combler leurs fissures de surface. Ces traitements sont courants, anciens et acceptés ; une pierre qui n'en a subi aucun est simplement plus rare et plus recherchée. La seule règle d'or : le traitement doit être déclaré sur le certificat. Ne pas le mentionner, c'est une tromperie. Pour ces pierres, l'origine compte aussi beaucoup (certaines provenances sont réputées), et des laboratoires spécialisés, comme le SSEF ou le Gübelin, se consacrent à leur expertise.",
      },
      { kind: 'h2', text: 'Mes conseils pour bien choisir' },
      {
        kind: 'list',
        items: [
          "Privilégiez la taille avant le poids. Un diamant un peu plus petit mais magnifiquement taillé aura plus d'éclat qu'une grosse pierre mal proportionnée. C'est la lumière qu'on remarque, pas les centièmes de carat.",
          "Visez le « pur à l'œil », pas la perfection au microscope. Une pierre dont les inclusions ne se voient pas à l'œil nu est parfaite pour un bijou, inutile de chercher une pureté que personne ne verra jamais.",
          "À partir d'un certain poids, demandez un certificat indépendant. GIA, HRD : un rapport d'un grand laboratoire vous garantit la qualité et la nature de la pierre, et son numéro se vérifie en ligne en quelques secondes.",
          "Pour une pierre de couleur, choisissez d'abord la teinte qui vous émeut, puis demandez toujours si elle est traitée. La chauffe et l'huilage sont normaux ; ce qui ne l'est pas, c'est de vous les cacher.",
          "Pensez à votre quotidien. Le diamant est la plus dure des pierres, le rubis et le saphir résistent admirablement au temps ; l'émeraude, plus tendre et plus fragile, demande un peu plus de précaution. Choisissez selon la vie que mènera votre bijou.",
        ],
      },
      {
        kind: 'p',
        text: "Au fond, tous ces critères ne sont que des repères. Une pierre ne se choisit pas seulement sur un papier : elle se choisit aussi, et surtout, avec les yeux et avec le cœur. À l'atelier, je suis là pour vous aider à accorder les deux, venez la regarder, on en parle.",
      },
    ],
    closingQuote: {
      text: "Une pierre ne se choisit pas vraiment sur un certificat. Elle se choisit quand le regard s'arrête, et ne veut plus la quitter.",
      cite: 'Emeline Le Ray, atelier Précieuse',
    },
  },
  {
    slug: 'rhodolite-pierre-oubliee',
    title: 'La rhodolite, pierre oubliée',
    excerpt:
      "Rose framboise, abordable, résistante. Portrait d'une gemme discrète qui mérite votre attention.",
    category: 'Matières',
    date: '18 mars 2026',
    readTime: '3 min',
    image: '/images/real/main-chaise-josephine.webp',
    imageAlt:
      'Bague en or 18 carats sertie de pierres de couleur, portée à la main, atelier Précieuse, Bordeaux',
    lede: "Tout le monde connaît le grenat rouge sombre des bijoux anciens. Presque personne ne connaît la rhodolite, sa cousine couleur framboise. C'est dommage, et voici pourquoi.",
    body: [
      { kind: 'h2', text: "Une cousine restée dans l'ombre" },
      {
        kind: 'p',
        text: "La rhodolite est un grenat, mais pas celui qu'on imagine. La famille des grenats compte une vingtaine de variétés, du vert émeraude à l'orange vif, et la rhodolite est l'une des plus séduisantes. Son nom vient du grec rhodon, « la rose », et annonce déjà sa couleur.",
      },
      {
        kind: 'p',
        text: "Si on la connaît si peu, c'est qu'elle vit dans l'ombre de deux pierres plus célèbres. D'un côté, le grenat rouge ordinaire, abondant et bon marché, qui a un peu terni la réputation de toute la famille. De l'autre, le rubis, dont elle partage les tons chauds, en plus doux. Coincée entre les deux, la rhodolite passe inaperçue. À tort.",
      },
      { kind: 'h2', text: 'Une couleur de fruit mûr' },
      {
        kind: 'p',
        text: "Sur le plan gemmologique, la rhodolite est un mélange naturel de deux grenats : le pyrope et l'almandin. C'est cette combinaison qui lui donne sa teinte si particulière, un rose framboise qui peut tirer vers le rouge violacé ou le prune profond. Le pyrope adoucit le rouge franc et apporte cette nuance rosée, lumineuse, que les gemmologues anglophones surnomment joliment « raspberry », la framboise. Son éclat est vif, vitreux : la pierre attrape bien la lumière.",
      },
      {
        kind: 'p',
        text: "C'est, en somme, une belle alternative au rubis pour qui cherche un rouge moins appuyé, plus tendre. Et à l'œil nu, elle se montre souvent plus claire et plus nette que bien d'autres pierres rouges.",
      },
      { kind: 'h2', text: 'Solide, franche, et sans artifice' },
      {
        kind: 'p',
        text: "Voici peut-être son plus grand atout. La rhodolite affiche une dureté de 7 à 7,5 sur l'échelle de Mohs, assez pour résister au port quotidien, et elle n'a pas de clivage, ce point faible qui rend certaines gemmes cassantes. On peut donc la sertir sur une bague de tous les jours sans trop d'inquiétude.",
      },
      {
        kind: 'p',
        text: "Mieux encore : contrairement au rubis, au saphir ou à l'émeraude, presque toujours chauffés ou huilés, la grande majorité des rhodolites sont naturelles, sans aucun traitement. Ce qu'on voit est ce qu'elle est. On la trouve surtout en Afrique de l'Est, la vallée de l'Umba, en Tanzanie, en livre parmi les plus belles, aux côtés du Mozambique, du Kenya, de Madagascar et du Sri Lanka. Et son prix reste accessible, ce qui ne gâche rien.",
      },
      { kind: 'h2', text: 'Pour quels bijoux ?' },
      {
        kind: 'p',
        text: "Sa solidité et sa couleur en font une pierre étonnamment polyvalente. Elle se prête à une bague portée chaque jour, à un pendentif, à une paire de boucles d'oreilles ; elle s'accorde aussi bien à une monture classique qu'à un dessin contemporain. À l'atelier, je l'aime pour ce qu'elle offre : une couleur chaleureuse et franche, une vraie robustesse, et cette discrétion des choses qui n'ont rien à prouver. Si vous voulez la découvrir, passez la voir, ces roses-là se regardent mieux en vrai que sur un écran.",
      },
    ],
    closingQuote: {
      text: "Les plus belles pierres ne sont pas toujours les plus connues. Il suffit parfois de regarder celle qu'on avait oubliée.",
      cite: 'Emeline Le Ray, atelier Précieuse',
    },
  },
  {
    slug: 'bague-portee-au-quotidien',
    title: 'Portée au quotidien : les gestes qui comptent',
    excerpt:
      "Entretien, rangement, habitudes. Tout ce qu'il faut savoir pour garder votre bague intacte des années.",
    category: 'Guides',
    date: '4 mars 2026',
    readTime: '4 min',
    image: '/images/real/bague-main-chaise-aurore.webp',
    imageAlt:
      'Bague en or 18 carats portée à la main, atelier Précieuse, Bordeaux',
    lede: "Une bague faite pour être portée n'a pas besoin de précautions d'orfèvre, mais de quelques bons réflexes. Voici les gestes simples qui la garderont belle, longtemps.",
    body: [
      { kind: 'h2', text: 'La nettoyer, tout en douceur' },
      {
        kind: 'p',
        text: "La plupart du temps, si une bague paraît terne, ce n'est pas l'or qui a changé : ce sont les petits dépôts du quotidien, crème pour les mains, savon, poussière, qui se sont accumulés et voilent la lumière. Bonne nouvelle : un nettoyage doux suffit presque toujours à la réveiller.",
      },
      {
        kind: 'p',
        text: "La méthode est simple. Faites tremper la bague une quinzaine de minutes dans un bol d'eau tiède, jamais bouillante, avec quelques gouttes de savon doux, type savon de Marseille ou liquide vaisselle neutre. Brossez ensuite délicatement avec une brosse à poils très souples, en insistant sous la pierre et à l'intérieur de l'anneau, là où la matière s'accumule. Rincez à l'eau claire (en pensant à fermer la bonde de l'évier !) et séchez aussitôt avec un chiffon doux.",
      },
      {
        kind: 'p',
        text: "Quelques interdits, en revanche. Pas de brosse dure, pas de dentifrice ni de bicarbonate : ces produits abrasifs rayent le métal et peuvent desceller une pierre. Et méfiez-vous des petits appareils à ultrasons vendus pour la maison : leurs vibrations peuvent faire bouger une pierre fragile ou mal tenue. C'est un geste à réserver à l'atelier, là où l'on vérifie d'abord le sertissage.",
      },
      { kind: 'h2', text: 'Attention selon la pierre' },
      {
        kind: 'p',
        text: "Toutes les gemmes ne supportent pas le même traitement. Le diamant, le rubis, le saphir ou le grenat sont robustes et se nettoient sans crainte à l'eau tiède savonneuse. D'autres, plus délicates, demandent davantage de tendresse : l'émeraude redoute la chaleur et les ultrasons, ne gardez jamais une bague émeraude au doigt en sortant un plat du four !, tandis que l'opale, la perle ou la turquoise, poreuses et sensibles, se contentent d'un simple chiffon humide. En cas de doute sur votre pierre, le plus sage est de s'en tenir au chiffon doux, ou de demander.",
      },
      { kind: 'h2', text: 'Savoir quand la retirer' },
      {
        kind: 'p',
        text: "Prendre soin d'une bague, c'est aussi savoir quand la mettre de côté. Une règle facile à retenir : « dernière mise, première retirée ». On enfile sa bague après la crème, le parfum et le maquillage, qui laissent un film gras sur le métal, et on la retire avant certaines activités.",
      },
      {
        kind: 'p',
        text: "Lesquelles ? Le sport et le port de charges lourdes, d'abord : l'or reste un métal tendre, et la pression peut déformer l'anneau, au risque de relâcher les pierres. Le ménage ensuite, à cause des produits chimiques. Et l'eau, surtout : le chlore des piscines attaque le métal et les fines soudures qui tiennent les griffes, l'eau de mer fragilise l'or et le sable le raye, sans compter que l'eau froide rétrécit les doigts, c'est souvent ainsi qu'une bague glisse et se perd.",
      },
      { kind: 'h2', text: 'Où la ranger' },
      {
        kind: 'p',
        text: "Entre deux ports, offrez-lui un endroit à elle. Rangez chaque bijou séparément, dans une pochette souple ou un compartiment doublé de tissu, à l'abri des chocs. Ce n'est pas un luxe : un diamant raye tout ce qu'il touche, y compris les autres pierres et l'or lui-même. Évitez aussi de laisser vos bijoux en plein soleil ou contre une source de chaleur, que certaines pierres supportent mal.",
      },
      { kind: 'h2', text: 'Un contrôle de temps en temps' },
      {
        kind: 'p',
        text: "Enfin, le geste le plus important, et le plus oublié. Une bague portée tous les jours mérite une visite chez le bijoutier une à deux fois par an. À la loupe, on vérifie que chaque griffe tient bien la pierre : un choc passé inaperçu peut en avoir déplacé une, et c'est ainsi qu'on finit par perdre une gemme. C'est d'ailleurs, chez les assureurs, le sinistre le plus fréquent.",
      },
      {
        kind: 'p',
        text: "Entre deux visites, vous pouvez faire un test tout simple : passez délicatement l'ongle sur les griffes. Si l'une accroche ou semble relevée, ou si vous sentez la pierre bouger, ne tardez pas. Et si un accident arrive, surtout : ne tentez pas de redresser l'anneau ni de recoller une pierre vous-même. Glissez le bijou, et la pierre, si vous l'avez, dans un sachet, et confiez-le-nous. À l'atelier, on resserre les griffes, on nettoie en profondeur, on rend au métal son éclat, et, pour l'or blanc, on rafraîchit le rhodium quand il s'est usé.",
      },
      { kind: 'h2', text: 'Les gestes qui comptent' },
      {
        kind: 'list',
        items: [
          'Nettoyer en douceur : eau tiède, savon doux, brosse souple, puis on sèche.',
          'Bannir les abrasifs (dentifrice, bicarbonate) et les ultrasons maison.',
          "Mettre sa bague en dernier, la retirer en premier (crème et parfum d'abord, bijoux ensuite).",
          "L'ôter pour le sport, le ménage, la piscine et la mer.",
          "La ranger seule, à l'abri des chocs et des pierres plus dures.",
          'La faire vérifier une à deux fois par an, et réagir vite si une pierre bouge.',
        ],
      },
      {
        kind: 'p',
        text: "Une bague, au fond, se patine comme une vie : elle prend de petites marques, et c'est très bien ainsi. Le tout est de veiller à l'essentiel, les pierres bien tenues, et de la porter, justement, sans trop y penser. C'est à cela qu'elle est faite.",
      },
    ],
    closingQuote: {
      text: "Une bague est faite pour vivre à votre doigt, pas pour dormir dans un écrin. C'est en la portant qu'elle devient vraiment la vôtre.",
      cite: 'Emeline Le Ray, atelier Précieuse',
    },
  },
]
