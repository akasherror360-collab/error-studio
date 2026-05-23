Get-ChildItem -Path "src" -Recurse -Filter "*.scss" | Where-Object { $_.Name -notmatch "^_" } | ForEach-Object {
    $cssFile = $_.FullName -replace '\.scss$', '.css'
    Write-Host "Compiling $($_.Name) to $cssFile"
    npx sass $_.FullName $cssFile --no-source-map
}
Write-Host "Compilation complete."
