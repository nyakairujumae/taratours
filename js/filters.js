// ==========================================
// FILTERS & TOUR LISTING INTERACTIONS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // VIEW TOGGLE (Grid/List)
  // ==========================================
  const viewBtns = document.querySelectorAll('.view-btn');
  const toursGrid = document.querySelector('.tours-grid');
  
  if (viewBtns.length > 0 && toursGrid) {
    viewBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const view = this.getAttribute('data-view');
        
        // Update active button
        viewBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update grid view
        if (view === 'list') {
          toursGrid.classList.remove('grid-3');
          toursGrid.classList.add('list-view');
        } else {
          toursGrid.classList.add('grid-3');
          toursGrid.classList.remove('list-view');
        }
      });
    });
  }
  
  // ==========================================
  // WISHLIST TOGGLE
  // ==========================================
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      this.classList.toggle('active');
      const icon = this.querySelector('i');
      
      if (this.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
      }
    });
  });
  
  // ==========================================
  // RATING FILTER
  // ==========================================
  const ratingBtns = document.querySelectorAll('.rating-btn');
  
  ratingBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      ratingBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // ==========================================
  // FILTER RESET
  // ==========================================
  const resetBtn = document.querySelector('.filter-reset');
  
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      // Reset all checkboxes
      document.querySelectorAll('.checkbox-label input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
      
      // Reset price range
      document.querySelectorAll('.price-range input').forEach((input, index) => {
        input.value = index === 0 ? '0' : '5000';
      });
      
      // Reset search
      const searchInput = document.querySelector('.filter-group .search-input input');
      if (searchInput) {
        searchInput.value = '';
      }
      
      // Reset rating
      ratingBtns.forEach(b => b.classList.remove('active'));
      if (ratingBtns[3]) {
        ratingBtns[3].classList.add('active');
      }
      
      console.log('Filters reset');
    });
  }
  
  // ==========================================
  // SORT SELECT
  // ==========================================
  const sortSelect = document.querySelector('.sort-select');
  
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const sortValue = this.value;
      console.log('Sort by:', sortValue);
      // In a real application, this would trigger a data fetch/sort
    });
  }
  
  // ==========================================
  // PAGINATION
  // ==========================================
  const paginationBtns = document.querySelectorAll('.pagination-btn:not(:disabled)');
  
  paginationBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.querySelector('i')) { // Only for number buttons
        paginationBtns.forEach(b => {
          if (!b.querySelector('i')) {
            b.classList.remove('active');
          }
        });
        this.classList.add('active');
        
        // Scroll to top of results
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  });
  
});





