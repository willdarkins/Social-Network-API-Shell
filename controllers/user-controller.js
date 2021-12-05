const { Error } = require('mongoose');
const { User } = require('../models');

const userController = {
    addUser({body}, res) {
        User.create(body)
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => res.status(400).json(err));
    },
    getAllUsers(req, res) {
        User.find({})
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .then(dbUser => {
            if(!dbUser){
                res.status(400).json({message: 'There is no user with that ID!'});
                return
            }
            res.json(dbUser);
        })
        .catch(err=> {
            console.log(err);
            res.status(400).json(err)
        })
    },
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true})
        .then(dbUser => {
            if(!dbUser){
                res.status(400).json({message: 'There is no user with that ID to update'});
                return
            }
            res.json(dbUser);
        })
        .catch(err=> {
            console.log(err);
            res.status(400).json(err)
        })
    },
    deleteUserById({ params }, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUser => {
            if(!dbUser) {
                res.status(400).json({message: 'There is no user with that ID to delete'})
                return
            }
            res.json(dbUser)
        })
        .catch(err=> {
            console.log(err);
            res.status(400).json(err);
        })
    }
}   
module.exports = userController;