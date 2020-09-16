require 'redmine'
require_dependency 'redmine_tree_project/my_hook'

Redmine::Plugin.register :redmine_tree_project do
  name 'Redmine tree project'
  author 'Sergey Lapetov'
  description 'Tree projects'
  version '0.0.1'
  url 'http://srv-dnp.argos.loc/gitlab/argosprogrammer/redmine_tree_projects'
end
