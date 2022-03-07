# Frontend

This folder contains the project for the frontend of the morriscare website.

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
A good example of using the confirmation dialog can be found in the `applicant-list component`. The reject function from this component is shown below:

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
available and often they require custom functionality to happen within the subscribe method within the http request. This functionality is difficult to port to a generic function in a module and so it was not deemed a necessary headache for the scope that this project has.

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

The folder `styles.css` contains many css classes and some global variables used throughout the project. Notably the classes `centered-full-width-rows-container` and `centered-partial-width-rows-container` are used throughout. `centered-full-width-rows-container` is what styles most of the forms and styles the form fields to take up
the whole container they are within. It is worth noting that there are several global variables used throughout the project `navbarHeight` indicating the height of the
top navigation bar, `mainColor` indicating the style color used as the primary color in the Angular Material theme so it can be used in non-Angular Material css classes
for consistency, and `indicationColor` which is a darker color used to indicate a hover over a main-colored button. There is a global class for this hover functionality
named  `hover-clas`. This file is also where the snackbar styles are found.

### global-variables.ts

This file contains the enum containing the internal values indicating a type of user. This should be used whenever a role is consitered for consistency.
