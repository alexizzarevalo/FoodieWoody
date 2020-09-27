require 'calabash-android/management/app_installation'

# module Cucumber
#     module RunningTestCase
#       class TestCase < SimpleDelegator
#         def feature
#           string = File.read(location.file)
#           document = ::Gherkin::Parser.new.parse(string)
#           document[:feature]
#         end
#       end
#     end
# end

# AfterConfiguration do |config|
#   FeatureMemory.feature = nil
# end

# Before do |scenario|
#   scenario = scenario.scenario_outline if scenario.respond_to?(:scenario_outline)

#   feature = scenario.feature
#   if FeatureMemory.feature != feature || ENV['RESET_BETWEEN_SCENARIOS'] == '1'
#     if ENV['RESET_BETWEEN_SCENARIOS'] == '1'
#       log 'New scenario - reinstalling apps'
#     else
#       log 'First scenario in feature - reinstalling apps'
#     end

#     ensure_app_installed
#     clear_app_data
#     FeatureMemory.feature = feature
#     FeatureMemory.invocation = 1
#   else
#     FeatureMemory.invocation += 1
#   end
# end

# FeatureMemory = Struct.new(:feature, :invocation).new
