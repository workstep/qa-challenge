# qa-challenge

Please limit yourself to approx. 2-3 hours

## Running The App

---

- Step 1: Run `yarn install` to install all of the project dependencies
- Step 2: Run `blitz prisma migrate dev` to set up your local sqlite database
- Step 3: Run `blitz db seed` to populate the database with candidate data
- Step 4: Run `blitz dev` to start the server (if you need to change the default port of 3000, append `-p 4000` or the port number of your choosing)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Submitting

---

Branch off `main` locally, complete the challenge, then send us a zip file containing your automated test script and a document outlining the manual QA results.

`git archive -o qa-challenge.zip HEAD`

## Task

---

QA a feature that has been developed and marked as ready to deploy to production.
Use both manual and automated QA methods to validate the acceptance criteria has been met.

- Automated QA: please write a script in the language/framework of your choice (selenium, cucumber, etc...)
  to validate the requirements below.
- Manual QA: please list out any discrepencies you see
  between the requirements and the developed feature. Feel free to include annotated screenshots if you'd like.

## Feature

---

### Description

Logged-in hiring managers see a tabbed table called "My Pipeline" that lists job applicants in their various interview steps. The implementation should reflect the design below.

### Design

<img src="public/table2.png" width="580">

### Acceptance criteria

Verify that all of the items below satisfy the design and functionality described in the feature.

- [ ] Layout & Styling
  - [ ] Layout and spacing is pixel perfect
  - [ ] Colors used match design
- [ ] Data Integrity
  - [ ] All candidates show up in the All Candidates list
  - [ ] Candidate counts by status are correct
  - [ ] Candidates are appropriately displayed in their respective status lists when navigating through the side nav
  - [ ] Interview dates are correct
  - [ ] When changing a candidate's status, they are moved into the appropriate status list and the counts on the side nav are updated (when refreshing the page, the correct updated status should be reflected in the dropdown for each candidate)
- [ ] Search & Filter
  - [ ] Searching for candidates works
  - [ ] Search and filter state carries over between views when navigating from the side nav
