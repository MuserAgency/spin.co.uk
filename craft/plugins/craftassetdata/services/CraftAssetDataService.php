<?php
namespace Craft;

class CraftAssetDataService extends BaseApplicationComponent
{
    public function __construct()
    {

    }
    
    public function getAssets(){
      
      $criteria = craft()->elements->getCriteria(ElementType::Asset);
      $criteria->limit = 0;
      $criteria->find();
      
      $ix = array();
      
      foreach($criteria as $asset):
        $ix[$asset->filename] = $asset;
      endforeach;
      
      return $ix;
      
    }
    
    public function getProjects(){
      
      $criteria = craft()->elements->getCriteria(ElementType::Entry);
      $criteria->section = 'projects';
      $criteria->limit = 0;
      $criteria->find();
      
      $ix = array();
      
      foreach($criteria as $entry):
        $ix[$this->makeKey($entry->title)] = $entry;
      endforeach;
      
      return $ix;
      
    }
    
    public function makeKey($text){
      
      return ltrim(rtrim(strtolower(preg_replace('/[\s]+/','',$text))));
      
    }
    
    public function getVideoAssets(){
      
      $criteria = craft()->elements->getCriteria(ElementType::Asset);
      $criteria->limit = 0;
      $criteria->find();
      
      $ix = array();
      
      foreach($criteria as $asset):
        if(!empty($asset->vimeoId)) echo $asset->filename.' Video:'.$asset->vimeoId.'<br>';
      endforeach;
      
      return $ix;
      
    }
    
    public function setVideoData(){
      
      $assets = $this->getAssets();
      
      $row = 1;
      $dir = getcwd();
      if (($handle = fopen($dir."/videos.csv", "r")) !== FALSE) {
          while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
              $file = $data[0];
              $vimeoId = $data[1];
              
              $asset = $assets[$file];
              if(!empty($asset)) echo $file.' is Asset #'.$asset->id.' with Vimeo ID #'.$vimeoId.'<br>';
              else echo 'Couldnt find '.$file.'<br>';
              
              if(!empty($asset)):
                
                // Set the vimeoId and Save it
                $asset->setContentFromPost(array('vimeoId'=>$vimeoId));
                craft()->elements->saveElement($asset);
               
              endif;
          }
          fclose($handle);
      }
      
      exit;
      
    }
    
    public function setSmallImageData(){
      
      $assets = $this->getAssets();
      
      $row = 1;
      $dir = getcwd();
      if (($handle = fopen($dir."/small_images.csv", "r")) !== FALSE) {
          while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
              $file = $data[0];
              $size = $data[1];
              
              $asset = $assets[$file];
              if(!empty($asset)) echo $file.' is Asset #'.$asset->id.'<br>';
              else echo 'Couldnt find '.$file.'<br>';
              
              if(!empty($asset)):
                
                // Set the vimeoId and Save it
                $asset->setContentFromPost(array('mediaSize'=>'small'));
                craft()->elements->saveElement($asset);
               
              endif;
          }
          fclose($handle);
      }
      
      exit;
      
    }
    
    public function setProjectInfo(){
      
      $projects = $this->getProjects();

      
  
      
      $row = 1;
      $dir = getcwd();
      if (($handle = fopen($dir."/project_info.csv", "r")) !== FALSE) {
          while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
              $id = $data[0];
              $title = $data[1];
              
              
              
              
              echo $title.' - '.$this->makeKey($title).'<br>';
              //echo $info.'<br><hr />';
              $update = 0;
              
              $entry = $projects[$this->makeKey($title)];
              if(empty($entry)) echo 'Cannot find '.$entry->title.'<br>';
              if($entry->projectInfo == '' | $entry->projectInfo == '[]'):
                echo 'Will update '.$entry->title.'<br>';
                $info = file_get_contents('http://spin2013.archivestudio.co.uk/projects/info/'.$id);
                $update = 1;
              else:
                echo 'Wont update '.$title.'<br>';
              endif;
              //$asset = $assets[$file];
              //if(!empty($asset)) echo $file.' is Asset #'.$asset->id.'<br>';
              //else echo 'Couldnt find '.$file.'<br>';
              
              if(!empty($entry) && $update):
                
                // Set the vimeoId and Save it
                $entry->setContentFromPost(array('projectInfo'=>$info));
                craft()->elements->saveElement($entry);
               
              endif;
          }
          fclose($handle);
      }
      
      exit;
      
    }
    
}

?>