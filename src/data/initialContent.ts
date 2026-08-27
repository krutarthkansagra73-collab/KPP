import {
  MemoryBookConfig,
  MemoryPhoto,
  JarMemory,
  OpenWhenLetter,
  TimeCapsuleEntry,
  EasterEgg,
  ComparisonRow,
  ThingNeverSaid,
  BrotherPromiseItem
} from '../types';

export const initialConfig: MemoryBookConfig = {
  websiteTitle: "Just A Call Away ❤️",
  subtitle: "A little something from your brother, Krutarth.",
  alternativeOpening: "For Priya & Prisha — two very different girls, but two people I’ll always call my sisters.",
  brotherName: "Krutarth",
  brotherAge: 23,
  brotherPhone: "+91 9510695849",
  olderSisterName: "Priya",
  olderSisterAge: 29,
  olderSisterLocation: "Adelaide, Australia",
  olderSisterQuote: "Distance means so little when someone means so much.",
  olderSisterDescription: "From bossing me around in Surat to building a beautiful life in Australia — you will always be the older sister I look up to.",
  youngerSisterName: "Prisha",
  youngerSisterAge: 16,
  youngerSisterLocation: "Surat, Gujarat",
  youngerSisterQuote: "Forever the baby of the house, no matter how tall you grow.",
  youngerSisterDescription: "Sweet sixteen, full of drama, endless reels, and still asking me to order food. Never change!",
  customVoiceNoteUrl: "",
  voiceNoteDuration: "1:42",
  enableBackgroundMelody: true,
  heroPhotoUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop",
  olderSisterPhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  youngerSisterPhotoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  youngerSisterBabyPhotoUrl: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=800&auto=format&fit=crop",
  finalPhotoUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
  finalMessage: "No matter where our careers, marriages, and lives lead us — in every room we step into, we carry each other’s strength.",
  brotherLetterPreamble: "I don’t know where life will take all three of us. Maybe we’ll live in different cities, countries, or time zones. But one thing will never change: Your brother will always have your back."
};

export const initialPhotos: MemoryPhoto[] = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
    caption: "Before we knew how quickly we would grow up…",
    fullStory: "Our iconic childhood photo where none of us were looking at the camera at the same time. Priya was pretending to be in charge, I was clutching my toy, and Prisha was just causing chaos.",
    category: "then",
    year: "2009",
    location: "Surat",
    rotation: -2,
    featured: true
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?q=80&w=800&auto=format&fit=crop",
    caption: "Back when our biggest problems were probably something ridiculous.",
    fullStory: "Fighting over who gets the front seat of the car and who took the last piece of chocolate from the fridge. Simple times.",
    category: "then",
    year: "2012",
    location: "Home, Surat",
    rotation: 3
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=800&auto=format&fit=crop",
    caption: "Look how small we were.",
    fullStory: "Standing in a line in height order during Diwali. Priya was tallest back then... well, look at us now! 😂",
    category: "then",
    year: "2014",
    location: "Nana's Terrace",
    rotation: -3
  },
  {
    id: "p4",
    url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=800&auto=format&fit=crop",
    caption: "We had no idea how many memories were waiting for us.",
    fullStory: "Every summer vacation was endless games, ice cream at 11 PM, and ganging up on each other.",
    category: "growing_up",
    year: "2016",
    location: "Surat",
    rotation: 2
  },
  {
    id: "p5",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    caption: "Family weddings — dressing up just to take 500 photos and eat snacks.",
    fullStory: "Priya making sure everyone's outfit matched, Prisha stealing sweets before the puja, and me trying to hide from relatives asking about college.",
    category: "family",
    year: "2019",
    location: "Ahmedabad",
    rotation: -2
  },
  {
    id: "p6",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    caption: "Priya's wedding day. The hardest smile to hold.",
    fullStory: "Watching you walk down the aisle. Knowing you were going all the way to Adelaide, but so proud and happy for you.",
    category: "family",
    year: "2022",
    location: "Surat",
    rotation: 1
  },
  {
    id: "p7",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    caption: "Prisha turning 16 — still the designated little sister forever.",
    fullStory: "Trying to act all mature now that you're in high school, but you still ask me to order pizza for you at midnight.",
    category: "now",
    year: "2025",
    location: "Surat",
    rotation: -3
  },
  {
    id: "p8",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    caption: "Three people, different time zones, same team.",
    fullStory: "Late night WhatsApp video calls where half the screen is Adelaide daylight and the other half is Surat midnight.",
    category: "now",
    year: "2026",
    location: "Everywhere",
    rotation: 2,
    featured: true
  },
  {
    id: "p9",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
    caption: "Random Chaos: The time we tried to bake without mom finding out.",
    fullStory: "There was flour on the ceiling fan. I still don't understand how flour got on the ceiling fan.",
    category: "chaos",
    year: "2017",
    location: "Kitchen",
    rotation: -1
  },
  {
    id: "p10",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    caption: "Team meetings where nothing productive ever happens.",
    fullStory: "Planning family trips that never happen because none of our schedules match.",
    category: "chaos",
    year: "2024",
    location: "Living Room",
    rotation: 3
  }
];

