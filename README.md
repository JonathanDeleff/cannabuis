Dependencies:
npm i
npm i postgres
npm install react-icons --save
npm install recharts

TODOS:
- Add customers to sales so we can properly update database
- Add employee info to sales
- Add delete functionality for employees
- Implement add employees (jon)
- Implement Search functionality for employees (ethan)
- Tiles need to be refined, selectable and a conditional rendering so when one is selected it shows more info


- Implement conditional rendering depending on employee job title (will need a scrum to determine what we need/don't)

Notes: 
- right now login token wont expire
- When selling and quantity is set at 1, db goes down by 2
- There is some seriouse issues around orders and prices when fetched, the problem appears to come from the reusing of sales components updating the wrong fields to prices for orders. orders use item_cost, where as sales uses discount_price, conditional rendering can be used to differentiate the 2.
- Employees also need image_url in the database