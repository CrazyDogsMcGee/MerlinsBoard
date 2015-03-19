require 'rails_helper'

RSpec.describe "resources/index", type: :view do
  before(:each) do
    assign(:resources, [
      Resource.create!(
        :name => "Name",
        :description => "MyText",
        :course_id => 1
      ),
      Resource.create!(
        :name => "Name",
        :description => "MyText",
        :course_id => 1
      )
    ])
  end

  it "renders a list of resources" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