export const initialJarMemories: JarMemory[] = [
  {
    id: "j1",
    type: "funny",
    title: "The Maggi Incident",
    content: "When we made 4 packets of Maggi at 2 AM, burned the bottom of the pot, and hid the evidence under a pile of steel utensils.",
    tags: ["Midnight", "Food", "Crime"]
  },
  {
    id: "j2",
    type: "childhood",
    title: "Remote Control War",
    content: "Priya wanted to watch drama serials, Prisha wanted cartoons, and I hid the remote inside the sofa cushion so nobody could watch anything.",
    tags: ["TV", "Surat", "Fights"]
  },
  {
    id: "j3",
    type: "embarrassing",
    title: "Krutarth's Famous Haircut",
    content: "That haircut in 8th standard where I looked like a bowl and Priya laughed at me for 3 weeks straight in front of all relatives.",
    tags: ["Krutarth", "Style Icon"]
  },
  {
    id: "j4",
    type: "sweet",
    title: "Priya's Secret Support",
    content: "When I messed up my first college semester results, Priya was the only one who didn't scold me. She just sent me food and said 'Fix it next time, you'll be fine'.",
    tags: ["Big Sister", "Comfort"]
  },
  {
    id: "j5",
    type: "funny",
    title: "Prisha's Fake Tears",
    content: "Prisha bumping her own arm against the wall gently, then fake crying so Mom would yell at me and Priya without even asking what happened.",
    tags: ["Prisha Drama", "Oscar Award"]
  },
  {
    id: "j6",
    type: "family",
    title: "Diwali Terrace Lanterns",
    content: "Tying the lantern string together every Diwali night while eating fresh homemade snacks until we were too stuffed to move.",
    tags: ["Festivals", "Diwali", "Tradition"]
  },
  {
    id: "j7",
    type: "emotional",
    title: "The Adelaide Airport Hug",
    content: "Saying goodbye before your flight to Australia. We were making jokes until the security line, and then suddenly nobody could look each other in the eye.",
    tags: ["Airport", "Priya", "Adelaide"]
  },
  {
    id: "j8",
    type: "funny",
    title: "Prisha's Assignment 'Help'",
    content: "Prisha asking Krutarth to 'just look over' her school project, which actually meant 'do the entire 12-page PowerPoint for me while I watch reels'.",
    tags: ["School", "Lazy Little Sister"]
  },
  {
    id: "j9",
    type: "childhood",
    title: "Car Ride Playlist Battles",
    content: "Connecting aux cord in the car: Priya's Bollywood romantic tracks, Krutarth's hip hop, and Prisha playing whatever song was trending on Instagram 100 times in a row.",
    tags: ["Music", "Road Trips"]
  },
  {
    id: "j10",
    type: "sweet",
    title: "First Paycheck Treat",
    content: "Taking you two out with the first money I earned. It wasn't a fancy place, but having you both there made it feel like the biggest celebration in the world.",
    tags: ["Milestone", "Brother Proud"]
  },
  {
    id: "j11",
    type: "funny",
    title: "The Monopoly Cheating Scandal",
    content: "Priya as the banker 'accidentally' giving herself 500-rupee notes every time someone went to the bathroom.",
    tags: ["Board Games", "Banker Fraud"]
  },
  {
    id: "j12",
    type: "sweet",
    title: "Prisha's First Phone",
    content: "When Prisha finally got a smartphone and texted me 47 stickers within the first 10 minutes.",
    tags: ["Prisha", "Tech Debut"]
  },
  {
    id: "j13",
    type: "emotional",
    title: "The Midnight Birthday Calls",
    content: "Even with the 4-hour Adelaide time difference, Priya calling right at 12:00:01 AM without fail every single birthday.",
    tags: ["Tradition", "Care"]
  },
  {
    id: "j14",
    type: "funny",
    title: "Ghar Ka Detective Priya",
    content: "Priya figuring out who ate the leftover dessert within 30 seconds just by analyzing spoon marks.",
    tags: ["FBI Priya", "Dessert Crimes"]
  },
  {
    id: "j15",
    type: "childhood",
    title: "Monsoon Terrace Chai & Pakoras",
    content: "Surat rain pouring outside while we sat in the balcony arguing about which teacher in school was the weirdest.",
    tags: ["Rain", "Surat", "Childhood"]
  },
  {
    id: "j16",
    type: "family",
    title: "The Rakhi Negotiations",
    content: "Every year: 'Krutarth, gift kahan hai?' — 'Mere aashirwaad hi tumhara sabse bada gift hai.' Followed by getting hit with a pillow.",
    tags: ["Rakhi", "Classic Sibling"]
  },
  {
    id: "j17",
    type: "embarrassing",
    title: "Family Dance Performance",
    content: "That cousin's sangeet where we practiced a 3-minute dance for 2 weeks and still forgot the steps on stage simultaneously.",
    tags: ["Sangeet", "Zero Coordination"]
  },
  {
    id: "j18",
    type: "sweet",
    title: "When Prisha was born",
    content: "Looking at this tiny little baby in Surat and thinking: 'Okay, I guess I have to protect this little human forever now.'",
    tags: ["Little Sister", "Day One"]
  },
  {
    id: "j19",
    type: "funny",
    title: "Priya's 'Five Minutes Away'",
    content: "Priya saying 'Bas 5 minute mein tayyar ho rahi hoon' when she hasn't even chosen her earrings yet.",
    tags: ["Time Concept", "Big Sister"]
  },
  {
    id: "j20",
    type: "emotional",
    title: "The Group Chat Silence",
    content: "Days when life gets too busy, but someone just drops a stupid meme and instantly all three of us are typing together again.",
    tags: ["Group Chat", "Bond"]
  },
  {
    id: "j21",
    type: "funny",
    title: "Priya's Cooking Experiments",
    content: "The infamous pasta experiment in 2018 where salt was replaced by sugar. We ate it anyway out of brotherly loyalty (and fear).",
    tags: ["Chef Priya", "Survival"]
  },
  {
    id: "j22",
    type: "sweet",
    title: "Surprise Packages from Adelaide",
    content: "When a random package from Australia arrives in Surat filled with Australian chocolates and handwritten notes.",
    tags: ["Priya", "Adelaide to Surat"]
  },
  {
    id: "j23",
    type: "funny",
    title: "Prisha's Secret Crush Cover-up",
    content: "Prisha swearing me to secrecy about a school secret, then telling 4 other cousins before the weekend ended.",
    tags: ["Secrets", "Prisha Broadcast"]
  },
  {
    id: "j24",
    type: "emotional",
    title: "Always In My Corner",
    content: "Whenever I was nervous before job interviews or big life decisions, knowing my two sisters were praying for me made all the difference.",
    tags: ["Support", "Strength"]
  },
  {
    id: "j25",
    type: "family",
    title: "Ice Cream Drives at Night",
    content: "Sneaking out for thick shakes and cold cocoa in Surat when everyone at home was asleep.",
    tags: ["Surat Vibes", "Late Night"]
  },
  {
    id: "j26",
    type: "sweet",
    title: "Sibling Code Words",
    content: "Making one specific eye contact across a boring family function room and all three of us immediately knowing what it meant.",
    tags: ["Telepathy", "Trio"]
  },
  {
    id: "j27",
    type: "childhood",
    title: "Building Forts with Blankets",
    content: "Using dining chairs and 6 heavy blankets to make a bunker where only sisters and brother were allowed entry.",
    tags: ["Fort", "Nostalgia"]
  },
  {
    id: "j28",
    type: "funny",
    title: "Who's Mom's Favorite?",
    content: "We all know Priya pretends she is, Prisha actually is because she's 16, and Krutarth just gets asked to buy groceries.",
    tags: ["Truth", "Sibling Hierarchy"]
  },
  {
    id: "j29",
    type: "emotional",
    title: "Brother's Silent Vow",
    content: "Standing at the doorway watching both of you laugh. Realizing that no matter how big the world gets, you two will always be home to me.",
    tags: ["Love", "Unbreakable"]
  },
  {
    id: "j30",
    type: "sweet",
    title: "Every Raksha Bandhan Ever",
    content: "That red thread isn't just a ritual. For 23 years, it's been the quietest, strongest reminder that I am never alone.",
    tags: ["Raksha Bandhan", "Sacred Thread"]
  }
];

