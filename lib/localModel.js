// Nilai — Adaptive Constitutional Intelligence Engine v2
// A self-adapting local model that handles ANY situation by:
//   1. Semantic understanding — word expansion, synonyms, concept mapping
//   2. Dynamic RAG — flexible retrieval that finds constitutional connections in any topic
//   3. Situation reasoning — analyzes the human situation, not just keywords
//   4. Adaptive response — builds responses dynamically from knowledge, not templates
//   5. Concept graph — links constitutional ideas to real-life domains
//   6. Conversation memory — multi-turn coherence with context carry-over
//
// No external APIs, no training, no GPU — runs on Node.js

// ═══════════════════════════════════════════════════════════════
// SECTION 1: SEMANTIC WORD EXPANSION ENGINE
// Maps everyday language to constitutional concepts
// ═══════════════════════════════════════════════════════════════

const WORD_UNIVERSE = {
  // Each key is a "concept cluster" — any of these words activates the cluster
  // This lets the model understand situations it was never explicitly programmed for

  personal_liberty: {
    words: ['arrest', 'detained', 'custody', 'jail', 'prison', 'locked', 'confined', 'kidnap', 'abduct', 'missing', 'disappear', 'bail', 'remand', 'handcuff', 'beat', 'torture', 'encounter', 'police', 'cop', 'constable', 'inspector', 'fir', 'complaint', 'station', 'lockup', 'interrogat', 'question', 'force', 'confess', 'witness'],
    constitutional: ['Article 21 — Right to Life and Personal Liberty', 'Article 22 — Protection against arrest and detention', 'Article 20 — Protection against self-incrimination and double jeopardy'],
    domain: 'Criminal Justice & Personal Liberty'
  },

  equality_discrimination: {
    words: ['equal', 'unequal', 'discriminat', 'bias', 'unfair', 'caste', 'religion', 'gender', 'race', 'sex', 'colour', 'birth', 'origin', 'untouchab', 'dalit', 'tribal', 'adivasi', 'backward', 'minority', 'majority', 'privilege', 'exclude', 'reject', 'deny', 'refuse', 'favour', 'prefer', 'quota', 'reservation', 'merit', 'category', 'obc', 'ews', 'sc', 'st', 'general'],
    constitutional: ['Article 14 — Equality before law', 'Article 15 — Prohibition of discrimination', 'Article 16 — Equal opportunity in employment', 'Article 17 — Abolition of Untouchability'],
    domain: 'Equality & Non-Discrimination'
  },

  speech_expression: {
    words: ['speech', 'speak', 'say', 'voice', 'express', 'opinion', 'view', 'disagree', 'criticize', 'protest', 'rally', 'march', 'dharna', 'strike', 'bandh', 'demonstrate', 'slogan', 'poster', 'pamphlet', 'blog', 'post', 'tweet', 'social media', 'press', 'media', 'newspaper', 'journalist', 'reporter', 'editor', 'censor', 'ban', 'block', 'silence', 'suppress', 'sedition', 'defam', 'cartoon', 'satire', 'art', 'film', 'book', 'write', 'publish'],
    constitutional: ['Article 19(1)(a) — Freedom of Speech and Expression', 'Article 19(2) — Reasonable Restrictions'],
    domain: 'Freedom of Speech & Expression'
  },

  life_dignity: {
    words: ['life', 'death', 'die', 'kill', 'alive', 'survive', 'dignity', 'respect', 'honour', 'humiliat', 'degrad', 'insult', 'abuse', 'mental health', 'suicide', 'depress', 'stress', 'trauma', 'health', 'hospital', 'doctor', 'medicine', 'treatment', 'disease', 'disability', 'disabled', 'handicap', 'blind', 'deaf', 'shelter', 'homeless', 'sleep', 'food', 'hunger', 'starv', 'water', 'drink', 'sanitat', 'toilet', 'clean', 'pollut', 'air', 'noise', 'environment', 'livelihood', 'poverty', 'poor', 'destitute'],
    constitutional: ['Article 21 — Right to Life and Personal Liberty (expanded by Supreme Court to include dignity, health, shelter, food, clean environment, livelihood, privacy, fair trial, and more)'],
    domain: 'Right to Life & Human Dignity'
  },

  privacy_surveillance: {
    words: ['privacy', 'private', 'personal', 'data', 'information', 'aadhaar', 'biometric', 'camera', 'cctv', 'surveillance', 'monitor', 'track', 'spy', 'tap', 'phone', 'internet', 'online', 'hack', 'leak', 'expose', 'photo', 'video', 'record', 'consent', 'share', 'publish', 'intimate', 'revenge porn', 'doxx', 'identity', 'profile'],
    constitutional: ['Article 21 — Right to Privacy (Puttaswamy judgment, 2017)'],
    domain: 'Privacy & Data Protection'
  },

  women_gender: {
    words: ['woman', 'women', 'girl', 'female', 'wife', 'mother', 'daughter', 'sister', 'bride', 'widow', 'pregnant', 'pregnanc', 'maternity', 'period', 'menstruat', 'dowry', 'domestic', 'violence', 'abuse', 'harass', 'stalk', 'molest', 'rape', 'assault', 'eve teas', 'posh', 'workplace', 'glass ceiling', 'pay gap', 'divorce', 'maintenance', 'alimony', 'custody', 'child support', 'remarr', 'honour kill', 'sati', 'triple talaq', 'nikah', 'halala', 'patriarchy', 'misogyn', 'sexis'],
    constitutional: ['Article 14 — Equality before law', 'Article 15(3) — Special provisions for women', 'Article 21 — Right to dignity', 'Article 39(d) — Equal pay for equal work', 'Article 42 — Maternity relief'],
    domain: "Women's Rights & Gender Justice"
  },

  children_youth: {
    words: ['child', 'children', 'kid', 'boy', 'girl', 'minor', 'infant', 'baby', 'teenage', 'adolescent', 'juvenile', 'student', 'orphan', 'adoption', 'foster', 'child labour', 'child marriage', 'pocso', 'abuse', 'molest', 'trafficking', 'begg', 'school', 'dropout', 'corporal punishment', 'bully', 'ragging', 'underage', 'age', 'young'],
    constitutional: ['Article 21A — Right to Free and Compulsory Education (age 6-14)', 'Article 24 — Prohibition of child labour', 'Article 39(e)(f) — Protection of children', 'Article 15(3) — Special provisions for children'],
    domain: "Children's Rights & Protection"
  },

  education_knowledge: {
    words: ['education', 'school', 'college', 'university', 'institute', 'teacher', 'professor', 'student', 'learn', 'study', 'exam', 'degree', 'diploma', 'scholarship', 'fee', 'tuition', 'admission', 'seat', 'merit', 'rte', 'mid-day meal', 'literacy', 'skill', 'training', 'vocational', 'coaching', 'library', 'syllabus', 'curriculum', 'board', 'cbse', 'icse', 'ugc'],
    constitutional: ['Article 21A — Right to Education', 'Article 29 — Protection of minorities\' educational interests', 'Article 30 — Minority educational institutions', 'Article 45 — Early childhood care'],
    domain: 'Education & Learning'
  },

  work_employment: {
    words: ['work', 'job', 'employ', 'hire', 'fire', 'fired', 'terminat', 'dismiss', 'suspend', 'transfer', 'promot', 'demot', 'salary', 'wage', 'pay', 'bonus', 'overtime', 'leave', 'holiday', 'retire', 'pension', 'pf', 'provident', 'esi', 'gratuity', 'contract', 'permanent', 'temporary', 'casual', 'daily wage', 'labour', 'factory', 'office', 'company', 'employer', 'boss', 'manager', 'hr', 'union', 'strike', 'lockout', 'layoff', 'retrench', 'outsource', 'intern', 'apprentice', 'gig', 'freelance', 'startup', 'business', 'trade', 'profession', 'occupation', 'livelihood'],
    constitutional: ['Article 19(1)(g) — Right to practice any profession', 'Article 21 — Right to livelihood', 'Article 23 — Prohibition of forced labour', 'Article 39 — Equal pay, adequate livelihood', 'Article 41 — Right to work', 'Article 42 — Just conditions of work', 'Article 43 — Living wage'],
    domain: "Employment & Workers' Rights"
  },

  property_housing: {
    words: ['property', 'house', 'home', 'flat', 'apartment', 'room', 'land', 'plot', 'farm', 'field', 'acre', 'hectare', 'tenant', 'landlord', 'rent', 'lease', 'evict', 'encroach', 'trespass', 'demolish', 'bulldoze', 'acquire', 'compensat', 'market value', 'registry', 'deed', 'title', 'ownership', 'inherit', 'will', 'succession', 'partition', 'ancestral', 'joint family', 'huf', 'mortgage', 'loan', 'bank', 'builder', 'rera', 'construction', 'illegal', 'unauthor', 'slum', 'jhuggi', 'settlement'],
    constitutional: ['Article 300A — Right to Property (no deprivation except by law)', 'Article 21 — Right to shelter (Supreme Court interpretation)', 'Article 39(b) — Material resources for common good'],
    domain: 'Property & Housing Rights'
  },

  religion_faith: {
    words: ['religion', 'religious', 'faith', 'belief', 'god', 'temple', 'mosque', 'church', 'gurudwara', 'synagogue', 'pray', 'prayer', 'worship', 'ritual', 'hindu', 'muslim', 'christian', 'sikh', 'buddhist', 'jain', 'parsi', 'atheist', 'agnostic', 'convert', 'conversion', 'missionary', 'preach', 'propagat', 'hijab', 'turban', 'tilak', 'halal', 'beef', 'ramadan', 'diwali', 'christmas', 'eid', 'gurpurab', 'sect', 'denomination', 'scripture', 'personal law', 'sharia', 'ucc', 'uniform civil code', 'secular', 'communal'],
    constitutional: ['Article 25 — Freedom of conscience and religion', 'Article 26 — Freedom to manage religious affairs', 'Article 27 — No tax for promotion of religion', 'Article 28 — Religious instruction in educational institutions'],
    domain: 'Freedom of Religion & Secularism'
  },

  movement_residence: {
    words: ['travel', 'move', 'relocat', 'migrate', 'immigrat', 'emigrat', 'passport', 'visa', 'border', 'check', 'blockade', 'curfew', 'lockdown', 'restrict', 'confine', 'domicile', 'resident', 'settle', 'native', 'outsider', 'local', 'inner line permit', 'ilp', 'afspa'],
    constitutional: ['Article 19(1)(d) — Right to move freely', 'Article 19(1)(e) — Right to reside and settle anywhere in India'],
    domain: 'Freedom of Movement & Residence'
  },

  association_assembly: {
    words: ['association', 'union', 'club', 'society', 'ngo', 'foundation', 'trust', 'cooperative', 'assembly', 'gather', 'meet', 'meeting', 'peaceful', 'organize', 'party', 'political', 'member', 'join', 'form', 'register', 'fcra', 'foreign fund'],
    constitutional: ['Article 19(1)(b) — Right to assemble peaceably', 'Article 19(1)(c) — Right to form associations or unions'],
    domain: 'Freedom of Association & Assembly'
  },

  consumer_market: {
    words: ['consumer', 'buy', 'purchase', 'product', 'goods', 'service', 'defect', 'faulty', 'broken', 'refund', 'return', 'exchange', 'warranty', 'guarantee', 'complain', 'cheat', 'fraud', 'scam', 'mislead', 'advertis', 'online', 'ecommerce', 'delivery', 'amazon', 'flipkart', 'bill', 'invoice', 'overcharg', 'mrf', 'duplicate', 'fake', 'counterfeit', 'food safety', 'adulterat', 'expir', 'quality'],
    constitutional: ['Article 21 — Right to quality goods and services (SC interpretation)', 'Consumer Protection Act, 2019'],
    domain: 'Consumer Rights & Protection'
  },

  environment_nature: {
    words: ['environment', 'pollution', 'pollut', 'clean', 'air', 'water', 'river', 'lake', 'ocean', 'sea', 'forest', 'tree', 'deforest', 'wildlife', 'animal', 'species', 'climate', 'global warming', 'carbon', 'emission', 'waste', 'garbage', 'dump', 'toxic', 'chemical', 'factory', 'industry', 'noise', 'mining', 'sand', 'quarry', 'ecosystem', 'biodiversity', 'ngt', 'green tribunal'],
    constitutional: ['Article 21 — Right to clean environment (SC interpretation)', 'Article 48A — Protection of environment', 'Article 51A(g) — Duty to protect natural environment'],
    domain: 'Environmental Protection'
  },

  governance_corruption: {
    words: ['government', 'govern', 'administrat', 'bureaucra', 'officer', 'official', 'minister', 'politician', 'mla', 'councillor', 'corporator', 'corrupt', 'bribe', 'kickback', 'scam', 'scandal', 'misuse', 'abuse of power', 'nepotism', 'favouritism', 'rti', 'transparency', 'accountab', 'audit', 'cag', 'lokpal', 'lokayukta', 'ombudsman', 'whistleblow', 'vigilance', 'cbi', 'raid', 'investigation'],
    constitutional: ['Article 19(1)(a) — Right to Information (SC interpretation)', 'Article 311 — Safeguards for civil servants', 'RTI Act, 2005'],
    domain: 'Governance, Transparency & Anti-Corruption'
  },

  election_democracy: {
    words: ['election', 'vote', 'voting', 'ballot', 'evm', 'candidate', 'contest', 'campaign', 'party', 'political', 'democrat', 'republic', 'represent', 'constituency', 'ward', 'booth', 'polling', 'manifesto', 'promise', 'ticket', 'nomination', 'disqualif', 'defect', 'anti-defection', 'coalition', 'majority', 'opposition', 'speaker', 'whip'],
    constitutional: ['Article 324 — Election Commission', 'Article 325-329 — Elections', 'Representation of the People Act'],
    domain: 'Elections & Democracy'
  },

  federalism_governance: {
    words: ['federal', 'centre', 'central', 'governor', 'chief minister', 'prime minister', 'president', 'cabinet', 'council', 'parliament', 'legislature', 'assembly', 'rajya sabha', 'lok sabha', 'vidhan sabha', 'ordinance', 'gazette', 'notification', 'legislation', 'concurrent', 'union list', 'state list', 'residuary', 'seventh schedule', 'panchayat', 'municipality', 'local body', 'gram sabha', 'district', 'collector', 'commissioner'],
    constitutional: ['Articles 245-263 — Distribution of Legislative Powers', 'Seventh Schedule — Union, State, Concurrent Lists', 'Articles 243-243ZG — Panchayats and Municipalities'],
    domain: 'Federalism & Governance Structure'
  },

  judiciary_justice: {
    words: ['court', 'judge', 'justice', 'lawyer', 'advocate', 'attorney', 'legal', 'judicial', 'bench', 'hearing', 'trial', 'verdict', 'judgment', 'order', 'decree', 'appeal', 'revision', 'review', 'stay', 'injunction', 'interim', 'bail', 'writ', 'habeas corpus', 'mandamus', 'certiorari', 'prohibition', 'quo warranto', 'pil', 'public interest', 'contempt', 'suo motu', 'amicus curiae', 'supreme court', 'high court', 'district court', 'magistrate', 'tribunal', 'arbitrat', 'mediat', 'lok adalat', 'legal aid', 'free lawyer', 'pro bono'],
    constitutional: ['Article 32 — Supreme Court writs', 'Article 226 — High Court writs', 'Article 39A — Free legal aid', 'Article 141 — SC law binding on all courts'],
    domain: 'Judiciary & Access to Justice'
  },

  emergency_security: {
    words: ['emergency', 'war', 'attack', 'terrorism', 'terror', 'bomb', 'blast', 'security', 'national security', 'threat', 'afspa', 'martial law', 'curfew', 'shoot', 'force', 'army', 'military', 'paramilitary', 'crpf', 'bsf', 'nsg', 'nsa', 'uapa', 'sedition', 'treason', 'preventive detention', 'national investigation'],
    constitutional: ['Article 352 — National Emergency', 'Article 356 — President\'s Rule', 'Article 360 — Financial Emergency', 'Article 358-359 — Suspension of rights during emergency'],
    domain: 'Emergency Powers & National Security'
  },

  healthcare_medical: {
    words: ['health', 'medical', 'hospital', 'clinic', 'doctor', 'nurse', 'patient', 'treatment', 'surgery', 'operation', 'medicine', 'drug', 'pharmacy', 'prescription', 'disease', 'illness', 'sick', 'infection', 'covid', 'pandemic', 'vaccine', 'immuniz', 'mental health', 'psychiatr', 'psycholog', 'therap', 'rehabilitation', 'disability', 'insurance', 'ayushman', 'blood', 'organ', 'transplant', 'ambulance', 'emergency', 'negligence', 'malpractice'],
    constitutional: ['Article 21 — Right to health (SC interpretation)', 'Article 41 — Right to public assistance in sickness', 'Article 42 — Just and humane conditions of work'],
    domain: 'Healthcare & Medical Rights'
  },

  digital_technology: {
    words: ['internet', 'online', 'digital', 'website', 'app', 'mobile', 'computer', 'laptop', 'software', 'technology', 'cyber', 'hacking', 'phishing', 'malware', 'virus', 'troll', 'bully', 'cyberbully', 'misinformat', 'fake news', 'deepfake', 'ai', 'artificial intelligence', 'algorithm', 'automat', 'robot', 'drone', 'cryptocurrency', 'blockchain', 'digital payment', 'upi', 'aadhar', 'aadhaar', 'e-governance', 'digital india'],
    constitutional: ['Article 19(1)(a) — Freedom of expression online', 'Article 21 — Right to access internet (Kerala HC)', 'IT Act, 2000 — Cyber offences and digital rights'],
    domain: 'Digital Rights & Technology'
  },

  marriage_family: {
    words: ['marriage', 'marry', 'wedding', 'spouse', 'husband', 'wife', 'partner', 'live-in', 'cohabit', 'divorce', 'separation', 'annul', 'bigamy', 'polygamy', 'polyandry', 'inter-caste', 'inter-religion', 'love marriage', 'arranged marriage', 'age of marriage', 'child marriage', 'consent', 'family', 'joint family', 'in-laws', 'domestic', 'cruelty', 'maintenance', 'alimony', 'child custody', 'visitation', 'adoption', 'surrogacy', 'inherit', 'succession', 'will', 'testament', 'lgbtq', 'same-sex', 'homosexual', 'lesbian', 'gay', 'bisexual', 'transgender', 'queer', 'non-binary', 'gender identity', 'sexual orientation'],
    constitutional: ['Article 21 — Right to marry (personal choice)', 'Article 14 — Equality before law in family matters', 'Special Marriage Act, 1954', 'Navtej Johar judgment (2018) — LGBTQ+ rights'],
    domain: 'Marriage, Family & Personal Law'
  },

  citizenship_identity: {
    words: ['citizen', 'citizenship', 'national', 'foreigner', 'alien', 'refugee', 'asylum', 'stateless', 'passport', 'visa', 'deportat', 'nrc', 'caa', 'npr', 'oci', 'pio', 'immigrant', 'emigrant', 'domicile', 'resident', 'birth certificate', 'identity', 'id card', 'voter id', 'aadhaar'],
    constitutional: ['Articles 5-11 — Citizenship', 'Citizenship Act, 1955', 'CAA 2019'],
    domain: 'Citizenship & Identity'
  },

  death_penalty_punishment: {
    words: ['death penalty', 'capital punishment', 'hang', 'execution', 'life imprisonment', 'sentence', 'punishment', 'fine', 'imprison', 'conviction', 'convict', 'guilty', 'acquit', 'pardon', 'clemency', 'mercy petition', 'commute', 'reprieve', 'parole', 'probation', 'remission'],
    constitutional: ['Article 72 — Presidential pardon', 'Article 21 — Right to life', 'Article 20 — Protection against excessive punishment'],
    domain: 'Criminal Punishment & Clemency'
  },

  // ═══════ NEW CRIMINAL LAWS (2023-2024) ═══════
  new_criminal_laws: {
    words: ['bns', 'bharatiya nyaya sanhita', 'bnss', 'bharatiya nagarik suraksha sanhita', 'bsa', 'bharatiya sakshya adhiniyam', 'new ipc', 'new crpc', 'new evidence act', 'ipc replacement', 'crpc replacement', 'criminal law 2023', 'criminal law 2024', 'mob lynching', 'community service', 'zero fir', 'organized crime', 'terrorism', 'hit and run', 'electronic evidence', 'digital evidence', 'videography', 'section 103', 'section 152', 'section 4 bns', 'new criminal code', 'july 2024'],
    constitutional: ['Bharatiya Nyaya Sanhita (BNS), 2023 — Replaces Indian Penal Code', 'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 — Replaces CrPC', 'Bharatiya Sakshya Adhiniyam (BSA), 2023 — Replaces Indian Evidence Act', 'Article 21 — Right to Life and Liberty'],
    domain: 'New Criminal Laws (BNS/BNSS/BSA)'
  },

  // ═══════ DATA PROTECTION ═══════
  data_protection: {
    words: ['dpdp', 'data protection', 'personal data', 'data principal', 'data fiduciary', 'consent', 'data breach', 'privacy', 'digital personal data', 'data processing', 'right to erasure', 'right to correction', 'data protection board', 'grievance', 'children data', 'parental consent', 'tracking', 'behavioural monitoring', 'targeted advertising', 'reasonable security', 'data penalty', 'data fine', 'rs 250 crore', 'dpdp act'],
    constitutional: ['Digital Personal Data Protection Act, 2023', 'Article 21 — Right to Privacy (Puttaswamy judgment)', 'Article 19(1)(a) — Freedom of speech and information'],
    domain: 'Digital Personal Data Protection'
  },

  // ═══════ STATE GOVERNANCE ═══════
  state_governance: {
    words: ['governor', 'chief minister', 'state government', 'state assembly', 'vidhan sabha', 'vidhan parishad', 'legislative assembly', 'legislative council', 'state cabinet', 'state legislature', 'mla', 'mlc', 'state bill', 'state law', 'state subject', 'state list', 'chief secretary', 'district collector', 'tehsildar', 'block development', 'gram panchayat', 'zila parishad', 'sarpanch', 'pradhan', 'municipal corporation', 'nagar palika', 'mayor', 'councillor', 'urban local body', 'rural', 'village'],
    constitutional: ['Articles 152-237 — State Executive and Legislature', 'Article 163-164 — Governor\'s powers and Chief Minister', 'Articles 243-243ZG — Panchayats and Municipalities', 'Seventh Schedule — State List'],
    domain: 'State Governance & Local Bodies'
  },

  // ═══════ PARLIAMENTARY PROCEDURE ═══════
  parliamentary_procedure: {
    words: ['parliament', 'lok sabha', 'rajya sabha', 'bill', 'budget', 'session', 'adjournment', 'prorogation', 'dissolution', 'question hour', 'zero hour', 'calling attention', 'no confidence', 'money bill', 'finance bill', 'ordinance', 'joint session', 'speaker', 'deputy speaker', 'chairman', 'whip', 'privilege', 'committee', 'standing committee', 'select committee', 'public accounts', 'estimates committee', 'opposition', 'leader of opposition', 'floor test', 'voice vote', 'division', 'guillotine'],
    constitutional: ['Articles 79-122 — Parliament', 'Article 107-111 — Legislative Procedure', 'Article 112-116 — Budget/Finance', 'Article 123 — Ordinance Power'],
    domain: 'Parliamentary Process & Legislation'
  },

  // ═══════ FISCAL & FINANCE ═══════
  fiscal_finance: {
    words: ['tax', 'taxation', 'gst', 'income tax', 'customs', 'excise', 'cess', 'surcharge', 'finance commission', 'consolidated fund', 'contingency fund', 'public account', 'cag', 'comptroller', 'auditor', 'audit', 'fiscal deficit', 'budget', 'appropriation', 'grants', 'revenue', 'expenditure', 'allocation', 'devolution', 'tax sharing', 'fiscal responsibility', 'niti aayog', 'planning', 'five year plan'],
    constitutional: ['Articles 264-300A — Finance, Property, Contracts', 'Article 280 — Finance Commission', 'Article 148-151 — CAG', 'Article 112 — Annual Financial Statement'],
    domain: 'Public Finance & Taxation'
  },

  // ═══════ TERRITORY & REORGANIZATION ═══════
  territory_reorganization: {
    words: ['new state', 'formation of state', 'reorganization', 'bifurcation', 'merger', 'territory', 'union territory', 'boundary', 'area', 'delimitation', 'statehood', 'full state', 'special status', 'special category', 'article 370', 'jammu', 'kashmir', 'ladakh', 'telangana', 'andhra', 'northeast', 'tribal area', 'scheduled area', 'fifth schedule', 'sixth schedule', 'autonomous district', 'autonomous council', 'inner line permit'],
    constitutional: ['Articles 1-4 — Union and Territory', 'Article 3 — Formation/alteration of States', 'Articles 239-241 — Union Territories', 'Fifth Schedule — Scheduled Areas', 'Sixth Schedule — Tribal Areas'],
    domain: 'Territory, States & Reorganization'
  },

  // ═══════ TRIBUNALS & COMMISSIONS ═══════
  tribunals_commissions: {
    words: ['tribunal', 'cat', 'central administrative tribunal', 'nclt', 'nclat', 'ngt', 'green tribunal', 'itat', 'armed forces tribunal', 'rera tribunal', 'consumer commission', 'national commission', 'state commission', 'human rights commission', 'nhrc', 'shrc', 'information commission', 'cic', 'sic', 'women commission', 'ncw', 'child rights', 'ncpcr', 'scpcr', 'minorities commission', 'backward classes', 'upsc', 'spsc', 'finance commission', 'election commission', 'eci', 'delimitation commission', 'law commission'],
    constitutional: ['Article 323A-323B — Tribunals', 'Article 324 — Election Commission', 'Article 148 — CAG', 'Article 315-323 — Public Service Commissions', 'Article 280 — Finance Commission'],
    domain: 'Tribunals & Constitutional Bodies'
  },

  // ═══════ OFFICIAL LANGUAGE ═══════
  official_language: {
    words: ['hindi', 'official language', 'regional language', 'mother tongue', 'language', 'linguistic', 'linguistic minority', 'eighth schedule', 'devanagari', 'english', 'state language', 'language commission', 'three language formula', 'medium of instruction', 'script', 'dialect', 'kannada', 'tamil', 'telugu', 'malayalam', 'bengali', 'marathi', 'gujarati', 'punjabi', 'urdu', 'odia', 'assamese'],
    constitutional: ['Articles 343-351 — Official Language', 'Article 29 — Linguistic Minority Rights', 'Article 350A — Mother tongue instruction', 'Article 350B — Special Officer for linguistic minorities', 'Eighth Schedule — 22 scheduled languages'],
    domain: 'Official Language & Linguistic Rights'
  },

  // ═══════ SITUATION DETECTION ═══════
  situation_response: {
    words: ['situation', 'scenario', 'what if', 'what should', 'what can', 'what do', 'happened', 'happening', 'help me', 'advise', 'advice', 'guide', 'facing', 'problem', 'issue', 'trouble', 'stuck', 'victim', 'someone', 'my friend', 'my family', 'my neighbour', 'my boss', 'my landlord', 'my employer', 'suppose', 'imagine', 'let say', 'hypothetical', 'example', 'case', 'real life', 'practical', 'everyday', 'daily life', 'common man', 'ordinary citizen'],
    constitutional: ['The Constitution protects every citizen in every life situation — from fundamental rights to directive principles to statutory remedies'],
    domain: 'Situation-Based Constitutional Guidance'
  }
};

