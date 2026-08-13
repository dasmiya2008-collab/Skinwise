// Climate Adapter Management
class ClimateAdapter {
  constructor() {
    this.storageKey = 'skinWiseClimate';
    this.initEventListeners();
  }

  initEventListeners() {
    const climateForm = document.getElementById('climateForm');
    const resetBtn = document.getElementById('resetAdapterBtn');

    climateForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    resetBtn.addEventListener('click', () => this.resetForm());
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(document.getElementById('climateForm'));
    const climateData = {
      location: formData.get('location'),
      season: formData.get('season'),
      humidity: formData.get('humidity'),
      temperature: formData.get('temperature'),
      pollution: formData.get('pollution'),
      uvIndex: formData.get('uvIndex'),
    };

    // Save to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(climateData));

    // Generate recommendations
    this.generateRecommendations(climateData);
  }

  generateRecommendations(climateData) {
    const recommendations = this.getRecommendations(climateData);

    // Display climate summary
    document.getElementById('summaryLocation').textContent = climateData.location;
    document.getElementById('summaryDetails').textContent = 
      `${this.getSeasonLabel(climateData.season)} • ${this.getHumidityLabel(climateData.humidity)}`;

    // Display recommendations
    document.getElementById('cleanserRec').innerHTML = recommendations.cleanser;
    document.getElementById('tonerRec').innerHTML = recommendations.toner;
    document.getElementById('serumRec').innerHTML = recommendations.serum;
    document.getElementById('moisturizerRec').innerHTML = recommendations.moisturizer;
    document.getElementById('sunscreenRec').innerHTML = recommendations.sunscreen;
    document.getElementById('treatmentsRec').innerHTML = recommendations.treatments;

    // Display tips
    this.displayTips(recommendations.tips);

    // Show recommendations section
    document.getElementById('recommendations').classList.remove('hidden');
    document.getElementById('recommendations').scrollIntoView({ behavior: 'smooth' });
  }

