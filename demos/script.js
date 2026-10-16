const projectId = new URLSearchParams(location.search).get('project') || 'citizen-reporting';
const workspace = document.getElementById('demo-workspace');
const nav = document.getElementById('demo-nav');
const toast = document.getElementById('toast');

const projects = {
  'citizen-reporting': {
    title: 'Citizen Reporting Portal', type: 'UI/UX Design · Civic technology', summary: 'Submit and follow a community concern through a clear, accessible reporting flow.', mark: 'CR', nav: ['Report issue','My reports','Community'], render: renderReporting
  },
  'learning-hub': {
    title: 'Learning Hub', type: 'Web Design · Education', summary: 'A focused student dashboard for lessons, progress, and the next useful action.', mark: 'LH', nav: ['Overview','My courses','Schedule'], render: renderLearning
  },
  'creative-studio': {
    title: 'Design System Lab', type: 'UI/UX Design · Interactive design system', summary: 'Explore the colors, type, and reusable components behind a consistent interface.', mark: 'DS', nav: ['Foundations','Components','Guidelines'], render: renderDesignSystem
  },
  'taskflow': {
    title: 'Frontend Playground', type: 'Web development · Interactive UI', summary: 'Try responsive interface components and see how small front-end interactions work.', mark: '</>', nav: ['Components','Responsive','About'], render: renderPlayground
  },
  'booking-platform': {
    title: 'Gather Booking', type: 'Web Design · Scheduling', summary: 'A friendly appointment flow with clear dates, available times, and confirmation.', mark: 'GB', nav: ['Book a visit','My bookings','Help'], render: renderBooking
  },
  'brand-showcase': {
    title: 'Designer & Developer Portfolio', type: 'Portfolio design · Design + code', summary: 'A personal portfolio concept for presenting design work, development projects, and process in one place.', mark: 'KV', nav: ['Selected work','Process','Contact'], render: renderPersonalPortfolio
  }
};

const project = projects[projectId] || projects['citizen-reporting'];
document.title = `${project.title} — Interactive Demo`;
document.getElementById('project-title').textContent = project.title;
document.getElementById('project-type').textContent = project.type;
document.getElementById('project-summary').textContent = project.summary;
document.getElementById('mini-brand').textContent = project.mark;
nav.innerHTML = project.nav.map((item, index) => `<button type="button" class="${index === 0 ? 'active' : ''}">${item}</button>`).join('');
nav.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  nav.querySelectorAll('button').forEach(item => item.classList.toggle('active', item === button));
  showToast(`${button.textContent} view selected`);
});
project.render();

function heading(title, copy) {
  return `<div class="workspace-head"><div><h2>${title}</h2><p>${copy}</p></div><div class="avatar">K</div></div>`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2300);
}

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = String(value);
  return element.innerHTML;
}

function renderReporting() {
  workspace.innerHTML = `${heading('Report a community concern','Share the details below. This demo keeps all information in your browser only.')}
    <div class="stat-grid"><div class="stat"><span>Open reports</span><strong id="open-count">4</strong></div><div class="stat"><span>Resolved this month</span><strong>18</strong></div><div class="stat"><span>Average response</span><strong>2d</strong></div></div>
    <div class="panel"><div class="panel-title"><h3>New report</h3><span>Step 1 of 1</span></div><form id="report-form" class="form-grid">
      <div class="field"><label for="issue">Concern type</label><select id="issue" required><option value="">Select a type</option><option>Road damage</option><option>Street lighting</option><option>Waste collection</option><option>Public safety</option></select></div>
      <div class="field"><label for="location">Location</label><input id="location" placeholder="Street or landmark" required></div>
      <div class="field full"><label for="details">Details</label><textarea id="details" rows="4" placeholder="Describe what you noticed…" required></textarea></div>
      <div class="field full"><button class="primary" type="submit">Submit report</button></div>
    </form></div>
    <div class="panel"><div class="panel-title"><h3>Recent activity</h3><span>Updated today</span></div><div class="list" id="report-list"><div class="list-item"><span class="list-icon">✓</span><div><strong>Streetlight repair</strong><small>Rizal Avenue · Updated 2 hours ago</small></div><span class="badge">In progress</span></div></div></div>`;
  document.getElementById('report-form').addEventListener('submit', event => {
    event.preventDefault();
    const issue = document.getElementById('issue').value;
    const location = document.getElementById('location').value;
    document.getElementById('report-list').insertAdjacentHTML('afterbegin', `<div class="list-item"><span class="list-icon">!</span><div><strong>${escapeHtml(issue)}</strong><small>${escapeHtml(location)} · Just submitted</small></div><span class="badge">Received</span></div>`);
    document.getElementById('open-count').textContent = '5';
    event.currentTarget.reset();
    showToast('Report added to this demo');
  });
}