export const initialOpenWhenLetters: OpenWhenLetter[] = [
  {
    id: "ow1",
    slug: "miss-brother",
    title: "Open when you miss your brother",
    preview: "For the days when the house or distance feels a little too quiet...",
    content: "Hey. If you're opening this, it means you're missing me. First off: of course you are, I'm great! 😂\n\nOn a serious note... even if I'm busy, even if time zones are annoying, remember that you don't need a formal reason to reach out. Drop a random meme, send a 3-second voice note, or just ring me. I'm never too busy for my sisters. Look up at the sky — same moon, same stars, same brother who is proud of you.",
    iconName: "Heart",
    color: "from-rose-500/20 to-pink-500/20 border-rose-500/30",
    photoUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "ow2",
    slug: "bad-day",
    title: "Open when you're having a bad day",
    preview: "Take a deep breath. Your brother is on your team.",
    content: "Pause. Take a deep breath.\n\nWhatever went wrong today — whether someone annoyed you, an exam or project went sideways, or life just feels heavy — it's just one bad day, not a bad life.\n\nYou have survived 100% of your hardest days so far. You are stronger, smarter, and more resilient than you give yourself credit for.\n\nAnd if someone upset you? Tell me their name. (Just kidding... unless you want me to 😂). I've got your back. Always.",
    iconName: "CloudRain",
    color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30"
  },
  {
    id: "ow3",
    slug: "need-someone",
    title: "Open when you need someone",
    preview: "No judgment, no lectures. Just an ear that listens.",
    content: "If the world feels overwhelming and you don't know who to talk to without being judged or given unwanted advice...\n\nCall me. Tell me: 'Krutarth, I just want you to listen, don't fix it.' And I promise I'll just sit with you and listen.\n\nYou don't have to carry everything by yourself. That's literally my job as your brother.",
    iconName: "Shield",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30"
  },
  {
    id: "ow4",
    slug: "angry-with-me",
    title: "Open when you're angry with me",
    preview: "Okay... I probably did something stupid. Hear me out!",
    content: "Uh oh. Did I reply with a thumbs-up? Did I forget to reply to your reel? Did I tease you in front of people?\n\nI'm sorry. 99% of the time I'm just being an annoying brother, but I never want to actually hurt you.\n\nTake your time to be mad at me, but don't stay mad too long. You know you miss my jokes anyway. Send me an angry emoji and let's sort it out! ❤️",
    iconName: "Zap",
    color: "from-red-500/20 to-rose-500/20 border-red-500/30"
  },
  {
    id: "ow5",
    slug: "want-to-laugh",
    title: "Open when you want to laugh",
    preview: "Remembering some of our most unhinged sibling moments...",
    content: "A quick reminder of things that actually happened in our lives:\n\n1. The time Krutarth tried to do a stunt off the sofa and took down the curtain rod.\n2. Priya trying to speak with a British accent for 2 days after watching Harry Potter.\n3. Prisha crying because her ice cream was 'too cold'.\n\nWe are ridiculous. But we are ridiculous TOGETHER. Smile, your face looks better that way!",
    iconName: "Smile",
    color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30"
  },
  {
    id: "ow6",
    slug: "proud-of-yourself",
    title: "Open when you're proud of yourself",
    preview: "Celebrate your wins, big or small. I'm cheering the loudest!",
    content: "YOU DID IT! 🎉\n\nWhatever milestone, achievement, good grade, promotion, or personal hurdle you just crossed — celebrate it! You worked hard for this.\n\nNobody sees how much effort you put in behind the scenes, but I do. I am SO lucky to be your brother. Treat yourself today, you earned it.",
    iconName: "Trophy",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
  },
  {
    id: "ow7",
    slug: "far-away",
    title: "Open when you're far away",
    preview: "For Priya in Adelaide or wherever life takes us...",
    content: "Surat to Adelaide is 9,800 kilometers. Flight time: 14+ hours. Time difference: 4.5 hours.\n\nNumbers mean nothing.\n\nFamily isn't about being in the same living room every day; it's about knowing that wherever you land on this planet, there is a person back home whose door is always unlocked for you. Distance only makes the reunions sweeter. Love you, Didi.",
    iconName: "Plane",
    color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "ow8",
    slug: "next-raksha-bandhan",
    title: "Open on Raksha Bandhan next year",
    preview: "A message from this year's Krutarth to next year's you...",
    content: "Another year has passed! Look at us — one year older, probably still arguing about the same silly things.\n\nIf you're reading this next Raksha Bandhan: thank you for another 365 days of being my sister. Check the Time Capsule section below to unlock this year's new memory!\n\nSame brother. Same promise. Forever.",
    iconName: "Gift",
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30"
  }
];

