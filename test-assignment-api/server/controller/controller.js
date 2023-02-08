var Studentdb = require('../model/model');

exports.create = (req,res)=>{

    const student = new Studentdb({
        name : req.body.name,
        email : req.body.email,
        phone_number: req.body.phone_number
    })

    student
        .save(student)
        .then(data => {
            console.log("sdfsf")
            res.send({
                status: true,
                message : "Student was added successfully!"
            });
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

exports.find = (req, res)=>{
    if(req.params.id){
        const id = req.params.id;
        
        Studentdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found student with id "+ id})
                }else{
                    res.send({
                        status: true,
                        student: data
                    })
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving student with id " + id})
            })

    }else{
        Studentdb.find()
            .then(student => {
                res.send({
                    status: true,
                    students: student
                })
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving student information" })
            })
    }

    
}

exports.update = (req, res)=>{
    console.log("aaa")
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Studentdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update student with ${id}. Maybe student not found!`})
            }else{
                res.send({
                    status: true,
                    message : "Student was updated successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update Student information"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    Studentdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                Studentdb.find()
                .then(student => {
                    res.send({
                        status: true,
                        students: student,
                        message : "Student was deleted successfully!"
                    })
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
}