var Q = require('q');
var Promise = require ('bluebird');
var GitHubApi = require('github');

var github = new GitHubApi({
	version: '3.0.0'
});

//Using callbacks
var getUserAvatarWithCallback = function(user, callback) {
	github.search.users({q: user}, function(err, res) {
		if (err) { callback(err, null); }
		else {
			var avatarUrl = res.items[0].avatar_url;
			callback(null, avatarUrl);
		}
	});
};

getUserAvatarWithCallback('sanlouise', function(err, avatar) {
	console.log('Got url with callbacks!', avatar)
});


//Using Promises, now with Bluebird
var getUserAvatarWithBlueBird = function(user) {
	return new Promise(function(resolve, reject) {
		github.search.users({q :user }, function(err, res) {
			if (err) { reject(err); }
			else {

				var avatarUrl = res.items[0].avatar_url;
				resolve(avatarUrl);
			}
		});
	});
};

getUserAvatarWithBlueBird('sanlouise')
.then(function(avatarUrl) {
	console.log('Got url with Bluebird', avatarUrl);
})
.catch(function(error) {
	console.log('Error with Bluebird', error);
});