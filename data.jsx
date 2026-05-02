// data.jsx — Catálogo inicial de productos y constantes

const HP_CATEGORIES = [
  { id: 'cuadernos',    label: 'Cuadernos y libretas',    icon: '▤' },
  { id: 'escritura',    label: 'Bolígrafos y lápices',    icon: '✎' },
  { id: 'escolar',      label: 'Material escolar',        icon: '✚' },
  { id: 'arte',         label: 'Arte y manualidades',     icon: '✦' },
  { id: 'oficina',      label: 'Material de oficina',     icon: '◫' },
  { id: 'stickers',     label: 'Stickers y washi',        icon: '◉' },
  { id: 'agendas',      label: 'Agendas y planners',      icon: '☰' },
  { id: 'servicios',    label: 'Impresión y servicios',   icon: '⎙' },
  { id: 'regalos',      label: 'Regalos y detalles',      icon: '✿' },
  { id: 'diseno',       label: 'Diseño gráfico',          icon: '◆' },
];

// SVG placeholder: alternates color tints so the catalog feels rich without
// hand-drawn product art. The `tone` index decides hue.
const HP_INITIAL_PRODUCTS = [
  { id: 'p01', name: 'Cuaderno A5 tapa dura', cat: 'cuadernos', price: 89,  stock: 24, tone: 0, top: true,  badge: 'Top ventas',
    desc: 'Cuaderno cosido de 160 hojas, papel crema 90g. Perfecto para apuntes diarios.' },
  { id: 'p02', name: 'Set de 12 plumones pastel', cat: 'arte', price: 240, stock: 12, tone: 1, top: true, badge: 'Nuevo',
    desc: 'Plumones de doble punta, colores pastel suaves para lettering y bullet journal.' },
  { id: 'p03', name: 'Agenda 2026 semana vista', cat: 'agendas', price: 320, stock: 8,  tone: 2, top: true,  badge: '−15%',
    desc: 'Agenda con planeador mensual, semanal y notas. Tapa de tela azul Happy.' },
  { id: 'p04', name: 'Pluma fuente azul cobalto', cat: 'escritura', price: 175, stock: 18, tone: 3, top: true,
    desc: 'Cuerpo metálico, punta media. Cartucho intercambiable. Tinta azul incluida.' },
  { id: 'p05', name: 'Pack 50 stickers aesthetic', cat: 'stickers', price: 65, stock: 40, tone: 4,
    desc: 'Stickers vinílicos resistentes al agua, ideales para laptop y termo.' },
  { id: 'p06', name: 'Mochila escolar clásica', cat: 'escolar', price: 549, stock: 6, tone: 5,
    desc: 'Mochila de 25L, dos compartimentos, espalda acolchada y porta-laptop 15".' },
  { id: 'p07', name: 'Acuarelas profesionales 24', cat: 'arte', price: 380, stock: 9, tone: 0,
    desc: 'Pastillas de acuarela en estuche metálico, pigmento alta concentración.' },
  { id: 'p08', name: 'Engrapadora media oficina', cat: 'oficina', price: 145, stock: 15, tone: 1,
    desc: 'Capacidad 25 hojas, base antideslizante. Incluye 1000 grapas.' },
  { id: 'p09', name: 'Washi tape — pack 6 piezas', cat: 'stickers', price: 95, stock: 22, tone: 2,
    desc: 'Cintas decorativas de papel japonés, surtido de patrones geométricos.' },
  { id: 'p10', name: 'Libreta punteada bullet', cat: 'cuadernos', price: 135, stock: 30, tone: 3, top: true,
    desc: 'Hojas punteadas 5mm, papel 120g sin sangrado. Ideal para bullet journaling.' },
  { id: 'p11', name: 'Set 6 lápices HB premium', cat: 'escritura', price: 55, stock: 50, tone: 4,
    desc: 'Lápices de grafito grado HB, madera de cedro, borrador integrado.' },
  { id: 'p12', name: 'Caja organizadora escritorio', cat: 'oficina', price: 220, stock: 7, tone: 5,
    desc: 'Organizador de acrílico con 6 compartimentos para escritorio limpio.' },
  { id: 'p13', name: 'Planner mensual desprendible', cat: 'agendas', price: 145, stock: 14, tone: 0,
    desc: '60 hojas, formato A4, sin fechas. Para planeación flexible.' },
  { id: 'p14', name: 'Marco de regalo personalizado', cat: 'regalos', price: 195, stock: 11, tone: 1,
    desc: 'Marco de madera 13×18 con grabado láser personalizable.' },
  { id: 'p15', name: 'Pinceles surtido x10', cat: 'arte', price: 165, stock: 16, tone: 2,
    desc: 'Set de pinceles redondos y planos, pelo sintético, para acuarela y acrílico.' },
  { id: 'p16', name: 'Carpeta diseño portafolio', cat: 'diseno', price: 285, stock: 5, tone: 3,
    desc: 'Portafolio A3 con 20 fundas transparentes, ideal para presentaciones.' },
];

// Servicios destacados (no son SKU pero aparecen en home)
const HP_SERVICES = [
  { id: 's1', title: 'Impresión digital',     desc: 'B/N y color, hasta A3.', icon: '⎙' },
  { id: 's2', title: 'Encuadernado',          desc: 'Espiral, hotmelt y tela.', icon: '⎯' },
  { id: 's3', title: 'Plastificado',          desc: 'A4, A3, gafetes y tarjetas.', icon: '▭' },
  { id: 's4', title: 'Diseño gráfico',        desc: 'Logos, flyers e invitaciones.', icon: '◆' },
];

const HP_TONES = [
  { bg: '#e8f0fb', stripe: '#2e69b2' }, // azul marca
  { bg: '#fff4e6', stripe: '#e89642' }, // ámbar
  { bg: '#f0ebff', stripe: '#7d5cd6' }, // lila
  { bg: '#eafaf0', stripe: '#3aa364' }, // verde
  { bg: '#ffe9ef', stripe: '#d6447a' }, // rosa
  { bg: '#f5f1ea', stripe: '#8a6f4f' }, // crema
];

Object.assign(window, { HP_CATEGORIES, HP_INITIAL_PRODUCTS, HP_SERVICES, HP_TONES });
