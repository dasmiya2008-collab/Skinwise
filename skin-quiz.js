// Skin Quiz Management
class SkinQuiz {
  constructor() {
    this.quizForm = document.getElementById('quizForm');
    this.quizSection = document.getElementById('quizSection');
    this.resultsSection = document.getElementById('resultsSection');
    this.backToQuizBtn = document.getElementById('backToQuizBtn');
    
    this.initEventListeners();
    this.updateConcernCount();
  }

  initEventListeners() {
    this.quizForm.addEventListener('submit', (e) => this.handleSubmit(e));
    this.backToQuizBtn.addEventListener('click', () => this.backToQuiz());
    
    // Update concern count when checkboxes change
    const concernCheckboxes = document.querySelectorAll('input[name="concerns"]');
    concernCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => this.updateConcernCount());
    });

    // Update skin type display in header
    const skinTypeInputs = document.querySelectorAll('input[name="skinType"]');
    skinTypeInputs.forEach(input => {
      input.addEventListener('change', () => this.updateSkinTypeDisplay());
    });
  }

  updateConcernCount() {
    const selectedConcerns = document.querySelectorAll('input[name="concerns"]:checked').length;
    document.getElementById('concernCount').textContent = selectedConcerns;
  }

  updateSkinTypeDisplay() {
    const selectedSkinType = document.querySelector('input[name="skinType"]:checked');
    if (selectedSkinType) {
      const skinTypeLabel = selectedSkinType.nextElementSibling.querySelector('.option-label').textContent;
      document.getElementById('skinTypeDisplay').textContent = skinTypeLabel;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.quizForm);
    const skinType = formData.get('skinType');
    const budget = formData.get('budget');
    const lifestyle = formData.get('lifestyle');
    
    // Get all selected concerns
    const concerns = [];
    document.querySelectorAll('input[name="concerns"]:checked').forEach(checkbox => {
      concerns.push(checkbox.value);
    });

    if (concerns.length === 0) {
      alert('Please select at least one skin concern');
      return;
    }

    const quizData = { skinType, concerns, budget, lifestyle };
    this.displayResults(quizData);
    this.quizSection.classList.add('hidden');
    this.resultsSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  displayResults(quizData) {
    // Update profile badges
    document.getElementById('profileSkinType').textContent = this.capitalize(quizData.skinType);
    document.getElementById('profileConcerns').textContent = quizData.concerns.map(c => this.capitalize(c.replace(/-/g, ' '))).join(', ');
    document.getElementById('profileBudget').textContent = this.capitalize(quizData.budget.replace(/-/g, ' '));
    document.getElementById('profileLifestyle').textContent = this.capitalize(quizData.lifestyle.replace(/-/g, ' '));

    // Get recommendations
    const recommendations = this.getRecommendations(quizData);

    // Display routine cards
    this.displayRoutineCard('cleanser', recommendations.cleanser);
    this.displayRoutineCard('toner', recommendations.toner);
    this.displayRoutineCard('essence', recommendations.essence);
    this.displayRoutineCard('moisturizer', recommendations.moisturizer);
    this.displayRoutineCard('sunscreen', recommendations.sunscreen);
    this.displayRoutineCard('treatment', recommendations.treatment);

    // Display tips
    this.displayTips(recommendations.tips);

    // Display routine schedule
    this.displayRoutineSchedule(recommendations.morningRoutine, recommendations.eveningRoutine);
  }

  getRecommendations(quizData) {
    const { skinType, concerns, budget, lifestyle } = quizData;
    
    // Product database
    const products = {
      cleanser: this.getCleanserRecommendations(skinType, concerns, budget),
      toner: this.getTonerRecommendations(skinType, concerns, budget),
      essence: this.getEssenceRecommendations(skinType, concerns, budget),
      moisturizer: this.getMoisturizerRecommendations(skinType, concerns, budget),
      sunscreen: this.getSunscreenRecommendations(budget),
      treatment: this.getTreatmentRecommendations(concerns, budget),
    };

    // Get why recommendations
    const why = this.getWhyRecommendations(skinType, concerns, lifestyle);

    // Get tips
    const tips = this.getTips(skinType, concerns, lifestyle);

    // Get routine schedule
    const morningRoutine = this.getMorningRoutine(concerns);
    const eveningRoutine = this.getEveningRoutine(concerns);

    return {
      ...products,
      ...why,
      tips,
      morningRoutine,
      eveningRoutine
    };
  }

  getCleanserRecommendations(skinType, concerns, budget) {
    const cleansers = {
      'budget-friendly': [
        {
          name: 'Cetaphil Hydrating Facial Cleanser',
          brand: 'Cetaphil',
          price: '₹250-350',
          benefit: 'Gentle, non-foaming, suitable for all skin types'
        },
        {
          name: 'CeraVe Foaming Facial Cleanser',
          brand: 'CeraVe',
          price: '₹400-500',
          benefit: 'Oil-control, gentle formula with ceramides'
        },
        {
          name: 'Neutrogena Hydro Boost Hydrating Cleansing Wipes',
          brand: 'Neutrogena',
          price: '₹300-400',
          benefit: 'Quick cleansing with hyaluronic acid'
        }
      ],
      'mid-range': [
        {
          name: 'La Roche-Posay Toleriane Hydrating Gentle Cleanser',
          brand: 'La Roche-Posay',
          price: '₹700-850',
          benefit: 'Dermatologist-recommended, prebiotic thermal water'
        },
        {
          name: 'Neutrogena Ultra Gentle Daily Cleanser',
          brand: 'Neutrogena',
          price: '₹500-650',
          benefit: 'Soap-free, hypoallergenic formula'
        },
        {
          name: 'Cetaphil Pro Sensitive Skin Cleanser',
          brand: 'Cetaphil',
          price: '₹600-750',
          benefit: 'Redness-reducing, strengthens skin barrier'
        }
      ],
      'premium': [
        {
          name: 'SK-II Facial Treatment Cleansing Oil',
          brand: 'SK-II',
          price: '₹3500-4500',
          benefit: 'Luxury oil cleanser with pitera essence'
        },
        {
          name: 'Drunk Elephant C-Firma Fresh Brightening Wash',
          brand: 'Drunk Elephant',
          price: '₹2200-2800',
          benefit: 'Antioxidant-rich, brightening cleanser'
        },
        {
          name: 'Augustinus Bader Rich Cream Cleanser',
          brand: 'Augustinus Bader',
          price: '₹2900-3600',
          benefit: 'Luxe cream formula with patented complex'
        }
      ]
    };

    let selectedCleansers = cleansers[budget] || cleansers['mid-range'];

    // Adjust based on skin type
    if (skinType === 'oily') {
      selectedCleansers = selectedCleansers.filter(p => 
        p.benefit.toLowerCase().includes('oil') || p.benefit.toLowerCase().includes('foam')
      );
    }

    return selectedCleansers;
  }

  getTonerRecommendations(skinType, concerns, budget) {
    const toners = {
      'budget-friendly': [
        {
          name: 'The Ordinary Glycerin 5% + Aloe Vera 5%',
          brand: 'The Ordinary',
          price: '₹250-350',
          benefit: 'Hydrating, affordable, multi-use'
        },
        {
          name: 'Dot & Key Hydrating Watermelon Toner',
          brand: 'Dot & Key',
          price: '₹350-450',
          benefit: 'Indian brand, hydrating, refreshing'
        },
        {
          name: 'Neutrogena Hydro Boost Hydrating Toner Water',
          brand: 'Neutrogena',
          price: '₹400-500',
          benefit: 'Hyaluronic acid based, affordable'
        }
      ],
      'mid-range': [
        {
          name: 'COSRX Hydrium Watery Toner Plus',
          brand: 'COSRX',
          price: '₹850-1000',
          benefit: 'K-beauty favorite, hydrating, lightweight'
        },
        {
          name: 'Isntree Toner Plus',
          brand: 'Isntree',
          price: '₹650-800',
          benefit: 'Hydrating, barrier-strengthening'
        },
        {
          name: 'Paula\'s Choice RESIST Perfectly Balanced Toner',
          brand: 'Paula\'s Choice',
          price: '₹1200-1400',
          benefit: 'Fragrance-free, all skin types'
        }
      ],
      'premium': [
        {
          name: 'Augustinus Bader Rich Cream Cleanser',
          brand: 'Augustinus Bader',
          price: '₹2900-3600',
          benefit: 'Luxe hydrating essence'
        },
        {
          name: 'SK-II Facial Treatment Essence',
          brand: 'SK-II',
          price: '₹5500-7000',
          benefit: 'Cult favorite, pitera essence'
        },
        {
          name: 'Estée Lauder Micro Essence Skin Activating Treatment Lotion',
          brand: 'Estée Lauder',
          price: '₹3500-4500',
          benefit: 'Anti-aging toner essence'
        }
      ]
    };

    let selectedToners = toners[budget] || toners['mid-range'];
    return selectedToners;
  }

  getEssenceRecommendations(skinType, concerns, budget) {
    const essences = {
      'budget-friendly': [
        {
          name: 'The Ordinary Hyaluronic Acid 2% + B5',
          brand: 'The Ordinary',
          price: '₹250-350',
          benefit: 'Best-selling hydrating serum'
        },
        {
          name: 'The Ordinary Niacinamide 10% + Zinc 1%',
          brand: 'The Ordinary',
          price: '₹300-400',
          benefit: 'Oil control, pore-minimizing'
        },
        {
          name: 'Dot & Key Hyaluronic Acid + Peptides Hydrating Serum',
          brand: 'Dot & Key',
          price: '₹450-600',
          benefit: 'Indian brand, hydrating'
        }
      ],
      'mid-range': [
        {
          name: 'COSRX Advanced Snail 96 Mucin Power Essence',
          brand: 'COSRX',
          price: '₹700-850',
          benefit: 'Hydrating, healing, K-beauty classic'
        },
        {
          name: 'Paula\'s Choice 2% BHA Liquid Exfoliant',
          brand: 'Paula\'s Choice',
          price: '₹1200-1400',
          benefit: 'Acne-fighting, oil control'
        },
        {
          name: 'Minimalist Salicylic Acid 2% Face Serum',
          brand: 'Minimalist',
          price: '₹550-700',
          benefit: 'Indian brand, acne treatment'
        }
      ],
      'premium': [
        {
          name: 'Drunk Elephant C-Firma Fresh Serum',
          brand: 'Drunk Elephant',
          price: '₹2500-3200',
          benefit: 'Vitamin C brightening serum'
        },
        {
          name: 'SK-II Facial Treatment Essence',
          brand: 'SK-II',
          price: '₹5500-7000',
          benefit: 'Cult favorite essence'
        },
        {
          name: 'Augustinus Bader The Rich Serum',
          brand: 'Augustinus Bader',
          price: '₹3500-4500',
          benefit: 'Luxe anti-aging serum'
        }
      ]
    };

    let selectedEssences = essences[budget] || essences['mid-range'];

    // Adjust based on concerns
    if (concerns.includes('acne')) {
      selectedEssences = selectedEssences.filter(p => 
        p.benefit.toLowerCase().includes('acne') || p.benefit.toLowerCase().includes('oil') || p.benefit.toLowerCase().includes('salicylic')
      );
    }

    if (concerns.includes('aging')) {
      selectedEssences = selectedEssences.filter(p => 
        p.benefit.toLowerCase().includes('anti-aging') || p.benefit.toLowerCase().includes('vitamin c')
      );
    }

    return selectedEssences.length > 0 ? selectedEssences : essences[budget];
  }

  getMoisturizerRecommendations(skinType, concerns, budget) {
    const moisturizers = {
      'budget-friendly': [
        {
          name: 'CeraVe Hydrating Facial Lotion',
          brand: 'CeraVe',
          price: '₹450-600',
          benefit: 'Ceramides & hyaluronic acid'
        },
        {
          name: 'Neutrogena Hydro Boost Hydrating Gel-Cream',
          brand: 'Neutrogena',
          price: '₹400-550',
          benefit: 'Lightweight gel-cream formula'
        },
        {
          name: 'Plum Green Tea Mattifying Moisturizer',
          brand: 'Plum',
          price: '₹350-450',
          benefit: 'Indian brand, oil-control'
        }
      ],
      'mid-range': [
        {
          name: 'La Roche-Posay Toleriane Double Repair Face Moisturizer',
          brand: 'La Roche-Posay',
          price: '₹1000-1200',
          benefit: 'Ceramides, niacinamide'
        },
        {
          name: 'Cetaphil Rich Hydrating Night Cream',
          brand: 'Cetaphil',
          price: '₹800-950',
          benefit: 'Barrier repair, non-comedogenic'
        },
        {
          name: 'Isntree Hyaluronic Toner Plus Cream',
          brand: 'Isntree',
          price: '₹900-1100',
          benefit: 'Lightweight yet nourishing'
        }
      ],
      'premium': [
        {
          name: 'SK-II Facial Treatment Essence Rich',
          brand: 'SK-II',
          price: '₹7500-9000',
          benefit: 'Pitera essence, luxe formula'
        },
        {
          name: 'Augustinus Bader Rich Cream',
          brand: 'Augustinus Bader',
          price: '₹3600-4500',
          benefit: 'Patented TFC8 complex'
        },
        {
          name: 'Estée Lauder Revitalizing Supreme+ Cell Power Moisturizer',
          brand: 'Estée Lauder',
          price: '₹4500-5500',
          benefit: 'Anti-aging moisturizer'
        }
      ]
    };

    let selectedMoisturizers = moisturizers[budget] || moisturizers['mid-range'];
    return selectedMoisturizers;
  }

  getSunscreenRecommendations(budget) {
    const sunscreens = {
      'budget-friendly': [
        {
          name: 'Neutrogena Ultra Sheer Dry-Touch Sunblock SPF 50',
          brand: 'Neutrogena',
          price: '₹350-450',
          benefit: 'Oil-free, lightweight, affordable'
        },
        {
          name: 'Plum Invisible UV Shield SPF 50',
          brand: 'Plum',
          price: '₹400-500',
          benefit: 'Indian brand, no white cast'
        },
        {
          name: 'Dot & Key Dewy Super Sunscreen SPF 50+',
          brand: 'Dot & Key',
          price: '₹300-400',
          benefit: 'Indian brand, dewy finish'
        }
      ],
      'mid-range': [
        {
          name: 'La Roche-Posay Anthelios Hydrating Cream SPF 50',
          brand: 'La Roche-Posay',
          price: '₹1000-1200',
          benefit: 'Dermatologist-recommended'
        },
        {
          name: 'Paula\'s Choice Super-Light Daily Defense SPF 30',
          brand: 'Paula\'s Choice',
          price: '₹1200-1400',
          benefit: 'Mineral sunscreen'
        },
        {
          name: 'Cetaphil Daily Defense Facial Moisturizer SPF 50',
          brand: 'Cetaphil',
          price: '₹800-1000',
          benefit: 'Moisturizer + sunscreen combo'
        }
      ],
      'premium': [
        {
          name: 'Augustinus Bader The Rich Cream SPF 15',
          brand: 'Augustinus Bader',
          price: '₹3600-4500',
          benefit: 'Luxe sunscreen cream'
        },
        {
          name: 'SK-II Facial Treatment UV Emulsion SPF 30',
          brand: 'SK-II',
          price: '₹3500-4200',
          benefit: 'Pitera essence + sun protection'
        },
        {
          name: 'Estée Lauder Advanced Night Repair Eye Cream SPF 15',
          brand: 'Estée Lauder',
          price: '₹2500-3200',
          benefit: 'Anti-aging sunscreen'
        }
      ]
    };

    return sunscreens[budget] || sunscreens['mid-range'];
  }

  getTreatmentRecommendations(concerns, budget) {
    const treatments = {
      'budget-friendly': [
        {
          name: 'The Ordinary Salicylic Acid 2% Solution',
          brand: 'The Ordinary',
          price: '₹280-350',
          benefit: 'Acne & exfoliation treatment'
        },
        {
          name: 'Forest Essentials Ubtan Face Mask',
          brand: 'Forest Essentials',
          price: '₹400-500',
          benefit: 'Indian ayurvedic treatment'
        },
        {
          name: 'Plum Activated Charcoal Face Mask',
          brand: 'Plum',
          price: '₹350-450',
          benefit: 'Detoxifying mask'
        }
      ],
      'mid-range': [
        {
          name: 'Aztec Secret Indian Healing Clay',
          brand: 'Aztec',
          price: '₹800-1000',
          benefit: 'Deep cleansing mask'
        },
        {
          name: 'Paula\'s Choice RESIST Intensive Repair Cream',
          brand: 'Paula\'s Choice',
          price: '₹1400-1700',
          benefit: 'Anti-aging intensive treatment'
        },
        {
          name: 'COSRX Hydrium Watery Toner Plus Cream Mask',
          brand: 'COSRX',
          price: '₹1000-1200',
          benefit: 'Hydrating sheet mask'
        }
      ],
      'premium': [
        {
          name: 'SK-II Facial Treatment Mask',
          brand: 'SK-II',
          price: '₹4000-5000',
          benefit: 'Luxury sheet mask with pitera'
        },
        {
          name: 'Augustinus Bader Rich Cream Intensive',
          brand: 'Augustinus Bader',
          price: '₹4500-5500',
          benefit: 'Intensive night treatment'
        },
        {
          name: 'Estée Lauder Advanced Night Repair Eye Cream',
          brand: 'Estée Lauder',
          price: '₹3000-3800',
          benefit: 'Premium anti-aging treatment'
        }
      ]
    };

    return treatments[budget] || treatments['mid-range'];
  }

  getWhyRecommendations(skinType, concerns, lifestyle) {
    const whyData = {
      cleanserWhy: 'A gentle cleanser removes impurities without stripping natural oils.',
      tonerWhy: 'Toner balances pH and prepares skin to absorb serums and moisturizers.',
      essenceWhy: 'Serums target specific concerns with concentrated active ingredients.',
      moisturizerWhy: 'Moisturizer locks in hydration and strengthens the skin barrier.',
      sunscreenWhy: 'Daily SPF protection prevents sun damage, aging, and skin cancer.',
      treatmentWhy: 'Weekly treatments boost results by addressing deeper concerns.'
    };

    if (concerns.includes('acne')) {
      whyData.tonerWhy = 'An oil-control toner helps balance sebum and prevent breakouts.';
      whyData.essenceWhy = 'Targeted serums with salicylic acid or niacinamide control acne.';
    }

    if (concerns.includes('sensitivity')) {
      whyData.cleanserWhy = 'A gentle, fragrance-free cleanser soothes and protects sensitive skin.';
      whyData.tonerWhy = 'Alcohol-free toners reduce irritation and calm inflammation.';
    }

    if (concerns.includes('dryness')) {
      whyData.essenceWhy = 'Hydrating serums with hyaluronic acid deeply moisturize skin.';
      whyData.moisturizerWhy = 'Rich moisturizers with ceramides repair and protect the barrier.';
    }

    if (concerns.includes('aging')) {
      whyData.essenceWhy = 'Anti-aging serums with retinol or vitamin C boost collagen production.';
      whyData.treatmentWhy = 'Weekly masks with peptides and antioxidants reduce fine lines.';
    }

    if (lifestyle === 'active-outdoor') {
      whyData.sunscreenWhy = 'High-SPF, sweat-resistant sunscreen is essential for active lifestyles.';
    }

    return whyData;
  }

  getTips(skinType, concerns, lifestyle) {
    const tips = [
      '🌞 Always use SPF 30+ daily to prevent premature aging and sun damage',
      '💧 Drink plenty of water to keep skin hydrated from within',
      '😴 Get 7-9 hours of sleep - your skin repairs itself at night',
      '🧴 Use products consistently for 4-6 weeks to see real results',
    ];

    if (skinType === 'oily') {
      tips.push('🎯 Blot oil throughout the day with blotting papers instead of powder');
      tips.push('🧼 Double cleanse in the evening to remove oil and impurities');
    }

    if (skinType === 'dry') {
      tips.push('💨 Use a humidifier to add moisture to the air');
      tips.push('🌊 Apply moisturizer to damp skin for better absorption');
    }

    if (skinType === 'sensitive') {
      tips.push('🔴 Patch test new products before applying to face');
      tips.push('⏸️ Introduce one new product at a time, waiting 1-2 weeks between');
    }

    if (concerns.includes('acne')) {
      tips.push('🛏️ Change your pillowcase every 2-3 days to prevent bacterial buildup');
      tips.push('🤚 Avoid touching your face throughout the day');
      tips.push('🧴 Don\'t over-exfoliate - it can worsen acne');
    }

    if (concerns.includes('aging')) {
      tips.push('🌙 Use retinol products at night to minimize sun sensitivity');
      tips.push('🍎 Eat antioxidant-rich foods like berries and dark leafy greens');
    }

    if (lifestyle === 'active-outdoor') {
      tips.push('💦 Reapply sunscreen every 2 hours during outdoor activities');
      tips.push('🧴 Use a water-resistant sunscreen for exercise');
    }

    if (lifestyle === 'desk-job') {
      tips.push('🖥️ Use a blue light filter on your screen to protect skin');
      tips.push('🚶 Take breaks from screens to reduce skin stress');
    }

    return tips;
  }

  getMorningRoutine(concerns) {
    return [
      '<strong>Cleanser:</strong> Rinse face with lukewarm water or use a gentle cleanser',
      '<strong>Toner:</strong> Apply toner to balance skin pH (optional)',
      '<strong>Serum:</strong> Apply targeted serum for your main concern',
      '<strong>Moisturizer:</strong> Lock in hydration with a lightweight moisturizer',
      '<strong>Sunscreen:</strong> Always finish with SPF 30+ sunscreen (non-negotiable!)'
    ];
  }

  getEveningRoutine(concerns) {
    const routine = [
      '<strong>Cleanser:</strong> Double cleanse if wearing makeup (oil cleanser first, then water-based)',
      '<strong>Toner:</strong> Apply toner to balance pH and prep skin',
      '<strong>Serum:</strong> Apply targeted serum for your concerns',
      '<strong>Moisturizer:</strong> Use a richer night cream for overnight recovery',
    ];

    if (concerns.includes('aging')) {
      routine.push('<strong>Treatment:</strong> Apply retinol or peptide products (3x per week, 2-3x per week to start)');
    }

    if (concerns.includes('acne')) {
      routine.push('<strong>Treatment:</strong> Apply spot treatment or mask 2-3x per week');
    }

    routine.push('<strong>Eye Cream:</strong> Gently pat under-eye area with eye cream');

    return routine;
  }

  displayRoutineCard(elementId, products) {
    const productsContainer = document.getElementById(`${elementId}Products`);
    const whyContainer = document.getElementById(`${elementId}Why`);

    // Display products
    productsContainer.innerHTML = '';
    products.forEach(product => {
      const productHTML = `
        <div class="product-item">
          <div class="product-name">${product.name}</div>
          <div class="product-brand">${product.brand}</div>
          <div class="product-price">${product.price}</div>
          <div class="product-benefit">✓ ${product.benefit}</div>
        </div>
      `;
      productsContainer.innerHTML += productHTML;
    });

    // Display why section
    const whyKey = `${elementId}Why`;
    const whyText = this[whyKey] || 'Tailored to your skin needs.';
    whyContainer.innerHTML = `<strong>Why this step?</strong> ${whyText}`;
  }

  displayTips(tips) {
    const tipsContainer = document.getElementById('tipsContainer');
    tipsContainer.innerHTML = '';
    tips.forEach(tip => {
      const li = document.createElement('li');
      li.innerHTML = tip;
      tipsContainer.appendChild(li);
    });
  }

  displayRoutineSchedule(morningRoutine, eveningRoutine) {
    const morningContainer = document.getElementById('morningRoutine');
    const eveningContainer = document.getElementById('eveningRoutine');

    morningContainer.innerHTML = '';
    morningRoutine.forEach(step => {
      const li = document.createElement('li');
      li.innerHTML = step;
      morningContainer.appendChild(li);
    });

    eveningContainer.innerHTML = '';
    eveningRoutine.forEach(step => {
      const li = document.createElement('li');
      li.innerHTML = step;
      eveningContainer.appendChild(li);
    });
  }

  backToQuiz() {
    this.quizSection.classList.remove('hidden');
    this.resultsSection.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SkinQuiz();
});
