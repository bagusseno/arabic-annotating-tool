# Alat Bantu Anotasi Entitas Manusia Al Qur'an

Aplikasi untuk membantu para peniliti Al Qur'an untuk menganotasi entitas-entitas yang ada di dalam Al Qur'an, khususnya entitas manusia.

## Getting Started

Instruksi ini akan mambantu anda untuk mendapatkan salinan aplikasi dan menjalankannya di komputer lokak untuk keperluan pengembangan dan pengujian.

### Prerequisites

1. Install node.js terbaru: https://nodejs.org
2. Install yarn package manager terbaru: https://yarnpkg.com/
3. Install python terbaru: https://python.org/
4. Install mongoDB: https://www.mongodb.com/try/download/community

### Installing

Langkah-langkah dalam menginstallnya sebagai berikut :

1. Clone Repository dengan git

```
git clone https://github.com/abuabdirohman4/human-entity-quran-annotation-tool.git
```
2. Install node_module dengan yarn
```
yarn install
```
3. Membuat Environment
* Masuklah pada folder flask
```
cd flask
```
* Lalu buat virtual environment
```
python3 -m venv venv
```
* Dan aktivasi virtual environment
```
source venv/bin/activate
```
4. Install Requirement Flask
* Masih di dalam folder flask, install requirement untuk flask
```
pip install -r requirements.txt
```
5. Import Database
* Untuk proses import, saya menyarankan menggunakan [MongoDB Compass](https://www.mongodb.com/products/compass) (GUI untuk mongoDB)
* Buatlah database dengan nama _annotation_tool_
* Buat juga 2 collection dengan nama _quran_ dan _patterns_
* Import file yang berada di folder _mongo_collections_ pada collection dengan path:
```
human-entity-quran-annotation-tool/flask/data
```
* Untuk import file dengan MongoDB Compass dapat dilihat pada [Import and Export Data](https://docs.mongodb.com/compass/master/import-export/#import-data-into-a-collection)

### Running

Untuk menjalankaannya anda perlu menyediakan 2 buah terminal, yang pertama untuk menjalankan _flask_ sebagai _backend_-nya dan yang kedua untuk menjalankan _react_ sebagai _frontend_-nya 

1. Menjalankan flask di http://localhost:5000/
```
yarn start-flask
```
2. Menjalankan react di http://localhost:3000/
```
yarn start-react
```

## Built With

* [React](https://reactjs.org/) - Javascript Library
* [Flask](https://flask.palletsprojects.com/en/1.1.x/) - Web Application Framework
* [MongoDB](https://www.mongodb.com/) - Database for Modern Application
* [Air UI Admin Template](https://docs.airuitemplate.com/) - Admin Template

## Authors

* **Abu Abdirohman** - *Mahasiswa* - [abuabdirohman4](https://github.com/abuabdirohman4)
