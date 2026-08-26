/**
 * ARTUNIQUE - Customised Gifts
 * Vanilla JavaScript Frontend
 * Ready for direct PHP / MySQL conversion
 */

const WHATSAPP_NUMBER = "919999999999";
const FREE_SHIPPING_THRESHOLD = 999;

// Local storage state
let cart = JSON.parse(localStorage.getItem('artunique_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('artunique_wishlist')) || [];

document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  initMobileMenu();
  initSearch();
  initCart();
  initWishlist();
  initQuickView();
  initProductFilters();
  initBeforeAfter();
  initCountdown();
  initVideoObserver();
  initBackToTop();
  initNewsletter();
  initFooterAccordion();
});

/* ==========================================================================
   1. TOAST NOTIFICATION UTILITY
   ========================================================================== */

function showToast(message, icon = '✦') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="text-magenta-primary text-base">${icon}</span><span>${message}</span>`;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================================================
   2. HERO SLIDER
   ========================================================================== */

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('hero-dots');
  const prevBtn = document.getElementById('hero-prev-btn');
  const nextBtn = document.getElementById('hero-next-btn');
  const sliderContainer = document.getElementById('hero-slider-container');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 5500;

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlides() {
    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.className = 'w-8 h-3 rounded-full bg-white transition-all duration-300';
        } else {
          dot.className = 'w-3 h-3 rounded-full bg-white/50 hover:bg-white/80 transition-all duration-300';
        }
      });
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }

  function goToSlide(idx) {
    currentSlide = idx;
    updateSlides();
  }

  function startTimer() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function pauseTimer() {
    if (slideInterval) clearInterval(slideInterval);
  }

  function restartTimer() {
    pauseTimer();
    startTimer();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartTimer();
    });
  }

  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', pauseTimer);
    sliderContainer.addEventListener('mouseleave', startTimer);

    // Touch swipe support
    let touchStartX = 0;
    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseTimer();
    }, { passive: true });

    sliderContainer.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startTimer();
    }, { passive: true });
  }

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight') {
      nextSlide();
      restartTimer();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      restartTimer();
    }
  });

  updateSlides();
  startTimer();
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */

function initMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const drawer = document.getElementById('mobile-menu-drawer');

  function openMenu() {
    backdrop?.classList.add('active');
    drawer?.classList.remove('-translate-x-full');
  }

  function closeMenu() {
    backdrop?.classList.remove('active');
    drawer?.classList.add('-translate-x-full');
  }

  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  drawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   4. PRODUCT FILTERING (DOM-BASED)
   ========================================================================== */

function initProductFilters() {
  const filterButtons = document.querySelectorAll('[data-filter-category]');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter-category');
      filterProductsByCategory(filterValue);

      // Update button styles
      filterButtons.forEach(b => {
        b.className = "px-4 py-1.5 rounded-full text-xs font-bold bg-white text-gray-700 hover:bg-pink-50 hover:text-magenta-primary border border-pink-200 transition-all whitespace-nowrap cursor-pointer";
      });
      btn.className = "px-4 py-1.5 rounded-full text-xs font-bold bg-magenta-primary text-white shadow-sm whitespace-nowrap cursor-pointer";
    });
  });
}

window.filterProductsByCategory = function(categoryName) {
  const cards = document.querySelectorAll('.product-card');
  const targetCategory = (categoryName || 'All').toLowerCase().trim();

  cards.forEach(card => {
    const cardCat = (card.dataset.productCategory || '').toLowerCase();
    const cardOcc = (card.dataset.productOccasion || '').toLowerCase();
    const cardName = (card.dataset.productName || '').toLowerCase();

    if (targetCategory === 'all' || 
        cardCat.includes(targetCategory) || 
        cardOcc.includes(targetCategory) ||
        cardName.includes(targetCategory)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });

  // Smooth scroll to product grid if triggered from elsewhere
  const grid = document.getElementById('trending-products-section');
  if (grid && window.scrollY > 800) {
    grid.scrollIntoView({ behavior: 'smooth' });
  }
};

window.filterByOccasion = function(occasionName) {
  const filterButtons = document.querySelectorAll('[data-filter-category]');
  let matched = false;

  filterButtons.forEach(b => {
    const val = b.getAttribute('data-filter-category');
    if (val && val.toLowerCase() === occasionName.toLowerCase()) {
      b.click();
      matched = true;
    }
  });

  if (!matched) {
    filterProductsByCategory(occasionName);
  }
};

/* ==========================================================================
   5. QUICK VIEW & PERSONALISATION MODAL
   ========================================================================== */

let activeProductElement = null;

function initQuickView() {
  // Bind all personalise / quick view triggers
  document.querySelectorAll('[data-open-quickview]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (card) openQuickViewFromElement(card);
    });
  });
}

window.openQuickView = function(productId) {
  const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
  if (card) {
    openQuickViewFromElement(card);
  }
};

function openQuickViewFromElement(card) {
  activeProductElement = card;
  const modal = document.getElementById('quickview-modal');
  const backdrop = document.getElementById('quickview-backdrop');
  if (!modal || !backdrop) return;

  const id = card.dataset.productId;
  const name = card.dataset.productName || 'Personalised Gift';
  const price = parseInt(card.dataset.productPrice || '0', 10);
  const originalPrice = parseInt(card.dataset.productOriginalPrice || '0', 10);
  const discount = card.dataset.productDiscount || '';
  const image = card.dataset.productImage || '';
  const category = card.dataset.productCategory || 'Custom Gifts';
  const rating = card.dataset.productRating || '4.9';
  const reviews = card.dataset.productReviews || '120';
  const description = card.dataset.productDescription || 'Customise with your favourite photo, special names, and dates.';

  document.getElementById('qv-title').textContent = name;
  document.getElementById('qv-category').textContent = category;
  document.getElementById('qv-price').textContent = `₹${price.toLocaleString('en-IN')}`;
  document.getElementById('qv-original-price').textContent = `₹${originalPrice.toLocaleString('en-IN')}`;
  document.getElementById('qv-discount').textContent = discount ? `${discount}% OFF` : '';
  document.getElementById('qv-description').textContent = description;
  
  const qvImg = document.getElementById('qv-image');
  if (qvImg) {
    qvImg.src = image;
    qvImg.alt = name;
  }

  document.getElementById('qv-rating').textContent = `${rating} (${reviews} reviews)`;
  document.getElementById('qv-qty').value = "1";
  
  const customTextInput = document.getElementById('qv-custom-text');
  if (customTextInput) customTextInput.value = '';

  modal.classList.remove('hidden');
  setTimeout(() => {
    backdrop.classList.add('active');
    modal.querySelector('.modal-content')?.classList.add('scale-100', 'opacity-100');
  }, 10);
}

window.closeQuickView = function() {
  const modal = document.getElementById('quickview-modal');
  const backdrop = document.getElementById('quickview-backdrop');
  if (!modal || !backdrop) return;

  backdrop.classList.remove('active');
  modal.querySelector('.modal-content')?.classList.remove('scale-100', 'opacity-100');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 250);
};

window.addQuickViewToCart = function() {
  if (!activeProductElement) return;
  const id = activeProductElement.dataset.productId;
  const name = activeProductElement.dataset.productName;
  const price = parseInt(activeProductElement.dataset.productPrice, 10);
  const image = activeProductElement.dataset.productImage;
  const qty = parseInt(document.getElementById('qv-qty')?.value || '1', 10);
  const customNote = document.getElementById('qv-custom-text')?.value || 'Personalised';

  addToCartItem({ id, name, price, image, quantity: qty, customNote });
  closeQuickView();
  openCartDrawer();
};

/* ==========================================================================
   6. CART MODULE (LOCAL STORAGE & DRAWER)
   ========================================================================== */

function initCart() {
  updateCartUI();

  // Attach quick add buttons from HTML cards
  document.querySelectorAll('[data-quick-add]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (card) {
        addToCartItem({
          id: card.dataset.productId,
          name: card.dataset.productName,
          price: parseInt(card.dataset.productPrice, 10),
          image: card.dataset.productImage,
          quantity: 1,
          customNote: 'Standard Personalisation'
        });
        openCartDrawer();
      }
    });
  });
}

function addToCartItem(item) {
  const existingIndex = cart.findIndex(i => i.id === item.id && i.customNote === item.customNote);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart();
  showToast(`Added "${item.name}" to bag!`, '🛍️');
}

function saveCart() {
  localStorage.setItem('artunique_cart', JSON.stringify(cart));
  updateCartUI();
}

window.updateCartQty = function(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
};

window.removeFromCart = function(index) {
  if (!cart[index]) return;
  const item = cart[index];
  cart.splice(index, 1);
  saveCart();
  showToast(`Removed "${item.name}" from bag`, '🗑️');
};

function updateCartUI() {
  const cartBadge = document.getElementById('cart-badge');
  const mobileCartBadge = document.getElementById('mobile-cart-badge');
  const cartItemsContainer = document.getElementById('cart-items-list');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  const shippingProgress = document.getElementById('shipping-progress-bar');
  const shippingMsg = document.getElementById('shipping-threshold-msg');

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartBadge) {
    cartBadge.textContent = totalCount;
    cartBadge.classList.toggle('hidden', totalCount === 0);
  }
  if (mobileCartBadge) {
    mobileCartBadge.textContent = totalCount;
    mobileCartBadge.classList.toggle('hidden', totalCount === 0);
  }

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (totalEl) totalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  if (shippingProgress && shippingMsg) {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingProgress.style.width = '100%';
      shippingMsg.innerHTML = '<span class="text-green-600 font-bold">🎉 Free Shipping Unlocked!</span>';
    } else {
      const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
      const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
      shippingProgress.style.width = `${pct}%`;
      shippingMsg.innerHTML = `Add <span class="font-bold text-magenta-primary">₹${remaining.toLocaleString('en-IN')}</span> more for <span class="font-bold">FREE SHIPPING</span>`;
    }
  }

  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="py-16 text-center text-gray-400">
          <div class="w-16 h-16 rounded-full bg-pink-50 mx-auto flex items-center justify-center text-2xl text-magenta-primary mb-3">
            🛍️
          </div>
          <p class="text-base font-bold text-gray-700">Your gift bag is empty</p>
          <p class="text-xs text-gray-400 mt-1">Make someone smile with a personalised gift today.</p>
          <button onclick="closeCartDrawer(); filterByOccasion('All');" class="mt-4 px-6 py-2.5 bg-magenta-primary text-white text-xs font-bold rounded-lg shadow hover:bg-magenta-dark transition-all cursor-pointer">
            Explore Gifts
          </button>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = cart.map((item, idx) => `
        <div class="flex gap-3 py-3 border-b border-pink-50 items-center">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl border border-pink-100 bg-pink-50 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-gray-800 truncate">${item.name}</h4>
            <p class="text-[11px] text-pink-600 font-medium truncate">Note: ${item.customNote}</p>
            <span class="text-xs font-extrabold text-magenta-primary">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button onclick="updateCartQty(${idx}, -1)" class="w-6 h-6 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-xs font-bold cursor-pointer">-</button>
              <span class="w-7 text-center text-xs font-bold">${item.quantity}</span>
              <button onclick="updateCartQty(${idx}, 1)" class="w-6 h-6 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-xs font-bold cursor-pointer">+</button>
            </div>
            <button onclick="removeFromCart(${idx})" class="text-gray-300 hover:text-red-500 transition-colors p-1 cursor-pointer" aria-label="Remove item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      `).join('');
    }
  }
}

