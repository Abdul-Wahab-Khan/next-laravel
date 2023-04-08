# About Project

This simple project is just created for pre interview test.

## 1: Project setup

This is a demo project for showcasing the skills of nextjs with laravel for a job application. This project have two parts located in two repositories linked below.

First Part is the front end which is built in nextjs with SSG functionalities, which will have the ability to load pages faster and also be SEO friendly.

Project parts:

- [Front end(Nextjs)](test)
- [Back end (Laravel)](https://laravel.com/docs/container)

Download or clone the repositories and run `npm install` for nextjs and `composer install` for laravel project to install their dependencies.

To use SSG (Nextjs pre rendering capabilities) of nextjs with laravel, you should define a local domain for your laravel project, suppose like `myapp.com` so that there wouldn't be any issue for nextjs server side code getting data from laravel APIs.

There are some guides on internet you could use to define local domain, whether if you are in windows, linux or whether if you are using all in one software like XAMPP or LAMP. It doesn't matter, in all cases you can set up a custom local domain to get started with the project.

When you have set up the local domain, copy the domain URL and add it to `next.config.js` in nextjs root directory. so that nextjs would know about laravel app URL.

After setting up the domain, run laravel migrations to set up the database for our application. before running migrations make sure to add your db credentials in `.env` file.

finally run both of the projects.

use `npm run dev` for nextjs app. for laravel app since you may have set up a custom domain, there is no need for starting the project, just make sure your apache or nginx server is running.

If you faced any issue regarding `cors` error. add your nextjs app URL to `config/cors.php` file in laravel project.

## 2: Project structure

### **2.1: Front-end (nextjs)**

At the front end we have implemented the logic to do all CRUD operations of user. also the capability to load data with nextjs's pre rendering techniques, so that we would have faster response from our app.

We have a directory in pages folder named `users`. this directory contains `index` page for showing list of all users. `Create` page for creating a user, which contains the form and the logic for creating a user and cropping the image to a certain measure. `[id]` is dynamic route page for reading data related to a specific user by their id. which also the capability of pre rendering by `getStaticPaths` and `getStaticProps`.
And finally the `edit` folder with one dynamic route page for editing a specific user.

The front end app also contains some layout and styling done by bootstrap.

Also there is a components directory in src directory which contains some Reactjs components, which are used inside the pages.

There is one more folder by the name of `utils` which contains one file called `imageCropper.ts`, it has the logic for cropping the image. we have used it in `users/create` and `users/edit/[id]` pages.

And the last file that we have, in root directory of nextjs app called `types.ts`.
Its obvious the you should have some predefined types when working with typescript which we have also done here. it has a single interface for declaring the type of `user`.

### **2.2: Back-end (Laravel):**

The back end code is pretty simple. it only has one model and a controller.

The UserController in `app/http/controllers` directory is an API controller contains all of the logic for user's CRUD operations. For `GET` http request the index action of users controller will be called and it will fetch all of the users records from databases and return them in `JSON` format. The edit and delete actions are doing a simple task of getting the user and update or delete their info.
store action has the logic for storing the user's info alongside their image which are sent by the front end in form data. It will store the images in public directory in images folder. later on, if user's data is requested, back-end app wouldn't need to sent images with other data to user. we just need to sent the image name. since we have configured laravel app as an images domain in `next.config.js` file, there is no need to get images from back-end. we could use back-end URL and concatenate the name of the image with it. this will give us the exact URL of image, which resides inside laravel public directory.

### Conclusion

This was all about this app, I hope you have enjoyed it.

Thanks for giving your time to look at this project.
