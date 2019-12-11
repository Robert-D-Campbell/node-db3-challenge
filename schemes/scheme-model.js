const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}
function findById(id) {
  return db("schemes").where({ id });
}
function findSteps(scheme_id) {
  return db("steps")
    .orderBy("step_number", "asc")
    .join("schemes", "steps.scheme_id", "=", "schemes.id")
    .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
    .where({ scheme_id });
}
function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes);
}
function remove(id) {
  return db("schemes")
    .where("id", id)
    .del();
}
