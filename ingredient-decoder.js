// Ingredient Database with properties and descriptions
const ingredientDatabase = {
  'water': {
    name: 'Water (Aqua)',
    description: 'Universal solvent and base for most skincare products. Hydrating and essential for formula stability.',
    category: 'solvent',
    active: false,
    benefits: ['Hydration', 'Solvent'],
    irritant: false,
    comedogenic: 0,
  },
  'glycerin': {
    name: 'Glycerin',
    description: 'Humectant that draws moisture to the skin. Excellent for all skin types, especially dry and dehydrated skin.',
    category: 'humectant',
    active: true,
    benefits: ['Hydration', 'Humectant', 'Emollient'],
    irritant: false,
    comedogenic: 0,
  },
  'niacinamide': {
    name: 'Niacinamide (Vitamin B3)',
    description: 'Multi-tasking ingredient that reduces inflammation, controls sebum, strengthens barrier, and brightens skin.',
    category: 'active',
    active: true,
    benefits: ['Anti-inflammatory', 'Sebum control', 'Barrier repair', 'Brightening'],
    irritant: false,
    comedogenic: 0,
  },
  'salicylic acid': {
    name: 'Salicylic Acid (BHA)',
    description: 'Beta hydroxy acid that exfoliates inside pores. Excellent for acne-prone and oily skin.',
    category: 'exfoliant',
    active: true,
    benefits: ['Exfoliation', 'Pore cleansing', 'Acne control', 'Anti-comedone'],
    irritant: true,
    comedogenic: 0,
  },
  'panthenol': {
    name: 'Panthenol (Pro-Vitamin B5)',
    description: 'Soothing humectant that improves skin hydration and elasticity. Gentle and non-irritating.',
    category: 'humectant',
    active: true,
    benefits: ['Hydration', 'Soothing', 'Skin softening'],
    irritant: false,
    comedogenic: 0,
  },
  'sodium hyaluronate': {
    name: 'Sodium Hyaluronate',
    description: 'Potent humectant that can hold up to 1000x its weight in water. Best for hydration boost.',
    category: 'humectant',
    active: true,
    benefits: ['Deep hydration', 'Plumping', 'Anti-aging support'],
    irritant: false,
    comedogenic: 0,
  },
  'ceramide': {
    name: 'Ceramides (NP, AP, EOP)',
    description: 'Lipid molecules that strengthen the skin barrier. Essential for sensitive and compromised skin.',
    category: 'barrier',
    active: true,
    benefits: ['Barrier repair', 'Moisturizing', 'Protective'],
    irritant: false,
    comedogenic: 0,
  },
  'hyaluronic acid': {
    name: 'Hyaluronic Acid',
    description: 'Gold standard humectant for hydration. Holds moisture in skin layers for plump appearance.',
    category: 'humectant',
    active: true,
    benefits: ['Hydration', 'Plumping', 'Moisture retention'],
    irritant: false,
    comedogenic: 0,
  },
  'allantoin': {
    name: 'Allantoin',
    description: 'Soothing ingredient that promotes healing and protects irritated skin.',
    category: 'soothing',
    active: true,
    benefits: ['Soothing', 'Healing', 'Protective'],
    irritant: false,
    comedogenic: 0,
  },
  'phenoxyethanol': {
    name: 'Phenoxyethanol',
    description: 'Preservative that prevents bacterial and fungal growth. Safe at concentrations under 1%.',
    category: 'preservative',
    active: false,
    benefits: ['Preservation', 'Stability'],
    irritant: false,
    comedogenic: 0,
  },
  'dimethicone': {
    name: 'Dimethicone',
    description: 'Silicone that creates a smooth feel and lightweight barrier. Good for oily skin.',
    category: 'emollient',
    active: false,
    benefits: ['Smoothing', 'Barrier', 'Lightweight feel'],
    irritant: false,
    comedogenic: 1,
  },
  'cetyl alcohol': {
    name: 'Cetyl Alcohol',
    description: 'Emollient and thickener (not drying despite name). Moisturizes without heaviness.',
    category: 'emollient',
    active: false,
    benefits: ['Moisturizing', 'Thickening', 'Emulsifying'],
    irritant: false,
    comedogenic: 0,
  },
  'snail secretion filtrate': {
    name: 'Snail Secretion Filtrate',
    description: 'Contains proteins, glycolic acids, and hyaluronic acid. Hydrating and soothing.',
    category: 'extract',
    active: true,
    benefits: ['Hydration', 'Soothing', 'Anti-inflammatory'],
    irritant: false,
    comedogenic: 0,
  },
  'betaine': {
    name: 'Betaine',
    description: 'Natural humectant derived from sugar beets. Hydrating and gentle on skin.',
    category: 'humectant',
    active: true,
    benefits: ['Hydration', 'Gentle'],
    irritant: false,
    comedogenic: 0,
  },
  'aloe barbadensis leaf juice': {
    name: 'Aloe Barbadensis Leaf Juice',
    description: 'Soothing extract rich in vitamins and minerals. Hydrating and calming.',
    category: 'extract',
    active: true,
    benefits: ['Soothing', 'Hydration', 'Calming'],
    irritant: false,
    comedogenic: 0,
  },
  'methylparaben': {
    name: 'Methylparaben',
    description: 'Preservative with antimicrobial properties. May irritate sensitive skin.',
    category: 'preservative',
    active: false,
    benefits: ['Preservation'],
    irritant: true,
    comedogenic: 0,
  },
  'propylparaben': {
    name: 'Propylparaben',
    description: 'Preservative used in concentrations typically under 0.1%. Potential allergen.',
    category: 'preservative',
    active: false,
    benefits: ['Preservation'],
    irritant: true,
    comedogenic: 0,
  },
  'sodium chloride': {
    name: 'Sodium Chloride (Salt)',
    description: 'Common salt used as thickener. Can be drying in high concentrations.',
    category: 'thickener',
    active: false,
    benefits: ['Thickening'],
    irritant: false,
    comedogenic: 0,
  },
  'disodium edta': {
    name: 'Disodium EDTA',
    description: 'Chelating agent that stabilizes formulas and preserves ingredients.',
    category: 'preservative',
    active: false,
    benefits: ['Stabilization'],
    irritant: false,
    comedogenic: 0,
  },
  'sodium hydroxide': {
    name: 'Sodium Hydroxide',
    description: 'pH buffer used to balance acidity in products. Essential for safe pH levels.',
    category: 'buffer',
    active: false,
    benefits: ['pH balance'],
    irritant: false,
    comedogenic: 0,
  },
  'fragrance': {
    name: 'Fragrance (Parfum)',
    description: 'Scent compounds. Common allergen and irritant, avoid if you have sensitive skin.',
    category: 'fragrance',
    active: false,
    benefits: ['Scent'],
    irritant: true,
    comedogenic: 0,
  },
};

