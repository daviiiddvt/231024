/**
 * ARCHIVO DE CONFIGURACIÓN Y CONTENIDO
 * Aquí puedes cambiar fácilmente fotos, frases, preguntas del trivial y cupones.
 */

const CONFIG = {
  // Nombres de la pareja
  partner1: "David",
  partner2: "Sofía",
  
  // Fecha en que comenzó su historia de amor: 23 de Octubre de 2024
  startDate: new Date("2024-10-23T00:00:00"),

  // Canción especial
  song: {
    title: "Emborracharme",
    artist: "Lori Meyers",
    youtubeId: "d9NF2edxy-M", // Video oficial en YouTube
    file: "assets/audio/emborracharme.mp3" // Archivo local opcional
  },

  // Recuerdos para la Línea de Tiempo
  timeline: [
    {
      date: "23 de Octubre, 2024",
      title: "El comienzo de nuestra historia",
      description: "El día exacto en que decidimos empezar este camino juntos. Lo que empezó como una chispa se convirtió en lo más bonito de mi vida.",
      image: "assets/images/foto1.jpg",
      position: "center 28%",
      tag: "El Inicio"
    },
    {
      date: "Nuestra Primera Cita",
      title: "Risas, nervios y miradas",
      description: "Esos nervios del principio que se esfumaron en cuanto sonreíste. Supe desde ese instante que eras alguien muy especial.",
      image: "assets/images/foto2.jpg",
      position: "center 15%",
      tag: "Inolvidable"
    },
    {
      date: "Nuestra Canción",
      title: "Entre acordes de Lori Meyers",
      description: "\"Emborracharme\" sonando de fondo y nosotros sintiendo que el mundo entero se detenía a nuestro alrededor.",
      image: "assets/images/foto3.jpg",
      position: "center 48%",
      tag: "Banda Sonora"
    },
    {
      date: "Nuestras Aventuras y Viajes",
      title: "Descubriendo lugares de tu mano",
      description: "Cualquier rincón del mundo se convierte en el mejor destino si estoy a tu lado. Gracias por cada viaje y escapada.",
      image: "assets/images/foto4.jpg",
      position: "center 52%",
      tag: "Aventuras"
    },
    {
      date: "Hoy y Siempre",
      title: "Celebrando nuestro amor",
      description: "Mirar atrás y ver todo lo que hemos compartido solo me confirma una cosa: quiero seguir viviendo cada momento contigo.",
      image: "assets/images/foto5.jpg",
      position: "center 38%",
      tag: "Aniversario"
    }
  ],

  // Galería de fotos Polaroid interactivas (al hacer clic revelan el mensaje detrás)
  polaroids: [
    {
      image: "assets/images/foto1.jpg",
      position: "center 28%",
      caption: "Tú y yo, siempre",
      secretNote: "Amo tu sonrisa cuando crees que no te estoy mirando."
    },
    {
      image: "assets/images/foto2.jpg",
      position: "center 15%",
      caption: "Bajo las luces de París",
      secretNote: "Ese beso y ese momento se quedaron grabados en mi corazón para siempre."
    },
    {
      image: "assets/images/foto3.jpg",
      position: "center 48%",
      caption: "Nuestras locuras",
      secretNote: "No hay nadie con quien me ría y cante más fuerte en este planeta."
    },
    {
      image: "assets/images/foto4.jpg",
      position: "center 52%",
      caption: "Cómplices",
      secretNote: "Gracias por ser mi lugar seguro, mi mayor apoyo y mi mejor compañera."
    },
    {
      image: "assets/images/foto5.jpg",
      position: "center 38%",
      caption: "Recorriendo el mundo",
      secretNote: "Cualquier lugar es perfecto si voy agarrado de tu mano."
    },
    {
      image: "assets/images/foto6.jpg",
      position: "center 30%",
      caption: "Instantes mágicos",
      secretNote: "Me encanta cuando nos miramos y entendemos todo sin decir una sola palabra."
    },
    {
      image: "assets/images/foto7.jpg",
      position: "center 30%",
      caption: "Tu sonrisa favorita",
      secretNote: "Haces que cualquier día gris se convierta en luz y alegría."
    },
    {
      image: "assets/images/foto8.jpg",
      position: "center 30%",
      caption: "Mil recuerdos juntos",
      secretNote: "Cada foto contigo es un tesoro que guardo en mi corazón para siempre."
    },
    {
      image: "assets/images/foto9.jpg",
      position: "center 30%",
      caption: "Siempre de tu mano",
      secretNote: "No importa el camino ni el destino mientras lo camine a tu lado."
    },
    {
      image: "assets/images/foto10.jpg",
      position: "center 30%",
      caption: "Nuestras mejores risas",
      secretNote: "Adoro cada ataque de risa tonta que nos da cuando estamos juntos."
    },
    {
      image: "assets/images/foto11.jpg",
      position: "center 30%",
      caption: "Un amor único",
      secretNote: "Gracias por hacerme sentir la persona más afortunada del mundo cada día."
    },
    {
      image: "assets/images/foto12.jpg",
      position: "center 30%",
      caption: "Pura complicidad",
      secretNote: "Eres mi compañera de vida, mi mejor amiga y el amor de mi vida."
    },
    {
      image: "assets/images/foto13.jpg",
      position: "center 30%",
      caption: "Hasta el infinito y más",
      secretNote: "Por todos los recuerdos que ya tenemos y por los millones que nos quedan por crear."
    }
  ],

  // Preguntas para la Trivia "¿Cuánto nos conocemos?"
  trivia: [
    {
      question: "¿Cuál es nuestra canción oficial que nunca dejamos de cantar?",
      options: [
        "Emborracharme - Lori Meyers",
        "Alta Fidelidad - Lori Meyers",
        "Mi Realidad - Lori Meyers",
        "¿A-ha - Take On Me?"
      ],
      correct: 0,
      loveMessage: "¡Exacto! Esa guitarra y esa letra nos definen como nadie."
    },
    {
      question: "¿Qué fecha comenzó oficialmente nuestra increíble aventura juntos?",
      options: [
        "15 de Septiembre de 2024",
        "23 de Octubre de 2024",
        "28 de Diciembre de 2024",
        "1 de Noviembre de 2024"
      ],
      correct: 1,
      loveMessage: "¡El mejor 23 de octubre del calendario! Grabado a fuego."
    },
    {
      question: "¿Quién de los dos se suele despistar o tardar más en arreglarse?",
      options: [
        "Definitivamente Sofía (la reina del glamour)",
        "Definitivamente David (buscando qué ponerse)",
        "¡Los dos por igual!",
        "Ninguno, somos relojes suizos"
      ],
      correct: 0, // Puedes cambiar el índice según vuestro caso
      loveMessage: "¡Jajaja! Vale la pena esperar cada segundo por verte brillar."
    },
    {
      question: "¿Cuál es el superpoder secreto de Sofía?",
      options: [
        "Hacer reír a David con cualquier tontería",
        "Tener siempre la razón (incluso cuando no)",
        "Tener los abrazos más curativos del universo",
        "¡Todas las anteriores son 100% reales!"
      ],
      correct: 3,
      loveMessage: "¡Sin duda! Tienes todos los superpoderes juntos."
    },
    {
      question: "Si tuviéramos un día libre entero para nosotros solos, ¿cuál sería el plan perfecto?",
      options: [
        "Manta, peli, mimos y comida rica en casa",
        "Escapada improvisada en coche con buena música",
        "Cena romántica y copas charlando horas enteras",
        "Cualquiera, mientras sea a tu lado"
      ],
      correct: 3,
      loveMessage: "¡Cualquier sitio es magia si estamos juntos!"
    }
  ],

  // Cupones para el "Rasca y Gana" del Amor
  scratchCoupons: [
    {
      title: "Vale por una Cena Romántica",
      description: "¡Tú eliges el restaurante o me pongo el delantal para cocinar tu plato favorito!",
      code: "CENA-DELUXE",
      icon: "fa-utensils"
    },
    {
      title: "Vale por un Masaje de 30 Minutos",
      description: "Con velitas, aceite aromático y música relajante. Cero estrés garantizado.",
      code: "MASAJE-VIP",
      icon: "fa-spa"
    },
    {
      title: "Vale por Tarde de Peli + Mimos",
      description: "Tú tienes el control total del mando, palomitas ilimitadas y ración extra de abrazos.",
      code: "PELI-MIMOS",
      icon: "fa-film"
    },
    {
      title: "Comodín del Amor Indiscutible",
      description: "Válido para lo que tú quieras pedirme en cualquier momento, sin objeciones.",
      code: "COMODIN-GOLD",
      icon: "fa-crown"
    }
  ],

  // Opciones para la Ruleta de Citas
  rouletteOptions: [
    "Cena romántica fuera",
    "Cocinar juntos algo nuevo",
    "Noche de manta y peli",
    "Paseo nocturno al aire libre",
    "Escapada sorpresa de finde",
    "Noche de cócteles y música",
    "Pícnic sorpresa",
    "Maratón de series y comida basura"
  ],

  // 100 Razones por las que te amo (puedes añadir o editar las que quieras)
  reasons: [
    "Por la forma en que tus ojos brillan cuando te entusiasmas con algo.",
    "Porque me haces reír incluso en mis días más complicados.",
    "Por cómo encaja tu mano perfectamente dentro de la mía.",
    "Por cantar a pleno pulmón con 'Emborracharme' de Lori Meyers en el coche.",
    "Por tu bondad infinita y el corazón tan grande que tienes.",
    "Por tus abrazos, que tienen la capacidad de detener el tiempo.",
    "Por ser mi cómplice, mi confidente y mi mejor amiga.",
    "Por la paciencia y el amor con el que me cuidas siempre.",
    "Por cada 'buenos días' y cada 'buenas noches' que me alegran el alma.",
    "Por cómo te ríes con mis tonterías aunque sean malas.",
    "Porque contigo todo se vuelve más fácil y bonito.",
    "Por tu valentía para afrontar cada reto que se te pone por delante.",
    "Por compartir tus sueños, tus miedos y tu vida conmigo.",
    "Porque eres mi hogar en cualquier parte del mundo.",
    "Simplemente por ser tú: única, hermosa y maravillosa."
  ],

  // Carta de amor del sobre lacrado
  letter: {
    salutation: "Mi querida Sofía,",
    body: `Parece que fue ayer cuando empezamos a escribir esta historia el 23 de octubre de 2024, y sin embargo, siento que te conozco y te amo de toda la vida.

En este tiempo has llenado mis días de luz, de carcajadas sinceras, de complicidad y de una paz que no cambiaría por nada. Me encanta cómo bailamos la vida juntos, cómo nos miramos y nos entendemos sin decir una sola palabra, y cómo cada instante a tu lado se convierte en un recuerdo imborrable.

Gracias por ser como eres, por tu ternura, por tu alegría contagiosa y por elegir caminar de mi mano cada día. Este es solo un pequeño rincón para recordarte lo infinitamente importante y especial que eres para mí.

Feliz aniversario, mi amor. Por este y por todos los que nos quedan por celebrar.`,
    closing: "Siempre tuyo,",
    signature: "David ❤️"
  }
};

