// AI Skincare Advisor Knowledge Base
const adviceDatabase = {
  // Dry Skin Advice
  dry: {
    routine: `For dry skin, here's a basic routine:
    
**Morning:**
1. Gentle cleanser (avoid sulfates)
2. Hydrating toner or essence
3. Lightweight hydrating serum
4. Nourishing moisturizer
5. SPF 30+ sunscreen

**Evening:**
1. Oil-based or cream cleanser
2. Hydrating toner or essence
3. Richer serum (hyaluronic acid, ceramides)
4. Heavier night cream or facial oil

**Weekly (1-2x):**
- Gentle hydrating mask`,
    keyIngredients: [
      'Hyaluronic Acid - hydration powerhouse',
      'Ceramides - repair moisture barrier',
      'Glycerin - humectant',
      'Niacinamide - soothing & barrier repair',
      'Panthenol - skin softening',
    ],
    avoid: ['Alcohol-based products', 'Strong actives', 'Physical exfoliation'],
    recommendations: {
      cleanser: 'CeraVe Hydrating Cleanser, Vanicream Gentle Facial Cleanser',
      serum: 'Ordinary Hyaluronic Acid, Purito Deep Sea Pure Water Cream',
      moisturizer: 'CeraVe Moisturizing Cream, Cetaphil Rich Hydrating Night Cream',
      mask: 'Laneige Water Sleeping Mask, Purito Deep Sea Mask',
    },
  },

  // Oily Skin Advice
  oily: {
    routine: `For oily skin, here's an effective routine:

**Morning:**
1. Gel or foam cleanser
2. Lightweight toner
3. Mattifying serum (niacinamide)
4. Lightweight gel moisturizer
5. Oil-free SPF 30+ sunscreen

**Evening:**
1. Double cleanse: Oil cleanser → water-based cleanser
2. Exfoliating toner (BHA like salicylic acid)
3. Lightweight serum
4. Gel moisturizer

**Weekly (2-3x):**
- Clay mask for oil control`,
    keyIngredients: [
      'Niacinamide - controls sebum & pores',
      'Salicylic Acid (BHA) - pore cleansing',
      'Tea Tree Oil - antimicrobial',
      'Zinc - oil control',
      'Charcoal - oil absorption',
    ],
    avoid: ['Heavy oils', 'Rich creams', 'Comedogenic products'],
    recommendations: {
      cleanser: 'CeraVe Foaming Cleanser, Neutrogena Hydro Boost Hydrating Cleansing Gel',
      serum: 'The Ordinary Niacinamide 10%, Purito Deep Sea Pure Water Cream',
      moisturizer: 'Gel moisturizer, Neutrogena Hydro Boost Hydrating Gel-Cream',
      mask: 'Clay masks, Aztec Secret Indian Healing Clay',
    },
  },

  // Combination Skin Advice
  combination: {
    routine: `For combination skin, balance is key:

**Morning:**
1. Gentle gel cleanser
2. Balancing toner
3. Lightweight serum
4. Lightweight gel moisturizer
5. SPF 30+ sunscreen

**Evening:**
1. Gentle cleanser (oil-based for dry areas, gel for oily)
2. Toner
3. Targeted serum (niacinamide + hydration)
4. Lightweight moisturizer (gel for T-zone, creamier for cheeks)

**Weekly (1-2x):**
- Gentle exfoliating mask`,
    keyIngredients: [
      'Niacinamide - balances oil & hydration',
      'Hyaluronic Acid - lightweight hydration',
      'Salicylic Acid - for oily zones',
      'Ceramides - barrier support',
    ],
    avoid: ['Overly heavy products', 'Extremely harsh actives'],
    recommendations: {
      cleanser: 'CeraVe Foaming Facial Cleanser, Vanicream Gentle Facial Cleanser',
      serum: 'The Ordinary Niacinamide 10%, Purito Deep Sea Pure Water Cream',
      moisturizer: 'CeraVe Moisturizing Lotion, Neutrogena Hydro Boost Gel-Cream',
      mask: 'Laneige Water Sleeping Mask, COSRX Hydrium Watery Toner Plus',
    },
  },

  // Sensitive Skin Advice
  sensitive: {
    routine: `For sensitive skin, minimalism is best:

**Morning:**
1. Fragrance-free gentle cleanser
2. Hydrating toner
3. Soothing serum (centella, allantoin)
4. Barrier-repair moisturizer
5. SPF 30+ mineral sunscreen

**Evening:**
1. Gentle milky cleanser
2. Hydrating toner
3. Soothing serum
4. Rich barrier cream

**Weekly (1x or less):**
- Gentle hydrating mask only`,
    keyIngredients: [
      'Ceramides - barrier repair',
      'Centella Asiatica - soothing',
      'Allantoin - healing',
      'Panthenol - protective',
      'Hyaluronic Acid - gentle hydration',
    ],
    avoid: [
      'Fragrance & essential oils',
      'Alcohol',
      'Strong acids (AHA/BHA)',
      'Vitamin C',
    ],
    recommendations: {
      cleanser: 'Vanicream Gentle Facial Cleanser, Purito Deep Sea Pure Water Cream',
      serum: 'Purito Deep Sea Pure Water Cream, COSRX Hydrium Watery Toner Plus',
      moisturizer: 'CeraVe Moisturizing Cream, Aesop Hydrating Facial Cream',
      mask: 'Laneige Water Sleeping Mask, I\'m from Mugwort Mask',
    },
  },

  // Acne-Prone Advice
  acne: {
    routine: `For acne-prone skin:

**Morning:**
1. Gentle cleanser
2. BHA toner (salicylic acid)
3. Lightweight hydrating serum
4. Non-comedogenic moisturizer
5. Non-comedogenic SPF 30+ sunscreen

**Evening:**
1. Oil cleanser
2. Gentle water-based cleanser
3. BHA exfoliant (start 2-3x weekly)
4. Spot treatment (benzoyl peroxide or salicylic acid)
5. Lightweight moisturizer

**Weekly (1-2x):**
- Clay or acne mask`,
    keyIngredients: [
      'Salicylic Acid (BHA) - pore clearing',
      'Niacinamide - sebum control & anti-inflammatory',
      'Benzoyl Peroxide - acne fighting',
      'Tea Tree Oil - antimicrobial',
    ],
    avoid: [
      'Heavy oils',
      'Comedogenic products',
      'Over-exfoliation',
      'Skipping moisturizer',
    ],
    recommendations: {
      cleanser: 'CeraVe Foaming Cleanser, Neutrogena Hydro Boost Cleansing Gel',
      bha: 'Paula\'s Choice 2% BHA Liquid, Cosrx BHA Blackhead Power Liquid',
      treatment: 'The Ordinary Salicylic Acid, Neutrogena On-The-Spot Acne Treatment',
      moisturizer: 'CeraVe PM Facial Moisturizing Lotion, Neutrogena Hydro Boost Gel',
    },
  },

  // Hyperpigmentation Advice
  hyperpigmentation: {
    routine: `For hyperpigmentation and dark spots:

**Morning:**
1. Gentle cleanser
2. Vitamin C serum
3. Niacinamide serum
4. Hydrating moisturizer
5. SPF 50+ sunscreen (most important!)

**Evening:**
1. Gentle cleanser
2. Niacinamide serum
3. Retinol (start slow, 2x weekly)
4. Heavier moisturizer

**Weekly (2-3x):**
- Gentle exfoliating mask`,
    keyIngredients: [
      'Vitamin C - brightening',
      'Niacinamide - even tone',
      'Retinol - cell turnover',
      'Alpha Arbutin - melanin inhibitor',
      'Kojic Acid - lightening',
    ],
    avoid: ['Sun exposure', 'Using retinol without SPF', 'Over-exfoliation'],
    recommendations: {
      vitaminC: 'The Ordinary Vitamin C Powder, Timeless Vitamin C Serum',
      treatment: 'The Ordinary Niacinamide, Paula\'s Choice 10% Niacinamide Booster',
      retinol: 'The Ordinary Retinol 0.2%, Neutrogena Rapid Tone Repair',
      sunscreen: 'La Roche Posay Anthelios SPF 60, Canmake Mermaid Skin Gel',
    },
  },

  // Anti-Aging Advice
  antiage: {
    routine: `For anti-aging and mature skin:

**Morning:**
1. Gentle cleanser
2. Antioxidant serum (Vitamin C or niacinamide)
3. Peptide serum
4. Hydrating moisturizer
5. SPF 30+ sunscreen

**Evening:**
1. Oil cleanser
2. Gentle cleanser
3. Retinol or peptide serum
4. Rich night cream with hyaluronic acid

**Weekly (1-2x):**
- Hydrating or brightening mask`,
    keyIngredients: [
      'Retinol/Retinoids - cell renewal',
      'Vitamin C - antioxidant & brightening',
      'Peptides - collagen support',
      'Hyaluronic Acid - hydration',
      'Niacinamide - skin firmness',
    ],
    avoid: ['Skipping SPF', 'Harsh actives', 'Over-using strong ingredients'],
    recommendations: {
      retinol: 'The Ordinary Retinol 0.5%, Neutrogena Rapid Tone Repair',
      peptide: 'The Ordinary Matrixyl 10%, CeraVe Pro Retinol Serum',
      moisturizer: 'Olay Regenerist Micro-Sculpting Cream, CeraVe Eye Repair Cream',
      nightCream: 'Laneige Water Sleeping Mask, Cetaphil Rich Hydrating Night Cream',
    },
  },
};

