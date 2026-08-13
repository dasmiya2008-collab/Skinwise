const quizForm = document.getElementById('quizForm');
const resetButton = document.getElementById('resetButton');
const recommendationsSection = document.getElementById('recommendations');
const summaryText = document.getElementById('summaryText');
const cardsContainer = document.getElementById('cards');

const products = [
  {
    title: 'Gentle Hydrating Cleanser',
    description: 'A soft, creamy cleanser that removes impurities without stripping moisture.',
    tags: ['Dry', 'Sensitive', 'Hydration', 'Beginner'],
    match: ({ skinType, concerns, environment, lifestyle, budget }) =>
      ['dry', 'sensitive', 'combination', 'normal'].includes(skinType) &&
      concerns === 'hydration',
  },
  {
    title: 'Brightening Vitamin C Serum',
    description: 'Lightweight vitamin C support for dull skin and uneven tone.',
    tags: ['Tone', 'Anti-Age', 'Urban', 'Mid'],
    match: ({ concerns }) => concerns === 'tone',
  },
  {
    title: 'Balancing Gel Moisturizer',
    description: 'A fresh gel texture that hydrates oily or combination skin without heaviness.',
    tags: ['Oily', 'Combination', 'Acne', 'Lightweight'],
    match: ({ skinType, concerns }) =>
      ['oily', 'combination'].includes(skinType) && concerns === 'acne',
  },
  {
    title: 'Soothing Barrier Cream',
    description: 'A calming cream to support redness, sensitivity, and dry air exposure.',
    tags: ['Sensitive', 'Redness', 'DryAir', 'Comfort'],
    match: ({ concerns, environment }) =>
      concerns === 'redness' && environment === 'dryAir',
  },
  {
    title: 'SPF 50 Mineral Sunscreen',
    description: 'Broad-spectrum protection made for everyday use and outdoor routines.',
    tags: ['Sun', 'Active', 'Travel', 'Protect'],
    match: ({ environment, lifestyle }) =>
      environment === 'sunny' || lifestyle === 'active',
  },
  {
    title: 'Everyday Budget-Friendly Serum',
    description: 'A gentle serum with hydration and soothing ingredients for any routine.',
    tags: ['Economy', 'Beginner', 'Daily', 'Soft'],
    match: ({ budget }) => budget === 'economy',
  },
  {
    title: 'Nourishing Night Cream',
    description: 'A richer moisturizer to help repair and soften skin while you sleep.',
    tags: ['Dry', 'Anti-Age', 'Mid', 'Repair'],
    match: ({ concerns, budget }) =>
      concerns === 'antiAge' && budget !== 'economy',
  },
  {
    title: 'Calming Essence Mist',
    description: 'A refreshing mist to rehydrate skin during long days or travel.',
    tags: ['Travel', 'DeskJob', 'Hydration', 'Sensitive'],
    match: ({ lifestyle }) => lifestyle === 'travel' || lifestyle === 'deskJob',
  },
];

const createProductCard = (product) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <h4>${product.title}</h4>
    <p>${product.description}</p>
    <span class="tag">Recommended</span>
  `;
  return card;
};

const getSummary = ({ skinType, concerns, environment, lifestyle, budget }) => {
  const typeLabel = {
    normal: 'Normal skin',
    dry: 'Dry skin',
    oily: 'Oily skin',
    combination: 'Combination skin',
    sensitive: 'Sensitive skin',
  }[skinType];

  const concernLabel = {
    hydration: 'hydration',
    acne: 'acne and blemishes',
    antiAge: 'anti-aging support',
    redness: 'redness and sensitivity',
    tone: 'uneven tone and dullness',
  }[concerns];

  return `Based on your ${typeLabel}, focus on ${concernLabel}, and a ${lifestyle} lifestyle in a ${environment} environment, here are beginner-friendly products that fit your budget.`;
};

quizForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(quizForm);
  const answers = {
    skinType: formData.get('skinType'),
    concerns: formData.get('concerns'),
    environment: formData.get('environment'),
    lifestyle: formData.get('lifestyle'),
    budget: formData.get('budget'),
  };

  const matchedProducts = products.filter((product) => product.match(answers));

  summaryText.textContent = getSummary(answers);
  cardsContainer.innerHTML = '';

  if (matchedProducts.length === 0) {
    cardsContainer.innerHTML = `
      <p class="no-results">No exact matches were found, but these gentle essentials are great for building a simple routine.</p>
    `;
  } else {
    matchedProducts.forEach((product) => {
      cardsContainer.appendChild(createProductCard(product));
    });
  }

  recommendationsSection.classList.remove('hidden');
});

resetButton.addEventListener('click', () => {
  quizForm.reset();
  recommendationsSection.classList.add('hidden');
  cardsContainer.innerHTML = '';
  summaryText.textContent = '';
});
