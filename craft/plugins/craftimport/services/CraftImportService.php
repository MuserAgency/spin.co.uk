<?php

/*

So useful...
http://craftcms.stackexchange.com/questions/1101/how-to-save-a-matrix-content-of-a-new-entry-in-my-plugin/1218
https://gist.github.com/brandonkelly/8149062

*/

namespace Craft;

class CraftImportService extends BaseApplicationComponent
{
    public function __construct()
    {

    }
    
    private function _getProject($slug)
    {
	    $sql = "SELECT elementId FROM craft_elements_i18n as el, craft_entries as en WHERE el.slug='" . $slug . "' AND el.id=en.id AND en.sectionId='4'";
	    $command = craft()->db->createCommand($sql);
	    $entryRecord = $command->queryRow();
        /*$entryRecord =    $command
                    ->select('elementId')
                    ->from('elements_i18n')
                    ->where(array("AND", "slug='" . $slug . "'"))
                    ->queryRow();
        */
        
        //print_r($entryRecord);
        if (is_null($entryRecord['elementId']))
        {
        	echo("Couldn't discipline entry with slug " . $slug);
        	return false;
        } else {
        	$entry = craft()->entries->getEntryById( $entryRecord['elementId'] );
			return $entry;
		}
    }
    
    private function _getDiscipline($slug)
    {
    	$sql = "SELECT elementId FROM craft_elements_i18n as el, craft_entries as en WHERE el.slug='" . $slug . "' AND el.id=en.id AND en.sectionId='4'";
	    $command = craft()->db->createCommand($sql);
        /*$entryRecord =    $command
                    ->select('elementId')
                    ->from('elements_i18n')
                    ->where(array("AND", "slug='" . $slug . "'"))
                    ->queryRow();
        */
        
        print_r($command);
        if (is_null($entryRecord['elementId']))
        {
        	echo("Couldn't discipline entry with slug " . $slug);
        	return false;
        } else {
        	$entry = craft()->entries->getEntryById( $entryRecord['elementId'] );
			return $entry;
		}
    }
    
    private function _getClient($slug)
    {
    	
	    $command = craft()->db->createCommand();
        $entryRecord =    $command
                    ->select('elementId')
                    ->from('elements_i18n')
                    ->where(array("AND", "slug='" . $slug . "'"))
                    ->queryRow();
        
        
        //$client = craft()->entries->find("slug='" . $slug . "'");
        
        if (is_null($entryRecord['elementId']))
        {
        	echo("Couldn't find client with slug " . $slug . "\n");
        	return false;
        } else {
        	$entry = craft()->entries->getEntryById( $entryRecord['elementId'] );
			return $entry;
		}
    }
    
    private function _getAsset($filename)
    {
    	$filename = basename($filename);
    	echo "Filename: " . $filename . "\n";
	    $command = craft()->db->createCommand();
        $entryRecord =    $command
                    ->select('id')
                    ->from('assetfiles')
                    ->where(array("AND", "filename='" . $filename . "'"))
                    ->queryRow();
        
        
        //$client = craft()->entries->find("slug='" . $slug . "'");
        
        if (is_null($entryRecord['id']))
        {
        	echo("Couldn't find asset with filename " . $filename . ", skipping\n");
        	return '';
        } else {
			return $entryRecord['id'];
		}
    }
    
    
    public function loadEntries()
    {
    	// Projects
    	//$this->loadProjects();
    	
    	// Projects -> Similar work
    	//$this->loadSimilar();
    	
    	//$this->loadInfo();
    	
    	// Journal
    	$this->loadJournal();
    }
    
