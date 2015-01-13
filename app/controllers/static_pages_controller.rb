class StaticPagesController < ApplicationController
	before_action :require_signed_in!
	
	def root
		#smart naming should automatically find root view
	end
end
