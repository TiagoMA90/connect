# Connect
Connect is a generic Social media platform that allows users to create Posts, write Comments, leave Likes & Follow other Users. Very much similar to Instagram and Twitter, the app was designed to allow Users to share photos with a title & description, within the community.

It is a website where Users can share their vacation pictures, give feedback to others & connect.

(The website does not have a theme per say, as the developer wanted to create a social media app exclusive for the people of Madeira, where one could create posts and share photos of the island itself in ways to promote the detsionation of Madeira, as a touristic hotspot for visitors.)

<img src="readme/img/bytesdev.png" alt="screen sizes">

## Live Project
- The live website can be found [here](https://connect-network-ee92c70de293.herokuapp.com/)

## Purpose of the website:
- To provide a platform where users can share their pictures and comments.
- To create a community of users and like minded individuals.
- To connect with people.

## Design:
The website was designed with the intent to allow users to browse posts, read comments and navigate throughout the website at ease.
It allows users to access all components, easily and allows users to perform all CRUD functionalities for their, Posts, Comments, Likes & Profiles. Furthermore, users can Report posts & Contact the moderation panel.

It relied heavily on colors that should be appealing to the user, especially for those who might visit the website on a daily basis.

For such, it makes use of a colour palette of a mere white & gray blend for the navigation bar and Orange for the Logo, buttons and active Links.

The background is best defined by a grayish white and the body of the post white, bordered by solid lines.

The components such as NavBar, Posts, Comments, the Users list and Footer are stylized by a shadow-box to invoke the sense of Polaroid film/picture.

[Image of the Color Palette]

Components & Functionality:
## Navbar, Header & Favicon
- The Navbar located at the upper end of the page, serves as the menu for the user to navigate between pages. From left to right is the "Logo", followed by "Add post" (if the user is authenticated), then "Home", "Feed", "Liked", "Sign In" (if not authenticated) "Sign Out" and "Profile".
- The user can then access these components by clicking the desired icon. A hover effect is in place and the cursor turns into a pointer to advert users of its accessibility.


## Posts
- Users can then create Posts (if authenticated) by navigatng to "Add post" next to the logo. From there, users will be prompt to upload an image and write the title and a brief description of the post. Once users click the Create/Submit button, the post will be displayed at "/" or "Home", for the whole community to see. Posts can also be Edited or Deeleted by the author of the post, if desired, by navigating inside the Post and clicking the little dropdown menu defined by a Pencil or Bin icons, accordingly.
- Posts may also be Liked/Disliked, Commented and Reported. This functionality allows the community active and the users engaged.

## Comments
- Users (if authenticated) can write Comments on Posts. This functionality encourages users to give feedback on posts. Comments, like Posts, can also be Edited or Deleted, by following the same pattern in Posts.
- From the Post page, users ought to click on the Dialogue iconto access the list of Comment, from there write a comment in the form, from the Comment section and hit submit.

## Likes
- From a Post, Users (if authenticated) can also leave likes and consequently remove the like (dislike) to Posts. This show appreciation from the community.
- The counter then rises per user, by +1 or -1, but never goes below 0.
- Owners of a Post cannot like/dislike their own posts.

## Report
- Users (if authenticated) also have the ability to Report Posts. From a Post click on the Flag icon. From there a modal is displayed with a Reason of choice and an optional description field.
- This supports the Administration panel to moderate and fight Spam &/or Innapropriate content.

## Footer
- Located on the right panel, just below the "Latest/Users Comments" component (Home/Profile), or SignIn/Up (Components), the footer contains access to the "Contact" component, the social media links & the modal to the "Terms of Service". It is best defined by icons easily recognizable and navigable by Users.

## Contact
- The "Contact" component grants users the possibility to contact the administration panel regarding any issues they are having with the platform. Users (authentication not necessary) need to input a valid e-mail*, a username, subject of concern and the nessage they wish to send to the Support team. Upon a successful submission, Users are notified a message has been sent.

## Signin
- After creating an account, Users may log in onto their users accounts, through the Sign In component. Users will then have the possibility perform CRUD functionalities in the platform and interact with the community. To sign in Users are requested to input their loog in credentials, such as Username and Password, previously created in the Sign Up page.

## Signup
- To be part of this community, Users must create an account. For such, users must input a Username, Password & Password confirmation and hit Sign Up. Upon a successful account creation, users can then log in via Sign In.

## Profile
- Once a User account is created and a user is authenticated, one can access a User "Profile".
- The User Profile details all activity performed by a given user, such a latest Posts & Comments and the number & List of Followers and Followings. Owners of a profile and visitors can then easily track the latest motions and be on pair with their followings.

## Edit Profile, Change Username, Update Password, Delete Profile
- As the owner of a Profile (if authenticated), one may Edit the user handle, avatar, password or entirely delete the Profile. This allows the user to have total control of the User profile and CRUD at will.

## Follow
- As a User (if authenticated), one can follow/unfollow other users. This functionality allows users to stay updated with th eposts of their Followings. When following another user, the feed of all followings can be accessed via the "Feed" tab and will display the posts chronologically.

PopularProfiles
Followed Profiles
Following Profiles
FilteredComments
CommunityComments
[ELABORATE]
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