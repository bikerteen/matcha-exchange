import type { Venue } from "@/types";

/**
 * Seeded venues. These are FICTIONAL demo cafés with DEMO prices — swap in real
 * venues once real data exists. Every venue's demoLogCount should roughly sum to
 * its area's demo.logCount so the index stays internally consistent.
 */
export const SEED_VENUES: Venue[] = [
  // Dalston
  { id: "kingsland-whisk", name: "Kingsland Whisk", areaSlug: "dalston", demoAveragePence: 560, demoLogCount: 6, description: "Hand-whisked. Will tell you it's hand-whisked." },
  { id: "green-room-dalston", name: "Green Room", areaSlug: "dalston", demoAveragePence: 520, demoLogCount: 5, description: "Record shop by day. Record shop that sells matcha by night." },
  { id: "ridley-tea-stall", name: "Ridley Tea Stall", areaSlug: "dalston", demoAveragePence: 535, demoLogCount: 3, description: "Cash preferred. Card grudgingly accepted." },

  // Hackney Central
  { id: "mare-street-matcha", name: "Mare Street Matcha", areaSlug: "hackney-central", demoAveragePence: 570, demoLogCount: 6, description: "Concrete counter, one stool, long waits." },
  { id: "chasen-and-co", name: "Chasen & Co.", areaSlug: "hackney-central", demoAveragePence: 540, demoLogCount: 5, description: "Named after the whisk. Sells the whisk." },

  // London Fields
  { id: "fields-tea-counter", name: "Fields Tea Counter", areaSlug: "london-fields", demoAveragePence: 560, demoLogCount: 7, description: "Takeaway only. The park is the seating." },
  { id: "lido-green", name: "Lido Green", areaSlug: "london-fields", demoAveragePence: 590, demoLogCount: 6, description: "Post-swim iced matcha. Prices chlorinated accordingly." },
  { id: "uji-street-kiosk", name: "Uji Street Kiosk", areaSlug: "london-fields", demoAveragePence: 560, demoLogCount: 5, description: "A hatch in a wall. The best hatch in a wall." },

  // Shoreditch
  { id: "ceremonial-grade", name: "Ceremonial Grade", areaSlug: "shoreditch", demoAveragePence: 640, demoLogCount: 9, description: "Queue starts at the door. Oat milk is not optional." },
  { id: "usucha-club", name: "Usucha Club", areaSlug: "shoreditch", demoAveragePence: 595, demoLogCount: 7, description: "Members' club energy. No membership required." },
  { id: "redchurch-whisk-bar", name: "Redchurch Whisk Bar", areaSlug: "shoreditch", demoAveragePence: 660, demoLogCount: 6, description: "Matcha tonic on tap. Yes, on tap." },
  { id: "arch-17-matcha", name: "Arch 17", areaSlug: "shoreditch", demoAveragePence: 590, demoLogCount: 5, description: "Under the railway. Trains included free." },

  // Old Street
  { id: "silicon-whisk", name: "Silicon Whisk", areaSlug: "old-street", demoAveragePence: 610, demoLogCount: 7, description: "Accepts payment by tapping anything." },
  { id: "leaf-and-ledger", name: "Leaf & Ledger", areaSlug: "old-street", demoAveragePence: 580, demoLogCount: 6, description: "Laptops welcome. Laptop chargers are not." },

  // Liverpool Street
  { id: "trading-floor-tea-bar", name: "Trading Floor Tea Bar", areaSlug: "liverpool-street", demoAveragePence: 625, demoLogCount: 7, description: "Open 6:45am. Closed by the time you finish work." },
  { id: "platform-matcha", name: "Platform Matcha", areaSlug: "liverpool-street", demoAveragePence: 590, demoLogCount: 5, description: "Designed to be carried at speed." },

  // Angel
  { id: "upper-street-green", name: "Upper Street Green", areaSlug: "angel", demoAveragePence: 595, demoLogCount: 7, description: "Reliable. Almost suspiciously reliable." },
  { id: "chapel-market-matcha", name: "Chapel Market Matcha", areaSlug: "angel", demoAveragePence: 570, demoLogCount: 5, description: "Between the fruit and the phone cases." },

  // King's Cross
  { id: "granary-tea-house", name: "Granary Tea House", areaSlug: "kings-cross", demoAveragePence: 615, demoLogCount: 9, description: "Big windows. Bigger cups." },
  { id: "canal-side-whisk", name: "Canal Side Whisk", areaSlug: "kings-cross", demoAveragePence: 580, demoLogCount: 7, description: "Best drunk on the steps. Everybody does." },

  // Soho
  { id: "soho-koicha", name: "Soho Koicha", areaSlug: "soho", demoAveragePence: 680, demoLogCount: 8, description: "Thick enough to stand a spoon in. They'd rather you didn't." },
  { id: "berwick-street-matcha", name: "Berwick Street Matcha", areaSlug: "soho", demoAveragePence: 630, demoLogCount: 8, description: "Formerly a vinyl shop. Still plays the vinyl." },
  { id: "neon-green", name: "Neon Green", areaSlug: "soho", demoAveragePence: 635, demoLogCount: 6, description: "Open late. Matcha after dark is a lifestyle." },

  // Covent Garden
  { id: "piazza-green", name: "Piazza Green", areaSlug: "covent-garden", demoAveragePence: 690, demoLogCount: 7, description: "Comes with a view of a man painted silver." },
  { id: "tencha-house", name: "Tencha House", areaSlug: "covent-garden", demoAveragePence: 650, demoLogCount: 6, description: "Stone-milled on site, loudly." },
  { id: "seven-dials-matcha", name: "Seven Dials Matcha", areaSlug: "covent-garden", demoAveragePence: 645, demoLogCount: 4, description: "Seven entrances. One queue." },

  // South Bank
  { id: "riverside-tea-counter", name: "Riverside Tea Counter", areaSlug: "south-bank", demoAveragePence: 585, demoLogCount: 6, description: "A view of the river at no extra charge. Yet." },
  { id: "concrete-matcha", name: "Concrete Matcha", areaSlug: "south-bank", demoAveragePence: 560, demoLogCount: 4, description: "Brutalist interior. Surprisingly gentle foam." },

  // Brixton
  { id: "electric-avenue-matcha", name: "Electric Avenue Matcha", areaSlug: "brixton", demoAveragePence: 530, demoLogCount: 7, description: "Best price on the network. Keep it quiet." },
  { id: "pop-green-brixton", name: "Pop Green", areaSlug: "brixton", demoAveragePence: 505, demoLogCount: 5, description: "Shipping container. Excellent matcha. Draughty." },
];
