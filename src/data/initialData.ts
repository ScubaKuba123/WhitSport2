import type { Category, Product, Announcement } from "../types";

export const initialShippingBar = "Wysyłki są obsługiwane przez siedem dni w tygodniu";

export const initialAnnouncements: Announcement[] = [
  {
    id: "a1",
    date: "2026-09-01",
    title: "Nowość: Panele na rzep - Coyote Brown",
    content: "Wprowadziliśmy nowe panele administracyjne 10x15 w Coyote Brown. Tkanina Miranda IRR, taśma Pasamon, haft W-S.",
  },
  {
    id: "a2",
    date: "2026-08-26",
    title: "Przerwa techniczna 30-31.08",
    content: "W tych dniach wysyłki będą wstrzymane — wracamy 01.09.",
  },
  {
    id: "a3",
    date: "2026-08-15",
    title: "Końcówka serii — Ranger Green",
    content: "Dwie belki Mirandy w Ranger Green i Czarnym — sprzedaż do wyczerpania, nie dorabiamy.",
  },
];

export const initialCategories: Category[] = [
  {
    id: "oporazdzenie",
    name: "Oporządzanie taktyczne",
    slug: "oporazdzenie",
    subcategories: [
      { id: "pasy", name: "Pasy taktyczne", slug: "pasy" },
      { id: "ladownice", name: "Ładownice / Kieszenie", slug: "ladownice" },
      { id: "panele", name: "Panele na rzep", slug: "panele" },
      { id: "worki", name: "Worki zrzutowe", slug: "worki" },
    ],
  },
  {
    id: "pasmanteria",
    name: "Pasmanteria",
    slug: "pasmanteria",
    subcategories: [
      { id: "tasmy", name: "Taśmy Pasamon", slug: "tasmy" },
      { id: "klamry", name: "Klamry ITW / Duraflex", slug: "klamry" },
      { id: "rzepy", name: "Rzepy", slug: "rzepy" },
    ],
  },
  {
    id: "bicze",
    name: "Bicze sportowe",
    slug: "bicze",
    subcategories: [
      { id: "hybrydowe", name: "Hybrydowe Paracord", slug: "hybrydowe" },
    ],
  },
];

export const initialProducts: Product[] = [
  {
    id: "p_belt",
    name: "Modułowy Pas Taktyczny Bojowy IRR",
    categoryId: "oporazdzenie",
    subcategoryId: "pasy",
    price: 249,
    stock: 6,
    status: "in_stock",
    camo: "Ranger Green IRR",
    fabric: "Cordura 500D Miranda IRR",
    image: "https://picsum.photos/seed/belt/600/600",
    description: "Szeroki pas bojowy MOLLE/PALS, taśmy Pasamon, klamra Cobra style, IRR.",
    specs: { Tkanina: "Miranda IRR", "Taśma": "Pasamon PA", "Klamra": "Duraflex", "Szwy": "Amann" }
  },
  {
    id: "p_cargo",
    name: "Kieszeń Cargo Pionowa MOLLE",
    categoryId: "oporazdzenie",
    subcategoryId: "ladownice",
    price: 89,
    stock: 2,
    status: "low_stock",
    camo: "Wz.93 Pantera IRR",
    fabric: "Cordura 500D",
    image: "https://picsum.photos/seed/cargo/600/600",
    description: "Cargo z drenażem, ciche uchwyty YKK, MOLLE.",
  },
  {
    id: "p_glove",
    name: "Uchwyt na Rękawice z Karabińczykiem",
    categoryId: "oporazdzenie",
    subcategoryId: "ladownice",
    price: 29,
    stock: 0,
    status: "made_to_order",
    camo: "Coyote Brown",
    fabric: "Taśma Pasamon",
    image: "https://picsum.photos/seed/glove/600/600",
    description: "Lekki uchwyt z taśmy wojskowej, karabińczyk.",
  },
  {
    id: "p_whip",
    name: "Bicz Hybrydowy Paracord 550",
    categoryId: "bicze",
    subcategoryId: "hybrydowe",
    price: 199,
    oldPrice: 229,
    stock: 4,
    status: "in_stock",
    camo: "Czarny",
    fabric: "Paracord 550",
    image: "https://picsum.photos/seed/whip/600/600",
    description: "Ręcznie pleciony bicz sportowy — flagowy wyrób pracowni.",
  },
  {
    id: "p_panel",
    name: "Panel Administracyjny 10x15 Coyote",
    categoryId: "oporazdzenie",
    subcategoryId: "panele",
    price: 45,
    stock: 0,
    status: "made_to_order",
    camo: "Coyote Brown",
    fabric: "Cordura IRR",
    image: "https://picsum.photos/seed/panel/600/600",
    description: "Panel na rzep, haft W-S, kontury tarczy.",
  },
  {
    id: "p_dump",
    name: "Worek Zrzutowy Składany",
    categoryId: "oporazdzenie",
    subcategoryId: "worki",
    price: 79,
    stock: 8,
    status: "in_stock",
    camo: "MultiCam IRR",
    fabric: "Cordura 500D",
    image: "https://picsum.photos/seed/dump/600/600",
    description: "Lekki, składany, ściągacz + pętla.",
  },
];

export const topNav: { label: string; href: string }[] = [
  { label: "O mnie", href: "#about" },
  { label: "Nowości", href: "#news" },
  { label: "Promocje", href: "#promo" },
  { label: "Kontakt", href: "#contact" },
];

export const bottomLinks = {
  informacje: [
    { label: "Dostawa i płatność", href: "#" },
    { label: "Polityka prywatności", href: "#" },
    { label: "Regulamin", href: "#" },
    { label: "Promocje i rabaty", href: "#" },
  ],
  konto: [
    { label: "Zaloguj się", href: "#admin" },
    { label: "Zarejestruj się", href: "#admin" },
  ],
};
