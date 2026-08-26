/**
 * ARTUNIQUE - Customised Gifts Ecommerce Homepage
 * Vanilla JavaScript Frontend Architecture
 * Ready for PHP + MySQL migration
 */

// Global Configuration
const WHATSAPP_NUMBER = "919999999999";
const FREE_SHIPPING_THRESHOLD = 999;

/* ==========================================================================
   1. DATA ARRAYS (Simulates future MySQL database tables in PHP backend)
   ========================================================================== */

const products = [
  {
    id: 1,
    name: "Custom Photo LED Acrylic Lamp",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image: "assets/images/products/product-01.webp",
    video: "assets/videos/products/product-01.mp4",
    category: "Couple Gifts",
    occasion: "Anniversary",
    rating: 4.9,
    reviews: 184,
    badge: "Bestseller",
    description: "Personalise with your favourite couple photo and special date. High-clarity 5mm acrylic with warm wooden LED base and USB power cord."
  },
  {
    id: 2,
    name: "Personalised Couple Portrait Frame",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    image: "assets/images/products/product-02.webp",
    video: "assets/videos/products/product-02.mp4",
    category: "Couple Gifts",
    occasion: "Valentine's Day",
    rating: 4.8,
    reviews: 142,
    badge: "Trending",
    description: "Transform your romantic memory into a museum-grade archival matte framed art piece with customizable anniversary quotes."
  },
  {
    id: 3,
    name: "Custom Magic Color-Changing Photo Mug",
    price: 499,
    originalPrice: 799,
    discount: 38,
    image: "assets/images/products/product-03.webp",
    video: "assets/videos/products/product-03.mp4",
    category: "Custom Mugs",
    occasion: "Birthday",
    rating: 4.7,
    reviews: 215,
    badge: "Hot Surprise",
    description: "Pours hot coffee or tea to magically reveal your hidden custom photo and warm message. Premium ceramic 350ml capacity."
  },
  {
    id: 4,
    name: "Infinite Memories Photo Collage Frame",
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    image: "assets/images/products/product-04.webp",
    video: "assets/videos/products/product-04.mp4",
    category: "Photo Gifts",
    occasion: "Anniversary",
    rating: 4.9,
    reviews: 98,
    badge: "Popular",
    description: "Combine up to 12 cherished family and couple photos into a designer composite frame with premium acrylic front cover."
  },
  {
    id: 5,
    name: "Scannable Custom Spotify Acrylic Plaque",
    price: 699,
    originalPrice: 999,
    discount: 30,
    image: "assets/images/products/product-05.webp",
    video: "assets/videos/products/product-05.mp4",
    category: "LED Gifts",
    occasion: "Friendship",
    rating: 4.8,
    reviews: 310,
    badge: "Viral Reel",
    description: "Your memorable song and custom photo engraved with a working Spotify scan code that instantly plays on any smartphone."
  },
  {
    id: 6,
    name: "Personalised RFID-Protected Leather Wallet",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image: "assets/images/products/product-06.webp",
    video: "assets/videos/products/product-06.mp4",
    category: "Corporate Gifts",
    occasion: "Birthday",
    rating: 4.8,
    reviews: 86,
    badge: "Luxury",
    description: "Genuine top-grain leather with precision laser-engraved name, initials, and an inner secret romantic note compartment."
  },
  {
    id: 7,
    name: "Customised Stainless Steel Couple Keychain",
    price: 499,
    originalPrice: 699,
    discount: 29,
    image: "assets/images/products/product-07.webp",
    video: "assets/videos/products/product-07.mp4",
    category: "Friendship Gifts",
    occasion: "Friendship",
    rating: 4.6,
    reviews: 165,
    badge: "Value Pick",
    description: "Dual interlocking matching metal keychains engraved with your initials, meeting coordinates, and lucky calendar date."
  },
  {
    id: 8,
    name: "Handcrafted 3D Engraved Wooden Portrait",
    price: 1499,
    originalPrice: 2199,
    discount: 32,
    image: "assets/images/products/product-08.webp",
    video: "assets/videos/products/product-08.mp4",
    category: "Home Decor",
    occasion: "Wedding",
    rating: 5.0,
    reviews: 74,
    badge: "Masterpiece",
    description: "Real solid beechwood block deeply laser-carved with lifelike photographic relief shading and rich natural oil polish."
  }
];