// ═══════════════════════════════════════════════════════════════
// SECTION 2: CONCEPT GRAPH — Links between constitutional ideas
// ═══════════════════════════════════════════════════════════════

const CONCEPT_LINKS = {
  personal_liberty: ['life_dignity', 'judiciary_justice', 'death_penalty_punishment'],
  equality_discrimination: ['women_gender', 'children_youth', 'education_knowledge', 'work_employment', 'religion_faith'],
  speech_expression: ['digital_technology', 'governance_corruption', 'election_democracy'],
  life_dignity: ['healthcare_medical', 'environment_nature', 'property_housing', 'personal_liberty', 'privacy_surveillance'],
  privacy_surveillance: ['digital_technology', 'life_dignity'],
  women_gender: ['equality_discrimination', 'work_employment', 'marriage_family', 'personal_liberty', 'children_youth'],
  children_youth: ['education_knowledge', 'work_employment', 'women_gender'],
  education_knowledge: ['children_youth', 'equality_discrimination'],
  work_employment: ['equality_discrimination', 'women_gender', 'life_dignity'],
  property_housing: ['life_dignity', 'governance_corruption', 'federalism_governance'],
  religion_faith: ['equality_discrimination', 'speech_expression', 'marriage_family'],
  movement_residence: ['personal_liberty', 'citizenship_identity'],
  association_assembly: ['speech_expression', 'work_employment', 'election_democracy'],
  consumer_market: ['life_dignity', 'governance_corruption'],
  environment_nature: ['life_dignity', 'governance_corruption', 'property_housing'],
  governance_corruption: ['election_democracy', 'judiciary_justice', 'federalism_governance'],
  election_democracy: ['governance_corruption', 'speech_expression', 'federalism_governance'],
  federalism_governance: ['governance_corruption', 'election_democracy'],
  judiciary_justice: ['personal_liberty', 'life_dignity'],
  emergency_security: ['personal_liberty', 'speech_expression', 'federalism_governance'],
  healthcare_medical: ['life_dignity', 'women_gender', 'children_youth'],
  digital_technology: ['speech_expression', 'privacy_surveillance', 'consumer_market'],
  marriage_family: ['women_gender', 'religion_faith', 'children_youth', 'equality_discrimination'],
  citizenship_identity: ['movement_residence', 'equality_discrimination', 'election_democracy'],
  death_penalty_punishment: ['personal_liberty', 'judiciary_justice', 'life_dignity'],
  new_criminal_laws: ['personal_liberty', 'death_penalty_punishment', 'judiciary_justice', 'women_gender', 'digital_technology'],
  data_protection: ['privacy_surveillance', 'digital_technology', 'consumer_market', 'children_youth'],
  state_governance: ['federalism_governance', 'election_democracy', 'governance_corruption', 'territory_reorganization'],
  parliamentary_procedure: ['federalism_governance', 'election_democracy', 'governance_corruption', 'fiscal_finance'],
  fiscal_finance: ['governance_corruption', 'parliamentary_procedure', 'federalism_governance', 'property_housing'],
  territory_reorganization: ['federalism_governance', 'state_governance', 'citizenship_identity', 'movement_residence'],
  tribunals_commissions: ['judiciary_justice', 'governance_corruption', 'work_employment', 'environment_nature'],
  official_language: ['education_knowledge', 'equality_discrimination', 'state_governance', 'territory_reorganization'],
  situation_response: ['personal_liberty', 'life_dignity', 'equality_discrimination', 'women_gender', 'work_employment', 'property_housing', 'consumer_market', 'judiciary_justice']
};


