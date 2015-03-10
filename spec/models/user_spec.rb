require "rails_helper"

RSpec.describe User, :type => :model do
  
  context "Creating a User" do
    
    it "Can be instantiated/created" do
      test_user = User.create(
        fname: "John",
        lname: "smith",
        email: "john@smith.com",
        password: "password"
      )
      expect(test_user).to be_truthy
    end
    
    it "Rejects a too short password" do
      test_user = User.create(
        fname: "John",
        lname: "Smith",
        email: "john@smith.com",
        password: "pass"
      )
      errors_array = test_user.errors.full_messages
      errors_array.should include("Password is too short (minimum is 6 characters)")
    end
    
    it "Rejects an improperly formatted email" do
      test_user = User.create(
        fname: "John",
        lname: "Smith",
        email: "john@smith..com",
        password: "password"
      )
      errors_array = test_user.errors.full_messages
      errors_array.should include("Email is not a valid email address")
    end
    
  end
  
  context "After creation" do
    subject(:test_user) {User.create(
        fname: "John",
        lname: "Smith",
        email: "john@smith.com",
        password: "password"
      )}
    
    it "has its attributes accessible after create" do
      expect(test_user.fname).to eq("John")
      expect(test_user.lname).to eq("Smith")
      expect(test_user.email).to eq("john@smith.com")
    end
    
    it "has a password hash attribute" do
      expect(test_user.password_digest).to be_truthy
    end
    
    it "has a session token" do
      expect(test_user.session_token).to be_truthy
    end
    
  end
  
  context "Instance methods used by controller" do
    
    describe "#reset_session_token!" do
    end
    
  end
  
  context "ActiveRecord Ownership and relationships" do
    #look at sql assessment spec for this.
  end
  
end