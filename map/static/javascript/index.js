let map = L.map('map').setView([40.78,-73.97], 15);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: ['a','b','c']
}).addTo(map);

async function getSquirrelData(){
	let response=await fetch("/sightings")
	let data=await response.json()
	return data
}

async function updateSighting(sighting){
	let searchParams = new URLSearchParams()
	Object.keys(sighting).forEach(function(key,index) {
		// key: the name of the object key
		// index: the ordinal position of the key within the object 
		searchParams.set(key,sighting[key])
});
	let response=fetch(`/sightings/${sighting.USID}`,{method:"POST",body:searchParams,'Content-Type': 'application/json','Accept': 'application/json'})
	return response.ok
}
		    
async function addSighting(sighting){
	let searchParams = new URLSearchParams()
	Object.keys(sighting).forEach(function(key,index) {
		// key: the name of the object key
		// index: the ordinal position of the key within the object 
		searchParams.set(key,sighting[key])
	});
	let response=fetch('/sightings/add',{method:"POST",body:searchParams,'Content-Type': 'application/json','Accept': 'application/json'})
	return response.ok
}

async function deleteSighting(sighting){
	let response=fetch(`/sightings/${sighting.USID}`,{method:"DELETE",'Content-Type': 'application/json','Accept': 'application/json'})
	return response.ok
}
		    
async function getSightingStats(){                                                             
	let response=await fetch("/sightings/stats")
	let data=await response.json()                                                             
	return data                                                                                       
}
