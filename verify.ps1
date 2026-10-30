# verify.ps1 — Health verification script for AI Career Recommendation Stack
Write-Host "Verifying AI Career Recommendation Stack Services..." -ForegroundColor Cyan
Write-Host ""

$allHealthy = $true

# 1. Express Backend Check
try {
    $backend = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET -TimeoutSec 5 -ErrorAction Stop
    if ($backend.success -eq $true -and $backend.data.status -eq "healthy") {
        Write-Host "[PASS] Express Backend (Port 5000): Healthy" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] Express Backend (Port 5000): Unexpected response" -ForegroundColor Red
        $allHealthy = $false
    }
} catch {
    Write-Host "[FAIL] Express Backend (Port 5000): Offline or unreachable ($($_.Exception.Message))" -ForegroundColor Red
    $allHealthy = $false
}

# 2. FastAPI ML Service Check
try {
    $ml = Invoke-RestMethod -Uri "http://localhost:8000/health" -Method GET -TimeoutSec 5 -ErrorAction Stop
    if ($ml.status -eq "healthy") {
        Write-Host "[PASS] FastAPI ML Service (Port 8000): Healthy (v$($ml.version))" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] FastAPI ML Service (Port 8000): Unexpected response" -ForegroundColor Red
        $allHealthy = $false
    }
} catch {
    Write-Host "[FAIL] FastAPI ML Service (Port 8000): Offline or unreachable ($($_.Exception.Message))" -ForegroundColor Red
    $allHealthy = $false
}

# 3. Vite Client Check
try {
    $client = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    if ($client.StatusCode -eq 200) {
        Write-Host "[PASS] Vite Frontend  (Port 5173): Online" -ForegroundColor Green
    } else {
        Write-Host "[WARN] Vite Frontend  (Port 5173): Returned status $($client.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[WARN] Vite Frontend  (Port 5173): Offline or unreachable" -ForegroundColor Yellow
}

Write-Host ""
if ($allHealthy) {
    Write-Host "All core backend and ML services are operational!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "One or more core services are failing. Check the logs above." -ForegroundColor Red
    exit 1
}

