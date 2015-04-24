# MerlinsBoard
http://merlinsboard.jvvlee.com

MerlinsBoard is a course management system. Users can sign-in with their Google account or by providing basic information. Users can start using the site by enrolling in a course or creating one of their own. For more detailed information about how to use the application, check out the "Read Me!" page in the navigation bar on login.

### Current Features:
* Google OAuth Sign-in
* File and user image upload
* Course and user search
* Secures access to course resources from unauthorized users

### Planned features:
* Downloadable PDF of course grades (prawn pdf)
* Bootstrap usage
* User account authentication through email
* Backbone router handling of 404 and 403 errors
* Using twilio for course announcements

* Allow taught courses to appeat in navigation bar
* Paginate search results in the case of large query returns

## Frameworks Used
* Ruby on Rails
* Backbone JS

## External APIs
* Google OAuth
* Paperclip/AWS

## Design Discussion

### "Execution Router" and Event handler
There are three views that persist in this application, the two navigation bars and the main content view. Navigating to different links primarily changes the content view appropriately to show announcements, grades or whatever resources are requested. Depending on the context, the two navigation bars change as well.

While the course-navigation bar is simply set to re-render whenever the current user changes what courses they attend, the side navigation bar is context sensitive. It shows links to enroll in a course or to change profile information when a user first logs in, but when a user clicks on one of the course tab links, then the view is populated with another set of links leading to resources such as grades and documents. The changing navigation view needs information about the current course a user is browsing through and about the access privileges a user has (course administrator, student, or non-enrolled user). 

Since this information is required both by the main content view (to display request content) and the side navigation view (to display the probably navigation context), it may make sense to render these two together. However, such an arrangement is wasteful. It would require a new Backbone View object for the navigation bar to be instantiated for every view, filling up the Backbone router with clutter and adding yet another consideration to the pile when new views are being developed.

To avoid this redundancy, the navigation views are each only instantiated once when the application launches. Any changes that need to be made to their content are handled by re-rendering the view. But what conditions decide that the view should be re-rendered with new information? How does the view know to show links to resources belonging to "Biology" and not "Literature"? In the router, there are three functions, "RouteRegex", "getFunctionName" and "execute" that accomplish this.

"Execute" is native to Backbone and runs whatever code is defined within it each time a Backbone router function is called with a URL change/navigation. In my "Execute" function, "getActionName" takes in the callback passed into "Execute" to see which route function is being called. Each router function has a "_course" or "_home" flag attached to it so that when it is passed to "routeRegex," the regex functions contained within return a string that determines the next course of action ("course" or "home"). This action is the triggering of an event on a "Vent" object.

The navigation view object listens for events triggered on the "MerlinsBoard.Vent" object (an instance of the Backbone Events object) to decide what kind of content to render. A "homeRender" event causes the navigation to show relevant to the homepage, while the "courseRender" event fetches a course object and passes that to the view so that links to resource belonging to the course can be displayed.

The course object that gets fetched is passed to both the navigation view, and the content view. This way, the course object itself is made a property of the router (as "_currentCourse") and from there, acts as a sort of dependency injection to the router functions rendering the content views. This gets rid of the need to manually instantiate the "course" object every time the router function is called, and also ensures that the rather large JSON representation of the course is garbage collected if a different course needs to be fetched.

### Asset Security
A large part of managing courses is ensuring proper access of resources. A student of a course should not be able to view grades for the entire class, and a user not enrolled as a student or instructor to a class should not have any access at all. To this end, I protect the course collections (grades, resources, announcements) from being accessed on two levels: Backbone Views and Rails Controllers.

On the Backbone side, this is simply done by not allowing direct access to assets not intended for users. All of the AJAX requests are written only to retrieve data belonging to a user or from the courses they are enrolled in. Of course, that alone does not prevent unauthorized read/write access to resources, it only makes it apparent from the front-end experience what resources a user is intended to have access to. A user could still open the javascript console and make a GET request for another student's grades or attempt a PUT request to change one of their own. To prevent this, relevant GET/PUT/POST events in the controllers for course resources are protected by Rails filter/:before_action that queries the database to see if the user is an administrator or a student of a particular course. So long as the integrity of the session token is intact, this stateless authentication strategy should work.

One example of this in action is in accessing a courses grades. Depending on whether a particular user is the instructor or a student for a course, clicking the same "Grades" link will direct them to a page showing their own grades (student) or a search page to find the grades for a student to modify. This is achieved by having a jquery event redirect the user conditionally, depending on whether the course object has that user's ID listed as an instructor or student. This would seem fine from a purely front-end perspective, but nothing could stop an unauthorized user from crafting an AJAX request for that data. From that, grades are secured on the rails-side so that only an instructor for that class or the user that the grades belong to can access it.

### Scheduling
One of the items mediating access to courses is enrollments (In this application, called courses_students and courses_instructor). These represent link table entries that connect courses with users. When a user is enrolled in a course, it is one of these join table entries that is created. When a user enrolls in a class or an instructor attempts to enroll them as an instructor in the same class, this join table entry is evaluated to check if there are any scheduling conflicts with the user's course roster.

The logic for determining course conflicts is abstracted to the Scheduling module in the "lib" folder. All the taught and attended courses for a user are gathered and each are evaluated against the course that is being enrolled into. If no conflicts are detected, then the course can be successfully added. For more details, check the "scheduling.rb" file.

I eventually will want to replace this module with a single SQL query to reduce database calls and improve efficiency (as Ruby operators are more expensive than SQL)

### Composite View
When a Backbone collection is rendered, the view showing these items should listen for changes on any of it's member objects in order to show this updated information to the user. However, it may be considered wasteful to re-render the entire page to show the change of one item of the collection, which is why the Composite View pattern is used.

The composite view works by giving each model within a collection it's own view object, so any changes to that object would only cause it's own view to be re-rendered.