// Skin compatibility ratings
const skinTypeCompatibility = {
  combination: {
    hydration: 0.9,
    exfoliation: 0.8,
    soothing: 0.85,
    barrier: 0.95,
    active: 0.75,
  },
};

// Form elements
const decoderForm = document.getElementById('decoderForm');
const resultsSection = document.getElementById('results');
const resetBtn = document.getElementById('resetBtn');
const sampleBtns = document.querySelectorAll('.sample-btn');

// Event listeners
decoderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  analyzeIngredients();
});

sampleBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const product = btn.dataset.product;
    const ingredients = btn.dataset.ingredients;
    document.getElementById('productName').value = product;
    document.getElementById('ingredientList').value = ingredients;
    analyzeIngredients();
  });
});

resetBtn.addEventListener('click', () => {
  decoderForm.reset();
  resultsSection.classList.add('hidden');
  window.scrollTo(0, 0);
});

// Main analysis function
function analyzeIngredients() {
  const productName = document.getElementById('productName').value || 'My Product';
  const ingredientListText = document.getElementById('ingredientList').value;

  if (!ingredientListText.trim()) {
    alert('Please paste an ingredient list to analyze.');
    return;
  }

  // Parse ingredients
  const ingredients = ingredientListText
    .split(',')
    .map((ing) => ing.trim().toLowerCase())
    .filter((ing) => ing.length > 0);

  // Analyze each ingredient
  const analyzed = ingredients.map((ingredient) => analyzeIngredient(ingredient));

  // Display results
  displayResults(productName, analyzed);

  // Scroll to results
  resultsSection.classList.remove('hidden');
  setTimeout(
    () => resultsSection.scrollIntoView({ behavior: 'smooth' }),
    100
  );
}

function analyzeIngredient(ingredientText) {
  // Try exact match first
  let match = ingredientDatabase[ingredientText];

  // Try partial matches
  if (!match) {
    const keys = Object.keys(ingredientDatabase);
    const key = keys.find((k) => ingredientText.includes(k) || k.includes(ingredientText));
    match = ingredientDatabase[key];
  }

  // Return match or create unknown ingredient
  if (match) {
    return {
      ...match,
      original: ingredientText,
    };
  }

  return {
    name: ingredientText.charAt(0).toUpperCase() + ingredientText.slice(1),
    original: ingredientText,
    description: 'This ingredient is not in our database. Research this ingredient on skincare forums or INCIDecoder.com',
    category: 'unknown',
    active: false,
    benefits: [],
    irritant: false,
    comedogenic: 1,
  };
}

