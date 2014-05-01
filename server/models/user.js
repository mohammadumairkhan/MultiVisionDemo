var mongoose 	= require('mongoose');
var crypto		= require('crypto');

module.exports = function(){
	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		salt: String,
		hashed_pwd: String,
		roles: [String]
	});
	
	userSchema.methods = {
		authenticate: function(passwordToMatch){
			return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		}
	}
	
	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt, 'ukhan');
			User.create({firstName: "Mohammad", lastName: "Khan", username:"ukhan", salt: salt, hashed_pwd: hash, roles: ['admin']});
			salt = createSalt();
			hash = hashPwd(salt, 'achisti');
			User.create({firstName: "Akhtar", lastName: "Chishti", username:"achisti", salt: salt, hashed_pwd: hash, roles:[]});
			salt = createSalt();
			hash = hashPwd(salt, 'schan');
			User.create({firstName: "Salim", lastName: "Chandio", username:"schan", salt: salt, hashed_pwd: hash});
		}
	});

	function createSalt(){
		return crypto.randomBytes(128).toString('base64');
	}

	function hashPwd(salt, pwd){
		var hmac = crypto.createHmac('sha1', salt);
		return hmac.update(pwd).digest('hex');
	}
}