// ═══════════════════════════════════════════════════════════════
// SECTION 3: ADAPTIVE QUERY UNDERSTANDING
// ═══════════════════════════════════════════════════════════════

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);
}

const CASE_PATTERNS_SIMPLE = [
  /kesav?ananda/i, /maneka/i, /vishak?a/i, /puttaswamy/i, /navtej/i,
  /bommai/i, /golak/i, /minerva/i, /sawhney/i, /shayara/i
];

// ═══════════════════════════════════════════════════════════════
// SITUATION CONTEXT DETECTION
// Understands WHAT the user is actually describing — crime, rights query,
// legal procedure, etc. — so the model responds to the SITUATION, not keywords
// ═══════════════════════════════════════════════════════════════

const SITUATION_PATTERNS = [
  // Criminal offenses — someone committing/facing crime
  {
    id: 'crime_violence',
    patterns: [/kill|murder|stab|shoot|attack|assault|beat|hit|punch|injur|wound|hurt someone|violence against/i],
    context: 'criminal_offense',
    primaryConcepts: ['personal_liberty', 'death_penalty_punishment', 'new_criminal_laws'],
    suppressConcepts: ['privacy_surveillance', 'data_protection', 'digital_technology', 'consumer_market'],
    directResponse: 'This involves a serious criminal offence under Indian law.',
    relevantLaw: 'BNS Section 103 (Murder) — Punishment: Death or life imprisonment + fine. BNS Section 115 (Voluntarily causing hurt) — Punishment up to 1 year or fine or both. If someone is killed or attacked, immediately call Police: 100. File FIR at the nearest police station.'
  },
  {
    id: 'crime_theft',
    patterns: [/steal|stole|stolen|theft|rob|robbery|burgl|loot|snatch|pickpocket|shoplifting/i],
    context: 'criminal_offense',
    primaryConcepts: ['personal_liberty', 'new_criminal_laws'],
    suppressConcepts: ['privacy_surveillance', 'data_protection', 'women_gender'],
    directResponse: 'This involves a criminal offence of theft/robbery under Indian law.',
    relevantLaw: 'BNS Section 303 (Theft) — Punishment up to 3 years + fine. BNS Section 309 (Robbery) — Punishment up to 10 years + fine. BNS Section 310 (Dacoity) — Punishment up to life imprisonment. File FIR immediately at nearest police station. Call Police: 100.'
  },
  {
    id: 'crime_sexual',
    patterns: [/rape|molest|sexual assault|sexual abuse|grope|outr?age.*modesty|indecen/i],
    context: 'criminal_offense',
    primaryConcepts: ['women_gender', 'personal_liberty', 'new_criminal_laws', 'children_youth'],
    suppressConcepts: ['data_protection', 'consumer_market', 'fiscal_finance'],
    directResponse: 'This involves a serious sexual offence under Indian law.',
    relevantLaw: 'BNS Section 63-69 (Rape) — Punishment: 10 years to life imprisonment. If victim is a child — POCSO Act applies with stricter punishment. Call Police: 100. Women Helpline: 181. Childline: 1098. File FIR — police MUST register it (Lalita Kumari ruling).'
  },
  {
    id: 'crime_fraud',
    patterns: [/fraud|cheat|cheated|forgery|forge|counterfeit|impersonat|identity theft|swindl|embezzl|ponzi|scam/i],
    context: 'criminal_offense',
    primaryConcepts: ['consumer_market', 'personal_liberty', 'new_criminal_laws'],
    suppressConcepts: ['women_gender', 'religion_faith', 'environment_nature'],
    directResponse: 'This involves a criminal offence of fraud/cheating under Indian law.',
    relevantLaw: 'BNS Section 318 (Cheating) — Punishment up to 3 years + fine. BNS Section 336 (Forgery) — Punishment up to 2 years + fine. For cyber fraud — IT Act Section 66D. File FIR and also report at cybercrime.gov.in or call 1930.'
  },
  {
    id: 'crime_kidnap',
    patterns: [/kidnap|abduct|missing person|missing child|taken away|hostage|ransom|traffick/i],
    context: 'criminal_offense',
    primaryConcepts: ['personal_liberty', 'children_youth', 'new_criminal_laws'],
    suppressConcepts: ['data_protection', 'consumer_market', 'fiscal_finance'],
    directResponse: 'This involves a serious criminal offence under Indian law.',
    relevantLaw: 'BNS Section 137 (Kidnapping) — Punishment up to 7 years + fine. BNS Section 140 (Kidnapping for ransom) — Punishment: Death or life imprisonment. Call Police: 100 IMMEDIATELY. For missing child: Childline 1098 or trackthemissingchild.gov.in.'
  },
  {
    id: 'crime_drug',
    patterns: [/drug|narcotic|ndps|ganja|cannabis|cocaine|heroin|smuggl|contraband|illegal substance/i],
    context: 'criminal_offense',
    primaryConcepts: ['personal_liberty', 'new_criminal_laws'],
    suppressConcepts: ['women_gender', 'education_knowledge', 'consumer_market'],
    directResponse: 'This involves offences under the NDPS Act (Narcotic Drugs and Psychotropic Substances Act, 1985).',
    relevantLaw: 'NDPS Act — For small quantity: up to 1 year or fine. Commercial quantity: 10-20 years + fine up to Rs 2 lakh. Consumption: up to 1 year for first offence. Bail is restricted for commercial quantities. Call Police: 100.'
  },
  // Accident/compensation scenarios
  {
    id: 'accident',
    patterns: [/accident|hit and run|road accident|car crash|vehicle|ran over|collid|crash/i],
    context: 'accident_compensation',
    primaryConcepts: ['personal_liberty', 'new_criminal_laws', 'life_dignity'],
    suppressConcepts: ['data_protection', 'religion_faith', 'official_language'],
    directResponse: 'Road accidents involve both criminal liability and compensation rights.',
    relevantLaw: 'BNS Section 106 (Death by negligence) — up to 5 years. Hit and run — BNS Section 106(2) — up to 10 years. Motor Vehicles Act — right to compensation through Motor Accident Claims Tribunal (MACT). Call ambulance: 108. Police: 100. File FIR.'
  },
  // Domestic/family violence
  {
    id: 'domestic_violence',
    patterns: [/husband beat|wife beat|domestic violence|dowry demand|in-laws harass|cruelty by|marital rape|burn|acid attack/i],
    context: 'domestic_offense',
    primaryConcepts: ['women_gender', 'personal_liberty', 'marriage_family'],
    suppressConcepts: ['data_protection', 'fiscal_finance', 'parliamentary_procedure'],
    directResponse: 'This involves domestic violence which is both a criminal offence and a civil wrong.',
    relevantLaw: 'Protection of Women from Domestic Violence Act, 2005 — right to protection order, residence order, monetary relief. BNS Section 85-86 (Cruelty by husband/relatives). Dowry Prohibition Act. Call Women Helpline: 181. One Stop Centre (Sakhi) for immediate shelter.'
  },
  // Corruption/bribery
  {
    id: 'corruption',
    patterns: [/bribe|bribery|asked for money|demanded money|under the table|speed money|corruption|kickback/i],
    context: 'corruption_offense',
    primaryConcepts: ['governance_corruption', 'personal_liberty'],
    suppressConcepts: ['women_gender', 'children_youth', 'religion_faith'],
    directResponse: 'Demanding or accepting bribes is a criminal offence under the Prevention of Corruption Act.',
    relevantLaw: 'Prevention of Corruption Act, 1988 — Punishment: 3-7 years + fine. Giving bribe is also an offence (Section 8). Report to: Lokpal (central), Lokayukta (state), CBI Anti-Corruption: 1800-11-0031, or Vigilance department.'
  },
  // Cyber crime
  {
    id: 'cyber_crime',
    patterns: [/hacked|phishing|online fraud|cyber.*crime|catfish|morphed photo|deepfake|revenge porn|blackmail online|sextortion/i],
    context: 'cyber_offense',
    primaryConcepts: ['digital_technology', 'privacy_surveillance', 'personal_liberty'],
    suppressConcepts: ['religion_faith', 'environment_nature', 'fiscal_finance'],
    directResponse: 'This involves a cyber crime offence under the IT Act and BNS.',
    relevantLaw: 'IT Act Section 66 (Computer offences) — up to 3 years. IT Act Section 66E (Privacy violation) — up to 3 years. IT Act Section 67 (Obscene content) — up to 5 years. Report at: cybercrime.gov.in or call 1930. File FIR at cyber police station.'
  }
];

