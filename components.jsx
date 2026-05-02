// components.jsx — Reusable UI atoms for Happy Paper

// ── ProductImage ─────────────────────────────────────────────────────────────
// Stylized SVG placeholder so the catalog looks alive without real photography.
// Renders a tinted "paper" surface with an iconographic shape derived from the
// category, plus a subtle grid pattern. The user can swap real images later.
function HPProductImage({ product, height = 180 }) {
  const tone = HP_TONES[product.tone % HP_TONES.length];
  const cat = HP_CATEGORIES.find((c) => c.id === product.cat);
  const initials = product.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  // Per-category abstract shape — keeps things simple, no SVG illustrations.
  const shape = {
    cuadernos:  <rect x="40" y="32" width="120" height="116" rx="4" fill={tone.stripe} opacity=".2" stroke={tone.stripe} strokeWidth="1.5" />,
    escritura:  <g><rect x="92" y="20" width="16" height="140" rx="3" fill={tone.stripe} opacity=".25" stroke={tone.stripe} strokeWidth="1.5"/><polygon points="100,160 92,148 108,148" fill={tone.stripe}/></g>,
    escolar:    <g><rect x="44" y="50" width="112" height="100" rx="6" fill={tone.stripe} opacity=".2" stroke={tone.stripe} strokeWidth="1.5"/><rect x="76" y="38" width="48" height="22" rx="4" fill="none" stroke={tone.stripe} strokeWidth="1.5"/></g>,
    arte:       <circle cx="100" cy="90" r="48" fill={tone.stripe} opacity=".22" stroke={tone.stripe} strokeWidth="1.5"/>,
    oficina:    <g><rect x="50" y="60" width="100" height="60" fill={tone.stripe} opacity=".2" stroke={tone.stripe} strokeWidth="1.5"/><line x1="50" y1="78" x2="150" y2="78" stroke={tone.stripe} strokeWidth="1"/></g>,
    stickers:   <g><circle cx="80" cy="78" r="22" fill={tone.stripe} opacity=".25"/><circle cx="120" cy="100" r="28" fill={tone.stripe} opacity=".18"/><circle cx="92" cy="118" r="14" fill={tone.stripe} opacity=".3"/></g>,
    agendas:    <g><rect x="46" y="32" width="108" height="116" rx="3" fill={tone.stripe} opacity=".2" stroke={tone.stripe} strokeWidth="1.5"/><line x1="100" y1="32" x2="100" y2="148" stroke={tone.stripe} strokeWidth="1"/></g>,
    servicios:  <g><rect x="50" y="48" width="100" height="84" rx="4" fill="none" stroke={tone.stripe} strokeWidth="1.5"/><line x1="62" y1="68" x2="138" y2="68" stroke={tone.stripe} strokeWidth="1"/><line x1="62" y1="82" x2="138" y2="82" stroke={tone.stripe} strokeWidth="1"/><line x1="62" y1="96" x2="118" y2="96" stroke={tone.stripe} strokeWidth="1"/></g>,
    regalos:    <g><rect x="50" y="60" width="100" height="80" fill={tone.stripe} opacity=".18" stroke={tone.stripe} strokeWidth="1.5"/><rect x="92" y="40" width="16" height="100" fill={tone.stripe} opacity=".35"/></g>,
    diseno:     <g><polygon points="100,40 160,140 40,140" fill={tone.stripe} opacity=".22" stroke={tone.stripe} strokeWidth="1.5"/></g>,
  }[product.cat] || null;

  return (
    <div className="hp-pimg" style={{ background: tone.bg, height }}>
      <svg viewBox="0 0 200 180" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
        <defs>
          <pattern id={`grid-${product.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={tone.stripe} strokeWidth=".4" opacity=".25"/>
          </pattern>
        </defs>
        <rect width="200" height="180" fill={`url(#grid-${product.id})`} />
        {shape}
        <text x="14" y="170" fontFamily="ui-monospace, monospace" fontSize="9"
              fill={tone.stripe} opacity=".7" letterSpacing=".05em">
          {cat?.label.toUpperCase()}
        </text>
        <text x="186" y="22" fontFamily="ui-monospace, monospace" fontSize="11" textAnchor="end"
              fontWeight="700" fill={tone.stripe}>
          {initials}
        </text>
      </svg>
    </div>
  );
}

// ── ProductCard ──────────────────────────────────────────────────────────────
// Variant prop drives the visual style (one of the Tweaks)
function HPProductCard({ product, onAdd, variant = 'bordered', density = 'regular', primary }) {
  const cat = HP_CATEGORIES.find((c) => c.id === product.cat);
  const imgH = density === 'compact' ? 130 : density === 'comfy' ? 220 : 180;

  return (
    <article className={`hp-card hp-card--${variant} hp-card--${density}`}>
      {product.badge && (
        <span className="hp-badge" style={{ background: primary }}>{product.badge}</span>
      )}
      <HPProductImage product={product} height={imgH} />
      <div className="hp-card-body">
        <div className="hp-card-cat">{cat?.label}</div>
        <h3 className="hp-card-name">{product.name}</h3>
        <div className="hp-card-foot">
          <span className="hp-price">${product.price}</span>
          <button className="hp-btn hp-btn--add"
                  style={{ background: primary }}
                  onClick={() => onAdd(product)}
                  aria-label={`Agregar ${product.name}`}>
            <span>＋</span> Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Cart drawer ──────────────────────────────────────────────────────────────
function HPCartDrawer({ open, onClose, items, setQty, removeItem, onCheckout, primary }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal > 0 ? (subtotal >= 500 ? 0 : 75) : 0;
  const total = subtotal + shipping;

  return (
    <>
      <div className={`hp-overlay ${open ? 'on' : ''}`} onClick={onClose} />
      <aside className={`hp-drawer ${open ? 'on' : ''}`} aria-hidden={!open}>
        <header className="hp-drawer-hd">
          <h2>Tu carrito</h2>
          <button className="hp-iconbtn" onClick={onClose} aria-label="Cerrar">✕</button>
        </header>

        {items.length === 0 ? (
          <div className="hp-empty">
            <div className="hp-empty-ic">◔</div>
            <p>Aún no tienes productos en tu carrito.</p>
            <button className="hp-btn hp-btn--ghost" onClick={onClose}>Seguir comprando</button>
          </div>
        ) : (
          <>
            <ul className="hp-cartlist">
              {items.map((it) => (
                <li key={it.id} className="hp-cartitem">
                  <div className="hp-cartitem-img">
                    <HPProductImage product={it} height={72} />
                  </div>
                  <div className="hp-cartitem-info">
                    <div className="hp-cartitem-name">{it.name}</div>
                    <div className="hp-cartitem-price">${it.price}</div>
                    <div className="hp-qty">
                      <button onClick={() => setQty(it.id, it.qty - 1)} aria-label="Menos">−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => setQty(it.id, it.qty + 1)} aria-label="Más">＋</button>
                      <button className="hp-qty-rm" onClick={() => removeItem(it.id)} aria-label="Eliminar">Eliminar</button>
                    </div>
                  </div>
                  <div className="hp-cartitem-line">${(it.price * it.qty).toFixed(0)}</div>
                </li>
              ))}
            </ul>

            <div className="hp-cart-totals">
              <div><span>Subtotal</span><span>${subtotal.toFixed(0)}</span></div>
              <div><span>Envío</span><span>{shipping === 0 ? 'GRATIS' : `$${shipping}`}</span></div>
              <div className="hp-cart-total"><span>Total</span><span>${total.toFixed(0)}</span></div>
              {subtotal < 500 && (
                <div className="hp-cart-hint">
                  Te faltan <b>${(500 - subtotal).toFixed(0)}</b> para envío gratis
                </div>
              )}
            </div>

            <button className="hp-btn hp-btn--primary hp-btn--block"
                    style={{ background: primary }}
                    onClick={onCheckout}>
              Continuar al pago →
            </button>
          </>
        )}
      </aside>
    </>
  );
}

// ── Toast ────────────────────────────────────────────────────────────────────
function HPToast({ msg, onDone }) {
  React.useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [msg, onDone]);
  return <div className={`hp-toast ${msg ? 'on' : ''}`}>{msg}</div>;
}

Object.assign(window, { HPProductImage, HPProductCard, HPCartDrawer, HPToast });
