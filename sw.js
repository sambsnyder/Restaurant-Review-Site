const cache_name = "Restaurant_Reviews_version_1";

const cache_objects = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/data/restaurants.json',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
];
console.log('Service worker registered');

self.addEventListener('install', function(elem){
	elem.waitUntil(
		caches.open(cache_name).then(function(cache){
			return cache.addAll(cache_objects)
		})
	);
});

self.addEventListener('fetch', function(elem){
	//prevent default fetch, respond with promise
	elem.respondWith(
		//see if event request url exists in cache
		caches.match(elem.request).then(function(response) {
			//found the request
			if(response) {
				console.log('Success! got', elem.request, ' in the cache.');
				return response;
			}
			//didn't find the request, fetch it
			else {
				console.log('Could no get ',elem.request, 'in the cache, fetching now!');
				return fetch(elem.request)
				// get the response from fetch
				.then(function(response) {
					// copy of response to use again
					const copy = response.clone();
					caches.open(cache_name).then(function(cache) {
						// pair request with response
						cache.put(elem.request, copy);
					})
					//return the response back to fetch
					return response;
				})
				.catch(function(error) {
					console.error(error);
				});
			}
		})
	);
});
