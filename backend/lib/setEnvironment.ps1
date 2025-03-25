$scriptRootFolder = $PSScriptRoot

$ENV:PYTHONPATH = "$ENV:PYTHONPATH;$scriptRootFolder;"
$ENV:RootPath = Split-Path -parent $scriptRootFolder

pip install -r $scriptRootFolder\requirements.txt
