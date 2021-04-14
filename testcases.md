# Test Cases
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

 -
## Template: Test case name
- Write a sentence about what your test is testing
- Write a sentence about what you expected to happen
- Write a sentence about what actually happened
