# Connect
Connect is a generic Social media platform that allows users to create Posts, write Comments, leave Likes & Follow other Users. The app was designed to allow Users to share photos with a little description and title, within the community.
In sum, it is a website where Users can share their pictures & give feedback to others.

[Image for the screen sizes]

## Live Project
- The live website can be found [here](https://connect-network-ee92c70de293.herokuapp.com/)

## Purpose of the website:
- To provide a platform for users where one can share their pictures and comments.
- To create a community of users and like minded individuals.
- To connect with friends, aquiantances & strangers

## Design:
The website was designed with the intent to allow users to browse posts, read comments and navigate throughout the website at ease.
It allows users to access all components, easily and allows users to perform all CRUD functionalities for their, Posts, Comments, Likes & Profiles. Furthermore, users can report Posts & Contact the moderation panel.

It relied heavily on colors that should be appealing to the user, especially for those who might visit the website on a daily basis.

For such, it makes use of a colour palette of a mere white & gray blend for the navigation bar and Orange for the Logo, buttons and active Links.

The background is best defined by a grayish white and the body of the post white, bordered by solid lines.

The components such as NavBar, Posts, Comments, the Users list and Footer are stylized by a shadow-box to invoke the sense of Polaroid film/picture.

[Image of the Color Palette]

(FE)Components & Functionality:
Navbar, Header & Favicon
(Elaborate)
Posts
(Elaborate)
Comments
(Elaborate)
Likes
(Elaborate)
Report
(Elaborate)
Footer
(Elaborate)
Signin
(Elaborate)
Signup
(Elaborate)
(FE)Frofile
(Elaborate)
Contact
(Elaborate)
---
Features & Functionality
(FE)Features and Functionality for Reg. Non-Registered Users:
Visitors can read all posts from "/".
Visitors can read all users' posts from /profiles/(id)/.
Visitors can create a user account through /signup/.
Visitors can navigate to the "/", "/signin", "/signup", "/profiles/(id)", "/contact" pages.
Visitors can access external links on users posts/comments and in the Footer.

(FE)Registered Users (CRUD) can do the above as a Visitor, moreover:
Users can sign in/out through the "/signin" & "/signout" available on the NavBar.
Users can create posts through the "posts/create" component available on the NavBar.
Users can update their posts through the "/posts/(id)/edit" functionality available in the MoreDropdown menu, inside the Post.
Users can delete their posts through the "Delete" functionality provided in the MoreDropdown menu, inside the Post.
Users can Like/Dislike all posts through the "Like/Dislike" functionality under the Post. (Users cannot use this fuctionality for their own Posts)
...
Users can navigate to their own Profile.
Users can update their own Profile Bio & Profile Picture in "Edit Profile" (/profiles/(id)/edit), from the Dropdown menu.
Users can update their Username in "Change Username" (/profiles/(id)/edit/username), from the Dropdown menu.
Users can update their Password in "Update Password" (/profiles/5/edit/password), from the Dropdown menu.
Users can update delete their own Profile accounts by clicking "Delete Account", from the Dropdown menu.

(BE)Superusers can manipulate information through the "/admin" panel:
- CRUD posts.
- Change Users passwords.
- Create/update/delete Users/Profiles.
- CRUD comments.
- Promote Users to Staff/Superuser.
- Read CRUD messages sent by users via Contact Us component.
- Read Reports sent by Users via the Report component.

[Image for the registered Models in ADMIN panel Site Administration]
---
(FE)Planning & Agile
---
(FE)Development & Deployment
---
## Languages & Frameworks (Front-end)
- HTML (markup language)
- CSS (style sheet language)
- Bootsrap (CSS framework)
- React (javaScript Library)

## Languages & Frameworks (Back-end)
- DjangoRESTFramework (python framework)

## Other forms of development
- Favicon.cc - Favicon generator
- Convertio - Image converter
- Google Fonts - Source of fonts
- FontAwesome - Source of icons
- Bytes.dev - Testing screen sizes
- Chrome DevTools - Testing tool
- WAVE Evaluation tool - Testing tool
- W3validator HTML validation tool
- W3jigsaw - CSS validation tool
- JSHint - Javascript testing tool
- CI Python Linter - CI Python testing tool
- Diagrams - Diagram set up
- Github - Host for the repository
- Gitpod - Code editor
- ElephantSQL - Database
- Cloudinary - Static & Media host
- Heroku - Cloud platform/Host the live project
---


Testing
For Manual testing, please refer to [TESTING.md](LINK HERE)