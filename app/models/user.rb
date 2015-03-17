class User < ActiveRecord::Base
  validates :fname, :lname, :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil:true} #needs to allow nil, because we might edit other aspects of the  without passing in another password - also we don't want it to become part of the model
  validate :emailFormat
  after_initialize :ensure_session_token

  has_many( #should have been singular...Should have picked a singular name
  :courses_instructors,
  class_name: "CoursesInstructors",
  dependent: :destroy,
  inverse_of: :instructor
  )

  has_many(
  :courses_students,
  class_name: "CoursesStudents",
  dependent: :destroy,
  inverse_of: :student
  )

  #Linear associations
  has_many :courses, through: :courses_students, source: :course
  has_many :taughtcourses, through: :courses_instructors, source: :course
  has_many :grades, dependent: :destroy

  #Bypass associations
  has_many :assignments, through: :courses_students, source: :assignments
  has_many :announcements, through: :courses_students, source: :announcements


  attr_reader :password #this needs to be present in order for this to work, otherwise it can't check the password property

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

	def self.find_by_credentials(email,password)
		user = User.find_by_email(email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save! #saves token to model
    self.session_token #yields own session token
  end

  def emailFormat
    emailRegex = Regexp.new("^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9.\-]+$")
    errors.add(:email, "is not a valid email address") if !!emailRegex.match(@email)
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end
