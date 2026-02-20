// ARAM Constitutional Knowledge Base
// Full Indian Constitution - Articles, Schedules, Amendments, Landmark Cases
// This serves as ARAM's RAG dataset - no external API or Kaggle download needed

const constitutionalData = [
  // ═══════════════ PREAMBLE ═══════════════
  {
    id: "preamble",
    category: "Preamble",
    title: "Preamble to the Constitution of India",
    text: `WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:
JUSTICE, social, economic and political;
LIBERTY of thought, expression, belief, faith and worship;
EQUALITY of status and of opportunity;
and to promote among them all
FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;
IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.`,
    keywords: ["preamble", "sovereign", "socialist", "secular", "democratic", "republic", "justice", "liberty", "equality", "fraternity", "dignity", "unity", "integrity"],
    part: "Preamble"
  },

  // ═══════════════ PART I - THE UNION AND ITS TERRITORY ═══════════════
  {
    id: "art1",
    category: "Union and Territory",
    title: "Article 1 - Name and territory of the Union",
    text: "India, that is Bharat, shall be a Union of States. The States and the territories thereof shall be as specified in the First Schedule. The territory of India shall comprise— (a) the territories of the States; (b) the Union territories specified in the First Schedule; and (c) such other territories as may be acquired.",
    keywords: ["india", "bharat", "union", "states", "territory"],
    part: "Part I"
  },
  {
    id: "art2",
    category: "Union and Territory",
    title: "Article 2 - Admission or establishment of new States",
    text: "Parliament may by law admit into the Union, or establish, new States on such terms and conditions as it thinks fit.",
    keywords: ["new states", "parliament", "admission"],
    part: "Part I"
  },
  {
    id: "art3",
    category: "Union and Territory",
    title: "Article 3 - Formation of new States and alteration of areas, boundaries or names of existing States",
    text: "Parliament may by law— (a) form a new State by separation of territory from any State or by uniting two or more States or parts of States or by uniting any territory to a part of any State; (b) increase the area of any State; (c) diminish the area of any State; (d) alter the boundaries of any State; (e) alter the name of any State. No Bill for the purpose shall be introduced in either House of Parliament except on the recommendation of the President.",
    keywords: ["new state", "formation", "boundaries", "parliament", "president"],
    part: "Part I"
  },

  // ═══════════════ PART II - CITIZENSHIP ═══════════════
  {
    id: "art5",
    category: "Citizenship",
    title: "Article 5 - Citizenship at the commencement of the Constitution",
    text: "At the commencement of this Constitution, every person who has his domicile in the territory of India and— (a) who was born in the territory of India; or (b) either of whose parents was born in the territory of India; or (c) who has been ordinarily resident in the territory of India for not less than five years immediately preceding such commencement, shall be a citizen of India.",
    keywords: ["citizenship", "domicile", "birth", "resident", "citizen"],
    part: "Part II"
  },
  {
    id: "art11",
    category: "Citizenship",
    title: "Article 11 - Parliament to regulate the right of citizenship by law",
    text: "Nothing in the foregoing provisions of this Part shall derogate from the power of Parliament to make any provision with respect to the acquisition and termination of citizenship and all other matters relating to citizenship.",
    keywords: ["parliament", "citizenship", "acquisition", "termination"],
    part: "Part II"
  },

  // ═══════════════ PART III - FUNDAMENTAL RIGHTS ═══════════════
  {
    id: "art12",
    category: "Fundamental Rights",
    title: "Article 12 - Definition of State",
    text: "In this Part, unless the context otherwise requires, 'the State' includes the Government and Parliament of India and the Government and the Legislature of each of the States and all local or other authorities within the territory of India or under the control of the Government of India.",
    keywords: ["state", "definition", "government", "parliament", "legislature", "authority"],
    part: "Part III"
  },
  {
    id: "art13",
    category: "Fundamental Rights",
    title: "Article 13 - Laws inconsistent with or in derogation of the fundamental rights",
    text: "All laws in force in the territory of India immediately before the commencement of this Constitution, in so far as they are inconsistent with the provisions of this Part, shall, to the extent of such inconsistency, be void. The State shall not make any law which takes away or abridges the rights conferred by this Part and any law made in contravention of this clause shall, to the extent of the contravention, be void. Nothing in this article shall apply to any amendment of this Constitution made under article 368.",
    keywords: ["fundamental rights", "void", "inconsistent", "law", "judicial review", "article 368"],
    part: "Part III"
  },
  {
    id: "art14",
    category: "Fundamental Rights",
    title: "Article 14 - Equality before law",
    text: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India. This means that like should be treated alike, and reasonable classification is permitted if it is based on an intelligible differentia which has a rational nexus to the object sought to be achieved.",
    keywords: ["equality", "equal protection", "law", "discrimination", "classification", "reasonable"],
    part: "Part III"
  },
  {
    id: "art15",
    category: "Fundamental Rights",
    title: "Article 15 - Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
    text: "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them. No citizen shall, on grounds only of religion, race, caste, sex, place of birth or any of them, be subject to any disability, liability, restriction or condition with regard to— (a) access to shops, public restaurants, hotels and places of public entertainment; or (b) the use of wells, tanks, bathing ghats, roads and places of public resort maintained wholly or partly out of State funds or dedicated to the use of the general public. Nothing in this article shall prevent the State from making any special provision for women and children, or for the advancement of any socially and educationally backward classes of citizens or for the Scheduled Castes and the Scheduled Tribes.",
    keywords: ["discrimination", "religion", "race", "caste", "sex", "place of birth", "reservation", "women", "children", "backward classes", "SC", "ST"],
    part: "Part III"
  },
  {
    id: "art16",
    category: "Fundamental Rights",
    title: "Article 16 - Equality of opportunity in matters of public employment",
    text: "There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State. No citizen shall, on grounds only of religion, race, caste, sex, descent, place of birth, residence or any of them, be ineligible for, or discriminated against in respect of, any employment or office under the State. Nothing in this article shall prevent Parliament from making any law prescribing, in regard to a class or classes of employment or appointment to an office, any requirement as to residence within that State or Union territory prior to such employment or appointment. Nothing in this article shall prevent the State from making any provision for the reservation of appointments or posts in favour of any backward class of citizens.",
    keywords: ["employment", "public employment", "equality", "opportunity", "reservation", "backward class", "government job"],
    part: "Part III"
  },
  {
    id: "art17",
    category: "Fundamental Rights",
    title: "Article 17 - Abolition of Untouchability",
    text: "Untouchability is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of Untouchability shall be an offence punishable in accordance with law. The Protection of Civil Rights Act, 1955 and the Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989 enforce this provision.",
    keywords: ["untouchability", "abolished", "caste discrimination", "dalits", "scheduled caste", "atrocities act"],
    part: "Part III"
  },
  {
    id: "art18",
    category: "Fundamental Rights",
    title: "Article 18 - Abolition of titles",
    text: "No title, not being a military or academic distinction, shall be conferred by the State. No citizen of India shall accept any title from any foreign State. No person who is not a citizen of India shall, without the consent of the President, accept any title from any foreign State. No person holding any office of profit or trust under the State shall, without the consent of the President, accept any present, emolument, or office of any kind from or under any foreign State.",
    keywords: ["titles", "abolished", "military", "academic", "foreign state"],
    part: "Part III"
  },
  {
    id: "art19",
    category: "Fundamental Rights",
    title: "Article 19 - Protection of certain rights regarding freedom of speech, etc.",
    text: "All citizens shall have the right— (a) to freedom of speech and expression; (b) to assemble peaceably and without arms; (c) to form associations or unions; (d) to move freely throughout the territory of India; (e) to reside and settle in any part of the territory of India; (g) to practise any profession, or to carry on any occupation, trade or business. These rights are subject to reasonable restrictions in the interests of the sovereignty and integrity of India, the security of the State, friendly relations with foreign States, public order, decency or morality, contempt of court, defamation, or incitement to an offence.",
    keywords: ["freedom of speech", "expression", "assembly", "association", "movement", "profession", "trade", "reasonable restrictions", "press freedom"],
    part: "Part III"
  },
  {
    id: "art20",
    category: "Fundamental Rights",
    title: "Article 20 - Protection in respect of conviction for offences",
    text: "No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the act charged as an offence, nor be subjected to a penalty greater than that which might have been inflicted under the law in force at the time of the commission of the offence. No person shall be prosecuted and punished for the same offence more than once (double jeopardy). No person accused of any offence shall be compelled to be a witness against himself (right against self-incrimination).",
    keywords: ["conviction", "ex post facto", "double jeopardy", "self-incrimination", "criminal law", "accused rights"],
    part: "Part III"
  },
  {
    id: "art21",
    category: "Fundamental Rights",
    title: "Article 21 - Protection of life and personal liberty",
    text: "No person shall be deprived of his life or personal liberty except according to procedure established by law. The Supreme Court has expanded Article 21 to include: right to live with dignity, right to livelihood, right to health, right to education, right to shelter, right to clean environment, right to privacy, right to clean drinking water, right to speedy trial, right to legal aid, right to fair trial, right against solitary confinement, right against custodial violence, right to travel abroad, right to social security and protection of the family, right to food, right against sexual harassment, right to reputation, right to sleep, right to electricity, and right to information.",
    keywords: ["life", "liberty", "dignity", "livelihood", "health", "education", "shelter", "environment", "privacy", "fair trial", "legal aid", "procedure established by law"],
    part: "Part III"
  },
  {
    id: "art21a",
    category: "Fundamental Rights",
    title: "Article 21A - Right to education",
    text: "The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine. This was inserted by the Constitution (Eighty-sixth Amendment) Act, 2002 and is enforced through the Right of Children to Free and Compulsory Education Act, 2009 (RTE Act).",
    keywords: ["education", "free education", "compulsory education", "children", "RTE", "right to education", "school"],
    part: "Part III"
  },
  {
    id: "art22",
    category: "Fundamental Rights",
    title: "Article 22 - Protection against arrest and detention in certain cases",
    text: "No person who is arrested shall be detained in custody without being informed, as soon as may be, of the grounds for such arrest nor shall he be denied the right to consult, and to be defended by, a legal practitioner of his choice. Every person who is arrested and detained in custody shall be produced before the nearest magistrate within a period of twenty-four hours of such arrest excluding the time necessary for the journey from the place of arrest to the court of the magistrate and no such person shall be detained in custody beyond the said period without the authority of a magistrate.",
    keywords: ["arrest", "detention", "custody", "bail", "legal practitioner", "magistrate", "24 hours", "preventive detention", "police"],
    part: "Part III"
  },
  {
    id: "art23",
    category: "Fundamental Rights",
    title: "Article 23 - Prohibition of traffic in human beings and forced labour",
    text: "Traffic in human beings and begar and other similar forms of forced labour are prohibited and any contravention of this provision shall be an offence punishable in accordance with law. Nothing in this article shall prevent the State from imposing compulsory service for public purposes.",
    keywords: ["trafficking", "forced labour", "begar", "bonded labour", "slavery", "exploitation"],
    part: "Part III"
  },
  {
    id: "art24",
    category: "Fundamental Rights",
    title: "Article 24 - Prohibition of employment of children in factories, etc.",
    text: "No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any other hazardous employment. The Child Labour (Prohibition and Regulation) Act further enforces this provision.",
    keywords: ["child labour", "children", "factory", "mine", "hazardous", "employment", "child rights"],
    part: "Part III"
  },
  {
    id: "art25",
    category: "Fundamental Rights",
    title: "Article 25 - Freedom of conscience and free profession, practice and propagation of religion",
    text: "Subject to public order, morality and health and to the other provisions of this Part, all persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion. Nothing in this article shall affect the operation of any existing law or prevent the State from making any law— (a) regulating or restricting any economic, financial, political or other secular activity which may be associated with religious practice; (b) providing for social welfare and reform or the throwing open of Hindu religious institutions of a public character to all classes and sections of Hindus.",
    keywords: ["religion", "freedom of religion", "conscience", "propagation", "practice", "secularism", "temple", "mosque", "church"],
    part: "Part III"
  },
  {
    id: "art26",
    category: "Fundamental Rights",
    title: "Article 26 - Freedom to manage religious affairs",
    text: "Subject to public order, morality and health, every religious denomination or any section thereof shall have the right— (a) to establish and maintain institutions for religious and charitable purposes; (b) to manage its own affairs in matters of religion; (c) to own and acquire movable and immovable property; and (d) to administer such property in accordance with law.",
    keywords: ["religious affairs", "religious institutions", "denomination", "charitable", "property", "religious management"],
    part: "Part III"
  },
  {
    id: "art29",
    category: "Fundamental Rights",
    title: "Article 29 - Protection of interests of minorities",
    text: "Any section of the citizens residing in the territory of India or any part thereof having a distinct language, script or culture of its own shall have the right to conserve the same. No citizen shall be denied admission into any educational institution maintained by the State or receiving aid out of State funds on grounds only of religion, race, caste, language or any of them.",
    keywords: ["minorities", "minority rights", "language", "culture", "education", "admission", "script"],
    part: "Part III"
  },
  {
    id: "art30",
    category: "Fundamental Rights",
    title: "Article 30 - Right of minorities to establish and administer educational institutions",
    text: "All minorities, whether based on religion or language, shall have the right to establish and administer educational institutions of their choice. The State shall not, in granting aid to educational institutions, discriminate against any educational institution on the ground that it is under the management of a minority, whether based on religion or language.",
    keywords: ["minority institutions", "education", "minority rights", "administration", "linguistic minority", "religious minority"],
    part: "Part III"
  },
  {
    id: "art32",
    category: "Fundamental Rights",
    title: "Article 32 - Remedies for enforcement of rights conferred by this Part",
    text: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed. The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by this Part. Dr. B.R. Ambedkar called this the 'heart and soul of the Constitution' as it makes fundamental rights real and enforceable.",
    keywords: ["supreme court", "writ", "habeas corpus", "mandamus", "prohibition", "certiorari", "quo warranto", "enforcement", "Ambedkar", "heart and soul"],
    part: "Part III"
  },

  // ═══════════════ PART IV - DIRECTIVE PRINCIPLES ═══════════════
  {
    id: "art36",
    category: "Directive Principles",
    title: "Article 36-37 - Definition and Application of Directive Principles",
    text: "The provisions contained in this Part shall not be enforceable by any court, but the principles therein laid down are nevertheless fundamental in the governance of the country and it shall be the duty of the State to apply these principles in making laws. While not justiciable, the Supreme Court has held that Directive Principles are complementary to Fundamental Rights and courts should harmoniously interpret both.",
    keywords: ["directive principles", "state policy", "governance", "non-justiciable", "fundamental in governance"],
    part: "Part IV"
  },
  {
    id: "art38",
    category: "Directive Principles",
    title: "Article 38 - State to secure a social order for the promotion of welfare of the people",
    text: "The State shall strive to promote the welfare of the people by securing and protecting as effectively as it may a social order in which justice, social, economic and political, shall inform all the institutions of the national life. The State shall, in particular, strive to minimise the inequalities in income, and endeavour to eliminate inequalities in status, facilities and opportunities.",
    keywords: ["welfare", "social order", "justice", "inequality", "income", "social justice"],
    part: "Part IV"
  },
  {
    id: "art39",
    category: "Directive Principles",
    title: "Article 39 - Certain principles of policy to be followed by the State",
    text: "The State shall direct its policy towards securing— (a) that the citizens, men and women equally, have the right to an adequate means of livelihood; (b) that the ownership and control of the material resources of the community are so distributed as best to subserve the common good; (c) that the operation of the economic system does not result in the concentration of wealth and means of production to the common detriment; (d) that there is equal pay for equal work for both men and women; (e) that the health and strength of workers, men and women, and the tender age of children are not abused; (f) that children are given opportunities and facilities to develop in a healthy manner.",
    keywords: ["livelihood", "equal pay", "wealth distribution", "workers", "children welfare", "economic policy"],
    part: "Part IV"
  },
  {
    id: "art39a",
    category: "Directive Principles",
    title: "Article 39A - Equal justice and free legal aid",
    text: "The State shall secure that the operation of the legal system promotes justice, on a basis of equal opportunity, and shall, in particular, provide free legal aid, by suitable legislation or schemes or in any other way, to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.",
    keywords: ["free legal aid", "legal system", "justice", "equal opportunity", "legal services", "poor", "disability"],
    part: "Part IV"
  },
  {
    id: "art41",
    category: "Directive Principles",
    title: "Article 41 - Right to work, to education and to public assistance",
    text: "The State shall, within the limits of its economic capacity and development, make effective provision for securing the right to work, to education and to public assistance in cases of unemployment, old age, sickness and disablement, and in other cases of undeserved want.",
    keywords: ["right to work", "education", "unemployment", "old age", "sickness", "public assistance", "welfare"],
    part: "Part IV"
  },
  {
    id: "art43",
    category: "Directive Principles",
    title: "Article 43 - Living wage, etc., for workers",
    text: "The State shall endeavour to secure, by suitable legislation or economic organisation or in any other way, to all workers, agricultural, industrial or otherwise, work, a living wage, conditions of work ensuring a decent standard of life and full enjoyment of leisure and social and cultural opportunities.",
    keywords: ["living wage", "workers", "minimum wage", "labour", "standard of life", "leisure"],
    part: "Part IV"
  },
  {
    id: "art44",
    category: "Directive Principles",
    title: "Article 44 - Uniform civil code for the citizens",
    text: "The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India. This directive principle envisions common personal laws for all citizens regardless of religion, replacing separate Hindu, Muslim, Christian and other personal laws on matters like marriage, divorce, inheritance and adoption.",
    keywords: ["uniform civil code", "UCC", "personal law", "marriage", "divorce", "inheritance", "adoption", "religion"],
    part: "Part IV"
  },
  {
    id: "art45",
    category: "Directive Principles",
    title: "Article 45 - Provision for early childhood care and education",
    text: "The State shall endeavour to provide early childhood care and education for all children until they complete the age of six years. (As substituted by the 86th Amendment Act, 2002)",
    keywords: ["early childhood", "children", "education", "care", "pre-school"],
    part: "Part IV"
  },
  {
    id: "art46",
    category: "Directive Principles",
    title: "Article 46 - Promotion of educational and economic interests of SC, ST and weaker sections",
    text: "The State shall promote with special care the educational and economic interests of the weaker sections of the people, and, in particular, of the Scheduled Castes and the Scheduled Tribes, and shall protect them from social injustice and all forms of exploitation.",
    keywords: ["scheduled caste", "scheduled tribe", "SC", "ST", "weaker sections", "exploitation", "social injustice", "education"],
    part: "Part IV"
  },
  {
    id: "art48a",
    category: "Directive Principles",
    title: "Article 48A - Protection and improvement of environment and safeguarding of forests and wild life",
    text: "The State shall endeavour to protect and improve the environment and to safeguard the forests and wild life of the country.",
    keywords: ["environment", "forests", "wildlife", "pollution", "ecology", "climate"],
    part: "Part IV"
  },
  {
    id: "art50",
    category: "Directive Principles",
    title: "Article 50 - Separation of judiciary from executive",
    text: "The State shall take steps to separate the judiciary from the executive in the public services of the State.",
    keywords: ["judiciary", "executive", "separation of powers", "independence"],
    part: "Part IV"
  },

  // ═══════════════ PART IVA - FUNDAMENTAL DUTIES ═══════════════
  {
    id: "art51a",
    category: "Fundamental Duties",
    title: "Article 51A - Fundamental duties",
    text: "It shall be the duty of every citizen of India— (a) to abide by the Constitution and respect its ideals and institutions, the National Flag and the National Anthem; (b) to cherish and follow the noble ideals which inspired our national struggle for freedom; (c) to uphold and protect the sovereignty, unity and integrity of India; (d) to defend the country and render national service when called upon to do so; (e) to promote harmony and the spirit of common brotherhood amongst all the people of India transcending religious, linguistic and regional or sectional diversities; to renounce practices derogatory to the dignity of women; (f) to value and preserve the rich heritage of our composite culture; (g) to protect and improve the natural environment including forests, lakes, rivers and wild life, and to have compassion for living creatures; (h) to develop the scientific temper, humanism and the spirit of inquiry and reform; (i) to safeguard public property and to abjure violence; (j) to strive towards excellence in all spheres of individual and collective activity so that the nation constantly rises to higher levels of endeavour and achievement; (k) who is a parent or guardian to provide opportunities for education to his child or, as the case may be, ward between the age of six and fourteen years.",
    keywords: ["fundamental duties", "national flag", "anthem", "sovereignty", "unity", "harmony", "brotherhood", "environment", "scientific temper", "public property", "education duty"],
    part: "Part IVA"
  },

  // ═══════════════ PART V - THE UNION (EXECUTIVE) ═══════════════
  {
    id: "art52-53",
    category: "The Union Executive",
    title: "Articles 52-53 - The President of India",
    text: "There shall be a President of India. The executive power of the Union shall be vested in the President and shall be exercised by him either directly or through officers subordinate to him in accordance with this Constitution. The supreme command of the Defence Forces of the Union shall be vested in the President.",
    keywords: ["president", "executive power", "defence forces", "head of state", "union executive"],
    part: "Part V"
  },
  {
    id: "art72",
    category: "The Union Executive",
    title: "Article 72 - Power of President to grant pardons",
    text: "The President shall have the power to grant pardons, reprieves, respites or remissions of punishment or to suspend, remit or commute the sentence of any person convicted of any offence— (a) in all cases where the punishment or sentence is by a Court Martial; (b) in all cases where the punishment or sentence is for an offence against any law relating to a matter to which the executive power of the Union extends; (c) in all cases where the sentence is a sentence of death.",
    keywords: ["pardon", "clemency", "reprieve", "remission", "commute", "death sentence", "mercy petition", "president power"],
    part: "Part V"
  },
  {
    id: "art74",
    category: "The Union Executive",
    title: "Article 74 - Council of Ministers to aid and advise President",
    text: "There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President who shall, in the exercise of his functions, act in accordance with such advice. The question whether any, and if so what, advice was tendered by Ministers to the President shall not be inquired into in any court.",
    keywords: ["council of ministers", "prime minister", "aid and advise", "president", "cabinet"],
    part: "Part V"
  },
  {
    id: "art76",
    category: "The Union Executive",
    title: "Article 76 - Attorney-General for India",
    text: "The President shall appoint a person who is qualified to be appointed a Judge of the Supreme Court to be Attorney-General for India. It shall be the duty of the Attorney-General to give advice to the Government of India upon such legal matters, and to perform such other duties of a legal character, as may from time to time be referred or assigned to him by the President.",
    keywords: ["attorney general", "legal advisor", "government", "president appointment"],
    part: "Part V"
  },

  // ═══════════════ PARLIAMENT ═══════════════
  {
    id: "art79-80",
    category: "Parliament",
    title: "Articles 79-80 - Constitution of Parliament",
    text: "There shall be a Parliament for the Union which shall consist of the President and two Houses to be known respectively as the Council of States (Rajya Sabha) and the House of the People (Lok Sabha). The Council of States shall consist of not more than 250 members, of whom 12 shall be nominated by the President for their expertise in literature, science, art and social service.",
    keywords: ["parliament", "rajya sabha", "lok sabha", "council of states", "house of people", "legislative"],
    part: "Part V"
  },
  {
    id: "art110",
    category: "Parliament",
    title: "Article 110 - Definition of Money Bills",
    text: "A Bill shall be deemed to be a Money Bill if it contains only provisions dealing with imposition, abolition, remission, alteration or regulation of any tax; regulation of borrowing; custody of the Consolidated Fund or the Contingency Fund of India; appropriation of moneys out of the Consolidated Fund of India. If any question arises whether a Bill is a Money Bill or not, the decision of the Speaker of the House of the People thereon shall be final.",
    keywords: ["money bill", "tax", "consolidated fund", "speaker", "lok sabha", "finance"],
    part: "Part V"
  },

  // ═══════════════ SUPREME COURT AND JUDICIARY ═══════════════
  {
    id: "art124",
    category: "Judiciary",
    title: "Article 124 - Establishment and constitution of Supreme Court",
    text: "There shall be a Supreme Court of India consisting of a Chief Justice of India and such number of other Judges as Parliament may by law prescribe. Every Judge of the Supreme Court shall be appointed by the President by warrant under his hand and seal after consultation with such of the Judges of the Supreme Court and of the High Courts in the States as the President may deem necessary. A Judge of the Supreme Court shall not be removed from his office except by an order of the President passed after an address by each House of Parliament supported by a majority of the total membership of that House and by a majority of not less than two-thirds of the members of that House present and voting.",
    keywords: ["supreme court", "chief justice", "judges", "appointment", "removal", "impeachment", "judiciary independence"],
    part: "Part V"
  },
  {
    id: "art136",
    category: "Judiciary",
    title: "Article 136 - Special leave to appeal by the Supreme Court",
    text: "Notwithstanding anything in this Chapter, the Supreme Court may, in its discretion, grant special leave to appeal from any judgment, decree, determination, sentence or order in any cause or matter passed or made by any court or tribunal in the territory of India.",
    keywords: ["special leave petition", "SLP", "appeal", "supreme court", "discretion"],
    part: "Part V"
  },
  {
    id: "art141",
    category: "Judiciary",
    title: "Article 141 - Law declared by Supreme Court to be binding on all courts",
    text: "The law declared by the Supreme Court shall be binding on all courts within the territory of India.",
    keywords: ["binding precedent", "supreme court", "law declared", "all courts", "precedent"],
    part: "Part V"
  },
  {
    id: "art142",
    category: "Judiciary",
    title: "Article 142 - Enforcement of decrees and orders of Supreme Court",
    text: "The Supreme Court in the exercise of its jurisdiction may pass such decree or make such order as is necessary for doing complete justice in any cause or matter pending before it. This extraordinary power has been used for environmental protection, implementing right to privacy, and other landmark decisions.",
    keywords: ["complete justice", "supreme court power", "extraordinary", "enforcement", "decree"],
    part: "Part V"
  },

  // ═══════════════ HIGH COURTS ═══════════════
  {
    id: "art226",
    category: "High Courts",
    title: "Article 226 - Power of High Courts to issue certain writs",
    text: "Notwithstanding anything in article 32, every High Court shall have power, throughout the territories in relation to which it exercises jurisdiction, to issue to any person or authority, including in appropriate cases, any Government, within those territories directions, orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, or any of them, for the enforcement of any of the rights conferred by Part III and for any other purpose.",
    keywords: ["high court", "writ", "habeas corpus", "mandamus", "prohibition", "certiorari", "quo warranto", "jurisdiction"],
    part: "Part VI"
  },

  // ═══════════════ PANCHAYATS AND MUNICIPALITIES ═══════════════
  {
    id: "art243",
    category: "Local Government",
    title: "Articles 243-243O - Panchayats (73rd Amendment)",
    text: "The 73rd Amendment Act, 1992 gave constitutional status to Panchayati Raj institutions. A Gram Sabha (village assembly) may exercise such powers and perform such functions at the village level as the Legislature of a State may, by law, provide. There shall be constituted in every State, Panchayats at the village, intermediate and district levels. Seats shall be reserved for Scheduled Castes, Scheduled Tribes and women (not less than one-third of total seats). The State shall endow the Panchayats with such powers and authority as may be necessary to enable them to function as institutions of self-government.",
    keywords: ["panchayat", "gram sabha", "village", "local government", "73rd amendment", "reservation", "women reservation", "self-government", "decentralization"],
    part: "Part IX"
  },
  {
    id: "art243p",
    category: "Local Government",
    title: "Articles 243P-243ZG - Municipalities (74th Amendment)",
    text: "The 74th Amendment Act, 1992 gave constitutional status to urban local bodies. There shall be constituted in every State— Nagar Panchayats for transitional areas, Municipal Councils for smaller urban areas, and Municipal Corporations for larger urban areas. Seats shall be reserved for SC, ST and women. The State shall endow Municipalities with powers to prepare plans for economic development and social justice.",
    keywords: ["municipality", "nagar panchayat", "municipal corporation", "urban", "74th amendment", "local body", "city governance"],
    part: "Part IXA"
  },

  // ═══════════════ EMERGENCY PROVISIONS ═══════════════
  {
    id: "art352",
    category: "Emergency Provisions",
    title: "Article 352 - Proclamation of Emergency (National Emergency)",
    text: "If the President is satisfied that a grave emergency exists whereby the security of India or of any part of the territory thereof is threatened, whether by war or external aggression or armed rebellion, he may, by Proclamation, make a declaration to that effect in respect of the whole of India or of such part of the territory thereof as may be specified. Such a Proclamation may be made before the actual occurrence of war or aggression or rebellion if the President is satisfied that there is imminent danger thereof. A Proclamation issued under this article must be laid before each House of Parliament and shall cease to operate at the expiration of one month unless before the expiration of that period it has been approved by resolutions of both Houses.",
    keywords: ["emergency", "national emergency", "war", "external aggression", "armed rebellion", "president", "proclamation", "article 352"],
    part: "Part XVIII"
  },
  {
    id: "art356",
    category: "Emergency Provisions",
    title: "Article 356 - President's Rule (State Emergency)",
    text: "If the President, on receipt of a report from the Governor of the State or otherwise, is satisfied that a situation has arisen in which the government of the State cannot be carried on in accordance with the provisions of this Constitution, the President may by Proclamation— (a) assume to himself all or any of the functions of the Government of the State; (b) declare that the powers of the Legislature of the State shall be exercisable by or under the authority of Parliament. Every such Proclamation shall be laid before each House of Parliament and shall cease to operate after two months unless approved by both Houses. The Supreme Court in S.R. Bommai v. Union of India (1994) laid down strict guidelines for the use of this power.",
    keywords: ["president's rule", "state emergency", "governor", "article 356", "state government", "state legislature", "S.R. Bommai"],
    part: "Part XVIII"
  },
  {
    id: "art360",
    category: "Emergency Provisions",
    title: "Article 360 - Financial Emergency",
    text: "If the President is satisfied that a situation has arisen whereby the financial stability or credit of India or of any part of the territory thereof is threatened, he may by a Proclamation make a declaration to that effect. During the period of financial emergency, the executive authority of the Union shall extend to giving directions to any State regarding financial propriety. The President may issue directions for the reduction of salaries and allowances of persons serving in connection with the affairs of the Union, including Judges of the Supreme Court and High Courts. A Financial Emergency has never been declared in India.",
    keywords: ["financial emergency", "economic crisis", "salary reduction", "financial stability", "credit"],
    part: "Part XVIII"
  },

  // ═══════════════ AMENDMENTS ═══════════════
  {
    id: "art368",
    category: "Constitutional Amendments",
    title: "Article 368 - Power of Parliament to amend the Constitution",
    text: "Notwithstanding anything in this Constitution, Parliament may in exercise of its constituent power amend by way of addition, variation or repeal any provision of this Constitution in accordance with the procedure laid down in this article. An amendment may be initiated only by the introduction of a Bill in either House of Parliament. The Bill must be passed in each House by a majority of the total membership of that House and by a majority of not less than two-thirds of the members of that House present and voting. For certain provisions, ratification by the Legislatures of not less than one-half of the States is also required.",
    keywords: ["amendment", "constitutional amendment", "article 368", "parliament power", "two-thirds majority", "ratification"],
    part: "Part XX"
  },

  // ═══════════════ SCHEDULES ═══════════════
  {
    id: "schedule1",
    category: "Schedules",
    title: "First Schedule - States and Union Territories",
    text: "Lists all States and Union Territories of India with their territories. As of 2024, India has 28 States and 8 Union Territories. Recent changes: Jammu & Kashmir reorganized into 2 UTs (2019), Ladakh made UT (2019).",
    keywords: ["states", "union territories", "first schedule", "J&K", "Ladakh", "territory"],
    part: "Schedule"
  },
  {
    id: "schedule7",
    category: "Schedules",
    title: "Seventh Schedule - Union List, State List, Concurrent List",
    text: "The Seventh Schedule divides legislative powers between Parliament (Union List - 97 subjects including defence, foreign affairs, banking, atomic energy), State Legislatures (State List - 66 subjects including police, public health, agriculture, local government), and shared between both (Concurrent List - 47 subjects including education, forests, trade unions, criminal law). In case of conflict between Union and State law on a Concurrent List subject, the Union law prevails.",
    keywords: ["union list", "state list", "concurrent list", "legislative powers", "seventh schedule", "federal", "division of powers", "centre state relations"],
    part: "Schedule"
  },
  {
    id: "schedule8",
    category: "Schedules",
    title: "Eighth Schedule - Languages",
    text: "The Eighth Schedule recognizes 22 official languages: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santhali, Sindhi, Tamil, Telugu, Urdu.",
    keywords: ["languages", "eighth schedule", "official language", "Hindi", "Tamil", "regional language", "22 languages"],
    part: "Schedule"
  },
  {
    id: "schedule9",
    category: "Schedules",
    title: "Ninth Schedule - Validation of certain Acts and Regulations",
    text: "The Ninth Schedule was added by the First Amendment (1951) to protect certain laws from judicial review. Laws placed in this Schedule cannot be challenged on the ground that they violate fundamental rights. However, in I.R. Coelho v. State of Tamil Nadu (2007), the Supreme Court held that laws added to the Ninth Schedule after April 24, 1973 can be challenged if they violate the basic structure of the Constitution.",
    keywords: ["ninth schedule", "judicial review", "protection", "land reform", "I.R. Coelho", "basic structure"],
    part: "Schedule"
  },

  // ═══════════════ KEY AMENDMENTS ═══════════════
  {
    id: "amendment1",
    category: "Key Amendments",
    title: "First Amendment (1951)",
    text: "Added reasonable restrictions on freedom of speech (Article 19). Created Ninth Schedule to protect land reform laws from judicial review. Added Article 31A and 31B to protect agrarian reform legislation.",
    keywords: ["first amendment", "1951", "reasonable restrictions", "ninth schedule", "land reform"],
    part: "Amendment"
  },
  {
    id: "amendment42",
    category: "Key Amendments",
    title: "42nd Amendment (1976) - 'Mini Constitution'",
    text: "The most extensive amendment, passed during Emergency. Added 'socialist' and 'secular' to Preamble. Added Fundamental Duties (Article 51A). Made Directive Principles superior to Fundamental Rights. Curtailed judicial review powers. Extended Parliament and state legislature terms. Many provisions were later reversed by the 43rd and 44th Amendments.",
    keywords: ["42nd amendment", "mini constitution", "emergency", "socialist", "secular", "fundamental duties", "Indira Gandhi"],
    part: "Amendment"
  },
  {
    id: "amendment44",
    category: "Key Amendments",
    title: "44th Amendment (1978)",
    text: "Reversed many changes of the 42nd Amendment. Restored the power of judicial review. Right to property removed from Fundamental Rights and made a legal right under Article 300A. Provided safeguards against misuse of emergency powers. Made it harder to declare National Emergency — now requires 'armed rebellion' instead of 'internal disturbance'.",
    keywords: ["44th amendment", "1978", "judicial review restored", "right to property", "emergency safeguards"],
    part: "Amendment"
  },
  {
    id: "amendment73",
    category: "Key Amendments",
    title: "73rd Amendment (1992) - Panchayati Raj",
    text: "Gave constitutional status to Panchayati Raj institutions. Mandated elections to local bodies. Reserved seats for SC, ST, and women (not less than one-third). Added Eleventh Schedule listing 29 subjects for Panchayats.",
    keywords: ["73rd amendment", "panchayati raj", "local government", "women reservation", "gram sabha", "village"],
    part: "Amendment"
  },
  {
    id: "amendment74",
    category: "Key Amendments",
    title: "74th Amendment (1992) - Municipalities",
    text: "Gave constitutional status to urban local bodies. Provided for Nagar Panchayats, Municipal Councils, and Municipal Corporations. Reserved seats for SC, ST, and women. Added Twelfth Schedule listing 18 subjects for Municipalities.",
    keywords: ["74th amendment", "municipality", "urban local body", "nagar panchayat", "municipal corporation"],
    part: "Amendment"
  },
  {
    id: "amendment86",
    category: "Key Amendments",
    title: "86th Amendment (2002) - Right to Education",
    text: "Made education a Fundamental Right by inserting Article 21A. Provides for free and compulsory education for children aged 6-14. Changed Article 45 to focus on early childhood care for children below 6. Added duty of parents/guardians to provide education (Article 51A(k)).",
    keywords: ["86th amendment", "right to education", "article 21A", "free education", "compulsory education", "RTE"],
    part: "Amendment"
  },
  {
    id: "amendment101",
    category: "Key Amendments",
    title: "101st Amendment (2016) - Goods and Services Tax (GST)",
    text: "Introduced the Goods and Services Tax regime. Created GST Council under Article 279A. Subsumed multiple central and state indirect taxes into one unified tax. Established a unified national market for goods and services.",
    keywords: ["101st amendment", "GST", "goods and services tax", "GST council", "indirect tax", "unified tax"],
    part: "Amendment"
  },
  {
    id: "amendment103",
    category: "Key Amendments",
    title: "103rd Amendment (2019) - EWS Reservation",
    text: "Provides for reservation of up to 10% for Economically Weaker Sections (EWS) in educational institutions and public employment. Added clauses to Articles 15 and 16. Applies to citizens not covered by existing reservation categories (SC/ST/OBC). Upheld by the Supreme Court in Janhit Abhiyan v. Union of India (2022).",
    keywords: ["103rd amendment", "EWS", "economically weaker sections", "10% reservation", "Janhit Abhiyan"],
    part: "Amendment"
  },

  // ═══════════════ LANDMARK SUPREME COURT CASES ═══════════════
  {
    id: "case_kesavananda",
    category: "Landmark Cases",
    title: "Kesavananda Bharati v. State of Kerala (1973)",
    text: "The most important constitutional case in Indian history. A 13-judge bench held that Parliament's power to amend the Constitution under Article 368 is not unlimited. Parliament cannot alter the 'basic structure' of the Constitution. Basic structure includes: supremacy of the Constitution, republican and democratic form of government, secular character, separation of powers, federal character, sovereignty, dignity of the individual, unity and integrity of the nation, rule of law, judicial review, and parliamentary system. This doctrine has been reaffirmed in every subsequent challenge to constitutional amendments.",
    keywords: ["Kesavananda Bharati", "basic structure", "doctrine", "constitutional amendment", "article 368", "Parliament power", "1973"],
    part: "Case Law"
  },
  {
    id: "case_maneka",
    category: "Landmark Cases",
    title: "Maneka Gandhi v. Union of India (1978)",
    text: "Expanded Article 21 from mere 'procedure established by law' to 'due process of law'. The Supreme Court held that any procedure depriving a person of life or personal liberty must be 'right, just and fair' — not merely a procedure sanctioned by law but one that passes the test of reasonableness. This case transformed Article 21 into the most dynamic and expansive fundamental right, from which numerous other rights have been derived. The Court also held that Articles 14, 19, and 21 are not mutually exclusive but form a 'golden triangle' of rights.",
    keywords: ["Maneka Gandhi", "due process", "procedure established by law", "Article 21", "passport", "golden triangle", "fair procedure", "1978"],
    part: "Case Law"
  },
  {
    id: "case_vishaka",
    category: "Landmark Cases",
    title: "Vishaka v. State of Rajasthan (1997)",
    text: "The Supreme Court laid down comprehensive guidelines to prevent sexual harassment at the workplace, treating them as law until legislation was enacted. The Court recognized sexual harassment as a violation of Articles 14, 15, 19(1)(g), and 21. These guidelines, known as the 'Vishaka Guidelines', remained in force until the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH Act) was enacted. The case was filed by women's rights groups after the gang rape of Bhanwari Devi, a social worker in Rajasthan.",
    keywords: ["Vishaka", "sexual harassment", "workplace", "women's rights", "POSH Act", "guidelines", "Bhanwari Devi", "1997"],
    part: "Case Law"
  },
  {
    id: "case_puttaswamy",
    category: "Landmark Cases",
    title: "Justice K.S. Puttaswamy v. Union of India (2017)",
    text: "A nine-judge bench of the Supreme Court unanimously declared the Right to Privacy as a fundamental right under Article 21 of the Constitution. The Court held that privacy is intrinsic to life and liberty and is inherently protected under Articles 14, 19, and 21. The right includes informational privacy, bodily integrity, privacy of personal choice, and privacy of personal autonomy. This overruled the earlier decisions in M.P. Sharma (1954) and Kharak Singh (1963). The judgment has implications for data protection, surveillance, sexual orientation, food choices, and individual autonomy. It became the basis for the Data Protection legislation in India.",
    keywords: ["Puttaswamy", "right to privacy", "privacy", "Aadhaar", "data protection", "Article 21", "fundamental right", "bodily autonomy", "informational privacy", "2017"],
    part: "Case Law"
  },
  {
    id: "case_navtej",
    category: "Landmark Cases",
    title: "Navtej Singh Johar v. Union of India (2018)",
    text: "A five-judge Constitution Bench struck down Section 377 of the IPC insofar as it criminalized consensual sexual acts between adults. The Court held that Section 377 was violative of Articles 14, 15, 19, and 21. Justice Indu Malhotra said: 'History owes an apology to the members of this community and their families, for the delay in providing redressal for the ignominy and ostracism that they have suffered through the centuries.' The judgment recognized LGBTQ+ rights as fundamental constitutional rights and affirmed constitutional morality over social morality.",
    keywords: ["Navtej Johar", "Section 377", "LGBTQ", "homosexuality", "decriminalization", "sexual orientation", "constitutional morality", "2018"],
    part: "Case Law"
  },
  {
    id: "case_bommai",
    category: "Landmark Cases",
    title: "S.R. Bommai v. Union of India (1994)",
    text: "A nine-judge bench laid down strict guidelines on the use of Article 356 (President's Rule). The Court held that secularism is a basic feature of the Constitution. The imposition of President's Rule is subject to judicial review. The Court can examine whether the President's satisfaction was based on relevant material. A State government pursuing anti-secular policies can be dismissed under Article 356. This case effectively curtailed the misuse of Article 356 for political purposes.",
    keywords: ["S.R. Bommai", "President's Rule", "Article 356", "secularism", "basic structure", "judicial review", "state government dismissal", "1994"],
    part: "Case Law"
  },
  {
    id: "case_golaknath",
    category: "Landmark Cases",
    title: "Golaknath v. State of Punjab (1967)",
    text: "The Supreme Court held that Parliament cannot amend Fundamental Rights under Article 368. This was later overruled by the 24th Amendment and the Kesavananda Bharati case, which held that Parliament can amend Fundamental Rights but cannot destroy the basic structure of the Constitution.",
    keywords: ["Golaknath", "fundamental rights", "amendment", "parliament power", "1967"],
    part: "Case Law"
  },
  {
    id: "case_minerva",
    category: "Landmark Cases",
    title: "Minerva Mills v. Union of India (1980)",
    text: "The Supreme Court struck down clauses of the 42nd Amendment that gave unlimited amending power to Parliament. Reaffirmed the basic structure doctrine from Kesavananda Bharati. Held that judicial review is a basic feature. Established that Fundamental Rights and Directive Principles together form the 'core' of the Constitution and are complementary, not conflicting.",
    keywords: ["Minerva Mills", "42nd amendment", "basic structure", "judicial review", "fundamental rights", "directive principles", "harmony", "1980"],
    part: "Case Law"
  },
  {
    id: "case_indra_sawhney",
    category: "Landmark Cases",
    title: "Indra Sawhney v. Union of India (1992) - Mandal Commission Case",
    text: "A nine-judge bench upheld 27% reservation for OBCs but imposed a 50% ceiling on total reservations. The 'creamy layer' concept was introduced — excluding economically advanced persons from OBC reservations. Upheld that reservation is not just a concession but a constitutional right. However, held that reservation cannot exceed 50% except in extraordinary circumstances (later relaxed for Tamil Nadu's 69% reservation). Directed the establishment of a permanent body to examine inclusion/exclusion of classes (later became NCBC).",
    keywords: ["Indra Sawhney", "Mandal Commission", "OBC reservation", "27%", "50% ceiling", "creamy layer", "reservation", "backward classes", "1992"],
    part: "Case Law"
  },
  {
    id: "case_shayara_bano",
    category: "Landmark Cases",
    title: "Shayara Bano v. Union of India (2017) - Triple Talaq",
    text: "The Supreme Court held that the practice of instant triple talaq (talaq-e-biddat) among Muslims is unconstitutional. A 3:2 majority struck it down — the majority held it is not integral to Islam (as the Quran does not sanction it) and violates Article 14. This led to the Muslim Women (Protection of Rights on Marriage) Act, 2019 which made instant triple talaq a criminal offence.",
    keywords: ["Shayara Bano", "triple talaq", "Muslim women", "talaq-e-biddat", "divorce", "Article 14", "personal law", "2017"],
    part: "Case Law"
  },
  {
    id: "case_lily_thomas",
    category: "Landmark Cases",
    title: "Lily Thomas v. Union of India (2013)",
    text: "The Supreme Court held that any Member of Parliament or State Legislature who is convicted of a crime and sentenced to imprisonment for two or more years shall be immediately disqualified from being a member. Struck down Section 8(4) of the Representation of the People Act which allowed convicted legislators to continue in office while their appeal was pending.",
    keywords: ["Lily Thomas", "disqualification", "convicted", "MP", "MLA", "criminal", "imprisonment", "2013"],
    part: "Case Law"
  },
  {
    id: "case_mc_mehta",
    category: "Landmark Cases",
    title: "M.C. Mehta v. Union of India (Multiple cases)",
    text: "Environmental lawyer M.C. Mehta filed numerous PILs that shaped India's environmental jurisprudence. Key outcomes include: closure of polluting industries near the Taj Mahal, cleaning of the Ganges, ban on cracker manufacture by children, vehicular pollution control in Delhi (CNG conversion), and the 'absolute liability' principle for hazardous industries established in M.C. Mehta v. Union of India (Oleum Gas Leak case, 1987).",
    keywords: ["M.C. Mehta", "environment", "pollution", "Taj Mahal", "Ganges", "PIL", "absolute liability", "CNG", "hazardous industry"],
    part: "Case Law"
  },

  // ═══════════════ RIGHTS AND PROTECTIONS FOR SPECIFIC GROUPS ═══════════════
  {
    id: "women_rights",
    category: "Rights of Women",
    title: "Constitutional Protections for Women",
    text: "The Constitution provides multiple protections for women: Article 14 (equality before law), Article 15(1) (no discrimination on basis of sex), Article 15(3) (special provisions for women permitted), Article 16 (equality in public employment), Article 23 (prohibition of trafficking), Article 39(a) (equal right to adequate means of livelihood), Article 39(d) (equal pay for equal work), Article 42 (just and humane conditions of work and maternity relief), Article 51A(e) (renounce practices derogatory to dignity of women), Article 243D (reservation for women in Panchayats — not less than 1/3), Article 243T (reservation for women in Municipalities). Key legislation: Dowry Prohibition Act, Protection of Women from Domestic Violence Act 2005, POSH Act 2013, Criminal Law Amendment Act 2013 (post-Nirbhaya). 106th Amendment (2023) provides for 33% reservation for women in Lok Sabha and State Legislatures.",
    keywords: ["women", "gender equality", "maternity", "dowry", "domestic violence", "sexual harassment", "equal pay", "reservation", "Article 15(3)", "POSH", "women's bill"],
    part: "Rights"
  },
  {
    id: "sc_st_rights",
    category: "Rights of SC/ST",
    title: "Constitutional Protections for Scheduled Castes and Scheduled Tribes",
    text: "Scheduled Castes (SC) and Scheduled Tribes (ST) have extensive constitutional protections: Article 15(4) (special provisions for advancement), Article 16(4) (reservation in employment), Article 17 (abolition of untouchability), Article 46 (promotion of educational and economic interests), Article 330 (reservation of seats in Lok Sabha), Article 332 (reservation in State Legislatures), Article 338 (National Commission for SC), Article 338A (National Commission for ST), Article 244 (administration of Scheduled Areas), Fifth Schedule (administration of Tribal Areas), Sixth Schedule (administration of Tribal Areas in NE states). Key legislation: Protection of Civil Rights Act 1955, SC/ST (Prevention of Atrocities) Act 1989, Forest Rights Act 2006.",
    keywords: ["scheduled caste", "scheduled tribe", "SC", "ST", "dalit", "adivasi", "tribal", "reservation", "atrocities act", "untouchability", "forest rights"],
    part: "Rights"
  },
  {
    id: "child_rights",
    category: "Rights of Children",
    title: "Constitutional Protections for Children",
    text: "Children's rights are protected through: Article 15(3) (special provisions for children), Article 21A (right to free and compulsory education, age 6-14), Article 23 (prohibition of trafficking), Article 24 (prohibition of child labour in hazardous employment), Article 39(e) (protection of health and strength), Article 39(f) (opportunities to develop in healthy manner), Article 45 (early childhood care), Article 51A(k) (parental duty to educate). Key legislation: Right to Education Act 2009, Juvenile Justice Act 2015, POCSO Act 2012, Child Labour (Prohibition and Regulation) Amendment Act 2016.",
    keywords: ["child", "children", "child labour", "education", "juvenile", "POCSO", "minor", "RTE", "trafficking"],
    part: "Rights"
  },
  {
    id: "minority_rights",
    category: "Rights of Minorities",
    title: "Constitutional Protections for Minorities",
    text: "Minorities (religious and linguistic) are protected through: Article 25-28 (freedom of religion), Article 29 (protection of language, script, culture), Article 30 (right to establish and administer educational institutions), Article 347 (recognition of languages by President), Article 350A (facilities for instruction in mother-tongue), Article 350B (Special Officer for linguistic minorities). The National Commission for Minorities Act 1992 established the NCM. Six communities are notified as minorities: Muslims, Christians, Sikhs, Buddhists, Zoroastrians (Parsis), and Jains.",
    keywords: ["minority", "religious minority", "linguistic minority", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Parsi", "minority institution", "NCM"],
    part: "Rights"
  },
  {
    id: "obc_rights",
    category: "Rights of OBC",
    title: "Constitutional Protections for Other Backward Classes",
    text: "Other Backward Classes (OBC) are protected through: Article 15(4) (special provisions for backward classes), Article 16(4) (reservation in employment), Article 340 (appointment of commission to investigate backward classes). The Mandal Commission (1980) recommended 27% reservation for OBCs. This was upheld in Indra Sawhney v. Union of India (1992) with the 50% ceiling and creamy layer concepts. Article 338B (inserted by 102nd Amendment, 2018) establishes the National Commission for Backward Classes (NCBC) as a constitutional body.",
    keywords: ["OBC", "other backward classes", "Mandal Commission", "27% reservation", "creamy layer", "NCBC", "backward"],
    part: "Rights"
  },

  // ═══════════════ CONTEMPORARY CONSTITUTIONAL ISSUES ═══════════════
  {
    id: "rti",
    category: "Contemporary Issues",
    title: "Right to Information (RTI) Act, 2005",
    text: "The RTI Act gives citizens the right to request information from any public authority, which is obliged to reply within 30 days. The Act was inspired by Article 19(1)(a) — the right to freedom of speech and expression includes the right to know. Any citizen can request information, no reasons need to be given. The Act covers all public authorities including government bodies, institutions funded by government, and privatized public utilities. Exceptions cover national security, personal privacy, and commercial confidence. The Central Information Commission (CIC) is the appellate authority.",
    keywords: ["RTI", "right to information", "transparency", "public authority", "CIC", "information commission", "government", "accountability"],
    part: "Legislation"
  },
  {
    id: "pil",
    category: "Contemporary Issues",
    title: "Public Interest Litigation (PIL)",
    text: "Public Interest Litigation allows any public-spirited person to file a case in the Supreme Court (Article 32) or High Court (Article 226) on behalf of those who cannot approach the court themselves. Pioneered by Justice P.N. Bhagwati and Justice V.R. Krishna Iyer in the late 1970s. A PIL can be filed by anyone, not just the aggrieved party. Even a letter addressed to the Court can be treated as PIL. PIL has been instrumental in promoting human rights, environmental protection, consumer rights, and transparency in governance.",
    keywords: ["PIL", "public interest litigation", "Article 32", "Article 226", "Supreme Court", "High Court", "Bhagwati", "Krishna Iyer", "social justice"],
    part: "Constitutional Process"
  },
  {
    id: "cab_caa",
    category: "Contemporary Issues",
    title: "Citizenship Amendment Act (CAA), 2019",
    text: "The Citizenship Amendment Act, 2019 amended the Citizenship Act of 1955 to provide a path to Indian citizenship for persecuted religious minorities — Hindus, Sikhs, Buddhists, Jains, Parsis, and Christians — from Afghanistan, Bangladesh, and Pakistan who entered India on or before December 31, 2014. The Act has been challenged on the grounds that it violates Article 14 (equality) by using religion as a criterion for citizenship. The Supreme Court has not yet delivered a final verdict on its constitutionality. The Act sparked widespread protests across India.",
    keywords: ["CAA", "citizenship amendment", "NRC", "citizenship", "refugees", "religion", "Article 14", "equality", "protest"],
    part: "Contemporary"
  },
  {
    id: "abrogation_370",
    category: "Contemporary Issues",
    title: "Abrogation of Article 370 (2019)",
    text: "Article 370 granted special autonomous status to Jammu and Kashmir. On August 5, 2019, the President issued a Constitutional Order superseding the 1954 order, effectively revoking J&K's special status. The Jammu and Kashmir Reorganisation Act, 2019 bifurcated the state into two Union Territories — Jammu & Kashmir (with legislature) and Ladakh (without legislature). In December 2023, the Supreme Court in a 5-judge bench upheld the abrogation as constitutionally valid, ruling that Article 370 was a temporary provision and the President had the power to abrogate it.",
    keywords: ["Article 370", "Jammu Kashmir", "J&K", "special status", "abrogation", "reorganization", "Ladakh", "autonomy"],
    part: "Contemporary"
  },

  // ═══════════════ CONSTITUTIONAL BODIES ═══════════════
  {
    id: "election_commission",
    category: "Constitutional Bodies",
    title: "Election Commission of India (Article 324)",
    text: "The Election Commission consists of the Chief Election Commissioner and such number of other Election Commissioners as the President may fix. The superintendence, direction and control of elections to Parliament, State Legislatures, and to the offices of President and Vice-President shall be vested in the Election Commission. The CEC can be removed only through impeachment (same process as a Supreme Court judge). In Anoop Baranwal v. Union of India (2023), the Supreme Court directed that the CEC and ECs shall be appointed by a committee comprising the PM, Leader of Opposition in Lok Sabha, and the CJI.",
    keywords: ["election commission", "CEC", "elections", "Article 324", "voting", "electoral", "Anoop Baranwal"],
    part: "Constitutional Body"
  },
  {
    id: "cag",
    category: "Constitutional Bodies",
    title: "Comptroller and Auditor General (Article 148)",
    text: "The CAG is appointed by the President and can only be removed by the same process as a Supreme Court judge. The CAG audits all expenditure from the Consolidated Fund of India and of each State. The CAG submits audit reports to the President/Governor who lays them before Parliament/State Legislature. The CAG is the guardian of the public purse and ensures accountability of the executive to the legislature.",
    keywords: ["CAG", "comptroller", "auditor general", "audit", "public expenditure", "accountability", "Article 148"],
    part: "Constitutional Body"
  },
  {
    id: "upsc",
    category: "Constitutional Bodies",
    title: "Union Public Service Commission (Articles 315-323)",
    text: "The UPSC conducts examinations for recruitment to all-India services and Group A and Group B services of the Union. It advises the Government on matters related to recruitment, promotions, and disciplinary matters. Members are appointed by the President. The Chairman and members can be removed only by the President on the report of the Supreme Court.",
    keywords: ["UPSC", "civil services", "IAS", "IPS", "public service commission", "examination", "recruitment"],
    part: "Constitutional Body"
  },
  {
    id: "finance_commission",
    category: "Constitutional Bodies",
    title: "Finance Commission (Article 280)",
    text: "The President constitutes a Finance Commission every five years to recommend the distribution of net proceeds of taxes between the Union and States, the principles governing grants-in-aid to the States, and measures to augment the Consolidated Fund of a State. The Finance Commission plays a crucial role in maintaining fiscal federalism.",
    keywords: ["finance commission", "Article 280", "tax distribution", "grants", "fiscal federalism", "centre state", "revenue sharing"],
    part: "Constitutional Body"
  },

  // ═══════════════ FEDERALISM AND CENTRE-STATE RELATIONS ═══════════════
  {
    id: "federalism",
    category: "Federalism",
    title: "Federal Structure of India",
    text: "India has a quasi-federal structure — federal in form but unitary in spirit. Features that make it federal: written Constitution, division of powers (Seventh Schedule), Supreme Court as arbiter, bicameral legislature. Features that make it unitary: strong Centre, single citizenship, integrated judiciary, All-India Services, emergency provisions, Governor appointed by Centre, power to create/alter states, residuary powers with Union. The Constitution uses the term 'Union of States' (not 'Federation') — implying the states did not come together to form a union but the union created the states. Recent judgments have strengthened cooperative federalism, requiring consultation and consensus between Centre and States.",
    keywords: ["federalism", "federal", "unitary", "quasi-federal", "centre state", "cooperative federalism", "division of powers", "union of states"],
    part: "Constitutional Principle"
  },
  {
    id: "separation_of_powers",
    category: "Constitutional Principles",
    title: "Separation of Powers — Legislature, Executive, Judiciary",
    text: "The Indian Constitution establishes a separation of powers among the three organs of government: Legislature (Parliament and State Legislatures — makes laws), Executive (President, PM, Council of Ministers — implements laws), and Judiciary (Supreme Court, High Courts, subordinate courts — interprets laws). India does not follow a strict separation like the US but has a system of checks and balances. The judiciary reviews legislative and executive actions (judicial review). The legislature controls the executive through questions, motions, and votes. The executive implements judicial orders.",
    keywords: ["separation of powers", "legislature", "executive", "judiciary", "checks and balances", "judicial review", "parliamentary sovereignty"],
    part: "Constitutional Principle"
  },

  // ═══════════════ PROCEDURAL RIGHTS ═══════════════
  {
    id: "fir_rights",
    category: "Procedural Rights",
    title: "Rights when filing an FIR or facing police action",
    text: "Under the Constitution and CrPC/BNSS: Right to file FIR at any police station (Zero FIR concept — Sec 173 BNSS). Police must register FIR for cognizable offences (Lalita Kumari v. Govt of UP, 2014). Right to free copy of FIR. Right to consult a lawyer (Article 22). Right to be produced before magistrate within 24 hours (Article 22). Right against self-incrimination (Article 20(3)). Right to bail (general rule — bail is rule, jail is exception). Right to know grounds of arrest. Right to inform a friend/relative of arrest. Right of arrested women — cannot be arrested after sunset and before sunrise except in exceptional circumstances, and must be searched only by a female officer.",
    keywords: ["FIR", "police", "arrest", "bail", "custody", "lawyer", "magistrate", "Zero FIR", "women arrest", "Lalita Kumari", "rights of arrested"],
    part: "Procedural"
  },
  {
    id: "consumer_rights",
    category: "Procedural Rights",
    title: "Consumer Rights under the Constitution",
    text: "Consumer protection flows from Article 21 (right to life includes right to quality goods/services), Article 14 (equal treatment), and Article 19(1)(g) (right to carry on trade). The Consumer Protection Act, 2019 establishes a three-tier quasi-judicial consumer dispute redressal mechanism: District Commission (up to ₹1 crore), State Commission (₹1-10 crore), National Commission (above ₹10 crore). Consumer rights include: right to safety, right to information, right to choose, right to be heard, right to redressal, right to consumer education. E-commerce is also covered. Product liability provisions hold manufacturers, sellers, and service providers liable for defective goods/services.",
    keywords: ["consumer", "consumer protection", "product liability", "consumer forum", "defective goods", "e-commerce", "complaint", "redressal"],
    part: "Procedural"
  },
  {
    id: "property_rights",
    category: "Procedural Rights",
    title: "Right to Property",
    text: "Originally a Fundamental Right (Article 19(1)(f) and Article 31), the right to property was removed from Fundamental Rights by the 44th Amendment (1978). It is now a constitutional right under Article 300A: 'No person shall be deprived of his property save by authority of law.' This means property can be acquired by the State but only by following due process of law and providing compensation. The Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 governs land acquisition.",
    keywords: ["property", "land acquisition", "Article 300A", "44th amendment", "compensation", "right to property", "real estate"],
    part: "Rights"
  },
  {
    id: "labour_rights",
    category: "Procedural Rights",
    title: "Labour and Workers' Rights",
    text: "Constitutional provisions for workers: Article 23 (prohibition of forced labour), Article 24 (prohibition of child labour), Article 39(a) (adequate livelihood), Article 39(d) (equal pay for equal work), Article 41 (right to work), Article 42 (just and humane conditions of work), Article 43 (living wage), Article 43A (participation of workers in management). Key labor codes (2020): Code on Wages, Industrial Relations Code, Social Security Code, Occupational Safety Code. Trade unions are protected under Article 19(1)(c). The Supreme Court in Bandhua Mukti Morcha v. Union of India recognized bonded labour rehabilitation as a fundamental right issue.",
    keywords: ["labour", "worker", "minimum wage", "trade union", "industrial dispute", "factory", "employee", "working conditions", "bonded labour", "contract labour"],
    part: "Rights"
  }
];

module.exports = { constitutionalData };
