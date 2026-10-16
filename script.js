const SITE_CONFIG = {
  email: 'kgpvinas.chmsu@gmail.com',
  social: {
    github: 'https://github.com/kgpvinaschmsu-hub',
    linkedin: 'https://www.linkedin.com/in/katrina-grace-vinas-799b68389',
    instagram: 'https://www.instagram.com/kath_ryyna/'
  }
};

const projects = [
  {id:'citizen-reporting',title:'Citizen Reporting Portal',type:'UI/UX Design',category:'ui',year:'2026',visual:'a',summary:'A clearer, more human way to report and follow local community concerns.',description:'A citizen-first reporting experience shaped around clarity, accessibility, and transparent progress from submission to resolution.',features:['Guided report submission','Map-based location selection','Clear status and progress timeline']},
  {id:'learning-hub',title:'Learning Hub',type:'Web Design',category:'web',year:'2026',visual:'b',summary:'A focused learning dashboard designed to make coursework feel manageable.',description:'A calm educational experience that brings lessons, announcements, and progress into one friendly, organized space.',features:['Flexible course overview','Focused content hierarchy','Responsive student dashboard']},
  {id:'creative-studio',title:'Atelier Studio',type:'UI/UX Design',category:'ui',year:'2026',visual:'c',summary:'A tactile digital home for a small creative studio with a big personality.',description:'A warm, editorial portfolio direction built around expressive typography, modular layouts, and generous project storytelling.',features:['Flexible visual system','Editorial project layouts','Reusable content modules']},
  {id:'taskflow',title:'Gentle Focus',type:'Product Concept',category:'concept',year:'2026',visual:'d',summary:'A low-pressure way to plan priorities and find momentum in the day.',description:'A thoughtful productivity concept that reduces visual noise and helps people choose what deserves attention right now.',features:['Priority-led planning','Calm task patterns','Daily reflection prompts']},
  {id:'booking-platform',title:'Gather Booking',type:'Web Design',category:'web',year:'2026',visual:'e',summary:'A friendly appointment flow that makes every next step easy to understand.',description:'A welcoming booking workflow for making requests, reviewing details, and managing upcoming appointments.',features:['Simple request flow','Review and rescheduling screens','Responsive navigation']},
  {id:'brand-showcase',title:'Mori Archive',type:'Product Concept',category:'concept',year:'2026',visual:'f',summary:'A curated archive concept for sharing process, imagery, and creative work.',description:'A portfolio exploration that treats each project as a story, balancing rich visuals with quiet, readable details.',features:['Curated project archive','Story-led case studies','Responsive presentation']}
];

const grid = document.getElementById('project-grid');
const overlay = document.getElementById('project-overlay');
const content = document.getElementById('project-content');
const panel = document.querySelector('.project-panel');
const mockup = () => `<div class="mock-browser" aria-hidden="true"><div class="mock-bar"><i></i><i></i><i></i></div><div class="mock-canvas"><div class="mock-copy"><div class="mock-kicker"></div><div class="mock-title"></div><div class="mock-title short"></div><div class="mock-line"></div><div class="mock-line short"></div><div class="mock-button"></div></div><div class="mock-image"></div></div></div>`;

function renderProjects(filter = 'all') {
  const visible = filter === 'all' ? projects : projects.filter(project => project.category === filter);
  grid.innerHTML = visible.map((project, index) => `
    <article class="project-card reveal visible">
      <div class="project-visual visual-${project.visual}">${mockup()}<button class="project-open" type="button" aria-label="View ${project.title} details" data-project="${project.id}">View ${project.title}</button></div>
      <div class="project-info"><div><span class="project-meta">${project.type} · ${project.year}</span><h3>${project.title}</h3><p>${project.summary}</p></div><span class="project-number">0${index + 1}</span></div>
    </article>`).join('');
}

function openProject(id) {
  const project = projects.find(item => item.id === id);
  if (!project) return;
  content.innerHTML = `<div class="detail-kicker">${project.type} · ${project.year}</div><h2 id="detail-title">${project.title}</h2><p>${project.summary}</p><div class="detail-visual visual-${project.visual}">${mockup()}</div><h4>The idea</h4><p>${project.description}</p><h4>Highlights</h4><ul>${project.features.map(feature => `<li>${feature}</li>`).join('')}</ul><a class="button button-dark" href="#contact" data-contact>Start a similar project <span>↗</span></a>`;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  panel.focus();
  history.replaceState(null, '', `#project/${project.id}`);
}

function closeProject() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  history.replaceState(null, '', '#projects');
}

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-project]');
  if (button) openProject(button.dataset.project);
});

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-pressed', 'false');
  });
  button.classList.add('active');
  button.setAttribute('aria-pressed', 'true');
  renderProjects(button.dataset.filter);
}));

overlay.addEventListener('click', event => {
  if (event.target.closest('[data-close]')) closeProject();
  if (event.target.closest('[data-contact]')) closeProject();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && overlay.classList.contains('open')) closeProject(); });

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 12), {passive:true});

const navLinks = document.getElementById('nav-links');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('show');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) document.querySelectorAll('[data-nav]').forEach(link => link.classList.toggle('active', link.dataset.nav === entry.target.id));
}), {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), {threshold:.1});
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

document.getElementById('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const type = form.elements['project-type'].value;
  const message = form.elements.message.value.trim();
  const subject = encodeURIComponent(`${type} inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
  const status = document.getElementById('form-status');
  status.textContent = 'Opening your email application with the inquiry prepared…';
  window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
});

document.querySelectorAll('[data-email-link]').forEach(link => {
  link.href = `mailto:${SITE_CONFIG.email}`;
});
document.querySelectorAll('[data-social]').forEach(link => {
  const url = SITE_CONFIG.social[link.dataset.social];
  if (url) link.href = url;
  else { link.setAttribute('aria-disabled', 'true'); link.addEventListener('click', event => event.preventDefault()); }
});
document.getElementById('year').textContent = new Date().getFullYear();

renderProjects();
if (location.hash.startsWith('#project/')) openProject(location.hash.split('/')[1]);
