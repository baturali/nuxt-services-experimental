import { ObjectId } from 'mongodb'

export default {
  async list() {
    const users = await this.$db.collection('users').find({}).toArray()

    for (const user of users) {
      user._id = String(user._id)
    }
    return users
  },
  async get(id) {
    const user = await this.$db.collection('users').findOne({ _id: ObjectId(id) })

    user._id = String(user._id)
    return user
  },
  async create(user) {
    user.createdAt = new Date()
    user.updatedAt = new Date()

    await this.$db.collection('users').insertOne(user)

    user._id = String(user._id)
    return user
  },
  async remove(id) {
    const result = await this.$db.collection('users').deleteOne({ _id: ObjectId(id) })

    return !!result.deletedCount
  }
}
