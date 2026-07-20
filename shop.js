// ============================
// SNEAKERS ZONE — Shop Page Logic
// Sample product data (stand-in for the MySQL Products + Sizes tables
// described in the research doc — FR-03, FR-04, FR-05)
// ============================

const PRODUCTS = [
    { id: "air-max-pulse", name: "Air Max Pulse", brand: "Nike", category: "Running", gender: "male", price: 160, sizes: [40, 41, 42, 43, 44], featured: true },
    { id: "air-force-1", name: "Air Force 1 '07", brand: "Nike", category: "Casual/Lifestyle", gender: "unisex", price: 115, sizes: [38, 39, 40, 41, 42, 43], featured: false },
    { id: "jordan-1-high", name: "Air Jordan 1 High", brand: "Nike", category: "Basketball", gender: "male", price: 180, sizes: [41, 42, 43, 44, 45], featured: false },
    { id: "ultraboost-light", name: "Ultraboost Light", brand: "Adidas", category: "Running", gender: "female", price: 190, sizes: [38, 39, 40, 41], featured: true },
    { id: "stan-smith", name: "Stan Smith", brand: "Adidas", category: "Casual/Lifestyle", gender: "unisex", price: 100, sizes: [39, 40, 41, 42, 43], featured: false },
    { id: "yeezy-350", name: "Yeezy Boost 350", brand: "Adidas", category: "Limited Edition", gender: "unisex", price: 230, sizes: [40, 41, 42, 43], featured: false },
    { id: "future-rider", name: "Future Rider", brand: "Puma", category: "Casual/Lifestyle", gender: "unisex", price: 85, sizes: [39, 40, 41, 42], featured: true },
    { id: "rs-x", name: "RS-X", brand: "Puma", category: "Casual/Lifestyle", gender: "male", price: 110, sizes: [40, 41, 42, 43, 44], featured: false },
    { id: "puma-clyde", name: "Clyde All-Pro", brand: "Puma", category: "Basketball", gender: "male", price: 130, sizes: [42, 43, 44, 45], featured: false },
    { id: "nb-550", name: "New Balance 550", brand: "New Balance", category: "Casual/Lifestyle", gender: "unisex", price: 120, sizes: [38, 39, 40, 41, 42], featured: false },
    { id: "nb-990", name: "New Balance 990", brand: "New Balance", category: "Running", gender: "male", price: 200, sizes: [41, 42, 43, 44], featured: false },
    { id: "vans-old-skool", name: "Old Skool", brand: "Vans", category: "Casual/Lifestyle", gender: "unisex", price: 70, sizes: [38, 39, 40, 41, 42, 43], featured: false },
    { id: "vans-sk8-hi", name: "Sk8-Hi", brand: "Vans", category: "Casual/Lifestyle", gender: "unisex", price: 80, sizes: [39, 40, 41, 42], featured: false },
    { id: "chuck-taylor", name: "Chuck Taylor All Star", brand: "Converse", category: "Casual/Lifestyle", gender: "unisex", price: 65, sizes: [38, 39, 40, 41, 42, 43], featured: false },
    { id: "reebok-classic", name: "Classic Leather", brand: "Reebok", category: "Casual/Lifestyle", gender: "unisex", price: 85, sizes: [39, 40, 41, 42, 43], featured: false },
    { id: "reebok-nano", name: "Nano X4", brand: "Reebok", category: "Gym & Training", gender: "male", price: 140, sizes: [41, 42, 43, 44], featured: false },
    { id: "gel-nimbus", name: "Gel-Nimbus 27", brand: "ASICS", category: "Running", gender: "female", price: 160, sizes: [38, 39, 40, 41], featured: false },
    { id: "gel-kayano", name: "Gel-Kayano 31", brand: "ASICS", category: "Running", gender: "male", price: 165, sizes: [41, 42, 43, 44, 45], featured: false },
    { id: "ua-curry", name: "Curry Flow 12", brand: "Under Armour", category: "Basketball", gender: "male", price: 160, sizes: [42, 43, 44, 45], featured: false },
    { id: "ua-hovr", name: "HOVR Sonic 6", brand: "Under Armour", category: "Running", gender: "unisex", price: 110, sizes: [39, 40, 41, 42, 43], featured: false },
];

const productGrid = document.getElementById("productGrid");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
const sortSelect = document.getElementById("sortSelect");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const clearFiltersBtn = document.getElementById("clearFilters");
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const shopSearchInput = document.getElementById("shopSearchInput");

function formatTZS(amount) {
    return "$ " + amount.toLocaleString("en-US");
}

function getCheckedValues(filterName) {
    const checked = document.querySelectorAll(`[data-filter="${filterName}"] input:checked`);
    return Array.from(checked).map((input) => input.value);
}

function applyFilters() {
    const brands = getCheckedValues("brand");
    const categories = getCheckedValues("category");
    const genders = getCheckedValues("gender");
    const sizes = getCheckedValues("size").map(Number);
    const maxPrice = Number(priceRange.value);
    const query = shopSearchInput.value.trim().toLowerCase();

    let results = PRODUCTS.filter((product) => {
        if (brands.length && !brands.includes(product.brand)) return false;
        if (categories.length && !categories.includes(product.category)) return false;
        if (genders.length && !genders.includes(product.gender)) return false;
        if (sizes.length && !sizes.some((size) => product.sizes.includes(size))) return false;
        if (product.price > maxPrice) return false;
        if (query && !`${product.name} ${product.brand}`.toLowerCase().includes(query)) return false;
        return true;
    });

    results = sortResults(results, sortSelect.value);
    renderProducts(results);
}

function sortResults(list, sortBy) {
    const sorted = [...list];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sortBy === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
}

function renderProducts(list) {
    productGrid.innerHTML = "";

    if (list.length === 0) {
        noResults.hidden = false;
        resultsCount.textContent = "0 sneakers found";
        return;
    }

    noResults.hidden = true;
    resultsCount.textContent = `Showing ${list.length} sneaker${list.length === 1 ? "" : "s"}`;

    list.forEach((product) => {
        const card = document.createElement("article");
        card.className = "shop-product-card";
        card.innerHTML = `
            <div class="shop-product-thumb">
                <i class="fas fa-shoe-prints"></i>
                <span class="stock-badge">In Stock</span>
            </div>
            <div class="shop-product-info">
                <span class="shop-product-brand">${product.brand}</span>
                <h3 class="shop-product-name">${product.name}</h3>
                <span class="shop-product-price">${formatTZS(product.price)}</span>
                <a href="product.html?id=${product.id}">View Details</a>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

function clearAllFilters() {
    document.querySelectorAll(".filter-options input[type='checkbox']").forEach((input) => {
        input.checked = false;
    });
    priceRange.value = priceRange.max;
    priceValue.textContent = formatTZS(Number(priceRange.max));
    shopSearchInput.value = "";
    applyFilters();
}

// Event listeners
document.querySelectorAll(".filter-options input[type='checkbox']").forEach((input) => {
    input.addEventListener("change", applyFilters);
});

priceRange.addEventListener("input", () => {
    priceValue.textContent = formatTZS(Number(priceRange.value));
    applyFilters();
});

sortSelect.addEventListener("change", applyFilters);
clearFiltersBtn.addEventListener("click", clearAllFilters);
shopSearchInput.addEventListener("input", applyFilters);

filterToggle?.addEventListener("click", () => {
    const isOpen = filterPanel.classList.toggle("open");
    filterToggle.setAttribute("aria-expanded", String(isOpen));
});

// Initial render
priceValue.textContent = formatTZS(Number(priceRange.value));
applyFilters();