// Product Knowledge Base
const productDatabase = {
  // Cleansers
  'cerave cleanser': {
    name: 'CeraVe Hydrating Cleanser',
    type: 'Cleanser',
    price: '$',
    benefits: 'Gentle, fragrance-free, contains ceramides and hyaluronic acid',
    bestFor: 'Dry, sensitive, combination skin',
    review: '⭐⭐⭐⭐⭐ Best-seller for good reason. Won\'t strip skin or cause irritation.',
  },
  'cerave foaming cleanser': {
    name: 'CeraVe Foaming Cleanser',
    type: 'Cleanser',
    price: '$',
    benefits: 'Gel-based, oil-control, ceramides, hyaluronic acid',
    bestFor: 'Oily, acne-prone, combination skin',
    review: '⭐⭐⭐⭐⭐ Lightweight without stripping. Great for daily use.',
  },
  'double cleanse': {
    name: 'Double Cleanse Method',
    type: 'Cleansing Technique',
    price: 'Varies',
    benefits: 'First step removes makeup/sunscreen, second step cleanses skin thoroughly',
    bestFor: 'All skin types',
    review: 'Oil or balm cleanser first, then water-based cleanser. Korean beauty staple!',
  },

  // Serums & Essences
  'niacinamide': {
    name: 'The Ordinary Niacinamide 10%',
    type: 'Serum',
    price: '$',
    benefits: 'Controls sebum, reduces redness, strengthens barrier',
    bestFor: 'Oily, combination, acne-prone skin',
    review: '⭐⭐⭐⭐⭐ Best value for money. Game-changer for oily/acne skin.',
  },
  'vitamin c serum': {
    name: 'Vitamin C Serums',
    type: 'Serum',
    price: '$ - $$$',
    benefits: 'Brightening, antioxidant, fights hyperpigmentation, anti-aging',
    bestFor: 'All skin types, especially dull/tired skin',
    review: 'Recommended brands: Timeless, Drunk Elephant, Skinceuticals (premium).',
  },
  'hyaluronic acid': {
    name: 'Hyaluronic Acid Serums',
    type: 'Serum',
    price: '$ - $$',
    benefits: 'Deep hydration, plumping, lightweight',
    bestFor: 'All skin types, especially dry/dehydrated',
    review: 'Look for "Sodium Hyaluronate" in ingredients. Apply to damp skin!',
  },
  'retinol': {
    name: 'Retinol Products',
    type: 'Treatment Serum',
    price: '$ - $$$',
    benefits: 'Anti-aging, cell turnover, collagen production, brightening',
    bestFor: 'Anti-aging, hyperpigmentation, acne',
    review: 'Start low (0.2%) and build tolerance. Always use SPF during day!',
  },

  // Moisturizers
  'gel moisturizer': {
    name: 'Gel Moisturizers',
    type: 'Moisturizer',
    price: '$ - $$',
    benefits: 'Lightweight, oil-free, hydrating without heaviness',
    bestFor: 'Oily, combination, acne-prone skin',
    review: 'Neutrogena Hydro Boost, Purito, COSRX are great options.',
  },
  'cream moisturizer': {
    name: 'Cream Moisturizers',
    type: 'Moisturizer',
    price: '$ - $$$',
    benefits: 'Rich, nourishing, barrier repair, deeply moisturizing',
    bestFor: 'Dry, sensitive, mature skin',
    review: 'CeraVe Moisturizing Cream, Cetaphil, La Roche-Posay are excellent.',
  },

  // Treatments
  'sunscreen': {
    name: 'Sunscreen (SPF 30+)',
    type: 'Essential Protection',
    price: '$ - $$',
    benefits: 'UV protection, prevents aging, prevents hyperpigmentation',
    bestFor: 'All skin types (EVERY DAY)',
    review: '🚨 Most important step! Non-negotiable for skincare success.',
  },
  'bha exfoliant': {
    name: 'BHA (Salicylic Acid)',
    type: 'Exfoliant',
    price: '$ - $$',
    benefits: 'Clears pores, exfoliates, acne control, reduces breakouts',
    bestFor: 'Oily, acne-prone, combination skin',
    review: 'Paula\'s Choice 2%, COSRX Blackhead Power - start 2-3x weekly.',
  },
  'aha exfoliant': {
    name: 'AHA (Glycolic/Lactic Acid)',
    type: 'Exfoliant',
    price: '$ - $$',
    benefits: 'Surface exfoliation, brightening, even skin tone, anti-aging',
    bestFor: 'Dry, hyperpigmentation, dull skin',
    review: 'Gentler than BHA. The Ordinary, Paula\'s Choice are affordable options.',
  },

  // Masks
  'sheet mask': {
    name: 'Sheet Masks',
    type: 'Treatment Mask',
    price: '$',
    benefits: 'Hydration boost, targeted treatment, relaxing',
    bestFor: 'All skin types - use 1-2x weekly',
    review: 'Laneige, Purito, SNP - affordable and effective.',
  },
  'sleeping mask': {
    name: 'Sleeping Masks/Night Cream',
    type: 'Treatment Mask',
    price: '$ - $$$',
    benefits: 'Intensive overnight hydration, repair',
    bestFor: 'Dry, dehydrated, mature skin',
    review: 'Laneige Water Sleeping Mask is THE classic. Life-changing!',
  },
};

