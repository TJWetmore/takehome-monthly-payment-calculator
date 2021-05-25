
**Loan Calculator**

Thank you for taking a look at this repo. You'll notice a couple things...

1.  **It's built in gatsby.js as the frontend framework**

    I chose this framework environment because:
    - It automatically bundles a super fast webpack config. If we were to add additional pages it would be super fast between the mulitple pages
    - It is a static site, which is pretty much all we need for this project because there's no server communications and all calculations are done in the browswer. 
    - Honestly, the 'make-gatsby-app' sets everything up really really quickly. It's nice. 

2.  **I'm using Chakra UI as the CSS component Library**

    I find Chakra UI to be easier to read for the developer, as they label their components in an intuitive manner (e.g., `<Text>`, `<Container>`, `<Slider>`, `<NumberInput>`) when compared to something like Bootstrap. Further, they have some additioanl features that Bootstrap does not have, so the development process is much smoother

3.  **I'm doing unit testing with Cypress**

    While Cypress is typically used for E2E testing, it really is an all-in-one framework. E2E and integration tests aren't really necessary for the scale of this project. A simple unit test is plenty sufficient. 

    I am using cypress because it's easy to use and fun to watch the app interact in the testing environment.  

## Other Thoughts

1. I split it out between mortgage loans and pay-day loans to give constraints to the interest amounts. A slider that can go from 2.5% interest to 200% interest with 0.25 increments just isn't as usable as a something that goes from 20% to 200% interest with 2.5% increments. I used 200% and $1,000 as the maximum for payday loans per your standards. And I used 2.5% to 20%, with 5,000 to $1,500,000 as the boundaries for the morgage as something of a ball-park figure for younger Americans. 

2. If we really wanted to make this awesome, we would make it a duel interest rate calculator and a budgeting tool. So a user would come in, put in how much they want to borrow and their interest payments, and then they could build out a budgeting tool within the same page to see both how much loan to take and how they could afford it. 
- It would also be great for the  brand, if you both made pay-day loans more accessible, and provided financial literacy in the process