const categories = [
  { slug: "couple-gifts", name: "Couple Gifts", image: "assets/images/shop/couplegifts.jpg", span: "col-span-12 md:col-span-8 row-span-2", badge: "Most Loved" },
  { slug: "birthday-gifts", name: "Birthday Gifts", image: "assets/images/shop/birthday-gifts.jpg", span: "col-span-12 sm:col-span-6 md:col-span-4", badge: "Celebrations" },
  { slug: "anniversary-gifts", name: "Anniversary Gifts", image: "assets/images/shop/anniversary-gifts.jpg", span: "col-span-12 sm:col-span-6 md:col-span-4", badge: "Forever Love" },
  { slug: "photo-gifts", name: "Photo Gifts", image: "assets/images/shop/photo-gifts.jpg", span: "col-span-12 sm:col-span-6 md:col-span-4", badge: "Pure Memories" },
  { slug: "led-gifts", name: "LED Gifts", image: "assets/images/shop/led-gifts.jpg", span: "col-span-12 sm:col-span-6 md:col-span-4", badge: "Illuminated" },
  { slug: "custom-mugs", name: "Custom Mugs", image: "assets/images/shop/custom-mugs.jpg", span: "col-span-12 sm:col-span-6 md:col-span-4", badge: "Daily Magic" },
  { slug: "wedding-gifts", name: "Wedding Gifts", image: "assets/images/shop/wedding-gifts.jpg", span: "col-span-12 sm:col-span-6 md:col-span-4", badge: "New Journey" },
  { slug: "friendship-gifts", name: "Friendship Gifts", image: "assets/images/shop/friendship-gifts.jpg", span: "col-span-12 sm:col-span-6 md:col-span-4", badge: "Besties" },
  { slug: "corporate-gifts", name: "Corporate Gifts", image: "assets/images/shop/corporate-gifts.jpg", span: "col-span-12 sm:col-span-6 md:col-span-4", badge: "Executive" },
];

const emotions = [
  { name: "Love", tag: "Romantic Keepsakes", image: "assets/images/emotions/love.jpg", icon: "❤️" },
  { name: "Celebration", tag: "Milestone Surprises", image: "assets/images/emotions/celebration.jpg", icon: "🎉" },
  { name: "Memories", tag: "Timeless Moments", image: "assets/images/emotions/memories.jpg", icon: "📸" },
  { name: "Friendship", tag: "Squad Moments", image: "assets/images/emotions/friendship.jpg", icon: "🤝" },
  { name: "Gratitude", tag: "Heartfelt Thanks", image: "assets/images/emotions/gratitude.jpg", icon: "✨" },
  { name: "Fun", tag: "Playful Surprises", image: "assets/images/emotions/fun.jpg", icon: "🥳" }
];

const occasions = [
  { name: "Birthday", image: "assets/images/occasions/birthday.jpg", count: "120+ Designs" },
  { name: "Anniversary", image: "assets/images/occasions/anniversary.jpg", count: "85+ Designs" },
  { name: "Wedding", image: "assets/images/occasions/wedding.jpg", count: "64+ Designs" },
  { name: "Valentine's Day", image: "assets/images/occasions/valentine.jpg", count: "90+ Designs" },
  { name: "Friendship", image: "assets/images/occasions/friendship.jpg", count: "45+ Designs" },
  { name: "New Home", image: "assets/images/occasions/new-home.jpg", count: "30+ Designs" },
  { name: "Baby Shower", image: "assets/images/occasions/baby-shower.jpg", count: "25+ Designs" },
  { name: "Corporate", image: "assets/images/occasions/corporate.jpg", count: "50+ Designs" }
];

