# Lauren Hall Ruddell

The professional website for an author to showcase her written works, and as a platform to bolster a career as a speaker and consultant. This website has a custom content management UI; the client can easily manage the dynamic content of the site (e.g. blog posts, articles, books, events) via a separate section of the site, which is secured by a two-factor authentication (2FA) login.

I designed and built this full-stack project from scratch, using React/NextJS (React framework) for the front-end, Express for the backend server/API, and the database on MongoDB Atlas. The front-end content management section was built using the React Admin library.

-   [Visit Live Site](https://www.laurenhallruddell.com)
-   [Read more project details](https://aidanboling.com/work/author-site) on my portfolio site


## Tech Used

-   **Core**: React, Next.js, NodeJS, ExpressJS, MongoDB
-   **Other Libraries and Platforms**: React-Admin, MaterialUI, Amazon Lightsail


## Screenshots

![Screenshots of home page in browser and mobile view](https://dg8lucrkskkqo.cloudfront.net/LHR-Cover.png 'Homepage')
![Screenshots of articles page and a post page](https://dg8lucrkskkqo.cloudfront.net/LHR-Pages.png 'Homepage')
![Screenshots of content management list, post detail, and post edit pages](https://dg8lucrkskkqo.cloudfront.net/LHR-Admin-pages.png 'Content management pages')


## Feature Spotlight: User Authentication

Securing the content management section was one of the trickier features to implement, due in no small part to the higher stakes involved.

Implementation details include:
-   Two-factor authentication (2FA), with multiple options: email, authentication app
-   Account/security settings section — user can manage 2FA methods, password, view last login. Modifying sensitive information (e.g. password) requires the user to confirm credentials.
-   Restricted accounts — account creation and “forgot password” reset require a time-limited code from the site admin, created through backend
-   User sessions managed using session IDs

![Screenshots of content management login screens and user security settings](https://dg8lucrkskkqo.cloudfront.net/LHR-Admin-security.png 'Login and security settings pages')


## Current Status/Upcoming Features

The site has been launched, but work will be ongoing; I will be improving it and add new features as needed over time.

A few of the most immediate planned updates include: 
-   Review and improve accessibility
-   Improve admin user experience — increase time between login requirements
-   Enable limited filtering/sorting (tags, dates) for content on main site — articles, posts
