@echo off
title cloudflare warp generator
echo by parzi
REM Create directory for wgcf.exe
md wg

REM Download wgcf.exe
powershell -Command "(New-Object System.Net.WebClient).DownloadFile('https://github.com/ViRb3/wgcf/releases/download/v2.2.17/wgcf_2.2.17_windows_amd64.exe', 'wg\wgcf.exe')"

REM Change to the wg folder
cd wg

REM Register wgcf.exe
wgcf.exe register --accept-tos

REM Generate configuration file
wgcf.exe generate -p config.conf



REM Ask user if they want to install WireGuard
set /p install=Do you want to install WireGuard? (y/n)
if /i "%install%"=="y" (
    REM Download and install WireGuard
    powershell -Command "(New-Object System.Net.WebClient).DownloadFile('https://download.wireguard.com/windows-client/wireguard-installer.exe', 'wireguard-installer.exe')"
    start /wait wireguard-installer.exe /S /D=C:\Program Files\WireGuard
) else (
    REM Ask user if they want to generate QR code
    set /p mobile=Do you want to generate a QR code for mobile? (y/n)
    if /i "%mobile%"=="y" (
        REM Generate QR code with qrc.exe
        powershell -Command "(New-Object System.Net.WebClient).DownloadFile('https://publiccdn.kn0.dev/qrencode.exe', 'qrc.exe')"
        .\qrc.exe -o 31.png < config.conf
	  .\31.png
    )
)

pause
