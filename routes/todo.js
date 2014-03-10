var ObjectID = require('mongodb').ObjectID

/*
 * GET todolist
 */

exports.todolist = function(db) {
  return function(req, res) {
    db.collection('todolist').find().toArray(function (err, items) {
      res.json(items);
    })
  }
};

exports.addtodo = function(db) {
  return function(req, res) {
    db.collection('todolist').insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};

exports.toggletodo = function(db) {
  return function(req, res) {
    db.collection('todolist').update({"_id": new ObjectID(req.params.id)},{ $set: req.body }, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    }); 
  }
};

exports.updatetodo = function(db) {
  return function(req, res) {
    db.collection('todolist').update({"_id": new ObjectID(req.params.id)},{ $set: req.body }, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    }); 
  }
};

exports.deletetodo = function(db) {
  return function(req, res) {
    var todoToDelete = req.params.id;
    db.collection('todolist').removeById(todoToDelete, function(err, result) {
      res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
  }
};