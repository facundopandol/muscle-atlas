/**
 * Anatomía del brazo derecho en coordenadas del atlas MuscleMap (viewBox 1024×1536).
 * Las regiones son “cuchillas” que, al clippear el path real del músculo,
 * dejan el contorno exacto del atlas en los bordes externos.
 */

/** Contorno BICEPS_RIGHT de @musclemap/assets (FRONT). */
export const BICEPS_RIGHT_D =
  'M673.6 406.5C672.8 408 670.6 410.7 669.1 414 667.5 417.3 666.7 421.3 666 426.3 665.3 431.3 664.9 437.4 665.1 443.7 665.3 449.9 666.2 456.5 667.8 463.6 669.4 470.7 671.8 478.3 674.3 485.6 676.9 493 679.7 500 682.5 505.9 685.3 511.7 688.1 516.4 691.5 520.7 695 525.1 699.1 529.2 703.1 532.5 707.1 535.8 710.9 538.2 714.5 539.5 718.2 540.9 721.6 541.2 724.5 540.5 727.3 539.8 729.7 538.1 731.3 534.8 733 531.6 734 526.9 734.7 521.4 735.4 516 735.8 509.9 735.7 503.3 735.5 496.8 734.8 489.8 733.3 482.9 731.8 476.1 729.5 469.4 727 462.9 724.5 456.3 721.8 449.9 719.2 444.5 716.6 439 714.2 434.4 711 430 707.7 425.7 703.7 421.5 700.3 418.4 696.9 415.4 694.1 413.4 691.2 411.7 688.3 410 685.1 408.5 682.2 407.3 679.2 406.1 676.3 405.2 675.2 404.9 674 404.6 674.4 405 673.6 406.5Z'

/**
 * Regiones de recorte (no son el dibujo). Al intersectar con BICEPS_RIGHT_D
 * producen porciones con el borde real del músculo.
 *
 * - corta: mitad medial (hacia el torso)
 * - larga: mitad lateral (afuera)
 * - braquial: tercio distal / punta inferior
 */
export const BICEPS_HEAD_CLIPS: Record<string, string> = {
  'biceps-short':
    'M640 400 L698 400 C700 430 702 470 704 505 L695 545 L640 545 Z',
  'biceps-long':
    'M698 400 L760 400 L760 545 L710 545 C708 505 706 465 702 430 L698 400 Z',
  brachialis: 'M655 505 L745 505 L745 555 L655 555 Z',
}

/** Línea divisoria suave entre cabeza corta y larga (solo visual). */
export const BICEPS_SPLIT_LINE =
  'M698 412 C700 445 704 480 708 515'
