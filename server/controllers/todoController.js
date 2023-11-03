const todo = require("../models/todoModel");
let id = 0;
const todoAdd = async (req,res)=>{
    console.log(req.body.name);
    try {
        const _todo = await todo.findOne({name: req.body.name});
        
        // if(_todo){
        //     return res.status(400).json({
        //         succes: false,
        //         message: "Bu isimde kayıt mevcut"
        //     })
        // }
        const todoAdd = new todo({name: req.body.name});
        console.log(id);
        await todoAdd.save()
            .then(()=>{
                return res.status(201).json(todoAdd)
            })
        .catch((err)=>{
            return res.status(400).json({
                succes: false,
                message: "Kayıt oluşturulurken hata meydana geldi." + err
            })
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Kayıt oluşturulamadı sunucuda problem var!" + error
        })
    }
    console.log("todoAdd open");
}

const todoGetAll = async (req,res) => {
    // const limit = 2;
    // const skip = 
    try {
        const todoGetAll = await todo.find({});
        return res.status(200).json({
            succes: true,
            data: todoGetAll
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Kayıtlar getirilemedi veri tabanında problem var!"
        })
    }
}

const todoUpdate = async(req,res) => {
    const {id} = req.params;
    try {
        const todoUpdate = await todo.findByIdAndUpdate(id,{name: req.body.name})
        if(todoUpdate){
            return res.status(200).json({
                succes: true,
                message: "Güncelleme başarılı"
            })
        }
        else return res.status(400).json({
            succes: false,
            message: "Kayıt güncellenemedi"
        })
    } catch (error) {
        return res.status(500).json({
            succes: "false",
            message: "Kayıt güncelleme işlemi başarısız"
        })
    }
}

const todoDelete = async(req,res) => {
    const {id} = req.params;
    try {
        const todoDelete = await todo.findByIdAndDelete(id);
        if(todoDelete){
            return res.status(200).json({
                succes: true,
                message: "Silme işlemi başarılı"
            });
        }
        else return res.status(400).json({
            succes: false,
            message: "Silme İşlemi Başarısız"
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Silme işlemi başarısız sunucuda problem var"
        })
    }
}

const todoGet = async(req,res) => {
    const {id} = req.params;
    try {
        const todoGet = await todo.findById(id);
        if(todoGet){
            return res.status(200).json(todoGet);
        }
        else return res.status(400).json({
            succes: false,
            message: "Get işlemi başarısız!!"
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: "Get işlemi başarısız sunucuda problem var!!"
        })
    }
}

module.exports = {
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGet
};