function displayResults(productName, analyzed) {
  // Product name
  document.getElementById('resultProductName').textContent = productName;

  // Filter by category
  const activeIngredients = analyzed.filter((i) => i.active);
  const irritants = analyzed.filter((i) => i.irritant);

  // Collect all benefits
  const allBenefits = [
    ...new Set(activeIngredients.flatMap((i) => i.benefits || [])),
  ];

  // Active ingredients list
  const activeList = document.getElementById('activeList');
  activeList.innerHTML = activeIngredients
    .map((ing) => `<li><strong>${ing.name}:</strong> ${ing.description}</li>`)
    .join('');

  if (activeList.children.length === 0) {
    activeList.innerHTML = '<li>No active ingredients detected.</li>';
  }

  // Benefits list
  const benefitsList = document.getElementById('benefitsList');
  benefitsList.innerHTML = allBenefits.length
    ? allBenefits.map((b) => `<li>${b}</li>`).join('')
    : '<li>No specific benefits identified.</li>';

  // Irritants list
  const irritantsList = document.getElementById('irritantsList');
  irritantsList.innerHTML = irritants.length
    ? irritants
        .map(
          (ing) =>
            `<li><strong>${ing.name}:</strong> May cause irritation if sensitive.</li>`
        )
        .join('')
    : '<li>No common irritants detected.</li>';

  // Compatibility score
  const compatScore = calculateCompatibility(analyzed);
  const compatibilityDiv = document.getElementById('compatibilityScore');
  compatibilityDiv.innerHTML = `
    <div class="compatibility-item">
      <span class="compatibility-label">Combination Skin Match</span>
      <div class="compatibility-bar">
        <div class="compatibility-fill ${getCompatibilityClass(compatScore)}" style="width: ${compatScore}%"></div>
      </div>
      <span class="compatibility-percent">${compatScore}%</span>
    </div>
    <p style="margin: 0; color: var(--muted); font-size: 0.9rem; margin-top: 0.5rem;">
      ${getCompatibilityMessage(compatScore)}
    </p>
  `;

  // Full ingredient breakdown
  const breakdownDiv = document.getElementById('fullBreakdown');
  breakdownDiv.innerHTML = analyzed
    .map((ing) => {
      const tags = [];
      if (ing.active) tags.push('active');
      if (ing.irritant) tags.push('irritant');
      if (ing.category) tags.push(ing.category);

      return `
        <div class="ingredient-item ${ing.active ? 'active' : ''} ${ing.irritant ? 'irritant' : ''}">
          <div class="ingredient-name">${ing.name}</div>
          <div class="ingredient-description">${ing.description}</div>
          <div class="ingredient-tags">
            ${tags.map((tag) => `<span class="ingredient-tag ${ing.active && tag === 'active' ? 'active' : ing.irritant && tag === 'irritant' ? 'irritant' : ''}">${tag}</span>`).join('')}
          </div>
        </div>
      `;
    })
    .join('');
}

function calculateCompatibility(analyzed) {
  const skinType = 'combination';
  const compatibility = skinTypeCompatibility[skinType];
  let score = 50; // base score

  analyzed.forEach((ingredient) => {
    if (ingredient.category && compatibility[ingredient.category]) {
      score += compatibility[ingredient.category] * 5;
    }

    if (ingredient.irritant) {
      score -= 5;
    }

    if (ingredient.comedogenic > 2) {
      score -= 3;
    }
  });

  return Math.min(100, Math.max(0, Math.round(score)));
}

function getCompatibilityClass(score) {
  if (score >= 70) return 'high-compatible';
  if (score >= 50) return 'medium-compatible';
  return 'low-compatible';
}

function getCompatibilityMessage(score) {
  if (score >= 80) {
    return '✓ Excellent for combination skin! This product is well-suited to your skin type.';
  }
  if (score >= 60) {
    return '✓ Good for combination skin. This product should work well for most people with your skin type.';
  }
  if (score >= 40) {
    return '⚠ Moderate compatibility. This product may work, but patch test first.';
  }
  return '⚠ Lower compatibility. Consider patch testing or consulting a dermatologist.';
}
