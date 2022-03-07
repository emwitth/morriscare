# Frontend

This folder contains the project for the frontend of the morriscare website. The purpose of this readme is to help my collaborators understand what is happening throughout
my code if they ever look at it or need to help in any way. It is not taylored to a user of this code in a public sense if this repository ever gets to that point.

## Layout

The folder `./source/app` contains the angular components and other main angular files in the project.
Notable files outside this are the favicon.ico file which includes the picture displayed in tabs for the project
and the styles.css file which contains global css classes and other assorted css items that can be accessed anywhere
within the document.

Other important angular files are angular.json, package-lock.json, and package lock.json.
More can be read about these files [here](https://github.com/angular/angular-cli).

Moreover, there are three sub folders within `./source/app that` contain more than one angular component.
The first is `dialog-components`, which includes any dialog invoked by other components. The second is `interfaces`,
which contains interfaces representing different information retrieved from the backend,
in typscript's case interfaces are blueprints for a custom meta-"type". The third sub folder is `modules`, which
contains modules meant to be portable and useful throughout the project. More on all of these folders later in the readme.

## Notable Libraries

This project uses two notable style and behaviour libraries outside of default html in angular.
These are [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) and 
[Angular Materials](https://material.angular.io/components/categories).

Boostrap is used for its many custom css classes. It is used less extensively than Angular Materials,
but it is used for all [tables](https://www.w3schools.com/bootstrap5/bootstrap_tables.php) in the website
as well as the main styles for the [navigation bar](https://www.w3schools.com/bootstrap5/bootstrap_navbar.php).
Bootstrap is also used for styling with [flex](https://www.w3schools.com/bootstrap5/bootstrap_flex.php).

Angular Materials is used in html mainly for forms. Most buttons present and all form fields are Angular Materials components.
All Angular Materials components used must be imported in `app.modules.ts`. Notably, Angular Materials is also used extensively
for any [dialogs](https://material.angular.io/components/dialog/overview) or [snackbars](https://material.angular.io/components/snack-bar/overview), alert messages.

## Running the project

The project runs via [node.js](https://nodejs.org/en/). Installing node should be a simple Google search away so I will not belabor those directions here.
In particular, the project uses [Node Package Manager (npm)](https://www.npmjs.com/) for installation and running. This should be installed automatically with node.js.

Any command given in this repository assumes your shell to be at level with the angular project, which is equal with this readme. As of the time of writing this, this would be within the `frontend` folder of the github repository.

### Installation of Dependencies

The first time running the project, or running the project after a new package/library is installed requires you to update the `node_modules` folder. This is a folder
not on github as it is redundant if you have npm. In order to create/update this folder of dependancies type `npm install`. This should install the correct version of
everything the project depends on.

### Running the Project (proxy.config.json)

In order to run the project properly, run the command `npm run start` this in turn runs a command defined in the `package.json` file. This command proxys http requests
however is detailed in `proxy.config.json`. In this case, any request going to localhost:4200/api/ will go to 123.49.100.87:8080/api/. This allows for http requests to the
backend server to be proxied correctly. Succesfully running `npm run start` should eventually give an indication of the development server being opened on `localhost:4200`
This is where you can then connect to to view the website while developing.

### Building the project

In order to build this project the command `ng build` should be run. This command should put the command in turn in `dist/frontend`. Those files should then be put into the
appropriate folder on the server. More on this when I refresh my memory at the end of this sprint for which folder. The latest build should be in the main directory and a zipped version should also exist.

## Style

### Typescript
The typescript code in this project attempts to follow a consistent pattern of style. Every line ends in a semicolon. Where possible, variables are typed.
Tabs are 2 spaces (as per VS Code default).

A function definition would look like this:

```
function(param: type): return_type {
    // arguments
}
```
On functions that are not typed for a return value, a space is still put between the parenthesis and the bracket.

Objects that are created should be itemized on seperate lines (ie. a var object would have each of its items on a seperate line).

```
var body {
  item1: "a string",
  item2: 4,
  ...
  itemN: true
}
```
Objects are often declared in a call to a function, but itemizing them like above would still aid in readability of code.

### HTML

If an html item takes up more than one line, any elements nested inside of it should be indented, 4 spaces (as per VS Code default). The indentation should follow general
code indentation of the closing `</element>` field being level horozontally with the opening `<element>` field. Under this style, a simple html page might look like this:

```
<div class="flex-center">
    <mat-card>
        <a href="https://xkcd.com/1969/">
            <img src="https://imgs.xkcd.com/comics/not_available.png" alt="a funny joke">
        </a>
    </mat-card>
</div>
```

### Website Style

Angular Material elements and Bootrap CSS classes as described in the Notable Libraries section will help keep the displayed webpages consistent in their styling.
The further consistent use of these will help keep a consistent style as well. Examples of several common use cases are given below for reference while developing 
new pages:
- For a table of users, refer to `./src/app/hcp-manage`
- For an itemized list that has seperate entities, refer to `./src/app/application-manage`
- For a form, refer to `./src/app/hcp-application`
- For a form inside a dialog, refer to `./src/app/dialog-components/add-posting-dialog`

More references will be added as this project is developed further and more complexity is added. Moreover, using all of the code developed within the project described in the
following section will help keep a consistent style and presentation. 

## Reusable Code

There are several workflows that occur often in the project. To more quickly and cleanly maintain the code within these, several different methods of reuse are shown.

### Confirmation Dialog

One standard operation is a dialog popup asking for confirmation on continuing with some task, say deleting or approving a new user.
The dialog component `./src/app/dialog-components/confirmation-dialog` was created to fufill this simple purpose without a new component
needing to be created every time this sort of action must be done. The component contains a generic title, details, and names for the
confirmation and cancel buttons. These can be overridden individually by passing in an object of the following form:

```
{
    title: <title_text>,
    details: [
        <details_line_one>,
        <details_line_two>,
        ...
        <details_line_n>
    ],
    confirm: <confirmation_label>,
    cancel: <cancelation_label>
}
```

Any of these details can be left as their default values by simply not including them in the data passed on invocation of the component.
The default values are as follows:

- title: "Approve"
- details: [ "Are you sure you would like to complete this function?" ]
- confirm: "Okay"
- cancel: "Cancel"

For a consistent style, please capitalize the first letter of values for the confirm and cancel buttons.

In order to perform an action at the press of the confirm button you need to subscribe to the close function of the dialog component.
The confirmation dialog returns res.data as a boolean. If data is true, this indicates that the confirm button is pressed and some action can occur.
A good example of using the confirmation dialog can be found in the `applicant-list` component. The reject function from this component is shown below:

```
  reject(first: string, last: string, id: number) {
    // dialog asks for confirmation
    const myCompDialog = this.dialog.open(ConfirmationDialogComponent, { data: {
      title: "Reject " + first + " " + last, 
      details:[
        "Are you sure you would like to reject " + first + " " + last + "?",
        "This will result in their application being deleted."
      ]
    } });
    // watch result of dialog
    myCompDialog.afterClosed().subscribe((res) => {
      if(res.data == true) {
        // if dialog closes with true, deny the applicant
        this.http.get<any>("api/deny/" + id + "/", { observe: "response" }).subscribe(result => {
          if (result.status != 200) {
            this.snackbar.openSnackbarError();
          } else if(result.status == 200) {
            console.log(result.body);
          }
        }, err => {
          this.snackbar.openSnackbarErrorCust(err.error.error);
        });
      }
    });
  }
```

### Modules

There are also custom modules used throughout the project. These are kept within the `./app/src/modules` folder and are segregated
by their functionality.

### Modules - api

The backend api is accessed using typescrypts `HttpClient` functions. An attempt was made to bring several of these functions to one place for easier maintenance.
It is generally simpler for endpoints only used once to keep them in their respective components instead of the api module. This is due to the fact that as code reuse is not
available and often they require custom functionality to happen within the subscribe method within the http request. This functionality is difficult to port to a generic
function in a module and so it was not deemed a necessary headache for the scope that this project has.

There are a few notable functions within the api modules that are used more than once however. These functions are used and are fairly portable and versatile.

- getListOfUsers(type: string)
  - fetches a list of users of a given type and their information
- updateUserInfo(id: string | null, body: any)
  - updates the given information in body in the user of ID id
  - can be used to update any information a user includes by simply providing an object containing the fields to be updated and their new values
- getAllQuestions()
  - fetches all the security questions possible (there are 6)

**NOTE** be careful when using these functions and then accessing their returns in typescrypt directly afterwards. Because of the asynchronous nature of the http requests,
this could cause problems. The functions are however safe to set a value and then use in an *ngFor loop in the html.

### Modules - formatting

The formatting module is intended for different formatting functions needed throughout the project. The functions are intended to re-format items retrieved from the databse
for display or format items in the way the database expects for storage within it. The functions provided are as follows:

- formatPhone(phoneNum: string): string
  - takes phoneNum, the phone number as just digits
  - returns a phone number in the format (555) 555-5555
- formatSSN(ssn: string): string
  - takes ssn, the social security number as just digits
  - returns a social security number in the format 555-55-5555
- parseMomentDateToString(date: Date): string
  - parses a date object into a string representing a date as YYYY-MM-DD

### Modules - snackbar

The snackbar module is used to display an alert at the bottom of the screen. Methods for displaying the alert can be called directly abstracting the overhead for
invoking Angular Material snackbars. A custom style has also been applied to better match the style of the project. The functions are `openSnackbarSuccess`,
`openSnackbarError`, `openSnackbarSuccessCust`, and `openSnackbarErrorCust`. The custom versions of the functions take a string to use as the message.
The default messages are `Success` for success and `An Error Occured, please try again`for an error.

### styles.css

The folder `styles.css` contains many css classes and some global variables used throughout the project. Notably the classes `centered-full-width-rows-container` and
`centered-partial-width-rows-container` are used throughout. `centered-full-width-rows-container` is what styles most of the forms and styles the form fields to take up
the whole container they are within. It is worth noting that there are several global variables used throughout the project `navbarHeight` indicating the height of the
top navigation bar, `mainColor` indicating the style color used as the primary color in the Angular Material theme so it can be used in non-Angular Material css classes
for consistency, and `indicationColor` which is a darker color used to indicate a hover over a main-colored button. There is a global class for this hover functionality
named `hover-class`. This file is also where the snackbar styles are found.

### global-variables.ts

This file contains the enum containing the internal values indicating a type of user. This should be used whenever a role is consitered for consistency.