export const initialTimeCapsules: TimeCapsuleEntry[] = [
  {
    year: 2026,
    isUnlocked: true,
    title: "Our First Digital Raksha Bandhan Memory",
    letter: "This year, with Priya in Adelaide and Prisha stepping into her crucial high school years in Surat, I wanted to build something that lives forever. A permanent reminder that no matter where our lives branch out, our roots stay wrapped around each other. Happy Raksha Bandhan 2026! ❤️",
    promise: "I promise that 10 years from now, I will still be the brother who picks up your call on the first ring.",
    photos: ["https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop"]
  },
  {
    year: 2027,
    isUnlocked: false,
    unlockDate: "August 2027",
    title: "Raksha Bandhan 2027 Chapter",
    letter: "Locked until Raksha Bandhan 2027. Krutarth will write a fresh letter and upload new memories next August!",
    promise: "To be unlocked next year..."
  },
  {
    year: 2028,
    isUnlocked: false,
    unlockDate: "August 2028",
    title: "Raksha Bandhan 2028 Chapter",
    letter: "Locked until Raksha Bandhan 2028. Our story keeps continuing year after year.",
    promise: "To be unlocked in 2028..."
  }
];

export const easterEggsList: EasterEgg[] = [
  {
    id: "egg1",
    triggerLabel: "Don't click this.",
    popupTitle: "Seriously? You clicked it? 😂",
    punchline: "I literally said 'Don't click this' and your sibling curiosity couldn't resist.",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    subtext: "Okay, now go before I embarrass you more with our 2011 Diwali photos! 😂"
  },
  {
    id: "egg2",
    triggerLabel: "Secret Sibling Rule #42",
    popupTitle: "Confidential Sibling Rulebook",
    punchline: "Rule #42: Whoever spots the other person eating snacks has legal right to 50% tax immediately.",
    subtext: "Applies across international waters (Adelaide included)."
  },
  {
    id: "egg3",
    triggerLabel: "Emergency Sibling SOS",
    popupTitle: "BEEP BEEP! 🚨 Sibling SOS Activated",
    punchline: "Protocol: 1. Send pizza. 2. Blame the nearest cousin. 3. Krutarth takes the blame in front of parents.",
    subtext: "Valid 24/7/365."
  },
  {
    id: "egg4",
    triggerLabel: "Krutarth's Secret Confession",
    popupTitle: "Top Secret 🤫",
    punchline: "Okay fine... you both are actually cooler than me. But if you tell anyone I said this, I will deny it under oath.",
    subtext: "This message will self-destruct in your memory."
  }
];

