$backupDir = "src\scss_backup"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

Get-ChildItem -Path "src" -Recurse -Filter "*.scss" | ForEach-Object {
    $dest = Join-Path $backupDir $_.Name
    # Handle duplicate names if flatter structure, or keep structure?
    # Simple backup: just flatten for now or keep text?
    # Let's just move them. If name collision, we might lose some. 
    # Better: Recreate structure or just rename in place? 
    # "update them into css files": implied replace. 
    # Let's just DELETE them if we are confident, or move with structure.
    
    # Moving with structure is safer.
    $relativePath = $_.FullName.Substring((Get-Item "src").FullName.Length + 1)
    $destPath = Join-Path $backupDir $relativePath
    $destParent = Split-Path $destPath
    if (-not (Test-Path $destParent)) {
        New-Item -ItemType Directory -Path $destParent -Force | Out-Null
    }
    Move-Item $_.FullName $destPath -Force
    Write-Host "Moved $($_.Name) to $destPath"
}