const reels = [
  { id: 1, title: "Unboxing Surprise ❤️", user: "@priya_k", city: "Kolkata", product: "Custom Photo LED Lamp", poster: "assets/images/products/product-01.webp" },
  { id: 2, title: "Tears of Joy on Anniversary 🥹", user: "@sneha_rahul", city: "Mumbai", product: "Couple Acrylic Plaque", poster: "assets/images/products/product-02.webp" },
  { id: 3, title: "Magic Coffee Reaction ☕✨", user: "@ananya_b", city: "Bengaluru", product: "Custom Magic Mug", poster: "assets/images/products/product-03.webp" },
  { id: 4, title: "Bestie's 25th Birthday Surprise 🎁", user: "@vikram_d", city: "Delhi", product: "Spotify Plaque", poster: "assets/images/products/product-05.webp" },
  { id: 5, title: "Laser Engraving Process Live 🔥", user: "@artunique_studio", city: "Jaipur", product: "3D Wooden Portrait", poster: "assets/images/products/product-08.webp" },
  { id: 6, title: "Mom's Priceless Reaction 💖", user: "@neha_p", city: "Pune", product: "Photo Collage Frame", poster: "assets/images/products/product-04.webp" }
];

const customerReactions = [
  { name: "Priya Roy", city: "Kolkata", product: "Custom Photo LED Lamp", rating: 5, quote: "“The reaction was priceless ❤️ He couldn't believe it glowed with our favourite beach photo!”", poster: "assets/images/social/social-01.webp" },
  { name: "Rahul & Sneha", city: "Mumbai", product: "Personalised Couple Frame", rating: 5, quote: "“Order arrived in 3 days in Mumbai. Packaging was super luxurious with gold ribbon.”", poster: "assets/images/social/social-02.webp" },
  { name: "Ananya Sharma", city: "Bengaluru", product: "Custom Magic Name Mug", rating: 5, quote: "“My sister literally screamed when the black mug transformed into our childhood picture!”", poster: "assets/images/social/social-03.webp" },
  { name: "Vikram Mehta", city: "Delhi", product: "Custom Spotify Plaque", rating: 5, quote: "“The Spotify barcode scans in 1 second. Easily the best anniversary gift I have ever given.”", poster: "assets/images/social/social-04.webp" }
];

const socialPosts = [
  { id: 1, image: "assets/images/social/social-01.webp", tag: "@meera_k", likes: "1.4k" },
  { id: 2, image: "assets/images/social/social-02.webp", tag: "@arjun_travels", likes: "2.1k" },
  { id: 3, image: "assets/images/social/social-03.webp", tag: "@pooja_vibes", likes: "980" },
  { id: 4, image: "assets/images/social/social-04.webp", tag: "@sid_creations", likes: "3.2k" },
  { id: 5, image: "assets/images/social/social-05.webp", tag: "@anika_lifestyle", likes: "1.8k" },
  { id: 6, image: "assets/images/social/social-06.webp", tag: "@rohit_art", likes: "870" }
];

/* ==========================================================================
   2. STATE MANAGEMENT (Client side persistence via localStorage)
   ========================================================================== */