function detectSituationContext(queryLower, tokens) {
  for (const situation of SITUATION_PATTERNS) {
    for (const pattern of situation.patterns) {
      if (pattern.test(queryLower)) {
        return situation;
      }
    }
  }
  return null;
}

function reweightConceptsByContext(concepts, situationContext) {
  if (!situationContext) return concepts;
  
  return concepts.map(concept => {
    let adjustedScore = concept.score;
    
    // Boost concepts that match the situation
    if (situationContext.primaryConcepts.includes(concept.key)) {
      adjustedScore = concept.score * 3 + 20; // strong boost
    }
    
    // Suppress irrelevant concepts
    if (situationContext.suppressConcepts.includes(concept.key)) {
      adjustedScore = Math.max(0, concept.score * 0.1); // near-zero
    }
    
    return { ...concept, score: adjustedScore };
  }).filter(c => c.score > 0);
}

function analyzeQuery(query) {
  const tokens = tokenize(query);
  const queryLower = query.toLowerCase();

  const result = {
    tokens,
    concepts: [],
    constitutionalValues: [],
    domains: [],
    linkedConcepts: [],
    articleMentions: [],
    caseMentions: [],
    intent: detectIntent(query, tokens),
    sentiment: detectSentiment(query, tokens),
    isGreeting: false,
    isConstitutional: false,
    queryType: 'general',
    urgency: 'normal',
    situationContext: null  // NEW: tracks the actual situation being described
  };

  // NEW: Detect specific situation context FIRST — this guides everything else
  result.situationContext = detectSituationContext(queryLower, tokens);

  // Semantic concept matching — score each cluster
  for (const [conceptKey, cluster] of Object.entries(WORD_UNIVERSE)) {
    let score = 0;
    const matchedWords = [];

    for (const word of cluster.words) {
      for (const token of tokens) {
        const isSubstringMatch = (token.length >= 4 && word.includes(token)) ||
                                  (word.length >= 4 && token.includes(word));
        const isExactMatch = token === word;

        if (isExactMatch || isSubstringMatch) {
          score += 3;
          matchedWords.push(word);
          break;
        }
      }
      if (word.includes(' ') && queryLower.includes(word)) {
        score += 5;
        if (!matchedWords.includes(word)) matchedWords.push(word);
      }
    }

    if (score > 0) {
      result.concepts.push({ key: conceptKey, score, matchedWords, constitutional: cluster.constitutional, domain: cluster.domain });
    }
  }

  // NEW: Reweight concepts based on situation context
  if (result.situationContext) {
    result.concepts = reweightConceptsByContext(result.concepts, result.situationContext);
  }

  result.concepts.sort((a, b) => b.score - a.score);

  for (const concept of result.concepts) {
    result.constitutionalValues.push(...concept.constitutional);
    result.domains.push(concept.domain);
  }

  // Concept graph expansion
  const primaryConcepts = result.concepts.slice(0, 3).map(c => c.key);
  const linked = new Set();
  for (const pc of primaryConcepts) {
    for (const l of (CONCEPT_LINKS[pc] || [])) {
      if (!primaryConcepts.includes(l)) linked.add(l);
    }
  }
  result.linkedConcepts = [...linked];

  // Article extraction
  const artMatches = query.matchAll(/article\s*(\d+[a-z]?)/gi);
  for (const m of artMatches) result.articleMentions.push(m[1]);

  // Case extraction
  const CASE_PATTERNS = [
    { pattern: /kesav?ananda/i, name: 'Kesavananda Bharati v. State of Kerala (1973)' },
    { pattern: /maneka\s*gandhi/i, name: 'Maneka Gandhi v. Union of India (1978)' },
    { pattern: /vishak?a/i, name: 'Vishaka v. State of Rajasthan (1997)' },
    { pattern: /puttaswamy/i, name: 'Justice K.S. Puttaswamy v. Union of India (2017)' },
    { pattern: /navtej/i, name: 'Navtej Singh Johar v. Union of India (2018)' },
    { pattern: /bommai/i, name: 'S.R. Bommai v. Union of India (1994)' },
    { pattern: /golak\s*nath/i, name: 'Golaknath v. State of Punjab (1967)' },
    { pattern: /minerva/i, name: 'Minerva Mills v. Union of India (1980)' },
    { pattern: /indra\s*sawhney|mandal/i, name: 'Indra Sawhney v. Union of India (1992)' },
    { pattern: /shayara|triple\s*talaq/i, name: 'Shayara Bano v. Union of India (2017)' },
    { pattern: /mc?\s*mehta/i, name: 'M.C. Mehta v. Union of India' },
    { pattern: /lalita\s*kumari/i, name: 'Lalita Kumari v. Govt of UP (2014)' },
    { pattern: /basic\s*structure/i, name: 'Basic Structure Doctrine (Kesavananda Bharati, 1973)' },
    { pattern: /bandhua\s*mukti/i, name: 'Bandhua Mukti Morcha v. Union of India (1984)' },
  ];
  for (const { pattern, name } of CASE_PATTERNS) {
    if (pattern.test(query)) result.caseMentions.push(name);
  }

  // Classification
  result.isGreeting = result.intent === 'greeting';
  result.isConstitutional = result.concepts.length > 0 || result.articleMentions.length > 0 || result.caseMentions.length > 0 || result.intent !== 'greeting';

  if (/my |i am|i was|i have|someone|they |he |she |we /i.test(query)) {
    result.queryType = 'personal';
  } else if (/how to|where to|whom to|what should|steps|process|procedure|file|approach/i.test(query)) {
    result.queryType = 'procedural';
  } else if (/explain|what is|what are|define|describe|history|meaning|difference|compare/i.test(query)) {
    result.queryType = 'academic';
  } else if (/can |is it|does |do |are |will |should /i.test(query)) {
    result.queryType = 'situational';
  }

  if (/urgent|emergency|immediate|help|sos|asap|right now|today|arrested|beaten|threat|danger/i.test(query)) {
    result.urgency = 'urgent';
  } else if (/curious|interest|learn|study|understand|general|academic/i.test(query)) {
    result.urgency = 'educational';
  }

  result.constitutionalValues = [...new Set(result.constitutionalValues)];
  result.domains = [...new Set(result.domains)];

  return result;
}

