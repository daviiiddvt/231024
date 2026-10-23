/**
 * ARCHIVO DE CONFIGURACIÓN Y CONTENIDO
 * Aquí puedes cambiar fácilmente fotos, frases, preguntas del trivial y cupones.
 */

const CONFIG = {
  // Nombres de la pareja
  partner1: "Sofía",
  partner2: "David",
  
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
      title: "Una foto, una frase: \"Me caso\".",
      description: "Una noche de otoño en la que se nos antojó subir un puente para decirte cuatro cositas.",
      image: "assets/images/foto1.jpg",
      position: "center 28%",
      tag: "El Inicio"
    },
    {
      date: "Óleo sobre lienzo",
      title: "Risas en el Rivoli - Canito",
      description: "El autor quiso reflejar lo que su boca era incapaz de decir, pero su mirada era capaz de pintar",
      image: "assets/images/foto2.jpg",
      position: "center 15%",
      tag: "Inolvidable"
    },
    {
      date: "80'sss",
      title: "Entre copas con Luisa",
      description: "\"Y beber todo ese batidooo\". Para batido el que se había bebido Luisa esa noche. P.D.: Te echamos de menos Luisa",
      image: "assets/images/foto4.jpg",
      position: "center 48%",
      tag: "Banda Sonora"
    },
    {
      date: "<",
      title: "Amy Casavino, pero al final no",
      description: "London Eye o Ay con London?",
      image: "assets/images/foto5.jpg",
      position: "center 52%",
      tag: "Aventuras"
    },
    {
      date: "Hoy y Siempre",
      title: "Quiero mucho a esta pedazo de mostra",
      description: "Yo si que sigo aun borracho perdido, y gracias a dios me atrevo a contarte que yo quiero ser tu amante",
      image: "assets/images/foto3.jpg",
      position: "center 38%",
      tag: "Aniversario"
    }
  ],

  // Galería de fotos Polaroid interactivas (al hacer clic revelan el mensaje detrás)
  polaroids: [
    {
      image: "assets/images/foto6.jpg",
      position: "center 30%",
      caption: "Ahí na (nunca supe como se escribe)",
      secretNote: "Piensa en la cara de mi hermano haciéndonos la foto"
    },
    {
      image: "assets/images/foto7.jpg",
      position: "center 30%",
      caption: "Masbaratillassss",
      secretNote: "Para mascarillas, las FFP2"
    },
    {
      image: "assets/images/foto8.jpg",
      position: "center 30%",
      caption: "Verano, veranito",
      secretNote: "¿Sabes con qué rima verano?, con chorizo portuano. Que pena que no me guste"
    },
    {
      image: "assets/images/foto9.jpg",
      position: "center 30%",
      caption: "Sin comentarios",
      secretNote: "He dicho sin comentarios, ¿qué haces girando friki?"
    },
    {
      image: "assets/images/foto10.jpg",
      position: "center 30%",
      caption: "Mirror beach",
      secretNote: "Mira que eres guapa eh"
    },
    {
      image: "assets/images/foto11.jpg",
      position: "center 30%",
      caption: "Pecho palomo",
      secretNote: "Siempre me molará esta foto"
    },
    {
      image: "assets/images/foto12.jpg",
      position: "center 30%",
      caption: "Arenala y arenalo",
      secretNote: "Piensa en la cara de Irene haciéndonos la foto"
    },
    {
      image: "assets/images/foto13.jpg",
      position: "center 30%",
      caption: "Felicidades cariño",
      secretNote: "Vara cuerpo te hacía ese vestido muchacho"
    }
  ],

  // Preguntas para la Trivia "¿Cuánto nos conocemos?"
  trivia: [
    {
      question: "¿Cuál es nuestra canción oficial que nunca dejamos de cantar?",
      options: [
        "Emborracharme",
        "La morocha",
        "Un cachito de luz",
        "Esta vida loca"
      ],
      correct: 1,
      loveMessage: "Que alguien te saque a bailar o qué?"
    },
    {
      question: "Elige la fecha que tienes que elegir, anda",
      options: [
        "15 de Septiembre de 2024",
        "23 de Octubre de 2024",
        "28 de Diciembre de 2024",
        "1 de Noviembre de 2024"
      ],
      correct: 1,
      loveMessage: "Grabado a fuego niña"
    },
    {
      question: "¿Quién de los dos se suele despistar o tardar más en arreglarse?",
      options: [
        "Definitivamente Sofía (la reina del glamour)",
        "Definitivamente David (buscando qué ponerse)",
        "¡Los dos por igual!",
        "Ninguno, somos relojes suizos"
      ],
      correct: 1, // Puedes cambiar el índice según vuestro caso
      loveMessage: "¡Jajaja! No, enserio"
    },
    {
      question: "¿Cuál es el superpoder secreto de Sofía?",
      options: [
        "Hacer reír a David con cualquier tontería",
        "Tener siempre la razón (incluso cuando no)",
        "Chillar todavía más cuando le dices que no chille",
        "¡Todas las anteriores son 100% correctas!"
      ],
      correct: 3,
      loveMessage: "¡Sin duda! Eres perfecta chocho."
    },
    {
      question: "Si tuviéramos un día libre entero para nosotros solos, ¿cuál sería el plan perfecto?",
      options: [
        "Manta, peli, mimos y comida rica en casa",
        "Escapada improvisada en coche con buena música",
        "Cena romántica y copas charlando horas enteras",
        "Limpiar el baño"
      ],
      correct: 3,
      loveMessage: "Un buen baño limpio como le sienta a uno eh"
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
      title: "Comodín del Amor",
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
    "Por la manera que tienes de quereme",
    "Porque me encanta que seas mi mejor amiga",
    "Por darme la oportunidad de conocerte y conocer lo tuyo",
    "Porque si y punto",
    "Porque tenemos que decidir aun quien tiene más fuerza de los dos",
    "Porque me gusta quererte",
    "Porque quiero que mi hijo algún día te llame mamá",
    "Por la paciencia que tienes con una persona que no se acuerda de nada",
    "Por cada uno de tus 'buenos días' tan espontáneos",
    "Por cómo te ríes con mis tonterías aunque sean lamentables.",
    "Porque contigo apetece ser feliz",
    "Por elegirme a mí entre tantos aquella noche",
    "Por querer dormir conmigo cada uno de los días",
    "Porque eres mi familia",
    "Simplemente por ser tú: modelo, cantante y actriz."
  ],

  // Carta de amor del sobre lacrado
  letter: {
    salutation: "Mi querida Sofía,",
    body: `A veces no nos damos cuenta, que la verdadera felicidad está en las pequeñas cosas. A veces dejamos pasar de largo, acostumbrados por el paso del tiempo, momentos concretos para decirnos las cosas que de verdad importan. A veces solo necesitamos recordar lo que un día quisimos decir a alguien, a ese alguien que idealizabamos pensando en lo mucho que podrías llegar a quererle. Pues ese día es hoy, y el momento es ahora. Ahora es cuando debo pararme, despertar y darme cuenta de la mujer con la que tengo la suerte de compartir mis días, con la mujer con la que quiero estar, por imposición, por deseo y sobre todo porque te quiero. Te quiero más que a nadie he podido llegar a querer nunca, te quiero por castigo, por razón y causa. Porque dependo de tu sonrisa diaria para saber que todo está bien, que estoy en casa. Tanto buscar casas para tenerla justo delante. Siempre la he tenido delante, desde ese 23 o 12, o el día que tú elijas, me da igual, pero eligelo. Elígelo de la misma manera que me elegiste a mí, con esa firmeza, con la certeza de lanzarte al vacío sin importar no poder salir de él, para que al final, sin ni siquiera saberlo, llenaras tú el mío. 
    
    Hoy tengo la suerte de poder estar contigo, aquí sentados, frente a frente. Pero también tengo el deber, las ganas y el verdadero gusto de seguir queriéndote.
    
    Felicidades Sofía, te lo mereces.
    
    Un beso muy fuerte guapa.`,
    closing: "Gracias,",
    signature: "David ❤️"
  }
};

