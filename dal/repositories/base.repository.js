class BaseRepository {
    constructor(db, entity){
        this._db =db;
        this._entity = entity;
    }
    getAll(){
        return this._db[this._entity].findAll();
    }
    get(id){
        return this._db[this._entity].findOne({where:{id}});
    }
    create(entity){
        return this._db[this._entity].create(entity)
    }
    update(id, entity){
        delete entity.createdAt;
        delete entity.updatedAt;
        return this._db[this._entity].update(entity, {where:{id}});
    }
}

module.exports = BaseRepository;