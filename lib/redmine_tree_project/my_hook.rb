module Redmine_tree_project
  class Hooks < Redmine::Hook::ViewListener
    render_on :view_issues_show_description_bottom, :partial => 'hooks/tree_project/view_issues_show_description_bottom'
    render_on :view_layouts_base_html_head, :partial => 'hooks/tree_project/view_layouts_base_html_head'
  end
end
