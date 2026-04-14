const reviewModel = require("../models/review-model")
const utilities = require("../utilities/")

const reviewCont = {}

/* ***************************
 *  Process Add Review
 * ************************** */
reviewCont.addReview = async function (req, res) {
  const { review_text, inv_id, account_id } = req.body
  const result = await reviewModel.addReview(review_text, inv_id, account_id)

  if (result) {
    req.flash("notice", "Review added successfully.")
    res.redirect("/inv/detail/" + inv_id)
  } else {
    req.flash("notice", "Sorry, adding the review failed.")
    res.redirect("/inv/detail/" + inv_id)
  }
}

/* ***************************
 *  Deliver Edit Review View
 * ************************** */
reviewCont.editReviewView = async function (req, res) {
  const review_id = parseInt(req.params.reviewId)
  const reviewData = await reviewModel.getReviewById(review_id)
  
  // Security Check: Only the author can edit
  if (reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "You are not authorized to edit this review.")
    return res.redirect("/account/")
  }

  let nav = await utilities.getNav()
  res.render("review/edit-review", {
    title: "Edit Review",
    nav,
    errors: null,
    review_id: reviewData.review_id,
    review_text: reviewData.review_text,
    review_date: reviewData.review_date
  })
}

/* ***************************
 *  Process Review Update
 * ************************** */
reviewCont.updateReview = async function (req, res) {
  const { review_id, review_text } = req.body
  const reviewData = await reviewModel.getReviewById(review_id)

  if (reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "Unauthorized.")
    return res.redirect("/account/")
  }

  const result = await reviewModel.updateReview(review_id, review_text)
  if (result) {
    req.flash("notice", "Review updated successfully.")
    res.redirect("/account/")
  } else {
    req.flash("notice", "Update failed.")
    res.redirect("/review/edit/" + review_id)
  }
}

/* ***************************
 *  Deliver Delete Review View
 * ************************** */
reviewCont.deleteReviewView = async function (req, res) {
  const review_id = parseInt(req.params.reviewId)
  const reviewData = await reviewModel.getReviewById(review_id)

  if (reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "Unauthorized.")
    return res.redirect("/account/")
  }

  let nav = await utilities.getNav()
  res.render("review/delete-review", {
    title: "Delete Review",
    nav,
    errors: null,
    review_id: reviewData.review_id,
    review_text: reviewData.review_text,
    review_date: reviewData.review_date
  })
}

/* ***************************
 *  Process Review Delete
 * ************************** */
reviewCont.deleteReview = async function (req, res) {
  const review_id = parseInt(req.body.review_id)
  const reviewData = await reviewModel.getReviewById(review_id)

  if (reviewData.account_id !== res.locals.accountData.account_id) {
    req.flash("notice", "Unauthorized.")
    return res.redirect("/account/")
  }

  const result = await reviewModel.deleteReview(review_id)
  if (result) {
    req.flash("notice", "Review deleted.")
    res.redirect("/account/")
  } else {
    req.flash("notice", "Delete failed.")
    res.redirect("/account/")
  }
}

module.exports = reviewCont