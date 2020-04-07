<?php

namespace Craft;

class CraftAssetData_AssetsController extends BaseController
{

    public function actionView()
    {
        
        $assets = craft()->craftAssetData->getAssets();
        // Set the data
        $data = array('assets' => $assets);
        // Render the template
        $this->renderTemplate('craftassetdata/view',$data);
    }
    
    public function actionGetVideos()
    {
        
        $assets = craft()->craftAssetData->getVideoAssets();
        
    }
    
    public function actionSetVideos()
    {
        
        $assets = craft()->craftAssetData->setVideoData();
        
    }
    
    public function actionSetSmallImages()
    {
        
        $assets = craft()->craftAssetData->setSmallImageData();
        
    }
    
    public function actionSetProjectInfo()
    {
        
        $assets = craft()->craftAssetData->setProjectInfo();
        
    }

}
