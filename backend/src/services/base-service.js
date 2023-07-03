class BaseDataBase {
    constructor(model) {
        this.model = model
    }
    save(objects) {
        return this.model.insert(objects)
    }
    load() {
        return this.model.find()
    }
    async insert(object) {
        return await this.model.create(object)
    }
    async removeBy(property, value) {
        return this.model.deleteOne({ [property]: value })
    }
    async update(id, object) {
        return this.model.findByIdAndUpdate(id, object, { returnOriginal: false })
    }
    async updateBy(property, value, object) {
        return this.model.findOneAndUpdate({ [property]: value }, object, { upsert: true, returnOriginal: false })
    }
    async find(id) {
        return this.model.findById(id)
    }
    async query(obj) {
        return this.model.find(obj)
    }
    async findBy(property, value) {
        return this.model.find({ [property]: value }).sort({ createdAt: -1 })
    }
    async findByOne(property, value) {
        return this.model.findOne({ [property]: value })
    }
}

module.exports = BaseDataBase
