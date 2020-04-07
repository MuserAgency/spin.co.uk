<?php
namespace Craft;

class CraftAssetDataPlugin extends BasePlugin
{
    function getName()
    {
         return Craft::t('Asset Data');
    }

    function getVersion()
    {
        return '1.0';
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
        return true;
    }
}
?>