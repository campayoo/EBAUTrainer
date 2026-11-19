// AUTO-GENERADO por tools/build-content.mjs a partir de content/*.yaml.
// NO lo edites a mano: edita los YAML y ejecuta "npm run build:content".
export default {
 "version": "65130bfe374a",
 "subjects": [
  {
   "id": "fis",
   "name": "Física",
   "short": "Física",
   "color": "#e8590c",
   "icon": "⚛",
   "description": "Campos gravitatorio y electromagnético, ondas, óptica y física moderna.",
   "blocks": [
    {
     "id": "fis.grav",
     "title": "A. Campo gravitatorio",
     "examSection": "A",
     "examWeight": 2,
     "topics": [
      {
       "id": "fis.grav.campo",
       "title": "Gravitación y campo gravitatorio",
       "units": [
        {
         "id": "fis.grav.campo.u01",
         "title": "Ley de gravitación universal",
         "minutes": 45,
         "difficulty": 2,
         "requires": [],
         "generators": [
          "grav-fuerza"
         ],
         "subjectId": "fis",
         "blockId": "fis.grav",
         "topicId": "fis.grav.campo",
         "examWeight": 2,
         "hasLesson": true
        },
        {
         "id": "fis.grav.campo.u02",
         "title": "Intensidad del campo gravitatorio",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "fis.grav.campo.u01"
         ],
         "generators": [
          "grav-campo-altura",
          "grav-superposicion"
         ],
         "subjectId": "fis",
         "blockId": "fis.grav",
         "topicId": "fis.grav.campo",
         "examWeight": 2,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "fis.grav.energia",
       "title": "Energía y potencial gravitatorio",
       "units": [
        {
         "id": "fis.grav.energia.u01",
         "title": "Potencial y energía potencial gravitatoria",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "fis.grav.campo.u02"
         ],
         "generators": [
          "grav-potencial",
          "grav-energia-potencial"
         ],
         "subjectId": "fis",
         "blockId": "fis.grav",
         "topicId": "fis.grav.energia",
         "examWeight": 2,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "fis.grav.orbitas",
       "title": "Movimiento de satélites y planetas",
       "units": [
        {
         "id": "fis.grav.orbitas.u01",
         "title": "Velocidad orbital",
         "minutes": 55,
         "difficulty": 3,
         "requires": [
          "fis.grav.campo.u02"
         ],
         "generators": [
          "grav-velocidad-orbital",
          "grav-periodo",
          "grav-kepler"
         ],
         "subjectId": "fis",
         "blockId": "fis.grav",
         "topicId": "fis.grav.orbitas",
         "examWeight": 2,
         "hasLesson": true
        },
        {
         "id": "fis.grav.orbitas.u02",
         "title": "Energía de satélites y velocidad de escape",
         "minutes": 55,
         "difficulty": 4,
         "requires": [
          "fis.grav.orbitas.u01",
          "fis.grav.energia.u01"
         ],
         "generators": [
          "grav-energia-satelite",
          "grav-escape"
         ],
         "subjectId": "fis",
         "blockId": "fis.grav",
         "topicId": "fis.grav.orbitas",
         "examWeight": 2,
         "hasLesson": true
        }
       ]
      }
     ]
    },
    {
     "id": "fis.em",
     "title": "B. Campo electromagnético",
     "examSection": "B",
     "examWeight": 3,
     "topics": [
      {
       "id": "fis.em.electrico",
       "title": "Campo eléctrico",
       "units": [
        {
         "id": "fis.em.electrico.u01",
         "title": "Ley de Coulomb y campo eléctrico",
         "minutes": 50,
         "difficulty": 3,
         "requires": [],
         "generators": [
          "coulomb-fuerza",
          "campo-electrico"
         ],
         "subjectId": "fis",
         "blockId": "fis.em",
         "topicId": "fis.em.electrico",
         "examWeight": 3,
         "hasLesson": true
        },
        {
         "id": "fis.em.electrico.u02",
         "title": "Potencial y energía eléctrica",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "fis.em.electrico.u01"
         ],
         "generators": [
          "potencial-electrico"
         ],
         "subjectId": "fis",
         "blockId": "fis.em",
         "topicId": "fis.em.electrico",
         "examWeight": 3,
         "hasLesson": true
        },
        {
         "id": "fis.em.electrico.u03",
         "title": "Flujo eléctrico y teorema de Gauss",
         "minutes": 45,
         "difficulty": 4,
         "requires": [
          "fis.em.electrico.u01"
         ],
         "generators": [
          "flujo-gauss"
         ],
         "subjectId": "fis",
         "blockId": "fis.em",
         "topicId": "fis.em.electrico",
         "examWeight": 3,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "fis.em.magnetico",
       "title": "Campo magnético",
       "units": [
        {
         "id": "fis.em.magnetico.u01",
         "title": "Fuerza de Lorentz y movimiento de cargas",
         "minutes": 55,
         "difficulty": 4,
         "requires": [
          "fis.em.electrico.u01"
         ],
         "generators": [
          "lorentz-radio"
         ],
         "subjectId": "fis",
         "blockId": "fis.em",
         "topicId": "fis.em.magnetico",
         "examWeight": 3,
         "hasLesson": true
        },
        {
         "id": "fis.em.magnetico.u02",
         "title": "Campos creados por corrientes y fuerza entre conductores",
         "minutes": 50,
         "difficulty": 4,
         "requires": [
          "fis.em.magnetico.u01"
         ],
         "generators": [
          "campo-hilo",
          "fuerza-conductores"
         ],
         "subjectId": "fis",
         "blockId": "fis.em",
         "topicId": "fis.em.magnetico",
         "examWeight": 3,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "fis.em.induccion",
       "title": "Inducción electromagnética",
       "units": [
        {
         "id": "fis.em.induccion.u01",
         "title": "Flujo magnético y ley de Faraday-Lenz",
         "minutes": 55,
         "difficulty": 4,
         "requires": [
          "fis.em.magnetico.u02"
         ],
         "generators": [
          "fem-inducida"
         ],
         "subjectId": "fis",
         "blockId": "fis.em",
         "topicId": "fis.em.induccion",
         "examWeight": 3,
         "hasLesson": true
        },
        {
         "id": "fis.em.induccion.u02",
         "title": "Alternadores",
         "minutes": 40,
         "difficulty": 3,
         "requires": [
          "fis.em.induccion.u01"
         ],
         "generators": [
          "transformador"
         ],
         "subjectId": "fis",
         "blockId": "fis.em",
         "topicId": "fis.em.induccion",
         "examWeight": 3,
         "hasLesson": true
        }
       ]
      }
     ]
    },
    {
     "id": "fis.ond",
     "title": "C. Vibraciones y ondas",
     "examSection": "C",
     "examWeight": 3,
     "topics": [
      {
       "id": "fis.ond.mas",
       "title": "Movimiento armónico simple",
       "units": [
        {
         "id": "fis.ond.mas.u01",
         "title": "MAS: cinemática, dinámica y energía",
         "minutes": 55,
         "difficulty": 3,
         "requires": [],
         "generators": [
          "mas-vmax",
          "mas-periodo-muelle"
         ],
         "subjectId": "fis",
         "blockId": "fis.ond",
         "topicId": "fis.ond.mas",
         "examWeight": 3,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "fis.ond.ondas",
       "title": "Ondas y sonido",
       "units": [
        {
         "id": "fis.ond.ondas.u01",
         "title": "Ecuación de las ondas armónicas",
         "minutes": 55,
         "difficulty": 4,
         "requires": [
          "fis.ond.mas.u01"
         ],
         "generators": [
          "onda-ecuacion",
          "onda-longitud"
         ],
         "subjectId": "fis",
         "blockId": "fis.ond",
         "topicId": "fis.ond.ondas",
         "examWeight": 3,
         "hasLesson": true
        },
        {
         "id": "fis.ond.ondas.u02",
         "title": "Sonido: intensidad y nivel sonoro",
         "minutes": 45,
         "difficulty": 3,
         "requires": [
          "fis.ond.ondas.u01"
         ],
         "generators": [
          "nivel-sonoro"
         ],
         "subjectId": "fis",
         "blockId": "fis.ond",
         "topicId": "fis.ond.ondas",
         "examWeight": 3,
         "hasLesson": true
        },
        {
         "id": "fis.ond.ondas.u03",
         "title": "Fenómenos ondulatorios",
         "minutes": 45,
         "difficulty": 3,
         "requires": [
          "fis.ond.ondas.u01"
         ],
         "generators": [
          "onda-longitud"
         ],
         "subjectId": "fis",
         "blockId": "fis.ond",
         "topicId": "fis.ond.ondas",
         "examWeight": 3,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "fis.ond.luz",
       "title": "Naturaleza de la luz",
       "units": [
        {
         "id": "fis.ond.luz.u01",
         "title": "Naturaleza de la luz y refracción",
         "minutes": 45,
         "difficulty": 3,
         "requires": [
          "fis.ond.ondas.u01"
         ],
         "generators": [
          "snell",
          "angulo-limite"
         ],
         "subjectId": "fis",
         "blockId": "fis.ond",
         "topicId": "fis.ond.luz",
         "examWeight": 3,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "fis.ond.optica",
       "title": "Óptica geométrica",
       "units": [
        {
         "id": "fis.ond.optica.u01",
         "title": "Espejos",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "fis.ond.luz.u01"
         ],
         "generators": [
          "espejo-concavo"
         ],
         "subjectId": "fis",
         "blockId": "fis.ond",
         "topicId": "fis.ond.optica",
         "examWeight": 3,
         "hasLesson": true
        },
        {
         "id": "fis.ond.optica.u02",
         "title": "Lentes delgadas",
         "minutes": 55,
         "difficulty": 4,
         "requires": [
          "fis.ond.optica.u01"
         ],
         "generators": [
          "lente-convergente",
          "potencia-lente"
         ],
         "subjectId": "fis",
         "blockId": "fis.ond",
         "topicId": "fis.ond.optica",
         "examWeight": 3,
         "hasLesson": true
        }
       ]
      }
     ]
    },
    {
     "id": "fis.mod",
     "title": "D. Física relativista, cuántica, nuclear y de partículas",
     "examSection": "D",
     "examWeight": 2,
     "topics": [
      {
       "id": "fis.mod.relatividad",
       "title": "Relatividad especial",
       "units": [
        {
         "id": "fis.mod.relatividad.u01",
         "title": "Relatividad especial: tiempo, longitud y energía",
         "minutes": 45,
         "difficulty": 3,
         "requires": [],
         "generators": [
          "relatividad-tiempo"
         ],
         "subjectId": "fis",
         "blockId": "fis.mod",
         "topicId": "fis.mod.relatividad",
         "examWeight": 2,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "fis.mod.cuantica",
       "title": "Física cuántica",
       "units": [
        {
         "id": "fis.mod.cuantica.u01",
         "title": "Efecto fotoeléctrico",
         "minutes": 50,
         "difficulty": 3,
         "requires": [],
         "generators": [
          "fotoelectrico"
         ],
         "subjectId": "fis",
         "blockId": "fis.mod",
         "topicId": "fis.mod.cuantica",
         "examWeight": 2,
         "hasLesson": true
        },
        {
         "id": "fis.mod.cuantica.u02",
         "title": "Hipótesis de De Broglie e incertidumbre",
         "minutes": 40,
         "difficulty": 3,
         "requires": [
          "fis.mod.cuantica.u01"
         ],
         "generators": [
          "de-broglie"
         ],
         "subjectId": "fis",
         "blockId": "fis.mod",
         "topicId": "fis.mod.cuantica",
         "examWeight": 2,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "fis.mod.nuclear",
       "title": "Física nuclear",
       "units": [
        {
         "id": "fis.mod.nuclear.u01",
         "title": "Radiactividad y ley de desintegración",
         "minutes": 50,
         "difficulty": 3,
         "requires": [],
         "generators": [
          "desintegracion"
         ],
         "subjectId": "fis",
         "blockId": "fis.mod",
         "topicId": "fis.mod.nuclear",
         "examWeight": 2,
         "hasLesson": true
        },
        {
         "id": "fis.mod.nuclear.u02",
         "title": "Energía de enlace",
         "minutes": 45,
         "difficulty": 3,
         "requires": [
          "fis.mod.nuclear.u01"
         ],
         "generators": [
          "energia-enlace"
         ],
         "subjectId": "fis",
         "blockId": "fis.mod",
         "topicId": "fis.mod.nuclear",
         "examWeight": 2,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "fis.mod.particulas",
       "title": "Física de partículas",
       "units": [
        {
         "id": "fis.mod.particulas.u01",
         "title": "Modelo estándar e interacciones fundamentales",
         "minutes": 35,
         "difficulty": 2,
         "requires": [],
         "generators": [
          "particulas-concepto"
         ],
         "subjectId": "fis",
         "blockId": "fis.mod",
         "topicId": "fis.mod.particulas",
         "examWeight": 2,
         "hasLesson": true
        }
       ]
      }
     ]
    }
   ]
  },
  {
   "id": "mat2",
   "name": "Matemáticas II",
   "short": "Mates II",
   "color": "#4f5bd5",
   "icon": "∑",
   "description": "Álgebra lineal, geometría en el espacio, análisis, integrales y probabilidad.",
   "blocks": [
    {
     "id": "mat2.alg",
     "title": "Álgebra lineal",
     "examSection": "algebra",
     "examWeight": 2.5,
     "topics": [
      {
       "id": "mat2.alg.matrices",
       "title": "Matrices",
       "units": [
        {
         "id": "mat2.alg.matrices.u01",
         "title": "Tipos de matrices y operaciones",
         "minutes": 45,
         "difficulty": 2,
         "requires": [],
         "generators": [
          "mat-combinacion"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.alg",
         "topicId": "mat2.alg.matrices",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.alg.matrices.u02",
         "title": "Producto de matrices y potencias",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "mat2.alg.matrices.u01"
         ],
         "generators": [
          "mat-producto"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.alg",
         "topicId": "mat2.alg.matrices",
         "examWeight": 2.5,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "mat2.alg.determinantes",
       "title": "Determinantes",
       "units": [
        {
         "id": "mat2.alg.determinantes.u01",
         "title": "Determinantes de orden 2 y 3",
         "minutes": 45,
         "difficulty": 2,
         "requires": [
          "mat2.alg.matrices.u02"
         ],
         "generators": [
          "det-2x2",
          "det-3x3"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.alg",
         "topicId": "mat2.alg.determinantes",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.alg.determinantes.u02",
         "title": "Propiedades y desarrollo por adjuntos",
         "minutes": 55,
         "difficulty": 3,
         "requires": [
          "mat2.alg.determinantes.u01"
         ],
         "generators": [
          "det-propiedades",
          "det-3x3"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.alg",
         "topicId": "mat2.alg.determinantes",
         "examWeight": 2.5,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "mat2.alg.rango-inversa",
       "title": "Rango y matriz inversa",
       "units": [
        {
         "id": "mat2.alg.rango-inversa.u01",
         "title": "Rango de una matriz",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "mat2.alg.determinantes.u02"
         ],
         "generators": [
          "rango-3x3"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.alg",
         "topicId": "mat2.alg.rango-inversa",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.alg.rango-inversa.u02",
         "title": "Matriz inversa y ecuaciones matriciales",
         "minutes": 55,
         "difficulty": 4,
         "requires": [
          "mat2.alg.determinantes.u02"
         ],
         "generators": [
          "inversa-2x2"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.alg",
         "topicId": "mat2.alg.rango-inversa",
         "examWeight": 2.5,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "mat2.alg.sistemas",
       "title": "Sistemas de ecuaciones",
       "units": [
        {
         "id": "mat2.alg.sistemas.u01",
         "title": "Sistemas lineales y método de Gauss",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "mat2.alg.rango-inversa.u01"
         ],
         "generators": [
          "sistema-gauss"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.alg",
         "topicId": "mat2.alg.sistemas",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.alg.sistemas.u02",
         "title": "Teorema de Rouché-Frobenius",
         "minutes": 50,
         "difficulty": 4,
         "requires": [
          "mat2.alg.sistemas.u01"
         ],
         "generators": [
          "rouche-parametro"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.alg",
         "topicId": "mat2.alg.sistemas",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.alg.sistemas.u03",
         "title": "Discusión de sistemas con parámetros",
         "minutes": 60,
         "difficulty": 5,
         "requires": [
          "mat2.alg.sistemas.u02"
         ],
         "generators": [
          "rouche-parametro",
          "sistema-gauss"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.alg",
         "topicId": "mat2.alg.sistemas",
         "examWeight": 2.5,
         "hasLesson": true
        }
       ]
      }
     ]
    },
    {
     "id": "mat2.geo",
     "title": "Geometría en el espacio",
     "examSection": "geometria",
     "examWeight": 2.5,
     "topics": [
      {
       "id": "mat2.geo.vectores",
       "title": "Vectores en el espacio",
       "units": [
        {
         "id": "mat2.geo.vectores.u01",
         "title": "Vectores y producto escalar",
         "minutes": 45,
         "difficulty": 2,
         "requires": [],
         "generators": [
          "producto-escalar",
          "angulo-vectores"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.geo",
         "topicId": "mat2.geo.vectores",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.geo.vectores.u02",
         "title": "Producto vectorial y producto mixto",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "mat2.geo.vectores.u01"
         ],
         "generators": [
          "area-triangulo",
          "volumen-tetraedro"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.geo",
         "topicId": "mat2.geo.vectores",
         "examWeight": 2.5,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "mat2.geo.rectas-planos",
       "title": "Rectas y planos",
       "units": [
        {
         "id": "mat2.geo.rectas-planos.u01",
         "title": "Ecuaciones de rectas y planos",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "mat2.geo.vectores.u02"
         ],
         "generators": [
          "plano-punto-normal"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.geo",
         "topicId": "mat2.geo.rectas-planos",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.geo.rectas-planos.u02",
         "title": "Posiciones relativas",
         "minutes": 55,
         "difficulty": 4,
         "requires": [
          "mat2.geo.rectas-planos.u01"
         ],
         "generators": [
          "posicion-planos"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.geo",
         "topicId": "mat2.geo.rectas-planos",
         "examWeight": 2.5,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "mat2.geo.metrica",
       "title": "Ángulos, distancias, áreas y volúmenes",
       "units": [
        {
         "id": "mat2.geo.metrica.u01",
         "title": "Ángulos entre rectas y planos",
         "minutes": 45,
         "difficulty": 3,
         "requires": [
          "mat2.geo.rectas-planos.u02"
         ],
         "generators": [
          "angulo-vectores"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.geo",
         "topicId": "mat2.geo.metrica",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.geo.metrica.u02",
         "title": "Distancias",
         "minutes": 55,
         "difficulty": 4,
         "requires": [
          "mat2.geo.rectas-planos.u02"
         ],
         "generators": [
          "distancia-punto-plano"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.geo",
         "topicId": "mat2.geo.metrica",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.geo.metrica.u03",
         "title": "Áreas y volúmenes",
         "minutes": 45,
         "difficulty": 3,
         "requires": [
          "mat2.geo.vectores.u02"
         ],
         "generators": [
          "area-triangulo",
          "volumen-tetraedro"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.geo",
         "topicId": "mat2.geo.metrica",
         "examWeight": 2.5,
         "hasLesson": true
        }
       ]
      }
     ]
    },
    {
     "id": "mat2.ana",
     "title": "Análisis: funciones y derivadas",
     "examSection": "analisis",
     "examWeight": 1.5,
     "topics": [
      {
       "id": "mat2.ana.limites",
       "title": "Límites y continuidad",
       "units": [
        {
         "id": "mat2.ana.limites.u01",
         "title": "Límites y continuidad",
         "minutes": 50,
         "difficulty": 3,
         "requires": [],
         "generators": [
          "limite-infinito",
          "limite-cero-cero"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.ana",
         "topicId": "mat2.ana.limites",
         "examWeight": 1.5,
         "hasLesson": true
        },
        {
         "id": "mat2.ana.limites.u02",
         "title": "Teorema de Bolzano",
         "minutes": 40,
         "difficulty": 3,
         "requires": [
          "mat2.ana.limites.u01"
         ],
         "generators": [
          "bolzano-intervalo"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.ana",
         "topicId": "mat2.ana.limites",
         "examWeight": 1.5,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "mat2.ana.derivadas",
       "title": "Derivadas y aplicaciones",
       "units": [
        {
         "id": "mat2.ana.derivadas.u01",
         "title": "Derivabilidad y reglas de derivación",
         "minutes": 55,
         "difficulty": 3,
         "requires": [
          "mat2.ana.limites.u01"
         ],
         "generators": [
          "derivada-punto",
          "recta-tangente"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.ana",
         "topicId": "mat2.ana.derivadas",
         "examWeight": 1.5,
         "hasLesson": true
        },
        {
         "id": "mat2.ana.derivadas.u02",
         "title": "Teoremas de Rolle y del valor medio",
         "minutes": 45,
         "difficulty": 4,
         "requires": [
          "mat2.ana.derivadas.u01"
         ],
         "generators": [
          "valor-medio"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.ana",
         "topicId": "mat2.ana.derivadas",
         "examWeight": 1.5,
         "hasLesson": true
        },
        {
         "id": "mat2.ana.derivadas.u03",
         "title": "Monotonía",
         "minutes": 60,
         "difficulty": 4,
         "requires": [
          "mat2.ana.derivadas.u01"
         ],
         "generators": [
          "extremo-cubica",
          "optimizacion"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.ana",
         "topicId": "mat2.ana.derivadas",
         "examWeight": 1.5,
         "hasLesson": true
        },
        {
         "id": "mat2.ana.derivadas.u04",
         "title": "Representación gráfica de funciones",
         "minutes": 60,
         "difficulty": 4,
         "requires": [
          "mat2.ana.derivadas.u03"
         ],
         "generators": [
          "extremo-cubica",
          "limite-infinito"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.ana",
         "topicId": "mat2.ana.derivadas",
         "examWeight": 1.5,
         "hasLesson": true
        }
       ]
      }
     ]
    },
    {
     "id": "mat2.int",
     "title": "Análisis: integrales",
     "examSection": "analisis",
     "examWeight": 1,
     "topics": [
      {
       "id": "mat2.int.primitivas",
       "title": "Primitivas",
       "units": [
        {
         "id": "mat2.int.primitivas.u01",
         "title": "Primitivas inmediatas",
         "minutes": 45,
         "difficulty": 3,
         "requires": [
          "mat2.ana.derivadas.u01"
         ],
         "generators": [
          "integral-definida"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.int",
         "topicId": "mat2.int.primitivas",
         "examWeight": 1,
         "hasLesson": true
        },
        {
         "id": "mat2.int.primitivas.u02",
         "title": "Integración por partes y cambio de variable",
         "minutes": 60,
         "difficulty": 4,
         "requires": [
          "mat2.int.primitivas.u01"
         ],
         "generators": [
          "integral-partes"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.int",
         "topicId": "mat2.int.primitivas",
         "examWeight": 1,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "mat2.int.definida",
       "title": "Integral definida",
       "units": [
        {
         "id": "mat2.int.definida.u01",
         "title": "Integral definida y teorema fundamental",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "mat2.int.primitivas.u01"
         ],
         "generators": [
          "integral-definida"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.int",
         "topicId": "mat2.int.definida",
         "examWeight": 1,
         "hasLesson": true
        },
        {
         "id": "mat2.int.definida.u02",
         "title": "Cálculo de áreas",
         "minutes": 55,
         "difficulty": 4,
         "requires": [
          "mat2.int.definida.u01"
         ],
         "generators": [
          "area-parabola"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.int",
         "topicId": "mat2.int.definida",
         "examWeight": 1,
         "hasLesson": true
        }
       ]
      }
     ]
    },
    {
     "id": "mat2.pro",
     "title": "Probabilidad y estadística",
     "examSection": "probabilidad",
     "examWeight": 2.5,
     "topics": [
      {
       "id": "mat2.pro.probabilidad",
       "title": "Probabilidad",
       "units": [
        {
         "id": "mat2.pro.probabilidad.u01",
         "title": "Probabilidad condicionada y total",
         "minutes": 50,
         "difficulty": 3,
         "requires": [],
         "generators": [
          "prob-total"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.pro",
         "topicId": "mat2.pro.probabilidad",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.pro.probabilidad.u02",
         "title": "Teorema de Bayes",
         "minutes": 45,
         "difficulty": 3,
         "requires": [
          "mat2.pro.probabilidad.u01"
         ],
         "generators": [
          "bayes"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.pro",
         "topicId": "mat2.pro.probabilidad",
         "examWeight": 2.5,
         "hasLesson": true
        }
       ]
      },
      {
       "id": "mat2.pro.distribuciones",
       "title": "Distribuciones de probabilidad",
       "units": [
        {
         "id": "mat2.pro.distribuciones.u01",
         "title": "Variable aleatoria y distribución binomial",
         "minutes": 50,
         "difficulty": 3,
         "requires": [
          "mat2.pro.probabilidad.u01"
         ],
         "generators": [
          "binomial-exacta"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.pro",
         "topicId": "mat2.pro.distribuciones",
         "examWeight": 2.5,
         "hasLesson": true
        },
        {
         "id": "mat2.pro.distribuciones.u02",
         "title": "Distribución normal",
         "minutes": 55,
         "difficulty": 3,
         "requires": [
          "mat2.pro.distribuciones.u01"
         ],
         "generators": [
          "normal-tipificar"
         ],
         "subjectId": "mat2",
         "blockId": "mat2.pro",
         "topicId": "mat2.pro.distribuciones",
         "examWeight": 2.5,
         "hasLesson": true
        }
       ]
      }
     ]
    }
   ]
  }
 ],
 "exams": {
  "fis": {
   "subject": "fis",
   "duration_minutes": 90,
   "official_url": "https://universitats.gva.es",
   "sections": [
    {
     "id": "A",
     "title": "Campo gravitatorio",
     "points": 2,
     "options": 1,
     "questions": 2,
     "generators": [
      "grav-campo-altura",
      "grav-velocidad-orbital",
      "grav-periodo",
      "grav-energia-satelite",
      "grav-escape",
      "grav-kepler",
      "grav-potencial",
      "grav-superposicion"
     ]
    },
    {
     "id": "B",
     "title": "Campo electromagnético",
     "points": 3,
     "options": 2,
     "questions": 3,
     "generators": [
      "coulomb-fuerza",
      "campo-electrico",
      "potencial-electrico",
      "flujo-gauss",
      "lorentz-radio",
      "campo-hilo",
      "fuerza-conductores",
      "fem-inducida",
      "transformador"
     ]
    },
    {
     "id": "C",
     "title": "Vibraciones y ondas",
     "points": 3,
     "options": 2,
     "questions": 3,
     "generators": [
      "mas-vmax",
      "mas-periodo-muelle",
      "onda-longitud",
      "onda-ecuacion",
      "nivel-sonoro",
      "snell",
      "angulo-limite",
      "espejo-concavo",
      "lente-convergente",
      "potencia-lente"
     ]
    },
    {
     "id": "D",
     "title": "Física relativista, cuántica, nuclear y de partículas",
     "points": 2,
     "options": 2,
     "questions": 2,
     "generators": [
      "relatividad-tiempo",
      "fotoelectrico",
      "de-broglie",
      "desintegracion",
      "energia-enlace",
      "particulas-concepto"
     ]
    }
   ]
  },
  "mat2": {
   "subject": "mat2",
   "duration_minutes": 90,
   "official_url": "https://universitats.gva.es",
   "sections": [
    {
     "id": "1",
     "title": "Probabilidad y estadística",
     "points": 2.5,
     "options": 1,
     "questions": 2,
     "generators": [
      "prob-total",
      "bayes",
      "binomial-exacta",
      "normal-tipificar"
     ]
    },
    {
     "id": "2",
     "title": "Álgebra",
     "points": 2.5,
     "options": 2,
     "questions": 2,
     "generators": [
      "det-3x3",
      "det-propiedades",
      "rango-3x3",
      "inversa-2x2",
      "sistema-gauss",
      "rouche-parametro",
      "mat-producto"
     ]
    },
    {
     "id": "3",
     "title": "Geometría",
     "points": 2.5,
     "options": 2,
     "questions": 2,
     "generators": [
      "producto-escalar",
      "angulo-vectores",
      "area-triangulo",
      "volumen-tetraedro",
      "plano-punto-normal",
      "distancia-punto-plano",
      "posicion-planos"
     ]
    },
    {
     "id": "4",
     "title": "Análisis",
     "points": 2.5,
     "options": 2,
     "questions": 2,
     "generators": [
      "limite-infinito",
      "limite-cero-cero",
      "derivada-punto",
      "recta-tangente",
      "optimizacion",
      "extremo-cubica",
      "integral-definida",
      "area-parabola",
      "integral-partes"
     ]
    }
   ]
  }
 },
 "lessons": {
  "fis.em.electrico.u01": {
   "id": "fis.em.electrico.u01",
   "objectives": [
    "Aplicar la ley de Coulomb y el principio de superposición.",
    "Calcular el campo eléctrico creado por cargas puntuales."
   ],
   "explanation": [
    {
     "title": "La ley de Coulomb",
     "body": "Dos cargas puntuales se atraen (signos opuestos) o se repelen (mismo signo) con una fuerza\n$$F = k\\frac{|q_1\\,q_2|}{r^2}, \\qquad k = 9\\cdot10^{9}\\ \\mathrm{N\\,m^2/C^2} = \\frac{1}{4\\pi\\varepsilon_0}$$\nEs la \"hermana\" de la ley de gravitación, con dos diferencias: puede ser **repulsiva**, y es muchísimo más intensa.\n\nMúltiplos habituales: $1\\ \\mu\\mathrm{C} = 10^{-6}$ C y $1\\ \\mathrm{nC} = 10^{-9}$ C.\n"
    },
    {
     "title": "El campo eléctrico",
     "body": "$$\\vec E = \\frac{\\vec F}{q}, \\qquad E = k\\frac{|Q|}{r^2}\\quad [\\mathrm{N/C}]$$\n- Una carga **positiva** crea un campo que **sale** de ella; una **negativa**, un campo que **entra**.\n- Sobre una carga $q$ actúa la fuerza $\\vec F = q\\vec E$. Si $q < 0$, la fuerza va en sentido contrario al campo.\n- Las **líneas de campo** salen de las cargas positivas y acaban en las negativas.\n"
    },
    {
     "title": "Principio de superposición",
     "body": "Con varias cargas, el campo total es la **suma vectorial** de los campos de cada una. Método:\n1. Haz un dibujo y pon un vector por cada carga (cuidado con el sentido según el signo).\n2. Calcula los módulos.\n3. Suma por componentes.\n\nPuedes verlo en el **Laboratorio** de Pauta (modo eléctrico).\n"
    }
   ],
   "examples": [
    {
     "title": "Campo en el punto medio",
     "statement": "Una carga $q_1 = +2\\ \\mu$C está en $x = 0$ y otra $q_2 = -3\\ \\mu$C en $x = 0{,}30$ m. Calcula el campo en el punto medio.\n",
     "steps": [
      "**Distancia de cada carga al punto medio:** 0,15 m.\n",
      "**Campo de $q_1$** (positiva: apunta hacia fuera, hacia $+x$): $E_1 = 9\\cdot10^9\\cdot\\dfrac{2\\cdot10^{-6}}{0{,}15^2} = 8{,}0\\cdot10^5\\ \\mathrm{N/C}$.\n",
      "**Campo de $q_2$** (negativa: apunta hacia ella, también hacia $+x$): $E_2 = 9\\cdot10^9\\cdot\\dfrac{3\\cdot10^{-6}}{0{,}15^2} = 1{,}2\\cdot10^6\\ \\mathrm{N/C}$.\n",
      "**Total:** los dos van en el mismo sentido, así que se suman: $E = 2{,}0\\cdot10^6\\ \\mathrm{N/C}$, hacia $+x$.\n"
     ],
     "result": "Con cargas de distinto signo, en el punto medio los campos se SUMAN. Con cargas del mismo signo, se restan.\n"
    }
   ],
   "summary": [
    "$F = k|q_1q_2|/r^2$, con $k = 9\\cdot10^9$ en el SI.",
    "$E = k|Q|/r^2$: sale de las cargas positivas y entra en las negativas.",
    "Varias cargas: suma vectorial (dibujo + componentes)."
   ],
   "common_errors": [
    "No pasar μC o nC a culombios, ni cm a metros.",
    "Sumar los módulos sin mirar los sentidos."
   ]
  },
  "fis.em.electrico.u02": {
   "id": "fis.em.electrico.u02",
   "objectives": [
    "Calcular el potencial y la energía potencial eléctrica.",
    "Relacionar trabajo, diferencia de potencial y movimiento de cargas."
   ],
   "explanation": [
    {
     "title": "Potencial y energía potencial",
     "body": "El campo eléctrico es conservativo, igual que el gravitatorio:\n$$E_p = k\\frac{q\\,Q}{r}, \\qquad V = \\frac{E_p}{q} = k\\frac{Q}{r}\\quad[\\mathrm{V} = \\mathrm{J/C}]$$\n- Aquí el **signo de las cargas se mantiene**: $V$ es positivo cerca de cargas positivas y negativo cerca de las negativas.\n- El potencial es un **escalar**: con varias cargas, se suman los potenciales con su signo.\n"
    },
    {
     "title": "Trabajo y diferencia de potencial",
     "body": "El trabajo que hace el campo al llevar una carga $q$ de $A$ a $B$:\n$$W_{A\\to B} = -\\Delta E_p = q\\,(V_A - V_B)$$\n- Las cargas **positivas** se mueven espontáneamente hacia **potenciales menores**; las negativas, hacia potenciales mayores.\n- En un campo **uniforme** (entre dos placas): $\\Delta V = E\\cdot d$.\n- Las **superficies equipotenciales** son perpendiculares a las líneas de campo; moverse por ellas no cuesta trabajo.\n"
    },
    {
     "title": "Aceleración de partículas",
     "body": "Una carga que parte del reposo y atraviesa una diferencia de potencial $\\Delta V$ gana energía cinética:\n$$\\frac12 m v^2 = |q|\\,\\Delta V$$\nEs el principio de los aceleradores de partículas. Unidad práctica: el **electronvoltio**, $1\\ \\mathrm{eV} = 1{,}6\\cdot10^{-19}$ J.\n"
    }
   ],
   "examples": [
    {
     "title": "Un electrón acelerado",
     "statement": "Un electrón parte del reposo y se acelera con una diferencia de potencial de 100 V. ¿Qué velocidad alcanza? ($m_e = 9{,}11\\cdot10^{-31}$ kg, $e = 1{,}6\\cdot10^{-19}$ C)\n",
     "steps": [
      "**Conservación de la energía:** $\\frac12 m v^2 = e\\,\\Delta V$.\n",
      "**Despejamos:** $v = \\sqrt{\\dfrac{2e\\,\\Delta V}{m}} = \\sqrt{\\dfrac{2\\cdot1{,}6\\cdot10^{-19}\\cdot100}{9{,}11\\cdot10^{-31}}}$.\n",
      "**Resultado:** $v \\approx 5{,}93\\cdot10^{6}\\ \\mathrm{m/s}$, y su energía cinética es de 100 eV.\n"
     ],
     "result": "Es un 2 % de la velocidad de la luz: todavía no hacen falta correcciones relativistas.\n"
    }
   ],
   "summary": [
    "$V = kQ/r$ (escalar, con signo); $E_p = qV$.",
    "$W_{A\\to B} = q(V_A - V_B)$; en un campo uniforme, $\\Delta V = Ed$.",
    "Partícula acelerada desde el reposo: $\\frac12mv^2 = |q|\\Delta V$."
   ],
   "common_errors": [
    "Quitar el signo de la carga al calcular el potencial.",
    "Sumar potenciales como vectores (se suman como números)."
   ]
  },
  "fis.em.electrico.u03": {
   "id": "fis.em.electrico.u03",
   "objectives": [
    "Calcular el flujo del campo eléctrico.",
    "Aplicar el teorema de Gauss a distribuciones con simetría."
   ],
   "explanation": [
    {
     "title": "Flujo eléctrico",
     "body": "El **flujo** mide cuántas líneas de campo atraviesan una superficie:\n$$\\Phi = \\vec E\\cdot\\vec S = E\\,S\\cos\\theta\\quad[\\mathrm{N\\,m^2/C}]$$\ndonde $\\theta$ es el ángulo entre el campo y el **vector superficie** (perpendicular a ella). El flujo es máximo si el campo atraviesa la superficie de frente, y nulo si es paralelo a ella.\n"
    },
    {
     "title": "El teorema de Gauss",
     "body": "El flujo a través de **cualquier superficie cerrada** solo depende de la carga que encierra:\n$$\\Phi = \\frac{Q_{\\text{int}}}{\\varepsilon_0}, \\qquad \\varepsilon_0 = 8{,}85\\cdot10^{-12}\\ \\mathrm{C^2/(N\\,m^2)}$$\nLas cargas que están fuera no aportan flujo neto: sus líneas entran y salen.\n"
    },
    {
     "title": "Aplicaciones con simetría",
     "body": "Eligiendo una superficie \"gaussiana\" adecuada:\n- **Esfera cargada** (o carga puntual), por fuera: $E = k\\dfrac{Q}{r^2}$, como si toda la carga estuviera en el centro.\n- **Conductor en equilibrio**: $E = 0$ en su interior, y la carga se reparte por la superficie (por eso funciona una jaula de Faraday).\n- **Plano infinito** con densidad $\\sigma$: $E = \\dfrac{\\sigma}{2\\varepsilon_0}$, uniforme.\n"
    }
   ],
   "examples": [
    {
     "title": "Esfera conductora cargada",
     "statement": "Una esfera conductora de radio 10 cm tiene una carga de 5 nC. Calcula el campo a 20 cm del centro y a 5 cm del centro.\n",
     "steps": [
      "**Fuera (r = 0,20 m):** por Gauss, como una carga puntual: $E = 9\\cdot10^9\\cdot\\dfrac{5\\cdot10^{-9}}{0{,}20^2} \\approx 1{,}1\\cdot10^{3}\\ \\mathrm{N/C}$ (1125 N/C).\n",
      "**Dentro (r = 0,05 m):** una superficie gaussiana interior no encierra carga (está toda en la superficie del conductor), así que $E = 0$.\n"
     ],
     "result": "Por eso, dentro de un coche (una \"jaula\" metálica) estás protegido si cae un rayo.\n"
    }
   ],
   "summary": [
    "$\\Phi = ES\\cos\\theta$.",
    "Gauss: $\\Phi = Q_{\\text{int}}/\\varepsilon_0$ en cualquier superficie cerrada.",
    "Esfera: por fuera como una carga puntual; dentro de un conductor, $E = 0$."
   ],
   "common_errors": [
    "Medir el ángulo con la superficie en vez de con su vector perpendicular.",
    "Incluir en $Q_{\\text{int}}$ cargas que están fuera de la superficie."
   ]
  },
  "fis.em.induccion.u01": {
   "id": "fis.em.induccion.u01",
   "objectives": [
    "Calcular el flujo magnético.",
    "Aplicar la ley de Faraday-Lenz para obtener la fem inducida y el sentido de la corriente."
   ],
   "explanation": [
    {
     "title": "Flujo magnético",
     "body": "$$\\Phi = \\vec B\\cdot\\vec S = B\\,S\\cos\\theta\\quad[\\mathrm{Wb} = \\mathrm{T\\,m^2}]$$\ndonde $\\theta$ es el ángulo entre $\\vec B$ y el vector superficie (perpendicular a la espira). Para una bobina de $N$ espiras, el flujo total es $N\\Phi$.\n"
    },
    {
     "title": "Ley de Faraday-Lenz",
     "body": "Cuando el flujo **cambia**, aparece una fuerza electromotriz (fem) inducida:\n$$\\varepsilon = -N\\frac{d\\Phi}{dt} \\qquad\\text{(valor medio: } \\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t}\\text{)}$$\nEl flujo puede cambiar porque cambie $B$, porque cambie el área $S$ o porque gire la espira (cambia $\\theta$).\n\n**Ley de Lenz (el signo −):** la corriente inducida circula en el sentido que **se opone al cambio** de flujo que la produce. Si el flujo aumenta, la corriente crea un campo en sentido contrario; si disminuye, a favor.\n"
    },
    {
     "title": "Varilla en movimiento",
     "body": "Una varilla de longitud $L$ que se mueve con velocidad $v$ perpendicular a un campo $B$ barre área, y se induce\n$$\\varepsilon = B\\,L\\,v$$\nCon una resistencia $R$ en el circuito, la corriente es $I = \\varepsilon/R$.\n"
    }
   ],
   "examples": [
    {
     "title": "Varilla deslizante",
     "statement": "Una varilla de 50 cm se desplaza a 4 m/s sobre dos raíles, perpendicular a un campo de 0,2 T. Calcula la fem inducida y la corriente si la resistencia del circuito es de 2 Ω.\n",
     "steps": [
      "**Fem:** $\\varepsilon = BLv = 0{,}2\\cdot0{,}5\\cdot4 = 0{,}4$ V.\n",
      "**Corriente:** $I = \\dfrac{\\varepsilon}{R} = \\dfrac{0{,}4}{2} = 0{,}2$ A.\n",
      "**Sentido (Lenz):** el área del circuito aumenta, así que el flujo aumenta, y la corriente circula de forma que su campo se oponga a ese aumento.\n"
     ],
     "result": "Además, sobre la varilla aparece una fuerza que la frena: para mantener la velocidad hay que empujar. Es la energía que acaba como corriente eléctrica.\n"
    }
   ],
   "summary": [
    "$\\Phi = BS\\cos\\theta$, en Wb.",
    "$\\varepsilon = -N\\,\\Delta\\Phi/\\Delta t$: solo hay fem si el flujo CAMBIA.",
    "Lenz: la corriente inducida se opone al cambio. Varilla: $\\varepsilon = BLv$."
   ],
   "common_errors": [
    "Pensar que un campo intenso pero constante induce corriente.",
    "Olvidar multiplicar por el número de espiras $N$."
   ]
  },
  "fis.em.induccion.u02": {
   "id": "fis.em.induccion.u02",
   "objectives": [
    "Explicar cómo un alternador produce corriente alterna.",
    "Aplicar la relación de transformación de un transformador."
   ],
   "explanation": [
    {
     "title": "El alternador",
     "body": "Una bobina de $N$ espiras y área $S$ gira con velocidad angular $\\omega$ dentro de un campo $B$. El ángulo varía, $\\theta = \\omega t$, así que\n$$\\Phi = NBS\\cos\\omega t \\;\\Rightarrow\\; \\varepsilon = NBS\\omega\\sin\\omega t$$\nEs una **corriente alterna** sinusoidal de valor máximo $\\varepsilon_0 = NBS\\omega$. En España la red es de **50 Hz**. Así funcionan las centrales eléctricas: algo hace girar la bobina (vapor, agua, viento).\n"
    },
    {
     "title": "El motor eléctrico",
     "body": "Es el proceso inverso: una corriente en una espira dentro de un campo magnético sufre fuerzas (ley de Laplace) que la hacen **girar**. Energía eléctrica → energía mecánica.\n"
    },
    {
     "title": "El transformador",
     "body": "Dos bobinas enrolladas en un mismo núcleo de hierro. La corriente alterna del primario crea un flujo variable que induce una fem en el secundario:\n$$\\frac{V_2}{V_1} = \\frac{N_2}{N_1} \\qquad\\text{y, si es ideal,}\\qquad V_1I_1 = V_2I_2$$\n- Solo funciona con **corriente alterna** (con continua el flujo no cambia).\n- La electricidad se transporta a **alta tensión**: para la misma potencia, la intensidad es menor y se pierde menos energía en los cables ($P_{\\text{pérdida}} = I^2R$).\n"
    }
   ],
   "examples": [
    {
     "title": "Fem máxima de un alternador",
     "statement": "Una bobina de 100 espiras de 0,02 m² gira a 50 Hz en un campo de 0,5 T. Calcula la fem máxima.\n",
     "steps": [
      "**Velocidad angular:** $\\omega = 2\\pi f = 2\\pi\\cdot50 \\approx 314$ rad/s.\n",
      "**Fem máxima:** $\\varepsilon_0 = NBS\\omega = 100\\cdot0{,}5\\cdot0{,}02\\cdot314 \\approx 314$ V.\n"
     ],
     "result": "Su expresión completa es $\\varepsilon(t) = 314\\sin(100\\pi t)$ V.\n"
    }
   ],
   "summary": [
    "Alternador: $\\varepsilon = NBS\\omega\\sin\\omega t$, con máximo $NBS\\omega$.",
    "Transformador: $V_2/V_1 = N_2/N_1$; solo con corriente alterna.",
    "Alta tensión en el transporte: menos intensidad, menos pérdidas."
   ],
   "common_errors": [
    "Usar la frecuencia $f$ en lugar de $\\omega = 2\\pi f$.",
    "Invertir la relación de espiras del transformador."
   ]
  },
  "fis.em.magnetico.u01": {
   "id": "fis.em.magnetico.u01",
   "objectives": [
    "Calcular la fuerza magnética sobre cargas y corrientes.",
    "Describir el movimiento circular de una carga en un campo magnético."
   ],
   "explanation": [
    {
     "title": "La fuerza de Lorentz",
     "body": "Sobre una carga $q$ que se mueve con velocidad $\\vec v$ en un campo magnético $\\vec B$:\n$$\\vec F = q\\,\\vec v\\times\\vec B, \\qquad F = |q|\\,v\\,B\\sin\\alpha$$\n- Es **perpendicular** a $\\vec v$ y a $\\vec B$ (regla de la mano derecha; si $q < 0$, sentido contrario).\n- Si la carga está quieta o se mueve paralela al campo, **no hay fuerza**.\n- Como es perpendicular a la velocidad, **no cambia el módulo** de la velocidad ni hace trabajo: solo curva la trayectoria.\n\nUnidad de $B$: el **tesla** (T).\n"
    },
    {
     "title": "Movimiento circular",
     "body": "Si $\\vec v \\perp \\vec B$, la fuerza de Lorentz hace de fuerza centrípeta:\n$$|q|vB = m\\frac{v^2}{r} \\;\\Rightarrow\\; r = \\frac{mv}{|q|B}, \\qquad T = \\frac{2\\pi m}{|q|B}$$\nEl periodo **no depende de la velocidad**: es la base del ciclotrón. El espectrómetro de masas separa isótopos porque el radio depende de la masa.\n"
    },
    {
     "title": "Fuerza sobre una corriente y selector de velocidades",
     "body": "- Sobre un conductor rectilíneo de longitud $L$ con corriente $I$ (**ley de Laplace**): $\\vec F = I\\,\\vec L\\times\\vec B$, es decir, $F = ILB\\sin\\alpha$.\n- **Selector de velocidades:** con un campo eléctrico y uno magnético perpendiculares, solo pasan sin desviarse las partículas con $qE = qvB$, es decir, $v = E/B$.\n"
    }
   ],
   "examples": [
    {
     "title": "Un protón en un campo magnético",
     "statement": "Un protón entra a $2\\cdot10^6$ m/s perpendicularmente a un campo de 0,5 T. Calcula el radio de su trayectoria. ($m_p = 1{,}67\\cdot10^{-27}$ kg, $e = 1{,}6\\cdot10^{-19}$ C)\n",
     "steps": [
      "**Fuerza magnética = fuerza centrípeta:** $r = \\dfrac{mv}{|q|B}$.\n",
      "**Sustitución:** $r = \\dfrac{1{,}67\\cdot10^{-27}\\cdot2\\cdot10^{6}}{1{,}6\\cdot10^{-19}\\cdot0{,}5} \\approx 4{,}2\\cdot10^{-2}$ m.\n"
     ],
     "result": "Un electrón con la misma velocidad giraría en sentido contrario y con un radio unas 1800 veces menor.\n"
    }
   ],
   "summary": [
    "$\\vec F = q\\vec v\\times\\vec B$: perpendicular a $\\vec v$; no cambia la rapidez.",
    "Órbita: $r = mv/(|q|B)$ y $T = 2\\pi m/(|q|B)$.",
    "Corriente: $F = ILB\\sin\\alpha$. Selector: $v = E/B$."
   ],
   "common_errors": [
    "Olvidar invertir el sentido de la fuerza para cargas negativas.",
    "Pensar que la fuerza magnética acelera la partícula (solo la desvía)."
   ]
  },
  "fis.em.magnetico.u02": {
   "id": "fis.em.magnetico.u02",
   "objectives": [
    "Calcular el campo magnético de un hilo, una espira y un solenoide.",
    "Calcular la fuerza entre dos conductores paralelos."
   ],
   "explanation": [
    {
     "title": "Las corrientes crean campos magnéticos",
     "body": "Lo descubrió Oersted en 1820: una corriente desvía una brújula. Con $\\mu_0 = 4\\pi\\cdot10^{-7}$ T·m/A:\n- **Hilo rectilíneo infinito**, a distancia $d$: $B = \\dfrac{\\mu_0 I}{2\\pi d}$. Las líneas son circunferencias alrededor del hilo (regla de la mano derecha: pulgar en el sentido de la corriente).\n- **Centro de una espira** de radio $R$: $B = \\dfrac{\\mu_0 I}{2R}$.\n- **Interior de un solenoide** de $N$ espiras y longitud $L$: $B = \\dfrac{\\mu_0 N I}{L}$, uniforme. Es un electroimán.\n"
    },
    {
     "title": "Fuerza entre conductores paralelos",
     "body": "Cada hilo está dentro del campo del otro, así que sufre una fuerza:\n$$\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$$\n- Corrientes en el **mismo sentido**: se **atraen**.\n- En **sentidos opuestos**: se **repelen**.\n\n(Justo al revés que las cargas eléctricas: conviene recordarlo así.)\n"
    },
    {
     "title": "Varias corrientes",
     "body": "El campo total es la **suma vectorial** de los campos de cada corriente. Dibuja con cuidado el sentido de cada uno con la regla de la mano derecha antes de sumar.\n"
    }
   ],
   "examples": [
    {
     "title": "Un solenoide",
     "statement": "Un solenoide de 500 espiras y 25 cm de longitud está recorrido por una corriente de 2 A. Calcula el campo en su interior.\n",
     "steps": [
      "**Fórmula:** $B = \\dfrac{\\mu_0 N I}{L}$.\n",
      "**Sustitución:** $B = \\dfrac{4\\pi\\cdot10^{-7}\\cdot500\\cdot2}{0{,}25} \\approx 5{,}0\\cdot10^{-3}$ T.\n"
     ],
     "result": "Es unas 100 veces el campo magnético terrestre (unos $5\\cdot10^{-5}$ T).\n"
    }
   ],
   "summary": [
    "Hilo: $B = \\mu_0I/(2\\pi d)$. Espira: $B = \\mu_0I/(2R)$. Solenoide: $B = \\mu_0NI/L$.",
    "$F/L = \\mu_0I_1I_2/(2\\pi d)$: mismo sentido se atraen; opuesto se repelen.",
    "Regla de la mano derecha para el sentido de $\\vec B$."
   ],
   "common_errors": [
    "Confundir el campo de una espira con el de un hilo (falta o sobra el $\\pi$).",
    "No pasar la longitud del solenoide a metros."
   ]
  },
  "fis.grav.campo.u01": {
   "id": "fis.grav.campo.u01",
   "objectives": [
    "Aplicar la ley de gravitación universal entre dos cuerpos.",
    "Entender cómo depende la fuerza de las masas y de la distancia.",
    "Medir siempre las distancias entre los CENTROS de los cuerpos."
   ],
   "explanation": [
    {
     "title": "La ley de Newton",
     "body": "Dos cuerpos cualesquiera se **atraen** con una fuerza proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia que los separa:\n$$F = G\\,\\frac{M\\,m}{r^2}, \\qquad G = 6{,}67\\cdot10^{-11}\\ \\mathrm{N\\,m^2/kg^2}$$\nLa fuerza va dirigida a lo largo de la recta que une ambos cuerpos y siempre es **atractiva**. En forma vectorial: $\\vec F = -G\\dfrac{Mm}{r^2}\\,\\vec u_r$, donde $\\vec u_r$ apunta desde $M$ hacia $m$ (el signo menos indica atracción).\n"
    },
    {
     "title": "¿Por qué no notamos que nos atraemos?",
     "body": "Porque $G$ es diminuta. Dos personas de 70 kg separadas 1 m se atraen con\n$$F = 6{,}67\\cdot10^{-11}\\cdot\\frac{70\\cdot70}{1^2} \\approx 3{,}3\\cdot10^{-7}\\ \\mathrm{N}$$\n¡menos que el peso de un grano de arena! La gravedad solo es apreciable cuando al menos uno de los cuerpos tiene una masa enorme, como un planeta.\n"
    },
    {
     "title": "Cuerpos esféricos y distancias",
     "body": "Una esfera (un planeta, una estrella) atrae como si toda su masa estuviera concentrada en su **centro**. Por eso, para un satélite a una altura $h$ sobre la superficie:\n$$r = R_T + h$$\nEs el error más frecuente de la PAU: usar $h$ en lugar de $R_T + h$.\n"
    },
    {
     "title": "Dependencia con la distancia y principio de superposición",
     "body": "La fuerza depende de $1/r^2$: si la distancia se **duplica**, la fuerza se divide entre **4**; si se triplica, entre 9.\n\nSi sobre un cuerpo actúan varias masas, la fuerza total es la **suma vectorial** de las fuerzas que ejerce cada una por separado (principio de superposición).\n"
    }
   ],
   "examples": [
    {
     "title": "La fuerza entre la Tierra y la Luna",
     "statement": "Calcula la fuerza con la que se atraen la Tierra y la Luna. Datos: $M_L = 7{,}35\\cdot10^{22}$ kg; distancia entre centros $d = 3{,}84\\cdot10^{8}$ m.",
     "steps": [
      "**Planteamiento:** ley de gravitación con $r = d$ (ya es la distancia entre centros).\n",
      "**Sustitución:**\n$$F = 6{,}67\\cdot10^{-11}\\cdot\\frac{5{,}97\\cdot10^{24}\\cdot7{,}35\\cdot10^{22}}{(3{,}84\\cdot10^{8})^2}$$\n",
      "**Resultado:** $F \\approx 1{,}98\\cdot10^{20}\\ \\mathrm{N}$.\n"
     ],
     "result": "Por la tercera ley de Newton, la Luna atrae a la Tierra con una fuerza igual y de sentido contrario."
    }
   ],
   "practice": [
    {
     "id": "fis.grav.campo.u01.p1",
     "kind": "numeric",
     "statement": "Dos esferas de 50 kg y 80 kg tienen sus centros separados 0,5 m. ¿Con qué fuerza se atraen? Dato: $G = 6{,}67\\cdot10^{-11}\\ \\mathrm{N\\,m^2/kg^2}$.",
     "answer": {
      "value": 0.0000010672,
      "unit": "N"
     },
     "check": "6.67e-11 * 50 * 80 / 0.5**2",
     "hints": [
      "Aplica directamente la ley de gravitación.",
      "$F = G\\dfrac{m_1 m_2}{r^2}$",
      "$r^2 = 0{,}25\\ \\mathrm{m^2}$"
     ],
     "solution": "$F = 6{,}67\\cdot10^{-11}\\cdot\\dfrac{50\\cdot80}{0{,}5^2} = \\boxed{1{,}07\\cdot10^{-6}\\ \\mathrm{N}}$"
    },
    {
     "id": "fis.grav.campo.u01.p2",
     "kind": "choice",
     "statement": "Si la distancia entre dos cuerpos se duplica, la fuerza gravitatoria entre ellos...",
     "options": [
      {
       "text": "se divide entre 4"
      },
      {
       "text": "se divide entre 2",
       "why": "La fuerza depende de $1/r^2$, no de $1/r$."
      },
      {
       "text": "se duplica",
       "why": "Al alejarse, la atracción disminuye."
      },
      {
       "text": "no cambia",
       "why": "Sí depende de la distancia, y mucho."
      }
     ],
     "correct": 0,
     "hints": [
      "Fíjate en el exponente de $r$.",
      "$F \\propto 1/r^2$",
      "Si $r \\to 2r$, entonces $r^2 \\to 4r^2$."
     ],
     "solution": "Como $F \\propto 1/r^2$, al duplicar $r$ la fuerza se divide entre $2^2 = 4$."
    },
    {
     "id": "fis.grav.campo.u01.p3",
     "kind": "numeric",
     "statement": "Usando la ley de gravitación, calcula la fuerza con la que la Tierra atrae a una persona de 70 kg situada en su superficie. Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": 686.94,
      "unit": "N"
     },
     "check": "6.67e-11 * 5.97e24 * 70 / 6.37e6**2",
     "hints": [
      "En la superficie, la distancia al centro es el radio terrestre.",
      "$F = G\\dfrac{M_T\\,m}{R_T^2}$",
      "$R_T^2 = 4{,}06\\cdot10^{13}\\ \\mathrm{m^2}$"
     ],
     "solution": "$F = 6{,}67\\cdot10^{-11}\\cdot\\dfrac{5{,}97\\cdot10^{24}\\cdot70}{(6{,}37\\cdot10^6)^2} \\approx \\boxed{687\\ \\mathrm{N}}$. ¡Es su peso! ($70\\cdot9{,}81 \\approx 687$ N.)"
    }
   ],
   "test": [
    {
     "id": "fis.grav.campo.u01.t1",
     "kind": "choice",
     "statement": "Comparada con la fuerza que la Tierra ejerce sobre la Luna, la fuerza que la Luna ejerce sobre la Tierra es...",
     "options": [
      {
       "text": "igual en módulo y de sentido contrario"
      },
      {
       "text": "mucho menor, porque la Luna tiene menos masa",
       "why": "En la fórmula aparecen las DOS masas: el producto $Mm$ es el mismo."
      },
      {
       "text": "mucho mayor",
       "why": "Piensa en la tercera ley de Newton."
      },
      {
       "text": "nula",
       "why": "Toda masa atrae a cualquier otra masa."
      }
     ],
     "correct": 0,
     "hints": [
      "Tercera ley de Newton: acción y reacción.",
      "En $F = GMm/r^2$ aparecen las dos masas.",
      "Lo que cambia es el EFECTO (la aceleración), no la fuerza."
     ],
     "solution": "Son un par acción-reacción: **igual módulo y sentidos contrarios**. Lo que difiere es la aceleración que producen ($a = F/m$)."
    },
    {
     "id": "fis.grav.campo.u01.t2",
     "kind": "numeric",
     "statement": "Calcula la fuerza gravitatoria sobre un satélite de 1000 kg que orbita a 300 km de altura. Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": 8950.5,
      "unit": "N",
      "commonErrors": [
       {
        "value": 4424500,
        "message": "Has usado la altura como distancia. Debe ser $r = R_T + h$."
       }
      ]
     },
     "check": "6.67e-11 * 5.97e24 * 1000 / (6.37e6 + 3e5)**2",
     "hints": [
      "¿Desde dónde se mide la distancia?",
      "$r = R_T + h = 6{,}67\\cdot10^6$ m",
      "$F = GM_Tm/r^2$"
     ],
     "solution": "$F = 6{,}67\\cdot10^{-11}\\cdot\\dfrac{5{,}97\\cdot10^{24}\\cdot1000}{(6{,}67\\cdot10^6)^2} = \\boxed{8{,}95\\cdot10^{3}\\ \\mathrm{N}}$"
    },
    {
     "id": "fis.grav.campo.u01.t3",
     "kind": "numeric",
     "statement": "Si se triplican las dos masas y también la distancia entre ellas, ¿por qué número queda multiplicada la fuerza?",
     "answer": {
      "value": 1,
      "tolerance": {
       "absolute": 1e-9
      }
     },
     "check": "(3 * 3) / 3**2",
     "hints": [
      "Escribe la nueva fuerza con $3M$, $3m$ y $3r$.",
      "$F' = G\\dfrac{(3M)(3m)}{(3r)^2}$",
      "Simplifica: $9/9$."
     ],
     "solution": "$F' = G\\dfrac{9Mm}{9r^2} = F$: queda multiplicada por $\\boxed{1}$ (no cambia)."
    }
   ],
   "summary": [
    "$F = GMm/r^2$: atractiva, a lo largo de la recta que une los cuerpos.",
    "$r$ se mide entre CENTROS: para satélites, $r = R_T + h$.",
    "Doble distancia → cuarta parte de fuerza.",
    "Varias masas: suma vectorial (superposición)."
   ],
   "common_errors": [
    "Usar la altura $h$ en lugar de $R_T + h$.",
    "Olvidar pasar los km a metros.",
    "Pensar que el cuerpo con más masa ejerce más fuerza sobre el otro."
   ]
  },
  "fis.grav.campo.u02": {
   "id": "fis.grav.campo.u02",
   "objectives": [
    "Entender el concepto de campo y calcular la intensidad del campo gravitatorio.",
    "Calcular cómo varía $g$ con la altura.",
    "Aplicar el principio de superposición y hallar puntos de campo nulo."
   ],
   "explanation": [
    {
     "title": "¿Qué es un campo?",
     "body": "Una masa modifica el espacio que la rodea: cualquier otra masa que pongas allí notará una fuerza. Esa \"propiedad del espacio\" es el **campo gravitatorio**.\n\nSu **intensidad** $\\vec g$ es la fuerza por unidad de masa:\n$$\\vec g = \\frac{\\vec F}{m} = -G\\frac{M}{r^2}\\,\\vec u_r \\qquad\\Rightarrow\\qquad g = G\\frac{M}{r^2}$$\nSe mide en N/kg, que es lo mismo que m/s²: **la intensidad del campo es la aceleración de la gravedad**.\n"
    },
    {
     "title": "El campo de la Tierra y la altura",
     "body": "En la superficie, $g_0 = G\\dfrac{M_T}{R_T^2} \\approx 9{,}81\\ \\mathrm{N/kg}$. A una altura $h$:\n$$g = G\\frac{M_T}{(R_T + h)^2} = g_0\\,\\frac{R_T^2}{(R_T + h)^2}$$\nLa segunda forma es muy útil cuando el enunciado da $g_0$ en lugar de $G$ y $M_T$. Por ejemplo, a una altura igual al radio ($r = 2R_T$), $g = g_0/4$.\n"
    },
    {
     "title": "Líneas de campo",
     "body": "Se dibujan para visualizar el campo: son **tangentes** a $\\vec g$ en cada punto y, en el campo gravitatorio, son **radiales y van hacia la masa** (las masas son \"sumideros\" de campo). Donde las líneas están más juntas, el campo es más intenso.\n\nPuedes verlas en el visualizador de campos de Pauta.\n"
    },
    {
     "title": "Varias masas y puntos de campo nulo",
     "body": "El campo total es la **suma vectorial** de los campos de cada masa. Entre dos masas existe un punto donde los dos campos se anulan, porque tienen igual módulo y sentidos opuestos:\n$$G\\frac{m_1}{x^2} = G\\frac{m_2}{(d - x)^2}$$\nEse punto está siempre **más cerca de la masa menor**.\n"
    }
   ],
   "examples": [
    {
     "title": "El punto de campo nulo entre la Tierra y la Luna",
     "statement": "¿A qué distancia del centro de la Tierra se anula el campo gravitatorio creado por la Tierra y la Luna? Datos: $M_T/M_L = 81{,}2$; distancia Tierra-Luna $d = 3{,}84\\cdot10^8$ m.",
     "steps": [
      "**Planteamiento:** igualamos los módulos de ambos campos en un punto a distancia $x$ de la Tierra:\n$$\\frac{M_T}{x^2} = \\frac{M_L}{(d - x)^2} \\Rightarrow \\frac{x}{d - x} = \\sqrt{\\frac{M_T}{M_L}} = 9{,}01$$\n",
      "**Despejamos:** $x = 9{,}01(d - x) \\Rightarrow x = \\dfrac{9{,}01\\,d}{10{,}01}$.\n",
      "**Resultado:** $x \\approx 3{,}46\\cdot10^8$ m, es decir, a un 90 % del camino hacia la Luna.\n"
     ],
     "result": "Tiene sentido: el punto está mucho más cerca de la Luna, que es la masa menor."
    }
   ],
   "practice": [
    {
     "id": "fis.grav.campo.u02.p1",
     "kind": "numeric",
     "statement": "Calcula la intensidad del campo gravitatorio en la superficie terrestre. Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": 9.8134,
      "unit": "N/kg"
     },
     "check": "6.67e-11 * 5.97e24 / 6.37e6**2",
     "hints": [
      "En la superficie, $r = R_T$.",
      "$g_0 = G\\dfrac{M_T}{R_T^2}$",
      "$R_T^2 = 4{,}06\\cdot10^{13}\\ \\mathrm{m^2}$"
     ],
     "solution": "$g_0 = \\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}}{(6{,}37\\cdot10^6)^2} = \\boxed{9{,}81\\ \\mathrm{N/kg}}$"
    },
    {
     "id": "fis.grav.campo.u02.p2",
     "kind": "numeric",
     "statement": "En la superficie terrestre $g_0 = 9{,}8$ N/kg. ¿Cuánto vale $g$ a una altura sobre la superficie igual al radio terrestre?",
     "answer": {
      "value": 2.45,
      "unit": "N/kg",
      "commonErrors": [
       {
        "value": 4.9,
        "message": "La distancia al centro se duplica, pero $g$ depende de $1/r^2$: se divide entre 4, no entre 2."
       }
      ]
     },
     "check": "9.8 / 4",
     "hints": [
      "¿A qué distancia del centro está ese punto?",
      "$r = R_T + R_T = 2R_T$",
      "$g = g_0\\dfrac{R_T^2}{(2R_T)^2}$"
     ],
     "solution": "$g = 9{,}8\\cdot\\dfrac{R_T^2}{4R_T^2} = \\dfrac{9{,}8}{4} = \\boxed{2{,}45\\ \\mathrm{N/kg}}$"
    },
    {
     "id": "fis.grav.campo.u02.p3",
     "kind": "numeric",
     "statement": "Marte tiene una masa de $6{,}42\\cdot10^{23}$ kg y un radio de $3{,}39\\cdot10^{6}$ m. Calcula la gravedad en su superficie. Dato: $G = 6{,}67\\cdot10^{-11}\\ \\mathrm{N\\,m^2/kg^2}$.",
     "answer": {
      "value": 3.7262,
      "unit": "N/kg"
     },
     "check": "6.67e-11 * 6.42e23 / 3.39e6**2",
     "hints": [
      "Es la misma fórmula que para la Tierra.",
      "$g = GM/R^2$",
      "$R^2 = 1{,}15\\cdot10^{13}\\ \\mathrm{m^2}$"
     ],
     "solution": "$g = \\dfrac{6{,}67\\cdot10^{-11}\\cdot6{,}42\\cdot10^{23}}{(3{,}39\\cdot10^6)^2} = \\boxed{3{,}73\\ \\mathrm{N/kg}}$, unas 2,6 veces menos que en la Tierra."
    }
   ],
   "test": [
    {
     "id": "fis.grav.campo.u02.t1",
     "kind": "choice",
     "statement": "¿Cuál de estas unidades es equivalente a N/kg?",
     "options": [
      {
       "text": "m/s²"
      },
      {
       "text": "J/kg",
       "why": "J/kg es la unidad del potencial gravitatorio."
      },
      {
       "text": "N·m",
       "why": "Eso es una unidad de energía (o de momento de fuerza)."
      },
      {
       "text": "kg/m³",
       "why": "Eso es una densidad."
      }
     ],
     "correct": 0,
     "hints": [
      "Recuerda que 1 N = 1 kg·m/s².",
      "Divide entre kg.",
      "La intensidad del campo es una aceleración."
     ],
     "solution": "$1\\ \\mathrm{N/kg} = 1\\ \\dfrac{\\mathrm{kg\\,m/s^2}}{\\mathrm{kg}} = 1\\ \\mathrm{m/s^2}$."
    },
    {
     "id": "fis.grav.campo.u02.t2",
     "kind": "numeric",
     "statement": "¿A qué altura sobre la superficie (en km) el campo gravitatorio terrestre vale la novena parte que en la superficie? Dato: $R_T = 6370$ km.",
     "answer": {
      "value": 12740,
      "unit": "km",
      "tolerance": {
       "relative": 0.01
      },
      "commonErrors": [
       {
        "value": 19110,
        "message": "Esa es la distancia al CENTRO de la Tierra ($3R_T$). Te piden la altura sobre la superficie."
       }
      ]
     },
     "check": "2 * 6370",
     "hints": [
      "Si $g = g_0/9$, ¿cómo es $r$ comparado con $R_T$?",
      "$\\dfrac{R_T^2}{r^2} = \\dfrac19 \\Rightarrow r = 3R_T$",
      "La altura es $h = r - R_T$."
     ],
     "solution": "$r = 3R_T$, así que $h = 2R_T = \\boxed{12\\,740\\ \\mathrm{km}}$."
    },
    {
     "id": "fis.grav.campo.u02.t3",
     "kind": "choice",
     "statement": "En un punto cercano a un planeta, el vector intensidad de campo gravitatorio apunta...",
     "options": [
      {
       "text": "hacia el centro del planeta"
      },
      {
       "text": "alejándose del planeta",
       "why": "La gravedad siempre es atractiva."
      },
      {
       "text": "tangente a la superficie",
       "why": "Las líneas del campo gravitatorio de una esfera son radiales."
      },
      {
       "text": "depende de la masa que pongamos allí",
       "why": "El campo existe y tiene su dirección aunque no haya ninguna masa de prueba."
      }
     ],
     "correct": 0,
     "hints": [
      "¿Qué le pasa a un objeto que sueltas?",
      "La fuerza gravitatoria es atractiva.",
      "Las líneas de campo son radiales."
     ],
     "solution": "Apunta **hacia el centro** del planeta: las líneas de campo son radiales y entrantes."
    }
   ],
   "summary": [
    "$g = F/m = GM/r^2$; se mide en N/kg = m/s².",
    "Con la altura: $g = g_0 R_T^2/(R_T + h)^2$.",
    "Líneas de campo radiales hacia la masa.",
    "Varias masas: suma vectorial. El punto de campo nulo está más cerca de la masa menor."
   ],
   "common_errors": [
    "Pensar que el campo depende de la masa del objeto que lo \"siente\".",
    "Dividir entre 2 en vez de entre 4 al duplicar la distancia.",
    "Confundir la altura con la distancia al centro."
   ]
  },
  "fis.grav.energia.u01": {
   "id": "fis.grav.energia.u01",
   "objectives": [
    "Entender por qué la fuerza gravitatoria es conservativa.",
    "Calcular la energía potencial y el potencial gravitatorio.",
    "Calcular el trabajo necesario para mover una masa en un campo gravitatorio."
   ],
   "explanation": [
    {
     "title": "Una fuerza conservativa",
     "body": "El trabajo que hace la gravedad para llevar un cuerpo de un punto A a un punto B **no depende del camino**, solo de los puntos inicial y final. Las fuerzas que cumplen esto se llaman **conservativas**, y para ellas se puede definir una **energía potencial** tal que:\n$$W_{A\\to B} = -\\Delta E_p = E_{p,A} - E_{p,B}$$\n"
    },
    {
     "title": "Energía potencial gravitatoria",
     "body": "Tomando $E_p = 0$ en el infinito (donde ya no hay interacción):\n$$E_p = -G\\frac{M\\,m}{r}$$\nEs **siempre negativa**: el cuerpo está \"atrapado\" en el pozo gravitatorio. Al alejarse, $E_p$ **aumenta** (se acerca a 0).\n\nLa conocida $E_p = mgh$ solo es una aproximación válida cerca de la superficie, donde $g$ es casi constante.\n"
    },
    {
     "title": "El potencial gravitatorio",
     "body": "El **potencial** es la energía potencial por unidad de masa:\n$$V = \\frac{E_p}{m} = -G\\frac{M}{r}\\qquad[\\mathrm{J/kg}]$$\nEs un **escalar**, así que con varias masas basta con **sumar** los potenciales (sin vectores). Los puntos con el mismo potencial forman **superficies equipotenciales**: para una esfera, son esferas concéntricas.\n"
    },
    {
     "title": "Trabajo para mover una masa",
     "body": "El trabajo que hay que hacer **contra** el campo (trabajo externo) para llevar una masa de A a B es el aumento de su energía potencial:\n$$W_{ext} = \\Delta E_p = m\\,(V_B - V_A) = G M m\\left(\\frac{1}{r_A} - \\frac{1}{r_B}\\right)$$\nSi $r_B > r_A$ sale positivo: alejar un cuerpo de la Tierra cuesta energía.\n"
    }
   ],
   "examples": [
    {
     "title": "Subir un satélite",
     "statement": "¿Cuánta energía hay que darle a un satélite de 500 kg para subirlo desde la superficie terrestre hasta 600 km de altura (solo el aumento de energía potencial)?",
     "steps": [
      "**Radios:** $r_A = R_T = 6{,}37\\cdot10^6$ m y $r_B = R_T + h = 6{,}97\\cdot10^6$ m.\n",
      "**Fórmula:**\n$$\\Delta E_p = GM_Tm\\left(\\frac{1}{r_A} - \\frac{1}{r_B}\\right) = 6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}\\cdot500\\left(\\frac{1}{6{,}37\\cdot10^6} - \\frac{1}{6{,}97\\cdot10^6}\\right)$$\n",
      "**Resultado:** $\\Delta E_p \\approx 2{,}69\\cdot10^{9}$ J.\n"
     ],
     "result": "Con $mgh$ saldría $2{,}94\\cdot10^9$ J: un 9 % más, porque supone que $g$ no disminuye con la altura."
    }
   ],
   "practice": [
    {
     "id": "fis.grav.energia.u01.p1",
     "kind": "numeric",
     "statement": "Calcula el potencial gravitatorio en la superficie terrestre. Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": -62512000,
      "unit": "J/kg"
     },
     "check": "-6.67e-11 * 5.97e24 / 6.37e6",
     "hints": [
      "$V = -GM/r$",
      "En la superficie $r = R_T$.",
      "No olvides el signo negativo."
     ],
     "solution": "$V = -\\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}}{6{,}37\\cdot10^6} = \\boxed{-6{,}25\\cdot10^{7}\\ \\mathrm{J/kg}}$"
    },
    {
     "id": "fis.grav.energia.u01.p2",
     "kind": "numeric",
     "statement": "Calcula la energía potencial de un satélite de 1200 kg situado a 2000 km de altura. Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": -57089000000,
      "unit": "J"
     },
     "check": "-6.67e-11 * 5.97e24 * 1200 / (6.37e6 + 2e6)",
     "hints": [
      "$E_p = -GMm/r$",
      "$r = R_T + h = 8{,}37\\cdot10^6$ m",
      "Debe salir negativa."
     ],
     "solution": "$E_p = -\\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}\\cdot1200}{8{,}37\\cdot10^6} = \\boxed{-5{,}71\\cdot10^{10}\\ \\mathrm{J}}$"
    },
    {
     "id": "fis.grav.energia.u01.p3",
     "kind": "choice",
     "statement": "Al alejar un cuerpo de la Tierra, su energía potencial gravitatoria...",
     "options": [
      {
       "text": "aumenta (se hace menos negativa)"
      },
      {
       "text": "disminuye",
       "why": "Recuerda que es negativa: $-GMm/r$ se acerca a 0 cuando $r$ crece."
      },
      {
       "text": "no cambia",
       "why": "Depende de $r$."
      },
      {
       "text": "se hace positiva",
       "why": "Con el origen en el infinito, nunca llega a ser positiva."
      }
     ],
     "correct": 0,
     "hints": [
      "Mira la fórmula $E_p = -GMm/r$.",
      "¿Qué pasa con $1/r$ cuando $r$ aumenta?",
      "Por ejemplo, $-10$ es menor que $-5$."
     ],
     "solution": "Al crecer $r$, $-GMm/r$ se acerca a 0 desde abajo: la energía potencial **aumenta**. Por eso hay que hacer trabajo para alejarlo."
    }
   ],
   "test": [
    {
     "id": "fis.grav.energia.u01.t1",
     "kind": "numeric",
     "statement": "¿Qué trabajo hay que hacer para subir un cuerpo de 100 kg desde la superficie terrestre hasta una altura igual al radio terrestre? Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": 3125600000,
      "unit": "J",
      "commonErrors": [
       {
        "value": 6242700000,
        "message": "Eso sería con $mgh$ y $g$ constante. A estas alturas $g$ baja mucho: usa $\\Delta E_p = GMm(1/r_A - 1/r_B)$."
       }
      ]
     },
     "check": "6.67e-11 * 5.97e24 * 100 * (1/6.37e6 - 1/(2*6.37e6))",
     "hints": [
      "$W_{ext} = \\Delta E_p$",
      "$r_A = R_T$ y $r_B = 2R_T$",
      "$\\Delta E_p = GMm\\left(\\dfrac1{R_T} - \\dfrac1{2R_T}\\right) = \\dfrac{GMm}{2R_T}$"
     ],
     "solution": "$W = \\dfrac{GM_Tm}{2R_T} = \\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}\\cdot100}{2\\cdot6{,}37\\cdot10^6} = \\boxed{3{,}13\\cdot10^{9}\\ \\mathrm{J}}$"
    },
    {
     "id": "fis.grav.energia.u01.t2",
     "kind": "choice",
     "statement": "Con la expresión $E_p = -GMm/r$, ¿dónde vale cero la energía potencial gravitatoria?",
     "options": [
      {
       "text": "En el infinito"
      },
      {
       "text": "En la superficie de la Tierra",
       "why": "Eso es lo que se toma con $mgh$, pero no con $-GMm/r$."
      },
      {
       "text": "En el centro de la Tierra",
       "why": "Allí $r \\to 0$ y la fórmula ni siquiera es aplicable dentro del planeta."
      },
      {
       "text": "En ningún punto",
       "why": "Fíjate en el límite cuando $r \\to \\infty$."
      }
     ],
     "correct": 0,
     "hints": [
      "¿Para qué valor de $r$ se anula $-GMm/r$?",
      "Ningún valor finito.",
      "Piensa en el límite."
     ],
     "solution": "$E_p \\to 0$ cuando $r \\to \\infty$: el origen de energías está **en el infinito**."
    },
    {
     "id": "fis.grav.energia.u01.t3",
     "kind": "numeric",
     "statement": "Calcula la diferencia de potencial gravitatorio $V_B - V_A$ entre un punto B a una altura igual al radio terrestre y un punto A en la superficie. Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": 31256000,
      "unit": "J/kg"
     },
     "check": "-6.67e-11*5.97e24/(2*6.37e6) - (-6.67e-11*5.97e24/6.37e6)",
     "hints": [
      "$V = -GM/r$ en cada punto.",
      "$r_A = R_T$, $r_B = 2R_T$.",
      "$V_B - V_A = \\dfrac{GM}{2R_T}$"
     ],
     "solution": "$V_B - V_A = -\\dfrac{GM}{2R_T} + \\dfrac{GM}{R_T} = \\dfrac{GM}{2R_T} = \\boxed{3{,}13\\cdot10^{7}\\ \\mathrm{J/kg}}$ (positiva: B está a mayor potencial)."
    }
   ],
   "summary": [
    "La gravedad es conservativa: $W = -\\Delta E_p$.",
    "$E_p = -GMm/r$ y $V = -GM/r$, con el cero en el infinito.",
    "El potencial es escalar: con varias masas se suma sin vectores.",
    "Trabajo externo: $W_{ext} = m\\,\\Delta V$."
   ],
   "common_errors": [
    "Usar $mgh$ lejos de la superficie.",
    "Olvidar el signo negativo de $E_p$ y $V$.",
    "Sumar potenciales como si fueran vectores."
   ]
  },
  "fis.grav.orbitas.u01": {
   "id": "fis.grav.orbitas.u01",
   "objectives": [
    "Deducir la velocidad orbital igualando la fuerza gravitatoria a la centrípeta.",
    "Calcular periodos orbitales y aplicar la tercera ley de Kepler.",
    "Conocer las tres leyes de Kepler y el satélite geoestacionario."
   ],
   "explanation": [
    {
     "title": "La velocidad orbital",
     "body": "En una órbita circular, la fuerza gravitatoria es la que hace de **fuerza centrípeta**:\n$$G\\frac{M\\,m}{r^2} = m\\frac{v^2}{r}\\quad\\Rightarrow\\quad v = \\sqrt{\\frac{G M}{r}}$$\nLa masa del satélite $m$ se simplifica: **todos los satélites a la misma altura van a la misma velocidad**, sean grandes o pequeños. Y cuanto más lejos, **más despacio**.\n"
    },
    {
     "title": "El periodo y la tercera ley de Kepler",
     "body": "El periodo es el tiempo de una vuelta: $T = \\dfrac{2\\pi r}{v}$. Sustituyendo $v$:\n$$T^2 = \\frac{4\\pi^2}{G M}\\,r^3$$\nEsta es la **tercera ley de Kepler**: para todos los cuerpos que orbitan alrededor del mismo astro, $T^2/r^3$ es la misma constante. Muy útil para comparar dos órbitas sin conocer $G$ ni $M$:\n$$\\frac{T_1^2}{r_1^3} = \\frac{T_2^2}{r_2^3}$$\n"
    },
    {
     "title": "Las tres leyes de Kepler",
     "body": "1. **Órbitas elípticas:** los planetas describen elipses con el Sol en uno de sus focos.\n2. **Ley de las áreas:** el radio vector barre áreas iguales en tiempos iguales. Por eso el planeta va **más rápido en el perihelio** (más cerca del Sol) que en el afelio. Es consecuencia de la conservación del **momento angular**, ya que la fuerza gravitatoria es central.\n3. **Ley de los periodos:** $T^2 \\propto r^3$ (con $r$ el semieje mayor).\n"
    },
    {
     "title": "El satélite geoestacionario",
     "body": "Un satélite **geoestacionario** gira sobre el ecuador con el mismo periodo que la Tierra (24 h), así que desde el suelo parece quieto. Despejando $r$ de la tercera ley con $T = 86\\,400$ s:\n$$r = \\sqrt[3]{\\frac{G M_T T^2}{4\\pi^2}} \\approx 4{,}22\\cdot10^7\\ \\mathrm{m}$$\nEs decir, unos **35 900 km de altura**. Es donde están los satélites de televisión y meteorológicos.\n"
    }
   ],
   "examples": [
    {
     "title": "La Estación Espacial Internacional",
     "statement": "Un satélite orbita a 400 km de altura (como la ISS). Calcula su velocidad y su periodo.",
     "steps": [
      "**Radio de la órbita:** $r = 6{,}37\\cdot10^6 + 4{,}00\\cdot10^5 = 6{,}77\\cdot10^6$ m.\n",
      "**Velocidad:**\n$$v = \\sqrt{\\frac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}}{6{,}77\\cdot10^6}} \\approx 7{,}67\\cdot10^3\\ \\mathrm{m/s}$$\n",
      "**Periodo:** $T = \\dfrac{2\\pi r}{v} = \\dfrac{2\\pi\\cdot6{,}77\\cdot10^6}{7669} \\approx 5546\\ \\mathrm{s} \\approx 92{,}4$ min.\n"
     ],
     "result": "Unos 27 600 km/h: da una vuelta a la Tierra cada hora y media."
    }
   ],
   "practice": [
    {
     "id": "fis.grav.orbitas.u01.p1",
     "kind": "numeric",
     "statement": "Calcula la velocidad de un satélite en órbita circular a 1000 km de altura. Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": 7350.5,
      "unit": "m/s",
      "commonErrors": [
       {
        "value": 19955,
        "message": "Has usado $r = h$. El radio de la órbita es $R_T + h$."
       }
      ]
     },
     "check": "Math.sqrt(6.67e-11 * 5.97e24 / (6.37e6 + 1e6))",
     "hints": [
      "Fuerza gravitatoria = fuerza centrípeta.",
      "$v = \\sqrt{GM_T/r}$",
      "$r = 7{,}37\\cdot10^6$ m"
     ],
     "solution": "$v = \\sqrt{\\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}}{7{,}37\\cdot10^6}} = \\boxed{7{,}35\\cdot10^{3}\\ \\mathrm{m/s}}$"
    },
    {
     "id": "fis.grav.orbitas.u01.p2",
     "kind": "numeric",
     "statement": "Calcula la altura (en km) a la que orbita un satélite geoestacionario ($T = 24$ h). Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6370$ km.",
     "answer": {
      "value": 35857,
      "unit": "km",
      "tolerance": {
       "relative": 0.01
      },
      "commonErrors": [
       {
        "value": 42227,
        "message": "Ese es el radio de la órbita. Te piden la altura: resta el radio terrestre."
       }
      ]
     },
     "check": "(Math.cbrt(6.67e-11 * 5.97e24 * 86400**2 / (4 * Math.PI**2)) - 6.37e6) / 1000",
     "hints": [
      "Pasa el periodo a segundos: $T = 86\\,400$ s.",
      "Despeja $r$ de $T^2 = \\dfrac{4\\pi^2}{GM}r^3$.",
      "Al final, $h = r - R_T$."
     ],
     "solution": "$r = \\sqrt[3]{\\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}\\cdot86400^2}{4\\pi^2}} = 4{,}22\\cdot10^7$ m, así que $h = r - R_T \\approx \\boxed{35\\,900\\ \\mathrm{km}}$."
    },
    {
     "id": "fis.grav.orbitas.u01.p3",
     "kind": "choice",
     "statement": "Dos satélites orbitan a la misma altura, pero uno tiene el doble de masa que el otro. ¿Cómo son sus velocidades?",
     "options": [
      {
       "text": "Iguales"
      },
      {
       "text": "El de más masa va más rápido",
       "why": "La masa del satélite se simplifica al igualar fuerzas."
      },
      {
       "text": "El de más masa va más despacio",
       "why": "En $v = \\sqrt{GM/r}$ solo aparece la masa del planeta."
      },
      {
       "text": "El de más masa va el doble de rápido",
       "why": "Revisa la deducción: $m$ aparece a los dos lados."
      }
     ],
     "correct": 0,
     "hints": [
      "Mira la fórmula de la velocidad orbital.",
      "¿Aparece la masa del satélite?",
      "En $GMm/r^2 = mv^2/r$ la $m$ se cancela."
     ],
     "solution": "Son **iguales**: $v = \\sqrt{GM/r}$ no depende de la masa del satélite."
    }
   ],
   "test": [
    {
     "id": "fis.grav.orbitas.u01.t1",
     "kind": "numeric",
     "statement": "Calcula el periodo, en minutos, de un satélite en órbita circular a 600 km de altura. Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": 96.567,
      "unit": "min"
     },
     "check": "2 * Math.PI * Math.sqrt((6.37e6 + 6e5)**3 / (6.67e-11 * 5.97e24)) / 60",
     "hints": [
      "$T = 2\\pi\\sqrt{r^3/(GM)}$",
      "$r = 6{,}97\\cdot10^6$ m",
      "El resultado sale en segundos: divide entre 60."
     ],
     "solution": "$T = 2\\pi\\sqrt{\\dfrac{(6{,}97\\cdot10^6)^3}{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}}} = 5794\\ \\mathrm{s} = \\boxed{96{,}6\\ \\mathrm{min}}$"
    },
    {
     "id": "fis.grav.orbitas.u01.t2",
     "kind": "numeric",
     "statement": "Un planeta B orbita la misma estrella que un planeta A, pero a una distancia 4 veces mayor. ¿Por qué número queda multiplicado su periodo respecto al de A?",
     "answer": {
      "value": 8,
      "tolerance": {
       "absolute": 0.000001
      },
      "commonErrors": [
       {
        "value": 4,
        "message": "El periodo no es proporcional a la distancia: $T^2 \\propto r^3$."
       },
       {
        "value": 64,
        "message": "Eso es $T^2$. Falta hacer la raíz cuadrada."
       }
      ]
     },
     "check": "4**1.5",
     "hints": [
      "Tercera ley de Kepler.",
      "$\\dfrac{T_B^2}{T_A^2} = \\dfrac{r_B^3}{r_A^3} = 4^3 = 64$",
      "Ahora haz la raíz cuadrada."
     ],
     "solution": "$\\dfrac{T_B}{T_A} = \\sqrt{4^3} = \\sqrt{64} = \\boxed{8}$"
    },
    {
     "id": "fis.grav.orbitas.u01.t3",
     "kind": "choice",
     "statement": "Según la segunda ley de Kepler, un planeta en órbita elíptica...",
     "options": [
      {
       "text": "va más rápido cuando está más cerca del Sol"
      },
      {
       "text": "va siempre a la misma velocidad",
       "why": "Eso solo pasa en órbitas circulares."
      },
      {
       "text": "va más rápido cuando está más lejos del Sol",
       "why": "Para barrer la misma área estando lejos, necesita recorrer menos arco."
      },
      {
       "text": "tiene el mismo periodo que los demás planetas",
       "why": "El periodo depende del tamaño de la órbita (tercera ley)."
      }
     ],
     "correct": 0,
     "hints": [
      "Ley de las áreas: áreas iguales en tiempos iguales.",
      "Cerca del Sol, el radio vector es corto.",
      "Para barrer la misma área con un radio corto, hay que recorrer más arco."
     ],
     "solution": "Para barrer áreas iguales en tiempos iguales, el planeta va **más rápido en el perihelio**. Es la conservación del momento angular."
    }
   ],
   "summary": [
    "$v = \\sqrt{GM/r}$: no depende de la masa del satélite; más lejos, más despacio.",
    "$T^2 = \\dfrac{4\\pi^2}{GM}r^3$ (tercera ley de Kepler).",
    "Segunda ley: más rápido en el perihelio (se conserva el momento angular).",
    "Geoestacionario: $T = 24$ h, unos 35 900 km de altura."
   ],
   "common_errors": [
    "Usar $h$ en lugar de $r = R_T + h$.",
    "No pasar el periodo a segundos.",
    "Pensar que un satélite más pesado va más rápido."
   ]
  },
  "fis.grav.orbitas.u02": {
   "id": "fis.grav.orbitas.u02",
   "objectives": [
    "Calcular la energía cinética, potencial y mecánica de un satélite en órbita.",
    "Calcular la energía necesaria para lanzar un satélite o cambiarlo de órbita.",
    "Deducir y calcular la velocidad de escape."
   ],
   "explanation": [
    {
     "title": "La energía de un satélite en órbita",
     "body": "Usando $v^2 = GM/r$ (de la clase anterior):\n$$E_c = \\frac12 m v^2 = \\frac{GMm}{2r} \\qquad E_p = -\\frac{GMm}{r}$$\n$$E_m = E_c + E_p = -\\frac{GMm}{2r}$$\nFíjate: en una órbita circular $E_m = -E_c$ y $E_p = 2E_m$. Cuanto más alta es la órbita, **mayor** (menos negativa) es su energía mecánica.\n"
    },
    {
     "title": "Lanzar un satélite y cambiarlo de órbita",
     "body": "La energía que hay que **aportar** es la diferencia de energía mecánica entre el estado final y el inicial.\n- **Desde la superficie** (sin tener en cuenta la rotación terrestre), el satélite parte con $E_m = -\\dfrac{GMm}{R_T}$:\n  $$E_{lanz} = -\\frac{GMm}{2r} + \\frac{GMm}{R_T}$$\n- **De una órbita $r_1$ a otra $r_2$:**\n  $$\\Delta E = \\frac{GMm}{2}\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)$$\n"
    },
    {
     "title": "Velocidad de escape",
     "body": "Es la velocidad mínima con la que hay que lanzar un cuerpo para que **no vuelva nunca**, es decir, para que llegue al infinito con velocidad 0. Allí su energía mecánica es 0, así que:\n$$\\frac12 m v_e^2 - \\frac{GMm}{R} = 0 \\quad\\Rightarrow\\quad v_e = \\sqrt{\\frac{2GM}{R}}$$\nDesde la superficie terrestre, $v_e \\approx 11{,}2$ km/s. Tampoco depende de la masa del cuerpo. Es $\\sqrt{2}$ veces la velocidad de una órbita rasante.\n"
    },
    {
     "title": "¿Qué dice el signo de la energía mecánica?",
     "body": "- $E_m < 0$: el cuerpo está **ligado** al planeta (órbita cerrada: circunferencia o elipse).\n- $E_m = 0$: escapa justo, con trayectoria parabólica.\n- $E_m > 0$: escapa con velocidad sobrante (trayectoria hiperbólica).\n"
    }
   ],
   "examples": [
    {
     "title": "Subir un satélite de órbita",
     "statement": "¿Cuánta energía hay que darle a un satélite de 800 kg para pasarlo de una órbita a 400 km de altura a otra a 1000 km?",
     "steps": [
      "**Radios:** $r_1 = 6{,}77\\cdot10^6$ m y $r_2 = 7{,}37\\cdot10^6$ m.\n",
      "**Diferencia de energía mecánica:**\n$$\\Delta E = \\frac{GM_Tm}{2}\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right) = \\frac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}\\cdot800}{2}\\left(\\frac{1}{6{,}77\\cdot10^6} - \\frac{1}{7{,}37\\cdot10^6}\\right)$$\n",
      "**Resultado:** $\\Delta E \\approx 1{,}92\\cdot10^{9}$ J.\n"
     ],
     "result": "Es positiva: subir de órbita cuesta energía, aunque en la órbita alta el satélite vaya más despacio."
    }
   ],
   "practice": [
    {
     "id": "fis.grav.orbitas.u02.p1",
     "kind": "numeric",
     "statement": "Calcula la velocidad de escape desde la superficie terrestre. Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": 11181,
      "unit": "m/s",
      "commonErrors": [
       {
        "value": 7906.4,
        "message": "Esa es la velocidad orbital rasante. La de escape lleva un 2 dentro de la raíz."
       }
      ]
     },
     "check": "Math.sqrt(2 * 6.67e-11 * 5.97e24 / 6.37e6)",
     "hints": [
      "La energía mecánica debe ser 0 para llegar al infinito.",
      "$v_e = \\sqrt{2GM/R}$",
      "Desde la superficie, $R = R_T$."
     ],
     "solution": "$v_e = \\sqrt{\\dfrac{2\\cdot6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}}{6{,}37\\cdot10^6}} = \\boxed{1{,}12\\cdot10^{4}\\ \\mathrm{m/s}}$"
    },
    {
     "id": "fis.grav.orbitas.u02.p2",
     "kind": "numeric",
     "statement": "Calcula la energía mecánica de un satélite de 500 kg en órbita circular a 800 km de altura. Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": -13884000000,
      "unit": "J",
      "commonErrors": [
       {
        "value": -27768000000,
        "message": "Esa es la energía potencial. La mecánica es la mitad: $E_m = -GMm/(2r)$."
       }
      ]
     },
     "check": "-6.67e-11 * 5.97e24 * 500 / (2 * (6.37e6 + 8e5))",
     "hints": [
      "$E_m = E_c + E_p$ en órbita circular.",
      "$E_m = -\\dfrac{GMm}{2r}$",
      "$r = 7{,}17\\cdot10^6$ m"
     ],
     "solution": "$E_m = -\\dfrac{6{,}67\\cdot10^{-11}\\cdot5{,}97\\cdot10^{24}\\cdot500}{2\\cdot7{,}17\\cdot10^6} = \\boxed{-1{,}39\\cdot10^{10}\\ \\mathrm{J}}$"
    },
    {
     "id": "fis.grav.orbitas.u02.p3",
     "kind": "choice",
     "statement": "Un satélite tiene energía mecánica negativa. Eso significa que...",
     "options": [
      {
       "text": "está ligado al planeta y no escapará"
      },
      {
       "text": "está cayendo hacia el planeta",
       "why": "Una órbita estable también tiene $E_m < 0$."
      },
      {
       "text": "se ha calculado mal",
       "why": "Con el cero en el infinito, los cuerpos ligados tienen $E_m < 0$."
      },
      {
       "text": "escapará con velocidad sobrante",
       "why": "Eso ocurre con $E_m > 0$."
      }
     ],
     "correct": 0,
     "hints": [
      "¿Qué energía mecánica hace falta para llegar al infinito?",
      "Para escapar se necesita $E_m \\ge 0$.",
      "Si es negativa, no le llega."
     ],
     "solution": "$E_m < 0$ significa que el satélite está **ligado**: no tiene energía suficiente para escapar."
    }
   ],
   "test": [
    {
     "id": "fis.grav.orbitas.u02.t1",
     "kind": "numeric",
     "statement": "¿Qué energía hay que comunicar a un satélite de 1000 kg, en reposo en la superficie, para ponerlo en órbita circular a 600 km de altura? (Desprecia la rotación terrestre.) Datos: $G = 6{,}67\\cdot10^{-11}$, $M_T = 5{,}97\\cdot10^{24}$ kg, $R_T = 6{,}37\\cdot10^{6}$ m.",
     "answer": {
      "value": 33946000000,
      "unit": "J"
     },
     "check": "-6.67e-11*5.97e24*1000/(2*(6.37e6+6e5)) + 6.67e-11*5.97e24*1000/6.37e6",
     "hints": [
      "Energía aportada = $E_{m,\\,final} - E_{m,\\,inicial}$.",
      "En la superficie, en reposo: $E_m = -GMm/R_T$.",
      "En la órbita: $E_m = -GMm/(2r)$, con $r = 6{,}97\\cdot10^6$ m."
     ],
     "solution": "$E = -\\dfrac{GMm}{2r} + \\dfrac{GMm}{R_T} = -2{,}86\\cdot10^{10} + 6{,}25\\cdot10^{10} = \\boxed{3{,}39\\cdot10^{10}\\ \\mathrm{J}}$"
    },
    {
     "id": "fis.grav.orbitas.u02.t2",
     "kind": "numeric",
     "statement": "Calcula la velocidad de escape desde la superficie de la Luna. Datos: $M_L = 7{,}35\\cdot10^{22}$ kg, $R_L = 1{,}74\\cdot10^{6}$ m, $G = 6{,}67\\cdot10^{-11}\\ \\mathrm{N\\,m^2/kg^2}$.",
     "answer": {
      "value": 2373.8,
      "unit": "m/s"
     },
     "check": "Math.sqrt(2 * 6.67e-11 * 7.35e22 / 1.74e6)",
     "hints": [
      "Misma fórmula que para la Tierra.",
      "$v_e = \\sqrt{2GM_L/R_L}$",
      "$2GM_L = 9{,}80\\cdot10^{12}$"
     ],
     "solution": "$v_e = \\sqrt{\\dfrac{2\\cdot6{,}67\\cdot10^{-11}\\cdot7{,}35\\cdot10^{22}}{1{,}74\\cdot10^6}} = \\boxed{2{,}37\\cdot10^{3}\\ \\mathrm{m/s}}$"
    },
    {
     "id": "fis.grav.orbitas.u02.t3",
     "kind": "choice",
     "statement": "En una órbita circular, ¿qué relación hay entre la energía mecánica y la energía cinética?",
     "options": [
      {
       "text": "$E_m = -E_c$"
      },
      {
       "text": "$E_m = E_c$",
       "why": "La energía mecánica es negativa y la cinética positiva."
      },
      {
       "text": "$E_m = 2E_c$",
       "why": "Es $E_p$ la que vale $-2E_c$."
      },
      {
       "text": "$E_m = 0$",
       "why": "Eso sería justo la condición de escape."
      }
     ],
     "correct": 0,
     "hints": [
      "$E_c = \\dfrac{GMm}{2r}$",
      "$E_m = -\\dfrac{GMm}{2r}$",
      "Compara las dos expresiones."
     ],
     "solution": "$E_m = -\\dfrac{GMm}{2r} = -E_c$."
    }
   ],
   "summary": [
    "Órbita circular: $E_c = \\dfrac{GMm}{2r}$, $E_p = -\\dfrac{GMm}{r}$, $E_m = -\\dfrac{GMm}{2r}$.",
    "Energía aportada = $E_{m,final} - E_{m,inicial}$.",
    "Velocidad de escape: $v_e = \\sqrt{2GM/R}$ (11,2 km/s en la Tierra).",
    "$E_m < 0$: ligado. $E_m \\ge 0$: escapa."
   ],
   "common_errors": [
    "Usar la energía potencial en lugar de la mecánica.",
    "Olvidar la energía inicial del satélite en la superficie.",
    "Confundir la velocidad de escape con la orbital."
   ]
  },
  "fis.mod.cuantica.u01": {
   "id": "fis.mod.cuantica.u01",
   "objectives": [
    "Explicar el efecto fotoeléctrico con la hipótesis de los fotones.",
    "Calcular la energía cinética de los electrones, la frecuencia umbral y el potencial de frenado."
   ],
   "explanation": [
    {
     "title": "La crisis de la física clásica",
     "body": "Planck (1900) propuso que la energía se emite en **paquetes** o cuantos:\n$$E = h\\,f, \\qquad h = 6{,}63\\cdot10^{-34}\\ \\mathrm{J\\,s}$$\nEinstein (1905) fue más allá: la luz **está formada** por paquetes de energía, los **fotones**.\n"
    },
    {
     "title": "El efecto fotoeléctrico",
     "body": "Al iluminar un metal, puede arrancar electrones. Los experimentos mostraban algo que la teoría ondulatoria no explicaba:\n- Por debajo de una **frecuencia umbral** $f_0$ no se emiten electrones, por intensa que sea la luz.\n- La energía de los electrones depende de la **frecuencia**, no de la intensidad.\n- La intensidad solo aumenta el **número** de electrones.\n\nExplicación de Einstein: cada fotón entrega toda su energía a un electrón.\n$$hf = W_0 + E_{c,max}, \\qquad W_0 = hf_0$$\n$W_0$ es el **trabajo de extracción** del metal.\n"
    },
    {
     "title": "Potencial de frenado",
     "body": "Es la diferencia de potencial necesaria para frenar los electrones más rápidos:\n$$e\\,V_f = E_{c,max}$$\nAl representar $E_{c,max}$ frente a $f$ sale una recta de **pendiente $h$** que corta el eje de frecuencias en $f_0$.\n\nConversión útil: $1\\ \\mathrm{eV} = 1{,}6\\cdot10^{-19}$ J.\n"
    }
   ],
   "examples": [
    {
     "title": "Luz violeta sobre un metal",
     "statement": "Sobre un metal con $W_0 = 2{,}3$ eV incide luz de 400 nm. Calcula la energía del fotón, la energía cinética máxima, el potencial de frenado y la frecuencia umbral.\n",
     "steps": [
      "**Fotón:** $E = \\dfrac{hc}{\\lambda} = \\dfrac{6{,}63\\cdot10^{-34}\\cdot3\\cdot10^8}{4\\cdot10^{-7}} \\approx 4{,}97\\cdot10^{-19}$ J $\\approx 3{,}11$ eV.\n",
      "**Energía cinética:** $E_{c,max} = 3{,}11 - 2{,}3 \\approx 0{,}81$ eV, así que $V_f \\approx 0{,}81$ V.\n",
      "**Umbral:** $f_0 = \\dfrac{W_0}{h} = \\dfrac{2{,}3\\cdot1{,}6\\cdot10^{-19}}{6{,}63\\cdot10^{-34}} \\approx 5{,}55\\cdot10^{14}$ Hz.\n"
     ],
     "result": "Con luz roja (unos 700 nm, 1,8 eV por fotón) no saldría ningún electrón, por muy intensa que fuera.\n"
    }
   ],
   "summary": [
    "$E = hf$; $hf = W_0 + E_{c,max}$; $W_0 = hf_0$.",
    "La frecuencia decide si hay emisión; la intensidad, cuántos electrones.",
    "$eV_f = E_{c,max}$. 1 eV = 1,6·10⁻¹⁹ J."
   ],
   "common_errors": [
    "Mezclar julios y electronvoltios en la misma resta.",
    "Pensar que más intensidad da electrones más rápidos."
   ]
  },
  "fis.mod.cuantica.u02": {
   "id": "fis.mod.cuantica.u02",
   "objectives": [
    "Calcular la longitud de onda asociada a una partícula.",
    "Interpretar el principio de incertidumbre de Heisenberg."
   ],
   "explanation": [
    {
     "title": "La hipótesis de De Broglie (1924)",
     "body": "Si la luz (una onda) se comporta a veces como partícula, quizá las partículas se comporten como ondas:\n$$\\lambda = \\frac{h}{p} = \\frac{h}{m\\,v}$$\nSe confirmó en 1927 (Davisson y Germer): los electrones se **difractan** en un cristal, igual que los rayos X. Es la base del **microscopio electrónico**, que ve detalles mucho más pequeños que uno óptico.\n"
    },
    {
     "title": "¿Por qué no vemos ondas en una pelota?",
     "body": "Porque $h$ es diminuta: para objetos cotidianos, $\\lambda$ es tan pequeña que ningún efecto ondulatorio es observable. Solo importa para partículas con poca masa, como los electrones, cuya $\\lambda$ es comparable al tamaño de los átomos.\n"
    },
    {
     "title": "Principio de incertidumbre (Heisenberg, 1927)",
     "body": "No se puede conocer a la vez, con precisión arbitraria, la posición y el momento de una partícula:\n$$\\Delta x\\,\\Delta p \\ge \\frac{h}{4\\pi}$$\nNo es un problema de los aparatos de medida: es una propiedad de la naturaleza. Por eso, en el modelo cuántico del átomo, los electrones no tienen órbitas definidas sino **orbitales** (zonas de probabilidad).\n"
    }
   ],
   "examples": [
    {
     "title": "Electrón frente a pelota",
     "statement": "Calcula la longitud de onda de De Broglie de a) un electrón a $10^6$ m/s; b) una pelota de 0,15 kg a 40 m/s. ($m_e = 9{,}11\\cdot10^{-31}$ kg)\n",
     "steps": [
      "**a)** $\\lambda = \\dfrac{6{,}63\\cdot10^{-34}}{9{,}11\\cdot10^{-31}\\cdot10^{6}} \\approx 7{,}3\\cdot10^{-10}$ m, del orden del tamaño de un átomo.\n",
      "**b)** $\\lambda = \\dfrac{6{,}63\\cdot10^{-34}}{0{,}15\\cdot40} \\approx 1{,}1\\cdot10^{-34}$ m: ridículamente pequeña.\n"
     ],
     "result": "Por eso el comportamiento ondulatorio solo se nota en el mundo microscópico.\n"
    }
   ],
   "summary": [
    "$\\lambda = h/(mv)$: toda partícula tiene una onda asociada.",
    "Solo es apreciable para partículas muy ligeras (electrones).",
    "$\\Delta x\\,\\Delta p \\ge h/(4\\pi)$: límite fundamental, no instrumental."
   ],
   "common_errors": [
    "Usar la fórmula $\\lambda = c/f$ (solo vale para la luz) con un electrón.",
    "Interpretar la incertidumbre como un error de los aparatos."
   ]
  },
  "fis.mod.nuclear.u01": {
   "id": "fis.mod.nuclear.u01",
   "objectives": [
    "Conocer los tipos de radiactividad y escribir reacciones nucleares.",
    "Aplicar la ley de desintegración, el periodo de semidesintegración y la actividad."
   ],
   "explanation": [
    {
     "title": "Tipos de radiactividad",
     "body": "Los núcleos inestables emiten radiación para estabilizarse ($^{A}_{Z}\\mathrm{X}$: $A$ = nucleones, $Z$ = protones):\n- **Alfa (α)**: núcleo de helio $^4_2\\mathrm{He}$. $A$ baja 4 y $Z$ baja 2. Poco penetrante: la detiene una hoja de papel.\n- **Beta menos (β⁻)**: un neutrón se convierte en protón y emite un electrón (y un antineutrino). $A$ igual y $Z$ sube 1. La detiene una lámina de aluminio.\n- **Gamma (γ)**: fotones de alta energía. $A$ y $Z$ no cambian. Muy penetrante (plomo, hormigón).\n\nEn toda reacción nuclear se conservan $A$ y $Z$ (leyes de Soddy-Fajans).\n"
    },
    {
     "title": "Ley de desintegración",
     "body": "$$N = N_0\\,e^{-\\lambda t}$$\n- $\\lambda$: **constante de desintegración** (s⁻¹).\n- **Periodo de semidesintegración:** $T_{1/2} = \\dfrac{\\ln2}{\\lambda}$, el tiempo en que se desintegra la mitad. Equivalente: $N = N_0\\left(\\frac12\\right)^{t/T_{1/2}}$.\n- **Vida media:** $\\tau = 1/\\lambda$.\n- **Actividad:** $A = \\lambda N$, en **becquerelios** (1 Bq = 1 desintegración/s). Decrece igual que $N$.\n"
    },
    {
     "title": "Datación con carbono-14",
     "body": "Los seres vivos mantienen una proporción constante de C-14 mientras viven. Al morir, deja de renovarse y decae con $T_{1/2} = 5730$ años. Midiendo la fracción que queda, se calcula la edad:\n$$t = \\frac{T_{1/2}}{\\ln2}\\ln\\frac{N_0}{N}$$\n"
    }
   ],
   "examples": [
    {
     "title": "Datar un resto arqueológico",
     "statement": "Un hueso conserva el 30 % del C-14 que tenía en vida. ¿Qué antigüedad tiene? ($T_{1/2} = 5730$ años)\n",
     "steps": [
      "**Constante:** $\\lambda = \\dfrac{\\ln2}{5730}$ años⁻¹.\n",
      "**Despejamos de $N = N_0e^{-\\lambda t}$:** $t = \\dfrac{1}{\\lambda}\\ln\\dfrac{N_0}{N} = \\dfrac{5730}{\\ln2}\\ln\\dfrac{1}{0{,}3}$.\n",
      "**Resultado:** $t \\approx 9950$ años.\n"
     ],
     "result": "Comprobación aproximada: tras 2 periodos (11 460 años) quedaría el 25 %. El 30 % está algo antes, y cuadra.\n"
    }
   ],
   "summary": [
    "α: $A - 4$, $Z - 2$. β⁻: $Z + 1$. γ: sin cambios.",
    "$N = N_0e^{-\\lambda t}$, $T_{1/2} = \\ln2/\\lambda$, $A = \\lambda N$.",
    "Cada $T_{1/2}$, la cantidad se divide entre 2."
   ],
   "common_errors": [
    "Pensar que la desintegración es lineal: tras $2T_{1/2}$ queda $\\frac14$, no 0.",
    "Mezclar unidades de tiempo (años y segundos) en $\\lambda t$."
   ]
  },
  "fis.mod.nuclear.u02": {
   "id": "fis.mod.nuclear.u02",
   "objectives": [
    "Calcular el defecto de masa y la energía de enlace.",
    "Explicar por qué la fisión y la fusión liberan energía."
   ],
   "explanation": [
    {
     "title": "Defecto de masa y energía de enlace",
     "body": "¡Un núcleo pesa **menos** que sus protones y neutrones por separado! Esa diferencia es el **defecto de masa**:\n$$\\Delta m = Z\\,m_p + (A - Z)\\,m_n - M_{\\text{núcleo}}$$\nEsa masa se convirtió en energía al formarse el núcleo. Es la **energía de enlace**:\n$$E_e = \\Delta m\\,c^2, \\qquad 1\\ \\mathrm{u} \\equiv 931{,}5\\ \\mathrm{MeV}$$\n"
    },
    {
     "title": "Energía de enlace por nucleón",
     "body": "$E_e/A$ indica la **estabilidad** de un núcleo. Su gráfica crece rápidamente, tiene un máximo cerca del **hierro-56** (unos 8,8 MeV/nucleón) y después baja lentamente.\n- Los núcleos **ligeros** ganan estabilidad uniéndose: **fusión**.\n- Los núcleos **pesados** ganan estabilidad rompiéndose: **fisión**.\nEn los dos casos se libera energía, porque los productos están más ligados.\n"
    },
    {
     "title": "Fisión y fusión",
     "body": "- **Fisión:** un neutrón rompe un núcleo pesado (por ejemplo, $^{235}\\mathrm{U}$) en dos más ligeros, más 2 o 3 neutrones que pueden provocar una **reacción en cadena**. Libera unos 200 MeV por núcleo. Es la base de las centrales nucleares actuales, que generan residuos radiactivos.\n- **Fusión:** dos núcleos ligeros (isótopos del hidrógeno) se unen formando helio. Es la energía del Sol. Requiere temperaturas de millones de grados; proyectos como ITER intentan dominarla.\n"
    }
   ],
   "examples": [
    {
     "title": "El núcleo de helio",
     "statement": "Calcula la energía de enlace del $^4_2\\mathrm{He}$ y su energía por nucleón. ($m_p = 1{,}007276$ u, $m_n = 1{,}008665$ u, $M_{\\mathrm{He}} = 4{,}001506$ u)\n",
     "steps": [
      "**Defecto de masa:** $\\Delta m = 2\\cdot1{,}007276 + 2\\cdot1{,}008665 - 4{,}001506 = 0{,}030376$ u.\n",
      "**Energía de enlace:** $E_e = 0{,}030376\\cdot931{,}5 \\approx 28{,}3$ MeV.\n",
      "**Por nucleón:** $\\dfrac{28{,}3}{4} \\approx 7{,}07$ MeV/nucleón.\n"
     ],
     "result": "Es un valor muy alto para un núcleo tan ligero: el helio-4 es especialmente estable, y por eso sale \"entero\" en la desintegración alfa.\n"
    }
   ],
   "summary": [
    "$\\Delta m = Zm_p + Nm_n - M$; $E_e = \\Delta m\\,c^2$ (1 u = 931,5 MeV).",
    "$E_e/A$ máxima cerca del Fe-56.",
    "Fisión (núcleos pesados) y fusión (ligeros) liberan energía."
   ],
   "common_errors": [
    "Restar las masas al revés (el defecto de masa es positivo).",
    "Confundir la energía de enlace total con la energía por nucleón."
   ]
  },
  "fis.mod.particulas.u01": {
   "id": "fis.mod.particulas.u01",
   "objectives": [
    "Clasificar las partículas elementales según el modelo estándar.",
    "Relacionar cada interacción fundamental con su partícula mediadora."
   ],
   "explanation": [
    {
     "title": "Las partículas de la materia (fermiones)",
     "body": "- **6 quarks:** up (u), down (d), charm, strange, top y bottom. Tienen carga fraccionaria: $+\\frac23 e$ (u) y $-\\frac13 e$ (d). Nunca se encuentran aislados.\n- **6 leptones:** electrón, muon, tau y sus tres neutrinos.\n\nLos quarks forman **hadrones**:\n- **Bariones** (3 quarks): protón (uud) y neutrón (udd).\n- **Mesones** (quark + antiquark): piones, kaones...\n\nCada partícula tiene su **antipartícula** (igual masa, carga opuesta): el positrón es el antielectrón.\n"
    },
    {
     "title": "Las interacciones y sus mediadores (bosones)",
     "body": "Las cuatro interacciones fundamentales, de más a menos intensa:\n1. **Fuerte:** une los quarks y mantiene el núcleo unido. Mediador: el **gluón**. Muy corto alcance.\n2. **Electromagnética:** entre cargas. Mediador: el **fotón**. Alcance infinito.\n3. **Débil:** responsable de la desintegración beta. Mediadores: los bosones **W⁺, W⁻ y Z⁰**.\n4. **Gravitatoria:** la más débil con diferencia. No está incluida en el modelo estándar (el gravitón es hipotético).\n\nEl **bosón de Higgs** (descubierto en el CERN en 2012) explica por qué algunas partículas tienen masa.\n"
    },
    {
     "title": "Aceleradores",
     "body": "Para estudiar estas partículas se hacen chocar protones o electrones a velocidades cercanas a la de la luz en **aceleradores** como el LHC del CERN (27 km de circunferencia). Usan campos eléctricos para acelerar y campos magnéticos para curvar la trayectoria: la física de los bloques B y D trabajando juntas.\n"
    }
   ],
   "examples": [
    {
     "title": "La carga del protón y del neutrón",
     "statement": "Comprueba con las cargas de los quarks que el protón (uud) tiene carga $+e$ y el neutrón (udd), carga 0.\n",
     "steps": [
      "**Protón:** $+\\frac23 + \\frac23 - \\frac13 = +1$, es decir, $+e$ ✓\n",
      "**Neutrón:** $+\\frac23 - \\frac13 - \\frac13 = 0$ ✓\n"
     ],
     "result": "En la desintegración β⁻, un quark d del neutrón se convierte en un quark u (mediante un bosón W⁻): el neutrón pasa a ser un protón.\n"
    }
   ],
   "summary": [
    "Materia: 6 quarks + 6 leptones. Protón uud; neutrón udd.",
    "Mediadores: gluón (fuerte), fotón (EM), W y Z (débil). Higgs: la masa.",
    "La gravedad no forma parte del modelo estándar."
   ],
   "common_errors": [
    "Pensar que el protón y el neutrón son partículas elementales.",
    "Confundir el mediador de la interacción débil (W y Z) con el de la fuerte (gluón)."
   ]
  },
  "fis.mod.relatividad.u01": {
   "id": "fis.mod.relatividad.u01",
   "objectives": [
    "Conocer los postulados de la relatividad especial.",
    "Calcular la dilatación del tiempo y la contracción de longitudes.",
    "Aplicar la equivalencia masa-energía."
   ],
   "explanation": [
    {
     "title": "Los postulados de Einstein (1905)",
     "body": "1. Las leyes de la física son las mismas en todos los sistemas de referencia **inerciales**.\n2. La velocidad de la luz en el vacío, $c$, es la **misma para todos los observadores**, se muevan como se muevan.\n\nLa consecuencia es sorprendente: el tiempo y el espacio **no son absolutos**. El experimento de Michelson-Morley ya había mostrado que no existía el \"éter\".\n"
    },
    {
     "title": "Tiempo y longitud",
     "body": "Con el **factor de Lorentz** $\\gamma = \\dfrac{1}{\\sqrt{1 - v^2/c^2}} \\ge 1$:\n- **Dilatación del tiempo:** $\\Delta t = \\gamma\\,\\Delta t_0$. El **tiempo propio** $\\Delta t_0$ se mide con un reloj que va con el fenómeno; cualquier otro observador mide un tiempo mayor.\n- **Contracción de longitudes:** $L = \\dfrac{L_0}{\\gamma}$. La **longitud propia** $L_0$ se mide en reposo respecto al objeto; en movimiento se mide más corto (solo en la dirección del movimiento).\n\nPrueba real: los muones de los rayos cósmicos llegan al suelo gracias a la dilatación del tiempo.\n"
    },
    {
     "title": "Masa y energía",
     "body": "$$E = mc^2$$\nUna masa en reposo tiene una energía $E_0 = m_0c^2$. Energía total: $E = \\gamma m_0c^2$; energía cinética relativista: $E_c = (\\gamma - 1)m_0c^2$.\n\nNada con masa puede alcanzar $c$, porque necesitaría una energía infinita. Esta equivalencia explica la energía nuclear.\n"
    }
   ],
   "examples": [
    {
     "title": "Una nave a 0,8c",
     "statement": "Una nave mide 100 m en reposo y viaja a $0{,}8c$. ¿Qué longitud mide un observador en la Tierra? Y otra pregunta: ¿cuánta energía equivale a 1 g de masa?\n",
     "steps": [
      "**Factor de Lorentz:** $\\gamma = \\dfrac{1}{\\sqrt{1 - 0{,}64}} = \\dfrac{1}{0{,}6} = \\dfrac53$.\n",
      "**Contracción:** $L = \\dfrac{L_0}{\\gamma} = 100\\cdot0{,}6 = 60$ m.\n",
      "**Energía de 1 g:** $E = mc^2 = 10^{-3}\\cdot(3\\cdot10^8)^2 = 9\\cdot10^{13}$ J.\n"
     ],
     "result": "$9\\cdot10^{13}$ J es aproximadamente la energía de una bomba nuclear de unos 20 kilotones: así de \"concentrada\" está la energía en la masa.\n"
    }
   ],
   "summary": [
    "$c$ es igual para todos los observadores inerciales.",
    "$\\Delta t = \\gamma\\Delta t_0$; $L = L_0/\\gamma$; $\\gamma = 1/\\sqrt{1 - v^2/c^2}$.",
    "$E = mc^2$; $E_c = (\\gamma - 1)m_0c^2$."
   ],
   "common_errors": [
    "Confundir cuál es el tiempo propio o la longitud propia.",
    "Usar $v$ en lugar de $v/c$ dentro de la raíz."
   ]
  },
  "fis.ond.luz.u01": {
   "id": "fis.ond.luz.u01",
   "objectives": [
    "Conocer los modelos históricos de la luz y el espectro electromagnético.",
    "Aplicar el índice de refracción, la ley de Snell y la reflexión total."
   ],
   "explanation": [
    {
     "title": "¿Qué es la luz?",
     "body": "- Newton: partículas (corpúsculos). Huygens: ondas.\n- Young (1801), con su experimento de la doble rendija, demostró que la luz **interfiere**: es una onda.\n- Maxwell: es una **onda electromagnética** (campos eléctrico y magnético que oscilan), que viaja en el vacío a $c = 3\\cdot10^8$ m/s.\n- Einstein (1905), con el efecto fotoeléctrico: también se comporta como **partícula** (fotón).\n\nHoy se acepta la **dualidad onda-corpúsculo**.\n"
    },
    {
     "title": "El espectro electromagnético",
     "body": "De menor a mayor frecuencia (y energía): ondas de radio, microondas, infrarrojo, **visible** (de unos 700 nm, rojo, a 400 nm, violeta), ultravioleta, rayos X y rayos gamma. Todas viajan a $c$ en el vacío y cumplen $c = \\lambda f$.\n"
    },
    {
     "title": "Refracción y reflexión total",
     "body": "- **Índice de refracción:** $n = \\dfrac{c}{v} \\ge 1$.\n- **Ley de Snell:** $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$ (ángulos medidos desde la normal).\n- Al pasar a un medio de mayor $n$, la luz se acerca a la normal.\n- La **frecuencia no cambia**; la longitud de onda sí: $\\lambda = \\lambda_0/n$.\n- **Reflexión total:** al pasar a un medio de menor $n$, a partir del **ángulo límite** $\\sin\\theta_L = \\dfrac{n_2}{n_1}$ no hay refracción. Así funciona la fibra óptica.\n- **Dispersión:** $n$ depende de $\\lambda$, por eso un prisma separa los colores.\n"
    }
   ],
   "examples": [
    {
     "title": "Del aire al agua",
     "statement": "Un rayo pasa del aire al agua ($n = 1{,}33$) con un ángulo de incidencia de 30°. Calcula el ángulo de refracción y la velocidad de la luz en el agua.\n",
     "steps": [
      "**Snell:** $1\\cdot\\sin30^\\circ = 1{,}33\\sin\\theta_2 \\Rightarrow \\sin\\theta_2 = \\dfrac{0{,}5}{1{,}33} = 0{,}376$, así que $\\theta_2 \\approx 22{,}1^\\circ$.\n",
      "**Velocidad:** $v = \\dfrac{c}{n} = \\dfrac{3\\cdot10^8}{1{,}33} \\approx 2{,}26\\cdot10^{8}$ m/s.\n"
     ],
     "result": "El rayo se acerca a la normal (22,1° < 30°), como corresponde al pasar a un medio más refringente.\n"
    }
   ],
   "summary": [
    "La luz es una onda electromagnética con comportamiento dual (onda y fotón).",
    "$n = c/v$; Snell: $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$.",
    "Reflexión total por encima de $\\theta_L$, con $\\sin\\theta_L = n_2/n_1$ (de más a menos $n$)."
   ],
   "common_errors": [
    "Medir los ángulos desde la superficie en lugar de desde la normal.",
    "Calcular el ángulo límite al pasar de menor a mayor índice (no existe)."
   ]
  },
  "fis.ond.mas.u01": {
   "id": "fis.ond.mas.u01",
   "objectives": [
    "Describir un movimiento armónico simple con sus ecuaciones.",
    "Relacionar el periodo con la masa y la constante del muelle, o con la longitud del péndulo.",
    "Analizar la energía de un oscilador."
   ],
   "explanation": [
    {
     "title": "Ecuaciones del MAS",
     "body": "$$x(t) = A\\sin(\\omega t + \\varphi_0)$$\n- $A$: **amplitud** (elongación máxima). $\\omega$: **pulsación**, con $\\omega = 2\\pi f = \\dfrac{2\\pi}{T}$. $\\varphi_0$: **fase inicial**.\n- Velocidad: $v = A\\omega\\cos(\\omega t + \\varphi_0)$, máxima en el centro: $v_{max} = A\\omega$.\n- Aceleración: $a = -\\omega^2 x$, máxima en los extremos: $a_{max} = A\\omega^2$.\n\nEl signo menos es la clave del MAS: la aceleración siempre apunta hacia la posición de equilibrio.\n"
    },
    {
     "title": "Dinámica",
     "body": "Un MAS aparece cuando hay una fuerza recuperadora proporcional al desplazamiento, $F = -kx$ (ley de Hooke):\n- **Muelle:** $\\omega = \\sqrt{\\dfrac km}$ y $T = 2\\pi\\sqrt{\\dfrac mk}$.\n- **Péndulo simple** (oscilaciones pequeñas): $T = 2\\pi\\sqrt{\\dfrac Lg}$. No depende de la masa ni de la amplitud.\n"
    },
    {
     "title": "Energía",
     "body": "$$E_p = \\frac12kx^2, \\qquad E_c = \\frac12k(A^2 - x^2), \\qquad E = \\frac12kA^2 = \\text{constante}$$\nEn los extremos toda la energía es potencial; en el centro, toda cinética. Lo puedes ver en el **Laboratorio** de Pauta.\n"
    }
   ],
   "examples": [
    {
     "title": "Un muelle",
     "statement": "Una masa de 0,5 kg cuelga de un muelle de $k = 200$ N/m y oscila con amplitud 10 cm. Calcula $\\omega$, $T$, $v_{max}$ y la energía.\n",
     "steps": [
      "**Pulsación:** $\\omega = \\sqrt{200/0{,}5} = 20$ rad/s.\n",
      "**Periodo:** $T = 2\\pi/\\omega \\approx 0{,}314$ s.\n",
      "**Velocidad máxima:** $v_{max} = A\\omega = 0{,}10\\cdot20 = 2$ m/s.\n",
      "**Energía:** $E = \\frac12kA^2 = \\frac12\\cdot200\\cdot0{,}1^2 = 1$ J. Comprobación: $\\frac12mv_{max}^2 = \\frac12\\cdot0{,}5\\cdot4 = 1$ J ✓\n"
     ],
     "result": "Comprobar la energía por dos caminos es una forma rápida de detectar errores.\n"
    }
   ],
   "summary": [
    "$x = A\\sin(\\omega t + \\varphi_0)$, $v_{max} = A\\omega$, $a = -\\omega^2x$.",
    "Muelle: $T = 2\\pi\\sqrt{m/k}$. Péndulo: $T = 2\\pi\\sqrt{L/g}$.",
    "$E = \\frac12kA^2$, constante."
   ],
   "common_errors": [
    "Usar la amplitud en cm sin pasarla a metros.",
    "Confundir la frecuencia $f$ con la pulsación $\\omega$."
   ]
  },
  "fis.ond.ondas.u01": {
   "id": "fis.ond.ondas.u01",
   "objectives": [
    "Interpretar la ecuación de una onda armónica.",
    "Obtener amplitud, frecuencia, longitud de onda y velocidad."
   ],
   "explanation": [
    {
     "title": "¿Qué es una onda?",
     "body": "Una onda es una perturbación que **transporta energía sin transportar materia**.\n- **Transversal:** las partículas vibran perpendicularmente a la dirección de propagación (cuerda, luz).\n- **Longitudinal:** vibran en la misma dirección (sonido).\n- **Mecánicas** (necesitan un medio, como el sonido) y **electromagnéticas** (se propagan en el vacío, como la luz).\n"
    },
    {
     "title": "La ecuación de onda",
     "body": "Para una onda armónica que avanza hacia las $x$ positivas:\n$$y(x, t) = A\\sin(\\omega t - kx + \\varphi_0)$$\n- $k = \\dfrac{2\\pi}{\\lambda}$: **número de onda** (rad/m).\n- $\\omega = 2\\pi f$: pulsación.\n- **Velocidad de propagación:** $v = \\lambda f = \\dfrac{\\omega}{k}$.\n\nCon signo $+$ entre $\\omega t$ y $kx$, la onda avanza hacia las $x$ **negativas**.\n"
    },
    {
     "title": "Doble periodicidad",
     "body": "- Fijado un punto ($x$ constante), oscila en el tiempo con periodo $T$.\n- Fijado un instante ($t$ constante), la forma se repite en el espacio cada $\\lambda$.\n\nDos puntos separados $\\Delta x$ tienen una **diferencia de fase** $\\Delta\\varphi = k\\,\\Delta x$. Están en fase si $\\Delta x = n\\lambda$, y en oposición si $\\Delta x = (n + \\frac12)\\lambda$.\n\nNo confundas la **velocidad de propagación** ($v = \\lambda f$, constante) con la **velocidad de vibración** de las partículas ($\\partial y/\\partial t$, que cambia).\n"
    }
   ],
   "examples": [
    {
     "title": "Leer una ecuación de onda",
     "statement": "Una onda viene dada por $y = 0{,}05\\sin(10\\pi t - 2\\pi x)$ (SI). Halla $A$, $f$, $\\lambda$, $v$ y el sentido de propagación.\n",
     "steps": [
      "**Amplitud:** $A = 0{,}05$ m.\n",
      "**Frecuencia:** $\\omega = 10\\pi \\Rightarrow f = \\dfrac{\\omega}{2\\pi} = 5$ Hz.\n",
      "**Longitud de onda:** $k = 2\\pi \\Rightarrow \\lambda = \\dfrac{2\\pi}{k} = 1$ m.\n",
      "**Velocidad:** $v = \\lambda f = 5$ m/s, hacia las $x$ positivas (signo $-$).\n"
     ],
     "result": "La velocidad máxima de vibración de las partículas es $A\\omega = 0{,}05\\cdot10\\pi \\approx 1{,}57$ m/s: distinta de la de propagación.\n"
    }
   ],
   "summary": [
    "$y = A\\sin(\\omega t - kx)$, con $k = 2\\pi/\\lambda$ y $\\omega = 2\\pi f$.",
    "$v = \\lambda f = \\omega/k$.",
    "Signo $-$: avanza hacia $+x$. Signo $+$: hacia $-x$."
   ],
   "common_errors": [
    "Confundir $k$ con $\\lambda$, u $\\omega$ con $f$.",
    "Confundir la velocidad de propagación con la de vibración."
   ]
  },
  "fis.ond.ondas.u02": {
   "id": "fis.ond.ondas.u02",
   "objectives": [
    "Calcular la intensidad de una onda y cómo disminuye con la distancia.",
    "Calcular y operar con niveles de intensidad sonora en decibelios."
   ],
   "explanation": [
    {
     "title": "El sonido",
     "body": "El sonido es una onda **mecánica longitudinal**: necesita un medio. En el aire viaja a unos **340 m/s**, más rápido en líquidos y sólidos. El oído humano percibe entre unos 20 Hz y 20 000 Hz.\n- **Tono** (grave o agudo): depende de la frecuencia.\n- **Intensidad** (fuerte o flojo): depende de la energía que transporta.\n- **Timbre**: depende de la forma de la onda (armónicos).\n"
    },
    {
     "title": "Intensidad",
     "body": "Es la potencia que atraviesa cada metro cuadrado. Para un foco **puntual** que emite en todas direcciones:\n$$I = \\frac{P}{4\\pi r^2}\\quad[\\mathrm{W/m^2}]$$\nDisminuye con el cuadrado de la distancia: a doble distancia, la intensidad es la cuarta parte.\n"
    },
    {
     "title": "Nivel de intensidad sonora",
     "body": "Como el oído responde de forma logarítmica, se usa el **decibelio**:\n$$\\beta = 10\\log\\frac{I}{I_0}\\quad[\\mathrm{dB}], \\qquad I_0 = 10^{-12}\\ \\mathrm{W/m^2}$$\n- Intensidad $\\times10$: el nivel sube **10 dB**.\n- Intensidad $\\times2$ (por ejemplo, dos fuentes iguales): sube unos **3 dB**.\n- Distancia $\\times2$: baja unos **6 dB**.\n\n¡Los decibelios **no se suman** directamente! Se suman las intensidades y después se pasa a dB.\n"
    }
   ],
   "examples": [
    {
     "title": "Un altavoz",
     "statement": "Un altavoz emite 0,1 W de potencia sonora en todas direcciones. Calcula la intensidad y el nivel sonoro a 5 m.\n",
     "steps": [
      "**Intensidad:** $I = \\dfrac{0{,}1}{4\\pi\\cdot5^2} \\approx 3{,}18\\cdot10^{-4}\\ \\mathrm{W/m^2}$.\n",
      "**Nivel:** $\\beta = 10\\log\\dfrac{3{,}18\\cdot10^{-4}}{10^{-12}} = 10\\log(3{,}18\\cdot10^{8}) \\approx 85{,}0$ dB.\n"
     ],
     "result": "Dos altavoces iguales darían 88 dB, no 170 dB: los decibelios no se suman.\n"
    }
   ],
   "summary": [
    "Foco puntual: $I = P/(4\\pi r^2)$.",
    "$\\beta = 10\\log(I/I_0)$ con $I_0 = 10^{-12}$ W/m².",
    "×10 en intensidad: +10 dB. ×2: +3 dB. Doble distancia: −6 dB."
   ],
   "common_errors": [
    "Sumar decibelios directamente.",
    "Olvidar el factor 10 delante del logaritmo."
   ]
  },
  "fis.ond.ondas.u03": {
   "id": "fis.ond.ondas.u03",
   "objectives": [
    "Explicar la reflexión, la refracción, la difracción y la interferencia.",
    "Calcular las frecuencias de las ondas estacionarias en una cuerda.",
    "Explicar el efecto Doppler."
   ],
   "explanation": [
    {
     "title": "Reflexión, refracción y difracción",
     "body": "- **Reflexión:** la onda rebota al llegar a otro medio; el ángulo de reflexión es igual al de incidencia (eco).\n- **Refracción:** la onda cambia de medio y de velocidad, y se desvía. La **frecuencia no cambia**; cambian la velocidad y la longitud de onda.\n- **Difracción:** la onda rodea obstáculos o se abre al pasar por una rendija. Es apreciable cuando el tamaño del obstáculo es **del orden de $\\lambda$**. Por eso oímos detrás de una esquina (el sonido tiene $\\lambda$ de metros) pero no vemos (la luz, de cientos de nanómetros).\n"
    },
    {
     "title": "Interferencia y ondas estacionarias",
     "body": "Dos ondas coherentes que coinciden se superponen. Si $\\Delta r$ es la diferencia de caminos:\n- **Constructiva** (máximo): $\\Delta r = n\\lambda$.\n- **Destructiva** (mínimo): $\\Delta r = \\left(n + \\frac12\\right)\\lambda$.\n\nUna **onda estacionaria** surge de la interferencia de una onda con su reflejada. Hay **nodos** (sin vibración) y **vientres**, separados $\\lambda/4$; entre dos nodos hay $\\lambda/2$. En una cuerda fija por los dos extremos:\n$$f_n = \\frac{n\\,v}{2L}, \\qquad n = 1, 2, 3\\dots$$\n"
    },
    {
     "title": "Efecto Doppler",
     "body": "Si la fuente o el observador se mueven, la frecuencia percibida cambia: **más aguda al acercarse** y más grave al alejarse (la sirena de una ambulancia).\n$$f' = f\\,\\frac{v \\pm v_o}{v \\mp v_f}$$\nSignos superiores cuando se **acercan** ($+v_o$ si el observador se acerca, $-v_f$ si la fuente se acerca). Se usa en radares de velocidad y en ecografías.\n"
    }
   ],
   "examples": [
    {
     "title": "Cuerda de guitarra",
     "statement": "Una cuerda de 0,80 m fija por sus extremos transmite ondas a 240 m/s. Calcula la frecuencia fundamental y la del segundo armónico.\n",
     "steps": [
      "**Fundamental ($n = 1$):** $\\lambda_1 = 2L = 1{,}6$ m, así que $f_1 = \\dfrac{v}{2L} = \\dfrac{240}{1{,}6} = 150$ Hz.\n",
      "**Segundo armónico:** $f_2 = 2f_1 = 300$ Hz.\n"
     ],
     "result": "Al pisar un traste se acorta $L$ y sube la frecuencia: la nota se hace más aguda.\n"
    }
   ],
   "summary": [
    "En la refracción, la frecuencia se mantiene; cambian $v$ y $\\lambda$.",
    "Interferencia: constructiva con $\\Delta r = n\\lambda$; destructiva con $\\Delta r = (n + \\frac12)\\lambda$.",
    "Cuerda fija: $f_n = nv/(2L)$. Doppler: más agudo al acercarse."
   ],
   "common_errors": [
    "Pensar que la frecuencia cambia al cambiar de medio.",
    "Tomar $\\lambda = L$ en el modo fundamental (es $2L$)."
   ]
  },
  "fis.ond.optica.u01": {
   "id": "fis.ond.optica.u01",
   "objectives": [
    "Usar las normas DIN de signos.",
    "Calcular la posición y el tamaño de la imagen en espejos planos y esféricos.",
    "Trazar los rayos principales."
   ],
   "explanation": [
    {
     "title": "Normas DIN de signos",
     "body": "La luz viaja de **izquierda a derecha** y el origen está en el espejo (o en la lente):\n- Distancias a la **derecha**: positivas. A la **izquierda**: negativas. Por tanto, un objeto real delante del espejo tiene $s < 0$.\n- Alturas hacia **arriba**: positivas.\n- En un espejo cóncavo, el centro está a la izquierda: $R < 0$ y $f < 0$. En uno convexo, $R > 0$ y $f > 0$.\n"
    },
    {
     "title": "Ecuaciones de los espejos",
     "body": "$$\\frac{1}{s'} + \\frac{1}{s} = \\frac{1}{f} = \\frac{2}{R}, \\qquad A = \\frac{y'}{y} = -\\frac{s'}{s}$$\n- $s' < 0$: la imagen está delante del espejo, es **real** (se puede proyectar).\n- $s' > 0$: está detrás, es **virtual**.\n- $A < 0$: imagen **invertida**; $|A| > 1$: **mayor**.\n\n**Espejo plano:** imagen virtual, derecha, del mismo tamaño y simétrica ($s' = -s$).\n"
    },
    {
     "title": "Rayos principales",
     "body": "1. Un rayo **paralelo** al eje se refleja pasando por el **foco**.\n2. Un rayo que pasa por el **foco** se refleja **paralelo** al eje.\n3. Un rayo que pasa por el **centro** vuelve sobre sí mismo.\n\nCon dos rayos basta; el tercero sirve de comprobación. En la PAU, el trazado de rayos suele puntuar tanto como el cálculo.\n"
    }
   ],
   "examples": [
    {
     "title": "Espejo cóncavo",
     "statement": "Un objeto está a 30 cm de un espejo cóncavo de 40 cm de radio. Calcula la posición de la imagen y el aumento.\n",
     "steps": [
      "**Datos DIN:** $s = -30$ cm, $R = -40$ cm, así que $f = -20$ cm.\n",
      "**Posición:** $\\dfrac{1}{s'} = \\dfrac{1}{f} - \\dfrac1s = -\\dfrac{1}{20} + \\dfrac{1}{30} = -\\dfrac{1}{60} \\Rightarrow s' = -60$ cm.\n",
      "**Aumento:** $A = -\\dfrac{s'}{s} = -\\dfrac{-60}{-30} = -2$.\n"
     ],
     "result": "Imagen real (delante del espejo), invertida y del doble de tamaño. Es lo que pasa cuando el objeto está entre el foco y el centro.\n"
    }
   ],
   "summary": [
    "DIN: luz hacia la derecha; el objeto real tiene $s < 0$; cóncavo, $f < 0$.",
    "$1/s' + 1/s = 1/f$, con $f = R/2$; $A = -s'/s$.",
    "$s' < 0$ real; $s' > 0$ virtual. $A < 0$ invertida."
   ],
   "common_errors": [
    "Olvidar los signos DIN (por ejemplo, poner $s$ positivo).",
    "Usar la ecuación de las lentes con un espejo."
   ]
  },
  "fis.ond.optica.u02": {
   "id": "fis.ond.optica.u02",
   "objectives": [
    "Aplicar la ecuación de las lentes delgadas y la potencia.",
    "Explicar los defectos de la visión y su corrección.",
    "Describir la lupa, el microscopio y el telescopio."
   ],
   "explanation": [
    {
     "title": "Lentes delgadas",
     "body": "Con las normas DIN:\n$$\\frac{1}{s'} - \\frac{1}{s} = \\frac{1}{f'}, \\qquad A = \\frac{y'}{y} = \\frac{s'}{s}, \\qquad P = \\frac{1}{f'}\\ [\\text{dioptrías, con } f' \\text{ en m}]$$\n- **Convergente** ($f' > 0$, más gruesa en el centro): si el objeto está más allá del foco, da imágenes reales.\n- **Divergente** ($f' < 0$): siempre da imágenes virtuales, derechas y menores.\n\nRayos: el paralelo sale por el foco imagen $F'$; el que pasa por el foco objeto $F$ sale paralelo; el que pasa por el centro no se desvía.\n"
    },
    {
     "title": "El ojo y sus defectos",
     "body": "El cristalino es una lente convergente que forma la imagen en la retina.\n- **Miopía:** la imagen se forma **delante** de la retina; no se ve bien de lejos. Se corrige con lentes **divergentes**.\n- **Hipermetropía:** se forma **detrás**; cuesta ver de cerca. Se corrige con lentes **convergentes**.\n- **Presbicia** (vista cansada): el cristalino pierde flexibilidad con la edad. Convergentes para ver de cerca.\n- **Astigmatismo:** la córnea no es simétrica. Lentes cilíndricas.\n"
    },
    {
     "title": "Instrumentos ópticos",
     "body": "- **Lupa:** convergente, con el objeto entre el foco y la lente: imagen virtual, derecha y mayor.\n- **Microscopio:** dos lentes convergentes (objetivo y ocular); el aumento total es el producto de ambos.\n- **Telescopio refractor:** objetivo de gran focal y ocular de focal corta; aumento angular $f'_{obj}/f'_{oc}$.\n"
    }
   ],
   "examples": [
    {
     "title": "Lente convergente",
     "statement": "Un objeto de 2 cm está a 30 cm de una lente convergente de $f' = 10$ cm. Calcula la posición y el tamaño de la imagen.\n",
     "steps": [
      "**Datos DIN:** $s = -30$ cm, $f' = +10$ cm.\n",
      "**Posición:** $\\dfrac{1}{s'} = \\dfrac{1}{f'} + \\dfrac1s = \\dfrac{1}{10} - \\dfrac{1}{30} = \\dfrac{2}{30} \\Rightarrow s' = 15$ cm.\n",
      "**Aumento y tamaño:** $A = \\dfrac{s'}{s} = \\dfrac{15}{-30} = -0{,}5$, así que $y' = -1$ cm.\n"
     ],
     "result": "Imagen real (detrás de la lente), invertida y de la mitad de tamaño: es lo que hace una cámara de fotos. La potencia de la lente es $P = 1/0{,}10 = 10$ dioptrías.\n"
    }
   ],
   "summary": [
    "$1/s' - 1/s = 1/f'$; $A = s'/s$; $P = 1/f'$ con $f'$ en metros.",
    "Convergente $f' > 0$; divergente $f' < 0$.",
    "Miopía → divergente; hipermetropía y presbicia → convergente."
   ],
   "common_errors": [
    "Confundir la ecuación de las lentes (resta) con la de los espejos (suma).",
    "Calcular la potencia con $f'$ en cm."
   ]
  },
  "mat2.alg.determinantes.u01": {
   "id": "mat2.alg.determinantes.u01",
   "objectives": [
    "Calcular determinantes de orden 2 y 3 sin errores de signo.",
    "Entender qué significa que un determinante valga 0."
   ],
   "explanation": [
    {
     "title": "¿Qué es un determinante?",
     "body": "El **determinante** es un **número** asociado a una matriz **cuadrada**. Se escribe con barras: $|A|$ o $\\det(A)$.\n\nPara orden 2:\n$$\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$$\nDiagonal principal **menos** diagonal secundaria. Por ejemplo, $\\begin{vmatrix} 2 & 5 \\\\ 1 & 3 \\end{vmatrix} = 6 - 5 = 1$.\n"
    },
    {
     "title": "Regla de Sarrus (orden 3)",
     "body": "Para una matriz $3\\times3$ hay 6 productos de tres elementos:\n- **Suman** la diagonal principal y los dos \"triángulos\" paralelos a ella: $a_{11}a_{22}a_{33}$, $a_{12}a_{23}a_{31}$, $a_{13}a_{21}a_{32}$.\n- **Restan** la diagonal secundaria y sus dos triángulos: $a_{13}a_{22}a_{31}$, $a_{11}a_{23}a_{32}$, $a_{12}a_{21}a_{33}$.\n\nUn truco: copia las dos primeras columnas a la derecha de la matriz y traza las diagonales.\n"
    },
    {
     "title": "¿Para qué sirve?",
     "body": "El determinante responde a una pregunta clave: **¿la matriz tiene inversa?**\n- Si $|A| \\neq 0$, $A$ es **regular** (tiene inversa) y un sistema con esa matriz tiene solución única.\n- Si $|A| = 0$, $A$ es **singular**: sus filas son linealmente dependientes.\n\nGeométricamente, $|\\det|$ en orden 2 es el área del paralelogramo que forman los vectores fila; en orden 3, el volumen del paralelepípedo.\n"
    }
   ],
   "examples": [
    {
     "title": "Un determinante de orden 3 con Sarrus",
     "statement": "Calcula $\\det(A)$ siendo $A = \\begin{pmatrix} 2 & 1 & 0 \\\\ 1 & 3 & -1 \\\\ 0 & 2 & 4 \\end{pmatrix}$.",
     "steps": [
      "**Productos que suman:** $2\\cdot3\\cdot4 = 24$, $\\ 1\\cdot(-1)\\cdot0 = 0$, $\\ 0\\cdot1\\cdot2 = 0$. Total: $24$.\n",
      "**Productos que restan:** $0\\cdot3\\cdot0 = 0$, $\\ 2\\cdot(-1)\\cdot2 = -4$, $\\ 1\\cdot1\\cdot4 = 4$. Total: $0$.\n",
      "**Resultado:** $\\det(A) = 24 - 0 = 24$.\n"
     ],
     "result": "Como $\\det(A) = 24 \\neq 0$, la matriz tiene inversa."
    }
   ],
   "practice": [
    {
     "id": "mat2.alg.determinantes.u01.p1",
     "kind": "numeric",
     "statement": "Calcula $\\begin{vmatrix} 3 & -2 \\\\ 5 & 4 \\end{vmatrix}$.",
     "answer": {
      "value": 22,
      "tolerance": {
       "absolute": 0
      },
      "commonErrors": [
       {
        "value": 2,
        "message": "Cuidado con el signo: $-(-2)(5) = +10$."
       }
      ]
     },
     "check": "3*4 - (-2)*5",
     "hints": [
      "Orden 2: diagonal principal menos diagonal secundaria.",
      "$ad - bc$",
      "$ad = 12$ y $bc = (-2)\\cdot5 = -10$."
     ],
     "solution": "$3\\cdot4 - (-2)\\cdot5 = 12 + 10 = \\boxed{22}$"
    },
    {
     "id": "mat2.alg.determinantes.u01.p2",
     "kind": "numeric",
     "statement": "Calcula $\\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{vmatrix}$.",
     "answer": {
      "value": 1,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "1*1*0 + 2*4*5 + 3*0*6 - (3*1*5 + 1*4*6 + 2*0*0)",
     "hints": [
      "Usa la regla de Sarrus.",
      "Suman: $1\\cdot1\\cdot0$, $2\\cdot4\\cdot5$, $3\\cdot0\\cdot6$.",
      "Restan: $3\\cdot1\\cdot5$, $1\\cdot4\\cdot6$, $2\\cdot0\\cdot0$."
     ],
     "solution": "Suman $0 + 40 + 0 = 40$; restan $15 + 24 + 0 = 39$. Determinante: $40 - 39 = \\boxed{1}$."
    },
    {
     "id": "mat2.alg.determinantes.u01.p3",
     "kind": "numeric",
     "statement": "Halla $x$ para que $\\begin{vmatrix} x & 1 \\\\ 2 & 3 \\end{vmatrix} = 7$.",
     "answer": {
      "value": 3,
      "tolerance": {
       "absolute": 1e-9
      }
     },
     "check": "(7 + 2) / 3",
     "hints": [
      "Calcula el determinante dejando $x$ como incógnita.",
      "$3x - 2$",
      "Resuelve $3x - 2 = 7$."
     ],
     "solution": "$3x - 2 = 7 \\Rightarrow 3x = 9 \\Rightarrow x = \\boxed{3}$"
    }
   ],
   "test": [
    {
     "id": "mat2.alg.determinantes.u01.t1",
     "kind": "numeric",
     "statement": "Calcula $\\begin{vmatrix} -1 & 4 \\\\ 2 & -3 \\end{vmatrix}$.",
     "answer": {
      "value": -5,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "(-1)*(-3) - 4*2",
     "hints": [
      "$ad - bc$",
      "$ad = 3$",
      "$bc = 8$"
     ],
     "solution": "$(-1)(-3) - 4\\cdot2 = 3 - 8 = \\boxed{-5}$"
    },
    {
     "id": "mat2.alg.determinantes.u01.t2",
     "kind": "numeric",
     "statement": "Calcula $\\begin{vmatrix} 2 & 0 & 1 \\\\ 1 & -1 & 3 \\\\ 0 & 4 & 2 \\end{vmatrix}$.",
     "answer": {
      "value": -24,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "2*(-1)*2 + 0*3*0 + 1*1*4 - (1*(-1)*0 + 2*3*4 + 0*1*2)",
     "hints": [
      "Sarrus.",
      "Suman: $-4 + 0 + 4$.",
      "Restan: $0 + 24 + 0$."
     ],
     "solution": "Suman $-4 + 0 + 4 = 0$; restan $0 + 24 + 0 = 24$. Determinante: $\\boxed{-24}$."
    },
    {
     "id": "mat2.alg.determinantes.u01.t3",
     "kind": "choice",
     "statement": "Si una matriz cuadrada tiene una fila entera de ceros, su determinante...",
     "options": [
      {
       "text": "vale 0"
      },
      {
       "text": "vale 1",
       "why": "Cada producto de Sarrus incluye un elemento de cada fila, también de la fila nula."
      },
      {
       "text": "no se puede calcular",
       "why": "Se puede calcular, y sale un valor concreto."
      },
      {
       "text": "depende del resto de elementos",
       "why": "Todos los productos contienen un 0 de esa fila."
      }
     ],
     "correct": 0,
     "hints": [
      "Mira los 6 productos de Sarrus.",
      "Cada producto tiene un elemento de cada fila.",
      "¿Qué pasa si uno de los factores es 0?"
     ],
     "solution": "Todos los productos contienen un elemento de esa fila, es decir, un 0. El determinante es **0**."
    }
   ],
   "summary": [
    "Orden 2: $ad - bc$.",
    "Orden 3: Sarrus (3 productos que suman y 3 que restan).",
    "$|A| \\neq 0 \\iff A$ tiene inversa."
   ],
   "common_errors": [
    "Perder un signo negativo al restar los productos de la diagonal secundaria.",
    "Sumar en lugar de restar en orden 2."
   ]
  },
  "mat2.alg.determinantes.u02": {
   "id": "mat2.alg.determinantes.u02",
   "objectives": [
    "Aplicar las propiedades de los determinantes para calcular sin hacer cuentas largas.",
    "Calcular menores complementarios y adjuntos.",
    "Desarrollar un determinante por la fila o columna más cómoda (también de orden 4)."
   ],
   "explanation": [
    {
     "title": "Propiedades que ahorran tiempo",
     "body": "Para una matriz cuadrada $A$ de orden $n$:\n1. $|A^t| = |A|$.\n2. Si **intercambias dos filas**, el determinante **cambia de signo**.\n3. Si hay una **fila de ceros** o **dos filas proporcionales**, $|A| = 0$.\n4. Si multiplicas **una fila** por $k$, el determinante se multiplica por $k$. Por eso $|kA| = k^n|A|$.\n5. Si a una fila le **sumas** un múltiplo de otra, el determinante **no cambia**. (¡Es la clave para hacer ceros!)\n6. $|A\\cdot B| = |A|\\cdot|B|$ y, por tanto, $|A^{-1}| = \\dfrac{1}{|A|}$.\nTodo lo dicho para filas vale también para columnas.\n"
    },
    {
     "title": "Menor complementario y adjunto",
     "body": "El **menor complementario** $M_{ij}$ es el determinante que queda al **tachar la fila $i$ y la columna $j$**.\n\nEl **adjunto** es ese menor con un signo: $A_{ij} = (-1)^{i+j}M_{ij}$. Los signos forman un tablero de ajedrez:\n$$\\begin{pmatrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{pmatrix}$$\n"
    },
    {
     "title": "Desarrollo por una fila o columna",
     "body": "El determinante es la suma de los elementos de **cualquier** fila (o columna) multiplicados por sus adjuntos:\n$$|A| = a_{i1}A_{i1} + a_{i2}A_{i2} + \\dots + a_{in}A_{in}$$\nElige siempre la fila o columna con **más ceros**: los términos con un 0 desaparecen. Así se calculan los determinantes de orden 4: primero haces ceros con la propiedad 5 y después desarrollas.\n"
    },
    {
     "title": "Matrices triangulares",
     "body": "Si una matriz es triangular (o diagonal), su determinante es el **producto de la diagonal principal**. Desarróllalo por la primera columna y verás por qué.\n"
    }
   ],
   "examples": [
    {
     "title": "Un determinante de orden 4",
     "statement": "Calcula $\\begin{vmatrix} 2 & 0 & 1 & 3 \\\\ 1 & 0 & 0 & 2 \\\\ 0 & 1 & 4 & 1 \\\\ 3 & 0 & 2 & 1 \\end{vmatrix}$.",
     "steps": [
      "**Elegimos la columna 2**: solo tiene un elemento distinto de 0, el $a_{32} = 1$.\n",
      "**Signo del adjunto:** $(-1)^{3+2} = -1$. Tachamos la fila 3 y la columna 2:\n$$|A| = 1\\cdot(-1)\\cdot\\begin{vmatrix} 2 & 1 & 3 \\\\ 1 & 0 & 2 \\\\ 3 & 2 & 1 \\end{vmatrix}$$\n",
      "**Sarrus:** suman $0 + 6 + 6 = 12$; restan $0 + 8 + 1 = 9$. El menor vale $3$.\n",
      "**Resultado:** $|A| = -1\\cdot 3 = -3$.\n"
     ],
     "result": "Elegir bien la columna convierte un determinante de orden 4 en uno de orden 3."
    }
   ],
   "practice": [
    {
     "id": "mat2.alg.determinantes.u02.p1",
     "kind": "numeric",
     "statement": "$A$ es una matriz de orden 3 con $|A| = 5$. Calcula $|3A|$.",
     "answer": {
      "value": 135,
      "tolerance": {
       "absolute": 0
      },
      "commonErrors": [
       {
        "value": 15,
        "message": "El 3 multiplica a las tres filas: $|3A| = 3^3|A|$."
       }
      ]
     },
     "check": "3**3 * 5",
     "hints": [
      "Multiplicar la matriz por 3 es multiplicar cada una de sus filas por 3.",
      "Cada fila multiplicada por 3 multiplica el determinante por 3.",
      "$|kA| = k^n|A|$ con $n = 3$."
     ],
     "solution": "$|3A| = 3^3\\cdot5 = 27\\cdot5 = \\boxed{135}$"
    },
    {
     "id": "mat2.alg.determinantes.u02.p2",
     "kind": "numeric",
     "statement": "Calcula el adjunto $A_{12}$ de la matriz $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 10 \\end{pmatrix}$.",
     "answer": {
      "value": 2,
      "tolerance": {
       "absolute": 0
      },
      "commonErrors": [
       {
        "value": -2,
        "message": "Ese es el menor $M_{12}$. Falta el signo $(-1)^{1+2} = -1$."
       }
      ]
     },
     "check": "(-1)**(1+2) * (4*10 - 6*7)",
     "hints": [
      "Tacha la fila 1 y la columna 2.",
      "$M_{12} = \\begin{vmatrix} 4 & 6 \\\\ 7 & 10 \\end{vmatrix}$",
      "No olvides el signo $(-1)^{1+2}$."
     ],
     "solution": "$M_{12} = 40 - 42 = -2$, y $A_{12} = (-1)^{3}\\cdot(-2) = \\boxed{2}$."
    },
    {
     "id": "mat2.alg.determinantes.u02.p3",
     "kind": "choice",
     "statement": "Si $|A| = 4$ y $B$ se obtiene intercambiando dos filas de $A$, ¿cuánto vale $|B|$?",
     "options": [
      {
       "text": "$-4$"
      },
      {
       "text": "$4$",
       "why": "Intercambiar dos filas cambia el signo del determinante."
      },
      {
       "text": "$0$",
       "why": "Valdría 0 si las filas fueran iguales o proporcionales."
      },
      {
       "text": "$16$",
       "why": "Intercambiar filas no eleva al cuadrado."
      }
     ],
     "correct": 0,
     "hints": [
      "Es una de las propiedades de los determinantes.",
      "Piensa en Sarrus: los productos que suman pasan a restar.",
      "Intercambiar dos filas cambia el signo."
     ],
     "solution": "$|B| = -|A| = -4$."
    },
    {
     "id": "mat2.alg.determinantes.u02.p4",
     "kind": "numeric",
     "statement": "Calcula $\\begin{vmatrix} 1 & 0 & 0 & 0 \\\\ 2 & 3 & 0 & 0 \\\\ 4 & 5 & -1 & 0 \\\\ 6 & 7 & 8 & 2 \\end{vmatrix}$.",
     "answer": {
      "value": -6,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "1*3*(-1)*2",
     "hints": [
      "Fíjate en dónde están los ceros.",
      "Es una matriz triangular inferior.",
      "Su determinante es el producto de la diagonal."
     ],
     "solution": "Es triangular: $|A| = 1\\cdot3\\cdot(-1)\\cdot2 = \\boxed{-6}$."
    }
   ],
   "test": [
    {
     "id": "mat2.alg.determinantes.u02.t1",
     "kind": "numeric",
     "statement": "$A$ y $B$ son matrices de orden 3 con $|A| = 2$ y $|B| = -3$. Calcula $|A\\cdot B^t|$.",
     "answer": {
      "value": -6,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "2 * (-3)",
     "hints": [
      "El determinante de un producto es el producto de los determinantes.",
      "$|B^t| = |B|$",
      "$|A\\cdot B^t| = |A|\\cdot|B^t|$"
     ],
     "solution": "$|A\\cdot B^t| = |A|\\cdot|B| = 2\\cdot(-3) = \\boxed{-6}$"
    },
    {
     "id": "mat2.alg.determinantes.u02.t2",
     "kind": "numeric",
     "statement": "Calcula $\\begin{vmatrix} 1 & 2 & 0 & 1 \\\\ 0 & 1 & 0 & 3 \\\\ 2 & 1 & 5 & 0 \\\\ 1 & 0 & 0 & 2 \\end{vmatrix}$.",
     "answer": {
      "value": 35,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "5 * (1*1*2 + 2*3*1 + 1*0*0 - (1*1*1 + 1*3*0 + 2*0*2))",
     "hints": [
      "Busca la columna con más ceros.",
      "La columna 3 solo tiene un elemento no nulo: $a_{33} = 5$, con signo $(-1)^{3+3} = +1$.",
      "Tacha la fila 3 y la columna 3 y calcula el menor con Sarrus."
     ],
     "solution": "Desarrollando por la columna 3: $|A| = 5\\cdot\\begin{vmatrix} 1 & 2 & 1 \\\\ 0 & 1 & 3 \\\\ 1 & 0 & 2 \\end{vmatrix} = 5\\cdot(8 - 1) = \\boxed{35}$."
    },
    {
     "id": "mat2.alg.determinantes.u02.t3",
     "kind": "choice",
     "statement": "Si dos filas de una matriz cuadrada son proporcionales, su determinante...",
     "options": [
      {
       "text": "vale 0"
      },
      {
       "text": "cambia de signo",
       "why": "Eso ocurre al intercambiar filas."
      },
      {
       "text": "se multiplica por la constante de proporcionalidad",
       "why": "Eso pasa al multiplicar UNA fila por un número."
      },
      {
       "text": "vale 1",
       "why": "Las filas son linealmente dependientes."
      }
     ],
     "correct": 0,
     "hints": [
      "Las filas proporcionales son linealmente dependientes.",
      "Resta a una fila $k$ veces la otra (no cambia el determinante).",
      "Obtienes una fila de ceros."
     ],
     "solution": "Restando a una de ellas $k$ veces la otra aparece una fila de ceros, así que el determinante vale **0**."
    }
   ],
   "summary": [
    "Intercambiar filas cambia el signo; sumar a una fila un múltiplo de otra no cambia nada.",
    "$|kA| = k^n|A|$, $|AB| = |A||B|$, $|A^t| = |A|$.",
    "Adjunto: $A_{ij} = (-1)^{i+j}M_{ij}$. Desarrolla por la línea con más ceros.",
    "Triangular: producto de la diagonal."
   ],
   "common_errors": [
    "Escribir $|kA| = k|A|$.",
    "Olvidar el signo $(-1)^{i+j}$ del adjunto.",
    "Desarrollar por una fila sin ceros y perderse en las cuentas."
   ]
  },
  "mat2.alg.matrices.u01": {
   "id": "mat2.alg.matrices.u01",
   "objectives": [
    "Reconocer la dimensión de una matriz y localizar sus elementos.",
    "Distinguir los tipos de matrices más habituales.",
    "Sumar matrices, multiplicarlas por un número y trasponerlas."
   ],
   "explanation": [
    {
     "title": "¿Qué es una matriz?",
     "body": "Una **matriz** es una tabla de números ordenados en **filas** y **columnas**. Si tiene $m$ filas y $n$ columnas, decimos que su **dimensión** es $m\\times n$ (se lee \"m por n\").\n\n$$A = \\begin{pmatrix} 1 & -2 & 0 \\\\ 4 & 3 & 5 \\end{pmatrix} \\quad\\text{es de dimensión } 2\\times3$$\n\nCada número es un **elemento** y se nombra con dos subíndices: $a_{ij}$ es el que está en la **fila $i$** y la **columna $j$**. En el ejemplo, $a_{12} = -2$ y $a_{23} = 5$.\n\nTruco para no liarte: primero la fila (horizontal) y luego la columna (vertical), igual que en `matriz[fila][columna]` en programación.\n"
    },
    {
     "title": "Tipos de matrices",
     "body": "- **Cuadrada**: tiene tantas filas como columnas ($n\\times n$). Su **diagonal principal** son los elementos $a_{11}, a_{22}, \\dots, a_{nn}$.\n- **Fila** ($1\\times n$) y **columna** ($m\\times 1$).\n- **Nula**: todos sus elementos son 0.\n- **Diagonal**: cuadrada con ceros fuera de la diagonal principal.\n- **Identidad** $I$: diagonal con unos en la diagonal. Es el \"1\" de las matrices.\n- **Triangular** superior (o inferior): ceros por debajo (o por encima) de la diagonal.\n- **Simétrica**: cuadrada que coincide con su traspuesta, $A^t = A$.\n"
    },
    {
     "title": "Suma y producto por un número",
     "body": "Solo se pueden **sumar** matrices de la **misma dimensión**, y se suman elemento a elemento:\n$$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} + \\begin{pmatrix} 5 & -1 \\\\ 0 & 2 \\end{pmatrix} = \\begin{pmatrix} 6 & 1 \\\\ 3 & 6 \\end{pmatrix}$$\n\nPara multiplicar una matriz por un **número** $\\lambda$, se multiplica **cada elemento**:\n$$3\\begin{pmatrix} 1 & -2 \\\\ 0 & 4 \\end{pmatrix} = \\begin{pmatrix} 3 & -6 \\\\ 0 & 12 \\end{pmatrix}$$\n"
    },
    {
     "title": "La matriz traspuesta",
     "body": "La **traspuesta** $A^t$ se obtiene cambiando filas por columnas: la fila 1 pasa a ser la columna 1, y así sucesivamente. Si $A$ es $m\\times n$, $A^t$ es $n\\times m$.\n$$A = \\begin{pmatrix} 1 & -2 & 0 \\\\ 4 & 3 & 5 \\end{pmatrix} \\Rightarrow A^t = \\begin{pmatrix} 1 & 4 \\\\ -2 & 3 \\\\ 0 & 5 \\end{pmatrix}$$\n\nPropiedades útiles: $(A^t)^t = A$ y $(A + B)^t = A^t + B^t$.\n"
    }
   ],
   "examples": [
    {
     "title": "Una combinación con traspuesta",
     "statement": "Con $A = \\begin{pmatrix} 1 & -2 \\\\ 3 & 0 \\end{pmatrix}$ y $B = \\begin{pmatrix} 4 & 1 \\\\ -1 & 2 \\end{pmatrix}$, calcula $2A - B^t$.\n",
     "steps": [
      "**Paso 1. Traspuesta de $B$.** Cambiamos filas por columnas: $B^t = \\begin{pmatrix} 4 & -1 \\\\ 1 & 2 \\end{pmatrix}$.\n",
      "**Paso 2. Producto por 2.** $2A = \\begin{pmatrix} 2 & -4 \\\\ 6 & 0 \\end{pmatrix}$.\n",
      "**Paso 3. Resta elemento a elemento.**\n$$2A - B^t = \\begin{pmatrix} 2-4 & -4-(-1) \\\\ 6-1 & 0-2 \\end{pmatrix} = \\begin{pmatrix} -2 & -3 \\\\ 5 & -2 \\end{pmatrix}$$\n"
     ],
     "result": "Cuidado con los signos al restar números negativos: $-4 - (-1) = -3$."
    }
   ],
   "practice": [
    {
     "id": "mat2.alg.matrices.u01.p1",
     "kind": "choice",
     "statement": "¿Qué dimensión tiene $A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 3 & -1 & 4 \\end{pmatrix}$?",
     "options": [
      {
       "text": "$2\\times3$"
      },
      {
       "text": "$3\\times2$",
       "why": "Primero se cuentan las filas (horizontales) y después las columnas."
      },
      {
       "text": "$6$",
       "why": "Hay 6 elementos, pero la dimensión se expresa como filas × columnas."
      },
      {
       "text": "$2\\times2$",
       "why": "Cuenta otra vez las columnas."
      }
     ],
     "correct": 0,
     "hints": [
      "La dimensión se escribe \"filas × columnas\".",
      "Las filas son horizontales; las columnas, verticales.",
      "Tiene 2 filas. ¿Cuántos números hay en cada fila?"
     ],
     "solution": "Tiene 2 filas y 3 columnas: es de dimensión $2\\times3$."
    },
    {
     "id": "mat2.alg.matrices.u01.p2",
     "kind": "numeric",
     "statement": "Sean $A = \\begin{pmatrix} 2 & -1 \\\\ 0 & 3 \\end{pmatrix}$ y $B = \\begin{pmatrix} 1 & 4 \\\\ -2 & 5 \\end{pmatrix}$. Calcula el elemento $c_{12}$ de $C = 3A + 2B$.\n",
     "answer": {
      "value": 5,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "3*(-1) + 2*4",
     "hints": [
      "No hace falta calcular toda la matriz: solo el elemento de la fila 1, columna 2.",
      "$c_{12} = 3\\,a_{12} + 2\\,b_{12}$",
      "$a_{12} = -1$ y $b_{12} = 4$."
     ],
     "solution": "$c_{12} = 3\\cdot(-1) + 2\\cdot4 = -3 + 8 = \\boxed{5}$"
    },
    {
     "id": "mat2.alg.matrices.u01.p3",
     "kind": "numeric",
     "statement": "Si $A = \\begin{pmatrix} 5 & 7 & -2 \\\\ 1 & 0 & 3 \\end{pmatrix}$, ¿cuánto vale el elemento de la fila 2 y columna 1 de $A^t$?\n",
     "answer": {
      "value": 7,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "7",
     "hints": [
      "Al trasponer, la fila $i$ pasa a ser la columna $i$.",
      "El elemento $(i, j)$ de $A^t$ es el elemento $(j, i)$ de $A$.",
      "Busca el elemento $a_{12}$ de $A$."
     ],
     "solution": "$(A^t)_{21} = a_{12} = \\boxed{7}$"
    }
   ],
   "test": [
    {
     "id": "mat2.alg.matrices.u01.t1",
     "kind": "choice",
     "statement": "Una matriz cuadrada $A$ es **simétrica** si...",
     "options": [
      {
       "text": "$A^t = A$"
      },
      {
       "text": "$A^t = -A$",
       "why": "Esa es la definición de matriz antisimétrica."
      },
      {
       "text": "todos sus elementos son iguales",
       "why": "No: basta con que $a_{ij} = a_{ji}$."
      },
      {
       "text": "su diagonal principal es nula",
       "why": "Eso no tiene que ver con la simetría."
      }
     ],
     "correct": 0,
     "hints": [
      "Piensa en un espejo situado en la diagonal principal.",
      "Simétrica: $a_{ij} = a_{ji}$.",
      "Eso equivale a decir que coincide con su traspuesta."
     ],
     "solution": "Simétrica significa $a_{ij} = a_{ji}$ para todo $i, j$, es decir, $A^t = A$."
    },
    {
     "id": "mat2.alg.matrices.u01.t2",
     "kind": "numeric",
     "statement": "Con $A = \\begin{pmatrix} 3 & 1 \\\\ -2 & 4 \\end{pmatrix}$ y $B = \\begin{pmatrix} 1 & -1 \\\\ 0 & 2 \\end{pmatrix}$, calcula el elemento $c_{12}$ de $C = A - 2B$.\n",
     "answer": {
      "value": 3,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "1 - 2*(-1)",
     "hints": [
      "Solo necesitas los elementos de la posición (1, 2).",
      "$c_{12} = a_{12} - 2\\,b_{12}$",
      "$b_{12} = -1$"
     ],
     "solution": "$c_{12} = 1 - 2\\cdot(-1) = \\boxed{3}$"
    },
    {
     "id": "mat2.alg.matrices.u01.t3",
     "kind": "choice",
     "statement": "¿Se pueden sumar una matriz $2\\times3$ y una matriz $3\\times2$?",
     "options": [
      {
       "text": "No, para sumar deben tener la misma dimensión"
      },
      {
       "text": "Sí, siempre se pueden sumar",
       "why": "La suma es elemento a elemento: necesitan la misma forma."
      },
      {
       "text": "Sí, y el resultado es $2\\times2$",
       "why": "Eso se parece al producto, no a la suma."
      },
      {
       "text": "Solo si son cuadradas",
       "why": "Ninguna de las dos es cuadrada, y aun así el requisito es tener la misma dimensión."
      }
     ],
     "correct": 0,
     "hints": [
      "¿Cómo se suman dos matrices?",
      "Elemento a elemento.",
      "¿Tienen todos los elementos de una su \"pareja\" en la otra?"
     ],
     "solution": "No. La suma se hace elemento a elemento y exige que ambas matrices tengan la misma dimensión."
    }
   ],
   "summary": [
    "Dimensión = filas × columnas. $a_{ij}$: fila $i$, columna $j$.",
    "Suma y resta: elemento a elemento y solo con la misma dimensión.",
    "Producto por un número: multiplica todos los elementos.",
    "Traspuesta: filas ↔ columnas. Simétrica si $A^t = A$."
   ],
   "common_errors": [
    "Confundir el orden de los subíndices: $a_{ij}$ es fila $i$, columna $j$.",
    "Intentar sumar matrices de distinta dimensión.",
    "Equivocarse con el signo al restar elementos negativos."
   ]
  },
  "mat2.alg.matrices.u02": {
   "id": "mat2.alg.matrices.u02",
   "objectives": [
    "Saber cuándo se pueden multiplicar dos matrices y qué dimensión tiene el resultado.",
    "Calcular productos de matrices fila por columna.",
    "Calcular potencias y detectar patrones en $A^n$."
   ],
   "explanation": [
    {
     "title": "¿Cuándo se pueden multiplicar?",
     "body": "$A\\cdot B$ solo existe si el **número de columnas de $A$** coincide con el **número de filas de $B$**:\n$$\\underset{m\\times \\boxed{n}}{A}\\cdot\\underset{\\boxed{n}\\times p}{B} = \\underset{m\\times p}{C}$$\nLos números \"de dentro\" deben coincidir y los \"de fuera\" dan la dimensión del resultado.\n"
    },
    {
     "title": "Fila por columna",
     "body": "Cada elemento $c_{ij}$ del producto se obtiene combinando la **fila $i$ de $A$** con la **columna $j$ de $B$**: se multiplican elemento a elemento y se suman.\n$$\\begin{pmatrix} \\color{#4f5bd5}{1} & \\color{#4f5bd5}{2} \\\\ 0 & -1 \\end{pmatrix}\\begin{pmatrix} \\color{#e8590c}{3} & 1 \\\\ \\color{#e8590c}{2} & 4 \\end{pmatrix} \\Rightarrow c_{11} = 1\\cdot3 + 2\\cdot2 = 7$$\nEs el mismo cálculo que un bucle doble en programación: para cada fila, para cada columna, un sumatorio.\n"
    },
    {
     "title": "El producto NO es conmutativo",
     "body": "En general, $A\\cdot B \\neq B\\cdot A$. ¡Incluso puede que uno de los dos productos ni exista! Por eso, en las ecuaciones matriciales importa mucho si multiplicas por la izquierda o por la derecha.\n\nLa matriz identidad sí conmuta con todas: $A\\cdot I = I\\cdot A = A$.\n"
    },
    {
     "title": "Potencias",
     "body": "Para matrices cuadradas, $A^2 = A\\cdot A$, $A^3 = A^2\\cdot A$, etc. En la PAU es típico pedir $A^n$: calcula $A^2$, $A^3$... hasta ver el **patrón**. Por ejemplo:\n$$A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix} \\Rightarrow A^2 = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix},\\ A^3 = \\begin{pmatrix} 1 & 3 \\\\ 0 & 1 \\end{pmatrix} \\Rightarrow A^n = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}$$\n**Ojo:** $A^2$ no es elevar cada elemento al cuadrado.\n"
    }
   ],
   "examples": [
    {
     "title": "Comprobar que AB ≠ BA",
     "statement": "Calcula $AB$ y $BA$ para $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & -1 \\end{pmatrix}$ y $B = \\begin{pmatrix} 3 & 1 \\\\ 2 & 4 \\end{pmatrix}$.\n",
     "steps": [
      "**$AB$**, fila por columna:\n$$AB = \\begin{pmatrix} 1\\cdot3 + 2\\cdot2 & 1\\cdot1 + 2\\cdot4 \\\\ 0\\cdot3 + (-1)\\cdot2 & 0\\cdot1 + (-1)\\cdot4 \\end{pmatrix} = \\begin{pmatrix} 7 & 9 \\\\ -2 & -4 \\end{pmatrix}$$\n",
      "**$BA$**:\n$$BA = \\begin{pmatrix} 3\\cdot1 + 1\\cdot0 & 3\\cdot2 + 1\\cdot(-1) \\\\ 2\\cdot1 + 4\\cdot0 & 2\\cdot2 + 4\\cdot(-1) \\end{pmatrix} = \\begin{pmatrix} 3 & 5 \\\\ 2 & 0 \\end{pmatrix}$$\n"
     ],
     "result": "Son distintas: el orden de los factores sí altera el producto de matrices."
    }
   ],
   "practice": [
    {
     "id": "mat2.alg.matrices.u02.p1",
     "kind": "choice",
     "statement": "Si $A$ es $3\\times2$ y $B$ es $2\\times4$, ¿qué dimensión tiene $A\\cdot B$?",
     "options": [
      {
       "text": "$3\\times4$"
      },
      {
       "text": "$2\\times2$",
       "why": "Los números de dentro (2 y 2) son los que deben coincidir; el resultado lo dan los de fuera."
      },
      {
       "text": "$4\\times3$",
       "why": "Ese sería el orden de $B\\cdot A$... que además no existe."
      },
      {
       "text": "No se pueden multiplicar",
       "why": "Columnas de $A$ = 2 = filas de $B$: sí se pueden."
      }
     ],
     "correct": 0,
     "hints": [
      "Escribe las dimensiones una al lado de la otra: $(3\\times2)(2\\times4)$.",
      "Los de dentro deben coincidir.",
      "Los de fuera dan el resultado."
     ],
     "solution": "$(3\\times\\boxed{2})(\\boxed{2}\\times4) = 3\\times4$."
    },
    {
     "id": "mat2.alg.matrices.u02.p2",
     "kind": "numeric",
     "statement": "Con $A = \\begin{pmatrix} 2 & -1 & 0 \\\\ 1 & 3 & 2 \\end{pmatrix}$ y $B = \\begin{pmatrix} 1 & 0 \\\\ 2 & -1 \\\\ -1 & 4 \\end{pmatrix}$, calcula el elemento $c_{21}$ de $A\\cdot B$.\n",
     "answer": {
      "value": 5,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "1*1 + 3*2 + 2*(-1)",
     "hints": [
      "$c_{21}$ usa la fila 2 de $A$ y la columna 1 de $B$.",
      "Fila 2 de $A$: $(1, 3, 2)$. Columna 1 de $B$: $(1, 2, -1)$.",
      "Multiplica término a término y suma."
     ],
     "solution": "$c_{21} = 1\\cdot1 + 3\\cdot2 + 2\\cdot(-1) = 1 + 6 - 2 = \\boxed{5}$"
    },
    {
     "id": "mat2.alg.matrices.u02.p3",
     "kind": "numeric",
     "statement": "Sea $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$. Calcula el elemento de la fila 2 y columna 2 de $A^2$.",
     "answer": {
      "value": 22,
      "tolerance": {
       "absolute": 0
      },
      "commonErrors": [
       {
        "value": 16,
        "message": "Has elevado el elemento al cuadrado. $A^2 = A\\cdot A$: hay que multiplicar fila por columna."
       }
      ]
     },
     "check": "3*2 + 4*4",
     "hints": [
      "$A^2 = A\\cdot A$.",
      "El elemento $(2,2)$ es la fila 2 de $A$ por la columna 2 de $A$.",
      "Fila 2: $(3, 4)$. Columna 2: $(2, 4)$."
     ],
     "solution": "$(A^2)_{22} = 3\\cdot2 + 4\\cdot4 = 6 + 16 = \\boxed{22}$"
    }
   ],
   "test": [
    {
     "id": "mat2.alg.matrices.u02.t1",
     "kind": "choice",
     "statement": "Si $A$ y $B$ son ambas de dimensión $2\\times3$, ¿existe $A\\cdot B$?",
     "options": [
      {
       "text": "No"
      },
      {
       "text": "Sí, y es $2\\times3$",
       "why": "Para multiplicar, columnas de $A$ (3) deben ser iguales a filas de $B$ (2)."
      },
      {
       "text": "Sí, y es $2\\times2$",
       "why": "Comprueba la condición: 3 columnas frente a 2 filas."
      },
      {
       "text": "Sí, y es $3\\times3$",
       "why": "Ese sería $A^t\\cdot B$, no $A\\cdot B$."
      }
     ],
     "correct": 0,
     "hints": [
      "$(2\\times3)(2\\times3)$",
      "¿Coinciden los números de dentro?",
      "3 ≠ 2"
     ],
     "solution": "No existe: $A$ tiene 3 columnas y $B$ tiene 2 filas."
    },
    {
     "id": "mat2.alg.matrices.u02.t2",
     "kind": "numeric",
     "statement": "Si $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$, ¿cuánto vale el elemento $(1,1)$ de $A^2$?",
     "answer": {
      "value": 1,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "0*0 + 1*1",
     "hints": [
      "$A^2 = A\\cdot A$",
      "Fila 1 por columna 1.",
      "$(0, 1)\\cdot(0, 1)$"
     ],
     "solution": "$(A^2)_{11} = 0\\cdot0 + 1\\cdot1 = \\boxed{1}$. De hecho, $A^2 = I$."
    },
    {
     "id": "mat2.alg.matrices.u02.t3",
     "kind": "numeric",
     "statement": "Sea $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$. ¿Cuánto vale el elemento $(1,2)$ de $A^5$?",
     "answer": {
      "value": 5,
      "tolerance": {
       "absolute": 0
      }
     },
     "check": "5",
     "hints": [
      "Calcula $A^2$ y $A^3$ y busca un patrón.",
      "$A^2 = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$",
      "Parece que $A^n = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}$."
     ],
     "solution": "Por inducción, $A^n = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}$, así que el elemento pedido es $\\boxed{5}$."
    }
   ],
   "summary": [
    "$A_{m\\times n}\\cdot B_{n\\times p} = C_{m\\times p}$: los de dentro coinciden, los de fuera dan el resultado.",
    "$c_{ij}$ = fila $i$ de $A$ · columna $j$ de $B$.",
    "En general $AB \\neq BA$.",
    "$A^n$: calcula las primeras potencias y busca el patrón."
   ],
   "common_errors": [
    "Multiplicar elemento a elemento en lugar de fila por columna.",
    "Dar por hecho que $AB = BA$.",
    "Calcular $A^2$ elevando cada elemento al cuadrado."
   ]
  },
  "mat2.alg.rango-inversa.u01": {
   "id": "mat2.alg.rango-inversa.u01",
   "objectives": [
    "Entender qué mide el rango de una matriz.",
    "Calcular el rango por menores y por el método de Gauss."
   ],
   "explanation": [
    {
     "title": "¿Qué es el rango?",
     "body": "El **rango** de una matriz, $\\operatorname{rg}(A)$, es el **número de filas (o de columnas) linealmente independientes**, es decir, que no se pueden obtener combinando las demás.\n\n- Si una fila es múltiplo de otra, o suma de otras, **no aporta** nada nuevo al rango.\n- El rango de una matriz $m\\times n$ es, como mucho, el menor de $m$ y $n$.\n- El rango por filas y el rango por columnas siempre coinciden.\n"
    },
    {
     "title": "Rango por menores",
     "body": "Un **menor de orden $k$** es el determinante de una submatriz $k\\times k$ (te quedas con $k$ filas y $k$ columnas).\n\nEl rango es el **orden del mayor menor distinto de cero**. Procedimiento:\n1. Busca un elemento no nulo: el rango es al menos 1.\n2. Busca un menor de orden 2 no nulo: el rango es al menos 2.\n3. \"Orla\" ese menor añadiendo una fila y una columna. Si todos los menores de orden 3 que lo contienen son nulos, el rango es 2.\n"
    },
    {
     "title": "Rango por Gauss",
     "body": "Haz ceros por debajo de la diagonal con operaciones elementales (intercambiar filas, multiplicar una fila por un número no nulo, sumar a una fila un múltiplo de otra). Estas operaciones **no cambian el rango**.\n\nAl final, el rango es el **número de filas que no son completamente nulas**.\n"
    }
   ],
   "examples": [
    {
     "title": "Rango de una matriz 3×3",
     "statement": "Calcula el rango de $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 1 & 0 & 1 \\end{pmatrix}$.\n",
     "steps": [
      "**¿Rango 3?** La fila 2 es el doble de la fila 1, así que $|A| = 0$ y el rango es menor que 3.\n",
      "**¿Rango 2?** Buscamos un menor de orden 2 no nulo con las filas 1 y 3: $\\begin{vmatrix} 1 & 2 \\\\ 1 & 0 \\end{vmatrix} = 0 - 2 = -2 \\neq 0$.\n",
      "**Conclusión:** $\\operatorname{rg}(A) = 2$.\n"
     ],
     "result": "Fíjate en que ver de un vistazo que dos filas son proporcionales ahorra calcular el determinante de orden 3.\n"
    }
   ],
   "summary": [
    "Rango = número de filas (o columnas) linealmente independientes.",
    "Por menores: orden del mayor menor no nulo. Por Gauss: filas no nulas tras escalonar.",
    "Una matriz cuadrada $n\\times n$ tiene rango $n$ si y solo si $|A| \\neq 0$."
   ],
   "common_errors": [
    "Concluir que el rango es 1 porque $|A| = 0$: solo indica que es menor que 3.",
    "Olvidar que las operaciones de Gauss se hacen sobre filas completas."
   ]
  },
  "mat2.alg.rango-inversa.u02": {
   "id": "mat2.alg.rango-inversa.u02",
   "objectives": [
    "Saber cuándo existe la inversa de una matriz y calcularla.",
    "Resolver ecuaciones matriciales despejando con la inversa por el lado correcto."
   ],
   "explanation": [
    {
     "title": "¿Cuándo existe la inversa?",
     "body": "La **inversa** de una matriz cuadrada $A$ es la matriz $A^{-1}$ que cumple $A\\cdot A^{-1} = A^{-1}\\cdot A = I$.\n\n**Existe si y solo si $|A| \\neq 0$.** Por eso, lo primero siempre es calcular el determinante. En los ejercicios con parámetro, la pregunta \"¿para qué valores de $m$ tiene inversa?\" se resuelve con $|A| \\neq 0$.\n"
    },
    {
     "title": "Cálculo con la adjunta",
     "body": "$$A^{-1} = \\frac{1}{|A|}\\,(\\operatorname{Adj} A)^t$$\n1. Calcula $|A|$.\n2. Sustituye cada elemento por su **adjunto** $A_{ij} = (-1)^{i+j}M_{ij}$.\n3. **Traspón** la matriz de adjuntos.\n4. Divide entre $|A|$.\n\nEn orden 2 queda un atajo: $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.\n\n**Compruébalo siempre** multiplicando: $A\\cdot A^{-1}$ debe dar $I$.\n"
    },
    {
     "title": "Ecuaciones matriciales",
     "body": "Como el producto de matrices no es conmutativo, hay que multiplicar por la inversa **por el mismo lado** en los dos miembros:\n- $AX = B \\Rightarrow X = A^{-1}B$ (por la izquierda).\n- $XA = B \\Rightarrow X = BA^{-1}$ (por la derecha).\n- $AX + C = B \\Rightarrow X = A^{-1}(B - C)$.\n- $AX = X + B \\Rightarrow (A - I)X = B \\Rightarrow X = (A - I)^{-1}B$. ¡Ojo! Se escribe $X = IX$ para poder sacar factor común.\n"
    }
   ],
   "examples": [
    {
     "title": "Inversa y ecuación matricial",
     "statement": "Sea $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$. Calcula $A^{-1}$ y resuelve $AX = B$ con $B = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$.\n",
     "steps": [
      "**Determinante:** $|A| = 2\\cdot3 - 1\\cdot5 = 1 \\neq 0$, así que existe la inversa.\n",
      "**Inversa:** $A^{-1} = \\dfrac{1}{1}\\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$.\n",
      "**Ecuación:** $X = A^{-1}B = \\begin{pmatrix} 3\\cdot1 - 1\\cdot2 \\\\ -5\\cdot1 + 2\\cdot2 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}$.\n",
      "**Comprobación:** $AX = \\begin{pmatrix} 2 - 1 \\\\ 5 - 3 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} = B$ ✓\n"
     ],
     "result": "Comprobar el resultado cuesta un minuto y en la PAU evita perder el apartado entero por un signo.\n"
    }
   ],
   "summary": [
    "$A^{-1}$ existe $\\iff |A| \\neq 0$.",
    "$A^{-1} = \\dfrac{1}{|A|}(\\operatorname{Adj}A)^t$.",
    "$AX = B \\Rightarrow X = A^{-1}B$; $\\ XA = B \\Rightarrow X = BA^{-1}$."
   ],
   "common_errors": [
    "Olvidar trasponer la matriz de adjuntos.",
    "Escribir $X = BA^{-1}$ cuando la ecuación es $AX = B$.",
    "En $AX - X$, sacar factor común como $(A - 1)X$ en vez de $(A - I)X$."
   ]
  },
  "mat2.alg.sistemas.u01": {
   "id": "mat2.alg.sistemas.u01",
   "objectives": [
    "Escribir un sistema en forma matricial.",
    "Resolver sistemas por el método de Gauss.",
    "Clasificar un sistema según su número de soluciones."
   ],
   "explanation": [
    {
     "title": "Sistemas y forma matricial",
     "body": "Un sistema de ecuaciones lineales se puede escribir como $AX = B$:\n- $A$: **matriz de coeficientes**.\n- $X$: columna de incógnitas.\n- $B$: columna de términos independientes.\n- $A^* = (A\\,|\\,B)$: **matriz ampliada**.\n\nSegún sus soluciones, un sistema es:\n- **Compatible determinado (SCD)**: una única solución.\n- **Compatible indeterminado (SCI)**: infinitas soluciones.\n- **Incompatible (SI)**: ninguna.\n"
    },
    {
     "title": "El método de Gauss",
     "body": "Se trabaja con la matriz ampliada y se hacen ceros por debajo de la diagonal con operaciones entre filas, hasta llegar a una forma **escalonada**. Después se resuelve \"de abajo arriba\" (sustitución regresiva).\n\nNotación útil: $F_2 \\to F_2 - 2F_1$ significa \"a la fila 2 le resto el doble de la fila 1\".\n\nAl final:\n- Si aparece una fila $0\\ 0\\ 0\\ |\\ k$ con $k \\neq 0$: **incompatible** ($0 = k$ es imposible).\n- Si quedan menos ecuaciones útiles que incógnitas: **indeterminado**.\n"
    },
    {
     "title": "Regla de Cramer",
     "body": "Si $|A| \\neq 0$, cada incógnita es un cociente de determinantes:\n$$x = \\frac{|A_x|}{|A|}$$\ndonde $A_x$ es la matriz $A$ con la columna de $x$ sustituida por $B$. Es cómoda para sistemas $3\\times3$ con números pequeños, y muy útil cuando solo te piden una incógnita.\n"
    }
   ],
   "examples": [
    {
     "title": "Un sistema 3×3 por Gauss",
     "statement": "Resuelve $\\begin{cases} x + y + z = 6 \\\\ 2x - y + z = 3 \\\\ x + 2y - z = 2 \\end{cases}$\n",
     "steps": [
      "**Ceros en la primera columna:** $F_2 \\to F_2 - 2F_1$ y $F_3 \\to F_3 - F_1$:\n$$\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & -3 & -1 & -9 \\\\ 0 & 1 & -2 & -4 \\end{array}\\right)$$\n",
      "**Cero en la segunda columna:** $F_3 \\to 3F_3 + F_2$:\n$$\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & -3 & -1 & -9 \\\\ 0 & 0 & -7 & -21 \\end{array}\\right)$$\n",
      "**Sustitución regresiva:** $-7z = -21 \\Rightarrow z = 3$. Luego $-3y - 3 = -9 \\Rightarrow y = 2$. Y $x + 2 + 3 = 6 \\Rightarrow x = 1$.\n"
     ],
     "result": "Es compatible determinado, con solución $(x, y, z) = (1, 2, 3)$. Comprueba en la tercera ecuación: $1 + 4 - 3 = 2$ ✓\n"
    }
   ],
   "summary": [
    "Sistema $\\leftrightarrow AX = B$, con matriz ampliada $A^* = (A|B)$.",
    "Gauss: escalonar la ampliada y resolver de abajo arriba.",
    "Una fila $0\\ 0\\ 0\\,|\\,k$ con $k \\neq 0$ indica que el sistema es incompatible."
   ],
   "common_errors": [
    "Operar solo con los coeficientes y olvidar la columna de términos independientes.",
    "Errores de signo al restar filas: escribe la operación que haces."
   ]
  },
  "mat2.alg.sistemas.u02": {
   "id": "mat2.alg.sistemas.u02",
   "objectives": [
    "Clasificar un sistema comparando rangos.",
    "Saber cuántos parámetros tiene la solución de un sistema indeterminado."
   ],
   "explanation": [
    {
     "title": "El teorema",
     "body": "Sea un sistema $AX = B$ con $n$ incógnitas y matriz ampliada $A^*$. Entonces:\n- Si $\\operatorname{rg}(A) \\neq \\operatorname{rg}(A^*)$: **incompatible**.\n- Si $\\operatorname{rg}(A) = \\operatorname{rg}(A^*) = n$: **compatible determinado**.\n- Si $\\operatorname{rg}(A) = \\operatorname{rg}(A^*) < n$: **compatible indeterminado**, con $n - \\operatorname{rg}(A)$ parámetros.\n\nComo $A^*$ tiene una columna más que $A$, su rango es igual o una unidad mayor.\n"
    },
    {
     "title": "Sistemas homogéneos",
     "body": "Si todos los términos independientes son 0 ($AX = 0$), el sistema es **homogéneo**. Siempre es compatible, porque $x = y = z = 0$ es solución (la **solución trivial**).\n- Si $|A| \\neq 0$: solo tiene la solución trivial.\n- Si $|A| = 0$: tiene infinitas soluciones.\n"
    },
    {
     "title": "Resolver un sistema indeterminado",
     "body": "Si el rango es $r < n$, te quedas con $r$ ecuaciones independientes y pasas $n - r$ incógnitas al otro lado como **parámetros** ($z = \\lambda$, por ejemplo). Después resuelves las demás en función de $\\lambda$.\n"
    }
   ],
   "examples": [
    {
     "title": "Clasificar con rangos",
     "statement": "Clasifica $\\begin{cases} x + y = 2 \\\\ 2x + 2y = 5 \\end{cases}$\n",
     "steps": [
      "**Matrices:** $A = \\begin{pmatrix} 1 & 1 \\\\ 2 & 2 \\end{pmatrix}$ y $A^* = \\left(\\begin{array}{cc|c} 1 & 1 & 2 \\\\ 2 & 2 & 5 \\end{array}\\right)$.\n",
      "**Rango de $A$:** $|A| = 2 - 2 = 0$, y como tiene elementos no nulos, $\\operatorname{rg}(A) = 1$.\n",
      "**Rango de $A^*$:** el menor formado por las columnas 2 y 3 es $\\begin{vmatrix} 1 & 2 \\\\ 2 & 5 \\end{vmatrix} = 5 - 4 = 1 \\neq 0$, así que $\\operatorname{rg}(A^*) = 2$.\n",
      "**Conclusión:** $1 \\neq 2$: el sistema es **incompatible**.\n"
     ],
     "result": "Geométricamente son dos rectas paralelas: la segunda ecuación equivale a $x + y = 2{,}5$, que contradice la primera.\n"
    }
   ],
   "summary": [
    "$\\operatorname{rg}A \\neq \\operatorname{rg}A^*$: SI.",
    "$\\operatorname{rg}A = \\operatorname{rg}A^* = n$: SCD. Si es menor que $n$: SCI con $n - \\operatorname{rg}A$ parámetros.",
    "Los sistemas homogéneos siempre son compatibles."
   ],
   "common_errors": [
    "Comparar el rango con el número de ecuaciones en vez de con el de incógnitas.",
    "Calcular solo el rango de $A$ y olvidar el de la ampliada."
   ]
  },
  "mat2.alg.sistemas.u03": {
   "id": "mat2.alg.sistemas.u03",
   "objectives": [
    "Discutir un sistema según los valores de un parámetro.",
    "Resolverlo en los casos que pide el enunciado."
   ],
   "explanation": [
    {
     "title": "El método, paso a paso",
     "body": "Es uno de los ejercicios más típicos de la PAU. Con un sistema cuadrado (tantas ecuaciones como incógnitas):\n1. Calcula $|A|$ en función del parámetro y **factorízalo**.\n2. Halla los valores que anulan $|A|$.\n3. Para los demás valores: $\\operatorname{rg}A = \\operatorname{rg}A^* = n$, así que el sistema es **SCD**.\n4. **Estudia por separado** cada valor que anula el determinante: sustituye y calcula $\\operatorname{rg}A$ y $\\operatorname{rg}A^*$.\n"
    },
    {
     "title": "Consejos para factorizar",
     "body": "- Antes de desarrollar, busca filas o columnas que se parezcan: sumar todas las filas suele sacar un factor común.\n- Prueba valores sencillos ($1, -1, 2, -2$) con Ruffini para encontrar raíces.\n- Escribe el resultado factorizado, por ejemplo $(a-1)^2(a+2)$: así ves enseguida los valores críticos.\n"
    },
    {
     "title": "Cómo escribir la respuesta",
     "body": "Termina siempre con un resumen ordenado, por ejemplo:\n- Si $a \\neq 1$ y $a \\neq -2$: SCD.\n- Si $a = 1$: SCI (2 parámetros).\n- Si $a = -2$: SI.\n"
    }
   ],
   "examples": [
    {
     "title": "Un sistema clásico",
     "statement": "Discute $\\begin{cases} ax + y + z = 1 \\\\ x + ay + z = 1 \\\\ x + y + az = 1 \\end{cases}$ según los valores de $a$.\n",
     "steps": [
      "**Determinante.** Sumando las tres filas a la primera aparece el factor $a + 2$, y queda $|A| = (a - 1)^2(a + 2)$.\n",
      "**Si $a \\neq 1$ y $a \\neq -2$:** $|A| \\neq 0$, así que $\\operatorname{rg}A = \\operatorname{rg}A^* = 3$: **SCD**.\n",
      "**Si $a = 1$:** las tres ecuaciones son $x + y + z = 1$. Por tanto $\\operatorname{rg}A = \\operatorname{rg}A^* = 1 < 3$: **SCI** con 2 parámetros.\n",
      "**Si $a = -2$:** $\\operatorname{rg}A = 2$ (por ejemplo, $\\begin{vmatrix} -2 & 1 \\\\ 1 & -2 \\end{vmatrix} = 3 \\neq 0$). Al sumar las tres ecuaciones queda $0 = 3$, imposible, así que $\\operatorname{rg}A^* = 3$: **SI**.\n"
     ],
     "result": "Resumen: SCD si $a \\notin \\{1, -2\\}$; SCI si $a = 1$; SI si $a = -2$.\n"
    }
   ],
   "summary": [
    "Primero $|A|$ factorizado; los valores que lo anulan se estudian uno a uno.",
    "Para el resto de valores, el sistema es siempre SCD.",
    "Termina con un resumen claro de todos los casos."
   ],
   "common_errors": [
    "No estudiar por separado los valores que anulan el determinante.",
    "Dividir entre una expresión con el parámetro sin comprobar si puede valer 0."
   ]
  },
  "mat2.ana.derivadas.u01": {
   "id": "mat2.ana.derivadas.u01",
   "objectives": [
    "Entender la derivada como límite y como pendiente.",
    "Estudiar la derivabilidad de funciones a trozos.",
    "Derivar con soltura, incluida la regla de la cadena."
   ],
   "explanation": [
    {
     "title": "La derivada",
     "body": "$$f'(a) = \\lim_{h\\to0}\\frac{f(a + h) - f(a)}{h}$$\nEs la **pendiente de la recta tangente** a la gráfica en $x = a$ y mide la rapidez con la que cambia $f$.\n\n**Derivable $\\Rightarrow$ continua**, pero no al revés: $f(x) = |x|$ es continua en 0 y no derivable (tiene un \"pico\": derivadas laterales $-1$ y $1$).\n"
    },
    {
     "title": "Reglas de derivación",
     "body": "Las más usadas:\n- $(x^n)' = nx^{n-1}$, $\\ (e^x)' = e^x$, $\\ (\\ln x)' = \\frac1x$, $\\ (\\sin x)' = \\cos x$, $\\ (\\cos x)' = -\\sin x$.\n- Producto: $(fg)' = f'g + fg'$. Cociente: $\\left(\\frac fg\\right)' = \\dfrac{f'g - fg'}{g^2}$.\n- **Regla de la cadena:** $(f(g(x)))' = f'(g(x))\\cdot g'(x)$. Por ejemplo, $(e^{x^2})' = e^{x^2}\\cdot 2x$ y $(\\ln(x^2+1))' = \\dfrac{2x}{x^2 + 1}$.\n"
    },
    {
     "title": "Derivabilidad de funciones a trozos",
     "body": "En un punto de unión $x = a$:\n1. Primero, **continuidad** (si no es continua, no es derivable).\n2. Después, las **derivadas laterales** deben coincidir: deriva cada trozo y sustituye $x = a$.\n\nSi hay dos parámetros, la continuidad da una ecuación y la derivabilidad otra.\n"
    }
   ],
   "examples": [
    {
     "title": "Dos parámetros, dos condiciones",
     "statement": "Halla $a$ y $b$ para que $f(x) = \\begin{cases} x^2 & x \\le 1 \\\\ ax + b & x > 1 \\end{cases}$ sea derivable en $x = 1$.\n",
     "steps": [
      "**Continuidad en 1:** $1^2 = a + b$, es decir, $a + b = 1$.\n",
      "**Derivadas laterales:** a la izquierda $2x \\to 2$; a la derecha $a$. Por tanto $a = 2$.\n",
      "**Resultado:** $a = 2$ y $b = -1$. La recta $y = 2x - 1$ es justo la tangente a $y = x^2$ en $x = 1$.\n"
     ],
     "result": "Interpretación: la función es derivable cuando los dos trozos \"empalman\" sin pico.\n"
    }
   ],
   "summary": [
    "$f'(a)$ = pendiente de la tangente. Derivable implica continua.",
    "Regla de la cadena: deriva \"de fuera hacia dentro\" y multiplica.",
    "A trozos: continuidad + derivadas laterales iguales."
   ],
   "common_errors": [
    "Olvidar multiplicar por la derivada de dentro en la regla de la cadena.",
    "Estudiar la derivabilidad sin haber comprobado antes la continuidad."
   ]
  },
  "mat2.ana.derivadas.u02": {
   "id": "mat2.ana.derivadas.u02",
   "objectives": [
    "Enunciar y aplicar los teoremas de Rolle y del valor medio.",
    "Comprobar todas sus hipótesis."
   ],
   "explanation": [
    {
     "title": "Teorema de Rolle",
     "body": "Si $f$ es:\n1. **continua** en $[a, b]$,\n2. **derivable** en $(a, b)$,\n3. y $f(a) = f(b)$,\n\nentonces existe $c \\in (a, b)$ con $f'(c) = 0$: hay un punto de **tangente horizontal**.\n"
    },
    {
     "title": "Teorema del valor medio (Lagrange)",
     "body": "Si $f$ es **continua** en $[a, b]$ y **derivable** en $(a, b)$, existe $c \\in (a, b)$ con\n$$f'(c) = \\frac{f(b) - f(a)}{b - a}$$\nInterpretación: en algún punto, la tangente es **paralela a la cuerda** que une los extremos. En un viaje, en algún instante tu velocidad coincide con la velocidad media.\n\nRolle es el caso particular en que $f(a) = f(b)$.\n"
    },
    {
     "title": "Cómo redactar la respuesta",
     "body": "1. Comprueba **una a una** las hipótesis (continuidad, derivabilidad y, en Rolle, $f(a) = f(b)$). En funciones a trozos o con valor absoluto, suele fallar la derivabilidad.\n2. Aplica el teorema.\n3. Si piden el valor de $c$, resuelve $f'(c) = \\dots$ y quédate solo con las soluciones **dentro** de $(a, b)$.\n"
    }
   ],
   "examples": [
    {
     "title": "Rolle y valor medio",
     "statement": "a) Comprueba Rolle para $f(x) = x^2 - 4x + 3$ en $[1, 3]$. b) Halla el $c$ del valor medio para $g(x) = x^3$ en $[0, 2]$.\n",
     "steps": [
      "**a)** Es un polinomio (continuo y derivable), y $f(1) = 0 = f(3)$. Entonces $f'(c) = 2c - 4 = 0 \\Rightarrow c = 2 \\in (1, 3)$ ✓\n",
      "**b)** Pendiente de la cuerda: $\\dfrac{g(2) - g(0)}{2 - 0} = \\dfrac{8}{2} = 4$.\n",
      "Resolvemos $g'(c) = 3c^2 = 4 \\Rightarrow c = \\pm\\dfrac{2}{\\sqrt3}$. Solo vale $c = \\dfrac{2}{\\sqrt3} \\approx 1{,}15$, que está en $(0, 2)$.\n"
     ],
     "result": "Descartar la solución negativa es lo que distingue una respuesta completa de una a medias.\n"
    }
   ],
   "summary": [
    "Rolle: continua, derivable y $f(a) = f(b)$ $\\Rightarrow$ $f'(c) = 0$.",
    "Valor medio: continua y derivable $\\Rightarrow$ $f'(c) = \\frac{f(b) - f(a)}{b - a}$.",
    "El $c$ debe estar dentro del intervalo abierto."
   ],
   "common_errors": [
    "No comprobar las hipótesis antes de aplicar el teorema.",
    "Dar como válidos valores de $c$ fuera del intervalo."
   ]
  },
  "mat2.ana.derivadas.u03": {
   "id": "mat2.ana.derivadas.u03",
   "objectives": [
    "Estudiar el crecimiento y los extremos relativos de una función.",
    "Plantear y resolver problemas de optimización."
   ],
   "explanation": [
    {
     "title": "Monotonía",
     "body": "- $f'(x) > 0$ en un intervalo: $f$ es **creciente**.\n- $f'(x) < 0$: $f$ es **decreciente**.\n\nMétodo: resuelve $f'(x) = 0$, marca esas raíces (y los puntos fuera del dominio) en la recta real y estudia el signo de $f'$ en cada trozo.\n"
    },
    {
     "title": "Extremos relativos",
     "body": "Los candidatos son los puntos con $f'(x) = 0$. Se clasifican así:\n- Por el **cambio de signo** de $f'$: de $+$ a $-$ es un **máximo**; de $-$ a $+$, un **mínimo**.\n- O con la **segunda derivada**: $f''(a) < 0$ es un máximo; $f''(a) > 0$, un mínimo.\n\nDa siempre el punto completo: $(a, f(a))$.\n"
    },
    {
     "title": "Optimización paso a paso",
     "body": "1. Identifica qué hay que **maximizar o minimizar** y escríbelo como función.\n2. Usa la **condición** del enunciado (la \"ligadura\") para dejarla con **una sola variable**.\n3. Indica el **dominio** con sentido físico (longitudes positivas, etc.).\n4. Deriva, iguala a 0 y comprueba que es máximo o mínimo.\n5. Responde a la pregunta con unidades.\n"
    }
   ],
   "examples": [
    {
     "title": "Extremos y una caja",
     "statement": "a) Halla los extremos de $f(x) = x^3 - 6x^2 + 9x + 1$. b) De una lámina cuadrada de 12 cm de lado se cortan cuatro cuadrados iguales en las esquinas para hacer una caja sin tapa. ¿Qué lado deben tener para que el volumen sea máximo?\n",
     "steps": [
      "**a)** $f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$. El signo de $f'$ es $+, -, +$: máximo en $(1, 5)$ y mínimo en $(3, 1)$.\n",
      "**b)** Si el corte mide $x$, la caja tiene base $(12 - 2x)^2$ y altura $x$: $V(x) = x(12 - 2x)^2$, con $0 < x < 6$.\n",
      "$V'(x) = (12 - 2x)(12 - 6x) = 0 \\Rightarrow x = 2$ (la otra raíz, $x = 6$, deja la caja sin base).\n",
      "Como $V'$ pasa de positiva a negativa en $x = 2$, es un máximo: $V(2) = 2\\cdot8^2 = 128\\ \\text{cm}^3$.\n"
     ],
     "result": "El dominio ($0 < x < 6$) es lo que permite descartar soluciones sin sentido.\n"
    }
   ],
   "summary": [
    "Signo de $f'$: crecimiento y decrecimiento.",
    "Extremos: $f' = 0$ y cambio de signo (o el signo de $f''$).",
    "Optimización: función objetivo, ligadura, una variable, dominio, derivar y comprobar."
   ],
   "common_errors": [
    "Dar solo la abscisa del extremo y no el punto completo.",
    "No justificar que el punto crítico es máximo o mínimo."
   ]
  },
  "mat2.ana.derivadas.u04": {
   "id": "mat2.ana.derivadas.u04",
   "objectives": [
    "Estudiar todos los elementos de una función para dibujarla.",
    "Calcular asíntotas verticales, horizontales y oblicuas."
   ],
   "explanation": [
    {
     "title": "El guion del estudio",
     "body": "1. **Dominio.**\n2. **Simetría:** par si $f(-x) = f(x)$; impar si $f(-x) = -f(x)$.\n3. **Cortes con los ejes.**\n4. **Asíntotas.**\n5. **Monotonía y extremos** (con $f'$).\n6. **Curvatura y puntos de inflexión** (con $f''$).\n7. Tabla de valores y **dibujo**.\n"
    },
    {
     "title": "Asíntotas",
     "body": "- **Vertical** $x = a$: si $\\lim_{x\\to a} f(x) = \\pm\\infty$. Búscalas donde se anula el denominador.\n- **Horizontal** $y = L$: si $\\lim_{x\\to\\pm\\infty} f(x) = L$.\n- **Oblicua** $y = mx + n$, con $m = \\lim\\dfrac{f(x)}{x}$ y $n = \\lim\\,(f(x) - mx)$. En un cociente de polinomios aparece cuando el grado del numerador es **uno más** que el del denominador. Si hay horizontal por un lado, no hay oblicua por ese mismo lado.\n"
    },
    {
     "title": "Curvatura",
     "body": "- $f''(x) > 0$: **convexa** (forma de $\\cup$).\n- $f''(x) < 0$: **cóncava** (forma de $\\cap$).\n- Donde $f''$ cambia de signo hay un **punto de inflexión**.\n"
    }
   ],
   "examples": [
    {
     "title": "Estudio de un cociente",
     "statement": "Estudia las asíntotas y los extremos de $f(x) = \\dfrac{x^2}{x - 1}$.\n",
     "steps": [
      "**Dominio y asíntota vertical:** $\\mathbb{R}\\setminus\\{1\\}$, y $x = 1$ es asíntota vertical (el numerador vale 1 y el denominador tiende a 0).\n",
      "**Oblicua:** dividiendo, $\\dfrac{x^2}{x - 1} = x + 1 + \\dfrac{1}{x - 1}$, así que $y = x + 1$.\n",
      "**Extremos:** $f'(x) = \\dfrac{x^2 - 2x}{(x - 1)^2} = 0 \\Rightarrow x = 0$ o $x = 2$. Signos de $f'$: $+, -, -, +$ (con $x = 1$ en medio).\n",
      "**Resultado:** máximo relativo en $(0, 0)$ y mínimo relativo en $(2, 4)$.\n"
     ],
     "result": "Fíjate en que el \"máximo\" (0) es menor que el \"mínimo\" (4): son extremos **relativos** y están en ramas distintas de la gráfica.\n"
    }
   ],
   "summary": [
    "Dominio, simetría, cortes, asíntotas, $f'$ y $f''$: siempre en este orden.",
    "Oblicua cuando el grado del numerador es uno más que el del denominador.",
    "$f'' > 0$ convexa, $f'' < 0$ cóncava."
   ],
   "common_errors": [
    "Olvidar los puntos fuera del dominio al estudiar el signo de $f'$.",
    "Buscar oblicua cuando ya hay asíntota horizontal por ese lado."
   ]
  },
  "mat2.ana.limites.u01": {
   "id": "mat2.ana.limites.u01",
   "objectives": [
    "Calcular límites y resolver las indeterminaciones más habituales.",
    "Estudiar la continuidad de una función, incluidas las definidas a trozos."
   ],
   "explanation": [
    {
     "title": "Límites e indeterminaciones",
     "body": "$\\lim_{x\\to a} f(x) = L$ significa que $f(x)$ se acerca a $L$ cuando $x$ se acerca a $a$. Si los **límites laterales** son distintos, el límite no existe.\n\nLas indeterminaciones típicas y cómo resolverlas:\n- $\\frac{\\infty}{\\infty}$ con polinomios: compara los grados (o divide entre la mayor potencia).\n- $\\frac00$: factoriza (Ruffini) y simplifica, o usa L'Hôpital.\n- $\\infty - \\infty$ con raíces: multiplica y divide por el **conjugado**.\n- $1^\\infty$: $\\lim f^g = e^{\\lim g\\,(f - 1)}$.\n"
    },
    {
     "title": "La regla de L'Hôpital",
     "body": "Si $\\lim \\frac{f(x)}{g(x)}$ da $\\frac00$ o $\\frac{\\infty}{\\infty}$, entonces\n$$\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)}$$\nsiempre que este último límite exista. Se deriva el numerador y el denominador **por separado** (¡no es la derivada del cociente!). Se puede aplicar varias veces.\n"
    },
    {
     "title": "Continuidad",
     "body": "$f$ es **continua en $x = a$** si se cumplen las tres condiciones:\n1. Existe $f(a)$.\n2. Existe $\\lim_{x\\to a} f(x)$ (los dos límites laterales coinciden).\n3. $\\lim_{x\\to a} f(x) = f(a)$.\n\nTipos de discontinuidad: **evitable** (el límite existe pero no coincide con $f(a)$), **de salto** (los laterales son distintos) y **asintótica** (algún lateral es infinito).\n\nEn las funciones a trozos, solo hay que estudiar los **puntos de unión**: impón que los límites laterales coincidan.\n"
    }
   ],
   "examples": [
    {
     "title": "Un parámetro para que sea continua",
     "statement": "Halla $a$ para que $f(x) = \\begin{cases} x^2 + a & x < 1 \\\\ 2x + 3 & x \\ge 1 \\end{cases}$ sea continua en $\\mathbb{R}$.\n",
     "steps": [
      "**Fuera de $x = 1$:** cada trozo es un polinomio, y por tanto continuo.\n",
      "**En $x = 1$:** límite por la izquierda $1 + a$; por la derecha y $f(1)$: $2 + 3 = 5$.\n",
      "**Igualamos:** $1 + a = 5 \\Rightarrow a = 4$.\n"
     ],
     "result": "Otro límite típico: $\\lim_{x\\to\\infty}\\left(\\sqrt{x^2 + 3x} - x\\right)$. Con el conjugado queda $\\lim\\frac{3x}{\\sqrt{x^2+3x} + x} = \\frac32$.\n"
    }
   ],
   "summary": [
    "Indeterminaciones: grados ($\\infty/\\infty$), factorizar o L'Hôpital ($0/0$), conjugado ($\\infty - \\infty$), número $e$ ($1^\\infty$).",
    "Continua en $a$: existe $f(a)$, existe el límite y coinciden.",
    "A trozos: estudia solo los puntos de unión."
   ],
   "common_errors": [
    "Aplicar L'Hôpital derivando el cociente entero.",
    "Usar L'Hôpital cuando el límite no es una indeterminación."
   ]
  },
  "mat2.ana.limites.u02": {
   "id": "mat2.ana.limites.u02",
   "objectives": [
    "Aplicar el teorema de Bolzano para demostrar que una ecuación tiene solución.",
    "Conocer el teorema de Weierstrass."
   ],
   "explanation": [
    {
     "title": "El teorema de Bolzano",
     "body": "Si $f$ es **continua en $[a, b]$** y $f(a)$ y $f(b)$ tienen **signos distintos**, entonces existe al menos un $c \\in (a, b)$ con $f(c) = 0$.\n\nIdea intuitiva: si dibujas una curva sin levantar el lápiz desde debajo del eje $X$ hasta encima, tienes que cruzarlo.\n"
    },
    {
     "title": "Cómo se usa en la PAU",
     "body": "Para demostrar que una ecuación $g(x) = h(x)$ tiene solución:\n1. Pásalo todo a un lado: $f(x) = g(x) - h(x)$.\n2. Justifica que $f$ es **continua** en el intervalo (no te lo saltes: puntúa).\n3. Calcula $f(a)$ y $f(b)$ y comprueba que tienen signos opuestos.\n4. Concluye con el teorema.\n\n**Unicidad:** si además $f$ es estrictamente creciente o decreciente (por ejemplo, $f' > 0$), la raíz es **única**.\n"
    },
    {
     "title": "El teorema de Weierstrass",
     "body": "Si $f$ es continua en un intervalo **cerrado** $[a, b]$, alcanza en él un **máximo y un mínimo absolutos**. Por eso, en optimización sobre un intervalo cerrado hay que comparar los puntos críticos con los extremos del intervalo.\n"
    }
   ],
   "examples": [
    {
     "title": "Demostrar que hay una raíz",
     "statement": "Demuestra que $x^3 + x - 5 = 0$ tiene una solución en $(1, 2)$ y que es única.\n",
     "steps": [
      "**Continuidad:** $f(x) = x^3 + x - 5$ es un polinomio, continuo en $[1, 2]$.\n",
      "**Signos:** $f(1) = 1 + 1 - 5 = -3 < 0$ y $f(2) = 8 + 2 - 5 = 5 > 0$.\n",
      "**Bolzano:** existe $c \\in (1, 2)$ con $f(c) = 0$.\n",
      "**Unicidad:** $f'(x) = 3x^2 + 1 > 0$, así que $f$ es estrictamente creciente y solo puede cortar el eje una vez.\n"
     ],
     "result": "Bolzano dice que la raíz existe, pero no dónde está exactamente. Para acotarla más, sigue partiendo el intervalo por la mitad (método de bisección).\n"
    }
   ],
   "summary": [
    "Continua en $[a,b]$ y $f(a)\\cdot f(b) < 0$ $\\Rightarrow$ existe $c \\in (a,b)$ con $f(c) = 0$.",
    "Unicidad: monotonía estricta ($f' > 0$ o $f' < 0$).",
    "Weierstrass: continua en $[a,b]$ $\\Rightarrow$ alcanza máximo y mínimo absolutos."
   ],
   "common_errors": [
    "No justificar la continuidad.",
    "Aplicarlo a una función con una asíntota vertical dentro del intervalo."
   ]
  },
  "mat2.geo.metrica.u01": {
   "id": "mat2.geo.metrica.u01",
   "objectives": [
    "Calcular el ángulo entre dos rectas, entre dos planos y entre una recta y un plano."
   ],
   "explanation": [
    {
     "title": "Ángulo entre dos rectas",
     "body": "Es el ángulo agudo que forman sus vectores directores:\n$$\\cos\\alpha = \\frac{|\\vec u\\cdot\\vec v|}{|\\vec u|\\,|\\vec v|}$$\nEl valor absoluto garantiza que el ángulo esté entre $0^\\circ$ y $90^\\circ$.\n"
    },
    {
     "title": "Ángulo entre dos planos",
     "body": "Es el ángulo que forman sus vectores normales:\n$$\\cos\\alpha = \\frac{|\\vec n_1\\cdot\\vec n_2|}{|\\vec n_1|\\,|\\vec n_2|}$$\nDos planos son perpendiculares si $\\vec n_1\\cdot\\vec n_2 = 0$.\n"
    },
    {
     "title": "Ángulo entre recta y plano",
     "body": "Se usa el **seno**, porque el director de la recta se compara con la normal del plano, que es perpendicular al plano:\n$$\\sin\\alpha = \\frac{|\\vec u\\cdot\\vec n|}{|\\vec u|\\,|\\vec n|}$$\n- Recta perpendicular al plano: $\\vec u \\parallel \\vec n$.\n- Recta paralela al plano (o contenida): $\\vec u\\cdot\\vec n = 0$.\n"
    }
   ],
   "examples": [
    {
     "title": "Ángulo entre dos planos",
     "statement": "Calcula el ángulo entre $\\pi_1: x + y = 1$ y $\\pi_2: y + z = 2$.\n",
     "steps": [
      "**Normales:** $\\vec n_1 = (1, 1, 0)$ y $\\vec n_2 = (0, 1, 1)$.\n",
      "**Producto escalar y módulos:** $\\vec n_1\\cdot\\vec n_2 = 1$; $|\\vec n_1| = |\\vec n_2| = \\sqrt2$.\n",
      "**Ángulo:** $\\cos\\alpha = \\dfrac{1}{\\sqrt2\\cdot\\sqrt2} = \\dfrac12 \\Rightarrow \\alpha = 60^\\circ$.\n"
     ],
     "result": "Fíjate en que la $z$ que \"falta\" en $\\pi_1$ es un coeficiente 0, no un 1.\n"
    }
   ],
   "summary": [
    "Rectas: coseno con los directores. Planos: coseno con las normales.",
    "Recta y plano: SENO con el director y la normal.",
    "Usa siempre el valor absoluto para obtener el ángulo agudo."
   ],
   "common_errors": [
    "Usar el coseno en el ángulo recta-plano.",
    "Poner un 1 en la coordenada de una variable que no aparece en la ecuación (debe ser 0)."
   ]
  },
  "mat2.geo.metrica.u02": {
   "id": "mat2.geo.metrica.u02",
   "objectives": [
    "Calcular distancias entre puntos, rectas y planos."
   ],
   "explanation": [
    {
     "title": "Punto-punto y punto-plano",
     "body": "$$d(A, B) = |\\overrightarrow{AB}|$$\n$$d(P, \\pi) = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$\n**Dos planos paralelos:** coge un punto de uno y calcula su distancia al otro.\n\n**Recta paralela a un plano:** distancia de un punto cualquiera de la recta al plano.\n"
    },
    {
     "title": "Punto-recta",
     "body": "Si $A$ es un punto de la recta y $\\vec u$ su director:\n$$d(P, r) = \\frac{|\\overrightarrow{AP}\\times\\vec u|}{|\\vec u|}$$\nEs la altura de un paralelogramo: área entre base.\n"
    },
    {
     "title": "Dos rectas que se cruzan",
     "body": "$$d(r, s) = \\frac{|[\\overrightarrow{AB}, \\vec u, \\vec v]|}{|\\vec u\\times\\vec v|}$$\nEs la altura de un paralelepípedo: volumen entre área de la base. Si las rectas son paralelas, basta con la distancia de un punto de una a la otra.\n"
    }
   ],
   "examples": [
    {
     "title": "Distancia de un punto a un plano",
     "statement": "Calcula la distancia de $P(1, 2, 3)$ al plano $\\pi: 2x - y + 2z - 3 = 0$.\n",
     "steps": [
      "**Numerador:** $|2\\cdot1 - 2 + 2\\cdot3 - 3| = |3| = 3$.\n",
      "**Denominador:** $\\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt9 = 3$.\n",
      "**Distancia:** $d = \\dfrac{3}{3} = 1$ u.\n"
     ],
     "result": "Si el numerador sale 0, el punto está en el plano y la distancia es 0.\n"
    }
   ],
   "summary": [
    "$d(P,\\pi) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2+B^2+C^2}}$.",
    "$d(P, r) = \\dfrac{|\\overrightarrow{AP}\\times\\vec u|}{|\\vec u|}$.",
    "Rectas que se cruzan: producto mixto entre módulo del producto vectorial."
   ],
   "common_errors": [
    "Olvidar el valor absoluto del numerador.",
    "Usar la fórmula de punto-plano con la ecuación sin igualar a 0."
   ]
  },
  "mat2.geo.metrica.u03": {
   "id": "mat2.geo.metrica.u03",
   "objectives": [
    "Calcular áreas de triángulos y paralelogramos y volúmenes de paralelepípedos y tetraedros."
   ],
   "explanation": [
    {
     "title": "Áreas",
     "body": "- **Paralelogramo** de lados $\\vec u$ y $\\vec v$: $S = |\\vec u\\times\\vec v|$.\n- **Triángulo** $ABC$: $S = \\dfrac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.\n"
    },
    {
     "title": "Volúmenes",
     "body": "- **Paralelepípedo** de aristas $\\vec u, \\vec v, \\vec w$: $V = |[\\vec u, \\vec v, \\vec w]|$.\n- **Tetraedro** $ABCD$: $V = \\dfrac16\\left|[\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}]\\right|$.\n\nSi el volumen sale 0, los cuatro puntos son coplanarios: no hay tetraedro.\n"
    },
    {
     "title": "Ejercicios \"inversos\"",
     "body": "A veces dan el área o el volumen y piden una coordenada desconocida. Plantea la fórmula con la incógnita, iguálala al valor dado y resuelve. **Ojo con el valor absoluto:** suele haber dos soluciones.\n"
    }
   ],
   "examples": [
    {
     "title": "Volumen de un tetraedro",
     "statement": "Calcula el volumen del tetraedro de vértices $O(0,0,0)$, $A(2,0,0)$, $B(0,3,0)$ y $C(0,0,4)$.\n",
     "steps": [
      "**Vectores desde $O$:** $\\overrightarrow{OA} = (2,0,0)$, $\\overrightarrow{OB} = (0,3,0)$ y $\\overrightarrow{OC} = (0,0,4)$.\n",
      "**Producto mixto:** $\\begin{vmatrix} 2 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 4 \\end{vmatrix} = 24$.\n",
      "**Volumen:** $V = \\dfrac{24}{6} = 4\\ \\text{u}^3$.\n"
     ],
     "result": "Coincide con la fórmula de la pirámide, $\\frac13\\cdot\\text{base}\\cdot\\text{altura} = \\frac13\\cdot3\\cdot4 = 4$ ✓\n"
    }
   ],
   "summary": [
    "Triángulo: $\\frac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.",
    "Tetraedro: $\\frac16|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]|$.",
    "En los problemas inversos, el valor absoluto da dos soluciones."
   ],
   "common_errors": [
    "Olvidar el $\\frac12$ o el $\\frac16$.",
    "Perder una de las dos soluciones al quitar el valor absoluto."
   ]
  },
  "mat2.geo.rectas-planos.u01": {
   "id": "mat2.geo.rectas-planos.u01",
   "objectives": [
    "Escribir las ecuaciones de una recta y de un plano en sus distintas formas.",
    "Pasar de una forma a otra."
   ],
   "explanation": [
    {
     "title": "Ecuaciones de la recta",
     "body": "Una recta queda determinada por un **punto** $P(x_0, y_0, z_0)$ y un **vector director** $\\vec u = (u_1, u_2, u_3)$:\n- **Vectorial:** $(x, y, z) = (x_0, y_0, z_0) + \\lambda(u_1, u_2, u_3)$.\n- **Paramétricas:** $x = x_0 + \\lambda u_1$, $y = y_0 + \\lambda u_2$, $z = z_0 + \\lambda u_3$.\n- **Continua:** $\\dfrac{x - x_0}{u_1} = \\dfrac{y - y_0}{u_2} = \\dfrac{z - z_0}{u_3}$.\n- **Implícitas:** como intersección de dos planos. Su vector director es $\\vec n_1\\times\\vec n_2$.\n"
    },
    {
     "title": "Ecuaciones del plano",
     "body": "Un plano queda determinado por un punto y **dos vectores** no paralelos, o por un punto y un **vector normal** $\\vec n = (A, B, C)$:\n- **General:** $Ax + By + Cz + D = 0$. ¡Los coeficientes son las coordenadas del vector normal!\n- **Por tres puntos** $P, Q, R$: el normal es $\\vec n = \\overrightarrow{PQ}\\times\\overrightarrow{PR}$ y $D$ se obtiene sustituyendo uno de los puntos.\n- Equivalente: $\\begin{vmatrix} x - x_0 & y - y_0 & z - z_0 \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix} = 0$.\n"
    },
    {
     "title": "¿Un punto está en la recta o en el plano?",
     "body": "- **Plano:** sustituye el punto en la ecuación general. Si da 0, pertenece.\n- **Recta:** sustituye en las paramétricas y comprueba que el mismo $\\lambda$ cumple las tres ecuaciones.\n"
    }
   ],
   "examples": [
    {
     "title": "Plano por tres puntos",
     "statement": "Halla la ecuación general del plano que pasa por $A(1, 0, 0)$, $B(0, 2, 0)$ y $C(0, 0, 3)$.\n",
     "steps": [
      "**Vectores del plano:** $\\overrightarrow{AB} = (-1, 2, 0)$ y $\\overrightarrow{AC} = (-1, 0, 3)$.\n",
      "**Normal:** $\\overrightarrow{AB}\\times\\overrightarrow{AC} = (2\\cdot3 - 0\\cdot0,\\ 0\\cdot(-1) - (-1)\\cdot3,\\ (-1)\\cdot0 - 2\\cdot(-1)) = (6, 3, 2)$.\n",
      "**Ecuación:** $6x + 3y + 2z + D = 0$. Sustituyendo $A$: $6 + D = 0 \\Rightarrow D = -6$.\n",
      "**Resultado:** $6x + 3y + 2z - 6 = 0$. Comprobación con $B$: $0 + 6 + 0 - 6 = 0$ ✓\n"
     ],
     "result": "Dividiendo entre 6 queda $\\frac{x}{1} + \\frac{y}{2} + \\frac{z}{3} = 1$: la forma **segmentaria**, que muestra los cortes con los ejes.\n"
    }
   ],
   "summary": [
    "Recta: punto + vector director (vectorial, paramétricas, continua o implícitas).",
    "Plano: $Ax + By + Cz + D = 0$, con $(A, B, C)$ el vector normal.",
    "Plano por tres puntos: normal $= \\overrightarrow{PQ}\\times\\overrightarrow{PR}$."
   ],
   "common_errors": [
    "Confundir el vector director de una recta con el normal de un plano.",
    "Olvidar comprobar la ecuación final con los puntos del enunciado."
   ]
  },
  "mat2.geo.rectas-planos.u02": {
   "id": "mat2.geo.rectas-planos.u02",
   "objectives": [
    "Estudiar la posición relativa de dos planos, de recta y plano, y de dos rectas."
   ],
   "explanation": [
    {
     "title": "Dos planos",
     "body": "Compara los coeficientes de $\\pi_1: A_1x + B_1y + C_1z + D_1 = 0$ y $\\pi_2: A_2x + B_2y + C_2z + D_2 = 0$:\n- **Coincidentes:** los cuatro coeficientes son proporcionales.\n- **Paralelos:** $A, B, C$ son proporcionales, pero $D$ no.\n- **Secantes:** los vectores normales no son proporcionales. Se cortan en una recta.\n\nCon rangos: $\\operatorname{rg}\\begin{pmatrix} A_1 & B_1 & C_1 \\\\ A_2 & B_2 & C_2 \\end{pmatrix} = 2$ significa que son secantes.\n"
    },
    {
     "title": "Recta y plano",
     "body": "Sea la recta con director $\\vec u$ y punto $P$, y el plano con normal $\\vec n$:\n- $\\vec u\\cdot\\vec n \\neq 0$: **secantes** (se cortan en un punto).\n- $\\vec u\\cdot\\vec n = 0$ y $P \\notin \\pi$: **paralelos**.\n- $\\vec u\\cdot\\vec n = 0$ y $P \\in \\pi$: **recta contenida** en el plano.\n\nPara hallar el punto de corte, sustituye las paramétricas de la recta en la ecuación del plano y despeja $\\lambda$.\n"
    },
    {
     "title": "Dos rectas",
     "body": "Con directores $\\vec u$ y $\\vec v$, puntos $A \\in r$ y $B \\in s$:\n- $\\vec u \\parallel \\vec v$: **paralelas** o **coincidentes** (coinciden si $B \\in r$).\n- $\\vec u \\not\\parallel \\vec v$ y $[\\vec u, \\vec v, \\overrightarrow{AB}] = 0$: **secantes** (están en el mismo plano y se cortan).\n- $[\\vec u, \\vec v, \\overrightarrow{AB}] \\neq 0$: **se cruzan** (no están en el mismo plano).\n"
    }
   ],
   "examples": [
    {
     "title": "¿Se cortan o se cruzan?",
     "statement": "Estudia la posición de $r: (x,y,z) = (1, 0, 0) + \\lambda(1, 1, 0)$ y $s: (x,y,z) = (0, 1, 1) + \\mu(1, -1, 0)$.\n",
     "steps": [
      "**Directores:** $\\vec u = (1, 1, 0)$ y $\\vec v = (1, -1, 0)$ no son proporcionales: las rectas no son paralelas.\n",
      "**Vector entre puntos:** $\\overrightarrow{AB} = (0, 1, 1) - (1, 0, 0) = (-1, 1, 1)$.\n",
      "**Producto mixto:** $\\begin{vmatrix} 1 & 1 & 0 \\\\ 1 & -1 & 0 \\\\ -1 & 1 & 1 \\end{vmatrix} = -2 \\neq 0$.\n"
     ],
     "result": "Las rectas **se cruzan**: no son paralelas y no están en el mismo plano.\n"
    }
   ],
   "summary": [
    "Planos: compara la proporcionalidad de los coeficientes (o usa rangos).",
    "Recta y plano: mira $\\vec u\\cdot\\vec n$ y después si el punto de la recta está en el plano.",
    "Dos rectas: paralelismo de los directores y producto mixto $[\\vec u, \\vec v, \\overrightarrow{AB}]$."
   ],
   "common_errors": [
    "Decir que dos rectas no paralelas se cortan sin comprobar el producto mixto.",
    "Confundir paralelos con coincidentes: hay que mirar también el término independiente."
   ]
  },
  "mat2.geo.vectores.u01": {
   "id": "mat2.geo.vectores.u01",
   "objectives": [
    "Operar con vectores en coordenadas.",
    "Calcular el producto escalar, el módulo y el ángulo entre dos vectores."
   ],
   "explanation": [
    {
     "title": "Vectores en el espacio",
     "body": "Un vector $\\vec u = (u_1, u_2, u_3)$ tiene **módulo** (longitud), **dirección** y **sentido**.\n- El vector que va de $A$ a $B$ es $\\overrightarrow{AB} = B - A$ (extremo menos origen).\n- Módulo: $|\\vec u| = \\sqrt{u_1^2 + u_2^2 + u_3^2}$.\n- Dos vectores son **paralelos** si sus coordenadas son proporcionales.\n- El **punto medio** de $AB$ es $M = \\dfrac{A + B}{2}$.\n"
    },
    {
     "title": "El producto escalar",
     "body": "Es un **número**:\n$$\\vec u\\cdot\\vec v = u_1v_1 + u_2v_2 + u_3v_3 = |\\vec u|\\,|\\vec v|\\cos\\alpha$$\nDe la segunda forma sale el ángulo entre dos vectores:\n$$\\cos\\alpha = \\frac{\\vec u\\cdot\\vec v}{|\\vec u|\\,|\\vec v|}$$\n"
    },
    {
     "title": "La perpendicularidad",
     "body": "$$\\vec u \\perp \\vec v \\iff \\vec u\\cdot\\vec v = 0$$\nEs la herramienta más usada de la geometría de la PAU: sirve para comprobar si dos rectas son perpendiculares, para hallar planos perpendiculares, proyecciones, etc.\n\nSi el producto escalar es positivo, el ángulo es agudo; si es negativo, obtuso.\n"
    }
   ],
   "examples": [
    {
     "title": "Ángulo entre dos vectores",
     "statement": "Calcula el ángulo que forman $\\vec u = (1, 2, 2)$ y $\\vec v = (2, -1, 2)$.\n",
     "steps": [
      "**Producto escalar:** $\\vec u\\cdot\\vec v = 1\\cdot2 + 2\\cdot(-1) + 2\\cdot2 = 4$.\n",
      "**Módulos:** $|\\vec u| = \\sqrt{1 + 4 + 4} = 3$ y $|\\vec v| = \\sqrt{4 + 1 + 4} = 3$.\n",
      "**Ángulo:** $\\cos\\alpha = \\dfrac{4}{3\\cdot3} = \\dfrac49 \\Rightarrow \\alpha \\approx 63{,}6^\\circ$.\n"
     ],
     "result": "Como el producto escalar es positivo, el ángulo es agudo, como cabía esperar.\n"
    }
   ],
   "summary": [
    "$\\overrightarrow{AB} = B - A$ y $|\\vec u| = \\sqrt{u_1^2 + u_2^2 + u_3^2}$.",
    "$\\vec u\\cdot\\vec v = u_1v_1 + u_2v_2 + u_3v_3 = |\\vec u||\\vec v|\\cos\\alpha$.",
    "Perpendiculares $\\iff \\vec u\\cdot\\vec v = 0$."
   ],
   "common_errors": [
    "Calcular $\\overrightarrow{AB}$ como $A - B$.",
    "Olvidar la raíz cuadrada al calcular el módulo."
   ]
  },
  "mat2.geo.vectores.u02": {
   "id": "mat2.geo.vectores.u02",
   "objectives": [
    "Calcular el producto vectorial y el producto mixto.",
    "Usarlos para obtener vectores perpendiculares, áreas y volúmenes."
   ],
   "explanation": [
    {
     "title": "El producto vectorial",
     "body": "$\\vec u\\times\\vec v$ es un **vector** perpendicular a $\\vec u$ y a $\\vec v$. Se calcula con un \"determinante\":\n$$\\vec u\\times\\vec v = \\begin{vmatrix} \\vec i & \\vec j & \\vec k \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix} = (u_2v_3 - u_3v_2,\\ u_3v_1 - u_1v_3,\\ u_1v_2 - u_2v_1)$$\nPropiedades:\n- Su módulo es el **área del paralelogramo** que forman $\\vec u$ y $\\vec v$: $|\\vec u\\times\\vec v| = |\\vec u||\\vec v|\\sin\\alpha$.\n- $\\vec u\\times\\vec v = -\\vec v\\times\\vec u$ (no es conmutativo).\n- $\\vec u\\times\\vec v = \\vec 0 \\iff$ los vectores son paralelos.\n"
    },
    {
     "title": "El producto mixto",
     "body": "$$[\\vec u, \\vec v, \\vec w] = \\vec u\\cdot(\\vec v\\times\\vec w) = \\begin{vmatrix} u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\\\ w_1 & w_2 & w_3 \\end{vmatrix}$$\n- Su valor absoluto es el **volumen del paralelepípedo** formado por los tres vectores.\n- Vale 0 si y solo si los tres vectores son **coplanarios**. Así se comprueba si 4 puntos están en el mismo plano.\n"
    },
    {
     "title": "¿Para qué sirven en la PAU?",
     "body": "- **Vector normal de un plano:** el producto vectorial de dos vectores del plano.\n- **Vector director de una recta** dada como intersección de dos planos: $\\vec n_1\\times\\vec n_2$.\n- **Áreas** (triángulos: la mitad del paralelogramo) y **volúmenes** (tetraedros: la sexta parte del paralelepípedo).\n"
    }
   ],
   "examples": [
    {
     "title": "Producto vectorial y área",
     "statement": "Calcula $\\vec u\\times\\vec v$ con $\\vec u = (1, 0, 2)$ y $\\vec v = (0, 1, 1)$, y el área del paralelogramo que forman.\n",
     "steps": [
      "**Componentes:** $(0\\cdot1 - 2\\cdot1,\\ 2\\cdot0 - 1\\cdot1,\\ 1\\cdot1 - 0\\cdot0) = (-2, -1, 1)$.\n",
      "**Comprobación:** $(-2,-1,1)\\cdot(1,0,2) = -2 + 0 + 2 = 0$ y $(-2,-1,1)\\cdot(0,1,1) = 0 - 1 + 1 = 0$: es perpendicular a ambos ✓\n",
      "**Área:** $|\\vec u\\times\\vec v| = \\sqrt{4 + 1 + 1} = \\sqrt6 \\approx 2{,}45\\ \\text{u}^2$.\n"
     ],
     "result": "Comprobar la perpendicularidad con el producto escalar detecta casi cualquier error de signo.\n"
    }
   ],
   "summary": [
    "$\\vec u\\times\\vec v$: vector perpendicular a ambos; su módulo es el área del paralelogramo.",
    "$[\\vec u,\\vec v,\\vec w]$: determinante 3×3; su valor absoluto es el volumen del paralelepípedo.",
    "Producto mixto 0 $\\iff$ vectores coplanarios."
   ],
   "common_errors": [
    "Equivocarse de signo en la segunda componente del producto vectorial.",
    "Olvidar dividir entre 2 (triángulo) o entre 6 (tetraedro)."
   ]
  },
  "mat2.int.definida.u01": {
   "id": "mat2.int.definida.u01",
   "objectives": [
    "Calcular integrales definidas con la regla de Barrow.",
    "Aplicar el teorema fundamental del cálculo."
   ],
   "explanation": [
    {
     "title": "La integral definida",
     "body": "$\\int_a^b f(x)\\,dx$ es el **área con signo** entre la gráfica de $f$ y el eje $X$, desde $x = a$ hasta $x = b$: cuenta positiva por encima del eje y negativa por debajo.\n\nPropiedades:\n- $\\int_a^a f = 0$ y $\\int_b^a f = -\\int_a^b f$.\n- $\\int_a^b f = \\int_a^c f + \\int_c^b f$.\n"
    },
    {
     "title": "Regla de Barrow",
     "body": "Si $F$ es una primitiva de $f$ (continua en $[a, b]$):\n$$\\int_a^b f(x)\\,dx = \\big[F(x)\\big]_a^b = F(b) - F(a)$$\nLa constante $C$ se cancela, así que no hace falta escribirla.\n"
    },
    {
     "title": "Teorema fundamental del cálculo",
     "body": "Si $f$ es continua, la función $F(x) = \\int_a^x f(t)\\,dt$ es derivable y\n$$F'(x) = f(x)$$\nCon la regla de la cadena: $\\dfrac{d}{dx}\\int_a^{g(x)} f(t)\\,dt = f(g(x))\\cdot g'(x)$.\n\nSe usa en ejercicios que piden extremos o límites de funciones definidas mediante una integral.\n"
    }
   ],
   "examples": [
    {
     "title": "Barrow y teorema fundamental",
     "statement": "a) Calcula $\\int_0^2 (3x^2 - 2x)\\,dx$. b) Deriva $F(x) = \\int_0^{x^2}\\sin t\\,dt$.\n",
     "steps": [
      "**a)** Primitiva: $x^3 - x^2$. Barrow: $(8 - 4) - (0 - 0) = 4$.\n",
      "**b)** Por el teorema fundamental y la regla de la cadena: $F'(x) = \\sin(x^2)\\cdot 2x$.\n"
     ],
     "result": "En b) no hace falta calcular la integral: basta con \"sustituir el límite superior y multiplicar por su derivada\".\n"
    }
   ],
   "summary": [
    "Barrow: $\\int_a^b f = F(b) - F(a)$.",
    "La integral definida es un área con signo.",
    "$\\left(\\int_a^{g(x)} f(t)\\,dt\\right)' = f(g(x))\\,g'(x)$."
   ],
   "common_errors": [
    "Restar al revés: es $F(b) - F(a)$, no $F(a) - F(b)$.",
    "Olvidar la derivada de $g(x)$ en el teorema fundamental."
   ]
  },
  "mat2.int.definida.u02": {
   "id": "mat2.int.definida.u02",
   "objectives": [
    "Calcular el área entre una curva y el eje X.",
    "Calcular el área entre dos curvas."
   ],
   "explanation": [
    {
     "title": "Área entre una curva y el eje X",
     "body": "La integral resta las zonas que quedan por debajo del eje. Para obtener un **área** (siempre positiva):\n1. Halla los **cortes con el eje $X$** dentro del intervalo.\n2. Divide el intervalo en esos puntos.\n3. Integra en cada trozo y suma los **valores absolutos**.\n"
    },
    {
     "title": "Área entre dos curvas",
     "body": "1. Halla los **puntos de corte** resolviendo $f(x) = g(x)$.\n2. En cada intervalo, averigua qué función está por encima (sustituye un punto intermedio).\n3. $\\text{Área} = \\int_a^b \\big(f_{\\text{arriba}} - f_{\\text{abajo}}\\big)\\,dx$.\n\nSi las curvas se cruzan varias veces, divide en trozos o integra $|f - g|$.\n"
    },
    {
     "title": "Consejos",
     "body": "- Haz un **esbozo** de las gráficas: evita errores y la PAU lo valora.\n- El resultado lleva unidades: $\\text{u}^2$.\n- Si sale un área negativa, has restado al revés.\n"
    }
   ],
   "examples": [
    {
     "title": "Dos áreas típicas",
     "statement": "a) Área entre $y = x^2$ e $y = x$. b) Área entre $y = x^2 - 4$ y el eje $X$ en $[0, 3]$.\n",
     "steps": [
      "**a)** Cortes: $x^2 = x \\Rightarrow x = 0,\\ x = 1$. En $(0,1)$ la recta está por encima (en $x = \\frac12$: $\\frac12 > \\frac14$). Área $= \\int_0^1 (x - x^2)\\,dx = \\frac12 - \\frac13 = \\frac16\\ \\text{u}^2$.\n",
      "**b)** Corte con el eje en $x = 2$. Primitiva: $F(x) = \\frac{x^3}{3} - 4x$.\n",
      "En $[0, 2]$: $|F(2) - F(0)| = \\left|\\frac83 - 8\\right| = \\frac{16}{3}$. En $[2, 3]$: $F(3) - F(2) = -3 + \\frac{16}{3} = \\frac73$.\n",
      "Área total: $\\frac{16}{3} + \\frac73 = \\frac{23}{3} \\approx 7{,}67\\ \\text{u}^2$.\n"
     ],
     "result": "Sin partir en $x = 2$ saldría $\\int_0^3 (x^2 - 4)\\,dx = -3$: un resultado sin sentido como área.\n"
    }
   ],
   "summary": [
    "Con el eje: parte en los cortes y suma valores absolutos.",
    "Entre curvas: $\\int (\\text{arriba} - \\text{abajo})$ entre los puntos de corte.",
    "Haz un esbozo y pon las unidades ($\\text{u}^2$)."
   ],
   "common_errors": [
    "Integrar de golpe una función que cambia de signo en el intervalo.",
    "No comprobar qué curva está por encima."
   ]
  },
  "mat2.int.primitivas.u01": {
   "id": "mat2.int.primitivas.u01",
   "objectives": [
    "Entender la integral indefinida como la operación inversa de derivar.",
    "Calcular primitivas inmediatas y de tipo compuesto."
   ],
   "explanation": [
    {
     "title": "¿Qué es una primitiva?",
     "body": "$F$ es una **primitiva** de $f$ si $F'(x) = f(x)$. Como la derivada de una constante es 0, hay infinitas primitivas, que se diferencian en una constante:\n$$\\int f(x)\\,dx = F(x) + C$$\n**Comprobación:** deriva tu resultado. Si obtienes el integrando, está bien.\n"
    },
    {
     "title": "Tabla básica",
     "body": "- $\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C$ (con $n \\neq -1$).\n- $\\int \\dfrac1x\\,dx = \\ln|x| + C$.\n- $\\int e^x\\,dx = e^x + C$ y $\\int a^x\\,dx = \\dfrac{a^x}{\\ln a} + C$.\n- $\\int \\sin x\\,dx = -\\cos x + C$ y $\\int \\cos x\\,dx = \\sin x + C$.\n- $\\int \\dfrac{1}{1 + x^2}\\,dx = \\arctan x + C$.\n\nLinealidad: $\\int (af + bg) = a\\int f + b\\int g$.\n"
    },
    {
     "title": "Inmediatas de tipo compuesto",
     "body": "Son la regla de la cadena \"al revés\": si aparece una función **y su derivada**, es inmediata.\n- $\\int f'\\,f^n = \\dfrac{f^{n+1}}{n+1} + C$.\n- $\\int \\dfrac{f'}{f} = \\ln|f| + C$.\n- $\\int f'\\,e^f = e^f + C$.\n- $\\int f'\\cos f = \\sin f + C$.\n\nSi falta una constante, se \"fabrica\": $\\int x\\,e^{x^2}dx = \\frac12\\int 2x\\,e^{x^2}dx = \\frac12 e^{x^2} + C$.\n"
    }
   ],
   "examples": [
    {
     "title": "Dos primitivas",
     "statement": "Calcula a) $\\int\\left(3x^2 + \\dfrac2x - e^x\\right)dx$ y b) $\\int \\dfrac{2x}{x^2 + 1}\\,dx$.\n",
     "steps": [
      "**a)** Término a término: $x^3 + 2\\ln|x| - e^x + C$.\n",
      "**b)** El numerador es la derivada del denominador: es del tipo $\\frac{f'}{f}$, así que da $\\ln(x^2 + 1) + C$. No hace falta valor absoluto porque $x^2 + 1 > 0$.\n",
      "**Comprobación de b):** $\\left(\\ln(x^2+1)\\right)' = \\dfrac{2x}{x^2+1}$ ✓\n"
     ],
     "result": "Antes de lanzarte a métodos largos, busca siempre \"una función y su derivada\".\n"
    }
   ],
   "summary": [
    "$\\int f = F + C$ con $F' = f$. Comprueba derivando.",
    "Tipos compuestos: $f'f^n$, $\\frac{f'}{f}$, $f'e^f$, $f'\\cos f$...",
    "Si falta una constante, multiplica y divide por ella."
   ],
   "common_errors": [
    "Olvidar la constante $+C$.",
    "Aplicar $\\frac{x^{n+1}}{n+1}$ con $n = -1$: ese caso es el logaritmo."
   ]
  },
  "mat2.int.primitivas.u02": {
   "id": "mat2.int.primitivas.u02",
   "objectives": [
    "Integrar por partes y elegir bien las partes.",
    "Aplicar un cambio de variable.",
    "Integrar funciones racionales sencillas."
   ],
   "explanation": [
    {
     "title": "Integración por partes",
     "body": "$$\\int u\\,dv = u\\,v - \\int v\\,du$$\nSirve para **productos** de funciones de distinto tipo. Para elegir $u$ (la parte que se deriva), la regla **ALPES** da la prioridad: **A**rcos, **L**ogaritmos, **P**olinomios, **E**xponenciales, **S**enos y cosenos.\n\nEjemplos: $\\int x e^x dx$ ($u = x$) y $\\int \\ln x\\,dx$ ($u = \\ln x$, $dv = dx$).\n"
    },
    {
     "title": "Cambio de variable",
     "body": "Si aparece una expresión \"complicada\" y su derivada, haz $t = g(x)$, $dt = g'(x)\\,dx$, y reescribe todo en función de $t$:\n$$\\int x\\cos(x^2)\\,dx \\quad\\xrightarrow{t = x^2,\\ dt = 2x\\,dx}\\quad \\frac12\\int\\cos t\\,dt = \\frac12\\sin(x^2) + C$$\nAl final, **deshaz el cambio**. En una integral definida, cambia también los límites.\n"
    },
    {
     "title": "Funciones racionales",
     "body": "Para $\\int \\frac{P(x)}{Q(x)}dx$:\n1. Si el grado de $P$ es mayor o igual que el de $Q$, primero **divide**.\n2. Factoriza el denominador y descompón en **fracciones simples**:\n$$\\frac{1}{x^2 - 1} = \\frac{1/2}{x - 1} - \\frac{1/2}{x + 1}$$\n3. Cada fracción da un logaritmo: $\\int\\frac{dx}{x^2 - 1} = \\frac12\\ln\\left|\\frac{x - 1}{x + 1}\\right| + C$.\n"
    }
   ],
   "examples": [
    {
     "title": "Dos veces por partes",
     "statement": "Calcula $\\int x\\,e^x\\,dx$ y $\\int \\ln x\\,dx$.\n",
     "steps": [
      "**Primera:** $u = x$, $dv = e^x dx$, así que $du = dx$ y $v = e^x$:\n$$\\int x e^x dx = x e^x - \\int e^x dx = (x - 1)e^x + C$$\n",
      "**Segunda:** $u = \\ln x$, $dv = dx$, así que $du = \\frac1x dx$ y $v = x$:\n$$\\int \\ln x\\,dx = x\\ln x - \\int x\\cdot\\frac1x\\,dx = x\\ln x - x + C$$\n",
      "**Comprobación:** $(x\\ln x - x)' = \\ln x + 1 - 1 = \\ln x$ ✓\n"
     ],
     "result": "Si al aplicar partes la nueva integral es más difícil que la original, cambia la elección de $u$.\n"
    }
   ],
   "summary": [
    "Partes: $\\int u\\,dv = uv - \\int v\\,du$, con $u$ elegida por ALPES.",
    "Cambio de variable: $t = g(x)$ y al final deshacer el cambio.",
    "Racionales: dividir si hace falta y descomponer en fracciones simples."
   ],
   "common_errors": [
    "Elegir $u = e^x$ en $\\int x e^x$: la integral se complica.",
    "Olvidar deshacer el cambio de variable."
   ]
  },
  "mat2.pro.distribuciones.u01": {
   "id": "mat2.pro.distribuciones.u01",
   "objectives": [
    "Reconocer una distribución binomial.",
    "Calcular probabilidades, media y desviación típica."
   ],
   "explanation": [
    {
     "title": "Variable aleatoria discreta",
     "body": "Una **variable aleatoria** asigna un número a cada resultado de un experimento (por ejemplo, \"número de caras\"). Si toma valores aislados, es **discreta**, y se describe con su función de probabilidad $P(X = x_i)$.\n- Media: $\\mu = \\sum x_i\\,p_i$.\n- Varianza: $\\sigma^2 = \\sum x_i^2\\,p_i - \\mu^2$.\n"
    },
    {
     "title": "La distribución binomial",
     "body": "$X \\sim B(n, p)$ cuenta el **número de éxitos** en $n$ repeticiones **independientes** de un experimento con dos resultados (éxito con probabilidad $p$, fracaso con $q = 1 - p$):\n$$P(X = k) = \\binom{n}{k}p^k q^{n-k}, \\qquad \\binom nk = \\frac{n!}{k!\\,(n-k)!}$$\n- Media: $\\mu = np$.\n- Desviación típica: $\\sigma = \\sqrt{npq}$.\n"
    },
    {
     "title": "Probabilidades acumuladas",
     "body": "- \"Como mucho $k$\": $P(X \\le k) = P(X = 0) + \\dots + P(X = k)$.\n- \"Al menos uno\": usa el contrario, $P(X \\ge 1) = 1 - P(X = 0) = 1 - q^n$.\n\nAntes de calcular, comprueba las condiciones: número fijo de pruebas, independencia y probabilidad de éxito constante.\n"
    }
   ],
   "examples": [
    {
     "title": "Diez lanzamientos a canasta",
     "statement": "Un jugador encesta el 30 % de sus triples. Si lanza 10, calcula a) $P(X = 2)$; b) $P(X \\le 1)$; c) la media.\n",
     "steps": [
      "**Modelo:** $X \\sim B(10;\\ 0{,}3)$.\n",
      "**a)** $P(X = 2) = \\binom{10}{2}0{,}3^2\\cdot0{,}7^8 = 45\\cdot0{,}09\\cdot0{,}0576 \\approx 0{,}2335$.\n",
      "**b)** $P(X \\le 1) = 0{,}7^{10} + 10\\cdot0{,}3\\cdot0{,}7^9 \\approx 0{,}0282 + 0{,}1211 = 0{,}1493$.\n",
      "**c)** $\\mu = np = 10\\cdot0{,}3 = 3$ triples.\n"
     ],
     "result": "Encestar como mucho uno ocurre en casi el 15 % de las series: es poco probable, pero nada raro.\n"
    }
   ],
   "summary": [
    "$B(n,p)$: $n$ pruebas independientes con probabilidad de éxito constante $p$.",
    "$P(X = k) = \\binom nk p^k q^{n-k}$; $\\mu = np$; $\\sigma = \\sqrt{npq}$.",
    "\"Al menos uno\": $1 - P(X = 0)$."
   ],
   "common_errors": [
    "Olvidar el número combinatorio $\\binom nk$.",
    "Confundir \"menos de 2\" ($X \\le 1$) con \"como mucho 2\" ($X \\le 2$)."
   ]
  },
  "mat2.pro.distribuciones.u02": {
   "id": "mat2.pro.distribuciones.u02",
   "objectives": [
    "Tipificar una variable normal y usar la tabla de la N(0, 1).",
    "Calcular probabilidades de intervalos y resolver problemas inversos."
   ],
   "explanation": [
    {
     "title": "La distribución normal",
     "body": "$X \\sim N(\\mu, \\sigma)$ es una variable **continua** con forma de **campana**, simétrica respecto a la media $\\mu$. La desviación típica $\\sigma$ indica lo \"ancha\" que es.\n\nEn una variable continua, $P(X = a) = 0$, así que da igual escribir $<$ o $\\le$.\n\nRegla práctica: en $\\mu \\pm \\sigma$ está el 68 % de los datos; en $\\mu \\pm 2\\sigma$, el 95 %; en $\\mu \\pm 3\\sigma$, el 99,7 %.\n"
    },
    {
     "title": "Tipificar",
     "body": "Se pasa a la normal estándar $Z \\sim N(0, 1)$, que es la que aparece en la tabla:\n$$Z = \\frac{X - \\mu}{\\sigma}$$\nLa tabla da $P(Z \\le z)$ para $z \\ge 0$. El resto sale de la simetría:\n- $P(Z \\ge z) = 1 - P(Z \\le z)$.\n- $P(Z \\le -z) = 1 - P(Z \\le z)$.\n- $P(a \\le Z \\le b) = P(Z \\le b) - P(Z \\le a)$.\n"
    },
    {
     "title": "Problemas inversos",
     "body": "Si te dan una probabilidad y piden el valor: busca en el **interior** de la tabla el $z$ que corresponde a esa probabilidad y deshaz la tipificación: $x = \\mu + z\\,\\sigma$.\n\nEjemplo: \"el 10 % más alto\" corresponde a $P(Z \\le z) = 0{,}90$, es decir, $z \\approx 1{,}28$.\n"
    }
   ],
   "examples": [
    {
     "title": "Estaturas",
     "statement": "La estatura de un grupo sigue una $N(170, 10)$ (en cm). Calcula la probabilidad de que una persona mida entre 160 y 185 cm.\n",
     "steps": [
      "**Tipificar:** $z_1 = \\dfrac{160 - 170}{10} = -1$ y $z_2 = \\dfrac{185 - 170}{10} = 1{,}5$.\n",
      "**Tabla:** $P(Z \\le 1{,}5) = 0{,}9332$ y $P(Z \\le -1) = 1 - 0{,}8413 = 0{,}1587$.\n",
      "**Resultado:** $P(160 \\le X \\le 185) = 0{,}9332 - 0{,}1587 = 0{,}7745$.\n"
     ],
     "result": "Haz siempre un dibujo de la campana sombreando la zona: así es casi imposible equivocarse de signo.\n"
    }
   ],
   "summary": [
    "$Z = \\dfrac{X - \\mu}{\\sigma} \\sim N(0, 1)$.",
    "Simetría: $P(Z \\le -z) = 1 - P(Z \\le z)$.",
    "Problema inverso: busca la probabilidad dentro de la tabla y despeja $x = \\mu + z\\sigma$."
   ],
   "common_errors": [
    "Dividir entre la varianza en lugar de entre la desviación típica.",
    "Buscar en la tabla valores negativos de $z$ sin usar la simetría."
   ]
  },
  "mat2.pro.probabilidad.u01": {
   "id": "mat2.pro.probabilidad.u01",
   "objectives": [
    "Calcular probabilidades con la regla de Laplace y las propiedades básicas.",
    "Usar la probabilidad condicionada, la independencia y el teorema de la probabilidad total."
   ],
   "explanation": [
    {
     "title": "Lo básico",
     "body": "- **Laplace** (casos equiprobables): $P(A) = \\dfrac{\\text{casos favorables}}{\\text{casos posibles}}$.\n- **Contrario:** $P(\\bar A) = 1 - P(A)$.\n- **Unión:** $P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$.\n- **Leyes de De Morgan:** $P(\\bar A\\cap\\bar B) = 1 - P(A\\cup B)$.\n\nUna **tabla de contingencia** o un **diagrama de Venn** ordenan muy bien los datos.\n"
    },
    {
     "title": "Condicionada e independencia",
     "body": "La probabilidad de $A$ **sabiendo que** ha ocurrido $B$:\n$$P(A\\mid B) = \\frac{P(A\\cap B)}{P(B)}$$\nDe ahí, $P(A\\cap B) = P(B)\\cdot P(A\\mid B)$ (regla del producto: se multiplica a lo largo de las ramas de un árbol).\n\n$A$ y $B$ son **independientes** si $P(A\\cap B) = P(A)\\,P(B)$, o lo que es lo mismo, si $P(A\\mid B) = P(A)$.\n"
    },
    {
     "title": "Probabilidad total",
     "body": "Si $A_1, \\dots, A_n$ forman un **sistema completo** (no se solapan y cubren todos los casos):\n$$P(B) = P(A_1)P(B\\mid A_1) + \\dots + P(A_n)P(B\\mid A_n)$$\nEn un **diagrama de árbol**: se multiplica a lo largo de cada rama que acaba en $B$ y se suman esas ramas.\n"
    }
   ],
   "examples": [
    {
     "title": "Dos urnas",
     "statement": "La urna I tiene 3 bolas rojas y 2 azules; la urna II, 1 roja y 4 azules. Se lanza una moneda: si sale cara se extrae de la urna I, y si sale cruz, de la II. ¿Cuál es la probabilidad de sacar bola roja?\n",
     "steps": [
      "**Árbol:** $P(\\text{I}) = P(\\text{II}) = \\frac12$; $P(R\\mid\\text{I}) = \\frac35$ y $P(R\\mid\\text{II}) = \\frac15$.\n",
      "**Probabilidad total:** $P(R) = \\frac12\\cdot\\frac35 + \\frac12\\cdot\\frac15 = \\frac{3}{10} + \\frac{1}{10} = \\frac25 = 0{,}4$.\n"
     ],
     "result": "Comprobación de sentido común: el resultado está entre $\\frac15$ y $\\frac35$, las probabilidades de cada urna.\n"
    }
   ],
   "summary": [
    "$P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$.",
    "$P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)}$. Independientes: $P(A\\cap B) = P(A)P(B)$.",
    "Probabilidad total: suma de las ramas del árbol que llevan a $B$."
   ],
   "common_errors": [
    "Confundir $P(A\\mid B)$ con $P(B\\mid A)$.",
    "Confundir sucesos independientes con incompatibles ($P(A\\cap B) = 0$)."
   ]
  },
  "mat2.pro.probabilidad.u02": {
   "id": "mat2.pro.probabilidad.u02",
   "objectives": [
    "Calcular probabilidades \"a posteriori\" con el teorema de Bayes.",
    "Interpretar el resultado en contexto."
   ],
   "explanation": [
    {
     "title": "El teorema",
     "body": "Con un sistema completo $A_1, \\dots, A_n$ y un suceso $B$ que ya ha ocurrido:\n$$P(A_i\\mid B) = \\frac{P(A_i)\\,P(B\\mid A_i)}{P(B)}$$\nEl denominador $P(B)$ se calcula con la **probabilidad total**.\n\nSe usa cuando el enunciado da la información \"en un sentido\" ($P(B\\mid A)$) y pregunta \"en el contrario\" ($P(A\\mid B)$): ¿de qué máquina viene la pieza defectuosa? ¿Qué probabilidad hay de estar enfermo si el test da positivo?\n"
    },
    {
     "title": "En el árbol",
     "body": "$$P(A_i\\mid B) = \\frac{\\text{rama que pasa por } A_i \\text{ y acaba en } B}{\\text{suma de todas las ramas que acaban en } B}$$\n"
    }
   ],
   "examples": [
    {
     "title": "Un test médico",
     "statement": "Una enfermedad afecta al 2 % de la población. Un test da positivo en el 95 % de los enfermos y en el 10 % de los sanos. Si una persona da positivo, ¿qué probabilidad hay de que esté enferma?\n",
     "steps": [
      "**Datos:** $P(E) = 0{,}02$, $P(+\\mid E) = 0{,}95$, $P(+\\mid\\bar E) = 0{,}10$.\n",
      "**Probabilidad total:** $P(+) = 0{,}02\\cdot0{,}95 + 0{,}98\\cdot0{,}10 = 0{,}019 + 0{,}098 = 0{,}117$.\n",
      "**Bayes:** $P(E\\mid +) = \\dfrac{0{,}019}{0{,}117} \\approx 0{,}162$.\n"
     ],
     "result": "¡Solo un 16 %! Como la enfermedad es rara, la mayoría de los positivos son falsos positivos. Por eso los positivos se confirman con una segunda prueba.\n"
    }
   ],
   "summary": [
    "Bayes: $P(A_i\\mid B) = \\dfrac{P(A_i)P(B\\mid A_i)}{P(B)}$.",
    "$P(B)$ sale de la probabilidad total.",
    "Se usa para \"invertir\" una condicionada."
   ],
   "common_errors": [
    "Dar como resultado el numerador $P(A_i\\cap B)$ sin dividir.",
    "Olvidar alguna rama al calcular $P(B)$."
   ]
  }
 }
};
