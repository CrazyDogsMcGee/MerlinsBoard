MerlinsBoard.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {

    //if the router is split, all the below has to be called in the application initialize
    this.currentUser = MerlinsBoard.CurrentUser //and this...
    this.currentUser.fetch();

    this.$rootEl = options["rootEl"]; //need to abstract these
    this.$sideNav = options["sideNav"];
    this.$tabNav = options["tabNav"];
    var courseTabs = new MerlinsBoard.Views.CourseTabs({collection: this.currentUser.courses()}) //thse too
    var courseDetails = new MerlinsBoard.Views.CourseDetails();
    this.$tabNav.html(courseTabs.$el)
    this.$sideNav.html(courseDetails.$el)
  },

  routeRegex: function (routeName) {
    var courseFlag = new RegExp("_course");
    var homeFlag = new RegExp("_home");

    if (courseFlag.test(routeName)) {
      return "course"
    } else if (homeFlag.test(routeName)) {
      return "home"
    } else {
      return false
    }
  },

  execute: function (callback, args) {
    var actionName = this.getActionName(callback);

    var noNull = _.filter(args, function (arg) {
      return !(arg === null)
    })

    if (this.routeRegex(actionName) == "course") { //should probably extract this somewhere else
      this._currentCourse = MerlinsBoard.Courses.getOrFetch(noNull[0]);
      MerlinsBoard.Vent.trigger("courseRender",{courseModel: this._currentCourse});
      this._currentCourse.fetch({success: function () {console.log(this._currentCourse)}.bind(this)});
    } else {
      MerlinsBoard.Vent.trigger("homeRender");
    }

    if (callback) callback.apply(this, noNull);
  },

  getActionName: function(callback) {
    if (!this.routes) {
        return;
    }

    var actionName;
    var matched;
    for (var routePattern in this.routes) {
        actionName = this.routes[routePattern];
        if (callback === this[actionName]) {
            matched = actionName;
            break;
        }
    }
    return matched;
  },


	routes: {
    //course resources
    "course/search" : "enrollcourses",
    "course/:id/enroll" : "showcourse",
    "course/new": "newcourse",
    "course/:id/edit": "editcourse",
    "course/taught": "taughtcourses",
    //instructors
    "course/:id/add-instructors": "addInstructors_course",
    //announcement resources
    "" : "homeAnnouncements_home",
    "course/:id/announcements/new": "newAnnouncement",
    "course/:course_id/announcements/:id/edit":"editAnnouncement",
    "course/:id/announcements" : "courseAnnouncements_course", //shows announcements for course + navView
    //assignment resources
    "course/:id/assignments/new" : "newAssignment",
    "course/:id/assignments" : "showAssignments",
    "course/:course_id/assignments/:id/edit" : "editAssignment",

    //document resources
    "course/:id/resources":"courseResources",
    "course/:id/resources/new":"newResource",
    "course/:course_id/resources/:id/edit":"editResource",

    //grades
    "course/:id/grades/student-search" : "gradeSearch_course",
    "course/:course_id/grades/user/:user_id" : "gradesAdminShow",
    "course/:id/grades/my-grades": "gradesStudentShow",

    //users
    "student-profile/:id": "showUser",
    "edit-user": "editUser",
    "change-password": "changePassword"
    //misc

    //":wildcard": "does not exist" --self explanatory
	},


  //course resources
	enrollcourses: function () {
    var allcourses = new MerlinsBoard.Collections.Courses([],{owner: this.currentUser});

    this.currentUser.fetch()

    var enrollView = new MerlinsBoard.Views.CoursesEnroll({model: this.currentUser});
    this.swapView(enrollView);
  },

	newcourse: function () {
    var newcourse = new MerlinsBoard.Models.Course();
    var courseform = new MerlinsBoard.Views.CourseForm({model: newcourse});
    this.swapView(courseform);
  },

	editcourse: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var courseform = new MerlinsBoard.Views.CourseForm({model: course});
    this.swapView(courseform);
  },

	showcourse: function (id) { //examines enrollments here
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var showCourse = new MerlinsBoard.Views.CoursesShow({model: course});
    this.swapView(showCourse);
  },

  taughtcourses: function () {
    var taughtCourses = this.currentUser.taughtcourses();
    var taughtCourseView = new MerlinsBoard.Views.CoursesTaught({collection: taughtCourses});
    this.swapView(taughtCourseView);
  },

  //instructors

  addInstructors_course: function (id) {
    var search_collection = new MerlinsBoard.Collections.UsersSearch();
    var instructors_template = MerlinsBoard.Views.SearchStudentInstructors;
    var user_search = new MerlinsBoard.Views.UsersSearch({collectionView: instructors_template, course: this._currentCourse});

    this.swapView(user_search);
  },

  //announcements
  homeAnnouncements_home: function () {
    this.currentUser.fetch()

    var allAnnouncements = this.currentUser.announcements();
    var allAnnouncementsView = new MerlinsBoard.Views.announcementHome({collection: allAnnouncements});
    this.swapView(allAnnouncementsView)
  },

  courseAnnouncements_course: function (id) {
    var announcements = this._currentCourse.announcements();

    var courseAnnouncements = new MerlinsBoard.Views.announcementList({collection: announcements});
    this.swapView(courseAnnouncements);

    MerlinsBoard.Vent.trigger("courseRender",{courseModel: course});
  },

  newAnnouncement: function (id) {
    var newAnnouncement = new MerlinsBoard.Models.Announcement();
    var announcementForm = new MerlinsBoard.Views.announcementForm({model: newAnnouncement, course_id: id});
    this.swapView(announcementForm);
  },

  editAnnouncement: function (course_id,id) {
    var announcement = new MerlinsBoard.Models.Announcement({id: id})
    announcement.fetch()

    var announcementForm = new MerlinsBoard.Views.announcementForm({model: announcement, course_id: course_id});
    this.swapView(announcementForm);
  },

  //assignments

  showAssignments: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var assignments = course.assignments();

    var courseAssignments = new MerlinsBoard.Views.assignmentList({collection: assignments});
    this.swapView(courseAssignments);

    MerlinsBoard.Vent.trigger("courseRender",{courseID: id});
  },

  newAssignment: function (id) {
    var newAssignment = new MerlinsBoard.Models.Assignment();
    var assignmentForm = new MerlinsBoard.Views.assignmentForm({model: newAssignment, course_id: id});
    this.swapView(assignmentForm);
  },

  editAssignment: function (course_id,id) {
    var assignment = new MerlinsBoard.Models.Assignment({id: id});
    assignment.fetch();

    var assignmentForm = new MerlinsBoard.Views.assignmentForm({model: assignment, course_id: course_id});
    this.swapView(assignmentForm);
  },

  //course resources

  courseResources: function (id) {
    var course = MerlinsBoard.Courses.getOrFetch(id);
    var resources = course.resources();

    var courseResources = new MerlinsBoard.Views.resourceList({collection: resources});
    this.swapView(courseResources);
  },

  newResource: function (id) {
    var resource = new MerlinsBoard.Models.Resource({course_id: id});
    var courseForm = new MerlinsBoard.Views.resourceForm({model: resource});
    this.swapView(courseForm);
  },

  editResource: function (course_id, id) {
    var resource = new MerlinsBoard.Models.Resource({id: id})
    resource.fetch();

    var courseForm = new MerlinsBoard.Views.resourceForm({model: resource});
    this.swapView(courseForm);
  },

  //grades

  gradeSearch_course: function (id) {
    var search_collection = new MerlinsBoard.Collections.UsersSearch({course_id: id});
    var gradeLinkTemplate = MerlinsBoard.Views.SearchStudentGradesResults;
    var user_search = new MerlinsBoard.Views.UsersSearch({collectionView: gradeLinkTemplate, course: this.currentCourse});

    this.swapView(user_search);
  },

  gradesAdminShow: function (course_id, user_id) {
    var grades = new MerlinsBoard.Collections.Grades({course_id: course_id, user_id: user_id});
    grades.fetch({parse: true});

    var grades_list = new MerlinsBoard.Views.GradesStudent({collection: grades, model: grades.student(), adminView: true});
    this.swapView(grades_list);
  },

  gradesStudentShow: function (course_id) {
    var grades = new MerlinsBoard.Collections.Grades({course_id: course_id, user_id: this.currentUser.id});
    grades.fetch({parse: true});

    var grades_list = new MerlinsBoard.Views.GradesStudent({collection: grades, model: grades.student(), adminView: false})
    this.swapView(grades_list);
  },

  //users

  showUser: function (id) {
    var user = new MerlinsBoard.Models.User({id: id})
    user.fetch();

    var userShow = new MerlinsBoard.Views.UserShow({model: user});
    this.swapView(userShow);
  },

  editUser: function () {
    this.currentUser.fetch();

    var user_form = new MerlinsBoard.Views.UserForm({profile: true, model: this.currentUser});
    this.swapView(user_form);
  },

  changePassword: function () {
    this.currentUser.fetch();

    var password_form = new MerlinsBoard.Views.UserForm({model: this.currentUser});
    this.swapView(password_form);
  },

  //utils

  swapView: function (newView, navView) {
    if (!this._currentView) {
      this._currentView = newView;
    } else {
      this._currentView.remove();
      this._currentView = newView;
    }

    this.$rootEl.html(newView.render().$el);
  }
})