function detectIntent(query, tokens) {
  const q = query.toLowerCase();
  if (/^(hi|hello|hey|namaste|vanakkam|namaskar|good\s*(morning|afternoon|evening|day)|howdy|sup)\b/i.test(query)) return 'greeting';
  if (/^(who|what)\s+(are|is)\s+(you|nilai|this)/i.test(query)) return 'greeting';
  if (/article\s*\d/i.test(query)) return 'article_lookup';
  if (/case|judgment|verdict|ruling|v\.\s/i.test(query) || CASE_PATTERNS_SIMPLE.some(p => p.test(query))) return 'case_inquiry';
  if (/how\s+(to|can|do|should)|where\s+(to|can|do|should)|whom|steps|process|procedure|file/i.test(query)) return 'procedure';
  if (/what\s+(is|are|does|do|was|were)|explain|define|describe|meaning|difference|compare/i.test(query)) return 'explanation';
  if (/can\s+(i|they|we|he|she|my|the)|is\s+it\s+(legal|constitutional|allowed|permitted|valid|possible)|am\s+i\s+(entitled|allowed|eligible)/i.test(query)) return 'rights_check';
  if (/my\s+|i\s+(am|was|have|had|got)|someone\s|they\s+(are|were|have|did)/i.test(query)) return 'situation';
  if (/list|types|categories|how\s+many|enumerate/i.test(query)) return 'enumeration';
  if (/why\s+(is|are|was|were|do|does|did|should)/i.test(query)) return 'reasoning';
  return 'general';
}

function detectSentiment(query, tokens) {
  const distressWords = ['help', 'scared', 'afraid', 'fear', 'worried', 'anxious', 'desperate', 'hopeless', 'danger', 'threat', 'hurt', 'pain', 'suffer', 'crisis', 'emergency', 'urgent', 'please', 'trapped', 'helpless', 'confused', 'lost', 'frustrated', 'angry', 'unfair', 'unjust', 'violated', 'abused'];
  const curiousWords = ['curious', 'interested', 'learn', 'study', 'understand', 'wonder', 'know'];
  let distress = 0, curious = 0;
  for (const t of tokens) {
    if (distressWords.some(w => t.includes(w))) distress++;
    if (curiousWords.some(w => t.includes(w))) curious++;
  }
  if (distress > 1) return 'distressed';
  if (curious > 0) return 'curious';
  return 'neutral';
}


// ═══════════════════════════════════════════════════════════════
// SECTION 4: ADAPTIVE RESPONSE GENERATOR
// ═══════════════════════════════════════════════════════════════

function generateGreeting(query) {
  const isWhoAreYou = /who|what|your name|about you/i.test(query);

  if (isWhoAreYou) {
    return `<thinking>
The user wants to know about Nilai. I should introduce myself with clear purpose.
</thinking>

<alignment>
Constitutional Education · Public Empowerment · Access to Justice
</alignment>

<response>
Namaste! I am **Nilai** (நிலை) — your Constitutional Intelligence companion. My name comes from Tamil and means "State of Being" — the alignment of Body, Mind, and Action.

I help every Indian understand how the Constitution applies to their real-life situations. I can assist with any situation — whether it involves your rights at work, with the police, in education, healthcare, property, family matters, online life, or anything else.

I am not a lawyer, but I can:
• Explain which constitutional rights protect you in ANY situation
• Help you understand relevant Articles, laws, and Supreme Court judgments
• Guide you through procedures — how to file complaints, PILs, RTIs
• Empower you with concrete steps to assert your rights

Every situation has a constitutional dimension. Tell me what you are facing, and I will find the constitutional connection.

*"We, the people of India… secure to all citizens Justice, Liberty, Equality and Fraternity"*
</response>

<provisions>
• The Constitution of India (1950) — 448 Articles, 25 Parts, 12 Schedules — the supreme law of the land
• Part III — Fundamental Rights (Articles 12-35) enforceable through courts
• Part IV — Directive Principles that guide all government policy
• Article 32 — "Heart and Soul" of the Constitution (Dr. B.R. Ambedkar)
</provisions>

<empowerment>
• Ask me ANYTHING — about arrest, workplace issues, discrimination, property, education, healthcare, family law, digital rights, consumer complaints, environmental concerns, elections, or any other situation
• Describe your real-life situation and I will identify the constitutional protections that apply
• I adapt to your needs — whether you need urgent help, want to learn, or are fighting for your rights
• Every person in India is protected by the Constitution — let me help you discover how.
</empowerment>`;
  }

  return `<thinking>
The user is greeting me. I should welcome them and show I can handle any situation.
</thinking>

<alignment>
Constitutional Education · Democratic Engagement · Citizen Empowerment
</alignment>

<response>
Namaste. Welcome to **Nilai** (நிலை) — your Constitutional Intelligence companion.

I am here to help you understand how the Indian Constitution protects you in any situation — whether it's about your job, police encounters, discrimination, property, education, healthcare, family, online rights, consumer issues, or anything else in your daily life.

What situation or question can I help you with today?
</response>

<provisions>
• The Constitution of India — protecting every aspect of your life
• Part III — Fundamental Rights for every person in India
</provisions>

<empowerment>
Try describing any situation:
• "My employer fired me without notice"
• "The hospital refused to treat my mother"
• "Someone posted my photos online without consent"
• "My village doesn't have clean drinking water"
• "I want to file an RTI about road construction funds"

Or ask about any constitutional topic — I adapt to your needs.
</empowerment>`;
}


function generateAdaptiveResponse(query, analysis, ragResults, conversationHistory) {
  const thinking = buildAdaptiveThinking(query, analysis, ragResults, conversationHistory);
  const alignment = buildAdaptiveAlignment(analysis, ragResults);
  const response = buildAdaptiveResponseBody(query, analysis, ragResults, conversationHistory);
  const provisions = buildAdaptiveProvisions(analysis, ragResults);
  const empowerment = buildAdaptiveEmpowerment(query, analysis, ragResults);

  return `<thinking>
${thinking}
</thinking>

<alignment>
${alignment}
</alignment>

<response>
${response}
</response>

<provisions>
${provisions}
</provisions>

<empowerment>
${empowerment}
</empowerment>`;
}


function buildAdaptiveThinking(query, analysis, ragResults, history) {
  const lines = [];
  lines.push(`User Query: "${query}"`);
  lines.push(`Query Type: ${analysis.queryType} | Intent: ${analysis.intent} | Sentiment: ${analysis.sentiment} | Urgency: ${analysis.urgency}`);
  lines.push('');

  lines.push('Step 1 — UNDERSTAND: Analyzing the human situation');
  if (analysis.concepts.length > 0) {
    lines.push(`  Concepts detected: ${analysis.concepts.slice(0, 4).map(c => `${c.domain} (confidence: ${c.score})`).join(', ')}`);
    const allMatched = analysis.concepts.slice(0, 3).flatMap(c => c.matchedWords.slice(0, 3));
    lines.push(`  Key words: ${[...new Set(allMatched)].join(', ')}`);
  } else {
    lines.push('  No strong concept match — analyzing broadly using constitutional principles.');
  }
  lines.push('');

  lines.push('Step 2 — MAP: Identifying constitutional dimensions');
  if (analysis.constitutionalValues.length > 0) {
    for (const v of analysis.constitutionalValues.slice(0, 5)) lines.push(`  • ${v}`);
  }
  if (analysis.linkedConcepts.length > 0) {
    lines.push(`  Related areas: ${analysis.linkedConcepts.slice(0, 3).map(l => WORD_UNIVERSE[l]?.domain || l).join(', ')}`);
  }
  lines.push('');

  lines.push('Step 3 — RETRIEVE: Searching constitutional knowledge base');
  if (ragResults.length > 0) {
    lines.push(`  Found ${ragResults.length} relevant provisions:`);
    for (const r of ragResults.slice(0, 4)) lines.push(`  • ${r.title} (relevance: ${r.score})`);
  } else {
    lines.push('  No exact provisions found — reasoning from constitutional principles and concept graph.');
  }
  lines.push('');

  if (analysis.articleMentions.length > 0 || analysis.caseMentions.length > 0) {
    lines.push('Step 4 — REFERENCE: Specific entities mentioned');
    if (analysis.articleMentions.length > 0) lines.push(`  Articles: ${analysis.articleMentions.map(a => `Article ${a}`).join(', ')}`);
    if (analysis.caseMentions.length > 0) lines.push(`  Cases: ${analysis.caseMentions.join(', ')}`);
    lines.push('');
  }

  lines.push('Step 5 — RESPOND: Crafting personalized, actionable guidance');
  if (history && history.length > 2) lines.push('  (Building on ongoing conversation context)');

  return lines.join('\n');
}


function buildAdaptiveAlignment(analysis, ragResults) {
  const values = [];
  for (const c of analysis.concepts.slice(0, 3)) values.push(...c.constitutional.slice(0, 2));
  for (const r of ragResults.slice(0, 3)) {
    if (r.category && !values.some(v => v.includes(r.category))) values.push(r.category);
  }
  if (values.length === 0) values.push('Constitutional Education', 'Citizen Empowerment', 'Access to Justice');
  return [...new Set(values)].slice(0, 5).join(' · ');
}