// Chat responses based on keywords
function generateAIResponse(userMessage) {
  const message = userMessage.toLowerCase();

  // Greeting responses
  if (
    message.match(
      /^(hi|hello|hey|good morning|good afternoon|good evening)/
    )
  ) {
    return `👋 Hello! I'm so glad you're here. I'm your SkinWise AI Advisor, ready to help you build the perfect skincare routine!

To give you the best recommendations, could you tell me:
1. What's your **skin type** (dry, oily, combination, sensitive)?
2. What are your main **concerns** (acne, hyperpigmentation, anti-aging, etc.)?
3. Any **specific issues** you're dealing with right now?

You can also ask me about **specific products or brands**!`;
  }

  // Product vs product comparison (CHECK BEFORE PRODUCT DATABASE!)
  if (message.match(/vs|compare|better|which|difference/i)) {
    return `Great question! Let me help you compare:

**Common Comparisons:**

**Retinol vs Niacinamide:**
- **Retinol**: Anti-aging powerhouse, cell turnover, stronger but can irritate
- **Niacinamide**: Gentler, oil-control, redness reduction, good for sensitive skin
→ You can use BOTH together! Niacinamide is more beginner-friendly

**BHA vs AHA:**
- **BHA (Salicylic Acid)**: Exfoliates inside pores, best for oily/acne skin
- **AHA (Glycolic Acid)**: Surface exfoliation, best for dry/dull skin
→ Don't mix! Use one or the other, 2-3x weekly

**Gel vs Cream Moisturizer:**
- **Gel**: Lightweight, oil-free, fast-absorbing (oily skin 👍)
- **Cream**: Rich, nourishing, barrier repair (dry skin 👍)
→ Pick based on your skin type!

What specific products are you comparing?`;
  }

  // Budget-friendly recommendations
  if (message.match(/budget|affordable|cheap|inexpensive|budget-friendly|under/i)) {
    return `💰 **Budget-Friendly Skincare Routine**

Great news! You DON'T need expensive products for great skin. Here are affordable powerhouses:

**Best Budget Brands:**
- **The Ordinary** ($) - Niacinamide, Retinol, Hyaluronic Acid
- **CeraVe** ($) - Cleansers, Moisturizers
- **Neutrogena** ($) - Cleansers, Sunscreen, Moisturizers
- **Purito** ($ - $$) - Essences, Sheet Masks
- **COSRX** ($ - $$) - BHA, Serums, Essences

**Budget Routine (under $50 total):**
1. Cleanser: CeraVe ($)
2. Niacinamide Serum: The Ordinary ($)
3. Moisturizer: Neutrogena Gel ($)
4. Sunscreen: Neutrogena ($)

**Pro Tip:** Expensive ≠ Better! Consistency matters more than price.

What's your skin concern? I can build a cheap & effective routine!`;
  }

  // Premium/luxury product info
  if (message.match(/premium|luxury|expensive|high-end|splurge|treat yourself/i)) {
    return `✨ **Premium Skincare Recommendations**

If you want to invest in luxury products:

**Worth the Splurge:**
- **Skinceuticals Vitamin C**: Premium antioxidant ($160+)
- **Crème de la Mer Moisturizer**: Ultra-rich, iconic ($$)
- **SK-II Essence**: Cult favorite, transforms skin ($$)
- **La Roche-Posay Sunscreen SPF 60**: Dermatologist favorite ($)
- **Estée Lauder Advanced Night Repair**: Anti-aging classic ($$$)

**Good Value Premium:**
- **Aesop Moisturizer**: Luxury feel, ethical ($)
- **Laneige Water Sleeping Mask**: Travel-worthy, effective ($$)

**Remember:** Premium doesn't always mean better results. The most expensive product won't work if it's wrong for your skin type!

What's your skin concern? I can suggest premium options.`;
  }

  // Asian beauty products
  if (message.match(/korean|japanese|asian|k-beauty|j-beauty|chinese skincare/i)) {
    return `🌸 **Asian Beauty Skincare**

Asian beauty revolutionized skincare! Some must-try products:

**Korean Beauty (K-Beauty):**
- **COSRX**: BHA, AHA, essences (affordable & effective)
- **Purito**: Gentle, nature-based, non-irritating
- **Laneige**: Water Sleeping Mask, BB Cream
- **SNP/Dr. Jart+**: Sheet masks, barrier repair

**Japanese Beauty (J-Beauty):**
- **SK-II Facial Treatment Essence**: Cult favorite ($$)
- **Hada Labo Lotion**: Hyaluronic acid staple
- **Canmake**: Affordable SPF, makeup

**Chinese Skincare:**
- **Shanghai Herborist**: Heritage skincare
- **Proya**: K-beauty competitor

**K-Beauty Routine Order (different from Western!):**
1. Oil cleanser
2. Water cleanser
3. Toner/Essence
4. Sheet mask (optional)
5. Serum
6. Emulsion (light moisturizer)
7. Cream
8. Sunscreen (morning)

Want specific recommendations for your skin type?`;
  }

  // Product-specific queries (NOW CHECK PRODUCT DATABASE)
  for (const [key, product] of Object.entries(productDatabase)) {
    if (message.includes(key)) {
      return `**${product.name}**

📌 **Type:** ${product.type}
💰 **Price:** ${product.price}
✨ **Benefits:** ${product.benefits}
👤 **Best For:** ${product.bestFor}
⭐ **Review:** ${product.review}

Would you like recommendations for specific concerns or skin types?`;
    }
  }

  // Dry skin queries
  if (
    message.match(
      /dry|dehydrat|desert|flak|tight|rough|parched/
    )
  ) {
    return formatAdvice(adviceDatabase.dry, 'Dry Skin');
  }

  // Oily skin queries
  if (
    message.match(
      /oily|greasy|shine|sebum|pore|t-zone|breakout/
    ) &&
    !message.match(/combination/)
  ) {
    return formatAdvice(adviceDatabase.oily, 'Oily Skin');
  }

  // Combination skin queries
  if (message.match(/combination|combo|both dry|both oily|t-zone/)) {
    return formatAdvice(adviceDatabase.combination, 'Combination Skin');
  }

  // Sensitive skin queries
  if (
    message.match(
      /sensitive|irritat|react|redness|inflam|burn|sting/
    )
  ) {
    return formatAdvice(adviceDatabase.sensitive, 'Sensitive Skin');
  }

  // Acne queries
  if (message.match(/acne|pimple|breakout|spot|blemish|congestion/)) {
    return formatAdvice(adviceDatabase.acne, 'Acne-Prone Skin');
  }

  // Hyperpigmentation queries
  if (
    message.match(
      /dark spot|hyperpigment|uneven tone|melasma|sun damage|brown spot/
    )
  ) {
    return formatAdvice(adviceDatabase.hyperpigmentation, 'Hyperpigmentation');
  }

  // Anti-aging queries
  if (
    message.match(
      /anti-aging|wrinkle|fine line|aging|mature|collagen|elastin|firming/
    )
  ) {
    return formatAdvice(adviceDatabase.antiage, 'Anti-Aging');
  }

  // Ingredient questions
  if (message.match(/ingredient|what is|what does|how does|benefit of/)) {
    return `Great question about skincare ingredients! 

I can help explain specific ingredients. Some popular ones:
- **Retinol**: Anti-aging powerhouse that boosts cell turnover
- **Niacinamide**: Balances oil, reduces redness, strengthens barrier
- **Hyaluronic Acid**: Holds moisture for plump, hydrated skin
- **Salicylic Acid (BHA)**: Exfoliates inside pores, great for acne
- **Ceramides**: Repair and strengthen skin barrier
- **Vitamin C**: Brightening antioxidant for glowing skin

Which ingredient would you like to know more about? Or try our **Ingredient Decoder** page to analyze any product!`;
  }

  // Routine questions
  if (message.match(/routine|step|order|how many|morning|evening|night/)) {
    return `A good skincare routine typically follows this order:

**Morning:**
1. Cleanser
2. Toner/Essence
3. Serums (active ingredients)
4. Moisturizer
5. Sunscreen (crucial!)

**Evening:**
1. Cleanser (double cleanse is ideal)
2. Toner/Essence
3. Serums & treatments
4. Moisturizer (can be heavier)

The exact products depend on your skin type and concerns. Tell me more about your skin, and I'll create a personalized routine for you!`;
  }

  // Frequency questions
  if (message.match(/how often|frequency|per week|times a week|when|how many times/)) {
    return `Here's a general guide for product frequency:

**Daily (Morning & Evening):**
- Cleanser, moisturizer, sunscreen (AM only)

**Daily or Every Other Day:**
- Serums, essences

**2-3 Times Weekly:**
- Exfoliants (AHA/BHA), actives like retinol
- Masks

**As Needed:**
- Spot treatments
- Sheet masks

⚠️ **Important**: Start slow when introducing new actives! Begin with 1-2x weekly and gradually increase. Always patch test first.

What specific products are you wondering about?`;
  }

  // Product recommendations
  if (message.match(/recommend|product|brand|what should|suggest|try|best|good product/)) {
    return `I'd love to recommend products for you! To give you the best suggestions, tell me:

1. **Your skin type** (dry, oily, combination, sensitive)
2. **Your main concern** (acne, dryness, anti-aging, etc.)
3. **Your budget** (budget-friendly, mid-range, premium)
4. **Any ingredients to avoid** (fragrance, alcohol, etc.)

Or ask about specific products/brands:
- "Best cleanser for oily skin?"
- "Is The Ordinary good?"
- "Retinol recommendations?"
- "Compare CeraVe vs Cetaphil"

You can also check out:
- 🔬 Our **Ingredient Decoder** to analyze specific products
- 📝 Our **Skin Quiz** for personalized routine recommendations`;
  }

  // Default helpful response
  return `I appreciate your question! 😊 

I can help with:
✓ **Specific product** recommendations & reviews
✓ **Brand comparisons** (The Ordinary vs CeraVe, etc.)
✓ **Skincare routines** for your skin type
✓ **Ingredient information** & benefits
✓ **Product combination** advice
✓ **Budget skincare** routines
✓ **Luxury product** suggestions
✓ **Asian beauty** recommendations

Tell me:
- Your **skin type** (dry, oily, combination, sensitive)
- Your **main concerns** (acne, dryness, aging, etc.)
- **Specific products** you want to know about
- Your **budget** preference

What can I help you with?`;
}

