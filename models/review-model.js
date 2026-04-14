const pool = require("../database/")

/* *****************************
*   Add new review
* *************************** */
async function addReview(review_text, inv_id, account_id) {
  try {
    const sql = "INSERT INTO review (review_text, inv_id, account_id) VALUES ($1, $2, $3) RETURNING *"
    return await pool.query(sql, [review_text, inv_id, account_id])
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Get reviews for a specific vehicle
* *************************** */
async function getReviewsByInvId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT r.*, a.account_firstname, a.account_lastname 
       FROM review AS r 
       JOIN account AS a ON r.account_id = a.account_id 
       WHERE r.inv_id = $1 
       ORDER BY r.review_date DESC`,
      [inv_id]
    )
    return data.rows
  } catch (error) {
    console.error("getReviewsByInvId error " + error)
  }
}

/* *****************************
*   Get reviews for a specific account
* *************************** */
async function getReviewsByAccountId(account_id) {
  try {
    const data = await pool.query(
      `SELECT r.*, i.inv_make, i.inv_model, i.inv_year 
       FROM review AS r 
       JOIN inventory AS i ON r.inv_id = i.inv_id 
       WHERE r.account_id = $1 
       ORDER BY r.review_date DESC`,
      [account_id]
    )
    return data.rows
  } catch (error) {
    console.error("getReviewsByAccountId error " + error)
  }
}

/* *****************************
*   Get review by ID
* *************************** */
async function getReviewById(review_id) {
  try {
    const data = await pool.query("SELECT * FROM review WHERE review_id = $1", [review_id])
    return data.rows[0]
  } catch (error) {
    console.error("getReviewById error " + error)
  }
}

/* *****************************
*   Update review
* *************************** */
async function updateReview(review_id, review_text) {
  try {
    const sql = "UPDATE review SET review_text = $1 WHERE review_id = $2 RETURNING *"
    const result = await pool.query(sql, [review_text, review_id])
    return result.rows[0]
  } catch (error) {
    return error.message
  }
}

async function deleteReview(review_id) {
  return await pool.query("DELETE FROM review WHERE review_id = $1", [review_id])
}

module.exports = { addReview, getReviewsByInvId, getReviewsByAccountId, getReviewById, updateReview, deleteReview }