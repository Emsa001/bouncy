export interface IBall {
    name: string;
    className: string;
    rarity: number;
    new?: boolean;
    particles?: boolean
}

export const allBall: IBall[] = [
    // Original / Common
    {
        name: "royal-twilight",
        className: "bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900",
        rarity: 20,
    },
    {
        name: "indigo-pulse",
        className: "bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900",
        rarity: 15,
    },
    {
        name: "pink-eclipse",
        className: "bg-gradient-to-tl from-pink-900 via-purple-900 to-indigo-900",
        rarity: 10,
    },
    {
        name: "midnight-bloom",
        className: "bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900",
        rarity: 20,
    },
    {
        name: "aurora-amethyst",
        className: "bg-gradient-to-tr from-indigo-900 via-pink-900 to-purple-900",
        rarity: 10,
    },
    {
        name: "deep-sapphire",
        className: "bg-gradient-to-l from-blue-900 via-indigo-900 to-purple-900",
        rarity: 10,
    },
    {
        name: "royal-dawn",
        className: "bg-gradient-to-t from-purple-900 via-indigo-900 to-pink-900",
        rarity: 5,
    },
    {
        name: "velvet-lagoon",
        className: "bg-gradient-to-bl from-pink-900 via-purple-900 to-blue-900",
        rarity: 5,
    },
    {
        name: "indigo-abyss",
        className: "bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900",
        rarity: 5,
    },
    {
        name: "rose-prism",
        className: "bg-gradient-to-r from-pink-900 via-indigo-900 to-purple-900",
        rarity: 5,
    },
    {
        name: "emerald-night",
        className: "bg-gradient-to-br from-emerald-600 via-indigo-900 to-purple-800",
        rarity: 1,
    },
    {
        name: "crimson-rose",
        className: "bg-gradient-to-tl from-pink-600 via-rose-900 to-indigo-900",
        rarity: 1,
    },

    // New / Uncommon
    {
        name: "teal-storm",
        className: "bg-gradient-to-br from-teal-700 via-cyan-900 to-indigo-900",
        rarity: 8,
    },
    {
        name: "amber-blaze",
        className: "bg-gradient-to-tr from-amber-700 via-orange-900 to-red-900",
        rarity: 7,
    },
    {
        name: "verdant-depths",
        className: "bg-gradient-to-bl from-lime-700 via-green-900 to-emerald-900",
        rarity: 6,
    },
    {
        name: "skyfall",
        className: "bg-gradient-to-b from-sky-800 via-blue-900 to-indigo-950",
        rarity: 6,
    },
    {
        name: "sapphire-glow",
        className: "bg-gradient-to-tr from-blue-700 via-indigo-800 to-cyan-900",
        rarity: 9,
    },
    {
        name: "crimson-wave",
        className: "bg-gradient-to-bl from-red-700 via-rose-900 to-pink-800",
        rarity: 8,
    },
    {
        name: "violet-frost",
        className: "bg-gradient-to-r from-violet-700 via-purple-900 to-indigo-700",
        rarity: 7,
    },
    {
        name: "golden-dawn",
        className: "bg-gradient-to-tl from-yellow-500 via-amber-700 to-orange-800",
        rarity: 6,
    },
    {
        name: "celestial-mist",
        className: "bg-gradient-to-br from-sky-700 via-cyan-800 to-indigo-900",
        rarity: 6,
    },
    {
        name: "rose-garden",
        className: "bg-gradient-to-l from-rose-500 via-pink-700 to-purple-700",
        rarity: 5,
    },
    {
        name: "emerald-veil",
        className: "bg-gradient-to-t from-green-600 via-emerald-700 to-teal-800",
        rarity: 4.5,
    },
    {
        name: "amber-sky",
        className: "bg-gradient-to-br from-amber-500 via-orange-700 to-red-700",
        rarity: 4,
    },

    // Rare
    {
        name: "rose-nebula",
        className: "bg-gradient-to-br from-rose-700 via-fuchsia-900 to-cyan-900",
        rarity: 3,
    },
    {
        name: "twilight-grove",
        className: "bg-gradient-to-l from-indigo-800 via-emerald-800 to-amber-900",
        rarity: 2,
    },
    {
        name: "ocean-ember",
        className: "bg-gradient-to-t from-sky-900 via-teal-900 to-rose-900",
        rarity: 1.5,
    },
    {
        name: "crimson-dusk",
        className: "bg-gradient-to-tr from-amber-600 via-rose-800 to-indigo-900",
        rarity: 1.2,
    },
    {
        name: "midnight-reef",
        className: "bg-gradient-to-tr from-blue-800 via-indigo-900 to-teal-700",
        rarity: 3.5,
    },
    {
        name: "orchid-dream",
        className: "bg-gradient-to-l from-fuchsia-500 via-violet-700 to-indigo-800",
        rarity: 3,
    },
    {
        name: "crystal-dawn",
        className: "bg-gradient-to-tl from-cyan-400 via-sky-500 to-indigo-600",
        rarity: 2.5,
    },
    {
        name: "sunfire",
        className: "bg-gradient-to-br from-red-500 via-orange-600 to-yellow-600",
        rarity: 2,
    },

    // Very Rare
    {
        name: "emerald-mirage",
        className:
            "bg-gradient-to-br from-emerald-500 via-sky-800 to-fuchsia-900 animate-gradient-x shadow-lg shadow-emerald-400/50",
        rarity: 0.8,
    },
    {
        name: "cyan-orchid",
        className: "bg-gradient-to-l from-cyan-500 via-violet-900 to-rose-800 animate-pulse",
        rarity: 0.5,
    },
    {
        name: "lime-eclipse",
        className:
            "bg-gradient-to-bl from-indigo-400 via-pink-900 to-lime-700 bg-[length:400%_400%] animate-gradient-x",
        rarity: 0.3,
    },
    {
        name: "amber-tide",
        className: "bg-gradient-to-r from-amber-500 via-emerald-800 to-sky-900 shadow-amber-400/60",
        rarity: 0.2,
    },
    {
        name: "lime-flame",
        className:
            "bg-gradient-to-tr from-lime-500 via-cyan-900 to-fuchsia-800 animate-pulse shadow-xl",
        rarity: 0.1,
    },

    // Legendary / Ultra-Rare
    {
        name: "emerald-rose",
        className:
            "bg-gradient-to-br from-pink-400 via-emerald-500 to-indigo-800 animate-gradient-x bg-[length:300%_300%] shadow-2xl shadow-pink-400/50",
        rarity: 0.05,
    },
    {
        name: "sunset-lagoon",
        className:
            "bg-gradient-to-t from-cyan-400 via-rose-500 to-amber-700 animate-pulse shadow-xl",
        rarity: 0.03,
    },
    {
        name: "mystic-bloom",
        className:
            "bg-gradient-to-bl from-violet-300 via-emerald-400 to-pink-500 shadow-2xl shadow-violet-400/40",
        rarity: 0.03,
    },
    {
        name: "gilded-rose",
        className:
            "bg-gradient-to-tr from-yellow-400 via-rose-500 to-pink-600 animate-gradient-x shadow-lg",
        rarity: 0.07,
    },
    {
        name: "nebula-shade",
        className:
            "bg-gradient-to-l from-purple-400 via-indigo-600 to-cyan-700 animate-pulse bg-[length:400%_400%] shadow-lg shadow-indigo-400/40",
        rarity: 0.05,
    },
    {
        name: "lunar-glint",
        className: "bg-gradient-to-tl from-sky-400 via-blue-500 to-indigo-600 shadow-xl",
        rarity: 0.03,
    },
    {
        name: "aurora-tide",
        className:
            "bg-gradient-to-br from-green-400 via-cyan-500 to-blue-600 animate-gradient-x shadow-lg shadow-cyan-400/50",
        rarity: 0.03,
    },
    {
        name: "starlight-bloom",
        className:
            "bg-gradient-to-r from-purple-800 via-violet-900 to-indigo-700 animate-pulse shadow-2xl",
        rarity: 0.03,
        particles: true
    },
];
