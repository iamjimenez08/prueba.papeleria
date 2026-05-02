// pages.jsx — Home / Catalog / Info / Admin / Checkout views

// ── Home ─────────────────────────────────────────────────────────────────────
function HPHome({ products, onAdd, onGoCatalog, primary, density, cardVariant }) {
  const top = products.filter((p) => p.top).slice(0, 4);
  const [slide, setSlide] = React.useState(0);
  const slides = [
    { tag: 'PROMO DE TEMPORADA', title: 'Vuelta a clases\ncon estilo Happy', sub: '20% en cuadernos y mochilas seleccionadas. Solo durante mayo.', cta: 'Ver promociones', tone: 0 },
    { tag: 'NUEVO', title: 'Línea pastel\npara bullet journal', sub: 'Plumones, washi tape y libretas punteadas que combinan.', cta: 'Explorar', tone: 1 },
    { tag: 'SERVICIO', title: 'Imprimimos\ntu tesis hoy', sub: 'Encuadernado profesional desde $149. Entrega en 2 horas.', cta: 'Ver servicios', tone: 2 },
  ];
  React.useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const s = slides[slide];
  const sTone = HP_TONES[s.tone];

  return (
    <div className="hp-page">
      {/* HERO */}
      <section className="hp-hero" style={{ background: sTone.bg }}>
        <div className="hp-hero-inner">
          <div className="hp-hero-text">
            <span className="hp-hero-tag" style={{ color: sTone.stripe }}>● {s.tag}</span>
            <h1 className="hp-hero-title">{s.title}</h1>
            <p className="hp-hero-sub">{s.sub}</p>
            <div className="hp-hero-actions">
              <button className="hp-btn hp-btn--primary" style={{ background: primary }} onClick={onGoCatalog}>
                {s.cta} →
              </button>
              <button className="hp-btn hp-btn--ghost" onClick={onGoCatalog}>Ver catálogo</button>
            </div>
          </div>
          <div className="hp-hero-art" aria-hidden="true">
            <svg viewBox="0 0 360 320" width="100%" height="100%">
              <defs>
                <pattern id="hgrid" width="14" height="14" patternUnits="userSpaceOnUse">
                  <path d="M 14 0 L 0 0 0 14" fill="none" stroke={sTone.stripe} strokeWidth=".5" opacity=".35"/>
                </pattern>
              </defs>
              <rect x="40" y="60" width="200" height="240" rx="6" fill="#fff" stroke="#111" strokeWidth="2"/>
              <rect x="40" y="60" width="200" height="240" rx="6" fill={`url(#hgrid)`}/>
              <rect x="80" y="40" width="200" height="240" rx="6" fill={sTone.stripe} opacity=".18" stroke="#111" strokeWidth="2"/>
              <circle cx="280" cy="90" r="36" fill={primary} stroke="#111" strokeWidth="2"/>
              <text x="280" y="96" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="14" fontWeight="700" fill="#fff">−20%</text>
              <rect x="200" y="200" width="120" height="80" rx="4" fill="#fff" stroke="#111" strokeWidth="2"/>
              <line x1="216" y1="222" x2="304" y2="222" stroke={sTone.stripe} strokeWidth="2"/>
              <line x1="216" y1="240" x2="304" y2="240" stroke={sTone.stripe} strokeWidth="2"/>
              <line x1="216" y1="258" x2="270" y2="258" stroke={sTone.stripe} strokeWidth="2"/>
            </svg>
          </div>
        </div>
        <div className="hp-hero-dots">
          {slides.map((_, i) => (
            <button key={i} className={`hp-dot ${i === slide ? 'on' : ''}`}
                    onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}/>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="hp-section">
        <div className="hp-section-hd">
          <h2>Explora por categoría</h2>
          <button className="hp-link" onClick={onGoCatalog}>Ver todo →</button>
        </div>
        <div className="hp-cats">
          {HP_CATEGORIES.slice(0, 8).map((c, i) => {
            const tone = HP_TONES[i % HP_TONES.length];
            return (
              <button key={c.id} className="hp-cat" onClick={onGoCatalog}
                      style={{ background: tone.bg }}>
                <span className="hp-cat-ic" style={{ color: tone.stripe }}>{c.icon}</span>
                <span className="hp-cat-lbl">{c.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* TOP PRODUCTOS */}
      <section className="hp-section">
        <div className="hp-section-hd">
          <h2>Lo más vendido</h2>
          <button className="hp-link" onClick={onGoCatalog}>Ver todo →</button>
        </div>
        <div className={`hp-grid hp-grid--${density}`}>
          {top.map((p) => (
            <HPProductCard key={p.id} product={p} onAdd={onAdd}
                          variant={cardVariant} density={density} primary={primary} />
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="hp-section hp-services-section">
        <div className="hp-section-hd"><h2>Servicios en sitio</h2></div>
        <div className="hp-services">
          {HP_SERVICES.map((s, i) => (
            <div key={s.id} className="hp-service" style={{ borderColor: HP_TONES[i].stripe }}>
              <div className="hp-service-ic" style={{ color: HP_TONES[i].stripe }}>{s.icon}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Catalog ──────────────────────────────────────────────────────────────────
function HPCatalog({ products, onAdd, primary, density, cardVariant }) {
  const [cat, setCat] = React.useState('all');
  const [q, setQ] = React.useState('');
  const [sort, setSort] = React.useState('relevance');

  const filtered = React.useMemo(() => {
    let r = products.filter((p) => (cat === 'all' || p.cat === cat) &&
      (!q || p.name.toLowerCase().includes(q.toLowerCase())));
    if (sort === 'price-asc') r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') r = [...r].sort((a, b) => b.price - a.price);
    if (sort === 'name') r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [products, cat, q, sort]);

  return (
    <div className="hp-page">
      <div className="hp-cat-hd">
        <div>
          <h1>Catálogo</h1>
          <p className="hp-muted">{filtered.length} productos disponibles</p>
        </div>
        <div className="hp-search">
          <span className="hp-search-ic">⌕</span>
          <input value={q} onChange={(e) => setQ(e.target.value)}
                 placeholder="Buscar productos…" />
        </div>
      </div>

      <div className="hp-cat-toolbar">
        <div className="hp-chips">
          <button className={`hp-chip ${cat === 'all' ? 'on' : ''}`}
                  style={cat === 'all' ? { background: primary, color: '#fff', borderColor: primary } : null}
                  onClick={() => setCat('all')}>Todos</button>
          {HP_CATEGORIES.map((c) => (
            <button key={c.id} className={`hp-chip ${cat === c.id ? 'on' : ''}`}
                    style={cat === c.id ? { background: primary, color: '#fff', borderColor: primary } : null}
                    onClick={() => setCat(c.id)}>
              <span className="hp-chip-ic">{c.icon}</span> {c.label}
            </button>
          ))}
        </div>
        <select className="hp-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="relevance">Ordenar: Relevancia</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre A-Z</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="hp-noresults">
          <div className="hp-empty-ic">⌕</div>
          <p>No encontramos productos con esos filtros.</p>
          <button className="hp-btn hp-btn--ghost" onClick={() => { setCat('all'); setQ(''); }}>Limpiar filtros</button>
        </div>
      ) : (
        <div className={`hp-grid hp-grid--${density}`}>
          {filtered.map((p) => (
            <HPProductCard key={p.id} product={p} onAdd={onAdd}
                          variant={cardVariant} density={density} primary={primary} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Info ─────────────────────────────────────────────────────────────────────
function HPInfo({ primary }) {
  return (
    <div className="hp-page hp-info">
      <div className="hp-info-hero" style={{ background: primary }}>
        <h1>Visítanos en Happy Paper</h1>
        <p>Una papelería pensada para creadores, estudiantes y oficinas. Ven a sentir el papel.</p>
      </div>

      <div className="hp-info-grid">
        <section className="hp-info-card">
          <h2>📍 Ubicación</h2>
          <p className="hp-info-big">Av. Reforma 124, Local 3<br/>Col. Centro, CP 06000<br/>Ciudad de México</p>
          <a className="hp-link" href="#" onClick={(e) => e.preventDefault()}>Cómo llegar →</a>
          <div className="hp-map" aria-hidden="true">
            <svg viewBox="0 0 400 200" width="100%" height="100%">
              <defs>
                <pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth=".5"/>
                </pattern>
              </defs>
              <rect width="400" height="200" fill="#f1f5f9"/>
              <rect width="400" height="200" fill="url(#mapgrid)"/>
              <path d="M0 110 Q100 95 200 105 T400 100" stroke="#94a3b8" strokeWidth="3" fill="none"/>
              <path d="M150 0 L160 200" stroke="#94a3b8" strokeWidth="2" fill="none"/>
              <path d="M280 0 L270 200" stroke="#94a3b8" strokeWidth="2" fill="none"/>
              <circle cx="215" cy="105" r="14" fill={primary} stroke="#fff" strokeWidth="3"/>
              <circle cx="215" cy="105" r="4" fill="#fff"/>
            </svg>
          </div>
        </section>

        <section className="hp-info-card">
          <h2>🕐 Horarios</h2>
          <ul className="hp-hours">
            <li><span>Lunes – Viernes</span><span>9:00 – 20:00</span></li>
            <li><span>Sábado</span><span>10:00 – 18:00</span></li>
            <li><span>Domingo</span><span className="hp-muted">Cerrado</span></li>
          </ul>
          <div className="hp-status">
            <span className="hp-status-dot"/>Abierto ahora
          </div>
        </section>

        <section className="hp-info-card">
          <h2>📞 Contacto</h2>
          <ul className="hp-contact">
            <li><b>Teléfono</b><a href="tel:+525555123456">55 5512 3456</a></li>
            <li><b>WhatsApp</b><a href="#" onClick={(e) => e.preventDefault()}>55 1234 5678</a></li>
            <li><b>Email</b><a href="mailto:hola@happypaper.mx">hola@happypaper.mx</a></li>
          </ul>
          <a className="hp-btn hp-btn--primary" style={{ background: primary, marginTop: 12, display: 'inline-flex' }}
             href="#" onClick={(e) => e.preventDefault()}>
            Escríbenos por WhatsApp →
          </a>
        </section>

        <section className="hp-info-card">
          <h2>✦ Síguenos</h2>
          <div className="hp-social">
            <a href="#" onClick={(e) => e.preventDefault()} className="hp-social-link">
              <span>IG</span><div><b>@happypaper.mx</b><small>12.4k seguidores</small></div>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hp-social-link">
              <span>FB</span><div><b>Happy Paper</b><small>3.8k me gusta</small></div>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hp-social-link">
              <span>TT</span><div><b>@happypaper</b><small>Tutoriales y tips</small></div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

// ── Admin ────────────────────────────────────────────────────────────────────
function HPAdmin({ products, setProducts, primary }) {
  const [editing, setEditing] = React.useState(null); // product or "new"
  const [draft, setDraft] = React.useState(null);
  const [filter, setFilter] = React.useState('');

  const startNew = () => {
    setEditing('new');
    setDraft({ id: 'p' + Date.now(), name: '', cat: 'cuadernos', price: 0, stock: 0, tone: 0, top: false, badge: '', desc: '' });
  };
  const startEdit = (p) => { setEditing(p.id); setDraft({ ...p }); };
  const cancel = () => { setEditing(null); setDraft(null); };
  const save = () => {
    if (!draft.name.trim()) return;
    if (editing === 'new') {
      setProducts((ps) => [{ ...draft, price: Number(draft.price) || 0, stock: Number(draft.stock) || 0 }, ...ps]);
    } else {
      setProducts((ps) => ps.map((p) => p.id === draft.id ? { ...draft, price: Number(draft.price) || 0, stock: Number(draft.stock) || 0 } : p));
    }
    cancel();
  };
  const remove = (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    setProducts((ps) => ps.filter((p) => p.id !== id));
  };

  const filtered = products.filter((p) => !filter || p.name.toLowerCase().includes(filter.toLowerCase()));
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock < 10).length;

  return (
    <div className="hp-page hp-admin">
      <div className="hp-admin-hd">
        <div>
          <span className="hp-admin-tag">PANEL DE ADMINISTRACIÓN</span>
          <h1>Inventario</h1>
        </div>
        <button className="hp-btn hp-btn--primary" style={{ background: primary }} onClick={startNew}>
          + Nuevo producto
        </button>
      </div>

      <div className="hp-stats">
        <div className="hp-stat"><span>Productos</span><b>{products.length}</b></div>
        <div className="hp-stat"><span>Unidades en stock</span><b>{totalStock}</b></div>
        <div className="hp-stat"><span>Stock bajo</span><b style={{ color: lowStock > 0 ? '#d6447a' : 'inherit' }}>{lowStock}</b></div>
        <div className="hp-stat"><span>Top ventas</span><b>{products.filter((p) => p.top).length}</b></div>
      </div>

      <div className="hp-search hp-search--admin">
        <span className="hp-search-ic">⌕</span>
        <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Buscar producto…" />
      </div>

      <table className="hp-table">
        <thead>
          <tr><th></th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Top</th><th></th></tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id}>
              <td className="hp-table-thumb"><HPProductImage product={p} height={48}/></td>
              <td className="hp-table-name">{p.name}<small>{p.id}</small></td>
              <td>{HP_CATEGORIES.find((c) => c.id === p.cat)?.label}</td>
              <td className="hp-mono">${p.price}</td>
              <td className={`hp-mono ${p.stock < 10 ? 'hp-low' : ''}`}>{p.stock}</td>
              <td>{p.top ? '★' : '—'}</td>
              <td className="hp-table-acts">
                <button className="hp-iconbtn" onClick={() => startEdit(p)} title="Editar">✎</button>
                <button className="hp-iconbtn" onClick={() => remove(p.id)} title="Eliminar">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <>
          <div className="hp-overlay on" onClick={cancel} />
          <div className="hp-modal">
            <header><h2>{editing === 'new' ? 'Nuevo producto' : 'Editar producto'}</h2>
              <button className="hp-iconbtn" onClick={cancel}>✕</button>
            </header>
            <div className="hp-form">
              <label><span>Nombre</span>
                <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </label>
              <label><span>Descripción</span>
                <textarea rows="3" value={draft.desc} onChange={(e) => setDraft({ ...draft, desc: e.target.value })} />
              </label>
              <div className="hp-form-row">
                <label><span>Categoría</span>
                  <select value={draft.cat} onChange={(e) => setDraft({ ...draft, cat: e.target.value })}>
                    {HP_CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </label>
                <label><span>Tono visual</span>
                  <select value={draft.tone} onChange={(e) => setDraft({ ...draft, tone: Number(e.target.value) })}>
                    {HP_TONES.map((_, i) => <option key={i} value={i}>Tono {i + 1}</option>)}
                  </select>
                </label>
              </div>
              <div className="hp-form-row">
                <label><span>Precio (MXN)</span>
                  <input type="number" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} />
                </label>
                <label><span>Stock</span>
                  <input type="number" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: e.target.value })} />
                </label>
              </div>
              <div className="hp-form-row">
                <label><span>Badge (opcional)</span>
                  <input value={draft.badge || ''} placeholder="Ej. Nuevo, −15%"
                         onChange={(e) => setDraft({ ...draft, badge: e.target.value })} />
                </label>
                <label className="hp-form-check">
                  <input type="checkbox" checked={!!draft.top}
                         onChange={(e) => setDraft({ ...draft, top: e.target.checked })} />
                  <span>Mostrar en "Top ventas"</span>
                </label>
              </div>
              <div className="hp-form-preview">
                <span className="hp-muted">Vista previa</span>
                <HPProductImage product={draft} height={120} />
              </div>
            </div>
            <footer>
              <button className="hp-btn hp-btn--ghost" onClick={cancel}>Cancelar</button>
              <button className="hp-btn hp-btn--primary" style={{ background: primary }} onClick={save}>
                {editing === 'new' ? 'Crear producto' : 'Guardar cambios'}
              </button>
            </footer>
          </div>
        </>
      )}
    </div>
  );
}

// ── Checkout ─────────────────────────────────────────────────────────────────
function HPCheckout({ items, onClose, onComplete, primary }) {
  const [step, setStep] = React.useState(1); // 1: dirección, 2: pago, 3: confirmación
  const [form, setForm] = React.useState({
    name: '', email: '', phone: '',
    street: '', city: 'Ciudad de México', zip: '',
    method: 'card', card: '', exp: '', cvv: '',
  });
  const set = (k, v) => setForm({ ...form, [k]: v });
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal >= 500 ? 0 : 75;
  const total = subtotal + shipping;
  const orderId = React.useMemo(() => 'HP-' + Math.random().toString(36).slice(2, 8).toUpperCase(), []);

  const canStep1 = form.name && form.email && form.street && form.zip;
  const canStep2 = form.method !== 'card' || (form.card.length >= 12 && form.exp && form.cvv);

  return (
    <div className="hp-checkout">
      <header className="hp-checkout-hd">
        <button className="hp-iconbtn" onClick={onClose}>← Volver</button>
        <h1>Finalizar compra</h1>
        <span className="hp-checkout-secure">🔒 Pago seguro</span>
      </header>

      <div className="hp-checkout-body">
        <div className="hp-checkout-main">
          <ol className="hp-steps">
            {['Dirección', 'Pago', 'Confirmación'].map((lbl, i) => (
              <li key={lbl} className={step > i ? 'done' : step === i + 1 ? 'on' : ''}>
                <span style={step >= i + 1 ? { background: primary, borderColor: primary, color: '#fff' } : null}>{i + 1}</span>
                <b>{lbl}</b>
              </li>
            ))}
          </ol>

          {step === 1 && (
            <div className="hp-form hp-form--checkout">
              <h2>Datos de envío</h2>
              <div className="hp-form-row">
                <label><span>Nombre completo *</span><input value={form.name} onChange={(e) => set('name', e.target.value)} /></label>
                <label><span>Teléfono</span><input value={form.phone} onChange={(e) => set('phone', e.target.value)} /></label>
              </div>
              <label><span>Email *</span><input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} /></label>
              <label><span>Calle y número *</span><input value={form.street} onChange={(e) => set('street', e.target.value)} /></label>
              <div className="hp-form-row">
                <label><span>Ciudad *</span><input value={form.city} onChange={(e) => set('city', e.target.value)} /></label>
                <label><span>Código postal *</span><input value={form.zip} onChange={(e) => set('zip', e.target.value)} /></label>
              </div>
              <button className="hp-btn hp-btn--primary hp-btn--block" disabled={!canStep1}
                      style={{ background: canStep1 ? primary : '#ccc' }}
                      onClick={() => setStep(2)}>
                Continuar al pago →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="hp-form hp-form--checkout">
              <h2>Método de pago</h2>
              <div className="hp-paymethods">
                {[
                  { v: 'card', l: 'Tarjeta', d: 'Crédito o débito' },
                  { v: 'oxxo', l: 'OXXO', d: 'Pago en efectivo' },
                  { v: 'transfer', l: 'Transferencia', d: 'SPEI bancario' },
                ].map((m) => (
                  <label key={m.v} className={`hp-paymethod ${form.method === m.v ? 'on' : ''}`}
                         style={form.method === m.v ? { borderColor: primary } : null}>
                    <input type="radio" checked={form.method === m.v} onChange={() => set('method', m.v)}/>
                    <div><b>{m.l}</b><small>{m.d}</small></div>
                  </label>
                ))}
              </div>
              {form.method === 'card' && (
                <>
                  <label><span>Número de tarjeta</span>
                    <input value={form.card} onChange={(e) => set('card', e.target.value.replace(/[^\d ]/g, ''))} placeholder="1234 5678 9012 3456" />
                  </label>
                  <div className="hp-form-row">
                    <label><span>Vencimiento</span><input value={form.exp} onChange={(e) => set('exp', e.target.value)} placeholder="MM/AA" /></label>
                    <label><span>CVV</span><input value={form.cvv} onChange={(e) => set('cvv', e.target.value)} placeholder="123" /></label>
                  </div>
                </>
              )}
              {form.method === 'oxxo' && <p className="hp-info-msg">Recibirás un código de pago en tu correo. Tienes 3 días para pagarlo en cualquier OXXO.</p>}
              {form.method === 'transfer' && <p className="hp-info-msg">Te enviaremos los datos bancarios al confirmar el pedido.</p>}
              <div className="hp-form-actions">
                <button className="hp-btn hp-btn--ghost" onClick={() => setStep(1)}>← Atrás</button>
                <button className="hp-btn hp-btn--primary" disabled={!canStep2}
                        style={{ background: canStep2 ? primary : '#ccc' }}
                        onClick={() => setStep(3)}>Confirmar pedido →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="hp-confirm">
              <div className="hp-confirm-ic" style={{ background: primary }}>✓</div>
              <h2>¡Pedido confirmado!</h2>
              <p>Hola {form.name.split(' ')[0]}, recibimos tu pedido <b>{orderId}</b>.</p>
              <p className="hp-muted">Te enviaremos un correo a <b>{form.email}</b> con el seguimiento.</p>
              <div className="hp-confirm-summary">
                <div><span>Total pagado</span><b>${total.toFixed(0)}</b></div>
                <div><span>Entrega estimada</span><b>3 – 5 días hábiles</b></div>
              </div>
              <button className="hp-btn hp-btn--primary" style={{ background: primary }} onClick={onComplete}>
                Volver a la tienda
              </button>
            </div>
          )}
        </div>

        <aside className="hp-checkout-side">
          <h3>Resumen</h3>
          <ul className="hp-side-items">
            {items.map((it) => (
              <li key={it.id}>
                <div className="hp-side-thumb"><HPProductImage product={it} height={56}/></div>
                <div className="hp-side-info">
                  <div>{it.name}</div>
                  <small>Cant. {it.qty}</small>
                </div>
                <div className="hp-mono">${(it.price * it.qty).toFixed(0)}</div>
              </li>
            ))}
          </ul>
          <div className="hp-side-totals">
            <div><span>Subtotal</span><span>${subtotal}</span></div>
            <div><span>Envío</span><span>{shipping === 0 ? 'GRATIS' : `$${shipping}`}</span></div>
            <div className="hp-side-total"><span>Total</span><span>${total}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { HPHome, HPCatalog, HPInfo, HPAdmin, HPCheckout });
