// Skin Journal Management
class SkinJournal {
  constructor() {
    this.storageKey = 'skinWiseJournal';
    this.entries = this.loadEntries();
    this.initEventListeners();
    this.displayEntries();
    this.updateInsights();
  }

  // Load entries from localStorage
  loadEntries() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Save entries to localStorage
  saveEntries() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
  }

  // Initialize event listeners
  initEventListeners() {
    const journalForm = document.getElementById('journalForm');
    const filterCondition = document.getElementById('filterCondition');
    const clearAllBtn = document.getElementById('clearAllBtn');

    journalForm.addEventListener('submit', (e) => this.handleAddEntry(e));
    filterCondition.addEventListener('change', () => this.displayEntries());
    clearAllBtn.addEventListener('click', () => this.handleClearAll());

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('entryDate').value = today;
  }

  // Handle adding new entry
  handleAddEntry(e) {
    e.preventDefault();

    const formData = new FormData(document.getElementById('journalForm'));
    const entry = {
      id: Date.now(),
      date: formData.get('entryDate'),
      skinCondition: formData.get('skinCondition'),
      hydration: formData.get('hydration'),
      breakouts: formData.get('breakouts'),
      irritation: formData.get('irritation'),
      productsUsed: formData.get('productsUsed'),
      notes: formData.get('notes'),
      createdAt: new Date().toISOString(),
    };

    // Check if entry for this date exists
    const existingIndex = this.entries.findIndex(
      (e) => e.date === entry.date
    );

    if (existingIndex !== -1) {
      // Update existing entry
      this.entries[existingIndex] = { ...this.entries[existingIndex], ...entry };
      this.showNotification('Entry updated!');
    } else {
      // Add new entry
      this.entries.unshift(entry);
      this.showNotification('Entry saved!');
    }

    // Sort by date (newest first)
    this.entries.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    this.saveEntries();
    document.getElementById('journalForm').reset();

    // Set today's date again
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('entryDate').value = today;

    this.displayEntries();
    this.updateInsights();
  }

  // Display entries
  displayEntries() {
    const entriesList = document.getElementById('entriesList');
    const filterValue = document.getElementById('filterCondition').value;

    let filteredEntries = this.entries;

    if (filterValue) {
      filteredEntries = this.entries.filter(
        (e) => e.skinCondition === filterValue
      );
    }

    if (filteredEntries.length === 0) {
      entriesList.innerHTML = `
        <div class="no-entries">
          <p>📔 ${filterValue ? 'No entries match this condition.' : 'No entries yet. Start tracking your skin journey today!'}</p>
        </div>
      `;
      return;
    }

    entriesList.innerHTML = filteredEntries
      .map((entry) => this.createEntryCard(entry))
      .join('');

    // Add delete listeners
    document.querySelectorAll('.entry-delete').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        this.deleteEntry(id);
      });
    });
  }

  // Create entry card HTML
  createEntryCard(entry) {
    const date = new Date(entry.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const conditionEmojis = {
      excellent: '🌟',
      great: '✨',
      good: '👍',
      okay: '😐',
      poor: '😞',
    };

    const hydrationEmojis = {
      'very-dry': '🏜️',
      dry: '💧',
      normal: '☁️',
      oily: '💦',
      'very-oily': '💧💧',
    };

    return `
      <div class="entry-card">
        <div class="entry-header">
          <span class="entry-date">📅 ${formattedDate}</span>
          <span class="entry-condition-badge condition-${entry.skinCondition}">
            ${conditionEmojis[entry.skinCondition]} ${this.capitalize(entry.skinCondition)}
          </span>
          <button class="entry-delete" data-id="${entry.id}" title="Delete entry">🗑️</button>
        </div>

        <div class="entry-metrics">
          <div class="metric">
            <span class="metric-label">Hydration</span>
            <span class="metric-value">${hydrationEmojis[entry.hydration]} ${this.capitalize(entry.hydration)}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Breakouts</span>
            <span class="metric-value">${entry.breakouts}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Irritation</span>
            <span class="metric-value">${this.capitalize(entry.irritation)}</span>
          </div>
        </div>

        ${entry.productsUsed ? `
          <div class="entry-products">
            <label class="entry-products-label">🧴 Products Used:</label>
            <div class="entry-products-text">${this.escapeHtml(entry.productsUsed)}</div>
          </div>
        ` : ''}

        ${entry.notes ? `
          <div class="entry-notes">
            <strong>Notes:</strong> ${this.escapeHtml(entry.notes)}
          </div>
        ` : ''}
      </div>
    `;
  }

  // Delete entry
  deleteEntry(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.entries = this.entries.filter((e) => e.id !== id);
      this.saveEntries();
      this.displayEntries();
      this.updateInsights();
      this.showNotification('Entry deleted');
    }
  }

  // Clear all entries
  handleClearAll() {
    if (
      confirm(
        'Are you sure? This will delete ALL your journal entries. This cannot be undone.'
      )
    ) {
      this.entries = [];
      this.saveEntries();
      this.displayEntries();
      this.updateInsights();
      this.showNotification('All entries deleted');
    }
  }

  // Update insights
  updateInsights() {
    const totalEntries = this.entries.length;
    const bestCondition = this.calculateBestCondition();
    const avgBreakouts = this.calculateAvgBreakouts();
    const weekEntries = this.calculateWeekEntries();

    document.getElementById('totalEntries').textContent = totalEntries;
    document.getElementById('bestCondition').textContent =
      bestCondition || '—';
    document.getElementById('avgBreakouts').textContent =
      avgBreakouts.toFixed(1);
    document.getElementById('weekEntries').textContent =
      `${weekEntries} entries`;
  }

  // Calculate best condition
  calculateBestCondition() {
    if (this.entries.length === 0) return null;

    const conditionRank = {
      excellent: 5,
      great: 4,
      good: 3,
      okay: 2,
      poor: 1,
    };

    const conditions = this.entries.map((e) => e.skinCondition);
    const bestConditionKey = conditions.reduce((best, current) => {
      return conditionRank[current] > (conditionRank[best] || 0)
        ? current
        : best;
    });

    return this.capitalize(bestConditionKey);
  }

  // Calculate average breakouts
  calculateAvgBreakouts() {
    if (this.entries.length === 0) return 0;

    const breakoutMap = {
      none: 0,
      '1-2': 1.5,
      '3-5': 4,
      '5+': 6,
    };

    const total = this.entries.reduce(
      (sum, e) => sum + (breakoutMap[e.breakouts] || 0),
      0
    );

    return total / this.entries.length;
  }

  // Calculate entries this week
  calculateWeekEntries() {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return this.entries.filter((e) => {
      const entryDate = new Date(e.date);
      return entryDate >= weekAgo && entryDate <= today;
    }).length;
  }

  // Utility: Capitalize string
  capitalize(str) {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Utility: Escape HTML
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Show notification
  showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--primary);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      font-weight: 600;
      z-index: 1000;
      animation: slideInRight 300ms ease;
      max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 300ms ease forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new SkinJournal();
});
