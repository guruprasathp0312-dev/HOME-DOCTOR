const doctorsData = [
 {id:1,name:"Dr. Ananya Sharma",specialty:"General Physician",experience:"9 years",mode:"Video & In-person",fee:"₹500",available:"Today",icon:"fa-stethoscope"},
 {id:2,name:"Dr. Arjun Kumar",specialty:"Cardiologist",experience:"12 years",mode:"Video & In-person",fee:"₹800",available:"Tomorrow",icon:"fa-heart-pulse"},
 {id:3,name:"Dr. Meera Iyer",specialty:"Dermatologist",experience:"8 years",mode:"Video Consultation",fee:"₹650",available:"Today",icon:"fa-hand-dots"},
 {id:4,name:"Dr. Rahul Menon",specialty:"Pediatrician",experience:"10 years",mode:"Video & In-person",fee:"₹600",available:"Today",icon:"fa-baby"},
 {id:5,name:"Dr. Priya Nair",specialty:"Dentist",experience:"7 years",mode:"In-person",fee:"₹450",available:"Tomorrow",icon:"fa-tooth"},
 {id:6,name:"Dr. Kavya Rao",specialty:"Psychologist",experience:"6 years",mode:"Video Consultation",fee:"₹700",available:"Today",icon:"fa-brain"}
];

const medicinesData = [
 {disease:"Common cold",medicines:["Paracetamol — may help fever/pain","Saline nasal spray — may help nasal congestion"],note:"Colds are usually viral; antibiotics are generally not useful unless a clinician identifies a bacterial infection."},
 {disease:"Fever",medicines:["Paracetamol (acetaminophen) — commonly used for fever/pain"],note:"Fever has many causes. Persistent, very high, or concerning fever needs medical assessment."},
 {disease:"Allergic rhinitis",medicines:["Cetirizine — antihistamine","Loratadine — antihistamine","Saline nasal spray"],note:"A pharmacist/doctor can help select an appropriate antihistamine and check interactions or contraindications."},
 {disease:"Acid reflux",medicines:["Antacids — short-term symptom relief","Famotidine — reduces stomach acid","Omeprazole — proton-pump inhibitor"],note:"Frequent or persistent reflux should be assessed rather than treated indefinitely without medical advice."},
 {disease:"Type 2 diabetes",medicines:["Metformin — commonly used first-line medicine","Other glucose-lowering medicines may be prescribed based on the patient"],note:"Diabetes medicines require clinician-directed selection and monitoring of blood glucose and kidney function."},
 {disease:"Hypertension",medicines:["Amlodipine — calcium-channel blocker","Losartan — ARB","Lisinopril — ACE inhibitor"],note:"Blood-pressure medicines are prescription treatments in many settings and should be selected by a clinician."},
 {disease:"Asthma",medicines:["Salbutamol/albuterol — reliever inhaler","Inhaled corticosteroids — controller treatment"],note:"Asthma inhalers and action plans should be individualized by a healthcare professional."}
];

