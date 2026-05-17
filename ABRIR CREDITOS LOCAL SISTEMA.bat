@echo off
title Lanzador de Creditos Al Toque
echo ==================================================
echo      INICIANDO SISTEMA DE CREDITOS AL TOQUE
echo ==================================================
echo.

:: --- CONFIGURACION DE RUTAS ---
set BACKEND_DIR=apicreditostoque-main\CAT_API
set FRONTEND_DIR=administradorcreditostoque-main

:: --- VALIDACIONES BASICAS ---
if not exist "%BACKEND_DIR%" (
    echo [ERROR] No encuentro la carpeta del Backend: %BACKEND_DIR%
    pause
    exit
)
if not exist "%FRONTEND_DIR%" (
    echo [ERROR] No encuentro la carpeta del Frontend: %FRONTEND_DIR%
    pause
    exit
)

:: --- PASO 1: LANZAR BACKEND (.NET) ---
echo [1/2] Iniciando API Backend (.NET 6)...
start "BACKEND - .NET API" cmd /k "cd %BACKEND_DIR% && dotnet run"

:: --- PASO 2: LANZAR FRONTEND (ANGULAR) ---
echo [2/2] Iniciando Frontend (Angular 15)...
echo.
echo NOTA: Si es la primera vez, asegurate de haber corrido 'npm install' previamente.
echo.
:: Agregamos "-- --open" para que Angular abra el navegador al terminar de compilar
start "FRONTEND - ANGULAR" cmd /k "cd %FRONTEND_DIR% && npm start -- --open"

echo ==================================================
echo    SISTEMA INICIANDO... ESPERA A QUE CARGUE
echo ==================================================
echo.
echo * El navegador se abrira automaticamente cuando Angular termine.
echo * Backend: http://localhost:5000/swagger
echo.
echo No cierres las ventanas negras. Minimízalas si deseas.
timeout /t 10