require 'rails_helper'

RSpec.describe "resources/new", type: :view do
  before(:each) do
    assign(:resource, Resource.new(
      :name => "MyString",
      :description => "MyText",
      :course_id => 1
    ))
  end

  it "renders new resource form" do
    render

    assert_select "form[action=?][method=?]", resources_path, "post" do

      assert_select "input#resource_name[name=?]", "resource[name]"

      assert_select "textarea#resource_description[name=?]", "resource[description]"

      assert_select "input#resource_course_id[name=?]", "resource[course_id]"
    end
  end
end
