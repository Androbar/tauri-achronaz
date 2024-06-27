// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::api::path::document_dir;
use std::fs;
use std::path::PathBuf;

#[tauri::command]
fn save_config(data: String) {
    if let Some(dir) = document_dir() {
        let path: PathBuf = [&dir.to_string_lossy(), "clock_config.json"].iter().collect();
        fs::write(path, data).expect("Unable to write file");
    }
}

#[tauri::command]
fn load_config() -> String {
    if let Some(dir) = document_dir() {
        let path: PathBuf = [&dir.to_string_lossy(), "clock_config.json"].iter().collect();
        return fs::read_to_string(path).unwrap_or_default();
    }
    "".to_string()
}

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
