<?php
namespace Craft;

/**
 * Redactor CSS plugin
 */
class RedactorFontFamilyPlugin extends BasePlugin
{
	public function getName()
	{
		return 'Redactor Font Family';
	}

	public function getVersion()
	{
		return '1.0';
	}

	public function getDeveloper()
	{
		return 'Mildly Geeky';
	}

	public function getDeveloperUrl()
	{
		return 'http://www.mildlygeeky.com';
	}

	public function init()
	{
		if (craft()->request->isCpRequest())
		{
			craft()->templates->includeJsResource('redactorfontfamily/fontfamily.js');
		}
	}
}