function formatAdvice(advice, title) {
  return `**${title} Skincare Routine**

${advice.routine}

**Key Ingredients for Your Skin:**
${advice.keyIngredients.map((ing) => `• ${ing}`).join('\n')}

**Ingredients to Avoid:**
${advice.avoid.map((item) => `• ${item}`).join('\n')}

**Recommended Products:**
${
  advice.recommendations
    ? Object.entries(advice.recommendations)
        .map(([category, products]) => `• **${category}**: ${products}`)
        .join('\n')
    : 'Coming soon!'
}

Would you like more details about any of these, or do you have specific questions about your routine?`;
}

// Chat functionality
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');
const quickPromptBtns = document.querySelectorAll('.quick-prompt-btn');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = userInput.value.trim();

  if (!message) return;

  // Add user message
  addMessage(message, 'user');
  userInput.value = '';

  // Show typing indicator
  showTypingIndicator();

  // Generate AI response after a short delay
  setTimeout(() => {
    removeTypingIndicator();
    const response = generateAIResponse(message);
    addMessage(response, 'bot');
  }, 800);
});

quickPromptBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const prompt = btn.dataset.prompt;
    userInput.value = prompt;
    chatForm.dispatchEvent(new Event('submit'));
  });
});

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = markdownToHTML(text);

  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot-message';
  messageDiv.id = 'typing-indicator';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;

  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

function markdownToHTML(text) {
  // Convert markdown-like syntax to HTML
  let html = text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Line breaks
    .replace(/\n/g, '<br/>');

  // Convert bullet points and numbering
  const lines = html.split('<br/>');
  const processed = lines
    .map((line) => {
      // Convert • to bullets
      if (line.trim().startsWith('•')) {
        return `<li>${line.trim().slice(1).trim()}</li>`;
      }
      // Convert numbered lists
      if (line.trim().match(/^\d+\./)) {
        return line;
      }
      return line;
    })
    .join('\n');

  return processed;
}
