import { Perfume, ScentFamily, PerfumeType } from '@scentify/shared-types';

export const mockPerfumes: Perfume[] = [
    {
        id: '1',
        name: 'Midnight Rose',
        brand: 'Maison Lumière',
        description: 'A captivating blend of dark roses and warm amber, perfect for evening wear. This sophisticated fragrance opens with fresh bergamot, evolving into a heart of velvety rose petals and jasmine, settling into a base of rich amber and sandalwood.',
        price: 145,
        type: PerfumeType.EAU_DE_PARFUM,
        scentFamily: ScentFamily.FLORAL,
        gender: 'female',
        sizes: [
            { volume: 50, price: 145, stock: 25 },
            { volume: 100, price: 220, stock: 15 }
        ],
        fragranceNotes: {
            top: ['Bergamot', 'Pink Pepper', 'Mandarin'],
            middle: ['Rose', 'Jasmine', 'Violet'],
            base: ['Amber', 'Sandalwood', 'Vanilla']
        },
        images: ['/perfumes/midnight-rose.jpg'],
        rating: 4.8,
        reviewCount: 342,
        inStock: true,
        releaseDate: '2023-09-15',
        createdAt: '2023-09-15T00:00:00Z',
        updatedAt: '2024-11-20T00:00:00Z'
    },
    {
        id: '2',
        name: 'Ocean Breeze',
        brand: 'Azure Coast',
        description: 'Fresh and invigorating marine notes combined with citrus and aquatic accords. Experience the essence of a Mediterranean morning with this crisp, clean fragrance.',
        price: 98,
        type: PerfumeType.EAU_DE_TOILETTE,
        scentFamily: ScentFamily.FRESH,
        gender: 'unisex',
        sizes: [
            { volume: 50, price: 98, stock: 40 },
            { volume: 100, price: 155, stock: 30 }
        ],
        fragranceNotes: {
            top: ['Sea Salt', 'Lemon', 'Grapefruit'],
            middle: ['Marine Notes', 'Lavender', 'Rosemary'],
            base: ['Driftwood', 'Musk', 'Amber']
        },
        images: ['/perfumes/ocean-breeze.jpg'],
        rating: 4.6,
        reviewCount: 218,
        inStock: true,
        releaseDate: '2024-03-20',
        createdAt: '2024-03-20T00:00:00Z',
        updatedAt: '2024-11-20T00:00:00Z'
    },
    {
        id: '3',
        name: 'Oud Royale',
        brand: 'Maison d\'Orient',
        description: 'Luxurious oud wood blended with precious spices and rich leather. A masterpiece of oriental perfumery that exudes sophistication and power.',
        price: 285,
        type: PerfumeType.PARFUM,
        scentFamily: ScentFamily.ORIENTAL,
        gender: 'male',
        sizes: [
            { volume: 50, price: 285, stock: 12 },
            { volume: 100, price: 450, stock: 8 }
        ],
        fragranceNotes: {
            top: ['Saffron', 'Cardamom', 'Black Pepper'],
            middle: ['Oud Wood', 'Rose', 'Patchouli'],
            base: ['Leather', 'Amber', 'Musk']
        },
        images: ['/perfumes/oud-royale.jpg'],
        rating: 4.9,
        reviewCount: 156,
        inStock: true,
        releaseDate: '2023-11-10',
        createdAt: '2023-11-10T00:00:00Z',
        updatedAt: '2024-11-20T00:00:00Z'
    },
    {
        id: '4',
        name: 'Vanilla Dreams',
        brand: 'Sweet Essence',
        description: 'Warm vanilla and caramel notes create an irresistible gourmand experience. Sweet yet sophisticated, perfect for those who love comforting scents.',
        price: 112,
        type: PerfumeType.EAU_DE_PARFUM,
        scentFamily: ScentFamily.GOURMAND,
        gender: 'female',
        sizes: [
            { volume: 50, price: 112, stock: 35 },
            { volume: 100, price: 175, stock: 22 }
        ],
        fragranceNotes: {
            top: ['Bergamot', 'Pear', 'Almond'],
            middle: ['Vanilla Orchid', 'Tonka Bean', 'Caramel'],
            base: ['Vanilla', 'Praline', 'Sandalwood']
        },
        images: ['/perfumes/vanilla-dreams.jpg'],
        rating: 4.7,
        reviewCount: 289,
        inStock: true,
        releaseDate: '2024-01-15',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-11-20T00:00:00Z'
    },
    {
        id: '5',
        name: 'Cedar & Sage',
        brand: 'Forest Path',
        description: 'Earthy cedarwood harmonizes with aromatic sage in this woody masterpiece. A grounding, natural fragrance that evokes walks through ancient forests.',
        price: 135,
        type: PerfumeType.EAU_DE_PARFUM,
        scentFamily: ScentFamily.WOODY,
        gender: 'unisex',
        sizes: [
            { volume: 50, price: 135, stock: 28 },
            { volume: 100, price: 210, stock: 18 }
        ],
        fragranceNotes: {
            top: ['Sage', 'Juniper', 'Bergamot'],
            middle: ['Cedarwood', 'Cypress', 'Pine'],
            base: ['Vetiver', 'Oakmoss', 'Musk']
        },
        images: ['/perfumes/cedar-sage.jpg'],
        rating: 4.5,
        reviewCount: 167,
        inStock: true,
        releaseDate: '2023-10-05',
        createdAt: '2023-10-05T00:00:00Z',
        updatedAt: '2024-11-20T00:00:00Z'
    },
    {
        id: '6',
        name: 'Citrus Bloom',
        brand: 'Soleil d\'Été',
        description: 'Vibrant citrus notes dance with white florals in this refreshing composition. Bright, uplifting, and perfect for daytime wear.',
        price: 89,
        type: PerfumeType.EAU_DE_TOILETTE,
        scentFamily: ScentFamily.FRESH,
        gender: 'female',
        sizes: [
            { volume: 50, price: 89, stock: 45 },
            { volume: 100, price: 140, stock: 32 }
        ],
        fragranceNotes: {
            top: ['Lemon', 'Orange Blossom', 'Neroli'],
            middle: ['Jasmine', 'Lily of the Valley', 'Peach'],
            base: ['White Musk', 'Cedar', 'Amber']
        },
        images: ['/perfumes/citrus-bloom.jpg'],
        rating: 4.4,
        reviewCount: 203,
        inStock: true,
        releaseDate: '2024-05-12',
        createdAt: '2024-05-12T00:00:00Z',
        updatedAt: '2024-11-20T00:00:00Z'
    },
    {
        id: '7',
        name: 'Noir Mystique',
        brand: 'Ombres',
        description: 'Dark, mysterious, and utterly seductive. Black currant and incense create an enigmatic aura that lingers long after you\'ve left the room.',
        price: 195,
        type: PerfumeType.EAU_DE_PARFUM,
        scentFamily: ScentFamily.ORIENTAL,
        gender: 'unisex',
        sizes: [
            { volume: 50, price: 195, stock: 20 },
            { volume: 100, price: 305, stock: 12 }
        ],
        fragranceNotes: {
            top: ['Black Currant', 'Pink Pepper', 'Bergamot'],
            middle: ['Incense', 'Iris', 'Plum'],
            base: ['Oud', 'Patchouli', 'Vanilla']
        },
        images: ['/perfumes/noir-mystique.jpg'],
        rating: 4.8,
        reviewCount: 178,
        inStock: true,
        releaseDate: '2023-12-01',
        createdAt: '2023-12-01T00:00:00Z',
        updatedAt: '2024-11-20T00:00:00Z'
    },
    {
        id: '8',
        name: 'Garden Party',
        brand: 'Bloom & Petal',
        description: 'A joyful bouquet of fresh garden flowers. Peony, lily, and freesia create a romantic, feminine fragrance perfect for spring and summer.',
        price: 105,
        type: PerfumeType.EAU_DE_PARFUM,
        scentFamily: ScentFamily.FLORAL,
        gender: 'female',
        sizes: [
            { volume: 50, price: 105, stock: 38 },
            { volume: 100, price: 165, stock: 25 }
        ],
        fragranceNotes: {
            top: ['Freesia', 'Pear', 'Lychee'],
            middle: ['Peony', 'Lily', 'Rose'],
            base: ['Musk', 'Amber', 'Sandalwood']
        },
        images: ['/perfumes/garden-party.jpg'],
        rating: 4.6,
        reviewCount: 245,
        inStock: true,
        releaseDate: '2024-04-08',
        createdAt: '2024-04-08T00:00:00Z',
        updatedAt: '2024-11-20T00:00:00Z'
    }
];
