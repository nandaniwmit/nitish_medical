import { Testimonial, FAQ, ServiceItem, MedicineCategory, HealthTip, Offer, GalleryItem } from './types';

export const BUSINESS_INFO = {
  name: 'Nitish Medical',
  tagline: 'Your Trusted Medical Store for Genuine Medicines & Healthcare Needs',
  phone: '8409052410',
  phoneFormatted: '+91 84090 52410',
  whatsapp: '918409052410',
  email: 'nitishmedicaltekari@gmail.com',
  location: 'WRRV+V5G, Khachiya Rd, Tekari, Bihar 824236',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.1119565532583!2d84.8322!3d25.0454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2d1ab36aaaaab%3A0xc682f6fbfb2671cf!2sTekari%2C%20Bihar%20824236!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  googleMapsDirectionsUrl: 'https://maps.google.com/?q=Nitish+Medical+Khachiya+Rd+Tekari+Bihar+824236',
  hours: {
    weekdays: '8:00 AM - 10:00 PM',
    sunday: '8:00 AM - 8:00 PM',
    emergency: '24/7 Emergency Support via Phone'
  },
  owner: {
    name: 'Nitish Kumar',
    designation: 'Proprietor & Lead Pharmacist',
    message: 'At Nitish Medical, our mission is to ensure that every resident of Tekari and its surrounding areas has immediate access to 100% genuine medicines and quality healthcare products. We understand that health issues can be stressful, which is why we offer personalized care, expert guidance, and easy order processing via WhatsApp. Your trust is our greatest asset, and we strive every day to maintain it by serving you with integrity and speed.'
  },
  deliveryInfo: {
    coverage: 'Tekari Town, Khachiya Road, and nearby villages within 5-10 km radius.',
    minimumOrder: '₹200 for free home delivery in Tekari town limits.',
    timing: 'Orders placed before 6:00 PM are delivered on the same day.'
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'prescription-medicines',
    title: 'Prescription Medicines',
    description: 'We stock a comprehensive range of critical prescription medications for chronic and acute conditions including cardiovascular, diabetes, respiratory, and neurological disorders.',
    iconName: 'FileText',
    features: ['100% genuine sourced directly from authorized distributors', 'Proper temperature-controlled storage (cold chain)', 'Pharmacist double-check verification']
  },
  {
    id: 'general-medicines',
    title: 'General & OTC Medicines',
    description: 'Over-the-counter essentials for pain relief, cold & cough, digestive health, allergies, fever, and general wellness needs.',
    iconName: 'Pills',
    features: ['Trusted international and national brands', 'Clear usage guidance by our staff', 'Always in stock daily requirements']
  },
  {
    id: 'health-supplements',
    title: 'Health & Nutrition Supplements',
    description: 'Boost your immunity, energy, and overall wellbeing with high-quality vitamins, minerals, protein supplements, and herbal products.',
    iconName: 'HeartPulse',
    features: ['Multivitamins for kids, adults & seniors', 'Calcium & Bone-health supplements', 'Whey proteins & nutritional shakes']
  },
  {
    id: 'baby-care',
    title: 'Baby & Mother Care',
    description: 'Care for your little ones with the gentlest baby food, infant formula, baby diapers, skin-friendly wipes, lotions, and maternal care essentials.',
    iconName: 'Baby',
    features: ['Top brands like Huggies, Pampers, Nestlé, Himalaya', 'Hypoallergenic baby toiletries', 'Feeding accessories and maternity pads']
  },
  {
    id: 'personal-care',
    title: 'Personal Care & Hygiene',
    description: 'Daily hygiene products including herbal and medical skin care, oral hygiene, hair care, sanitizers, and antiseptic solutions.',
    iconName: 'Smile',
    features: ['Dermatologist recommended skin creams', 'Premium body soaps and shampoos', 'Eco-friendly personal hygiene products']
  },
  {
    id: 'medical-equipment',
    title: 'Medical Devices & Equipment',
    description: 'Monitor your health parameters accurately at home with standard diagnostic equipment and orthopedic supports.',
    iconName: 'Activity',
    features: ['Digital Blood Pressure Monitors', 'Glucometers & Test Strips', 'Nebulizers, Thermometers & Pulse Oximeters']
  },
  {
    id: 'surgical-supplies',
    title: 'Surgical Items & Consumables',
    description: 'Surgical tapes, cotton rolls, sterile bandages, disposable syringes, gloves, catheters, and professional clinical supplies.',
    iconName: 'Scissors',
    features: ['Hospital-grade sterile packaging', 'Bulk availability for clinics', 'Reliable safety standards']
  },
  {
    id: 'first-aid-products',
    title: 'First Aid Supplies',
    description: 'Everything you need to handle minor emergencies at home, office, school, or while traveling.',
    iconName: 'ShieldPlus',
    features: ['Customized pre-packed first aid kits', 'Antiseptic ointments & sprays', 'Assorted band-aids and medical tapes']
  },
  {
    id: 'diabetic-care',
    title: 'Diabetic Care Management',
    description: 'Specialized products for diabetes monitoring, diabetic footwear, sugar-free nutrition, and direct insulin syringe requirements.',
    iconName: 'Droplet',
    features: ['Insulin storage and cooler pouches', 'Sugar substitutes and diabetic snacks', 'Continuous blood glucose tracking supplies']
  },
  {
    id: 'healthcare-essentials',
    title: 'Healthcare Essentials',
    description: 'Comprehensive supporting products including home care masks, orthopedic belts, hot water bags, and adult diapers.',
    iconName: 'Sparkles',
    features: ['Ankle, knee & wrist braces', 'Spinal support belts', 'Adult pulls-ups and underpads']
  }
];

