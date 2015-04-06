class User < ActiveRecord::Base
  #OAuth
  devise :omniauthable, :omniauth_providers => [:google_oauth2]
  
  #pg_search
  include PgSearch
  pg_search_scope :search_by_full_name,
                  :against => [:fname, :lname],
                  :using => {
                    :tsearch => {:prefix => true}
                  }

  #paperclip
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "50x50#" }, :default_url => "https://s3.amazonaws.com/merlinsboardapp/tumblr_n7i34p1rfX1qzdeo7o1_1280.png"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  #Validators
  validates :fname, :lname, :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil:true} #needs to allow nil, because we might edit other aspects of the  without passing in another password - also we don't want it to become part of the model
  validate :emailFormat
  after_initialize :ensure_session_token

  #Active Record Relations
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

  #Auth methods
  attr_reader :password

	def self.find_by_credentials(email,password)
		user = User.find_by_email(email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end
  
  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
    data = access_token.info
    user = User.where(:email => data["email"]).first
    
    byebug

    unless user
        user = User.create(
           fname: data["first_name"],
           lname: data["last_name"],
           email: data["email"],
           password: Devise.friendly_token[0,20]
        )
    end
    
    user
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save! #saves token to model
    self.session_token #yields own session token
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def emailFormat
    emailRegex = Regexp.new("^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9.\-]+$")
    errors.add(:email, "is not a valid email address") if !!emailRegex.match(@email)
  end

end
