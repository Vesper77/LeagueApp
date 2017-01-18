module.exports = {
  index : function(req, res) {
    Champion.find()
            .exec(function (err, champions) {              	
                if (err) return res.send(500);
            
                res.view({ champions : champions}); 

            
            });

  }

};
