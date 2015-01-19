class User < ActiveRecord::Base
  validates :fname, :lname, :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil:true} #needs to allow nil, because we might edit other aspects of the user without passing in another password - also we don't want it to become part of the model
  after_initialize :ensure_session_token

  has_many( #should have been singular...Should have picked a singular name
  :courses_instructors,
  class_name: "CoursesInstructors"
  )
	
  has_many(
  :courses_students,
  class_name: "CoursesStudents"
  )

  #this got messed up because I made the model name plural, rails automatically

  has_many :courses, through: :courses_students, source: :course
  has_many :taughtcourses, through: :courses_instructors, source: :course

  attr_reader :password #this needs to be present in order for this to work, otherwise it can't check the password property

  def password=(password)
    @password = password #this needs to be set on the object - since it is a class, the instance variable is an "attribute"
    self.password_digest = BCrypt::Password.create(password)
  end #if the password object tries to be set, it sets the password digest instead

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

	def self.find_by_credentials(email,password)
		user = User.find_by_email(email) #find_by_attr is given by active record
    return nil if user.nil? #nil evals to false - user DNE
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16) #returns random string - This is also part of the standard ruby module
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token #sets session token
    self.save! #saves token to model
    self.session_token #yields own session token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token #if first is truthy, does nothing. If falsey, sets equal to the second term
  end

end
