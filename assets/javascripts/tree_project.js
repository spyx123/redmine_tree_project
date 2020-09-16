function list_to_tree() {

  var list = [];
  $('#issue_project_id > option').each(function(i, option){
    value  = $(option).val();
    name   = $(option).html();
    level  = 0;
    if (name.indexOf('»')!=-1) {
      level = (name.split("&nbsp;").length - 1)/2;
      name = name.replace(/&nbsp;/g, ' ');
      name = name.replace(/»/g, ' ');
      name = name.trim();
    }

    item = {}
    item ["name"]     = name;
    item ["id"]       = value;
    item ["level"]    = level;
    item ["parentId"] = "0";
    list.push(item);
  })

  for (i = 0; i < (list.length); i++) {
    for (j = (i+1); j < (list.length); j++) {
      if (list[j].level == list[i].level)
        break;

      if (list[j].level == (list[i].level+1))
        list[j].parentId = list[i].id;
    }
  }

  var map = {}, node, roots = [], i;
  
  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parentId !== "0") {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }

  $('#issue_project_id').after('<input id="tree_issue_project_id" style="cursor:default;background-image: url(../images/arrow_down.png);background-repeat: no-repeat;background-position: calc(100% - 7px) 50%;"><div class="tree"><input id="tree_issue_project_id_filter" name="filter" style="margin-left: 5px;margin-top: 5px;width: 100%;" placeholder="Поиск ..."><div id="tree"></div></div>');
  $('#issue_project_id').hide();

  $('#tree_issue_project_id').val($('#issue_project_id > option:selected').text());

    /*
    $('body').click(function() {
      console.log('body click');
      if (!$('.tree').is(":hidden")) {
        $('.tree').hide();
        event.stopPropagation();
      }
    });
    */

    $('#tree_issue_project_id_filter').click(function(e) {
      console.log('tree_issue_project_id_filter click');
      event.stopPropagation();
    });
    

    $('#tree_issue_project_id').click(function(e) {
      console.log('tree_issue_project_id click');
      $('.tree').toggle();

      $('.tree').css('width', $('#tree_issue_project_id').css('width'));

      var node = tree.tree('getNodeById', $('#issue_project_id > option:selected').val());
      console.log(node);
      tree.tree('scrollToNode', node);
      event.stopPropagation();
    });    
    
    var tree = $('#tree'),
        filter = $('#tree_issue_project_id_filter'),
        _filtering = false,
        thread = null;
    
    tree.tree({
        data: roots,
        //dragAndDrop: true,
        autoOpen: false,
        useContextMenu: false,
        onCreateLi: function (node, $li) {

            var title = $li.find('.jqtree-title');
            var search = filter.val().toLowerCase();
            var value = title.text().toLowerCase();

            if (search !== '') {

                var _parent = node.parent;
                var _parentValue = (typeof _parent.name === 'string') ? _parent.name.toLowerCase() : "";
                $li.hide();
                while (typeof (_parent.element) !== 'undefined') {
                    if (value.indexOf(search) > -1 || _parentValue.indexOf(search) > -1) {
                        $li.show();
                        $(_parent.element).show().addClass('jqtree-filtered');
                    }
                    _parent = _parent.parent;
                    _parentValue = (typeof _parent.name === 'string') ? _parent.name.toLowerCase() : "";
                }
                if (!_filtering) {
                    _filtering = true;
                };
                if (!tree.hasClass('jqtree-filtering')) {
                    tree.addClass('jqtree-filtering');
                };
            } else {
                if (_filtering) {
                    _filtering = false;
                };
                if (tree.hasClass('jqtree-filtering')) {
                    tree.removeClass('jqtree-filtering');
                };
            };
        },
    onCanSelectNode: function(node) {
      $('.tree').hide();

      if ($('#issue_project_id > option:selected').val() != node.id)
        $('#issue_project_id').change();

      $('#issue_project_id').val(node.id);

      if (node.children.length == 0) {
        return true;
      }
      else {
        return true;
      }
    }
    });

    filter.keyup(function() {
    clearTimeout(thread);
    thread = setTimeout(function () {
      tree.tree('loadData', roots);
    }, 50);
  });

  v = $('#issue_project_id > option:selected').val();
  if (v != undefined)  {
    var node = tree.tree('getNodeById', v);
    tree.tree('selectNode', node); 

    node.iterate(function(child) {
      if (child.isFolder()) {
        tree.tree('openNode', child);
      }
      return true;
    });   
  }  

  return roots;
}      
  
$(document).ready(function() {

  list_to_tree();
  
   
  var _replaceIssueFormWith = replaceIssueFormWith;
  replaceIssueFormWith = function(html){
    _replaceIssueFormWith(html);
    list_to_tree();  
  };

    




});

