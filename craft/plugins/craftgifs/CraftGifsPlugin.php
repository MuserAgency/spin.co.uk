<?php
namespace Craft;

class CraftGifsPlugin extends BasePlugin
{
    function getName()
    {
      return Craft::t('Gifs');
    }

    function getVersion()
    {
      return '1';
    }

    function getDeveloper()
    {
      return 'Archive';
    }

    function getDeveloperUrl()
    {
      return 'http://archivestudio.co.uk';
    }
    public function hasCpSection()
    {
        return false;
    }

    function init(){



        craft()->on('assets.onBeforeUploadAsset', function(Event $event) {

          if (exif_imagetype($event->params['path']) == IMAGETYPE_GIF) {
              // IMPORTANT: change the path below to a folder you've created to store GIFs
              $savePath = '/var/www/vhosts/spin.co.uk/httpdocs/gifs/';
              copy($event->params['path'],$savePath . $event->params['filename']);
          }

        });

    }



}
?>
