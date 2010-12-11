/*
* Cookie, A Cookie Plugin for jQuery
* By: Nathan Searles, http://nathansearles.com
* Version: 1.0
* Updated: December 10th, 2010
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
	
/*
* Create cookie
* 	$.cookie({
* 		name: 'cookieName',
* 		value: 'cookieValue'
* 	});
* 	
* Read cookie
* 	$.cookie({
* 		name: 'cookieName'
* 	});
* 	
* 	Delete cookie
* 	$.cookie({
* 		name: 'cookieName',
* 		remove: true
* 	});
*	
* Set full cookie
* 	$.cookie({
* 		name: 'cookieName',
* 		value: 'cookieValue',
* 		path: '/',
* 		date: '10/12/2020',
* 		domain: 'auto'
* 	});
*	
*/
		
(function($){
	$.cookie = function( option ) {
		// override defaults with specified option
		option = $.extend( {}, $.cookie.option, option );

		// get cookie value from cookie name
		if (option.value == '' && !option.remove) {
			var results = document.cookie.match ( option.name + '=([^;]*)(;|$)' );
			if (results) {
				return results[1];
			} else {
				return;
			}
		}

		// remove cookie
		if (option.remove) {
			// get current date/time
			var date = new Date();
			// set date to past, results in deletion of cookie
			date.setTime(date.getTime() - 1);
			document.cookie = option.name += "=; expires=" + date.toGMTString();
			return;
		}

		// See the name and value of the cookie
		var cookie = option.name + "=" + option.value;
		
		// Set the cookie date.
		if (option.date) {
			// Set expiration date.
			// Create date array.
			var date = option.date.split('/');
			// Year, month - 1, and day.
			var expiration = new Date(date[2],(date[1] - 1),date[0]);
			// Convert to UTC string.
			cookie += "; expires=" + expiration.toUTCString();
		} else {
			// If no date use default value, session cookie.
			cookie += "; " + option.date;
		}
		
		// Set the cookie path.
		if (option.path) {
			cookie += "; path=" + option.path;
		}
		
		// Set the cookie domain.
		if (option.domain) {
			if (option.domain == 'auto') {
				// Get domain name or IP address. Returns 192.168.1.1 or .example.com for use with subdomains.
				var ipAddress = document.domain.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g),
					domainName = "." + document.domain;
				// Is locaiton an IP address or domain name?
				var currentLocation = ipAddress ? ipAddress.toString() : domainName.toString();
				cookie += "; domain=" + currentLocation + ";";
			} else {
				// if domain specified
				cookie += "; domain=" +  option.domain + ";";
			}
		}
		
		// If secure connection required.
		if (option.secure) {
			cookie += "; secure";
		}
		
		// Final step. Set the cookie.
		document.cookie = cookie;
	};

	// default options
	$.cookie.option = {
		name: '',
		value: '',
		path: '/',
		date: 'session', // day/month/year
		domain: 'auto',
		secure: false,
		remove: false
	};
	
})(jQuery);