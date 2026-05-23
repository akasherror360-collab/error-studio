$files = @(
"src\components\Card\index.jsx",
"src\components\Cta\index.jsx",
"src\components\CustomCursor\index.jsx",
"src\components\Footer\index.jsx",
"src\components\FunFact\index.jsx",
"src\components\Header\index.jsx",
"src\components\Hero\index.jsx",
"src\components\IconBox\index.jsx",
"src\components\LogoList\index.jsx",
"src\components\MovingText\index.jsx",
"src\components\MovingText\MovingText2.jsx",
"src\components\Portfolio\index.jsx",
"src\components\Post\index.jsx",
"src\components\Post\PostStyle2.jsx",
"src\components\PricingTable\index.jsx",
"src\components\ServiceList\index.jsx",
"src\components\ServiceList\ServiceListStyle2.jsx",
"src\components\Spacing\index.jsx",
"src\components\Team\index.jsx",
"src\components\Testimonial\index.jsx",
"src\components\Testimonial\TestimonialStyle2.jsx",
"src\components\Timeline\index.jsx",
"src\components\VerticalLinks\index.jsx",
"src\index.js"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        (Get-Content $file) -replace '\.scss', '.css' | Set-Content $file
        Write-Host "Updated $file"
    } else {
        Write-Host "File not found: $file"
    }
}
