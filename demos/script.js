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
    title: 'Atelier Studio', type: 'UI/UX Design · Creative portfolio', summary: 'An editorial project library for a small multidisciplinary creative studio.', mark: 'AS', nav: ['Selected work','Services','Studio'], render: renderStudio
  },
  'taskflow': {
    title: 'Gentle Focus', type: 'Product concept · Productivity', summary: 'A calm daily planner that makes priorities feel manageable rather than overwhelming.', mark: 'GF', nav: ['Today','Upcoming','Reflection'], render: renderTasks
  },
  'booking-platform': {
    title: 'Gather Booking', type: 'Web Design · Scheduling', summary: 'A friendly appointment flow with clear dates, available times, and confirmation.', mark: 'GB', nav: ['Book a visit','My bookings','Help'], render: renderBooking
  },
  'brand-showcase': {
    title: 'Mori Archive', type: 'Product concept · Digital archive', summary: 'A quiet, filterable archive for collecting visual projects and their stories.', mark: 'MA', nav: ['Archive','Collections','About'], render: renderArchive
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

function renderStudio() {
  const work = [
    ['Sora Identity','Branding','A tactile identity for a neighborhood café.'],['Field Notes','Editorial','A field guide built around observation.'],['Lumen House','Digital','A calm portfolio for an architecture studio.'],['Kindred Forms','Branding','Packaging with warmth and restraint.'],['Common Ground','Digital','A landing page for a community initiative.'],['Still / Moving','Editorial','A small publication about everyday motion.']
  ];
  workspace.innerHTML = `${heading('Selected work','A flexible studio archive for ideas across identity, editorial, and digital design.')}
    <div class="filter-row" id="studio-filters"><button class="pill active" data-filter="All">All</button><button class="pill" data-filter="Branding">Branding</button><button class="pill" data-filter="Editorial">Editorial</button><button class="pill" data-filter="Digital">Digital</button></div>
    <div class="gallery-grid" id="studio-grid">${work.map((item,index)=>`<article class="gallery-card" data-kind="${item[1]}"><div class="gallery-art">0${index+1}</div><div class="gallery-body"><h3>${item[0]}</h3><p>${item[2]}</p><span class="badge">${item[1]}</span></div></article>`).join('')}</div>`;
  document.getElementById('studio-filters').addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    document.querySelectorAll('#studio-filters button').forEach(item => item.classList.toggle('active', item === button));
    document.querySelectorAll('#studio-grid article').forEach(card => card.hidden = button.dataset.filter !== 'All' && card.dataset.kind !== button.dataset.filter);
    showToast(`${button.dataset.filter} projects shown`);
  });
}

function renderTasks() {
  let tasks = [
    {text:'Review portfolio content',done:true},{text:'Refine mobile navigation',done:false},{text:'Write project case study',done:false}
  ];
  workspace.innerHTML = `${heading('A gentle plan for today','Choose a few meaningful priorities. Everything else can wait.')}
    <div class="stat-grid"><div class="stat"><span>Today</span><strong id="task-total">3</strong></div><div class="stat"><span>Completed</span><strong id="task-done">1</strong></div><div class="stat"><span>Focus</span><strong>Calm</strong></div></div>
    <div class="panel"><div class="panel-title"><h3>Today’s priorities</h3><span>Keep it light</span></div><form class="task-form" id="task-form"><input id="new-task" placeholder="Add a small next step…" required><button class="primary" type="submit">Add task</button></form><div id="task-list"></div></div>`;
  const draw = () => {
    document.getElementById('task-list').innerHTML = tasks.map((task,index)=>`<div class="task-row ${task.done?'done':''}"><input id="task-${index}" data-index="${index}" type="checkbox" ${task.done?'checked':''}><label for="task-${index}">${escapeHtml(task.text)}</label><button type="button" data-remove="${index}" aria-label="Remove ${escapeHtml(task.text)}">×</button></div>`).join('');
    document.getElementById('task-total').textContent = tasks.length;
    document.getElementById('task-done').textContent = tasks.filter(task=>task.done).length;
  };
  draw();
  document.getElementById('task-form').addEventListener('submit', event => {event.preventDefault();tasks.push({text:document.getElementById('new-task').value,done:false});event.currentTarget.reset();draw();showToast('Task added');});
  document.getElementById('task-list').addEventListener('change', event => {if(!event.target.matches('input'))return;tasks[event.target.dataset.index].done=event.target.checked;draw();});
  document.getElementById('task-list').addEventListener('click', event => {const button=event.target.closest('[data-remove]');if(!button)return;tasks.splice(button.dataset.remove,1);draw();showToast('Task removed');});
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