let cart = JSON.parse(localStorage.getItem('artunique_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('artunique_wishlist')) || [];

function saveCart() {
  localStorage.setItem('artunique_cart', JSON.stringify(cart));
  updateCartUI();
}

function saveWishlist() {
  localStorage.setItem('artunique_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
}

/* ==========================================================================
   3. TOAST NOTIFICATION UTILITY
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
  }, 3200);
}

/* ==========================================================================
   4. HERO SLIDER MODULE (Vanilla JS, Pure Image Banners, Touch/Keyboard/Swipe)
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
  
  // Render dots
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
    
    // Update dots
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
  
  // Pause on hover
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', pauseTimer);
    sliderContainer.addEventListener('mouseleave', startTimer);
    
    // Touch Swipe handling for mobile & tablet
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseTimer();
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 45) {
        if (swipeDistance < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startTimer();
    }, { passive: true });
  }
  
  // Keyboard arrow keys
  window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') {
      nextSlide();
      restartTimer();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      restartTimer();
    }
  });
  
  // Initialize
  updateSlides();
  startTimer();
}

/* ==========================================================================
   5. RENDERING DYNAMIC SECTIONS (Future PHP Template Compatible)
   ========================================================================== */

function renderCategories() {
  const container = document.getElementById('categories-grid');
  if (!container) return;
  
  container.innerHTML = categories.map(cat => `
    <div class="${cat.span} group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 bg-white cursor-pointer border border-pink-100/60" onclick="filterByOccasion('${cat.name}')">
      <div class="aspect-[4/3] md:aspect-auto md:h-full w-full overflow-hidden relative">
        <picture>
          <source media="(max-width: 767px)" srcset="assets/images/shop/${cat.slug}-mobile.webp">
          <source media="(max-width: 1199px)" srcset="assets/images/shop/${cat.slug}-tablet.webp">
          <img src="${cat.image}" alt="${cat.name} ArtUnique" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </picture>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
        <div class="absolute top-4 left-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/90 text-magenta-primary backdrop-blur-md shadow-sm">
            ${cat.badge}
          </span>
        </div>
        <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div>
            <h3 class="text-white text-xl font-bold font-serif-heading drop-shadow-md">${cat.name}</h3>
            <p class="text-pink-200 text-xs tracking-wider uppercase font-semibold">Explore Collection →</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-magenta-primary text-white flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderEmotions() {
  const container = document.getElementById('emotions-grid');
  if (!container) return;
  
  container.innerHTML = emotions.map(emo => `
    <div class="group bg-white rounded-2xl p-4 md:p-5 border border-pink-100 shadow-sm hover:shadow-md hover:border-magenta-primary transition-all duration-300 cursor-pointer text-center" onclick="filterByOccasion('${emo.name}')">
      <div class="aspect-square w-full rounded-xl overflow-hidden mb-3 relative bg-pink-50">
        <img src="${emo.image}" alt="${emo.name} Gifts" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div class="absolute inset-0 bg-magenta-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span class="absolute top-2 right-2 text-2xl drop-shadow">${emo.icon}</span>
      </div>
      <h4 class="text-gray-900 font-bold text-base md:text-lg mb-1 group-hover:text-magenta-primary transition-colors">${emo.name}</h4>
      <p class="text-gray-500 text-xs font-medium">${emo.tag}</p>
    </div>
  `).join('');
}

function renderProducts(targetList = products, containerId = 'trending-products-grid') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = targetList.map(prod => {
    const isWishlisted = wishlist.some(item => item.id === prod.id);
    return `
      <!-- PRODUCT CARD: ${prod.name} -->
      <div class="bg-white rounded-2xl overflow-hidden border border-pink-100/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative" data-product-id="${prod.id}">
        <!-- Top Badges & Wishlist -->
        <div class="absolute top-3 left-3 z-10">
          <span class="px-2.5 py-1 rounded-md text-[11px] font-bold text-white uppercase tracking-wider badge-discount shadow-sm">
            ${prod.badge || `${prod.discount}% OFF`}
          </span>
        </div>
        <button onclick="toggleWishlist(${prod.id}, event)" aria-label="Add to wishlist" class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-white text-gray-400 hover:text-magenta-primary transition-all">
          <svg class="w-5 h-5 ${isWishlisted ? 'heart-active' : ''}" fill="${isWishlisted ? '#D5005B' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        <!-- Product Visual: 70-75% Card Dominance -->
        <div class="aspect-square w-full relative overflow-hidden bg-pink-50 cursor-pointer" onclick="openQuickView(${prod.id})">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
          
          <!-- Quick view action bar -->
          <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button onclick="openQuickView(${prod.id}); event.stopPropagation();" class="px-4 py-2 bg-white text-magenta-primary text-xs font-bold rounded-lg shadow-lg hover:bg-magenta-primary hover:text-white transition-colors">
              Quick View
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <span class="text-[11px] text-gray-500 uppercase tracking-widest font-semibold">${prod.category}</span>
            <h3 class="text-gray-900 font-bold text-sm md:text-base mt-1 line-clamp-1 group-hover:text-magenta-primary transition-colors cursor-pointer" onclick="openQuickView(${prod.id})">
              ${prod.name}
            </h3>
            
            <!-- Rating & Reviews -->
            <div class="flex items-center gap-1.5 mt-1.5">
              <div class="flex text-amber-400 text-xs">
                ${'★'.repeat(5)}
              </div>
              <span class="text-xs font-bold text-gray-700">${prod.rating}</span>
              <span class="text-xs text-gray-400">(${prod.reviews})</span>
            </div>
          </div>

          <!-- Pricing & CTA -->
          <div class="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between gap-2">
            <div>
              <div class="flex items-baseline gap-2">
                <span class="text-lg md:text-xl font-extrabold text-magenta-primary font-serif-heading">₹${prod.price.toLocaleString('en-IN')}</span>
                <span class="text-xs text-gray-400 line-through">₹${prod.originalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button onclick="openQuickView(${prod.id})" class="px-3.5 py-2 bg-magenta-primary hover:bg-magenta-dark text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap flex items-center gap-1">
              <span>Personalise</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderOccasions() {
  const container = document.getElementById('occasions-grid');
  if (!container) return;
  
  container.innerHTML = occasions.map(occ => `
    <div class="group relative rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-white" onclick="filterByOccasion('${occ.name}')">
      <div class="aspect-[16/10] w-full overflow-hidden relative">
        <img src="${occ.image}" alt="${occ.name} Gifts ArtUnique" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div class="absolute bottom-4 left-4 right-4 text-white">
          <span class="text-[11px] text-pink-200 uppercase tracking-wider font-semibold">${occ.count}</span>
          <h4 class="text-lg font-bold font-serif-heading mt-0.5">${occ.name}</h4>
        </div>
      </div>
    </div>
  `).join('');
}

function initReels() {
  const container = document.getElementById('reels-track');
  if (!container) return;
  
  container.innerHTML = reels.map(reel => `
    <div class="flex-shrink-0 w-[240px] md:w-[270px] snap-start bg-black rounded-2xl overflow-hidden relative aspect-[9/16] shadow-lg group border border-pink-900/30">
      <img src="${reel.poster}" alt="${reel.title}" class="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30"></div>
      
      <!-- Reel Top -->
      <div class="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-magenta-primary/90 text-white backdrop-blur-md uppercase tracking-wider">
          ArtUnique Reels
        </span>
        <div class="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-xs">
          ▶
        </div>
      </div>

      <!-- Reel Bottom -->
      <div class="absolute bottom-4 left-4 right-4 text-white">
        <div class="flex items-center gap-2 mb-1.5">
          <div class="w-6 h-6 rounded-full bg-magenta-primary text-[10px] font-bold flex items-center justify-center">
            ${reel.user.substring(1, 2).toUpperCase()}
          </div>
          <span class="text-xs font-semibold text-pink-100">${reel.user} • ${reel.city}</span>
        </div>
        <h4 class="text-sm font-bold line-clamp-2 drop-shadow mb-2">${reel.title}</h4>
        <button onclick="showToast('Loading reel for ${reel.product}...');" class="w-full py-1.5 bg-white/20 hover:bg-magenta-primary text-white backdrop-blur-md rounded-lg text-xs font-bold transition-all text-center">
          Shop In Video →
        </button>
      </div>
    </div>
  `).join('');
}

function initCustomerReactions() {
  const container = document.getElementById('reactions-grid');
  if (!container) return;
  
  container.innerHTML = customerReactions.map(rx => `
    <div class="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div class="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-pink-50">
          <img src="${rx.poster}" alt="${rx.name} review" loading="lazy" class="w-full h-full object-cover" />
          <div class="absolute bottom-2 left-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded backdrop-blur-md font-medium">
            Verified Reaction Video
          </div>
        </div>
        <div class="flex text-amber-400 text-sm mb-2">
          ${'★'.repeat(rx.rating)}
        </div>
        <p class="text-gray-800 text-sm font-medium italic mb-3">${rx.quote}</p>
      </div>
      <div class="pt-3 border-t border-pink-50 flex items-center justify-between">
        <div>
          <h5 class="text-xs font-bold text-gray-900">${rx.name}</h5>
          <span class="text-[11px] text-gray-400">${rx.city} • ${rx.product}</span>
        </div>
        <span class="text-magenta-primary text-sm font-bold">✓ Verified</span>
      </div>
    </div>
  `).join('');
}

function initSocialGallery() {
  const container = document.getElementById('social-masonry-grid');
  if (!container) return;
  
  container.innerHTML = socialPosts.map(post => `
    <div class="group relative overflow-hidden rounded-2xl border border-pink-100 shadow-sm cursor-pointer aspect-square bg-pink-50" onclick="showToast('Instagram Post ${post.tag} opens in app');">
      <img src="${post.image}" alt="ArtUnique Instagram customer" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div class="absolute inset-0 bg-magenta-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
        <span class="text-xl mb-1">📸</span>
        <span class="font-bold text-sm">${post.tag}</span>
        <span class="text-xs text-pink-200 mt-1">❤️ ${post.likes}</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   6. BEFORE / AFTER INTERACTIVE COMPARISON SLIDER
   ========================================================================== */

function initBeforeAfter() {
  const container = document.getElementById('before-after-box');
  if (!container) return;

  let isDragging = false;

  function updatePosition(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    
    // Clamp to boundaries
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    container.style.setProperty('--slider-pos', `${percentage}%`);
  }

  // Mouse Events
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

  // Touch Events
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBeforeAfter);
} else {
  initBeforeAfter();
}

/* ==========================================================================
   7. PRODUCT VIDEO OBSERVER (IntersectionObserver Optimization)
   ========================================================================== */

function initProductVideos() {
  const videos = document.querySelectorAll('video[data-autoplay-observe]');
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
  }, { threshold: 0.35 });
  
  videos.forEach(v => observer.observe(v));
}

/* ==========================================================================
   8. REAL FUNCTIONING COUNTDOWN TIMER
   ========================================================================== */

function initCountdown() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-minutes');
  const secsEl = document.getElementById('timer-seconds');
  
  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;
  
  // Dynamic target: always 48 hours from current user session
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
   9. QUICK VIEW MODAL & PERSONALISATION PREVIEW
   ========================================================================== */

let activeQuickViewProduct = null;

window.openQuickView = function(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;
  
  activeQuickViewProduct = prod;
  const modal = document.getElementById('quickview-modal');
  const backdrop = document.getElementById('quickview-backdrop');
  
  if (!modal || !backdrop) return;
  
  document.getElementById('qv-title').textContent = prod.name;
  document.getElementById('qv-category').textContent = prod.category;
  document.getElementById('qv-price').textContent = `₹${prod.price.toLocaleString('en-IN')}`;
  document.getElementById('qv-original-price').textContent = `₹${prod.originalPrice.toLocaleString('en-IN')}`;
  document.getElementById('qv-discount').textContent = `${prod.discount}% OFF`;
  document.getElementById('qv-description').textContent = prod.description;
  document.getElementById('qv-image').src = prod.image;
  document.getElementById('qv-image').alt = prod.name;
  document.getElementById('qv-rating').textContent = `${prod.rating} (${prod.reviews} reviews)`;
  document.getElementById('qv-qty').value = "1";
  
  const customTextInput = document.getElementById('qv-custom-text');
  if (customTextInput) customTextInput.value = '';
  
  modal.classList.remove('hidden');
  setTimeout(() => {
    backdrop.classList.add('active');
    modal.querySelector('.modal-content')?.classList.add('scale-100', 'opacity-100');
  }, 10);
};

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
  if (!activeQuickViewProduct) return;
  const qty = parseInt(document.getElementById('qv-qty')?.value || '1', 10);
  const customText = document.getElementById('qv-custom-text')?.value || 'Standard Customization';
  
  addToCart(activeQuickViewProduct.id, qty, customText);
  closeQuickView();
  openCartDrawer();
};

/* ==========================================================================
   10. CART DRAWER & LOCAL STORAGE PERSISTENCE
   ========================================================================== */

window.addToCart = function(productId, quantity = 1, customNote = '') {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;
  
  const existingItemIndex = cart.findIndex(item => item.id === productId && item.customNote === customNote);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      quantity: quantity,
      customNote: customNote || 'Personalised'
    });
  }
  
  saveCart();
  showToast(`Added "${prod.name}" to cart!`, '🛍️');
};

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
  showToast(`Removed "${item.name}" from cart`, '🗑️');
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
  
  // Free Shipping Threshold Progress
  if (shippingProgress && shippingMsg) {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingProgress.style.width = '100%';
      shippingMsg.innerHTML = '<span class="text-green-600 font-bold">🎉 Congratulations! You qualify for FREE Shipping!</span>';
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
          <button onclick="closeCartDrawer(); filterByOccasion('All');" class="mt-4 px-6 py-2.5 bg-magenta-primary text-white text-xs font-bold rounded-lg shadow hover:bg-magenta-dark transition-all">
            Start Shopping
          </button>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = cart.map((item, idx) => `
        <div class="flex gap-3 py-3 border-b border-pink-50 items-center">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl border border-pink-100 bg-pink-50" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-gray-800 truncate">${item.name}</h4>
            <p class="text-[11px] text-pink-600 font-medium truncate">Note: ${item.customNote}</p>
            <span class="text-xs font-extrabold text-magenta-primary">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button onclick="updateCartQty(${idx}, -1)" class="w-6 h-6 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-xs font-bold">-</button>
              <span class="w-7 text-center text-xs font-bold">${item.quantity}</span>
              <button onclick="updateCartQty(${idx}, 1)" class="w-6 h-6 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-xs font-bold">+</button>
            </div>
            <button onclick="removeFromCart(${idx})" class="text-gray-300 hover:text-red-500 transition-colors p-1" aria-label="Remove item">
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
  if (drawer && backdrop) {
    backdrop.classList.add('active');
    drawer.classList.add('active');
  }
};

window.closeCartDrawer = function() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer && backdrop) {
    backdrop.classList.remove('active');
    drawer.classList.remove('active');
  }
};

/* ==========================================================================
   11. WISHLIST MODULE & LOCAL STORAGE
   ========================================================================== */

window.toggleWishlist = function(productId, event) {
  if (event) event.stopPropagation();
  const prod = products.find(p => p.id === productId);
  if (!prod) return;
  
  const existingIdx = wishlist.findIndex(item => item.id === productId);
  if (existingIdx > -1) {
    wishlist.splice(existingIdx, 1);
    showToast(`Removed "${prod.name}" from wishlist`, '💔');
  } else {
    wishlist.push(prod);
    showToast(`Saved "${prod.name}" to wishlist!`, '❤️');
  }
  
  saveWishlist();
  renderProducts(); // Refresh heart icon fill states
};

function updateWishlistUI() {
  const badge = document.getElementById('wishlist-badge');
  if (badge) {
    badge.textContent = wishlist.length;
    badge.classList.toggle('hidden', wishlist.length === 0);
  }
}

/* ==========================================================================
   12. SEARCH OVERLAY & DYNAMIC SEARCH
   ========================================================================== */

function initSearch() {
  const openBtn = document.getElementById('search-open-btn');
  const mobileOpenBtn = document.getElementById('mobile-search-open-btn');
  const closeBtn = document.getElementById('search-close-btn');
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  
  function openSearch() {
    if (!overlay) return;
    overlay.classList.add('active');
    setTimeout(() => input?.focus(), 150);
  }
  
  function closeSearch() {
    if (!overlay) return;
    overlay.classList.remove('active');
    if (input) input.value = '';
    if (resultsContainer) resultsContainer.innerHTML = '';
  }
  
  if (openBtn) openBtn.addEventListener('click', openSearch);
  if (mobileOpenBtn) mobileOpenBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  
  if (input && resultsContainer) {
    input.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length === 0) {
        resultsContainer.innerHTML = '';
        return;
      }
      
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.occasion.toLowerCase().includes(q)
      );
      
      if (filtered.length === 0) {
        resultsContainer.innerHTML = `
          <div class="py-8 text-center text-gray-400">
            <p class="text-sm font-semibold">No personalised gifts matched "${q}"</p>
            <p class="text-xs text-gray-400 mt-1">Try searching for "LED Lamp", "Frame", or "Mug".</p>
          </div>
        `;
      } else {
        resultsContainer.innerHTML = `
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            ${filtered.map(p => `
              <div class="flex items-center gap-3 p-2.5 rounded-xl border border-pink-100 hover:border-magenta-primary bg-white cursor-pointer transition-all" onclick="openQuickView(${p.id}); document.getElementById('search-overlay').classList.remove('active');">
                <img src="${p.image}" alt="${p.name}" class="w-14 h-14 object-cover rounded-lg bg-pink-50" />
                <div class="flex-1 min-w-0">
                  <h5 class="text-xs font-bold text-gray-900 truncate">${p.name}</h5>
                  <span class="text-[11px] text-gray-400">${p.category}</span>
                  <p class="text-xs font-bold text-magenta-primary mt-0.5">₹${p.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }
    });
  }
}

window.searchTag = function(term) {
  const input = document.getElementById('search-input');
  if (input) {
    input.value = term;
    input.dispatchEvent(new Event('input'));
  }
};

/* ==========================================================================
   13. STICKY NAVBAR & MOBILE MENU & SCROLL BEHAVIOR
   ========================================================================== */

function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const backToTop = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'py-1');
        navbar.classList.remove('py-4');
      } else {
        navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'py-1');
        navbar.classList.add('py-1');
      }
    }
    
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
        backToTop.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
        backToTop.classList.remove('opacity-100', 'translate-y-0');
      }
    }
  }, { passive: true });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-menu-drawer');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  
  function openMenu() {
    drawer?.classList.remove('-translate-x-full');
    backdrop?.classList.add('active');
  }
  
  function closeMenu() {
    drawer?.classList.add('-translate-x-full');
    backdrop?.classList.remove('active');
  }
  
  menuBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initWhatsAppButton() {
  const btn = document.getElementById('whatsapp-floating-btn');
  if (btn) {
    btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20ArtUnique!%20I%20want%20to%20order%20a%20customised%20gift.`;
  }
}

/* ==========================================================================
   14. MOBILE FOOTER ACCORDION
   ========================================================================== */

function initAccordionFooter() {
  const toggles = document.querySelectorAll('.footer-accordion-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('.accordion-icon');
      if (!content) return;
      
      const isOpen = !content.classList.contains('hidden');
      if (isOpen) {
        content.classList.add('hidden');
        if (icon) icon.textContent = '+';
      } else {
        content.classList.remove('hidden');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

/* ==========================================================================
   15. FILTER BY OCCASION SHORTCUT
   ========================================================================== */

window.filterByOccasion = function(name) {
  const section = document.getElementById('trending-products-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
  
  if (name === 'All') {
    renderProducts(products);
    showToast('Showing all custom gifts', '🎁');
    return;
  }
  
  const filtered = products.filter(p => 
    p.category.toLowerCase().includes(name.toLowerCase()) || 
    p.occasion.toLowerCase().includes(name.toLowerCase())
  );
  
  if (filtered.length > 0) {
    renderProducts(filtered);
    showToast(`Showing gifts for "${name}"`, '✨');
  } else {
    renderProducts(products);
    showToast(`Showing all gifts (${name})`, '✨');
  }
};

/* ==========================================================================
   16. NEWSLETTER & PROMO COPY
   ========================================================================== */

function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('🎉 Thank you! Check your inbox for 10% OFF coupon code: UNIQUE10', '💌');
        emailInput.value = '';
      }
    });
  }
}

/* ==========================================================================
   17. INITIALIZATION ON DOM READY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Hide loading screen smoothly
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add('loaded');
  }, 400);

  // Initialize all core components
  initHeroSlider();
  renderCategories();
  renderEmotions();
  renderProducts();
  renderOccasions();
  initReels();
  initCustomerReactions();
  initSocialGallery();
  initBeforeAfter();
  initProductVideos();
  initCountdown();
  initSearch();
  initNavbar();
  initMobileMenu();
  initBackToTop();
  initWhatsAppButton();
  initAccordionFooter();
  initNewsletter();
  
  // Initial storage sync
  updateCartUI();
  updateWishlistUI();
});