  getRecommendations(climateData) {
    const season = climateData.season;
    const humidity = climateData.humidity;
    const temperature = climateData.temperature;
    const pollution = climateData.pollution;
    const uvIndex = climateData.uvIndex;

    let recommendations = {
      cleanser: '',
      toner: '',
      serum: '',
      moisturizer: '',
      sunscreen: '',
      treatments: '',
      tips: []
    };

    // Summer recommendations
    if (season === 'summer') {
      recommendations.cleanser = `<strong>Gel or Foam Cleanser</strong><br>
        Opt for oil-control cleansers with salicylic acid or tea tree oil. Brands: Cetaphil, Neutrogena Oil-Free Acne Wash.`;
      
      recommendations.toner = `<strong>Hydrating & Balancing Toner</strong><br>
        Use alcohol-free toners with witch hazel or niacinamide to balance oil production.`;
      
      recommendations.serum = `<strong>Lightweight Hydrating Serum</strong><br>
        Hyaluronic acid or glycerin-based serums that don't feel heavy. The Ordinary Hyaluronic Acid.`;
      
      recommendations.moisturizer = `<strong>Lightweight Gel Moisturizer</strong><br>
        Choose water-based, oil-free formulas. CeraVe Hydrating Facial Lotion or Neutrogena Hydro Boost.`;
      
      recommendations.sunscreen = `<strong>High SPF, Sweat-Resistant Sunscreen</strong><br>
        Use SPF 50+ that's water-resistant. Reapply every 2 hours. Neutrogena Ultra Sheer Dry-Touch, Sunshield.`;
      
      recommendations.treatments = `<strong>Exfoliating Treatments</strong><br>
        Use 2-3x weekly: BHA/salicylic acid for oil control. Paula's Choice 2% BHA Liquid.`;
      
      recommendations.tips = [
        'Use a cleansing sheet or blotting papers throughout the day',
        'Apply sunscreen every 2 hours if outdoors',
        'Stay hydrated - drink plenty of water',
        'Avoid heavy creams that trap heat',
        'Consider a face mist for hydration without adding oil',
        'Use an oil-absorbing primer before makeup'
      ];
    }

    // Monsoon recommendations
    else if (season === 'monsoon') {
      recommendations.cleanser = `<strong>Antibacterial Gentle Cleanser</strong><br>
        Use mild cleansers with antibacterial properties to prevent fungal infections. Dove, CeraVe Hydrating Cleanser.`;
      
      recommendations.toner = `<strong>Clarifying Toner</strong><br>
        With tea tree oil or niacinamide to prevent breakouts from moisture buildup.`;
      
      recommendations.serum = `<strong>Oil-Control & Antibacterial Serum</strong><br>
        Niacinamide or tea tree oil based serums. The Ordinary Niacinamide 10% + Zinc 1%.`;
      
      recommendations.moisturizer = `<strong>Lightweight, Non-Comedogenic Moisturizer</strong><br>
        Gel-based formula that won't clog pores. Neutrogena Oil-Free Moisturizer.`;
      
      recommendations.sunscreen = `<strong>Water-Resistant, Humidity-Proof Sunscreen</strong><br>
        SPF 50+ with silicone base for sweat resistance. Reapply often due to humidity.`;
      
      recommendations.treatments = `<strong>Anti-Fungal & Oil-Control Masks</strong><br>
        Use clay masks 1-2x weekly to control excess moisture. Multani Mitti or Charcoal masks.`;
      
      recommendations.tips = [
        'Wash face 2-3x daily due to humidity and sweat',
        'Use oil-absorbing facial sheets',
        'Keep skincare products in cool, dry places',
        'Avoid heavy occlusive products',
        'Change pillowcase frequently to prevent bacterial growth',
        'Use an anti-fungal powder if prone to fungal infections'
      ];
    }

    // Winter recommendations
    else if (season === 'winter') {
      recommendations.cleanser = `<strong>Creamy or Milk Cleanser</strong><br>
        Avoid harsh cleansers that strip natural oils. Cetaphil Creamy Cleanser, Dove Cream Beauty Bar.`;
      
      recommendations.toner = `<strong>Hydrating & Soothing Toner</strong><br>
        With glycerin or rose water to add hydration. Skip alcohol-based toners.`;
      
      recommendations.serum = `<strong>Rich Hydrating Serum</strong><br>
        Hyaluronic acid, glycerin, or plant-based serums. CeraVe Hydrating Serum.`;
      
      recommendations.moisturizer = `<strong>Rich Cream Moisturizer</strong><br>
        Ceramide or oil-based moisturizers for intense hydration. CeraVe Moisturizing Cream.`;
      
      recommendations.sunscreen = `<strong>Daily Moisturizing Sunscreen SPF 30+</strong><br>
        Use sunscreen even in winter. Apply over moisturizer. Neutrogena Ultra Sheer.`;
      
      recommendations.treatments = `<strong>Nourishing Masks & Oils</strong><br>
        Use hydrating masks 1-2x weekly. Add a facial oil over moisturizer at night.`;
      
      recommendations.tips = [
        'Use humidifier indoors to combat dry air',
        'Apply moisturizer to damp skin for better absorption',
        'Use richer night creams',
        'Add a facial oil to your nighttime routine',
        'Avoid extreme temperature changes',
        'Drink more water to hydrate from within',
        'Use a sleep mask once a week for deep hydration'
      ];
    }

    // Spring recommendations
    else if (season === 'spring') {
      recommendations.cleanser = `<strong>Gentle Balancing Cleanser</strong><br>
        Mild formula suitable for variable skin conditions. CeraVe Foaming Cleanser.`;
      
      recommendations.toner = `<strong>Hydrating & Light Toner</strong><br>
        Balanced formula for mild temperatures. Rose water or witch hazel.`;
      
      recommendations.serum = `<strong>Lightweight Hydrating Serum</strong><br>
        Medium weight as temperatures increase. Hyaluronic acid with light hydration.`;
      
      recommendations.moisturizer = `<strong>Lightweight Lotion Moisturizer</strong><br>
        Transition from heavy creams to lighter formulas. Neutrogena Hydro Boost.`;
      
      recommendations.sunscreen = `<strong>Daily SPF 30-50 Sunscreen</strong><br>
        As sun exposure increases in spring. Apply regularly if outdoors.`;
      
      recommendations.treatments = `<strong>Gentle Exfoliation & Renewal</strong><br>
        Use light exfoliants to remove winter buildup. AHA or gentle BHA 1-2x weekly.`;
      
      recommendations.tips = [
        'Transition gradually from heavy to light products',
        'Start using sunscreen more regularly',
        'Use hydrating masks as transition treatment',
        'Watch for seasonal allergies affecting skin',
        'Increase water intake as temperatures rise',
        'Begin introducing lighter serums and oils'
      ];
    }

    // Humidity-specific adjustments
    if (humidity === 'very-high' || humidity === 'high') {
      if (recommendations.toner) {
        recommendations.toner += '<br><br><strong>Extra tip:</strong> Skip toner on days with excessive humidity.';
      }
      if (recommendations.moisturizer) {
        recommendations.moisturizer += '<br><br><strong>Extra tip:</strong> Use gel moisturizers instead of creams.';
      }
    } else if (humidity === 'very-low' || humidity === 'low') {
      if (recommendations.moisturizer) {
        recommendations.moisturizer += '<br><br><strong>Extra tip:</strong> Use heavier creams and add a facial oil.';
      }
    }

    // UV Index adjustments
    if (uvIndex === 'very-high' || uvIndex === 'extreme') {
      recommendations.tips.push('Use SPF 50+ and reapply every 2 hours during peak sun (11 AM - 3 PM)');
      recommendations.tips.push('Wear UV-protective clothing and accessories');
      recommendations.tips.push('Use antioxidant serums (Vitamin C, E) for UV protection');
    }

    // Pollution adjustments
    if (pollution === 'poor' || pollution === 'very-poor') {
      recommendations.cleanser += '<br><br><strong>Extra tip:</strong> Use a cleansing balm or micellar water to remove pollution particles.';
      recommendations.tips.push('Double cleanse: oil cleanser followed by water-based cleanser');
      recommendations.tips.push('Use antioxidant serums to combat free radical damage');
      recommendations.tips.push('Consider a detox face mask weekly');
    }

    return recommendations;
  }

  displayTips(tips) {
    const tipsList = document.getElementById('tipslist');
    tipsList.innerHTML = '';
    tips.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      tipsList.appendChild(li);
    });
  }

  resetForm() {
    document.getElementById('climateForm').reset();
    document.getElementById('recommendations').classList.add('hidden');
    document.getElementById('climateForm').scrollIntoView({ behavior: 'smooth' });
  }

  getSeasonLabel(season) {
    const seasons = {
      summer: '☀️ Summer',
      monsoon: '🌧️ Monsoon',
      winter: '❄️ Winter',
      spring: '🌸 Spring'
    };
    return seasons[season] || season;
  }

  getHumidityLabel(humidity) {
    const labels = {
      'very-low': '🏜️ Very Dry',
      'low': 'Dry',
      'moderate': 'Moderate',
      'high': 'Humid',
      'very-high': '💧 Very Humid'
    };
    return labels[humidity] || humidity;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ClimateAdapter();
});
