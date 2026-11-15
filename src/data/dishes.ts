import { Dish, ReviewItem } from '../types/restaurant';

export const HERO_IMAGE = '/src/assets/images/hero_wagyu_hearth_1794779124807.jpg';
export const ABOUT_INTERIOR_IMAGE = '/src/assets/images/about_nova_dining_1794779128083.jpg';

export const DISHES: Dish[] = [
  {
    id: 'hearth-wagyu-ribeye',
    category: 'mains',
    name: {
      en: 'Hearth-Seared Wagyu Ribeye',
      ar: 'ريب آي واغيو مشوي على الجمر',
    },
    subtitle: {
      en: 'A5 Miyazaki Cut · Smoked Herb Butter',
      ar: 'قطعة واغيو ميازاكي الفاخرة · زبدة الأعشاب المدخنة',
    },
    description: {
      en: 'Dry-aged 35 days and seared over white oak embers until deeply caramelized. Served sliced on hot basalt with melting rosemary-garlic compound butter, blistered heirloom garlic, and Maldon sea salt flakes.',
      ar: 'لحم واغيو معتّق لمدة ٣٥ يوماً ومشوي على جمر البلوط الأبيض حتى يكتسب قشرة ذهبية غنية. يُقدّم مقطعاً فوق حجر البازلت الساخن مع زبدة إكليل الجبل الذائبة والثوم المشوي وملح البحر.',
    },
    ingredients: {
      en: ['A5 Wagyu Ribeye', 'Cultured Herb Butter', 'Confit Garlic', 'Charred Rosemary', 'Smoked Sea Salt'],
      ar: ['لحم واغيو A5', 'زبدة الأعشاب المعتّقة', 'ثوم كونفي مشوي', 'إكليل الجبل المدخن', 'ملح بحري مدخن'],
    },
    price: 74,
    prepMinutes: 24,
    calories: 780,
    image: '/src/assets/images/hero_wagyu_hearth_1794779124807.jpg',
    isHot: true,
    isSignature: true,
    sizes: [
      { id: 'std', label: { en: '280g Classic Cut', ar: '٢٨٠ جم قطعة كلاسيكية' }, priceDelta: 0 },
      { id: 'reserve', label: { en: '400g Chef Reserve', ar: '٤٠٠ جم اختيار الشيف' }, priceDelta: 24 },
      { id: 'table', label: { en: '650g Table Share', ar: '٦٥٠ جم للمشاركة' }, priceDelta: 52 },
    ],
    extras: [
      { id: 'truffle-butter', label: { en: 'Black Truffle Marrow Butter', ar: 'زبدة النخاع والكمأة السوداء' }, price: 9 },
      { id: 'foie-gras', label: { en: 'Pan-Seared Foie Gras Medallion', ar: 'شريحة فوا غرا محمّرة' }, price: 18 },
      { id: 'peppercorn-jus', label: { en: 'Aged Cognac-Free Peppercorn Jus', ar: 'صوص الفلفل المعتّق' }, price: 6 },
    ],
  },
  {
    id: 'herb-rack-of-lamb',
    category: 'mains',
    name: {
      en: 'Crusted Rack of Lamb',
      ar: 'أضلاع لحم الضأن بالأعشاب',
    },
    subtitle: {
      en: 'Pomegranate Reduction · Charred Heirloom Carrots',
      ar: 'اختزال الرمان · جزر مشوي على اللهب',
    },
    description: {
      en: 'Pasture-raised French-trimmed lamb rack coated in pistachio, thyme, and roasted garlic crust. Finished with a ruby pomegranate molasses glaze and ember-roasted baby carrots.',
      ar: 'أضلاع ضأن مختارة مغلّفة بقشرة الفستق والزعتر البري والثوم المحمّص، تُقدّم مع صلصة دبس الرمان اللامعة وجزر صغير مشوي على الفحم.',
    },
    ingredients: {
      en: ['Pasture Lamb Rack', 'Pistachio Herb Crust', 'Pomegranate Reduction', 'Baby Heirloom Carrots', 'Fresh Rosemary'],
      ar: ['أضلاع ضأن طازجة', 'قشرة الفستق والأعشاب', 'صلصة الرمان المركّزة', 'جزر ملون مشوي', 'إكليل الجبل الطازج'],
    },
    price: 58,
    prepMinutes: 22,
    calories: 640,
    image: '/src/assets/images/dish_lamb_cutlets_1794779125919.jpg',
    isHot: true,
    isSignature: true,
    sizes: [
      { id: 'half', label: { en: '3 Cutlets (Single)', ar: '٣ قطع (فردي)' }, priceDelta: 0 },
      { id: 'full', label: { en: '6 Cutlets (Grand Rack)', ar: '٦ قطع (طبق كبير)' }, priceDelta: 28 },
    ],
    extras: [
      { id: 'truffle-mash', label: { en: 'Whipped Truffle Pomme Purée', ar: 'بطاطس مهروسة بالكمأة' }, price: 10 },
      { id: 'harissa-oil', label: { en: 'Smoked Ember Harissa Drizzle', ar: 'زيت الهريسة المدخن' }, price: 4 },
    ],
  },
  {
    id: 'saffron-scallop-risotto',
    category: 'mains',
    name: {
      en: 'Saffron & Sea Scallop Risotto',
      ar: 'ريزوتو الزعفران والمحار البحري',
    },
    subtitle: {
      en: 'Acquerello Rice · 24k Gold Leaf · Parmesan Crisp',
      ar: 'أرز أكويريلو · لمسة ذهب عيار ٢٤ · رقاقة بارميزان',
    },
    description: {
      en: 'Slow-simmered aged Acquerello carnaroli risotto infused with Kashmiri saffron threads, crowned with two caramel-seared Hokkaido sea scallops, lacy Parmigiano Reggiano tuile, and micro chervil.',
      ar: 'ريزوتو إيطالي مطهو ببطء مع خيوط الزعفران الكشميري، يعلوه حبتا محار هوكايدو محمّرتان بالزبدة، رقاقة بارميزان مقرمشة ولمسة من أوراق الذهب الصالحة للأكل.',
    },
    ingredients: {
      en: ['Acquerello Carnaroli', 'Kashmiri Saffron', 'Hokkaido Scallops', '36-Month Parmigiano', 'Edible Gold Leaf'],
      ar: ['أرز كارنارولي معتّق', 'زعفران كشميري', 'اسكالوب هوكايدو بحري', 'جبن بارميزان ٣٦ شهراً', 'رقائق ذهب صالحة للأكل'],
    },
    price: 49,
    prepMinutes: 20,
    calories: 590,
    image: '/src/assets/images/dish_saffron_risotto_1794779126513.jpg',
    isHot: true,
    isSignature: true,
    sizes: [
      { id: 'std', label: { en: '2 Seared Scallops', ar: 'محارتان مشويتان' }, priceDelta: 0 },
      { id: 'double', label: { en: '4 Seared Scallops', ar: '٤ محارات مشوية' }, priceDelta: 18 },
    ],
    extras: [
      { id: 'shaved-truffle', label: { en: 'Fresh Shaved Black Truffle', ar: 'شرائح كمأة سوداء طازجة' }, price: 14 },
      { id: 'garlic-brioche', label: { en: 'Charred Garlic Brioche', ar: 'خبز بريوش بالثوم المشوي' }, price: 6 },
    ],
  },
  {
    id: 'miso-charred-salmon',
    category: 'mains',
    name: {
      en: 'Miso-Glazed King Salmon',
      ar: 'سلمون كينج بصلصة الميسو المشوية',
    },
    subtitle: {
      en: 'Caramelized Blood Orange · Shaved Fennel · Sesame Crisp',
      ar: 'برتقال دموي مشوي · شمر مقرمش · رقاقة السمسم',
    },
    description: {
      en: 'Wild-caught king salmon lacquered in sweet white miso and torch-charred for a delicate smoky crust. Accompanied by shaved citrus-cured fennel, burnt blood orange, and black sesame tuile.',
      ar: 'فيليه سلمون بري مطلي بصلصة الميسو البيضاء ومشوي على اللهب للحصول على قشرة كراميل مدخنة، يُقدّم مع شرائح الشمر المنعشة والبرتقال الدموي المشوي.',
    },
    ingredients: {
      en: ['Wild King Salmon', 'White Saikyo Miso', 'Burnt Blood Orange', 'Shaved Fennel', 'Black Sesame Tuile'],
      ar: ['سلمون كينج بري', 'معجون ميسو أبيض', 'برتقال دموي مكرمل', 'شرائح شمر طازجة', 'رقاقة سمسم أسود'],
    },
    price: 44,
    prepMinutes: 18,
    calories: 520,
    image: '/src/assets/images/dish_glazed_salmon_1794779127524.jpg',
    isHot: true,
    isSignature: false,
    sizes: [
      { id: 'std', label: { en: '220g Fillet', ar: 'فيليه ٢٢٠ جم' }, priceDelta: 0 },
      { id: 'large', label: { en: '320g Chef Fillet', ar: 'فيليه كبير ٣٢٠ جم' }, priceDelta: 14 },
    ],
    extras: [
      { id: 'yuzu-butter', label: { en: 'Warm Yuzu Beurre Blanc', ar: 'صلصة زبدة اليوزو الدافئة' }, price: 6 },
      { id: 'charred-broccolini', label: { en: 'Ember-Charred Broccolini', ar: 'بروكوليني مشوي على الجمر' }, price: 8 },
    ],
  },
  {
    id: 'truffle-burrata',
    category: 'starters',
    name: {
      en: 'Black Truffle & Burrata',
      ar: 'بوراتا الكمأة السوداء',
    },
    subtitle: {
      en: 'Pugliese Cream · Roasted Heirloom Tomato · Sourdough',
      ar: 'كريمة بوليا · طماطم كرزية مشوية · خبز ساوردو',
    },
    description: {
      en: 'Hand-spun Pugliese burrata split tableside over blistered heirloom tomatoes and emerald basil oil, topped generously with freshly shaved Périgord black truffle and wood-grilled sourdough.',
      ar: 'جبنة بوراتا إيطالية طازجة محشوة بالكريمة، تُقدّم مع الطماطم المشوية وزيت الريحان الأخضر وشرائح الكمأة السوداء الطازجة وخبز الساوردو المحمّص.',
    },
    ingredients: {
      en: ['Pugliese Burrata', 'Périgord Black Truffle', 'Heirloom Tomatoes', 'Cold-Pressed Basil Oil', 'Grilled Sourdough'],
      ar: ['جبنة بوراتا طازجة', 'كمأة سوداء فرنسية', 'طماطم هيرلوم مشوية', 'زيت ريحان معصور على البارد', 'خبز ساوردو محمّص'],
    },
    price: 26,
    prepMinutes: 10,
    calories: 410,
    image: '/src/assets/images/dish_truffle_burrata_1794779125024.jpg',
    isHot: false,
    isSignature: true,
    sizes: [
      { id: 'std', label: { en: '180g Whole Burrata', ar: '١٨٠ جم قطعة كاملة' }, priceDelta: 0 },
      { id: 'share', label: { en: '300g Double Sharing', ar: '٣٠٠ جم للمشاركة' }, priceDelta: 14 },
    ],
    extras: [
      { id: 'extra-truffle', label: { en: 'Extra Shaved Black Truffle', ar: 'كمأة سوداء إضافية' }, price: 12 },
      { id: 'aged-balsamic', label: { en: '25-Year Modena Balsamic', ar: 'خل بلسمك معتّق ٢٥ عاماً' }, price: 5 },
    ],
  },
  {
    id: 'smoked-wagyu-tartare',
    category: 'starters',
    name: {
      en: 'Smoked Wagyu Tartare',
      ar: 'تارتار الواغيو المدخن',
    },
    subtitle: {
      en: 'Cured Golden Yolk · Crispy Shallots · Brioche Soldiers',
      ar: 'صفار بيض معتّق · كراث مقرمش · بريوش محمّص',
    },
    description: {
      en: 'Knife-cut tenderloin smoked gently under cedar glass, folded with caper emulsion and Dijon mustard seed. Crowned with a soy-cured golden yolk, crispy shallots, and butter-toasted brioche.',
      ar: 'فيليه واغيو مقطع بالسكين ومدخّن بلطف بخشب الأرز، ممزوج بصلصة الكبر والخردل، ويعلوه صفار بيض ذهبي معتّق وبصل مقرمش مع أصابع البريوش بالزبدة.',
    },
    ingredients: {
      en: ['Hand-Cut Wagyu Tenderloin', 'Cured Golden Egg Yolk', 'Crispy Shallots', 'Smoked Mustard Emulsion', 'Toasted Brioche'],
      ar: ['تندرلوين واغيو مقطع يدوياً', 'صفار بيض ذهبي معتّق', 'شرائح كراث مقرمشة', 'مستحلب الخردل المدخن', 'بريوش محمّص بالزبدة'],
    },
    price: 32,
    prepMinutes: 12,
    calories: 460,
    image: '/src/assets/images/dish_wagyu_tartare_1794779125835.jpg',
    isHot: false,
    isSignature: false,
    sizes: [
      { id: 'std', label: { en: 'Classic Starter (140g)', ar: 'مقبّل كلاسيكي (١٤٠ جم)' }, priceDelta: 0 },
      { id: 'grand', label: { en: 'Grand Tasting (220g)', ar: 'حجم التذوق الكبير (٢٢٠ جم)' }, priceDelta: 15 },
    ],
    extras: [
      { id: 'caviar-bump', label: { en: 'Oscietra Caviar Crown (5g)', ar: 'إضافة كافيار أوسيترا (٥ جم)' }, price: 22 },
      { id: 'extra-brioche', label: { en: 'Extra Warm Brioche Soldiers', ar: 'أصابع بريوش دافئة إضافية' }, price: 5 },
    ],
  },
  {
    id: 'valrhona-lava-fondant',
    category: 'desserts',
    name: {
      en: 'Valrhona Molten Fondant',
      ar: 'فوندان الشوكولاتة السائلة',
    },
    subtitle: {
      en: '70% Guanaja Cocoa · Vanilla Bean Quenelle · Gold Dust',
      ar: 'كاكاو فالرونا ٧٠٪ · آيس كريم فانيلا مدغشقر · غبار الذهب',
    },
    description: {
      en: 'Baked to order so the rich 70% Valrhona dark chocolate heart flows silkily upon cutting. Served warm with roasted Piedmont hazelnuts, gold shimmer, and Madagascar vanilla bean ice cream.',
      ar: 'تُخبز طازجة عند الطلب لينساب قلب الشوكولاتة الداكنة الفاخرة فور تقطيعها. تُقدّم دافئة مع البندق المحمّص وبريق الذهب وآيس كريم فانيلا مدغشقر.',
    },
    ingredients: {
      en: ['70% Valrhona Guanaja', 'Madagascar Vanilla Cream', 'Piedmont Hazelnuts', 'Maldon Sea Salt', '24k Gold Powder'],
      ar: ['شوكولاتة فالرونا ٧٠٪', 'آيس كريم فانيلا مدغشقر', 'بندق بييمونتي محمّص', 'ملح البحر', 'مسحوق ذهب عيار ٢٤'],
    },
    price: 21,
    prepMinutes: 14,
    calories: 540,
    image: '/src/assets/images/dish_chocolate_fondant_1794779126624.jpg',
    isHot: true,
    isSignature: true,
    sizes: [
      { id: 'single', label: { en: 'Individual Fondant', ar: 'فوندان فردي' }, priceDelta: 0 },
      { id: 'duo', label: { en: 'Duo Tasting Plate', ar: 'طبق مزدوج للمشاركة' }, priceDelta: 15 },
    ],
    extras: [
      { id: 'espresso-pour', label: { en: 'Hot Single-Origin Espresso Pour', ar: 'جرعة إسبريسو ساخنة فوق الحلوى' }, price: 5 },
      { id: 'salted-caramel', label: { en: 'Warm Salted Caramel Jug', ar: 'إبريق كراميل مملح دافئ' }, price: 4 },
    ],
  },
  {
    id: 'smoked-amber-elixir',
    category: 'elixirs',
    name: {
      en: 'Smoked Saffron Amber Elixir',
      ar: 'إكسير الزعفران المدخن',
    },
    subtitle: {
      en: 'Blood Orange · Torched Rosemary · Zero-Proof Reserve',
      ar: 'برتقال دموي · إكليل الجبل المشوي · مشروب فاخر',
    },
    description: {
      en: 'A luminous zero-proof house elixir crafted from cold-steeped Persian saffron, Sicilian blood orange reduction, wild cardamom bitters, and smoked under charred rosemary over a hand-carved ice sphere.',
      ar: 'مشروب مبتكر خالٍ من الكحول محضّر من منقوع الزعفران الإيراني، اختزال البرتقال الدموي الصقلي، الهيل البري، ويُدخّن بإكليل الجبل فوق كرة ثلج كريستالية.',
    },
    ingredients: {
      en: ['Persian Saffron Infusion', 'Blood Orange Reduction', 'Cardamom Botanicals', 'Charred Rosemary Smoke', 'Hand-Carved Ice'],
      ar: ['منقوع الزعفران الفاخر', 'عصير البرتقال الدموي', 'نكهات الهيل العطرية', 'دخان إكليل الجبل', 'كرة ثلج صافية'],
    },
    price: 16,
    prepMinutes: 6,
    calories: 95,
    image: '/src/assets/images/dish_amber_elixir_1794779127567.jpg',
    isHot: true,
    isSignature: false,
    sizes: [
      { id: 'glass', label: { en: 'Single Crystal Glass', ar: 'كأس كريستال فردي' }, priceDelta: 0 },
      { id: 'carafe', label: { en: 'Table Carafe (Serves 3)', ar: 'إبريق للطاولة (يكفي ٣)' }, priceDelta: 26 },
    ],
    extras: [
      { id: 'double-smoke', label: { en: 'Tableside Cedar Smoke Cloche', ar: 'تقديم تحت قبة الدخان العطري' }, price: 4 },
    ],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: { en: 'Layla Al-Mansoor', ar: 'ليلى المنصور' },
    role: { en: 'Architectural Designer', ar: 'مهندسة معمارية' },
    dishOrdered: { en: 'Hearth-Seared Wagyu Ribeye', ar: 'ريب آي واغيو مشوي على الجمر' },
    quote: {
      en: 'The aroma of white oak embers meets you at the door. Every detail — from the melting herb butter on the ribeye to the quiet brass lighting — feels intentional and deeply memorable.',
      ar: 'رائحة جمر البلوط تستقبلك منذ اللحظة الأولى. كل تفصيل هنا — من زبدة الأعشاب الذائبة فوق الواغيو إلى الإضاءة الدافئة — مدروس بعناية ويترك أثراً لا يُنسى.',
    },
    rating: 5,
  },
  {
    id: 'rev-2',
    author: { en: 'Julian Vance', ar: 'جوليان فانس' },
    role: { en: 'Culinary Critic, Atelier Magazine', ar: 'ناقد طهي، مجلة أتيليه' },
    dishOrdered: { en: 'Saffron & Sea Scallop Risotto', ar: 'ريزوتو الزعفران والمحار البحري' },
    quote: {
      en: 'NOVA Kitchen understands restraint and drama in equal measure. The saffron risotto achieves rare textural perfection, balanced by caramelized scallops and crisp Parmigiano.',
      ar: 'يدرك مطبخ نوفا التوازن بين البساطة والفخامة. ريزوتو الزعفران يصل إلى قوام متقن يندر تكراره مع تحمير مثالي للاسكالوب.',
    },
    rating: 5,
  },
  {
    id: 'rev-3',
    author: { en: 'Tariq Haddad', ar: 'طارق حداد' },
    role: { en: 'Private Event Host', ar: 'منظّم فعاليات خاصة' },
    dishOrdered: { en: 'Valrhona Molten Fondant', ar: 'فوندان الشوكولاتة السائلة' },
    quote: {
      en: 'We hosted an intimate anniversary dinner here and ordered the tasting progression. The smoked saffron elixir and warm molten fondant ended the evening on pure theatre.',
      ar: 'احتفلنا بعشاء خاص هنا وكانت التجربة استثنائية من البداية للنهاية. إكسير الزعفران المدخن وفوندان الشوكولاتة كانا ختاماً مسرحياً مبهراً.',
    },
    rating: 5,
  },
];
