var Userdb = require('../model/model');

exports.create = (req,res) =>{
      if(!req.body){
        res.status(400).send({message : "Content can not be empty!"});
        return;
      }

      const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
      })

        user
        .save(user)
        .then(data =>{
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occured while creating a create operation"
            });
        });
} 

exports.find = (req,res) =>{
    // if(req.params.id){
    //     const id = req.params.id;            (params are used for any updation --to pass id as parameters)
    // }
    if(req.query.id){
        const id = req.query.id;            
                                                //(queries are used for any deletion --passed id as queries)
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message : `not found user with id ${id}`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message : `Error retrieving user with id ${id}`})
        })
        }
        else{
            Userdb.find()
            .then(user =>{
                res.send(user)
            })
            .catch(err =>{
                res.status(500).send({message : err.message || "Error occured while retriving user information"})
            })
        }
}

exports.update = (req,res) =>{
    if(!req.body){
        return res
        .status(400)
        .send({message : "Empty data can't be updated"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data =>{
        if(!data){
            res.status(404).send({message : `Cant update user with ${id}, user not found may be!`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message : "Error update user information"})
    })
}

exports.delete = (req,res) =>{
    // if(!req.body){
    //     return res
    //     .status(400)
    //     .send({message: "Empty data can't be deleted"})
    // }
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message: `can't delete with id ${id}, Maybe id is wrong`})
        }else{
            res.send({
                message: "User was deleted successfully!"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({message : `Could not delete User with the id ${id}`});
    });
}