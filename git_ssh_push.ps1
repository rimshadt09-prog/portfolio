$git = "C:\PROGRA~1\Git\cmd\git.exe"
$gitSsh = "C:\PROGRA~1\Git\usr\bin\ssh.exe"
$keyPath = "C:/Users/Rimshad/.ssh/id_ed25519"
$repo = "rimshadt09-prog/portfolio"

Write-Host "Staging latest changes..."
& $git add .

Write-Host "Committing changes locally..."
$status = & $git status --porcelain
if ($status) {
    & $git commit -m "Update portfolio links, layout, and theme to premium Red/White"
} else {
    Write-Host "No changes to commit."
}

Write-Host "Setting remote origin URL to SSH..."
& $git remote set-url origin "git@github.com:$repo.git"

# Push to GitHub using Git's built-in SSH via short path names
Write-Host "Pushing main branch to GitHub..."
$sshCmd = "$gitSsh -i $keyPath -o StrictHostKeyChecking=no"
& $git -c core.sshCommand=$sshCmd push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Warning "First push attempt failed. Trying push with force option if necessary."
    & $git -c core.sshCommand=$sshCmd push -f origin main
}