function buildAdaptiveResponseBody(query, analysis, ragResults, conversationHistory) {
  const lines = [];
  const sc = analysis.situationContext;

  // === SITUATION-SPECIFIC PATH: Direct, relevant answer ===
  if (sc) {
    // 1. Direct situation response (opening)
    lines.push(sc.directResponse);
    lines.push('');

    // 2. Relevant law content — the most important part
    lines.push('**Applicable Law**');
    lines.push('');
    lines.push(sc.relevantLaw);
    lines.push('');

    // 3. Only include RAG results that are truly relevant to this situation
    if (ragResults.length > 0) {
      const filtered = filterAndRankResults(ragResults, analysis);
      const situationRelevant = filtered.filter(r => {
        const rLower = (r.text + ' ' + r.title + ' ' + (r.category || '')).toLowerCase();
        // Check if the result actually mentions keywords from the situation
        return sc.primaryConcepts.some(pc => {
          const cluster = WORD_UNIVERSE[pc];
          if (!cluster) return false;
          return cluster.words.some(w => rLower.includes(w.toLowerCase()));
        });
      });
      if (situationRelevant.length > 0) {
        lines.push('**Constitutional Provisions**');
        lines.push('');
        for (const passage of situationRelevant.slice(0, 2)) {
          lines.push(generatePassageContent(query, passage, analysis));
          lines.push('');
        }
      }
    }

    // 4. Constitutional connection (abbreviated for situations)
    if (analysis.concepts.length > 0) {
      const topConcept = analysis.concepts[0];
      if (topConcept && topConcept.constitutional.length > 0) {
        lines.push('**Key Constitutional Protections**');
        lines.push('');
        for (const art of topConcept.constitutional.slice(0, 3)) {
          lines.push(`- ${art}`);
        }
        lines.push('');
      }
    }

    return lines.join('\n').trim();
  }

  // === GENERAL PATH: Standard response flow ===

  // 1. Adaptive opening
  lines.push(generateAdaptiveOpening(query, analysis));
  lines.push('');

  // 2. Constitutional connection
  if (analysis.concepts.length > 0) {
    lines.push(generateConstitutionalConnection(query, analysis));
    lines.push('');
  }

  // 3. Knowledge from RAG
  if (ragResults.length > 0) {
    const relevantResults = filterAndRankResults(ragResults, analysis);
    for (const passage of relevantResults.slice(0, 4)) {
      lines.push(generatePassageContent(query, passage, analysis));
      lines.push('');
    }
  }

  // 4. Concept-graph insights for gaps
  if (ragResults.length < 2 && analysis.linkedConcepts.length > 0) {
    lines.push(generateLinkedInsights(analysis));
    lines.push('');
  }

  // 5. Conversation continuity
  if (conversationHistory && conversationHistory.length > 2) {
    lines.push('Building on our conversation, I want to ensure you have a complete understanding of your constitutional position in this matter.');
    lines.push('');
  }

  return lines.join('\n').trim();
}


function generateAdaptiveOpening(query, analysis) {
  const { sentiment, urgency, queryType, concepts, intent, situationContext } = analysis;

  // NEW: If a specific situation was detected, use its direct response
  if (situationContext) {
    return situationContext.directResponse;
  }

  if (urgency === 'urgent') {
    const domain = concepts[0]?.domain || 'this situation';
    return `This sounds urgent, and I want you to know — the Constitution of India protects you in ${domain}. Let me quickly explain your rights and what you can do right now.`;
  }

  if (sentiment === 'distressed') {
    const domain = concepts[0]?.domain || 'situations like yours';
    return `I understand this is a difficult and stressful situation. Please know that the Constitution provides clear protections for ${domain}, and there are concrete steps you can take. You are not alone — let me walk you through your rights.`;
  }

  if (queryType === 'personal') {
    if (concepts.length > 0) {
      return `Thank you for sharing your situation with me. This touches on ${concepts.slice(0, 2).map(c => c.domain).join(' and ')}, and the Constitution has important protections that apply here. Let me explain.`;
    }
    return 'Thank you for sharing your situation. Let me analyze the constitutional dimensions and explain your rights.';
  }

  if (queryType === 'procedural' || intent === 'procedure') {
    return 'Knowing the right steps is crucial for asserting your rights. Let me guide you through the constitutional framework and practical procedure.';
  }

  if (queryType === 'academic' || intent === 'explanation') {
    if (analysis.articleMentions.length > 0) {
      return `Let me explain Article ${analysis.articleMentions[0]} in clear terms — what it says, how the Supreme Court has interpreted it, and how it works in practice.`;
    }
    if (analysis.caseMentions.length > 0) {
      return 'That is a landmark case that has profoundly shaped Indian constitutional law. Let me walk you through what the Court decided and why it matters.';
    }
    if (concepts.length > 0) {
      return `That is an important area of constitutional law. Let me explain how the Indian Constitution addresses ${concepts[0].domain} in clear, accessible terms.`;
    }
    return 'That is a great question. Let me explain what the Constitution says and how it works in practice.';
  }

  if (queryType === 'situational' || intent === 'rights_check') {
    if (concepts.length > 0) {
      return `This is an important question about ${concepts[0].domain}. The Constitution provides clear guidance — let me explain your position.`;
    }
    return 'The Constitution addresses this, and I want to make sure you understand your rights clearly. Here is what you need to know.';
  }

  if (concepts.length > 0) {
    return `Your question touches on ${concepts[0].domain}. The Indian Constitution has specific provisions that address this. Let me share what you need to know.`;
  }

  return 'That is a thoughtful question. Let me analyze the constitutional dimensions and share what the Constitution says about this.';
}


function generateConstitutionalConnection(query, analysis) {
  const topConcept = analysis.concepts[0];
  if (!topConcept) {
    return 'The Indian Constitution is a living document that touches every aspect of daily life. Even when a situation does not seem "constitutional" on the surface, the principles of Justice, Liberty, Equality, and Fraternity enshrined in the Preamble apply universally.';
  }

  let connection = `**Constitutional Connection: ${topConcept.domain}**\n\n`;
  connection += 'The Constitution of India directly addresses this area through key provisions:\n';
  for (const art of topConcept.constitutional.slice(0, 4)) {
    connection += `• ${art}\n`;
  }

  if (analysis.linkedConcepts.length > 0) {
    const linkedDomains = analysis.linkedConcepts.slice(0, 2).map(l => WORD_UNIVERSE[l]?.domain).filter(Boolean);
    if (linkedDomains.length > 0) {
      connection += `\nThis also connects to: ${linkedDomains.join(' and ')}.`;
    }
  }

  return connection;
}


function filterAndRankResults(ragResults, analysis) {
  if (ragResults.length === 0) return [];

  const sc = analysis.situationContext;

  const boosted = ragResults.map(r => {
    let bonus = 0;
    let penalty = 0;
    const rTextLower = (r.text + ' ' + r.title + ' ' + (r.category || '')).toLowerCase();

    // Standard keyword matching bonus
    for (const concept of analysis.concepts) {
      for (const word of concept.matchedWords) {
        if (rTextLower.includes(word.toLowerCase())) bonus += 2;
      }
    }

    // NEW: Situation-aware scoring
    if (sc) {
      // Boost results that match primary concepts of the situation
      for (const pc of sc.primaryConcepts) {
        const cluster = WORD_UNIVERSE[pc];
        if (cluster) {
          const matchCount = cluster.words.filter(w => rTextLower.includes(w.toLowerCase())).length;
          bonus += matchCount * 3;
        }
      }

      // Penalize results from suppressed concepts
      for (const sup of sc.suppressConcepts) {
        const cluster = WORD_UNIVERSE[sup];
        if (cluster) {
          const matchCount = cluster.words.filter(w => rTextLower.includes(w.toLowerCase())).length;
          if (matchCount > 0) penalty += 5;
        }
      }

      // Penalize landmark cases unless they are actually relevant to the situation
      const cat = (r.category || '').toLowerCase();
      if (cat.includes('landmark') || cat.includes('case')) {
        const isPrimarilyRelevant = sc.primaryConcepts.some(pc => {
          const cluster = WORD_UNIVERSE[pc];
          return cluster && cluster.words.some(w => rTextLower.includes(w.toLowerCase()));
        });
        if (!isPrimarilyRelevant) penalty += 10;
      }
    }

    return { ...r, adjustedScore: r.score + bonus - penalty };
  });

  boosted.sort((a, b) => b.adjustedScore - a.adjustedScore);
  const topScore = boosted[0].adjustedScore;
  const threshold = Math.max(topScore * 0.3, 3);
  const filtered = boosted.filter(r => r.adjustedScore >= threshold);
  return filtered.length > 0 ? filtered : [boosted[0]];
}


function generatePassageContent(query, passage, analysis) {
  const lines = [];
  lines.push(`**${passage.title}**`);
  lines.push('');

  const { queryType, intent } = analysis;

  if (queryType === 'academic' || intent === 'explanation' || intent === 'article_lookup') {
    lines.push(passage.text);
  } else if (queryType === 'personal' || queryType === 'situational') {
    const relevantText = extractRelevantSentences(passage.text, query, 4);
    lines.push(`In your situation, this is what matters: ${relevantText}`);
  } else if (queryType === 'procedural' || intent === 'procedure') {
    const actionText = extractRelevantSentences(passage.text, query, 3);
    lines.push(`Here is the relevant provision: ${actionText}`);
  } else {
    if (passage.text.length > 400) {
      lines.push(`In plain terms: ${extractRelevantSentences(passage.text, query, 3)}`);
    } else {
      lines.push(passage.text);
    }
  }

  lines.push('');
  const sig = getSignificance(passage.category);
  if (sig) lines.push(sig);

  return lines.join('\n').trim();
}