    public function loadJournal()
    {
	    $xml = simplexml_load_file('http://spin.co.uk/journal.xml','SimpleXMLElement',LIBXML_NOCDATA);
	    $sectionId = 7; // Journal section
        $typeId = 7; // Journal entry type
        
		$json = json_encode($xml);
		$array = json_decode($json,TRUE);
		
		//print_r($array);
		//exit;
		
		echo "Starting...\n";
		
		foreach ($array['projects']['entry'] as $importEntry) {
			echo "Processing " . $importEntry['title'] . "\n";
			
			$thumbnailSize = (string) $importEntry['thumbnail_size'];
			$thumbnail = $importEntry['thumbnail']['@attributes']['src'];
			$images = $importEntry['images']['image'];
			
			$thumbnailAsset = $this->_getAsset($thumbnail);
			
			$imageArray = array();
			
			foreach($images as $image)
			{
				$imageSrc = $image['@attributes']['src'];
				$imageArray[] = $this->_getAsset($imageSrc);
			}
			/*
			echo "Size: " . $thumbnailSize . "\n";
			echo "Thumbnail: " . $thumbnailAsset . "\n";
			echo "Text: " . (string) $importEntry['articleText'] . "\n";
			*/
				// create the journal entry...
        	
            $entry = new EntryModel();
            
            // Find these in craft/app/models/EntryModel
            $entry->sectionId = $sectionId;
            $entry->typeId = $typeId; 
            $entry->authorId = 1; // 1 for Admin
            $entry->enabled = true;
            $entry->postDate = (string) $importEntry['entry_date'];
            $entry->slug = (string) $importEntry['slug'];
            $entry->getContent()->setAttributes(array(
                'title' => (string) $importEntry['title'],
                'articleText' => (string) $importEntry['articleText'],
                'thumbnailSize' => (string) $thumbnailSize
            ));
			
			$entry->setContentFromPost(array('images' => $imageArray,'articleThumbnail' => array($thumbnailAsset)));
			//$entry->setContentFromPost(array('thumbnail' => array($thumbnailAsset)));
			
	        if(craft()->entries->saveEntry($entry))
	        {
				echo "Processed " . $entry->title . "\n\n";
			} else {
				die('Failed to save ' . $importEntry['title'] . '!!');
			}
			
		}
		
		
		exit;
		
		
	    
    }
    
    public function loadInfo()
    {
	    $xml = simplexml_load_file('http://spin.co.uk/related_projects.xml');
	    print_r($xml);
	    exit;
    }
    
    public function loadSimilar()
    {
        $retVal = true;
        $projectCount = 1;
        
        // first import xml and format into usable array
        
        $xml = simplexml_load_file('http://spin.co.uk/related_projects.xml','SimpleXMLElement',LIBXML_NOCDATA);
        
       
        
		$json = json_encode($xml);
		$array = json_decode($json,TRUE);
		
		$projects = array();
		
		foreach($array['projects']['entry'] as $importEntry)
		{
			$projects[$importEntry['slug']] = array('similar' => $importEntry['similar_work'], 'info' => $importEntry['projectInfo']);
		}
		
		
        
        
        $command = craft()->db->createCommand();
        $entries =    $command
                    ->select('id')
                    ->from('entries')
                    ->where(array("AND", "sectionId='4'"))
                    ->query();
                    
        
        foreach($entries as $entry)
        {
        	
	        $project = craft()->entries->getEntryById($entry);
	        echo "Processing " . $project->title . "\n";
	        
	        
	                
	        if(array_key_exists($project->slug, $projects) && array_key_exists('info', $projects[$project->slug]))
	        {
	        	//$related = (string) $projects[$project->slug]['info'];
	        	
	        	echo($projects[$project->slug]['info']);
		         $project->getContent()->setAttributes(array(
	                'projectInfo' => $projects[$project->slug]['info']
	            ));
	            
	            if(craft()->entries->saveEntry($project))
		        {
					echo "Processed " . $project->title . "\n\n";
				} else {
					die('Failed to save ' . $project->title . '!!');
				}

	        	
	        
	        	/*
	        	$related = $projects[$project->slug]['project'];
		        echo "Found related projects...\n\n";
		        $post = array();
		        foreach($related as $similar)
		        {
		        	//print_r($similar);
		        	if(array_key_exists('@attributes', $similar))
		        	{
			        	$p = $this->_getProject($similar['@attributes']['slug']);
						$post[] = $p->id;
						
					} else {
						echo "No attributes found for " . $project->title . "\n";
						}
			        
		
			        
		        }
		        $project->setContentFromPost(array('similarWork' => $post));
		        if(craft()->entries->saveEntry($project))
		        {
					echo "Processed " . $project->title . "\n\n";
				} else {
					die('Failed to save ' . $project->title . '!!');
				}
				*/
	        } else {
		        echo "No related projects found for " . $project->title . "\n";
	        }
	        
	        
        }
        
        exit;
        
        
        
        
    }
    
    
    
    

