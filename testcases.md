# Test Cases
## Template: Test case name
- Write a sentence about what your test is testing
- Write a sentence about what you expected to happen
- Write a sentence about what actually happened

## Create and Delete a Book from Category
- Admin adds a new book to category
- Book should be updated in Categories list
- Book is updated

# Promotion Test Cases
## Valid Promotion Entered
- A promotion with valid fields is entered and submitted
- Expected: The database is updated with the new promotion -- the manage promotions page is updated upon being refreshed.
- Actually: The database is updated with the new promotion -- the manage promotions page is updated upon being refreshed.
## Invalid Promotion: Start Date Before Current Date
- A promotion with a start date before the current date is entered
- Expected: The form indicates that the start date is invalid.
- Actually: The form indicates that the start date is invalid.
## Invalid Promotion: End Date before Start Date
- A promotion with an end date that occurs before the start date is entered
- Expected: The form indicates that the end date is invalid.
- Actually: The form indicates that the end date is invalid.

# Manage User Test Cases
## Invalid Account Supsended:
- An admin's account cannot be suspened
- Expected: An admin should not suspend its own account or another admin account. The page conditionally renders so that the admin does not have these options.
- Actually: An cannot suspend its own account or other admin accounts. The page does infact conditionally render so that the option to suspend user is unavaliable to the admin.

## Conditional Rending of Status Button:
- Status button should conditionally render based on customer or employee status.
- Expected: If a customer's or employee's status is set to active or inactive, the button should read suspend. Conversly, if the status is suspended, the button should read unsuspend. 
- Actually: When a customer's or employee's status is set to active or inactive, the button reads suspend. When the status is suspended, the button reads unsuspend.

## (FAILED) User Type when Unsuspending
- When a customer or employee is unsuspended their status should go back to what it was before being suspended
- Expected: If a customer of employee is unsuspended and their status was active then it should go back to being active. If the status was inactive, it should go back to being inactive. 
- Actually: When a customer or employee with active status before supension was unsuspended their status was went back to active. However, if their status before being suspended was inactive, it was changed to active instead of inactive like it should be. 