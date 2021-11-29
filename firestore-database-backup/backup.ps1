# Run the backup script, and look for the to:output text
$output = npm start
$matched = $output -match "to:output"

if($matched) {
  $relativePath = $matched.split(":")[1]
  $datePart = $relativePath.split("/")[1]

  # Create zips folder if it doesn't exist
  if(!(Test-Path -Path "zips")) {
    New-Item -ItemType Directory -Path "zips"
  }

  $zipFile = Compress-Archive -Path $relativePath -Destination zips/$datePart.zip -PassThru
  Write-Output $zipFile

  # If this file exists, copy the zip based on contents
  if(Test-Path -Path "copyBackupTo.txt") {
    $copyTo = Get-Content -Path "copyBackupTo.txt"
    Copy-Item -Path $zipFile -Destination $copyTo
    Write-Output "Copied $zipFile to $copyTo"
  }
} else {
  Write-Error "Could not find output from npm script, no backup created"
}