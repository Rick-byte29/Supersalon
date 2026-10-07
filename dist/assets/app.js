const services=['Haircut & styling','Party makeup','Bridal makeup','Hair spa','Facial & skin care','Threading & grooming'];
const courses=['Makeup artistry','Haircut & styling','Beauty & salon essentials'];
function enquiryMessage(kind,item=''){
 const intro='Hello Anjali Super Salon and Training Centre!';
 if(kind==='service')return `${intro} I would like to enquire about ${item}. Please share the current price and available appointment times.`;
 if(kind==='course')return `${intro} I am interested in ${item||'your beauty training courses'}. Please share the syllabus, fees, duration and upcoming batch timings.`;
 if(kind==='appointment')return `${intro} I would like to book a ladies salon appointment. Please help me choose a service and a suitable time.`;
 return `${intro} ${item?`I would like information about ${item}.`:'I have a general enquiry about your ladies salon and training centre.'} Please assist me.`;
}
for(const link of document.querySelectorAll('[data-enquiry]')){
 link.href='https://wa.me/919101035255?text='+encodeURIComponent(enquiryMessage(link.dataset.enquiry,link.dataset.item));
 link.target='_blank';link.rel='noopener noreferrer';
}
const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menuButton.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('header'))closeMenu();});
const motion=!matchMedia('(prefers-reduced-motion: reduce)').matches;
if(motion&&'IntersectionObserver' in window){document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('visible',e.isIntersecting)),{threshold:.08,rootMargin:'0px 0px -25px 0px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
const cursor=document.querySelector('.cursor');
if(motion&&matchMedia('(hover:hover) and (pointer:fine)').matches){let x=-50,y=-50,px=-50,py=-50;document.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;cursor.classList.toggle('hovering',!!e.target.closest('a,button,summary,input,select,textarea'));});document.addEventListener('pointerleave',()=>{x=-50;y=-50;});function frame(){px+=(x-px)*.2;py+=(y-py)*.2;cursor.style.left=px+'px';cursor.style.top=py+'px';requestAnimationFrame(frame);}frame();}
const form=document.querySelector('#enquiry-form'),type=document.querySelector('#enquiry-type'),selection=document.querySelector('#enquiry-selection');
function populateSelection(){selection.replaceChildren();const list=type.value==='course'?courses:type.value==='general'?['General enquiry','Salon location & directions','Other question']:services;for(const value of ['Please select',...list]){const option=new Option(value,value==='Please select'?'':value);selection.add(option);}selection.required=type.value!=='general';document.querySelector('#selection-label').firstChild.textContent=type.value==='course'?'Training course':type.value==='general'?'Enquiry topic':'Salon service';}
type.addEventListener('change',populateSelection);populateSelection();
const dateInput=form.querySelector('[name=date]');const now=new Date();dateInput.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form),kind=data.get('type'),item=data.get('selection');let message=enquiryMessage(kind==='appointment'?'service':kind,item);message+=`\n\nName: ${data.get('name').trim()}`;if(data.get('date'))message+=`\nPreferred date: ${data.get('date')}`;if(data.get('time'))message+=`\nPreferred time: ${data.get('time')}`;if(data.get('message').trim())message+=`\nMessage: ${data.get('message').trim()}`;window.open('https://wa.me/919101035255?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');document.querySelector('#form-status').textContent='Your message is ready in WhatsApp. Send it there to start your enquiry.';});
