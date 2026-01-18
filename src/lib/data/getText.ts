export default () => {
  const texts: string[] = [
    // Easy level texts
    "The quick brown fox jumps over the lazy dog. This is a simple sentence to practice typing. Keep your fingers on the home row and type carefully.",
    "Hello world. Welcome to the typing test. This is a basic sentence with common letters. Practice makes perfect when learning to type faster.",
    "Programming is fun and exciting. Learning to code takes time and patience. Every expert was once a beginner who practiced regularly.",
    "Practice makes perfect in everything you do. Typing is a skill that improves with daily exercise. Focus on accuracy before speed.",
    "The keyboard is your gateway to digital creation. Each key has a purpose and position. Learn the home row positions for better typing.",
    "Technology advances rapidly in today's world. Computers and smartphones are everywhere. Typing is an essential skill for everyone.",
    "Education opens doors to new opportunities. Knowledge is power in the modern age. Learning never stops throughout life's journey.",
    "Reading books expands your vocabulary and knowledge. Stories transport us to different worlds. Literature enriches our understanding of life.",
    "Exercise keeps the body healthy and strong. Physical activity benefits mental health too. Regular movement improves overall wellbeing.",
    "Healthy eating habits lead to better health. Fresh fruits and vegetables are nutritious. Balanced meals provide energy for daily activities.",

    // Medium level texts
    "The intricate patterns of nature reveal mathematical relationships that govern our universe. Scientists study these phenomena to understand fundamental laws.",
    "Modern computing systems rely on binary logic and electrical circuits to process vast amounts of information efficiently. Algorithms enable complex calculations.",
    "Literature reflects the human experience across cultures and historical periods. Authors explore themes of love, loss, hope, and transformation in their works.",
    "Climate change poses significant challenges for ecosystems worldwide. Environmental scientists work to develop sustainable solutions for future generations.",
    "Musical compositions combine rhythm, melody, and harmony to evoke emotional responses. Different genres appeal to diverse cultural preferences and experiences.",
    "Architectural design balances aesthetic appeal with structural integrity and functional requirements. Buildings serve both practical and symbolic purposes in society.",
    "Psychological research examines cognitive processes and behavioral patterns. Understanding the mind helps improve mental health treatments and therapies.",
    "Economic markets fluctuate based on supply, demand, and investor sentiment. Financial analysts predict trends using statistical models and historical data.",
    "Biological evolution explains the diversity of life forms on Earth. Natural selection favors traits that enhance survival and reproduction rates.",
    "Artificial intelligence systems learn from data patterns to make predictions and decisions. Machine learning algorithms improve with more training examples.",

    // Hard level texts
    "Quantum mechanics describes the behavior of particles at atomic and subatomic scales, revealing counterintuitive phenomena that challenge classical physics.",
    "Neuroplasticity refers to the brain's remarkable ability to reorganize neural pathways throughout life, adapting to new experiences and environmental changes.",
    "Cryptographic protocols secure digital communications using complex mathematical algorithms that protect sensitive information from unauthorized access attempts.",
    "Epigenetic modifications influence gene expression without altering DNA sequences, affecting cellular differentiation and organismal development significantly.",
    "Thermodynamic principles govern energy transfer and conversion processes, establishing fundamental limits on efficiency for engines and refrigeration systems.",
    "Phylogenetic analyses reconstruct evolutionary relationships among species using molecular data and morphological characteristics for systematic classification.",
    "Stochastic processes model random phenomena in finance, physics, and biology, providing frameworks for understanding uncertainty and probabilistic outcomes.",
    "Topological spaces generalize geometric concepts beyond traditional Euclidean dimensions, enabling mathematicians to study properties preserved under continuous deformations.",
    "Pharmacokinetics examines drug absorption, distribution, metabolism, and excretion patterns to optimize therapeutic dosing regimens for patient safety.",
    "Linguistic typology categorizes languages based on structural features, revealing universal patterns and cross-linguistic variations in grammatical systems.",

    // Additional easy texts
    "The sun rises in the east every morning. Birds sing beautiful songs in the trees. Flowers bloom in gardens during spring season.",
    "Water flows downhill towards the ocean. Trees grow tall and provide shade for people. Rain brings freshness to the earth.",
    "Children play in parks during summer days. Families gather for dinner in the evening. Pets bring joy and companionship to homes.",
    "Books contain knowledge and entertainment for readers. Libraries offer quiet spaces for studying and learning. Reading improves vocabulary and comprehension.",
    "Music soothes the soul and lifts spirits. Dancing expresses emotions and provides exercise. Concerts bring communities together for shared experiences.",
    "Cooking creates delicious meals for family and friends. Recipes guide preparation of various dishes. Kitchen tools help prepare food efficiently.",
    "Travel broadens perspectives and creates lasting memories. New places offer different cultures and experiences. Maps help navigate unfamiliar territories.",
    "Gardening connects people with nature and growth. Seeds develop into plants with proper care. Soil, water, and sunlight nurture plant life.",
    "Photography captures moments in time for preservation. Cameras record images that tell stories. Light and composition create beautiful photographs.",
    "Painting expresses creativity through colors and brushstrokes. Artists create visual representations of ideas and emotions. Galleries showcase artistic works.",

    // Additional medium texts
    "Scientific research follows systematic methods to investigate hypotheses and draw conclusions. Peer review ensures quality and validity of published studies.",
    "Historical events shape societies and influence contemporary politics. Archaeological evidence provides insights into ancient civilizations and cultures.",
    "Medical professionals diagnose and treat illnesses to improve patient health. Clinical trials test new treatments for safety and effectiveness.",
    "Environmental conservation protects ecosystems and biodiversity for future generations. Renewable energy sources reduce dependence on fossil fuels.",
    "Educational institutions provide learning opportunities for students of all ages. Teachers facilitate knowledge transfer and skill development processes.",
    "Business organizations operate to provide goods and services to consumers. Marketing strategies connect products with target customer segments.",
    "Legal systems establish rules and regulations for societal governance. Courts interpret laws and resolve disputes between parties involved.",
    "Sports promote physical fitness and teamwork among participants. Athletes train extensively to achieve competitive excellence in their disciplines.",
    "Architecture combines art and engineering to create functional structures. Building designs must consider safety, aesthetics, and environmental factors.",
    "Psychology studies mental processes and behavior patterns. Therapists help individuals overcome challenges and improve mental wellbeing.",

    // Additional hard texts
    "Electromagnetic radiation exhibits both wave-like and particle-like properties depending on experimental conditions. Photons carry discrete energy packets.",
    "Relativistic effects become significant at velocities approaching light speed. Time dilation occurs for moving observers relative to stationary frames.",
    "Genetic mutations drive evolutionary adaptation through natural selection mechanisms. DNA repair systems maintain genomic stability against damage.",
    "Statistical mechanics connects microscopic particle behavior to macroscopic thermodynamic properties. Ensemble averages predict observable quantities.",
    "Differential equations model dynamic systems in physics, engineering, and economics. Numerical methods approximate solutions for complex problems.",
    "Cognitive neuroscience investigates neural correlates of mental processes. Brain imaging techniques reveal activation patterns during cognitive tasks.",
    "Quantitative finance applies mathematical models to price financial instruments. Derivatives pricing relies on stochastic calculus and probability theory.",
    "Computational complexity theory classifies problems by algorithmic resource requirements. P versus NP problem remains unsolved in computer science.",
    "Molecular dynamics simulations model atomic interactions over time periods. Force fields parameterize intermolecular potentials for accurate modeling.",
    "String theory proposes extra spatial dimensions beyond our observable three. Vibrational modes of strings correspond to different elementary particles.",

    // More varied difficulty texts
    "Simple words like cat, dog, house, car, tree, flower, book, pen, cup, plate. Basic vocabulary for beginners.",
    "The weather today is sunny with a chance of rain later. Temperature reaches seventy degrees Fahrenheit in the afternoon hours.",
    "International cooperation addresses global challenges like poverty, disease, and climate change. Diplomatic relations foster peace between nations.",
    "Philosophical debates explore questions about existence, consciousness, morality, and the meaning of life. Ancient thinkers influenced modern perspectives.",
    "Biotechnology applications include genetic engineering, pharmaceutical development, and agricultural improvements. Ethical considerations accompany scientific advances.",
    "Mathematical proofs require logical reasoning and rigorous demonstration of statements. Abstract concepts connect seemingly unrelated areas of study.",
    "Sociolinguistics examines how language varies across social groups and contexts. Regional dialects reflect cultural and historical influences.",
    "Astrophysics investigates cosmic phenomena including black holes, galaxies, and stellar evolution. Telescopes collect electromagnetic radiation from space.",
    "Biochemistry explores chemical processes within living organisms. Metabolic pathways convert nutrients into energy for cellular functions.",
    "Geopolitical tensions arise from territorial disputes, resource competition, and ideological differences. International law seeks peaceful conflict resolution.",

    // Even more texts
    "Technology continues to evolve at a rapid pace. Smartphones, tablets, laptops, and smartwatches connect us globally. Digital communication transforms relationships.",
    "Financial markets react to economic indicators, political events, and corporate earnings reports. Investors seek portfolio diversification for risk management.",
    "Public health initiatives promote vaccination, hygiene, and preventive care. Epidemiologists track disease outbreaks and transmission patterns globally.",
    "Renewable energy technologies include solar panels, wind turbines, and hydroelectric generators. Sustainability goals aim to reduce carbon emissions.",
    "Artificial neural networks mimic biological brain structures for machine learning applications. Deep learning models process complex data patterns.",
    "Quantum computing leverages quantum mechanical properties for computational advantages. Superposition and entanglement enable novel algorithmic approaches.",
    "Nanotechnology manipulates matter at atomic and molecular scales. Applications range from medicine to electronics and materials science.",
    "Behavioral economics combines psychology and economics to understand decision-making. Cognitive biases affect financial and consumer choices.",
    "Structural engineering ensures building stability under various loads and environmental conditions. Seismic design considers earthquake resistance requirements.",
    "Marine biology studies ocean ecosystems and aquatic life forms. Coral reefs support biodiversity and coastal protection functions.",
  ];

  return texts[Math.floor(Math.random() * texts.length)];
};
