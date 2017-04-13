(function($, r) {

  var classToHide = 'hidden';

  function MountHelper() {

    this.mounts = [];

    this.takeMounts = function() {

      $('.riot').each(function() {

        if (this.attributes && Array.isArray(this.attributes)) {

          console.log(this.attributes);

        }

      });


    };
    this.mount = function() {



    }
  }


  function Search() {

    var $input = $('#search');
    var $items = $('#current');
    var oldInputVal = '';
    var itemsEles = [];

    if (!$input.length || !$items.length) {
      return false;
    }

    oldInputVal = $input.val();
    itemsEles = $("div").find("[data-name]");



    if (itemsEles.length > 0) {

      $input.keyup(function keyUp(e) {

        var val = this.value;

        if (oldInputVal != val) {

          oldInputVal = val;

          itemsEles.each(function () {
            var $this = $(this);
            var name = $this.data('name');

            if (name.toLowerCase().indexOf(val.toLowerCase()) !== -1) {

              $this.removeClass(classToHide);

            } else {

              $this.addClass(classToHide);

            }

          });
        }
      });
    }
  }

  $(function() {

    window.mountHelper = new MountHelper();

    mountHelper.takeMounts();

    mountHelper.mount();

    Search();

  });

})(jQuery, riot);
