// script.js
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const appCards = document.querySelectorAll('.app-card');
    const sortSelect = document.getElementById('sort');
    let totalDownloads = localStorage.getItem('totalDownloads') || 0;
    
    // Toplam indirme sayısını güncelle
    document.getElementById('total-downloads').textContent = totalDownloads;
    
    // Kategori filtreleme
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterApps(category);
        });
    });
    
    // Arama filtreleme
    searchInput.addEventListener('input', function() {
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        const searchTerm = this.value.toLowerCase();
        filterApps(activeCategory, searchTerm);
    });
    
    // Sıralama
    sortSelect.addEventListener('change', function() {
        sortApps(this.value);
    });
    
    function filterApps(category, searchTerm = '') {
        appCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const appName = card.querySelector('.app-name').textContent.toLowerCase();
            const appDesc = card.querySelector('.app-desc').textContent.toLowerCase();
            
            const categoryMatch = category === 'all' || cardCategory.includes(category);
            const searchMatch = searchTerm === '' || 
                                appName.includes(searchTerm) || 
                                appDesc.includes(searchTerm);
            
            if (categoryMatch && searchMatch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function sortApps(sortBy) {
        const container =