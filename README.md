![GitHub commit activity](https://img.shields.io/github/commit-activity/w/jack-kraus/game-tracker)

# ![logo](https://github.com/user-attachments/assets/133f84f3-4466-4862-bf53-216bd3417513) Gaming Review Site

Welcome to [Leveler](https://levelr.vercel.app/), a community driven platform to share your thoughts on your favorite games.
Whether you're a casual player or a hardcore enthusiast, Leveler allows you to connect with your friends. 

## Feature Overview
* **Share Reviews:** Write and publish your own reviews on a wide range of video games. Share your insights, experiences, and opinions with the community.
* **Follow and Connect:** Follow your friends and stay updated on their latest posts.
* **Engage with Content:** Like and comment on reviews to engage with the community. Share your thoughts and participate in discussions.
* **Notifications:** Get notified when your posts have a new like or comment, or when a user follows you

## Technologies used
* [React](https://react.dev/)
* [NextJS](https://nextjs.org/)
* [Supabase + PostgreSQL](https://supabase.com/)
* [IGDB API](https://api-docs.igdb.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind](https://tailwindcss.com/)
* [Vercel Deployment](https://vercel.com/jack-kraus-projects)

## Pages

### Feed
<p align="center">
  <img src="https://github.com/user-attachments/assets/132b1e48-fc4d-4e07-91bb-9a65c4c5222d" width="50%">
</p>

Check out the newest posts from everyone on the site and filter by various metrics:

* **Filter:** `[None/Following]` Either show posts from all users, or just those in your following list
* **Order:** `[Created At/Likes/Rating]` Order by newest, most likes, or highest rating
* **Last:** `[All/Day/Week/Month]` See posts from all time, the last day, week, or month
* **Reverse:** `[True/False]` Whether to reverse the results

### Review Breakdown
<p align="center">
  <img src="https://github.com/user-attachments/assets/ff0c7e68-cc23-4484-95bb-7811abc02010" width="50%">
</p>

When you see a listed review it will contain the following information:
* **Title:** The title of the review, as a link to that post's page
* **Content:** The actual content of the review, with a `[See More/See Less]` option if the content exceeds a certain number of lines
* **Game Title/Poster:** The poster and title of the game, with a link to that game's specific page
* **Review author:** The username of the author of the post, along with a timestamp of when the review was created
* **Options:** The three dots appear next to a post if you're the author, which gives you the option to edit or delete a post
* **Rating:** The rating of the game given by the author out of 5 stars
* **Likes:** The amount of likes the post has received, as a button to like/unlike if you're signed in. The button is purple if you've liked the post, and black if not.

### Review Page
<p align="center">
 <img src="https://github.com/user-attachments/assets/7eb7aaa3-682f-4a14-83c1-bfc7a35be545" width="50%">
</p>

Click on the title of a post you see in your feed or under a game page.
You'll see all of the same items as found on the review card but with the full unobfuscated text.

#### Comments
<p align="center">
 <img src="https://github.com/user-attachments/assets/67054204-97e3-4d7a-83b1-6e784a894615" width="50%">
</p>
Scroll down to see all of the comments users have left on the post.
These comments have a link to the user's page who posted it and the content of the comment.
If you posted this comment, you can click on the three dots to edit (pictured above) or delete the comment.

### Game Page
<p align="center">
 <img src="https://github.com/user-attachments/assets/53a7272e-a3d0-4341-bfc8-6df71fe6e75e" width="50%">
</p>

Click on a game in a user's post or in the game search result to see more information on the game including platforms, genres, and description.
Click the "+" icon to brought to the post page with that game filled in.
Scroll down to see user reviews for that game with all the filters found on the feed page.

### User Page
<p align="center">
 <img src="https://github.com/user-attachments/assets/769b80d3-2c97-4954-bcfd-07fd8386ccee" width="50%">
</p>

Click on the username on any user's reviews, comments, or in search results to go to their page.
At the top you'll see a card with their username, followers, following, and a button to `[Follow/Unfollow]` them.
Scroll down to see all of their posts with some of the filters found on the feed page.

#### Profile page
<p align="center">
 <img src="https://github.com/user-attachments/assets/fb15b8d1-9535-4c08-a34d-a16c3be66437" width="50%">
</p>

Click on the user icon on the very right side of the navbar to go to your profile page.
This contains all the same information as your user page, but with the option to log-out instead of follow, and a gear icon to edit your information.

### Login/Sign-up
<p align="center">
  <img src="https://github.com/user-attachments/assets/4904b226-ad7d-44c4-a7a9-978d68798496" width="50%">
</p>

Click on the user plus icon in the navbar when logged out to either login or sign-up. Select which action you'd like to perform and the appropriate form will load.
Once completed you'll be redirected to your profile page.

### Share a Post
<p align="center">
  <img src="https://github.com/user-attachments/assets/4fa34386-651b-4169-9877-35df12d88775" width="50%">
</p>

Click on the plus icon in the navbar to draft a new post. The top bar allows you to search for games on the IGDB video game database.
Then include a title for your post, content, and a rating out of 5 stars.

### Search

#### Search For a Game
<p align="center">
  <img src="https://github.com/user-attachments/assets/ba66d70c-3bf7-4564-aae4-97856c997675" width="50%">
</p>
Click on "Game" in the search bar selector, enter a search term and press "enter".
You'll see results from the IGDB video game database.
Click the title to be brought to that game's page, or click the "+" icon to brought to the post page with that game filled in.

#### Search For a User
<p align="center">
 <img src="https://github.com/user-attachments/assets/39f0daf3-d39c-4c27-ba92-9456351379ea" width="50%">
</p>

Click on "User" in the search bar selector, enter a search term and press "enter".
You'll see results of users on the site with usernames matching that string, as well as their follower and following count.
Click the user's username to go to their page to see all their posts, or click on `[Follow/Unfollow]` to follow or unfollow them respectively.

### User Modals

#### Like Modal
<p align="center">
 <img src="https://github.com/user-attachments/assets/400a4e24-2a26-42e0-92f2-bae77872964f" width="50%">
</p>

Click on the like count on any post to see a list of the users that have liked it.

#### Following/Follower Modal
<p align="center">
 <img src="https://github.com/user-attachments/assets/2377baf0-6adb-4a2e-8401-4bf6002e1926" width="50%">
</p>

Click on the follower/following count on any user page to see a list of users that that user is followed by or following respectively

### Notifications
<p align="center">
  <img src="https://github.com/user-attachments/assets/34de563b-a29f-48c5-9a6f-86da0ae825ea" width="50%">
  <img src="https://github.com/user-attachments/assets/401ae86d-e64e-4a4b-b820-064e567ed48a">
</p>

When you have a new notification, you'll see it in the navbar's bell icon. The red circle contains the number of notifications you have.
Clicking it reveals the notification modal which lists your notifications, with ones you previously read having a dark background while new ones
have a light background. Viewing this page sets all of your notifications to "read", and exiting this modal by clicking away or pressing the `X` will update your notification count.
