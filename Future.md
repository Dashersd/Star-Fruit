# Future Roadmap & Enhancements 🚀

While the current prototype perfectly demonstrates the premium UI/UX of Starfruit Express, turning it into a fully production-ready business will require a few strategic backend integrations and advanced features.

Here is the roadmap for future add-ons:

### 1. Database Integration (PostgreSQL / Supabase)
- Move away from the local `mockData.ts` file and connect the application to a real backend database.
- Allow an admin panel where the distributor can easily add, edit, or remove products and update prices.

### 2. User Authentication (NextAuth / Clerk)
- Implement a secure login system for restaurant chefs and managers.
- Restrict ordering to verified restaurant accounts only.
- Support multiple sub-users per restaurant (e.g., Executive Chef, Sous Chef, Owner).

### 3. Payment Processing (Stripe / Square)
- Integrate Stripe for seamless, secure credit card processing directly within the checkout modal.
- Support invoicing/Net-30 payment terms for trusted restaurant partners.

### 4. Real-time Inventory Management
- Sync the `stockStatus` (In Stock, Low Stock, Out of Stock) directly with the warehouse inventory system.
- Prevent users from adding items to their cart if they have just sold out.

### 5. Delivery Scheduling & Logistics
- Add a calendar widget during checkout so chefs can specify exactly which day they need the delivery.
- Add fields for "Delivery Notes" (e.g., *“Leave at back kitchen door before 7 AM”*).

### 6. Order History & "Reorder" Button
- Provide a dashboard where chefs can see all their past invoices.
- Add a highly requested **"1-Click Reorder"** button, allowing chefs to instantly re-purchase their exact weekly ingredient order without manually finding each item again.

### 7. "Favorites" / Pantry List
- Allow chefs to "heart" or save ingredients to a custom "My Pantry" list for even faster weekly ordering.
