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

  function championSearch() {

    var $input = $('#champion-search');
    var $champions = $('#champions');
    var oldInputVal = '';
    var championsEles = [];

    if (!$input.length || !$champions.length) {
      return false;
    }

    oldInputVal = $input.val();

    $champions.find('.champion-block[data-name]').each(function() {

      var $this = $(this);

      var name = $this.data('name');

      if (name) {

        championsEles.push({$ele: $this, name: $this.data('name')});

      }

    });

    if (championsEles.length > 0) {

      $input.keyup(function keyUp(e) {

        var val = this.value;

        if (oldInputVal != val) {

          oldInputVal = val;

          championsEles.forEach(function(championEle) {

            if (championEle.name.toLowerCase().indexOf(val.toLowerCase()) !== -1) {

              championEle.$ele.removeClass(classToHide);

            } else {

              championEle.$ele.addClass(classToHide);

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

    championSearch();

  });

})(jQuery, riot);
