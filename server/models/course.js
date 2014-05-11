var mongoose  = require('mongoose');

var courseSchema = mongoose.Schema({
  title : {type: String, required:'{PATH is required !}'},
  featured : {type: Boolean, required:'{PATH is required !}'},
  published : {type: Date, required:'{PATH is required !}'},
  tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses(){
  Course.find({}).exec(function(err, collection){
    if(collection.length == 0){
      Course.create({title: 'Knight Riders', featured: true, published: new Date(), tags:['KR']}),
      Course.create({title: 'Death Dealers', featured: false, published: new Date(), tags:['DD']}),
      Course.create({title: 'Storm Bringers', featured: false, published: new Date(), tags:['SB']}),
      Course.create({title: 'Crome Masters', featured: true, published: new Date(), tags:['CM']}),
      Course.create({title: 'Steel Warriors', featured: true, published: new Date(), tags:['SW']}),
      Course.create({title: 'Soul Stealers', featured: false, published: new Date(), tags:['SS']})
    }
  })
}

exports.createDefaultCourses = createDefaultCourses;
