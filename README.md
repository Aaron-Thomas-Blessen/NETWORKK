# NETWORKK

Networkk is conceived as a revolutionary digital marketplace designed to seamlessly connect individuals seeking professional services with skilled workers in their local area. This platform addresses a critical gap in the current market by offering a user-friendly, secure, and efficient means of finding, vetting, and engaging skilled professionals ranging from plumbers and electricians to tutors and carpenters. In an era where time is a precious commodity, and trust is paramount, Networkk emerges as a vital tool for communities, enhancing how services are rendered and accessed.


# Requirement Analysis

Functional Requirements: 
-  Customer Interface:
● Customers can register for an account using their email address and create a profile.
● Customers can search for services based on type of service, location and availability.
● The system allows for scheduling appointments based on the availability of the service provider and customer preference.
● Customers can pay for services using upi-id.
● After service completion, customers can rate the service provider and leave a review.

- Service Provider Interface:
● Service providers can create a profile, detailing their skills, availability, pricing along with police clearance certificate.
● Service providers can view, accept, or decline booking requests from customers.
● Service providers can manage their schedules and set availability as needed.
● Service providers can view customer reviews and ratings on their service profile page.
● Service providers can view current status of orders.

- Admin Interface:
● Admins can review, approve, or reject service listings to ensure they comply with platform standards using PCC . 
● Admins can oversee all platform transactions, bookings and service listings.

# Technology Stack

● React: Employed for developing the frontend, user interface, offering a declarative and component based approach for creating interactive UI components resulting in a seamless user experience.
● Firebase: Integrated for authentication services ensuring secure access control and user identity management within the application. Used for storing various data related to application like service listings, profile details, user and admin details etc.

# Modular Description

1. User Interface Module
Home Page: Displays the welcome message and options to sign in or sign up.
Sign In/Sign Up Pages: Allows users to create an account or log in.
User Dashboard: Displays user-specific information and options to book services.
Service Provider Dashboard: Allows service providers to manage their profiles and view bookings.
Admin Dashboard: Provides administrative controls and oversight functionalities.

2. Authentication Module
User Authentication: Uses Firebase Authentication for secure sign-in and sign-up processes.
Role-based Access Control: Differentiates access for users, service providers, and administrators.

3. Service Management Module
Service Listings: Allows service providers to create and manage service listings.
Service Search: Enables users to search for services based on various parameters such as type, location, and ratings.
Booking Management: Facilitates booking of services by users and allows service providers to manage bookings. 

4. Review and Rating Module
User Reviews: Enables users to provide feedback on service providers.
Rating System: Aggregates user ratings to provide an overall rating for service providers.