    public function loadProjects()
    {
        $retVal = true;
        $projectCount = 1;
        
        // Get the entry
		//$entry = craft()->entries->getEntryById(1656);
		/*
		// Convert the existing data to what it would look like in POST
		$matrixData = array();
		 
		foreach ($entry->work as $block)
		{
			$myType = $block->getType();
		
		    $blockData = array(
		        'type' => $block->getType()->handle,
		        'enabled' => $block->enabled
		    );
		    
		    switch ($block->getType()->handle)
		    {
		        case 'project':
		        {
		            $blockData['fields'] = array(
		                'discipline' => $block->discipline,
		                'leadImage' => $block->leadImage,
		                'images' => array()
		            );
		            break;
		        }
		        case 'image':
		        {
		            $blockData['fields'] = array(
		                'assetsField' => $block->assetsField->ids(),
		                'captionField' => $block->captionField
		            );
		            break;
		        }
		    }
		    
		    $matrixData[$block->id] = $blockData;
		}
		
		print_r($matrixData);
		exit;
		
		*/
        
        
        
        $queryObj = craft()->db->createCommand();
        
        
        // Projects
        
        $xml = simplexml_load_file('http://spin.co.uk/projects.xml');
        $sectionId = 4; // Projects section
        $typeId = 4; // Projects entry type
        
		$json = json_encode($xml);
		$array = json_decode($json,TRUE);
        //$array = (array)$xml;
        //print_r($array);
        //exit;
        
        echo "Starting...\n";
        
        foreach ($array['projects']['entry'] as $importEntry) {
        
        //$importEntry = $array['projects']['entry'];
        
        	echo 'Processing ' . $importEntry['title'] . "\n";
        
        	// testing...
        	
        	$fields = $importEntry['fields'];
        	
        	$disciplines = array();
        	
        	if(array_key_exists(0, $fields['discipline']))
        	{
	        	foreach($fields['discipline'] as $discipline)
	        	{
	        		//print_r($discipline)
	        		
	        		echo "Looking for discipline " . $discipline['@attributes']['slug'] . "\n";
	        		
	        		$disciplineEntry = $this->_getDiscipline($discipline['@attributes']['slug']);
		        	echo "found discipline - " . $disciplineEntry->slug . " (" . $disciplineEntry->id . ")\n"; 
		        	
		        	$leadImageAsset = $this->_getAsset($discipline['leadImage']['@attributes']['src']);
		        	echo "found leadImage - " . $leadImageAsset . "\n";
		        	
		        	$images = array();
		        	
		        	if(array_key_exists(0, $discipline['images']['image']))
		        	{
			        	foreach($discipline['images']['image'] as $image)
			        	{
			        		$attrs = $image['@attributes'];
			        		$src = (string) $attrs['src'];
			        		echo "looking for image - " . $src . ", " . gettype($src) . "\n";
				        	$imageAsset = $this->_getAsset($src);
							echo "found image - " . $imageAsset . "\n";
							echo "Using ", memory_get_peak_usage(1), " bytes of ram.\n";
							
							$images[] = $imageAsset;
			        	}
		        	} else {
			        	$image = $discipline['images']['image'];
			        	$attrs = $image['@attributes'];
			        		$src = (string) $attrs['src'];
			        		echo "looking for image - " . $src . ", " . gettype($src) . "\n";
				        	$imageAsset = $this->_getAsset($src);
							echo "found image - " . $imageAsset . "\n";
							echo "Using ", memory_get_peak_usage(1), " bytes of ram.\n";
							$images[] = $imageAsset;
		        	}
		        	
		        	
		        	
		        	// add to project array
		        	
		        	if($disciplineEntry) {
		        	
		        	$disciplines[] = array(
		        		'id' => $disciplineEntry->id,
		        		'leadImage' => $leadImageAsset,
		        		'images' => $images
		        	);
		        	
		        	} 
		        	
		        	echo "\n\n";
		        	
	        	}
        	} else {
	        	$discipline = $fields['discipline'];
	        	
	        	
	        	echo "Looking for discipline " . $discipline['@attributes']['slug'] . "\n";
	        	$disciplineEntry = $this->_getDiscipline($discipline['@attributes']['slug']);
		        	echo "found discipline - " . $disciplineEntry->slug . " (" . $disciplineEntry->id . ")\n"; 
		        	
		        	$leadImageAsset = $this->_getAsset($discipline['leadImage']['@attributes']['src']);
		        	echo "found leadImage - " . $leadImageAsset . "\n";
		        	
		        	$images = array();
		        	
		        	if(array_key_exists(0, $discipline['images']['image']))
		        	{
			        	foreach($discipline['images']['image'] as $image)
			        	{
			        		$attrs = $image['@attributes'];
			        		$src = (string) $attrs['src'];
			        		echo "looking for image - " . $src . ", " . gettype($src) . "\n";
				        	$imageAsset = $this->_getAsset($src);
							echo "found image - " . $imageAsset . "\n";
							echo "Using ", memory_get_peak_usage(1), " bytes of ram.\n";
							
							$images[] = $imageAsset;
			        	}
		        	} else {
			        	$image = $discipline['images']['image'];
			        	$attrs = $image['@attributes'];
			        		$src = (string) $attrs['src'];
			        		echo "looking for image - " . $src . ", " . gettype($src) . "\n";
				        	$imageAsset = $this->_getAsset($src);
							echo "found image - " . $imageAsset . "\n";
							echo "Using ", memory_get_peak_usage(1), " bytes of ram.\n";
							$images[] = $imageAsset;
		        	}
		        	
		        	// add to project array
		        	
		        	if($disciplineEntry) {
		        	
		        	$disciplines[] = array(
		        		'id' => $disciplineEntry->id,
		        		'leadImage' => $leadImageAsset,
		        		'images' => $images
		        	);
		        	
		        	} 
		        	
		        	echo "\n\n";
        	}
	        	
        	
	        	
	        	
	        	$clientEntry = $this->_getClient($fields['client']['@attributes']['slug']);
	        	echo "found client - " . $clientEntry->slug . " (" . $clientEntry->id . ")\n";
			
				echo "\n\n";
				
				
				// create the project entry...
        	
            $entry = new EntryModel();
            
            // Find these in craft/app/models/EntryModel
            $entry->sectionId = $sectionId;
            $entry->typeId = $typeId; 
            $entry->authorId = 1; // 1 for Admin
            $entry->enabled = true;
            $entry->postDate = $importEntry['entry_date'];
            $entry->slug = $importEntry['slug'];
            $entry->getContent()->setAttributes(array(
                'title' => $importEntry['title'],
                'projectInfo' => $importEntry['projectInfo']
            ));
            
            // save matrix block
            
            print_r($disciplines);
            
         
            
            $matrixData = array();
            $matrixCount = 1;
            foreach($disciplines as $disc)
            {
            	$matrixData['new' . $matrixCount] = array(
				  'type' => 'project',
				  'enabled' => true,
				  'fields' => array(
				    'discipline' => array($disc['id']),
				    'leadImage' => array($disc['leadImage']),
				    'images' => $disc['images']
				  )
				);
				$matrixCount++;
            }
            
            $entry->setContentFromPost(array('work' => $matrixData));
            
            
            
            if ( craft()->entries->saveEntry($entry) )
            {
                
                
                // Save client relationship
                /*
                	fieldID = the client field (20)
                	sourceId = this entry id
                	targetId = the client entry id
                	 
                	INSERT INTO `craft_relations` (fieldId, sourceId, targetId) VALUES (20, $entry->id, $clientEntry->id);
                */
                
                if($queryObj->insert('relations',array(
                	'fieldId' => 20,
                	'sourceId' => $entry->id,
                	'targetId' => $clientEntry->id
                ))){
                	echo "Created client relationship\n";
                	
                } else {
	                echo "<b>Failed</b> creating client relationship\n";
                }
                
                
                // Save disciplines )(loop though array)
                
                foreach($disciplines as $disc)
                {
	                /*
	                	fieldID = the discipline field (25)
	                	sourceId = this entry id
	                	targetId = the discipline entry id
	                	 
	                	INSERT INTO `craft_relations` (fieldId, sourceId, targetId) VALUES (25, $entry->id, $disc['id']);
	                */
	                
	                if($queryObj->insert('relations',array(
	                	'fieldId' => 25,
	                	'sourceId' => $entry->id,
	                	'targetId' => $disc['id']
	                ))){
                	echo "Created discipline relationship\n";
                	
                } else {
	                echo "<b>Failed</b> creating discipline relationship\n";
                }
                }
                // save matrix blocks
                
                
                echo 'Saved project with ID ' . $entry->id . "\n\n";
                
                
                //$block = new MatrixBlockModel();
                
                
                
                continue;
            } else {
            	echo "Couldn't save project!";
                $retVal = false;
                break;
            }
				
				$projectCount++;
			
            
        }
        //return $retVal;
        
        
        echo $projectCount . " projects loaded in total";
        
        
        
        exit;


        


		/*
		$xml = simplexml_load_file('http://spin.co.uk/clients-export/');
        $sectionId = 5; // Client section
        $typeId = 5; // Client entry type
        
        foreach ($xml->clients[0]->entry as $importEntry) {
            
            // Clients!
            
            $entry = new EntryModel();
            

            // Find these in craft/app/models/EntryModel
            $entry->sectionId = $sectionId;
            $entry->typeId = $typeId; 
            $entry->authorId = 1; // 1 for Admin
            $entry->enabled = true;
            $entry->postDate = $importEntry['entry_date;
            $entry->slug = $importEntry['slug;
            $entry->getContent()->setAttributes(array(
                'title' => $importEntry['title
            ));
            if ( craft()->entries->saveEntry($entry) )
            {
                
                continue;
            } else {
                $retVal = false;
                break;
            }
        }
        return $retVal;
        */
    }
}