function renderLearning() {
  const courses = [
    ['Web Foundations','6 of 8 lessons',75,'⌘'],['Human-Centered Design','4 of 10 lessons',40,'◌'],['JavaScript Essentials','7 of 12 lessons',58,'{ }']
  ];
  workspace.innerHTML = `${heading('Welcome back, Kath','Continue where you left off or explore your current learning plan.')}
    <div class="stat-grid"><div class="stat"><span>Courses active</span><strong>3</strong></div><div class="stat"><span>Lessons complete</span><strong id="lesson-count">17</strong></div><div class="stat"><span>Learning streak</span><strong>8d</strong></div></div>
    <div class="panel"><div class="panel-title"><h3>My courses</h3><span>This semester</span></div><div class="course-grid">${courses.map((course,index)=>`<article class="course-card"><div class="course-art">${course[3]}</div><div class="course-body"><h3>${course[0]}</h3><p>${course[1]}</p><div class="progress"><i style="width:${course[2]}%"></i></div><button class="secondary continue-course" data-course="${index}" type="button">Continue lesson</button></div></article>`).join('')}</div></div>`;
  document.querySelectorAll('.continue-course').forEach(button => button.addEventListener('click', () => {
    const count = document.getElementById('lesson-count');
    count.textContent = Number(count.textContent) + 1;
    button.textContent = 'Lesson opened ✓';
    showToast('Lesson progress updated');
  }));
}

function renderDesignSystem() {
  workspace.innerHTML = `${heading('Design foundations','A compact visual system for clear, consistent interface design.')}
    <div class="panel"><div class="panel-title"><h3>Choose an accent palette</h3><span id="palette-name">Terracotta</span></div><div class="palette-options" role="group" aria-label="Accent color palette"><button class="palette-swatch active" type="button" data-color="#bd6547" data-name="Terracotta" aria-label="Terracotta palette"></button><button class="palette-swatch olive" type="button" data-color="#667153" data-name="Olive" aria-label="Olive palette"></button><button class="palette-swatch blue" type="button" data-color="#52728a" data-name="Blue" aria-label="Blue palette"></button></div></div>
    <div class="design-tokens"><article class="token-card"><span>Type scale</span><strong class="token-heading">Aa</strong><small>Manrope · 400—800</small></article><article class="token-card"><span>Spacing</span><div class="spacing-bars"><i></i><i></i><i></i><i></i></div><small>8 · 16 · 24 · 32 px</small></article><article class="token-card"><span>Shape</span><button class="secondary" id="radius-toggle" type="button" aria-pressed="false">Rounded corners: on</button><small>Consistent, reusable rules</small></article></div>
    <div class="panel component-preview" id="component-preview"><div class="panel-title"><h3>Component preview</h3><span>Live tokens</span></div><div class="preview-controls"><button class="lab-primary" type="button" id="sample-action">Primary action</button><button class="lab-secondary" type="button" id="sample-secondary">Secondary action</button><span id="component-message" role="status">Buttons use the selected palette.</span></div></div>`;
  const root = document.getElementById('component-preview');
  document.querySelectorAll('.palette-swatch').forEach(button => button.addEventListener('click', () => {
    root.style.setProperty('--lab-accent', button.dataset.color);
    document.getElementById('palette-name').textContent = button.dataset.name;
    document.querySelectorAll('.palette-swatch').forEach(item => item.classList.toggle('active', item === button));
    showToast(`${button.dataset.name} palette applied`);
  }));
  document.getElementById('radius-toggle').addEventListener('click', event => {
    const rounded = event.currentTarget.getAttribute('aria-pressed') !== 'true';
    event.currentTarget.setAttribute('aria-pressed', String(rounded));
    event.currentTarget.textContent = `Rounded corners: ${rounded ? 'on' : 'off'}`;
    root.classList.toggle('square-corners', !rounded);
    showToast(`Corner style set to ${rounded ? 'rounded' : 'square'}`);
  });
  document.getElementById('sample-action').addEventListener('click', () => { document.getElementById('component-message').textContent = 'Primary action selected.'; });
  document.getElementById('sample-secondary').addEventListener('click', () => { document.getElementById('component-message').textContent = 'Secondary action selected.'; });
}