function toggleMenu(){document.getElementById("navMenu")?.classList.toggle("show");}
function searchSite(){
 const q=document.getElementById("searchInput")?.value.trim();
 if(q){localStorage.setItem("homeDoctorSearch",q); location.href="doctors.html";}
}
function doctorCard(d){
 return `<article class="doctor-card"><div class="doctor-avatar"><i class="fa-solid ${d.icon}"></i></div><div class="doctor-main"><div class="online">● Available ${d.available}</div><h3>${d.name}</h3><p class="specialty">${d.specialty}</p><div class="meta"><span><i class="fa-solid fa-briefcase"></i> ${d.experience}</span><span><i class="fa-solid fa-video"></i> ${d.mode}</span><span><i class="fa-solid fa-indian-rupee-sign"></i> ${d.fee}</span></div><div class="card-actions"><button class="outline-btn" onclick="viewDoctor(${d.id})">View Details</button><button class="primary-btn" onclick="bookDoctor(${d.id})">Book Appointment</button></div></div></article>`;
}
function renderDoctors(){
 const grid=document.getElementById("doctorGrid"); if(!grid)return;
 const q=(document.getElementById("doctorSearch")?.value || localStorage.getItem("homeDoctorSearch") || "").toLowerCase();
 const spec=document.getElementById("specialtyFilter")?.value || "";
 const list=doctorsData.filter(d=>(!q || (d.name+" "+d.specialty).toLowerCase().includes(q)) && (!spec || d.specialty===spec));
 grid.innerHTML=list.length?list.map(doctorCard).join(""):`<div class="empty">No doctors found. Try another search.</div>`;
 localStorage.removeItem("homeDoctorSearch");
}
function viewDoctor(id){
 const d=doctorsData.find(x=>x.id===id); if(!d)return;
 alert(`${d.name}\n${d.specialty}\nExperience: ${d.experience}\nConsultation: ${d.mode}\nFee: ${d.fee}\nAvailability: ${d.available}`);
}
function bookDoctor(id){localStorage.setItem("selectedDoctor",String(id));location.href="appointments.html";}
function setupAppointments(){
 const select=document.getElementById("doctorSelect"); if(!select)return;
 select.innerHTML=doctorsData.map(d=>`<option value="${d.id}">${d.name} — ${d.specialty}</option>`).join("");
 const selected=localStorage.getItem("selectedDoctor"); if(selected)select.value=selected;
 const date=document.getElementById("appointmentDate"); if(date)date.min=new Date().toISOString().split("T")[0];
 document.getElementById("appointmentForm").addEventListener("submit",e=>{
  e.preventDefault();
  const d=doctorsData.find(x=>x.id==select.value);
  const item={doctor:d.name,specialty:d.specialty,type:document.getElementById("consultType").value,date:document.getElementById("appointmentDate").value,time:document.getElementById("appointmentTime").value,reason:document.getElementById("reason").value};
  const all=JSON.parse(localStorage.getItem("appointments")||"[]"); all.push(item); localStorage.setItem("appointments",JSON.stringify(all));
  e.target.reset(); select.value=d.id; renderAppointments(); alert("Appointment saved successfully.");
 });
 renderAppointments();
}
function renderAppointments(){
 const box=document.getElementById("appointmentList"); if(!box)return;
 const all=JSON.parse(localStorage.getItem("appointments")||"[]");
 box.innerHTML=all.length?all.slice().reverse().map((a,i)=>`<div class="appointment-item"><div class="mini-icon"><i class="fa-solid fa-calendar-check"></i></div><div><strong>${a.doctor}</strong><p>${a.specialty}</p><span>${a.date} • ${a.time} • ${a.type}</span></div></div>`).join(""):`<div class="empty">No appointments saved yet.</div>`;
}
function renderMedicines(){
 const grid=document.getElementById("medicineGrid"); if(!grid)return;
 const q=(document.getElementById("medicineSearch")?.value||"").toLowerCase(), disease=document.getElementById("diseaseFilter")?.value||"";
 const list=medicinesData.filter(x=>(!disease||x.disease===disease)&&(!q||(x.disease+" "+x.medicines.join(" ")).toLowerCase().includes(q)));
 grid.innerHTML=list.map(x=>`<article class="medicine-card"><div class="medicine-head"><i class="fa-solid fa-capsules"></i><h3>${x.disease}</h3></div><ul>${x.medicines.map(m=>`<li>${m}</li>`).join("")}</ul><p class="medicine-note"><i class="fa-solid fa-circle-info"></i> ${x.note}</p><a href="appointments.html" class="outline-btn">Ask a Doctor</a></article>`).join("");
}
async function findNearbyCare(){
 const status=document.getElementById("locationStatus"), results=document.getElementById("nearbyResults");
 if(!navigator.geolocation){status.textContent="Geolocation is not supported by this browser.";return;}
 status.textContent="Requesting your location…";
 navigator.geolocation.getCurrentPosition(async pos=>{
  const {latitude,longitude}=pos.coords;
  status.textContent="Searching nearby hospitals and clinics…";
  const query=`[out:json][timeout:15];(nwr["amenity"="hospital"](around:7000,${latitude},${longitude});nwr["amenity"="clinic"](around:7000,${latitude},${longitude});nwr["amenity"="doctors"](around:7000,${latitude},${longitude}););out center;`;
  try{
   const res=await fetch("https://overpass-api.de/api/interpreter",{method:"POST",body:query});
   const data=await res.json();
   const places=data.elements.map(x=>({name:x.tags?.name||"Unnamed healthcare facility",type:x.tags?.amenity||"healthcare",lat:x.lat??x.center?.lat,lon:x.lon??x.center?.lon,address:x.tags?.["addr:street"]||""})).filter(x=>x.lat&&x.lon).slice(0,30);
   places.sort((a,b)=>distance(latitude,longitude,a.lat,a.lon)-distance(latitude,longitude,b.lat,b.lon));
   results.innerHTML=places.length?places.map(p=>`<article class="nearby-card"><div class="feature-icon"><i class="fa-solid ${p.type==="hospital"?"fa-hospital":"fa-clinic-medical"}"></i></div><div><h3>${escapeHtml(p.name)}</h3><p>${p.type==="hospital"?"Hospital":"Clinic"}${p.address?" • "+escapeHtml(p.address):""}</p><strong>${distance(latitude,longitude,p.lat,p.lon).toFixed(1)} km away</strong><br><a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lon}">Open in Maps ↗</a></div></article>`).join(""):`<div class="empty">No nearby healthcare places were returned.</div>`;
   status.textContent=`Found ${places.length} nearby healthcare places.`;
  }catch(e){status.textContent="Nearby search could not be completed. Please try again.";results.innerHTML=`<div class="empty">The map service is temporarily unavailable.</div>`;}
 },()=>{status.textContent="Location permission was not granted. Enable location access and try again.";},{enableHighAccuracy:true,timeout:10000});
}
function distance(a,b,c,d){const R=6371,rad=Math.PI/180,x=(c-a)*rad,y=(d-b)*rad;const z=Math.sin(x/2)**2+Math.cos(a*rad)*Math.cos(c*rad)*Math.sin(y/2)**2;return R*2*Math.atan2(Math.sqrt(z),Math.sqrt(1-z));}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
document.addEventListener("DOMContentLoaded",()=>{renderDoctors();setupAppointments();renderMedicines();});