export const initialThingsNeverSaid: ThingNeverSaid[] = [
  {
    id: "t1",
    quote: "I don't always say it out loud...",
    detail: "Because 23-year-old brothers are notoriously bad at showing emotions without making a joke first."
  },
  {
    id: "t2",
    quote: "I care about you both more than you probably realize.",
    detail: "Every single day. When I hear about your day, when you succeed, when you're stressed."
  },
  {
    id: "t3",
    quote: "I may tease you and annoy you endlessly...",
    detail: "That's just brotherly love disguised as nuisance. If I stop annoying you, that's when you should worry!"
  },
  {
    id: "t4",
    quote: "I may not always know the perfect thing to say.",
    detail: "I might fumble words or give clumsy advice, but my intention will always be to protect and cheer you on."
  },
  {
    id: "t5",
    quote: "You two made my childhood the best chapter of my life.",
    detail: "Growing up with you both gave me a foundation of laughter and security I will cherish till the end."
  },
  {
    id: "t6",
    quote: "I really, really do love you both.",
    detail: "More than words, more than kilometers, more than all the silly arguments in the world."
  }
];

export const thingsNeverSaidList = initialThingsNeverSaid;

export const initialComparisonRows: ComparisonRow[] = [
  {
    id: "c1",
    trait: "Designated Sibling Role",
    priya: "The responsible one & family advisor",
    krutarth: "The peacemaker (or instigator 😂)",
    prisha: "The forever spoiled little one"
  },
  {
    id: "c2",
    trait: "When an argument breaks out",
    priya: "Uses logic, facts and courtroom arguments",
    krutarth: "Tries to negotiate or escapes room",
    prisha: "Uses emotional tears & wins instantly"
  },
  {
    id: "c3",
    trait: "Snack Ownership Policy",
    priya: "Hides her snacks in secret drawers",
    krutarth: "Buys snacks, leaves them on table, gone in 5 mins",
    prisha: "Considers all snacks in house her property"
  },
  {
    id: "c4",
    trait: "Reply Speed on WhatsApp",
    priya: "Instant or 12 hours later due to Adelaide timezone",
    krutarth: "Replies with one emoji 👍",
    prisha: "Sends 18 reels in a row without context"
  },
  {
    id: "c5",
    trait: "In Krutarth’s Heart",
    priya: "My rock, role model, and biggest supporter",
    krutarth: "Your brother who will always show up",
    prisha: "My joy, pride, and little sister to protect"
  }
];

export const initialBrotherPromises: BrotherPromiseItem[] = [
  {
    id: "bp1",
    lead: "If you’re right,",
    text: "I’ll stand with you.",
  },
  {
    id: "bp2",
    lead: "If you’re wrong,",
    text: "I’ll still stand with you…",
    humorNote: "but I’ll probably tell you that you’re wrong! 😂"
  },
  {
    id: "bp3",
    lead: "If you’re happy,",
    text: "I’ll celebrate with you the loudest."
  },
  {
    id: "bp4",
    lead: "If you’re crying,",
    text: "I’ll make a stupid face or joke until you laugh."
  },
  {
    id: "bp5",
    lead: "If life gets heavy,",
    text: "You don’t have to carry it alone."
  }
];