export const FEATURED_CATEGORIES: MedicineCategory[] = [
  {
    id: 'tablets',
    name: 'Tablets',
    description: 'Oral dosage medications for various treatments, meticulously organized and stored.',
    iconName: 'Pills',
    popularItems: ['Paracetamol (Dolo 650)', 'Pantocid 40', 'Amoxyclav 625', 'Montair LC', 'Atorvas 10', 'Metformin 500'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'capsules',
    name: 'Capsules',
    description: 'Gelatin or soft-gel formulations of antibiotic, multi-vitamin, and gastro-resistant drugs.',
    iconName: 'Orbit',
    popularItems: ['Becosules Plus', 'Rabeprazole (Razo-D)', 'Omeprazole (Omez)', 'Amoxicillin 500mg', 'Vitamin D3 (Calcirol)'],
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'syrups',
    name: 'Syrups & Liquids',
    description: 'Liquid remedies for pediatric care, coughs, digestive enzymes, and calcium supplements.',
    iconName: 'FlaskConical',
    popularItems: ['Ascoril LS Syrup', 'Benadryl Cough Formula', 'Cremaffin Liquid', 'Aristozyme', 'Zincovit Syrup'],
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'injection',
    name: 'Injections & Vials',
    description: 'Sterile injectable formulations, vaccines, and insulin cartridges kept in strict cold-chain.',
    iconName: 'Syringe',
    popularItems: ['Monocef 1g', 'Lantus Insulin Solostar', 'Human Mixtard 30/70', 'Dynapar AQ', 'Voveran Injection'],
    imageUrl: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'equipment',
    name: 'Medical Equipment',
    description: 'Reliable healthcare devices for clinical accuracy at your fingertips.',
    iconName: 'HeartPulse',
    popularItems: ['Omron BP Monitor', 'Accu-Chek Active Glucometer', 'Dr Trust Nebulizer', 'Pulse Oximeter', 'Digital Thermometer'],
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'diabetic',
    name: 'Diabetic Care',
    description: 'Special insulin syrups, lancets, testing strips, and diabetic foot accessories.',
    iconName: 'Droplet',
    popularItems: ['Accu-Chek Test Strips', 'OneTouch Verio Strips', 'Diabetic Protein Powder', 'Insulin Syringes (BD Ultra-Fine)'],
    imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Kumar Singh',
    role: 'Local Resident, Tekari',
    rating: 5,
    comment: 'Nitish Medical has been our family pharmacy for 2 years now. Excellent availability of medicines. If any special drug is unavailable, Nitish-ji arranges it from Gaya within 24 hours. Ordering via WhatsApp is incredibly helpful!',
    date: 'June 12, 2026',
    avatar: '👨'
  },
  {
    id: '2',
    name: 'Dr. Akhilesh Sharma',
    role: 'General Physician, Tekari Clinic',
    rating: 5,
    comment: 'I highly recommend Nitish Medical to all my patients because they only sell 100% genuine medicines from top pharmaceutical brands. Their staff is extremely experienced, polite, and they carefully check the prescription before dispensing.',
    date: 'May 28, 2026',
    avatar: '👨‍⚕️'
  },
  {
    id: '3',
    name: 'Priyanka Kumari',
    role: 'Home Maker, Khachiya Road',
    rating: 5,
    comment: 'They have a fantastic baby care section. I get everything from diapers, baby formula, to Himalaya baby lotions in one place. Their rates are very reasonable, and they always give genuine bills with discounts.',
    date: 'July 02, 2026',
    avatar: '👩'
  },
  {
    id: '4',
    name: 'Manoj Prasad',
    role: 'Retired Teacher, Tekari',
    rating: 5,
    comment: 'Since I am a diabetic, I require blood sugar test strips and insulin regularly. Nitish Medical stores my insulin in a continuous cold chain refrigerator, and they offer home delivery which is a lifesaver for elderly people like me.',
    date: 'April 19, 2026',
    avatar: '👴'
  },
  {
    id: '5',
    name: 'Vikram Sen',
    role: 'Business Owner, Tekari Bazaar',
    rating: 5,
    comment: 'Very professional service. I just send my grandmother\'s hand-written doctor prescription on WhatsApp, and they double-check the items and keep the package ready. Fast payment options via UPI (PhonePe/GPay) are very convenient.',
    date: 'June 30, 2026',
    avatar: '👨'
  },
  {
    id: '6',
    name: 'Anjali Gupta',
    role: 'Nursing Student, Gaya Dist.',
    rating: 5,
    comment: 'I am always impressed by their surgical items and orthopedic supports range. Their store is clean, hygienic, and very well-organized. Nitish Medical is definitely the most trusted healthcare partner in the entire Tekari region.',
    date: 'May 10, 2026',
    avatar: '👩‍⚕️'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I place an order for medicines via WhatsApp?',
    answer: 'It is simple! Use our WhatsApp Order Form on the website, fill in your name, address, medicines required, and upload your doctor\'s prescription. Click "Send via WhatsApp", and it will format the details into a chat message which you can directly send to us on 8409052410. We will quickly review it and confirm availability.',
    category: 'Ordering'
  },
  {
    id: 'faq-2',
    question: 'Are all the medicines sold at Nitish Medical genuine?',
    answer: 'Yes, absolutely. We source 100% of our products directly from authorized company distributors and reputed stockists. We have strict quality checks and do not procure from unofficial open market channels. We provide standard tax invoices for every purchase.',
    category: 'Quality'
  },
  {
    id: 'faq-3',
    question: 'Do you require a doctor prescription to buy medicines?',
    answer: 'For Scheduled drugs, critical antibiotics, hormonal pills, and psychiatric medications, a valid doctor prescription is mandatory under Indian law. For standard over-the-counter (OTC) medicines, baby items, vitamins, and basic wellness products, no prescription is required.',
    category: 'Policy'
  },
  {
    id: 'faq-4',
    question: 'Do you offer home delivery in Tekari?',
    answer: 'Yes, we offer home delivery services across Tekari town (including Khachiya Road and nearby central localities) for orders above ₹200. For surrounding rural villages, we can arrange delivery or keep your parcel packed and ready for quick pickup.',
    category: 'Delivery'
  },
  {
    id: 'faq-5',
    question: 'What are the payment methods accepted at your store?',
    answer: 'We accept Cash, UPI (GPay, PhonePe, Paytm, BHIM), and all major Credit/Debit Cards at our counter. For home delivery, you can easily pay digitally via UPI after receiving the medicines.',
    category: 'Payment'
  },
  {
    id: 'faq-6',
    question: 'What are the store operating hours?',
    answer: 'We are open from 8:00 AM to 10:00 PM on Monday through Saturday, and from 8:00 AM to 8:00 PM on Sundays. For late-night absolute medical emergencies, you can call us directly on 8409052410.',
    category: 'Hours'
  },
  {
    id: 'faq-7',
    question: 'Can I return or exchange unused medicines?',
    answer: 'Yes, unopened strips/bottles of medicines in original condition with full batch number and expiry date visible can be returned or exchanged within 7 days of purchase, along with the original bill. Please note that refrigerated products (like insulin/vaccines) and surgical items cannot be returned due to safety protocols.',
    category: 'Policy'
  },
  {
    id: 'faq-8',
    question: 'How do you store sensitive medicines like Insulin?',
    answer: 'We maintain professional medical refrigerators with continuous power backup. This ensures that vaccines, insulin, hormone injections, and liquid syrups are stored strictly within the recommended 2°C to 8°C range (the cold chain is never broken).',
    category: 'Quality'
  },
  {
    id: 'faq-9',
    question: 'Do you have a pharmacist available to consult on dosage?',
    answer: 'Yes, our proprietor Nitish Kumar is a qualified, registered pharmacist. He or our experienced medical staff is always present at the store to explain dosage instructions, potential side effects, and correct storage methods for your prescribed medication.',
    category: 'Consultation'
  },
  {
    id: 'faq-10',
    question: 'Do you provide diagnostic equipment like BP monitors or sugar test devices?',
    answer: 'Yes, we keep high-precision diagnostic devices such as Omron Blood Pressure Monitors, Accu-Chek & OneTouch Sugar Glucometers, digital thermometers, vaporizers, and orthopedic support braces in stock with manufacturer warranties.',
    category: 'Equipment'
  }
];

export const OFFERS: Offer[] = [
  {
    id: 'offer-1',
    title: 'First Aid Package Discount',
    description: 'Get a fully loaded Premium First Aid Box with essential antiseptic creams, bandages, and burn ointments.',
    code: 'FIRSTAID10',
    discount: '10% OFF',
    expiry: 'Aug 31, 2026'
  },
  {
    id: 'offer-2',
    title: 'Senior Citizen Care',
    description: 'Special permanent discount on monthly chronic illness prescriptions (Diabetes, BP, Thyroid) for elderly citizens.',
    code: 'SENIORCARE15',
    discount: 'Up to 15% OFF',
    expiry: 'Ongoing Benefit'
  },
  {
    id: 'offer-3',
    title: 'Baby Hygiene Bundle',
    description: 'Buy Pampers/Huggies Diaper packs combined with Baby Wipes and get an instant discount on Himalaya Baby powder.',
    code: 'BABYCARE20',
    discount: '₹100 Cashback',
    expiry: 'Sept 15, 2026'
  }
];

export const HEALTH_TIPS: HealthTip[] = [
  {
    id: 'tip-1',
    title: 'The Correct Way to Store Insulin & Vaccines at Home',
    category: 'Medication Safety',
    summary: 'Many patients make mistakes when storing insulin at home. Learn why freezing insulin is dangerous and how to store it safely.',
    content: 'Insulin is a protein-based hormone that becomes completely ineffective if frozen or exposed to high temperatures. Always store unopened insulin cartridges or vials in the middle shelf of your household refrigerator (2°C - 8°C). NEVER put insulin in the freezer compartment. Once you open a vial, it can be kept at comfortable room temperature (below 30°C) for up to 28 days. Keep it away from direct sunlight and electronic devices that generate heat.',
    date: 'July 10, 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tip-2',
    title: 'Understanding & Controlling Diabetes: 5 Habits That Help',
    category: 'Chronic Wellness',
    summary: 'Simple, effective daily guidelines to manage blood glucose levels alongside your regular prescribed medication.',
    content: '1. Monitor Regularly: Keep a digital glucometer handy and check fasting and post-prandial levels weekly. 2. Fiber-Rich Diet: Include green leafy vegetables and whole grains, while strictly avoiding refined carbs and sweet juices. 3. Active Walk: A 30-minute brisk walk after meals helps insulin sensitivity. 4. Medication Compliance: Never skip your Metformin or insulin doses without consulting your doctor. 5. Stay Hydrated: Water helps kidneys flush out excess sugar naturally.',
    date: 'June 25, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tip-3',
    title: 'Monsoon Healthcare: Preventing Waterborne Infections',
    category: 'Seasonal Care',
    summary: 'How to safeguard your family from seasonal fever, malaria, typhoid, and dengue during the rainy season in Bihar.',
    content: 'The rainy season brings a high risk of infections. To protect yourself: 1. Drink strictly boiled or filtered water. 2. Clear stagnated water around your house to prevent Aedes mosquito breeding. 3. Keep high-grade mosquito repellents and nets active. 4. Maintain a robust multi-vitamin intake to boost immunity. 5. Keep a standard first-aid kit containing fever tablets and ORS sachets handy for immediate rehydration.',
    date: 'July 15, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=600&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Nitish Medical Store Front',
    category: 'store',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    description: 'Our beautifully lit, highly visible storefront located in the heart of Tekari, Bihar.'
  },
  {
    id: 'gal-2',
    title: 'Surgical and Consumables Rack',
    category: 'equipment',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description: 'Sterile hospital-grade bandage rolls, catheters, surgical gloves, and syringes.'
  },
  {
    id: 'gal-3',
    title: 'Organized Prescription Medicine Racks',
    category: 'medicines',
    imageUrl: 'https://images.unsplash.com/photo-1626275217606-e6cc21fa3117?auto=format&fit=crop&w=800&q=80',
    description: 'Systematically cataloged tablets and capsules organized alphabetically for quick retrieval.'
  },
  {
    id: 'gal-4',
    title: 'Diagnostic Home Care Monitors',
    category: 'equipment',
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80',
    description: 'FDA-approved Digital Blood Pressure Monitors and Glucometers with strip boxes.'
  },
  {
    id: 'gal-5',
    title: 'Baby Nutrition & Mother Care Products',
    category: 'products',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&q=80',
    description: 'Genuine baby milk powders, cereals, mild lotions, diapers, and maternal accessories.'
  },
  {
    id: 'gal-6',
    title: 'Personal Skincare & Medicated Creams',
    category: 'products',
    imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80',
    description: 'Dermatologist-recommended skin moisturizers, antiseptic powders, and hygiene washes.'
  }
];

export const TIMELINE = [
  { year: '2022', title: 'The Genesis', description: 'Nitish Medical opened on Khachiya Road, Tekari with a focus on delivering 100% genuine medicines.' },
  { year: '2023', title: 'Cold-Chain & Devices', description: 'Installed state-of-the-art medical refrigerators to ensure uninterrupted vaccine and insulin preservation.' },
  { year: '2024', title: 'Local Outreach Program', description: 'Partnered with regional doctors to distribute free first-aid kits and health awareness guidebooks.' },
  { year: '2025', title: 'Digital Ordering Launched', description: 'Pioneered rapid prescription upload and home delivery services over WhatsApp, serving rural Tekari areas.' },
  { year: '2026', title: 'The Trust Landmark', description: 'Named as Tekari\'s most reliable and responsive medical store with over 5000+ happy returning customers.' }
];

export const BUSINESS_VALUES = [
  { title: 'Genuine Medicines Only', description: 'We have a zero-tolerance policy for substandard or grey-market medications. Every single tablet is fully authenticated.', icon: 'CheckCircle' },
  { title: 'Community Care', description: 'We treat our customers like family. Patient safety, proper advice on schedules, and genuine empathy define our service.', icon: 'Users' },
  { title: 'Affordable Rates', description: 'We maintain very reasonable pricing and regular discounts on bulk/monthly prescriptions because healthcare is a basic right.', icon: 'Tag' },
  { title: 'Unyielding Professionalism', description: 'Guided by qualified pharmacists, we verify prescriptions carefully, monitor storage parameters, and label everything cleanly.', icon: 'ShieldCheck' }
];