function renderPlayground() {
  workspace.innerHTML = `${heading('Build, test, refine','A small frontend playground showing responsive components and working interface states.')}
    <div class="stat-grid"><div class="stat"><span>Components</span><strong>08</strong></div><div class="stat"><span>Breakpoints</span><strong>03</strong></div><div class="stat"><span>Current view</span><strong id="view-name">Desktop</strong></div></div>
    <div class="panel"><div class="panel-title"><h3>Responsive preview</h3><div class="view-controls" role="group" aria-label="Preview width"><button class="pill active" type="button" data-view="Desktop">Desktop</button><button class="pill" type="button" data-view="Mobile">Mobile</button></div></div><div class="playground-frame" id="playground-frame"><div class="playground-card"><span class="playground-kicker">KATH · DESIGN + CODE</span><h3>Thoughtful interfaces,<br>made to work.</h3><p>Design details meet practical front-end development.</p><button class="lab-primary" type="button" id="playground-action">Try this button</button><span id="click-count" role="status">Clicked 0 times</span></div></div></div>
    <div class="panel"><div class="panel-title"><h3>What this demo shows</h3><span>HTML · CSS · JavaScript</span></div><div class="list"><div class="list-item"><span class="list-icon">01</span><div><strong>Responsive layout</strong><small>Switch the preview between desktop and mobile widths.</small></div></div><div class="list-item"><span class="list-icon">02</span><div><strong>Interactive state</strong><small>Click the sample action to update its live state.</small></div></div></div></div>`;
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach(item => item.classList.toggle('active', item === button));
    document.getElementById('playground-frame').classList.toggle('mobile', button.dataset.view === 'Mobile');
    document.getElementById('view-name').textContent = button.dataset.view;
  }));
  let clicks = 0;
  document.getElementById('playground-action').addEventListener('click', () => {
    clicks += 1;
    document.getElementById('click-count').textContent = `Clicked ${clicks} time${clicks === 1 ? '' : 's'}`;
  });
}

function renderPersonalPortfolio() {
  const work = [
    ['Campus Connect','Design','A student-focused dashboard concept with a clearer route to key campus services.','UI/UX DESIGN'],
    ['Responsive Landing Page','Development','A responsive web page built with reusable sections and accessible navigation.','HTML · CSS · JS'],
    ['Community Report Flow','Design','A guided reporting experience that keeps important steps easy to follow.','PRODUCT DESIGN'],
    ['Portfolio Components','Development','A small collection of reusable interface patterns for a personal website.','FRONTEND'],
    ['Course Progress UI','Design','A calm learning interface that makes progress and next steps easy to scan.','WEB DESIGN'],
    ['Interactive Project Cards','Development','Filterable portfolio cards with keyboard-friendly detail views.','JAVASCRIPT']
  ];
  workspace.innerHTML = `${heading('Kath Vinas','Designer and developer creating warm, clear, and useful digital experiences.')}
    <div class="portfolio-intro"><div><span class="eyebrow">SELECTED WORK · 2026</span><h3>Design with care.<br>Build with purpose.</h3></div><a class="lab-primary portfolio-contact" href="mailto:kgpvinas.chmsu@gmail.com">Email Kath</a></div>
    <div class="filter-row" id="portfolio-filters"><button class="pill active" type="button" data-filter="All">All work</button><button class="pill" type="button" data-filter="Design">Design</button><button class="pill" type="button" data-filter="Development">Development</button></div>
    <div class="gallery-grid portfolio-grid" id="portfolio-grid">${work.map((item,index)=>`<button class="gallery-card portfolio-card" type="button" data-kind="${item[1]}" data-index="${index}"><span class="gallery-art portfolio-art">0${index+1}<small>${item[3]}</small></span><span class="gallery-body"><strong>${item[0]}</strong><span>${item[2]}</span><em>View concept ↗</em></span></button>`).join('')}</div>
    <div class="portfolio-modal" id="portfolio-modal" hidden><article class="portfolio-dialog" role="dialog" aria-modal="true" aria-labelledby="portfolio-title"><button type="button" aria-label="Close project">×</button><span class="eyebrow" id="portfolio-kind"></span><h3 id="portfolio-title"></h3><p id="portfolio-copy"></p></article></div>`;
  document.getElementById('portfolio-filters').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    document.querySelectorAll('#portfolio-filters button').forEach(item => item.classList.toggle('active', item === button));
    document.querySelectorAll('.portfolio-card').forEach(card => { card.hidden = button.dataset.filter !== 'All' && card.dataset.kind !== button.dataset.filter; });
  });
  const modal = document.getElementById('portfolio-modal');
  document.getElementById('portfolio-grid').addEventListener('click', event => {
    const card = event.target.closest('.portfolio-card'); if (!card) return;
    const item = work[Number(card.dataset.index)];
    document.getElementById('portfolio-kind').textContent = item[3];
    document.getElementById('portfolio-title').textContent = item[0];
    document.getElementById('portfolio-copy').textContent = item[2];
    modal.hidden = false;
  });
  modal.addEventListener('click', event => { if (event.target === modal || event.target.closest('.portfolio-dialog>button')) modal.hidden = true; });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') modal.hidden = true; });
}

