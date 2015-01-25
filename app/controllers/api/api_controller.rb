class Api::ApiController < ApplicationController
	before_action :require_signed_in! #found in application controller - will be inherited 
	#any other backbone specific universal methods  should go here
end

