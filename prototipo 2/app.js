/* ==========================================================================
   SENAI Cafeteria — Application Logic
   Vanilla JS. No frameworks, no build step.
   ========================================================================== */

(() => {
  'use strict';

  /* ---------------------------------------------------------------------
     1. DATA: Menu catalogue
     --------------------------------------------------------------------- */

  const MENU = [
    {
      id: 'burger',
      name: 'Artisanal Burger',
      desc: '100% Beef, Cheddar, Special Sauce.',
      price: 12.50,
      category: 'lunch',
      prepMins: 12,
      badge: { text: 'Available', color: 'var(--success)' },
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEpXUVmNkQjXcXRUjHVDWMsTYBqDBFX1m12ZSGh30CUjspf7aDjXE2-TV_V-0a3V5ypmhFSb0mOV451awhKRUTFmJlTVw7OAhl5DxbQ86Hq7fP0vT_qolHkXx0VAd1e4Foin06sPIr-BEYWsaC6ltveZ5-fmrPEpppce0hAyy0DSd1Ld65XStGG1-JVLCx1QcSIKZynC4vqp8FMs2A6-Y-JwtOfzZGChwfLsW2M2b2k3HZNorNJ-wrWOOkUvnGD4VAZzjWER005SXp'
    },
    {
      id: 'greek-bowl',
      name: 'Greek Vitality Bowl',
      desc: 'Feta, Olives, Fresh Greens, Olive Oil.',
      price: 9.80,
      category: 'lunch',
      prepMins: 6,
      badge: { text: 'Vegetarian', color: 'var(--tertiary-fixed-dim)' },
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7gfmWTxY0knJVdB47aSBg9FRFOrDvcNoWvVh7ME2qAXBdvfLPLAodCOW-z4ITFDnoklY5gosyatD4b7vM7DlDf9RziuYRgzUvCOn0DD-DHMWQZCFNkXHzEwozj6OHlR1PVZqJDUYE-3f7Y3C5Qa-EPiaqZKm9cub9Ke7NnmBd66YKSmKWR0yOWQkB3fUbTjx-oDeP7fC536di_7XkOD7XMLiG9rj4k9RzcdCYgpawipQV17JOIql1byaLR3Zu_XUMb5vDmBuI1zLX'
    },
    {
      id: 'salmon',
      name: 'Grilled Salmon Set',
      desc: 'Wild Rice, Asparagus, Lemon Butter.',
      price: 15.00,
      category: 'lunch',
      prepMins: 15,
      badge: { text: 'High Protein', color: 'var(--appetite-orange)' },
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsjRqq_PhXGOH7RzrJPVPJ0fIVmFX9H5KneXTXcum1FqFg1qDxW1-bMwgv0Vw-xqlKrGLOzv6rN9CnVkodD9O51uCmnXJedjmUkGW-40iVJCrKg7ZXkLCcQbtRJ7HknkmoSyFl8zEaT5HT0ZenES38Y_NxW4KHgG19qeiACKQFSutTAISKH7RNd3u5hFpO5QnOadUk1nzzdnnu3Z2m13HNw42ShIe3EWacu5caSBsymz-xj2dBzSncXydDVQAO9fhNzIOXHKypK_qE'
    },
    {
      id: 'juice',
      name: 'Cold-Pressed Juice',
      desc: 'Natural, No Added Sugar, Freshly Pressed.',
      price: 4.20,
      category: 'drinks',
      prepMins: 2,
      badge: null,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASKveC_8qJhuRmLwG-4i1cntcEOCXWlgaMume5yJ4GvBk7FxNBAcLbG8LRowW4mywRD3o4Kr6WPPbD3vxmRKz3rrzcjasNt9CebmO_39_UtrAAUnzjQf2V0a6VLNqnZjpAZ_BkdGJ1M14agSLd_bq5rg5Ub1TD4b5hw1lZ-CBxDWcq0rEX5iRNMQHl939tQS_YIKoY4xc6nTuvDw-vj56XBjXu8C71QQ79QoKsPEMmhkfGrPyNUvv-hSV-zJSWABHOhoD2wQmOZ3D5'
    },
    {
      id: 'fries',
      name: 'Crispy Golden Fries',
      desc: 'Hand-cut, Sea Salt, Served Hot.',
      price: 5.50,
      category: 'snacks',
      prepMins: 5,
      badge: { text: 'Available', color: 'var(--success)' },
      img: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'wrap',
      name: 'Chicken Caesar Wrap',
      desc: 'Grilled Chicken, Romaine, Parmesan.',
      price: 8.90,
      category: 'snacks',
      prepMins: 7,
      badge: { text: 'Available', color: 'var(--success)' },
      img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'iced-tea',
      name: 'House Iced Tea',
      desc: 'Lightly Sweetened, Fresh Mint.',
      price: 3.50,
      category: 'drinks',
      prepMins: 2,
      badge: null,
      img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'brownie',
      name: 'Double Chocolate Brownie',
      desc: 'Rich Cocoa, Walnuts, Warm Served.',
      price: 4.80,
      category: 'desserts',
      prepMins: 3,
      badge: { text: 'Daily Special', color: 'var(--tertiary-fixed-dim)' },
      img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80&auto=format&fit=crop'
    },
    {
      id: 'fruit-cup',
      name: 'Tropical Fruit Cup',
      desc: 'Mango, Pineapple, Papaya, Lime.',
      price: 5.20,
      category: 'desserts',
      prepMins: 2,
      badge: { text: 'Vegetarian', color: 'var(--tertiary-fixed-dim)' },
      img: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=600&q=80&auto=format&fit=crop'
    }
  ];

  const CATEGORIES = [
    { id: 'all', label: 'All Items' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'desserts', label: 'Desserts' }
  ];

  const PREP_STAGES = ['Order Placed', 'Preparing', 'Ready for Pickup', 'Completed'];

  /* ---------------------------------------------------------------------
     1b. RESERVATION TIME SLOTS — vary by day of week
     Weekdays & Sunday: 12:00, 15:00, 17:00, 20:00
     Saturday: 12:00 only
     --------------------------------------------------------------------- */

  const TIME_SLOTS_DEFAULT = [
    { value: '12:00', label: '12:00 PM (Lunch)' },
    { value: '15:00', label: '03:00 PM (Snack)' },
    { value: '17:00', label: '05:00 PM (Snack)' },
    { value: '20:00', label: '08:00 PM (Dinner)' }
  ];

  const TIME_SLOTS_SATURDAY = [
    { value: '12:00', label: '12:00 PM (Lunch)' }
  ];

  function getTimeSlotsForDate(isoDate) {
    if (!isoDate) return TIME_SLOTS_DEFAULT;
    const d = new Date(isoDate + 'T00:00:00');
    if (isNaN(d.getTime())) return TIME_SLOTS_DEFAULT;
    const dayOfWeek = d.getDay(); // 0 = Sunday, 6 = Saturday
    return dayOfWeek === 6 ? TIME_SLOTS_SATURDAY : TIME_SLOTS_DEFAULT;
  }

  function isDinnerTime(timeValue) {
    return timeValue === '20:00';
  }

  /* ---------------------------------------------------------------------
     2. STATE: persisted in localStorage
     --------------------------------------------------------------------- */

  const STORAGE_KEY = 'senai_cafeteria_state_v1';

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { cart: {}, orders: [], reservations: [] };
      const parsed = JSON.parse(raw);
      return {
        cart: parsed.cart || {},
        orders: parsed.orders || [],
        reservations: parsed.reservations || []
      };
    } catch (e) {
      console.warn('Could not load saved state, starting fresh.', e);
      return { cart: {}, orders: [], reservations: [] };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save state.', e);
    }
  }

  const state = loadState();
  let activeCategory = 'all';
  let searchQuery = '';
  let selectedPayMethod = 'online';
  let ordersTab = 'active';

  /* ---------------------------------------------------------------------
     3. HELPERS
     --------------------------------------------------------------------- */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function formatMoney(n) {
    return `$${n.toFixed(2)}`;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function cartCount() {
    return Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
  }

  function cartTotal() {
    return Object.entries(state.cart).reduce((sum, [id, qty]) => {
      const item = MENU.find(m => m.id === id);
      return item ? sum + item.price * qty : sum;
    }, 0);
  }

  function genId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  }

  /* ---------------------------------------------------------------------
     4. TOASTS / NOTIFICATIONS
     --------------------------------------------------------------------- */

  let unreadNotifications = 0;

  function showToast(title, message, type = 'success') {
    const stack = $('#toastStack');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconPath = type === 'success'
      ? '<path d="M20 6 9 17l-5-5"/>'
      : '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>';
    toast.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconPath}</svg>
      <div class="msg"><strong>${escapeHtml(title)}</strong>${escapeHtml(message)}</div>
    `;
    stack.appendChild(toast);

    unreadNotifications++;
    updateNotifDot();

    setTimeout(() => {
      toast.classList.add('is-leaving');
      setTimeout(() => toast.remove(), 250);
    }, 4200);
  }

  function updateNotifDot() {
    $('#notifDot').hidden = unreadNotifications === 0;
  }

  /* ---------------------------------------------------------------------
     5. NAVIGATION (page routing)
     --------------------------------------------------------------------- */

  function navigateTo(page) {
    $$('.page').forEach(p => p.classList.toggle('is-active', p.dataset.page === page));
    $$('[data-nav]').forEach(btn => {
      const target = btn.dataset.nav;
      const isMatch = target === page || (target.startsWith('reservations-') && page === 'reservations');
      btn.classList.toggle('is-active', isMatch);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'orders') renderOrders();
    if (page === 'reservations') renderReservations();
  }

  $$('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.nav;
      if (target === 'help') {
        showToast('Need help?', 'Visit the front desk or call ext. 204 for support.', 'info');
        return;
      }
      if (target.startsWith('reservations-')) {
        navigateTo('reservations');
        return;
      }
      navigateTo(target);
    });
  });

  /* ---------------------------------------------------------------------
     6. MENU RENDERING + FILTER/SEARCH
     --------------------------------------------------------------------- */

  function renderCategoryChips() {
    const wrap = $('#categoryChips');
    wrap.innerHTML = CATEGORIES.map(cat => `
      <button class="chip label-lg ${cat.id === activeCategory ? 'is-selected' : ''}"
              data-category="${cat.id}" role="tab" aria-selected="${cat.id === activeCategory}">
        ${escapeHtml(cat.label)}
      </button>
    `).join('');

    $$('.chip', wrap).forEach(chip => {
      chip.addEventListener('click', () => {
        activeCategory = chip.dataset.category;
        renderCategoryChips();
        renderMenu();
      });
    });
  }

  function getFilteredMenu() {
    return MENU.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery) || item.desc.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }

  function renderMenu() {
    const grid = $('#productGrid');
    const items = getFilteredMenu();

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1;">
          <p class="headline-md" style="margin-bottom:8px;">No dishes found</p>
          <p class="body-md">Try a different search term or category.</p>
        </div>`;
      return;
    }

    grid.innerHTML = items.map(item => {
      const qty = state.cart[item.id] || 0;
      return `
        <article class="food-card" data-id="${item.id}">
          <div class="food-card__media">
            <img src="${item.img}" alt="${escapeHtml(item.name)}" loading="lazy" />
            ${item.badge ? `
              <span class="food-card__badge">
                <span class="dot" style="background:${item.badge.color}"></span>
                ${escapeHtml(item.badge.text)}
              </span>` : ''}
          </div>
          <div class="food-card__body">
            <h3 class="headline-md food-card__title">${escapeHtml(item.name)}</h3>
            <p class="body-md food-card__desc">${escapeHtml(item.desc)}</p>
            <div class="food-card__footer">
              <span class="food-card__price">${formatMoney(item.price)}</span>
              <div class="qty-zone" data-qty-zone="${item.id}">
                ${qty > 0 ? stepperHtml(item.id, qty) : addButtonHtml(item.id)}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    bindCardEvents(grid);
  }

  function addButtonHtml(id) {
    return `
      <button class="btn-add label-lg" data-add="${id}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add to Cart
      </button>`;
  }

  function stepperHtml(id, qty) {
    return `
      <div class="qty-stepper">
        <button data-decrement="${id}" aria-label="Decrease quantity">&minus;</button>
        <span class="qty-value">${qty}</span>
        <button data-increment="${id}" aria-label="Increase quantity">+</button>
      </div>`;
  }

  function bindCardEvents(scope) {
    $$('[data-add]', scope).forEach(btn => {
      btn.addEventListener('click', () => addToCart(btn.dataset.add));
    });
    $$('[data-increment]', scope).forEach(btn => {
      btn.addEventListener('click', () => addToCart(btn.dataset.increment));
    });
    $$('[data-decrement]', scope).forEach(btn => {
      btn.addEventListener('click', () => decrementCart(btn.dataset.decrement));
    });
  }

  function refreshQtyZone(id) {
    const zone = $(`[data-qty-zone="${id}"]`);
    if (!zone) return;
    const qty = state.cart[id] || 0;
    zone.innerHTML = qty > 0 ? stepperHtml(id, qty) : addButtonHtml(id);
    bindCardEvents(zone);
  }

  /* ---------------------------------------------------------------------
     7. CART LOGIC
     --------------------------------------------------------------------- */

  function addToCart(id) {
    const item = MENU.find(m => m.id === id);
    if (!item) return;
    const wasEmpty = !state.cart[id];
    state.cart[id] = (state.cart[id] || 0) + 1;
    saveState();
    refreshQtyZone(id);
    updateCartBadge();
    renderCartDrawer();
    if (wasEmpty) showToast('Added to cart', `${item.name} — ${formatMoney(item.price)}`, 'success');
  }

  function decrementCart(id) {
    if (!state.cart[id]) return;
    state.cart[id] -= 1;
    if (state.cart[id] <= 0) delete state.cart[id];
    saveState();
    refreshQtyZone(id);
    updateCartBadge();
    renderCartDrawer();
  }

  function removeFromCart(id) {
    delete state.cart[id];
    saveState();
    refreshQtyZone(id);
    updateCartBadge();
    renderCartDrawer();
  }

  function clearCart() {
    state.cart = {};
    saveState();
    renderMenu();
    updateCartBadge();
    renderCartDrawer();
  }

  function updateCartBadge() {
    const count = cartCount();
    const badge = $('#cartBadge');
    badge.textContent = count;
    badge.hidden = count === 0;
  }

  function renderCartDrawer() {
    const body = $('#cartBody');
    const foot = $('#cartFoot');
    const entries = Object.entries(state.cart);

    if (entries.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <p class="headline-md" style="margin-bottom:4px;">Your cart is empty</p>
          <p class="body-md">Add something delicious from the menu.</p>
        </div>`;
      foot.innerHTML = '';
      return;
    }

    body.innerHTML = entries.map(([id, qty]) => {
      const item = MENU.find(m => m.id === id);
      if (!item) return '';
      return `
        <div class="cart-line" data-cart-line="${id}">
          <img src="${item.img}" alt="${escapeHtml(item.name)}" />
          <div class="cart-line__info">
            <p class="name">${escapeHtml(item.name)}</p>
            <p class="unit-price">${formatMoney(item.price)} each</p>
          </div>
          <div class="qty-stepper small">
            <button data-decrement="${id}" aria-label="Decrease quantity">&minus;</button>
            <span class="qty-value">${qty}</span>
            <button data-increment="${id}" aria-label="Increase quantity">+</button>
          </div>
          <button class="cart-line__remove" data-remove="${id}" aria-label="Remove item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>`;
    }).join('');

    $$('[data-increment]', body).forEach(b => b.addEventListener('click', () => addToCart(b.dataset.increment)));
    $$('[data-decrement]', body).forEach(b => b.addEventListener('click', () => decrementCart(b.dataset.decrement)));
    $$('[data-remove]', body).forEach(b => b.addEventListener('click', () => removeFromCart(b.dataset.remove)));

    const total = cartTotal();
    foot.innerHTML = `
      <div class="cart-summary-row"><span>Subtotal</span><span>${formatMoney(total)}</span></div>
      <div class="cart-summary-row total"><span>Total</span><span>${formatMoney(total)}</span></div>
      <button class="btn-primary-solid headline-md" id="checkoutBtn" style="margin-top:8px;">Checkout &amp; Place Order</button>
      <button class="btn-ghost label-lg" id="clearCartBtn">Clear Cart</button>
    `;

    $('#checkoutBtn').addEventListener('click', placeOrder);
    $('#clearCartBtn').addEventListener('click', clearCart);
  }

  function openCart() {
    $('#cartDrawer').classList.add('is-open');
    $('#cartBackdrop').classList.add('is-open');
  }

  function closeCart() {
    $('#cartDrawer').classList.remove('is-open');
    $('#cartBackdrop').classList.remove('is-open');
  }

  $('#cartBtn').addEventListener('click', openCart);
  $('#cartBtnMobile').addEventListener('click', openCart);
  $('#cartCloseBtn').addEventListener('click', closeCart);
  $('#cartBackdrop').addEventListener('click', closeCart);

  /* ---------------------------------------------------------------------
     8. ORDERS — placement + live status simulation
     --------------------------------------------------------------------- */

  function estimatePrepMinutes(items) {
    if (items.length === 0) return 5;
    const maxPrep = Math.max(...items.map(i => {
      const item = MENU.find(m => m.id === i.id);
      return item ? item.prepMins : 5;
    }));
    // Busier kitchen = a bit longer; add small buffer per distinct item.
    return maxPrep + Math.min(items.length - 1, 3) * 2;
  }

  function placeOrder() {
    const entries = Object.entries(state.cart);
    if (entries.length === 0) return;

    const items = entries.map(([id, qty]) => {
      const item = MENU.find(m => m.id === id);
      return { id, name: item.name, price: item.price, qty };
    });

    const total = cartTotal();
    const prepMins = estimatePrepMinutes(items);
    const now = Date.now();

    const order = {
      id: genId('ORD'),
      shortId: `#${Math.floor(100 + Math.random() * 900)}`,
      items,
      total,
      placedAt: now,
      prepMins,
      readyAt: now + prepMins * 60 * 1000,
      stageIndex: 0, // 0 placed, 1 preparing, 2 ready, 3 completed
      status: 'active'
    };

    state.orders.unshift(order);
    state.cart = {};
    saveState();

    renderMenu();
    updateCartBadge();
    renderCartDrawer();
    closeCart();
    renderStatusCard();
    scheduleOrderProgression(order.id);

    openModal(
      'Order Confirmed!',
      `Order ${order.shortId} placed — estimated ready in ${prepMins} min.`,
      order.id
    );
  }

  function scheduleOrderProgression(orderId) {
    // Move: Placed -> Preparing almost immediately, then -> Ready at prepMins, then -> Completed a bit later.
    setTimeout(() => advanceOrderStage(orderId, 1), 1200);

    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    const msUntilReady = Math.max(order.readyAt - Date.now(), 2000);
    setTimeout(() => advanceOrderStage(orderId, 2), msUntilReady);
  }

  function advanceOrderStage(orderId, stageIndex) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order || order.status !== 'active' || order.stageIndex >= stageIndex) return;

    order.stageIndex = stageIndex;
    saveState();
    renderStatusCard();
    renderOrders();

    if (stageIndex === 2) {
      showToast('Order Ready! 🎉', `${order.shortId} is ready for pickup.`, 'success');
    }
  }

  function markOrderCompleted(orderId) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    order.stageIndex = 3;
    order.status = 'history';
    saveState();
    renderStatusCard();
    renderOrders();
    showToast('Order picked up', `${order.shortId} marked as completed.`, 'success');
  }

  function renderStatusCard() {
    const container = $('#statusCardBody');
    const active = state.orders.find(o => o.status === 'active');

    if (!active) {
      container.innerHTML = `<p class="status-card__empty">No active orders right now. Place an order to see live status here.</p>`;
      return;
    }

    const stage = active.stageIndex;
    const stageLabel = PREP_STAGES[stage];
    const barClass = stage >= 2 ? 'is-ready' : (stage === 0 ? 'is-waiting' : '');
    const stateClass = stage >= 2 ? 'is-ready' : (stage === 0 ? 'is-waiting' : '');
    const etaText = stage >= 2
      ? 'Ready now'
      : `Est: ${Math.max(1, Math.ceil((active.readyAt - Date.now()) / 60000))} mins`;

    container.innerHTML = `
      <div class="status-row">
        <div class="status-bar ${barClass}"></div>
        <div class="meta">
          <p class="label-lg state ${stateClass}">${escapeHtml(stageLabel)}</p>
          <p class="body-md dish">Order ${active.shortId} · ${active.items.length} item${active.items.length > 1 ? 's' : ''}</p>
          <p class="label-md eta">${etaText}</p>
        </div>
      </div>`;
  }

  /* ---------------------------------------------------------------------
     9. ORDERS PAGE (tabs + progress tracker)
     --------------------------------------------------------------------- */

  $$('[data-orders-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      ordersTab = tab.dataset.ordersTab;
      $$('[data-orders-tab]').forEach(t => t.classList.toggle('is-active', t === tab));
      renderOrders();
    });
  });

  function renderOrders() {
    const list = $('#ordersList');
    const orders = state.orders.filter(o => ordersTab === 'active' ? o.status === 'active' : o.status === 'history');

    if (orders.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <p class="headline-md" style="margin-bottom:8px;">${ordersTab === 'active' ? 'No active orders' : 'No past orders yet'}</p>
          <p class="body-md">${ordersTab === 'active' ? 'Place an order from the Menu page to track it here.' : 'Completed orders will show up here.'}</p>
        </div>`;
      return;
    }

    list.innerHTML = orders.map(order => orderCardHtml(order)).join('');

    $$('[data-mark-done]', list).forEach(btn => {
      btn.addEventListener('click', () => markOrderCompleted(btn.dataset.markDone));
    });
  }

  function orderCardHtml(order) {
    const stage = order.stageIndex;
    const placedDate = new Date(order.placedAt);
    const timeStr = placedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const stepsHtml = PREP_STAGES.map((label, i) => {
      let cls = '';
      if (i < stage) cls = 'is-done';
      else if (i === stage) cls = 'is-current';
      return `
        <div class="progress-step ${cls}">
          <div class="line"></div>
          <div class="dot">${i < stage ? '✓' : i + 1}</div>
          <span class="label">${escapeHtml(label)}</span>
        </div>`;
    }).join('');

    const itemsHtml = order.items.map(it => `
      <div class="order-line">
        <span><strong>${it.qty}×</strong> ${escapeHtml(it.name)}</span>
        <span>${formatMoney(it.price * it.qty)}</span>
      </div>`).join('');

    const readyBanner = stage === 2
      ? `<div class="ready-banner"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M20 6 9 17l-5-5"/></svg> Ready for pickup now!</div>`
      : '';

    const actionBtn = (order.status === 'active' && stage === 2)
      ? `<button class="btn-outline-blue label-lg" data-mark-done="${order.id}" style="margin-top:12px;">Mark as Picked Up</button>`
      : '';

    return `
      <div class="order-card">
        <div class="order-card__head">
          <div>
            <p class="headline-md" style="margin:0;">Order ${order.shortId}</p>
            <p class="order-id label-md">Placed at ${timeStr} · Est. ${order.prepMins} min</p>
          </div>
          <span class="status-pill ${stage >= 2 ? 'confirmed' : 'pending'}">${escapeHtml(PREP_STAGES[stage])}</span>
        </div>

        <div class="progress-track">${stepsHtml}</div>
        ${readyBanner}

        <div class="order-card__items">
          ${itemsHtml}
          <div class="order-card__total"><span>Total</span><span>${formatMoney(order.total)}</span></div>
        </div>
        ${actionBtn}
      </div>`;
  }

  /* ---------------------------------------------------------------------
     10. RESERVATIONS (scheduled meals)
     --------------------------------------------------------------------- */

  $$('[data-pay]', document).forEach(btn => {
    btn.addEventListener('click', () => {
      selectedPayMethod = btn.dataset.pay;
      $$('[data-pay]').forEach(b => b.classList.toggle('is-selected', b === btn));
    });
  });

  function populateTimeSlots(isoDate) {
    const select = $('#schedTime');
    const slots = getTimeSlotsForDate(isoDate);
    const previousValue = select.value;

    select.innerHTML = slots.map(s => `<option value="${s.value}">${escapeHtml(s.label)}</option>`).join('');

    // Keep the previous selection if it's still valid for the new date, otherwise default to the first slot.
    if (slots.some(s => s.value === previousValue)) {
      select.value = previousValue;
    } else {
      select.value = slots[0].value;
    }

    // Let the person know Saturday has a single, reduced slot.
    const note = $('#schedSaturdayNote');
    if (note) {
      const d = new Date(isoDate + 'T00:00:00');
      const isSaturday = !isNaN(d.getTime()) && d.getDay() === 6;
      note.hidden = !isSaturday;
    }
  }

  $('#schedDate').addEventListener('change', (e) => {
    populateTimeSlots(e.target.value);
  });

  $('#scheduleForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const date = $('#schedDate').value;
    const time = $('#schedTime').value;

    if (!date) {
      showToast('Pick a date', 'Please select a date for your meal.', 'info');
      return;
    }

    if (!time) {
      showToast('Pick a time', 'Please select a pickup time.', 'info');
      return;
    }

    const reservation = {
      id: genId('RES'),
      date,
      time,
      mealType: isDinnerTime(time) ? 'Dinner' : 'Lunch',
      payment: selectedPayMethod,
      status: selectedPayMethod === 'online' ? 'confirmed' : 'pending',
      createdAt: Date.now()
    };

    state.reservations.unshift(reservation);
    saveState();
    renderReservations();

    openModal(
      'Schedule Confirmed!',
      `${reservation.mealType} reserved for ${formatReadableDate(date)} at ${formatTimeLabel(time)}.`,
      null
    );

    e.target.reset();
    populateTimeSlots($('#schedDate').value);
  });

  function formatReadableDate(isoDate) {
    const d = new Date(isoDate + 'T00:00:00');
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function formatTimeLabel(timeValue) {
    const slot = [...TIME_SLOTS_DEFAULT, ...TIME_SLOTS_SATURDAY].find(s => s.value === timeValue);
    return slot ? slot.label : timeValue;
  }

  function renderReservations() {
    const list = $('#reservationsList');
    if (state.reservations.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <p class="headline-md" style="margin-bottom:8px;">No reservations yet</p>
          <p class="body-md">Schedule your lunch or dinner from the Menu page to skip the line.</p>
        </div>`;
      return;
    }

    list.innerHTML = state.reservations.map(r => `
      <div class="reservation-card">
        <div class="reservation-card__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${r.mealType === 'Dinner'
              ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
              : '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'}
          </svg>
        </div>
        <div class="reservation-card__info">
          <p class="body-md" style="font-weight:600;">${escapeHtml(r.mealType)} — ${formatReadableDate(r.date)}</p>
          <p class="meta label-md">${escapeHtml(formatTimeLabel(r.time))} · ${r.payment === 'online' ? 'Paid online' : 'Pay at pickup'}</p>
        </div>
        <span class="status-pill ${r.status}">${r.status === 'confirmed' ? 'Confirmed' : 'Pending payment'}</span>
        <button class="btn-ghost label-lg" data-cancel-res="${r.id}">Cancel</button>
      </div>
    `).join('');

    $$('[data-cancel-res]', list).forEach(btn => {
      btn.addEventListener('click', () => cancelReservation(btn.dataset.cancelRes));
    });
  }

  function cancelReservation(id) {
    state.reservations = state.reservations.filter(r => r.id !== id);
    saveState();
    renderReservations();
    showToast('Reservation cancelled', 'Your scheduled meal has been removed.', 'info');
  }

  /* ---------------------------------------------------------------------
     11. CONFIRMATION MODAL
     --------------------------------------------------------------------- */

  let modalOrderId = null;

  function openModal(title, message, orderId) {
    $('#modalTitle').textContent = title;
    $('#modalMessage').textContent = message;
    modalOrderId = orderId;
    $('#modalTrackBtn').style.display = orderId ? '' : 'none';
    $('#modalBackdrop').classList.add('is-open');
  }

  function closeModal() {
    $('#modalBackdrop').classList.remove('is-open');
    modalOrderId = null;
  }

  $('#modalCloseBtn').addEventListener('click', closeModal);
  $('#modalBackdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  $('#modalTrackBtn').addEventListener('click', () => {
    closeModal();
    navigateTo('orders');
  });

  /* ---------------------------------------------------------------------
     12. SEARCH
     --------------------------------------------------------------------- */

  $('#menuSearch').addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderMenu();
  });

  /* ---------------------------------------------------------------------
     13. NOTIFICATIONS BELL
     --------------------------------------------------------------------- */

  $('#notifBtn').addEventListener('click', () => {
    unreadNotifications = 0;
    updateNotifDot();
    const active = state.orders.find(o => o.status === 'active');
    if (active) {
      showToast('Order update', `${active.shortId} is ${PREP_STAGES[active.stageIndex].toLowerCase()}.`, 'info');
    } else {
      showToast('All caught up', 'No new notifications.', 'info');
    }
  });

  /* ---------------------------------------------------------------------
     13b. RECOMMENDATION AGENT — automatic suggestions by time of day
     --------------------------------------------------------------------- */

  function getTimeContext() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 11) {
      return {
        category: 'drinks',
        title: 'Start your day right',
        message: "It's breakfast hours — here are light, energizing picks to get you going."
      };
    }
    if (hour >= 11 && hour < 14) {
      return {
        category: 'lunch',
        title: "It's lunch time!",
        message: 'Peak lunch hours — these hearty plates are our top picks right now.'
      };
    }
    if (hour >= 14 && hour < 17) {
      return {
        category: 'snacks',
        title: 'Afternoon craving?',
        message: 'A bit early for dinner — these snacks hit the spot between meals.'
      };
    }
    if (hour >= 17 && hour < 21) {
      return {
        category: 'lunch',
        title: 'Dinner is served',
        message: 'Evening service is open — here are tonight\u2019s most popular dishes.'
      };
    }
    return {
      category: 'desserts',
      title: 'Late-night treat',
      message: 'Kitchen is winding down, but these grab-and-go treats are still available.'
    };
  }

  function pickAgentSuggestions(context) {
    const sameCategory = MENU.filter(m => m.category === context.category);
    const pool = sameCategory.length >= 3 ? sameCategory : MENU;
    // Shuffle a copy so refresh feels alive, then take the first 3.
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }

  function renderAgent() {
    const context = getTimeContext();
    const picks = pickAgentSuggestions(context);

    $('#agentTitle').textContent = context.title;
    $('#agentMessage').textContent = context.message;

    $('#agentPicks').innerHTML = picks.map(item => `
      <button class="agent-pick" data-agent-pick="${item.id}" title="Add ${escapeHtml(item.name)} to cart">
        <img src="${item.img}" alt="${escapeHtml(item.name)}" loading="lazy" />
        <div class="agent-pick__info">
          <p class="agent-pick__name">${escapeHtml(item.name)}</p>
          <p class="agent-pick__price">${formatMoney(item.price)}</p>
        </div>
      </button>
    `).join('');

    $$('[data-agent-pick]', $('#agentPicks')).forEach(btn => {
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.agentPick);
        renderMenu();
      });
    });
  }

  $('#agentRefreshBtn').addEventListener('click', () => {
    const btn = $('#agentRefreshBtn');
    btn.classList.add('is-spinning');
    renderAgent();
    setTimeout(() => btn.classList.remove('is-spinning'), 400);
  });

  /* ---------------------------------------------------------------------
     14. INIT
     --------------------------------------------------------------------- */

  function setMinDateToday() {
    const input = $('#schedDate');
    const today = new Date().toISOString().split('T')[0];
    input.min = today;
    if (!input.value) input.value = today;
    populateTimeSlots(input.value);
  }

  function resumeInFlightOrders() {
    // On reload, re-arm timers for any orders still mid-flight so status keeps progressing.
    state.orders.forEach(order => {
      if (order.status !== 'active') return;
      if (order.stageIndex === 0) {
        setTimeout(() => advanceOrderStage(order.id, 1), 800);
      }
      if (order.stageIndex < 2) {
        const msUntilReady = Math.max(order.readyAt - Date.now(), 1500);
        setTimeout(() => advanceOrderStage(order.id, 2), msUntilReady);
      }
    });
  }

  function init() {
    renderCategoryChips();
    renderMenu();
    renderAgent();
    updateCartBadge();
    renderCartDrawer();
    renderStatusCard();
    renderReservations();
    renderOrders();
    setMinDateToday();
    resumeInFlightOrders();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