function renderBooking() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  workspace.innerHTML = `${heading('Book a studio session','Choose a date and time. This demo does not send or store a real booking.')}
    <div class="panel"><div class="panel-title"><h3>October 2026</h3><span>Select a date</span></div><div class="calendar">${days.map(day=>`<span class="day-name">${day}</span>`).join('')}${Array.from({length:31},(_,i)=>`<button class="day" type="button" data-day="${i+1}">${i+1}</button>`).join('')}</div></div>
    <div class="panel"><div class="panel-title"><h3>Available times</h3><span>Philippine time</span></div><div class="time-grid">${['9:00 AM','10:30 AM','1:00 PM','2:30 PM','4:00 PM'].map(time=>`<button class="time-slot" type="button" data-time="${time}">${time}</button>`).join('')}</div><div class="booking-summary" id="booking-summary">Choose a date and time to continue.</div><button class="primary" id="confirm-booking" type="button">Confirm demo booking</button></div>`;
  let selectedDay='', selectedTime='';
  const update = () => document.getElementById('booking-summary').textContent = selectedDay && selectedTime ? `October ${selectedDay}, 2026 at ${selectedTime}` : 'Choose a date and time to continue.';
  document.querySelectorAll('.day').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.day').forEach(item=>item.classList.toggle('selected',item===button));selectedDay=button.dataset.day;update();}));
  document.querySelectorAll('.time-slot').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.time-slot').forEach(item=>item.classList.toggle('selected',item===button));selectedTime=button.dataset.time;update();}));
  document.getElementById('confirm-booking').addEventListener('click',()=>showToast(selectedDay&&selectedTime?'Demo booking confirmed':'Choose a date and time first'));
}

function renderArchive() {
  const items = [
    ['Soft Structures','Objects','A study of shape and quiet balance.'],['Light Studies','Photography','Warm light across ordinary spaces.'],['Garden Index','Research','A visual catalogue of neighborhood plants.'],['Found Type','Typography','Letterforms noticed while walking.'],['Small Rituals','Photography','Objects that shape the everyday.'],['Material Notes','Objects','Texture, wear, and useful imperfection.']
  ];
  workspace.innerHTML = `${heading('The living archive','Browse small studies, collected references, and works in progress.')}
    <div class="filter-row" id="archive-filters"><button class="pill active" data-filter="All">All</button><button class="pill" data-filter="Objects">Objects</button><button class="pill" data-filter="Photography">Photography</button><button class="pill" data-filter="Research">Research</button><button class="pill" data-filter="Typography">Typography</button></div>
    <div class="gallery-grid" id="archive-grid">${items.map((item,index)=>`<button class="gallery-card archive-item" data-kind="${item[1]}" data-index="${index}" type="button"><span class="gallery-art">✦</span><span class="gallery-body"><h3>${item[0]}</h3><p>${item[2]}</p><span class="badge">${item[1]}</span></span></button>`).join('')}</div>
    <div class="archive-modal" id="archive-modal" hidden><article class="archive-dialog" role="dialog" aria-modal="true" aria-labelledby="archive-title"><button type="button" aria-label="Close archive item">×</button><div class="gallery-art">✦</div><h2 id="archive-title"></h2><p id="archive-copy"></p></article></div>`;
  document.getElementById('archive-filters').addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;document.querySelectorAll('#archive-filters button').forEach(item=>item.classList.toggle('active',item===button));document.querySelectorAll('.archive-item').forEach(card=>card.hidden=button.dataset.filter!=='All'&&card.dataset.kind!==button.dataset.filter);});
  const modal=document.getElementById('archive-modal');
  document.getElementById('archive-grid').addEventListener('click',event=>{const card=event.target.closest('.archive-item');if(!card)return;const item=items[card.dataset.index];document.getElementById('archive-title').textContent=item[0];document.getElementById('archive-copy').textContent=item[2];modal.hidden=false;});
  modal.addEventListener('click',event=>{if(event.target===modal||event.target.closest('.archive-dialog>button'))modal.hidden=true;});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')modal.hidden=true;});
}
