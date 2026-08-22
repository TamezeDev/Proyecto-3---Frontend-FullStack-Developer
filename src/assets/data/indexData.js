// Static document to simulate some news on index
const indexData = [
  {
    id: 1,
    title: 'Cinco novelas de realismo mágico que debes leer este otoño',
    excerpt:
      'Un repaso a las obras que marcaron el género tras Cien años de soledad, con recomendaciones para quienes se inician en el estilo.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXUL_9aWEa9CDFzVUr6WO-v3A4X_KD9gpXysoD-lIuL8_pcLJ9Xk7_W4D&s=10',
    category: 'Recomendaciones',
    date: '2026-08-15',
  },
  {
    id: 2,
    title: 'Cómo la lectura nocturna mejora la calidad del sueño',
    excerpt:
      'Estudios recientes apuntan a que leer 20 minutos antes de dormir reduce el tiempo para conciliar el sueño frente al uso de pantallas.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5mR7EEDwNsHwYTXYYLWoBIObdtiuc2XO5ngyC6ejR-g&s=s10/photo-1495446815901-a7297e633e8d',
    category: 'Bienestar',
    date: '2026-08-12',
  },
  {
    id: 3,
    title: 'Autores independientes que están redefiniendo la ciencia ficción',
    excerpt:
      'Una nueva generación de escritores autopublicados gana terreno frente a las grandes editoriales gracias a las plataformas digitales.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkmWfy7rBsZ6o0GYlXQW2DPIzcij03tMmOgWEE6Gz2zw&s=10.com/photo-1544716278-ca5e3f4abd8c',
    category: 'Tendencias',
    date: '2026-08-10',
  },
  {
    id: 4,
    title: 'Guía rápida para crear el rincón de lectura perfecto en casa',
    excerpt:
      'Luz, comodidad y silencio: tres claves para diseñar un espacio que invite a abrir un libro cada día.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8pu5g4stb6XPdMpKvMw0H3zFMSaOKmZwRxEICvS5PQ&s=10/photo-1512820790803-83ca734da794',
    category: 'Estilo de vida',
    date: '2026-08-08',
  },
  {
    id: 5,
    title: 'Los clásicos que más se releen según nuestros usuarios',
    excerpt:
      'El análisis de biblioteca de nuestra comunidad revela qué títulos vuelven a abrirse año tras año.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXM8fER3OsdC3v1n98aXj8_gsC-1NuRySdcBF3cKawsg&s=10/photo-1524578271613-d550eacf6090',
    category: 'Comunidad',
    date: '2026-08-05',
  },
  {
    id: 6,
    title: 'Entrevista: "Escribo para lectores que ya no tienen tiempo"',
    excerpt:
      'Conversamos con una autora emergente sobre el auge de la novela corta y los formatos pensados para la lectura fragmentada.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRnVTE8zZEjGYss2f3Pn5MGwlRn12Bt1BQRRqbc2Xagg&s=10.com/photo-1543002588-bfa74002ed7e',
    category: 'Entrevistas',
    date: '2026-08-02',
  },
  {
    id: 7,
    title: 'Cinco mitos sobre la lectura digital que deberías dejar de creer',
    excerpt:
      'No, leer en pantalla no siempre cansa más la vista que el papel: repasamos qué dice la evidencia real.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFc_0mU3b-QCjA9Y0RuJesuMi3A_J0rvSqpPvWmhQrXg&s=10/photo-1592496431122-2349e0fbc666',
    category: 'Curiosidades',
    date: '2026-07-30',
  },
  {
    id: 8,
    title: 'Por qué el género policiaco vive su mejor década',
    excerpt:
      'El thriller psicológico se consolida como el género más buscado en las plataformas de lectura digital.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRnJzEeJPbrSC_Bjxtc4UgLADqZUIR5PmGoxGqARGUkw&s=10.com/photo-1476275466078-4007374efbbe',
    category: 'Tendencias',
    date: '2026-07-27',
  },
  {
    id: 9,
    title: 'Cómo elegir tu próxima lectura sin perder horas decidiendo',
    excerpt:
      'Tres criterios simples para acabar con la parálisis por análisis frente a un catálogo enorme.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiw1q8yozSVTcqTeojZzrio9nD7ZWScM58zC3GNs-Raw&s=10-1507842217343-583bb7270b66',
    category: 'Consejos',
    date: '2026-07-24',
  },
  {
    id: 10,
    title: 'La vuelta del formato serializado: leer por capítulos semanales',
    excerpt:
      'Plataformas de todo el mundo recuperan un modelo de publicación que recuerda a las novelas por entregas del siglo XIX.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5oRrjnyeUivEfXfZ6OD_LnOIGSuKdXxrdluG7I9GS6A&s=10-1553729459-efe14ef6055d',
    category: 'Tendencias',
    date: '2026-07-20',
  },
  {
    id: 11,
    title: 'Tres técnicas de lectura activa para retener más de lo que lees',
    excerpt:
      'Subrayar no basta: estas estrategias mejoran de forma medible la comprensión y la memoria a largo plazo.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiL-ca_pDjf8q_DR6x_NQOzrzFtmGofzIufKl2H9B_3g&s=10.com/photo-1543002588-bfa74002ed7e',
    category: 'Bienestar',
    date: '2026-07-17',
  },
  {
    id: 12,
    title: 'El boom de los clubes de lectura online',
    excerpt:
      'Comunidades de lectores se organizan en torno a un libro al mes, generando debate y recomendaciones cruzadas.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjQH8woamZuG017Xczyq-1qheleqXZyHQEKCdpiroJ1Q&s=10-6c12a4b040da',
    category: 'Comunidad',
    date: '2026-07-14',
  },
]

export default indexData
