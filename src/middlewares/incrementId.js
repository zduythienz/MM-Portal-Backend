let getNextSequence = function(db, name, callback) {
  db.collection("counters").findAndModify(
    { _id: name },
    null,
    { $inc: { seq: 1 } },
    function(err, result) {
      if (err) callback(err, result);
      console.log(`Result of getNextSequence: ${result}`);

      callback(err, result.value.seq);
    }
  );
};

module.exports = getNextSequence;