function extractRelevantSentences(text, query, maxSentences = 3) {
  const sentences = text.split(/\.\s+/).filter(s => s.length > 15);
  if (sentences.length <= maxSentences) return text;

  const queryTokens = tokenize(query);
  const scored = sentences.map((sentence, index) => {
    let score = 0;
    const sLower = sentence.toLowerCase();
    for (const token of queryTokens) {
      if (sLower.includes(token)) score += 2;
    }
    if (index === 0) score += 1;
    return { sentence, score, index };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, maxSentences).sort((a, b) => a.index - b.index);
  let result = top.map(s => s.sentence).join('. ');
  if (!result.endsWith('.')) result += '.';
  return result;
}


function getSignificance(category) {
  if (!category) return null;
  const cat = category.toLowerCase();
  if (cat.includes('fundamental right')) return 'This is a **Fundamental Right** — directly enforceable through courts (Article 226 / Article 32).';
  if (cat.includes('directive principle')) return 'This is a **Directive Principle** — guides government policy. Courts read these with Fundamental Rights to expand protections.';
  if (cat.includes('landmark case')) return 'This **landmark judgment** is binding law (Article 141). All courts must follow it.';
  if (cat.includes('emergency')) return '**Extraordinary powers** with strict constitutional safeguards against misuse.';
  if (cat.includes('amendment')) return 'This **Constitutional Amendment** shows how the Constitution evolves to expand rights.';
  if (cat.includes('rights of')) return '**Special protections** reflecting the Constitution\'s commitment to substantive equality.';
  if (cat.includes('contemporary')) return '**Contemporary issue** where law is actively evolving through legislation and judicial interpretation.';
  if (cat.includes('procedural')) return '**Procedural rights** — essential for effectively asserting your constitutional rights.';
  if (cat.includes('constitutional bod')) return '**Constitutional body** with powers granted directly by the Constitution.';
  return null;
}


function generateLinkedInsights(analysis) {
  const lines = ['**Related Constitutional Dimensions**', '', 'Your situation also connects to these areas:', ''];
  for (const linked of analysis.linkedConcepts.slice(0, 3)) {
    const cluster = WORD_UNIVERSE[linked];
    if (cluster) lines.push(`• **${cluster.domain}**: ${cluster.constitutional[0]}`);
  }
  return lines.join('\n');
}


function buildAdaptiveProvisions(analysis, ragResults) {
  const lines = [];
  const sc = analysis.situationContext;

  // If situation context detected, show the relevant law as the primary provision
  if (sc) {
    lines.push(`• ${sc.relevantLaw.split('\n')[0]}`);
    // Add constitutional articles from primary concepts
    for (const pc of sc.primaryConcepts) {
      const cluster = WORD_UNIVERSE[pc];
      if (cluster) {
        for (const art of cluster.constitutional.slice(0, 2)) {
          if (!lines.some(l => l.includes(art.split('—')[0].trim()))) {
            lines.push(`• ${art}`);
          }
        }
      }
    }
  }

  for (const r of ragResults.slice(0, 5)) {
    if (lines.length >= 6) break;
    const shortText = r.text.length > 150 ? r.text.substring(0, 150) + '...' : r.text;
    lines.push(`• ${r.title} — ${shortText}`);
  }

  if (lines.length < 3 && analysis.concepts.length > 0) {
    for (const concept of analysis.concepts.slice(0, 2)) {
      for (const art of concept.constitutional) {
        if (!lines.some(l => l.includes(art.split('—')[0].trim()))) lines.push(`• ${art}`);
      }
    }
  }

  for (const caseName of analysis.caseMentions) {
    if (!lines.some(l => l.includes(caseName.split('(')[0].trim()))) lines.push(`• ${caseName}`);
  }
  for (const art of analysis.articleMentions) {
    if (!lines.some(l => l.toLowerCase().includes(`article ${art}`))) lines.push(`• Article ${art} — Referenced in your query`);
  }

  if (lines.length === 0) {
    lines.push('• The Constitution of India (1950) — Supreme law with 448 Articles');
    lines.push('• Part III — Fundamental Rights (Articles 12-35)');
    lines.push('• Part IV — Directive Principles of State Policy');
    lines.push('• Article 32 — Constitutional Remedies ("Heart and Soul" of the Constitution)');
    lines.push('• Article 21 — Right to Life and Personal Liberty (most expansive fundamental right)');
  }

  return lines.join('\n');
}


function buildAdaptiveEmpowerment(query, analysis, ragResults) {
  const lines = [];
  const { concepts, urgency } = analysis;

  const actionMap = {
    personal_liberty: [
      '• If arrested: You MUST be informed of grounds of arrest (Article 22). Demand this.',
      '• Must be produced before a magistrate within 24 hours (Article 22).',
      '• Right to consult a lawyer of choice. Free legal aid available under NALSA.',
      '• File a habeas corpus writ in High Court (Article 226) for illegal detention.',
      '• Emergency contacts — Police: 100 | Legal Aid: 15100'
    ],
    equality_discrimination: [
      '• Caste discrimination: File complaint under SC/ST (Prevention of Atrocities) Act, 1989.',
      '• Employment discrimination: File with National Commission (SC/ST/OBC/Minorities/Women).',
      '• File a writ petition in High Court under Article 226 for rights violation.',
      '• File a PIL if discrimination is systemic.',
      '• National Human Rights Commission: nhrc.nic.in'
    ],
    women_gender: [
      '• Workplace harassment: File complaint with Internal Complaints Committee (ICC) under POSH Act.',
      '• Domestic violence: Call Women Helpline 181. File under DV Act, 2005.',
      '• Dowry harassment: File FIR under Section 498A IPC and Dowry Prohibition Act.',
      '• National Commission for Women (NCW): ncw.nic.in or 7827-170-170.',
      '• Free legal aid through District Legal Services Authority.'
    ],
    work_employment: [
      '• Wrongful termination: File complaint with Labour Commissioner.',
      '• Unpaid wages: Approach Labour Court under Payment of Wages Act.',
      '• Unsafe conditions: File complaint with Factory Inspector / OSH Code.',
      '• EPFO helpline for PF/pension: 1800-118-005.',
      '• Free legal aid through District Legal Services Authority.'
    ],
    property_housing: [
      '• Illegal eviction: File civil suit for injunction in civil court.',
      '• Land acquisition: Right to fair compensation under RFCTLARR Act, 2013.',
      '• File RTI about acquisition proceedings or land records.',
      '• RERA Authority for builder/real estate disputes.',
      '• District Legal Services Authority for free legal help.'
    ],
    children_youth: [
      '• Child labour: Report to Labour Department or Childline 1098.',
      '• Denial of education (age 6-14): File complaint under RTE Act, 2009.',
      '• Child abuse/POCSO: File FIR at any police station. Childline: 1098.',
      '• National Commission for Protection of Child Rights: ncpcr.gov.in',
      '• Child marriage is a criminal offence — report to police or DM.'
    ],
    education_knowledge: [
      '• Denied admission: File complaint with District Education Officer.',
      '• RTE violation: Approach Local Authority under RTE Act.',
      '• Fee disputes: Approach Fee Regulatory Committee.',
      '• Minority institution issues: National Commission for Minority Educational Institutions.',
      '• Education helpline / District Legal Services Authority for assistance.'
    ],
    religion_faith: [
      '• Religious freedom violation: File writ in High Court under Article 226.',
      '• Communal discrimination: File FIR and approach National Minorities Commission.',
      '• Forced conversion: Report to police — many states have anti-conversion laws.',
      '• National Commission for Minorities: ncm.nic.in',
      '• Peaceful exercise of religion is a fundamental right under Article 25.'
    ],
    privacy_surveillance: [
      '• Unauthorized data use: File complaint under DPDP Act, 2023.',
      '• Privacy violation: Right to Privacy is fundamental (Puttaswamy). File writ in HC.',
      '• Intimate images: File FIR under IT Act Sec 66E.',
      '• Cyber crime helpline: 1930 or cybercrime.gov.in',
      '• Aadhaar misuse: File complaint at uidai.gov.in.'
    ],
    consumer_market: [
      '• File at Consumer Forum: District (<₹1Cr), State (₹1-10Cr), National (>₹10Cr).',
      '• Online portal: consumerhelpline.gov.in or call 1800-11-4000.',
      '• E-commerce: File with company\'s grievance officer (required by law).',
      '• Misleading ads: Complain to ASCI.',
      '• Food safety: File with FSSAI / Food Safety Officer.'
    ],
    environment_nature: [
      '• Pollution: File complaint with State Pollution Control Board.',
      '• Serious damage: File with National Green Tribunal (NGT).',
      '• File PIL in High Court for environmental protection.',
      '• Use RTI to get pollution/environment data from authorities.',
      '• Environmental violations affect your right to life (Article 21).'
    ],
    governance_corruption: [
      '• File RTI: Write to PIO of concerned department. Fee: ₹10. Reply in 30 days.',
      '• Corruption: File with Lokpal (central) or Lokayukta (state).',
      '• Anti-Corruption helpline (CBI): 1800-11-0031.',
      '• Whistle-blower protection under Whistle Blowers Protection Act.',
      '• File PIL if corruption affects public interest broadly.'
    ],
    digital_technology: [
      '• Cyber crime: cybercrime.gov.in or helpline 1930.',
      '• Online harassment: File FIR under IT Act and IPC provisions.',
      '• Account hacked: Report to cyber cell of local police.',
      '• Right to internet access: Recognized as part of Article 21.',
      '• Data privacy: File under IT Act rules or DPDP Act, 2023.'
    ],
    marriage_family: [
      '• Domestic violence: Call Women Helpline 181. File under DV Act, 2005.',
      '• Divorce/maintenance: Consult family court lawyer. Free legal aid available.',
      '• Inter-caste/inter-religion marriage threats: Special Marriage Act protects you.',
      '• LGBTQ+ rights: Navtej Johar (2018) protects sexual orientation as fundamental right.',
      '• Child custody: Approach Family Court — child\'s welfare is paramount.'
    ],
    healthcare_medical: [
      '• Medical negligence: File at consumer forum or State Medical Council.',
      '• Denied treatment: Right to emergency medical care is part of Article 21.',
      '• Ayushman Bharat eligibility: pmjay.gov.in. Helpline: 14555.',
      '• Mental health: Protected under Mental Healthcare Act, 2017.',
      '• Disability rights: File under RPwD Act, 2016.'
    ],
    judiciary_justice: [
      '• Fundamental Rights violated: File writ under Article 32 (SC) or Article 226 (HC).',
      '• Five writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto.',
      '• PIL: Even a letter to the Chief Justice can be treated as PIL.',
      '• Free legal aid: Your right under Article 39A. Call 15100.',
      '• Lok Adalat for faster, no-cost settlement of disputes.'
    ],
    election_democracy: [
      '• Electoral complaints: File with Election Commission at eci.gov.in.',
      '• Voter ID issues: Apply/correct at nvsp.in.',
      '• Missing from voter list: Contact Electoral Registration Officer.',
      '• Campaign violations: Report to District Election Officer.',
      '• Your right to vote is fundamental to democracy.'
    ],
    emergency_security: [
      '• During emergency: Article 20 and 21 can NEVER be suspended (44th Amendment).',
      '• AFSPA violations: File with NHRC or Armed Forces Tribunal.',
      '• Unlawful detention under NSA/UAPA: Challenge via habeas corpus in HC.',
      '• Bommai judgment (1994) — safeguards against misuse of President\'s Rule.',
      '• Basic structure of Constitution cannot be altered even during emergencies.'
    ],
    citizenship_identity: [
      '• Citizenship issues: Apply through District Magistrate or Foreigners\' Tribunal.',
      '• NRC concerns: Seek legal help through DLSA.',
      '• Passport: passportindia.gov.in. Helpline: 1800-258-1800.',
      '• Citizenship cannot be arbitrarily taken — Article 11.',
      '• Aadhaar: Apply or update at uidai.gov.in.'
    ],
    speech_expression: [
      '• Speech suppressed: File writ in HC under Article 226.',
      '• Content takedown: Challenge through Grievance Appellate Committee.',
      '• Press freedom: Approach Press Council of India.',
      '• Peaceful protest is a right under Article 19(1)(b). Restrictions must be "reasonable."',
      '• Sedition law has been effectively suspended by SC — know your updated rights.'
    ],
    movement_residence: [
      '• Movement restricted: Challenge through writ petition in HC.',
      '• Curfew/lockdown must be proportionate and time-limited.',
      '• Article 19(1)(e): Right to reside anywhere in India.',
      '• Passport denial: Appeal to Passport Appellate Authority.',
      '• Domicile discrimination violates Fundamental Rights.'
    ],
    death_penalty_punishment: [
      '• File mercy petition to President under Article 72.',
      '• Death penalty only in "rarest of rare" cases (Bachan Singh).',
      '• Challenge sentence through appeal in HC/SC.',
      '• Right to fair trial: Fundamental Right under Article 21.',
      '• Free legal aid guaranteed for all accused persons.'
    ],
    state_governance: [
      '• Governor is the constitutional head of the state (Article 153). Chief Minister is the real executive.',
      '• State Legislature can make laws on State List (Schedule 7) and Concurrent List.',
      '• Contact District Collector/DM for local administrative issues.',
      '• Panchayat complaints: Approach Block Development Officer or Zila Parishad.',
      '• Municipal body complaints: Approach Municipal Commissioner or Mayor\'s office.'
    ],
    parliamentary_procedure: [
      '• Parliament sessions: Budget (Feb-May), Monsoon (Jul-Aug), Winter (Nov-Dec).',
      '• Money Bill — Article 110: Can only be introduced in Lok Sabha, Rajya Sabha has limited say.',
      '• Ordinance power: President can promulgate when Parliament is not in session (Article 123).',
      '• For systematic issues: Write to your MP or submit a petition to Parliament.',
      '• Track bills and proceedings: sansad.in.'
    ],
    fiscal_finance: [
      '• GST issues: File at gst.gov.in. GST council is the decision body.',
      '• Income tax: filetax at incometax.gov.in. Grievance: 1800-180-1961.',
      '• Finance Commission recommends tax devolution from Centre to States.',
      '• CAG audits all government expenditure — RTI for audit reports.',
      '• Budget is laid before Parliament as Annual Financial Statement (Article 112).'
    ],
    territory_reorganization: [
      '• New states are formed under Article 3 by Parliament — requires President\'s recommendation.',
      '• Union Territories are governed by Articles 239-241. Some have legislature (Delhi, Puducherry).',
      '• Scheduled Areas (Fifth Schedule): Governor has special powers for tribal welfare.',
      '• Sixth Schedule: Autonomous District Councils in Assam, Meghalaya, Tripura, Mizoram.',
      '• Boundary disputes: Approach Inter-State Council or file in SC under Article 131.'
    ],
    tribunals_commissions: [
      '• CAT for central govt employee service disputes.',
      '• NGT for environmental matters — no court fee.',
      '• NCLT for company/insolvency matters.',
      '• File with appropriate commission: NHRC (rights), NCW (women), NCPCR (children), NCM (minorities).',
      '• UPSC recruitment issues: Challenge through CAT or writ in HC.'
    ],
    official_language: [
      '• Hindi in Devanagari is the official language (Article 343), but English continues for official purposes.',
      '• Right to primary education in mother tongue for linguistic minorities (Article 350A).',
      '• 22 languages recognized in Eighth Schedule — Assamese to Urdu.',
      '• Linguistic minority grievances: Contact Special Officer for Linguistic Minorities (Article 350B).',
      '• State can adopt its own official language under Article 345.'
    ],
    situation_response: [
      '• Describe your situation — Nilai will identify the relevant constitutional rights and remedies.',
      '• For emergencies: Police 100 | Women 181 | Child 1098 | Ambulance 108 | Cyber 1930.',
      '• Free legal aid: Call 15100 or visit your District Legal Services Authority.',
      '• File writ petition in HC (Article 226) or SC (Article 32) for fundamental rights violation.',
      '• Use RTI (₹10) to get information from any government body. Response in 30 days.'
    ]
  };

  let actionProvided = false;

  // NEW: If situation context is detected, provide situation-specific empowerment
  if (analysis.situationContext) {
    const sc = analysis.situationContext;
    const situationActions = {
      crime_violence: [
        '• File FIR immediately at the nearest police station (Section 154 CrPC / Section 173 BNSS).',
        '• Murder/homicide: BNS Section 103 (murder), Section 105 (culpable homicide). Punishment: life imprisonment to death.',
        '• Assault: BNS Section 115 (voluntarily causing hurt). Punishment: up to 1 year or fine.',
        '• Call Police: 100 | Ambulance: 108.',
        '• Victim compensation — apply through District Legal Services Authority.'
      ],
      crime_theft: [
        '• File FIR for theft (BNS 303), robbery (BNS 309), or dacoity (BNS 310).',
        '• Extortion: BNS Section 308. Punishment: up to 3-7 years.',
        '• Police must register FIR for cognizable offences — refusal is punishable.',
        '• Apply for victim compensation through DLSA.',
        '• Emergency — Police: 100.'
      ],
      crime_sexual: [
        '• File FIR immediately — police MUST register (Zero FIR for sexual offences).',
        '• Rape: BNS Sections 63-69. Minimum punishment: 10 years rigorous imprisonment.',
        '• POCSO Act: For offences against children (below 18 years). Stricter punishment.',
        '• Women Helpline: 181 | Child Helpline: 1098.',
        '• Free legal aid guaranteed for sexual assault victims — contact DLSA.'
      ],
      crime_fraud: [
        '• Cheating: BNS Section 318. Punishment: up to 7 years + fine.',
        '• Forgery: BNS Section 336. Punishment: up to 7 years.',
        '• Identity theft: IT Act Section 66C. Punishment: up to 3 years + fine.',
        '• File FIR at police station or online at cybercrime.gov.in.',
        '• Cyber Crime Helpline: 1930.'
      ],
      crime_kidnap: [
        '• Kidnapping: BNS Section 137. Abduction: BNS Section 137(2).',
        '• Kidnapping for ransom: BNS Section 140. Punishment: up to death penalty.',
        '• File FIR immediately — Police: 100.',
        '• Missing persons: Report at nearest police station — no waiting period required.',
        '• Child kidnapping: Also file under POCSO if applicable. Child Helpline: 1098.'
      ],
      crime_drug: [
        '• NDPS Act governs all drug offences. Punishment depends on quantity.',
        '• Small quantity: Up to 1 year or fine. Commercial quantity: 10-20 years + fine.',
        '• Bail is restricted for commercial quantities under NDPS Act.',
        '• Report drug trafficking: Narcotics Control Bureau helpline or Police: 100.',
        '• Right to fair trial guaranteed under Article 21.'
      ],
      accident: [
        '• Hit and run: BNS Section 106(2). Punishment: up to 10 years + fine.',
        '• Rash driving causing death: BNS Section 106. Punishment: up to 5 years.',
        '• Motor Vehicles Act: Compensation through Motor Accident Claims Tribunal (MACT).',
        '• File FIR immediately. Call Police: 100 | Ambulance: 108.',
        '• Third party insurance claim: File with insurer within 30 days.'
      ],
      domestic_violence: [
        '• Protection of Women from Domestic Violence Act, 2005 covers physical, emotional, economic abuse.',
        '• BNS Sections 85-86 (cruelty by husband or relatives). Punishment: up to 3 years.',
        '• Dowry death: BNS Section 80. Punishment: 7 years to life imprisonment.',
        '• Women Helpline: 181 | One Stop Centre: 7827-170-170.',
        '• Free legal aid and shelter homes through DLSA.'
      ],
      corruption: [
        '• Prevention of Corruption Act, 1988 — bribery, criminal misconduct by public servants.',
        '• File complaint with Lokpal (Centre) or Lokayukta (State).',
        '• Anti-Corruption Bureau helpline: CBI 1800-11-0031.',
        '• Use RTI to expose corruption — fee ₹10, reply in 30 days.',
        '• Whistle Blower Protection Act protects complainants from retaliation.'
      ],
      cyber_crime: [
        '• IT Act Section 66 (hacking), 66C (identity theft), 66E (privacy violation), 67 (obscene content).',
        '• File complaint at cybercrime.gov.in or call 1930.',
        '• Online fraud/banking: Report to bank within 3 days for full refund protection (RBI guidelines).',
        '• File FIR — cyber crimes are cognizable offences.',
        '• Data breach: File complaint under DPDP Act, 2023.'
      ]
    };

    const situationActs = situationActions[sc.id];
    if (situationActs) {
      lines.push(...situationActs);
      actionProvided = true;
    }
  }

  if (!actionProvided) {
    for (const concept of concepts) {
      const actions = actionMap[concept.key];
      if (actions) {
        lines.push(...actions);
        actionProvided = true;
        break;
      }
    }
  }

  if (!actionProvided) {
    lines.push('• Rights violation: Approach HC (Article 226) or SC (Article 32) through writ petition.');
    lines.push('• Free legal aid: Contact DLSA or call 15100. Your right under Article 39A.');
    lines.push('• RTI: Get information from any public authority. Fee: ₹10. Reply in 30 days.');
    lines.push('• NHRC: nhrc.nic.in — for any human rights violation.');
    lines.push('• Emergency — Police: 100 | Women: 181 | Child: 1098 | Cyber: 1930');
  }

  if (urgency === 'urgent') {
    lines.push('');
    lines.push('IMMEDIATE CONTACTS:');
    lines.push('• Police: 100 | Women Helpline: 181 | Child Helpline: 1098');
    lines.push('• Legal Aid: 15100 | Cyber Crime: 1930');
    lines.push('• NHRC: nhrc.nic.in');
  }

  lines.push('');
  lines.push('Remember: The Constitution is YOUR document — written to protect and empower every person in India. Knowledge of your rights is the first step to exercising them.');

  return lines.join('\n');
}


// ═══════════════════════════════════════════════════════════════
// SECTION 5: MAIN INFERENCE
// ═══════════════════════════════════════════════════════════════

function runInference(userMessage, ragResults = [], conversationHistory = []) {
  // Step 1: Deep semantic analysis
  const analysis = analyzeQuery(userMessage);

  // Step 2: Greeting handling — even if some concepts accidentally matched
  if (analysis.isGreeting && (analysis.concepts.length === 0 || analysis.concepts[0].score < 10)) {
    return generateGreeting(userMessage);
  }

  // Step 3: Filter RAG results
  let filteredRag = ragResults;
  if (ragResults.length > 0) {
    filteredRag = filterAndRankResults(ragResults, analysis);
  }

  // Step 4: Even unknown topics — find constitutional connection
  if (filteredRag.length === 0 && analysis.concepts.length === 0) {
    analysis.concepts.push({
      key: 'general_constitutional',
      score: 1,
      matchedWords: [],
      constitutional: [
        'Article 21 — Right to Life and Personal Liberty (the most expansive fundamental right)',
        'Article 14 — Equality before law',
        'Article 19 — Freedoms of speech, assembly, association, movement, profession',
        'Article 32 — Right to Constitutional Remedies'
      ],
      domain: 'Constitutional Rights & Principles'
    });
    analysis.constitutionalValues.push('Article 21 — Right to Life and Personal Liberty');
    analysis.domains.push('Constitutional Rights & Principles');
    analysis.isConstitutional = true;
  }

  // Step 5: Generate adaptive response
  return generateAdaptiveResponse(userMessage, analysis, filteredRag, conversationHistory);
}

module.exports = { runInference, analyzeQuery };
