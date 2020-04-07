# CraftGifs

A small plugin for Craft that enables animated gifs. It tricks the system by saving a copy to a named folder then using htaccess rewrite rules to load in the untouched file.

1. Modify $savePath in CraftGifs.php
2. Modify the htaccess rewrite rule to use the same path
