const mapper =require("automapper-js")
const {UserDto} = require("../dtos")

class UserController{
    constructor({UserService}){
        this._userService = UserService;
    }

      async getUsers(req, res){ 
        let users = await this._userService.getUsers();
        users = users.map(user => mapper(UserDto, user));
       return res.send({
           payload: users
       });
    }
    
    async getUser(req, res){ 
        const {id}=req.params;
        let user = await this._userService.getUser(id);
        user =  mapper(UserDto, user);
       return res.send({
           payload: user
       });
    }


    /*metodo para buscar todos los usuarios 
    primero llama al repositorio y este llama a la BD
    */
    async createUser(req, res){
        const {body}= req;
        const createdUser = await this._userService.createUser(body); 
        const user = mapper(UserDto, createdUser);
        res.status(201).send({
            payload:user
        })  
    }
    
    async updateUser(req, res){
        const {body}= req;
        const {id}= req.params;
        await this._userService.updateUser(id, body);
        res.status(204).send()
        
    }
    async deleteUser(req, res){
        const {id}= req.params;
        await this._userService.deleteUser(id);
        res.status(204).send()
        
    }

}

module.exports = UserController;