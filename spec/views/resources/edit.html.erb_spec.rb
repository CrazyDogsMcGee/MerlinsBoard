require 'rails_helper'

RSpec.describe "resources/edit", type: :view do
  before(:each) do
    @resource = assign(:resource, Resource.create!(
      :name => "MyString",
      :description => "MyText",
      :course_id => 1
    ))
  end

  it "renders the edit resource form" do
    render

    assert_select "form[action=?][method=?]", resource_path(@resource), "post" do

      assert_select "input#resource_name[name=?]", "resource[name]"

      assert_select "textarea#resource_description[name=?]", "resource[description]"

      assert_select "input#resource_course_id[name=?]", "resource[course_id]"
    end
  end
end