window.openCartDrawer = function() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  backdrop?.classList.add('active');
  drawer?.classList.add('active');
};

window.closeCartDrawer = function() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  backdrop?.classList.remove('active');
  drawer?.classList.remove('active');
};

/* ==========================================================================
   7. WISHLIST MODULE
   ========================================================================== */

function initWishlist() {
  updateWishlistUI();
  updateCardWishlistStates();

  document.querySelectorAll('[data-wishlist-toggle]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (card) {
        toggleWishlistId(card.dataset.productId, card.dataset.productName);
      }
    });
  });
}

function toggleWishlistId(productId, productName) {
  const idx = wishlist.indexOf(productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(`Removed from wishlist`, '💔');
  } else {
    wishlist.push(productId);
    showToast(`Saved "${productName || 'Gift'}" to wishlist!`, '❤️');
  }
  localStorage.setItem('artunique_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  updateCardWishlistStates();
}

window.toggleWishlist = function(productId, event) {
  if (event) event.stopPropagation();
  const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
  toggleWishlistId(String(productId), card?.dataset.productName || 'Gift');
};

function updateWishlistUI() {
  const badge = document.getElementById('wishlist-badge');
  if (badge) {
    badge.textContent = wishlist.length;
    badge.classList.toggle('hidden', wishlist.length === 0);
  }
}

function updateCardWishlistStates() {
  document.querySelectorAll('.product-card').forEach(card => {
    const id = card.dataset.productId;
    const isSaved = wishlist.includes(id);
    const heartSvg = card.querySelector('.wishlist-icon');
    if (heartSvg) {
      if (isSaved) {
        heartSvg.classList.add('heart-active');
        heartSvg.setAttribute('fill', '#D5005B');
      } else {
        heartSvg.classList.remove('heart-active');
        heartSvg.setAttribute('fill', 'none');
      }
    }
  });
}

/* ==========================================================================
   8. SEARCH OVERLAY (DOM-BASED)
   ========================================================================== */

function initSearch() {
  const openBtn = document.getElementById('search-open-btn');
  const closeBtn = document.getElementById('search-close-btn');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');

  function openSearch() {
    overlay?.classList.add('active');
    setTimeout(() => input?.focus(), 150);
  }

  function closeSearch() {
    overlay?.classList.remove('active');
    if (input) input.value = '';
    if (resultsContainer) resultsContainer.innerHTML = '';
  }

  openBtn?.addEventListener('click', openSearch);
  closeBtn?.addEventListener('click', closeSearch);

  if (input && resultsContainer) {
    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length === 0) {
        resultsContainer.innerHTML = '';
        return;
      }

      const cards = Array.from(document.querySelectorAll('.product-card'));
      const matches = cards.filter(card => {
        const name = (card.dataset.productName || '').toLowerCase();
        const category = (card.dataset.productCategory || '').toLowerCase();
        const occasion = (card.dataset.productOccasion || '').toLowerCase();
        return name.includes(q) || category.includes(q) || occasion.includes(q);
      });

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div class="text-center py-8 text-gray-400">
            <p class="text-sm">No gifts found for "<span class="text-gray-700 font-bold">${q}</span>"</p>
            <p class="text-xs mt-1">Try searching for "LED", "Mug", "Couple", or "Frame".</p>
          </div>
        `;
      } else {
        resultsContainer.innerHTML = `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${matches.map(card => {
              const id = card.dataset.productId;
              const name = card.dataset.productName;
              const price = card.dataset.productPrice;
              const image = card.dataset.productImage;
              const category = card.dataset.productCategory;
              return `
                <div class="flex items-center gap-3 p-3 rounded-xl border border-pink-100 hover:border-magenta-primary bg-white shadow-sm cursor-pointer transition-all" onclick="closeSearchModal(); openQuickView(${id});">
                  <img src="${image}" alt="${name}" class="w-16 h-16 object-cover rounded-lg bg-pink-50" />
                  <div class="flex-1 min-w-0">
                    <span class="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">${category}</span>
                    <h4 class="text-xs font-bold text-gray-900 truncate">${name}</h4>
                    <span class="text-xs font-extrabold text-magenta-primary">₹${parseInt(price, 10).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }
    });
  }
}

window.closeSearchModal = function() {
  const overlay = document.getElementById('search-overlay');
  overlay?.classList.remove('active');
};

window.searchTag = function(tag) {
  const input = document.getElementById('search-input');
  if (input) {
    input.value = tag;
    input.dispatchEvent(new Event('input'));
  }
};

/* ==========================================================================
   9. BEFORE / AFTER COMPARISON SLIDER
   ========================================================================== */

function initBeforeAfter() {
  const container = document.getElementById('before-after-box');
  const overlay = document.getElementById('before-after-overlay');
  const handle = document.getElementById('before-after-handle');
  const beforeImg = document.getElementById('before-img');

  if (!container || !overlay || !handle || !beforeImg) return;

  let isDragging = false;

  // Sync the inner image width to match the parent container
  function syncImageWidth() {
    beforeImg.style.width = `${container.offsetWidth}px`;
  }

  // Initial sync & sync on window resize
  syncImageWidth();
  window.addEventListener('resize', syncImageWidth);

  function updatePosition(x) {
    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    overlay.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updatePosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* ==========================================================================
   10. COUNTDOWN TIMER
   ========================================================================== */

function initCountdown() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-minutes');
  const secsEl = document.getElementById('timer-seconds');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  let targetTime = localStorage.getItem('artunique_offer_timer');
  if (!targetTime || new Date(targetTime) <= new Date()) {
    const nextTarget = new Date();
    nextTarget.setHours(nextTarget.getHours() + 47);
    nextTarget.setMinutes(nextTarget.getMinutes() + 59);
    targetTime = nextTarget.toISOString();
    localStorage.setItem('artunique_offer_timer', targetTime);
  }

  function updateTimer() {
    const now = new Date().getTime();
    const distance = new Date(targetTime).getTime() - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   11. VIDEO INTERSECTION OBSERVER
   ========================================================================== */

function initVideoObserver() {
  const videos = document.querySelectorAll('video');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const vid = entry.target;
      if (entry.isIntersecting) {
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, { threshold: 0.3 });

  videos.forEach(v => observer.observe(v));
}

/* ==========================================================================
   12. BACK TO TOP & NEWSLETTER
   ========================================================================== */

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
      btn.classList.add('opacity-100', 'translate-y-0');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
      btn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast('Thank you for subscribing! Check your inbox for 10% OFF code.', '🎁');
      input.value = '';
    }
  });
}

function initFooterAccordion() {
  const toggles = document.querySelectorAll('.footer-accordion-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (window.innerWidth >= 768) return;
      const list = toggle.nextElementSibling;
      const icon = toggle.querySelector('.accordion-icon');
      if (list) {
        list.classList.toggle('hidden');
        if (icon) {
          icon.textContent = list.classList.contains('hidden') ? '+' : '−';
        }
      }
    });
  });
}
